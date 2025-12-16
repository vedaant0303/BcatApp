import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

interface OnlineUser {
  userId: string;
  status: 'online' | 'away' | 'dnd' | 'offline';
}

interface TypingUser {
  id: string;
  name: string;
}

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: Map<string, string>;
  typingUsers: Map<string, string[]>;

  // Connection methods
  connect: () => void;
  disconnect: () => void;

  // Status methods
  setUserStatus: (status: 'online' | 'away' | 'dnd') => void;

  // Channel methods
  joinChannel: (channelId: string) => void;
  leaveChannel: (channelId: string) => void;
  sendChannelMessage: (channelId: string, message: any) => void;
  startTypingChannel: (channelId: string) => void;
  stopTypingChannel: (channelId: string) => void;

  // Conversation (DM) methods
  joinConversation: (conversationId: string) => void;
  leaveConversation: (conversationId: string) => void;
  sendDirectMessage: (conversationId: string, message: any) => void;
  startTypingConversation: (conversationId: string) => void;
  stopTypingConversation: (conversationId: string) => void;

  // Message methods
  reactToMessage: (data: { channelId?: string; conversationId?: string; messageId: string; reaction: string; action: 'add' | 'remove' }) => void;
  editMessage: (data: { channelId?: string; conversationId?: string; messageId: string; content: string }) => void;
  deleteMessage: (data: { channelId?: string; conversationId?: string; messageId: string }) => void;

  // Thread methods
  sendThreadReply: (channelId: string, parentMessageId: string, reply: any) => void;

  // Huddle methods
  joinHuddle: (huddleId: string) => void;
  leaveHuddle: (huddleId: string) => void;
  toggleMute: (huddleId: string, isMuted: boolean) => void;
  toggleScreenShare: (huddleId: string, isSharing: boolean) => void;

  // Canvas methods
  joinCanvas: (canvasId: string) => void;
  updateCanvas: (canvasId: string, content: string) => void;

  // Event listeners
  onNewMessage: (callback: (message: any) => void) => () => void;
  onNewDM: (callback: (message: any) => void) => () => void;
  onTypingUpdate: (callback: (data: { channelId?: string; conversationId?: string; typingUsers: string[] }) => void) => () => void;
  onUserStatus: (callback: (data: { userId: string; status: string }) => void) => () => void;
  onMessageReaction: (callback: (data: any) => void) => () => void;
  onMessageEdited: (callback: (data: any) => void) => () => void;
  onMessageDeleted: (callback: (data: any) => void) => () => void;
  onThreadReply: (callback: (data: any) => void) => () => void;
  onNotification: (callback: (notification: any) => void) => () => void;
  onCanvasUpdate: (callback: (data: any) => void) => () => void;
  onHuddleUpdate: (callback: (data: any) => void) => () => void;
}

