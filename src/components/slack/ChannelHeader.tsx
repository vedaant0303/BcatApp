import React, { useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useAuth } from '../../context/AuthContext';
import { getUserGradient, getInitials } from '../../utils/userColors';
import { motion, AnimatePresence } from 'framer-motion';

interface ChannelHeaderProps {
  onOpenDetails?: () => void;
}

const ChannelHeader: React.FC<ChannelHeaderProps> = ({ onOpenDetails }) => {
  const { currentChannel, currentConversation } = useWorkspace();
  const { user } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Determine display info based on channel or conversation
  const isChannel = !!currentChannel;
  const target = currentChannel || currentConversation;

  if (!target) {
    return (
      <div className="h-[49px] border-b border-gray-200/80 flex items-center px-5 bg-white">
        <div className="flex items-center gap-2 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-sm font-medium">Select a channel or conversation</span>
        </div>
      </div>
    );
  }

  const getDisplayName = () => {
    if (isChannel) {
      return currentChannel?.displayName || currentChannel?.name;
    }
    if (currentConversation) {
      if (currentConversation.type === 'group') {
        return currentConversation.name || 'Group Chat';
      }
      const other = currentConversation.participants?.find(
        (p: any) => p.user._id !== user?.id && p.user.id !== user?.id
      );
      return other?.user?.name || 'Direct Message';
    }
    return 'Unknown';
  };

  const getOtherUser = () => {
    if (currentConversation && currentConversation.type !== 'group') {
      return currentConversation.participants?.find(
        (p: any) => p.user._id !== user?.id && p.user.id !== user?.id
      )?.user;
    }
    return null;
  };

  const otherUser = getOtherUser();
  const memberCount = isChannel 
    ? currentChannel?.members?.length || 0 
    : currentConversation?.participants?.length || 0;

  return (
    <div className="h-[49px] border-b border-gray-200/80 flex items-center justify-between px-4 bg-white">
      {/* Left - Channel/DM Info */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <button 
          onClick={onOpenDetails}
          className="flex items-center gap-2 hover:bg-gray-100 rounded-lg px-2 py-1.5 -ml-2 transition-colors group"
        >
          {isChannel ? (
            <>
              <span className="text-lg">
                {currentChannel?.type === 'private' ? '🔒' : '#'}
              </span>
              <h1 className="text-gray-900 font-bold text-[15px] truncate">{getDisplayName()}</h1>
            </>
          ) : (
            <>
              {otherUser && (
                <div className="relative">
                  <div 
                    className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-bold"
                    style={{ background: `linear-gradient(135deg, ${getUserGradient(otherUser._id || otherUser.id).from}, ${getUserGradient(otherUser._id || otherUser.id).to})` }}
                  >
                    {getInitials(otherUser.name)}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                </div>
              )}
              <h1 className="text-gray-900 font-bold text-[15px] truncate">{getDisplayName()}</h1>
            </>
          )}
          <svg className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Topic/Description */}
        <div className="hidden md:flex items-center border-l border-gray-200 pl-3 ml-1">
          {isChannel && currentChannel?.topic ? (
            <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors truncate max-w-xs">
              {currentChannel.topic}
            </button>
          ) : isChannel ? (
            <button className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
              Add a topic
            </button>
          ) : null}
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-0.5">
        {/* Search in conversation */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 200, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-3 py-1.5 text-sm bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-blue-500 focus:bg-white"
                autoFocus
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Huddle Button */}
        <button
          className="p-2 rounded-lg transition-colors text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          title="Start a huddle"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        </button>

        {/* Canvas/Notes */}
        <button
          className="p-2 rounded-lg transition-colors text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          title="View canvas"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </button>

        {/* Search Toggle */}
        <button
          onClick={() => setShowSearch(!showSearch)}
          className={`p-2 rounded-lg transition-colors ${showSearch ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
          title="Search in conversation"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Members Button */}
        <button
          onClick={onOpenDetails}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm rounded-lg transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span className="font-medium">{memberCount}</span>
        </button>

        {/* More Options */}
        <button
          className="p-2 rounded-lg transition-colors text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          title="More options"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChannelHeader;
