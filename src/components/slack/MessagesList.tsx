import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useSocket } from '../../context/SocketContext';
import { motion, AnimatePresence } from 'framer-motion';
import { getUserGradient, getInitials, formatMessageTime, formatDateDivider } from '../../utils/userColors';

interface Message {
  _id: string;
  content: string;
  contentType: string;
  sender: {
    _id: string;
    name: string;
    avatar?: string;
  };
  channel?: string;
  conversation?: string;
  thread?: string;
  attachments: Array<{
    type: string;
    url?: string;
    name?: string;
  }>;
  reactions: Array<{
    emoji: string;
    users: string[];
  }>;
  mentions: string[];
  isPinned: boolean;
  isEdited: boolean;
  createdAt: string;
  updatedAt: string;
}

interface MessagesHookResult {
  messages: Message[];
  loading: boolean;
  error: string | null;
  sendMessage: (content: string, attachments?: any[]) => Promise<void>;
  editMessage: (messageId: string, content: string) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
  addReaction: (messageId: string, emoji: string) => Promise<void>;
  removeReaction: (messageId: string, emoji: string) => Promise<void>;
  loadMore: () => Promise<void>;
  hasMore: boolean;
}

export const useMessages = (channelId?: string, conversationId?: string): MessagesHookResult => {
  const { token, user } = useAuth();
  const {
    joinChannel,
    leaveChannel,
    joinConversation,
    leaveConversation,
    onNewMessage,
    onNewDM,
    onMessageReaction,
    onMessageEdited,
    onMessageDeleted,
  } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const fetchMessages = useCallback(async (before?: string) => {
    if (!token || (!channelId && !conversationId)) return;

    setLoading(true);
    try {
      let url = '';
      if (channelId) {
        url = `${API_BASE}/channels/${channelId}/messages`;
      } else if (conversationId) {
        url = `${API_BASE}/conversations/${conversationId}/messages`;
      }

      if (before) {
        url += `?before=${before}`;
      }

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        if (before) {
          setMessages(prev => [...data.messages, ...prev]);
        } else {
          setMessages(data.messages);
        }
        setHasMore(data.messages.length === 50);
      }
    } catch (err) {
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  }, [token, channelId, conversationId]);

  const sendMessage = useCallback(async (content: string, attachments: any[] = []) => {
    if (!token || (!channelId && !conversationId)) return;

    try {
      let url = '';
      if (channelId) {
        url = `${API_BASE}/channels/${channelId}/messages`;
      } else if (conversationId) {
        url = `${API_BASE}/conversations/${conversationId}/messages`;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content, attachments })
      });

      const data = await response.json();
      if (!data.success) {
        setError('Failed to send message');
      }
      // The server broadcasts the message to all participants/members via socket
      // so the message will be added through the socket event handlers (message:new or dm:new)
    } catch (err) {
      setError('Failed to send message');
    }
  }, [token, channelId, conversationId]);

  const editMessage = useCallback(async (messageId: string, content: string) => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE}/messages/${messageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content })
      });

      const data = await response.json();
      if (data.success) {
        setMessages(prev =>
          prev.map(msg => msg._id === messageId ? data.message : msg)
        );
      }
    } catch (err) {
      setError('Failed to edit message');
    }
  }, [token]);

  const deleteMessage = useCallback(async (messageId: string) => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE}/messages/${messageId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        setMessages(prev => prev.filter(msg => msg._id !== messageId));
      }
    } catch (err) {
      setError('Failed to delete message');
    }
  }, [token]);

  const addReaction = useCallback(async (messageId: string, emoji: string) => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE}/messages/${messageId}/reactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ emoji })
      });

      const data = await response.json();
      if (data.success) {
        setMessages(prev =>
          prev.map(msg => msg._id === messageId ? { ...msg, reactions: data.reactions } : msg)
        );
      }
    } catch (err) {
      setError('Failed to add reaction');
    }
  }, [token]);

  const removeReaction = useCallback(async (messageId: string, emoji: string) => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE}/messages/${messageId}/reactions/${emoji}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        setMessages(prev =>
          prev.map(msg => msg._id === messageId ? { ...msg, reactions: data.reactions } : msg)
        );
      }
    } catch (err) {
      setError('Failed to remove reaction');
    }
  }, [token]);

  const loadMore = useCallback(async () => {
    if (messages.length > 0 && hasMore) {
      await fetchMessages(messages[0].createdAt);
    }
  }, [messages, hasMore, fetchMessages]);

  // Initial fetch and join socket room
  useEffect(() => {
    setMessages([]);
    setHasMore(true);
    fetchMessages();

    if (channelId) {
      joinChannel(channelId);
    } else if (conversationId) {
      joinConversation(conversationId);
    }

    return () => {
      if (channelId) {
        leaveChannel(channelId);
      } else if (conversationId) {
        leaveConversation(conversationId);
      }
    };
  }, [channelId, conversationId, fetchMessages, joinChannel, leaveChannel, joinConversation, leaveConversation]);

  // Real-time message listeners
  useEffect(() => {
    const unsubNewMessage = onNewMessage((message: Message) => {
      // Accept messages from all senders (including self) since server broadcasts to all
      // The deduplication check prevents duplicate messages
      setMessages(prev => {
        if (prev.some(m => m._id === message._id)) return prev;
        return [...prev, message];
      });
    });

    const unsubNewDM = onNewDM((message: Message) => {
      // Accept messages from all senders (including self) since server broadcasts to all
      // The deduplication check prevents duplicate messages
      setMessages(prev => {
        if (prev.some(m => m._id === message._id)) return prev;
        return [...prev, message];
      });
    });

    const unsubReaction = onMessageReaction((data: { messageId: string; reaction: string; userId: string; action: 'add' | 'remove' }) => {
      setMessages(prev =>
        prev.map(msg => {
          if (msg._id !== data.messageId) return msg;

          const existingReactionIdx = msg.reactions.findIndex(r => r.emoji === data.reaction);
          let newReactions = [...msg.reactions];

          if (data.action === 'add') {
            if (existingReactionIdx >= 0) {
              newReactions[existingReactionIdx] = {
                ...newReactions[existingReactionIdx],
                users: [...newReactions[existingReactionIdx].users, data.userId]
              };
            } else {
              newReactions.push({ emoji: data.reaction, users: [data.userId] });
            }
          } else {
            if (existingReactionIdx >= 0) {
              const updatedUsers = newReactions[existingReactionIdx].users.filter(u => u !== data.userId);
              if (updatedUsers.length === 0) {
                newReactions = newReactions.filter(r => r.emoji !== data.reaction);
              } else {
                newReactions[existingReactionIdx] = { ...newReactions[existingReactionIdx], users: updatedUsers };
              }
            }
          }

          return { ...msg, reactions: newReactions };
        })
      );
    });

    const unsubEdited = onMessageEdited((data: { messageId: string; content: string; editedAt: Date }) => {
      setMessages(prev =>
        prev.map(msg =>
          msg._id === data.messageId
            ? { ...msg, content: data.content, isEdited: true, updatedAt: data.editedAt.toString() }
            : msg
        )
      );
    });

    const unsubDeleted = onMessageDeleted((data: { messageId: string }) => {
      setMessages(prev => prev.filter(msg => msg._id !== data.messageId));
    });

    return () => {
      unsubNewMessage();
      unsubNewDM();
      unsubReaction();
      unsubEdited();
      unsubDeleted();
    };
  }, [user?.id, onNewMessage, onNewDM, onMessageReaction, onMessageEdited, onMessageDeleted]);

  return {
    messages,
    loading,
    error,
    sendMessage,
    editMessage,
    deleteMessage,
    addReaction,
    removeReaction,
    loadMore,
    hasMore
  };
};