const SocketContext = createContext<SocketContextType | null>(null);

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export function SocketProvider({ children }: { children: ReactNode }) {
  const { user, token } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<Map<string, string>>(new Map());
  const [typingUsers, setTypingUsers] = useState<Map<string, string[]>>(new Map());

  // Initialize socket connection
  useEffect(() => {
    if (user && token) {
      const newSocket = io(SOCKET_URL, {
        transports: ['polling'], // Use polling only for App Engine Standard
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });


      newSocket.on('connect', () => {
        console.log('🔌 Socket connected');
        setIsConnected(true);
        newSocket.emit('user:online', user.id);
      });

      // Auto-rejoin user room on reconnection
      newSocket.on('reconnect', () => {
        console.log('🔌 Socket reconnected - rejoining rooms');
        newSocket.emit('user:online', user.id);
      });

      newSocket.on('disconnect', () => {
        console.log('🔌 Socket disconnected');
        setIsConnected(false);
      });

      newSocket.on('users:online', (users: OnlineUser[]) => {
        const usersMap = new Map<string, string>();
        users.forEach(u => usersMap.set(u.userId, u.status));
        setOnlineUsers(usersMap);
      });

      newSocket.on('user:status', ({ userId, status }) => {
        setOnlineUsers(prev => {
          const newMap = new Map(prev);
          newMap.set(userId, status);
          return newMap;
        });
      });

      newSocket.on('channel:typingUpdate', ({ channelId, typingUsers: users }) => {
        setTypingUsers(prev => {
          const newMap = new Map(prev);
          newMap.set(channelId, users);
          return newMap;
        });
      });

      newSocket.on('conversation:typingUpdate', ({ conversationId, typingUsers: users }) => {
        setTypingUsers(prev => {
          const newMap = new Map(prev);
          newMap.set(conversationId, users);
          return newMap;
        });
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
        setSocket(null);
        setIsConnected(false);
      };
    }
  }, [user, token]);

  // Connection methods
  const connect = useCallback(() => {
    if (socket && !socket.connected) {
      socket.connect();
    }
  }, [socket]);

  const disconnect = useCallback(() => {
    if (socket && socket.connected) {
      socket.disconnect();
    }
  }, [socket]);

  // Status methods
  const setUserStatus = useCallback((status: 'online' | 'away' | 'dnd') => {
    if (socket && user) {
      socket.emit('user:setStatus', { userId: user.id, status });
    }
  }, [socket, user]);

  // Channel methods
  const joinChannel = useCallback((channelId: string) => {
    socket?.emit('channel:join', channelId);
  }, [socket]);

  const leaveChannel = useCallback((channelId: string) => {
    socket?.emit('channel:leave', channelId);
  }, [socket]);

  const sendChannelMessage = useCallback((channelId: string, message: any) => {
    socket?.emit('message:send', { channelId, message });
  }, [socket]);

  const startTypingChannel = useCallback((channelId: string) => {
    if (socket && user) {
      socket.emit('channel:typing', { channelId, userId: user.id, isTyping: true });
    }
  }, [socket, user]);

  const stopTypingChannel = useCallback((channelId: string) => {
    if (socket && user) {
      socket.emit('channel:typing', { channelId, userId: user.id, isTyping: false });
    }
  }, [socket, user]);

  // Conversation (DM) methods
  const joinConversation = useCallback((conversationId: string) => {
    console.log('🔗 Joining conversation room:', conversationId, 'Socket connected:', !!socket?.connected);
    socket?.emit('conversation:join', conversationId);
  }, [socket]);

  const leaveConversation = useCallback((conversationId: string) => {
    console.log('👋 Leaving conversation room:', conversationId);
    socket?.emit('conversation:leave', conversationId);
  }, [socket]);

  const sendDirectMessage = useCallback((conversationId: string, message: any) => {
    console.log('📤 Sending DM to conversation:', conversationId);
    socket?.emit('dm:send', { conversationId, message });
  }, [socket]);

  const startTypingConversation = useCallback((conversationId: string) => {
    if (socket && user) {
      socket.emit('conversation:typing', { conversationId, userId: user.id, isTyping: true });
    }
  }, [socket, user]);

  const stopTypingConversation = useCallback((conversationId: string) => {
    if (socket && user) {
      socket.emit('conversation:typing', { conversationId, userId: user.id, isTyping: false });
    }
  }, [socket, user]);

  // Message methods
  const reactToMessage = useCallback((data: { channelId?: string; conversationId?: string; messageId: string; reaction: string; action: 'add' | 'remove' }) => {
    if (socket && user) {
      socket.emit('message:react', { ...data, userId: user.id });
    }
  }, [socket, user]);

  const editMessage = useCallback((data: { channelId?: string; conversationId?: string; messageId: string; content: string }) => {
    socket?.emit('message:edit', data);
  }, [socket]);

  const deleteMessage = useCallback((data: { channelId?: string; conversationId?: string; messageId: string }) => {
    socket?.emit('message:delete', data);
  }, [socket]);

  // Thread methods
  const sendThreadReply = useCallback((channelId: string, parentMessageId: string, reply: any) => {
    socket?.emit('thread:reply', { channelId, parentMessageId, reply });
  }, [socket]);

  // Huddle methods
  const joinHuddle = useCallback((huddleId: string) => {
    if (socket && user) {
      socket.emit('huddle:join', { huddleId, userId: user.id });
    }
  }, [socket, user]);

  const leaveHuddle = useCallback((huddleId: string) => {
    if (socket && user) {
      socket.emit('huddle:leave', { huddleId, userId: user.id });
    }
  }, [socket, user]);

  const toggleMute = useCallback((huddleId: string, isMuted: boolean) => {
    if (socket && user) {
      socket.emit('huddle:mute', { huddleId, userId: user.id, isMuted });
    }
  }, [socket, user]);

  const toggleScreenShare = useCallback((huddleId: string, isSharing: boolean) => {
    if (socket && user) {
      socket.emit('huddle:screenShare', { huddleId, userId: user.id, isSharing });
    }
  }, [socket, user]);

  // Canvas methods
  const joinCanvas = useCallback((canvasId: string) => {
    socket?.emit('canvas:join', canvasId);
  }, [socket]);

  const updateCanvas = useCallback((canvasId: string, content: string) => {
    if (socket && user) {
      socket.emit('canvas:update', { canvasId, content, userId: user.id });
    }
  }, [socket, user]);

  // Event listeners - return cleanup functions
  const onNewMessage = useCallback((callback: (message: any) => void) => {
    socket?.on('message:new', callback);
    return () => { socket?.off('message:new', callback); };
  }, [socket]);

  const onNewDM = useCallback((callback: (message: any) => void) => {
    console.log('📥 Setting up DM listener, socket connected:', !!socket?.connected);
    const wrappedCallback = (message: any) => {
      console.log('📩 Received dm:new event:', message);
      callback(message);
    };
    socket?.on('dm:new', wrappedCallback);
    return () => { socket?.off('dm:new', wrappedCallback); };
  }, [socket]);

  const onTypingUpdate = useCallback((callback: (data: { channelId?: string; conversationId?: string; typingUsers: string[] }) => void) => {
    const handleChannelTyping = (data: any) => callback({ channelId: data.channelId, typingUsers: data.typingUsers });
    const handleConvoTyping = (data: any) => callback({ conversationId: data.conversationId, typingUsers: data.typingUsers });

    socket?.on('channel:typingUpdate', handleChannelTyping);
    socket?.on('conversation:typingUpdate', handleConvoTyping);

    return () => {
      socket?.off('channel:typingUpdate', handleChannelTyping);
      socket?.off('conversation:typingUpdate', handleConvoTyping);
    };
  }, [socket]);

  const onUserStatus = useCallback((callback: (data: { userId: string; status: string }) => void) => {
    socket?.on('user:status', callback);
    return () => { socket?.off('user:status', callback); };
  }, [socket]);

  const onMessageReaction = useCallback((callback: (data: any) => void) => {
    socket?.on('message:reactionUpdate', callback);
    return () => { socket?.off('message:reactionUpdate', callback); };
  }, [socket]);

  const onMessageEdited = useCallback((callback: (data: any) => void) => {
    socket?.on('message:edited', callback);
    return () => { socket?.off('message:edited', callback); };
  }, [socket]);

  const onMessageDeleted = useCallback((callback: (data: any) => void) => {
    socket?.on('message:deleted', callback);
    return () => { socket?.off('message:deleted', callback); };
  }, [socket]);

  const onThreadReply = useCallback((callback: (data: any) => void) => {
    socket?.on('thread:newReply', callback);
    return () => { socket?.off('thread:newReply', callback); };
  }, [socket]);

  const onNotification = useCallback((callback: (notification: any) => void) => {
    socket?.on('notification:new', callback);
    return () => { socket?.off('notification:new', callback); };
  }, [socket]);

  const onCanvasUpdate = useCallback((callback: (data: any) => void) => {
    socket?.on('canvas:updated', callback);
    return () => { socket?.off('canvas:updated', callback); };
  }, [socket]);

  const onHuddleUpdate = useCallback((callback: (data: any) => void) => {
    const handlers = ['huddle:userJoined', 'huddle:userLeft', 'huddle:muteUpdate', 'huddle:screenShareUpdate'];
    handlers.forEach(event => socket?.on(event, callback));
    return () => { handlers.forEach(event => socket?.off(event, callback)); };
  }, [socket]);

  const value: SocketContextType = {
    socket,
    isConnected,
    onlineUsers,
    typingUsers,
    connect,
    disconnect,
    setUserStatus,
    joinChannel,
    leaveChannel,
    sendChannelMessage,
    startTypingChannel,
    stopTypingChannel,
    joinConversation,
    leaveConversation,
    sendDirectMessage,
    startTypingConversation,
    stopTypingConversation,
    reactToMessage,
    editMessage,
    deleteMessage,
    sendThreadReply,
    joinHuddle,
    leaveHuddle,
    toggleMute,
    toggleScreenShare,
    joinCanvas,
    updateCanvas,
    onNewMessage,
    onNewDM,
    onTypingUpdate,
    onUserStatus,
    onMessageReaction,
    onMessageEdited,
    onMessageDeleted,
    onThreadReply,
    onNotification,
    onCanvasUpdate,
    onHuddleUpdate,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}

export default SocketContext;