// User Avatar Component
const UserAvatar: React.FC<{
  user: { _id: string; name: string; avatar?: string };
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
}> = ({ user, size = 'md', showStatus = false }) => {
  const gradient = getUserGradient(user._id);
  const initials = getInitials(user.name);

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  return (
    <div className="relative flex-shrink-0">
      <div
        className={`${sizeClasses[size]} rounded-lg flex items-center justify-center text-white font-bold shadow-sm`}
        style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
      >
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-full h-full rounded-lg object-cover" />
        ) : (
          initials
        )}
      </div>
      {showStatus && (
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
      )}
    </div>
  );
};

// Parse and render formatted content
const FormattedContent: React.FC<{ content: string }> = ({ content }) => {
  const parseContent = (text: string) => {
    let result = text;

    // Bold
    result = result.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
    // Italic
    result = result.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    result = result.replace(/_(.*?)_/g, '<em class="italic">$1</em>');
    // Strikethrough
    result = result.replace(/~~(.*?)~~/g, '<del class="line-through">$1</del>');
    // Code
    result = result.replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 bg-rose-50 text-rose-600 rounded text-sm font-mono border border-rose-100">$1</code>');
    // Links
    result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');

    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  // Handle code blocks
  if (content.includes('```')) {
    const parts = content.split(/(```[\s\S]*?```)/g);
    return (
      <>
        {parts.map((part, idx) => {
          if (part.startsWith('```') && part.endsWith('```')) {
            const code = part.slice(3, -3);
            const [lang, ...lines] = code.split('\n');
            const codeContent = lines.join('\n') || lang;
            return (
              <pre key={idx} className="my-2 p-3 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm font-mono">
                <code>{codeContent}</code>
              </pre>
            );
          }
          return <span key={idx}>{parseContent(part)}</span>;
        })}
      </>
    );
  }

  return parseContent(content);
};

// Date Divider Component
const DateDivider: React.FC<{ date: string }> = ({ date }) => (
  <div className="flex items-center gap-4 my-6 px-5">
    <div className="flex-1 h-px bg-gray-200" />
    <span className="text-xs font-semibold text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
      {formatDateDivider(date)}
    </span>
    <div className="flex-1 h-px bg-gray-200" />
  </div>
);

// Emoji Picker Component
const EmojiPicker: React.FC<{ onSelect: (emoji: string) => void; onClose: () => void }> = ({ onSelect, onClose }) => {
  const emojis = ['👍', '👎', '❤️', '😂', '😮', '😢', '😡', '🎉', '🚀', '👀', '💯', '🔥', '✅', '❌', '🤔', '👏'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      className="absolute bottom-full right-0 mb-2 p-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50"
    >
      <div className="grid grid-cols-8 gap-1">
        {emojis.map(emoji => (
          <button
            key={emoji}
            onClick={() => { onSelect(emoji); onClose(); }}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors text-lg hover:scale-125"
          >
            {emoji}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

// Message Actions Component
const MessageActions: React.FC<{
  isOwn: boolean;
  onReact: () => void;
  onReply?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onPin?: () => void;
}> = ({ isOwn, onReact, onReply, onEdit, onDelete, onPin }) => (
  <motion.div
    initial={{ opacity: 0, y: 4 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 4 }}
    className="absolute -top-5 right-5 flex items-center gap-0.5 bg-white border border-gray-200 rounded-lg shadow-lg p-1"
  >
    <button
      onClick={onReact}
      className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-500 hover:text-gray-700"
      title="Add reaction"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>
    <button
      onClick={onReply}
      className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-500 hover:text-gray-700"
      title="Reply in thread"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
      </svg>
    </button>
    <button
      onClick={onPin}
      className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-500 hover:text-gray-700"
      title="Pin message"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    </button>
    {isOwn && (
      <>
        <div className="w-px h-4 bg-gray-200 mx-0.5" />
        <button
          onClick={onEdit}
          className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-500 hover:text-gray-700"
          title="Edit message"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 hover:bg-red-50 rounded-md transition-colors text-gray-500 hover:text-red-500"
          title="Delete message"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </>
    )}
  </motion.div>
);

// Message Item Component
const MessageItem: React.FC<{
  message: Message;
  currentUserId: string;
  onEdit: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  onReact: (id: string, emoji: string) => void;
  isCompact?: boolean;
}> = ({ message, currentUserId, onEdit, onDelete, onReact, isCompact = false }) => {
  const [showActions, setShowActions] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const isOwn = message.sender._id === currentUserId;

  const handleSaveEdit = () => {
    if (editContent.trim() && editContent !== message.content) {
      onEdit(message._id, editContent);
    }
    setIsEditing(false);
  };

  return (
    <div
      className={`group relative px-5 py-1.5 hover:bg-yellow-50/40 transition-colors ${isCompact ? 'pl-[68px]' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => { setShowActions(false); setShowEmojiPicker(false); }}
    >
      <div className={`flex gap-3 ${isCompact ? '' : 'pt-1'}`}>
        {/* Avatar - only show for first message in group */}
        {!isCompact && (
          <UserAvatar user={message.sender} size="md" />
        )}

        <div className="flex-1 min-w-0">
          {/* Header - only show for first message in group */}
          {!isCompact && (
            <div className="flex items-baseline gap-2 mb-0.5">
              <span className="font-bold text-gray-900 hover:underline cursor-pointer text-[15px]">
                {message.sender.name}
              </span>
              <span className="text-xs text-gray-500">
                {formatMessageTime(message.createdAt)}
              </span>
              {message.isEdited && (
                <span className="text-xs text-gray-400 italic">(edited)</span>
              )}
              {message.isPinned && (
                <span className="text-xs text-amber-600 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  Pinned
                </span>
              )}
            </div>
          )}

          {/* Content */}
          {isEditing ? (
            <div className="mt-1">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full bg-white border-2 border-blue-400 rounded-lg px-3 py-2 text-gray-900 text-[15px] focus:outline-none focus:border-blue-500 resize-none shadow-sm"
                rows={Math.min(editContent.split('\n').length + 1, 5)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSaveEdit();
                  }
                  if (e.key === 'Escape') setIsEditing(false);
                }}
                autoFocus
              />
              <div className="flex items-center gap-2 mt-2 text-xs">
                <span className="text-gray-500">escape to cancel • enter to save</span>
              </div>
            </div>
          ) : (
            <div className="text-gray-800 text-[15px] leading-[1.46668]">
              <FormattedContent content={message.content} />
            </div>
          )}

          {/* Attachments */}
          {message.attachments.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {message.attachments.map((att, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors cursor-pointer">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  <span>{att.name || 'Attachment'}</span>
                </div>
              ))}
            </div>
          )}

          {/* Reactions */}
          {message.reactions.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-1">
              {message.reactions.map((reaction, idx) => {
                const hasReacted = reaction.users.includes(currentUserId);
                return (
                  <button
                    key={idx}
                    onClick={() => onReact(message._id, reaction.emoji)}
                    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border transition-all hover:scale-105 ${hasReacted
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300'
                      }`}
                  >
                    <span className="text-sm">{reaction.emoji}</span>
                    <span>{reaction.users.length}</span>
                  </button>
                );
              })}
              <button
                onClick={() => setShowEmojiPicker(true)}
                className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-dashed border-gray-300 text-gray-400 hover:border-gray-400 hover:text-gray-500 hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <AnimatePresence>
        {showActions && !isEditing && (
          <MessageActions
            isOwn={isOwn}
            onReact={() => setShowEmojiPicker(!showEmojiPicker)}
            onEdit={() => setIsEditing(true)}
            onDelete={() => onDelete(message._id)}
          />
        )}
        {showEmojiPicker && (
          <div className="absolute -top-20 right-5 z-50">
            <EmojiPicker
              onSelect={(emoji) => onReact(message._id, emoji)}
              onClose={() => setShowEmojiPicker(false)}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Rich Text Composer Component
export const MessageComposer: React.FC<{
  onSend: (content: string, attachments?: any[]) => void;
  placeholder?: string;
  onTypingStart?: () => void;
  onTypingStop?: () => void;
}> = ({ onSend, placeholder = 'Type a message...', onTypingStart, onTypingStop }) => {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTypingRef = useRef(false);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);

    // Auto-resize
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }

    if (e.target.value && !isTypingRef.current) {
      isTypingRef.current = true;
      onTypingStart?.();
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (isTypingRef.current) {
        isTypingRef.current = false;
        onTypingStop?.();
      }
    }, 2000);
  };

  const applyFormatting = (prefix: string, suffix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    const newContent = content.substring(0, start) + prefix + selectedText + suffix + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      if (selectedText) {
        textarea.setSelectionRange(start + prefix.length, end + prefix.length);
      } else {
        textarea.setSelectionRange(start + prefix.length, start + prefix.length);
      }
    }, 0);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (content.trim()) {
      onSend(content.trim());
      setContent('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
      if (isTypingRef.current) {
        isTypingRef.current = false;
        onTypingStop?.();
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.metaKey || e.ctrlKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          applyFormatting('**', '**');
          break;
        case 'i':
          e.preventDefault();
          applyFormatting('*', '*');
          break;
        case 'k':
          e.preventDefault();
          applyFormatting('[', '](url)');
          break;
      }
    }
  };

  return (
    <div className="px-5 pb-5 pt-2 bg-white">
      <div className="border border-gray-300 rounded-xl bg-white focus-within:border-gray-400 focus-within:shadow-sm transition-all overflow-hidden">
        {/* Formatting Toolbar */}
        <div className="flex items-center gap-0.5 px-3 py-1.5 border-b border-gray-100 bg-gray-50/50">
          <button
            type="button"
            onClick={() => applyFormatting('**', '**')}
            title="Bold (⌘B)"
            className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white rounded transition-colors font-bold text-sm"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => applyFormatting('*', '*')}
            title="Italic (⌘I)"
            className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white rounded transition-colors italic text-sm"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => applyFormatting('~~', '~~')}
            title="Strikethrough"
            className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white rounded transition-colors line-through text-sm"
          >
            S
          </button>
          <div className="w-px h-4 bg-gray-200 mx-1" />
          <button
            type="button"
            onClick={() => applyFormatting('[', '](url)')}
            title="Link (⌘K)"
            className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white rounded transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => applyFormatting('`', '`')}
            title="Inline code"
            className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white rounded transition-colors font-mono text-xs"
          >
            {'</>'}
          </button>
          <button
            type="button"
            onClick={() => applyFormatting('\n```\n', '\n```\n')}
            title="Code block"
            className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white rounded transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </button>
          <div className="w-px h-4 bg-gray-200 mx-1" />
          <button
            type="button"
            title="Ordered list"
            className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white rounded transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
          <button
            type="button"
            title="Bullet list"
            className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white rounded transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Input Area */}
        <div className="flex items-end gap-2 p-3">
          <button
            type="button"
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Attach file"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>

          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 resize-none focus:outline-none text-[15px] leading-relaxed min-h-[24px] max-h-[200px]"
          />

          <div className="flex items-center gap-0.5 flex-shrink-0">
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Add emoji"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-lg"
              title="Mention someone"
            >
              @
            </button>
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Record video"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Record audio"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
            <div className="w-px h-5 bg-gray-200 mx-1" />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!content.trim()}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${content.trim()
                ? 'bg-[#007a5a] text-white hover:bg-[#148567] shadow-sm'
                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
              title="Send message"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Messages List Component
export const MessagesList: React.FC<{
  channelId?: string;
  conversationId?: string;
}> = ({ channelId, conversationId }) => {
  const { user } = useAuth();
  const { currentChannel } = useWorkspace();
  const {
    typingUsers,
    startTypingChannel,
    stopTypingChannel,
    startTypingConversation,
    stopTypingConversation
  } = useSocket();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    loading,
    sendMessage,
    editMessage,
    deleteMessage,
    addReaction,
    loadMore,
    hasMore
  } = useMessages(channelId, conversationId);

  const currentTypingUsers = channelId
    ? typingUsers.get(channelId) || []
    : conversationId
      ? typingUsers.get(conversationId) || []
      : [];

  const othersTyping = currentTypingUsers.filter(id => id !== user?.id);

  const handleTypingStart = () => {
    if (channelId) {
      startTypingChannel(channelId);
    } else if (conversationId) {
      startTypingConversation(conversationId);
    }
  };

  const handleTypingStop = () => {
    if (channelId) {
      stopTypingChannel(channelId);
    } else if (conversationId) {
      stopTypingConversation(conversationId);
    }
  };

  // Group messages by date and consecutive sender
  const groupedMessages = useMemo(() => {
    const groups: { date: string; messages: (Message & { isCompact: boolean })[] }[] = [];
    let currentDate = '';
    let lastSenderId = '';
    let lastMessageTime = 0;

    messages.forEach((msg) => {
      const msgDate = new Date(msg.createdAt).toDateString();
      const msgTime = new Date(msg.createdAt).getTime();
      const timeDiff = msgTime - lastMessageTime;
      const isCompact = msg.sender._id === lastSenderId && timeDiff < 5 * 60 * 1000 && msgDate === currentDate;

      if (msgDate !== currentDate) {
        groups.push({ date: msg.createdAt, messages: [] });
        currentDate = msgDate;
        lastSenderId = '';
      }

      groups[groups.length - 1].messages.push({ ...msg, isCompact });
      lastSenderId = msg.sender._id;
      lastMessageTime = msgTime;
    });

    return groups;
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleScroll = () => {
    if (containerRef.current?.scrollTop === 0 && hasMore && !loading) {
      loadMore();
    }
  };

  const handleReaction = (messageId: string, emoji: string) => {
    addReaction(messageId, emoji);
  };

  if (loading && messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-[#611f69] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Messages List */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto"
      >
        {hasMore && messages.length > 0 && (
          <div className="flex justify-center py-4">
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-4 py-2 text-sm text-[#611f69] hover:text-[#4a154b] hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-2 font-medium"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#611f69] border-t-transparent rounded-full animate-spin" />
                  Loading...
                </>
              ) : (
                'Load older messages'
              )}
            </button>
          </div>
        )}

        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <svg className="w-10 h-10 text-[#611f69]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {currentChannel ? `Welcome to #${currentChannel.name}` : 'Start a conversation'}
            </h3>
            <p className="text-gray-500 max-w-md leading-relaxed">
              {currentChannel
                ? `This is the very beginning of the #${currentChannel.name} channel. Send a message to kick things off!`
                : 'Send a message to start chatting!'
              }
            </p>
          </div>
        ) : (
          <div className="pb-2">
            {groupedMessages.map((group) => (
              <div key={group.date}>
                <DateDivider date={group.date} />
                {group.messages.map((message) => (
                  <MessageItem
                    key={message._id}
                    message={message}
                    currentUserId={user?.id || ''}
                    onEdit={editMessage}
                    onDelete={deleteMessage}
                    onReact={handleReaction}
                    isCompact={message.isCompact}
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Typing Indicator */}
      <AnimatePresence>
        {othersTyping.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-5 py-2 bg-white"
          >
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="flex gap-1">
                <motion.span
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                />
                <motion.span
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                />
                <motion.span
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                />
              </div>
              <span className="text-xs">
                {othersTyping.length === 1
                  ? 'Someone is typing...'
                  : `${othersTyping.length} people are typing...`
                }
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Composer */}
      <MessageComposer
        onSend={sendMessage}
        placeholder={channelId ? `Message #${currentChannel?.name || 'channel'}` : 'Write a message...'}
        onTypingStart={handleTypingStart}
        onTypingStop={handleTypingStop}
      />
    </div>
  );
};

export default MessagesList;
