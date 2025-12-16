import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import { StartDMModal } from './StartDMModal';
import { CreateChannelModal } from './ChannelManagement';
import ProfileModal from './ProfileModal';
import { getUserGradient, getInitials } from '../../utils/userColors';

// Online Status Indicator Component
const OnlineStatusIndicator: React.FC<{ userId: string; size?: 'sm' | 'md' }> = ({ userId, size = 'sm' }) => {
  const { onlineUsers } = useSocket();
  const status = onlineUsers.get(userId) || 'offline';

  const sizeClasses = size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3';
  const statusColors: Record<string, string> = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-gray-400'
  };

  return (
    <span
      className={`${sizeClasses} rounded-full ${statusColors[status]} border-2 border-white`}
      title={status.charAt(0).toUpperCase() + status.slice(1)}
    />
  );
};

// Workspace Switcher Component
const WorkspaceSwitcher: React.FC = () => {
  const { workspaces, currentWorkspace, selectWorkspace } = useWorkspace();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8E609B] to-[#FF5722] flex items-center justify-center text-white font-bold hover:opacity-90 transition-opacity"
      >
        {currentWorkspace?.name?.charAt(0).toUpperCase() || 'W'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute left-full top-0 ml-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden"
            >
              <div className="p-3 border-b border-gray-200">
                <h3 className="text-gray-900 font-semibold">Workspaces</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {workspaces.map((workspace) => (
                  <button
                    key={workspace._id}
                    onClick={() => {
                      selectWorkspace(workspace);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors ${currentWorkspace?._id === workspace._id ? 'bg-purple-50' : ''
                      }`}
                  >
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-[#8E609B] to-[#FF5722] flex items-center justify-center text-white font-bold text-sm">
                      {workspace.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <div className="text-gray-900 font-medium truncate">{workspace.name}</div>
                      <div className="text-xs text-gray-500 truncate">{workspace.slug}</div>
                    </div>
                    {currentWorkspace?._id === workspace._id && (
                      <span className="text-[#8E609B]">✓</span>
                    )}
                  </button>
                ))}
              </div>
              <div className="p-2 border-t border-gray-200">
                <button className="w-full text-left px-3 py-2 text-sm text-[#8E609B] hover:bg-gray-50 rounded transition-colors">
                  + Create Workspace
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// Channel Item Component
const ChannelItem: React.FC<{
  channel: any;
  isSelected: boolean;
  onClick: () => void;
}> = ({ channel, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-1 rounded-md transition-colors text-[15px] ${isSelected
        ? 'bg-[#1264a3] text-white'
        : 'text-white/70 hover:text-white hover:bg-white/10'
        }`}
    >
      <span className={`text-lg ${isSelected ? 'text-white/90' : 'text-white/50'}`}>
        {channel.type === 'private' ? '🔒' : '#'}
      </span>
      <span className="truncate flex-1 text-left">{channel.displayName || channel.name}</span>
      {channel.unreadCount > 0 && (
        <span className="bg-[#e01e5a] text-white text-xs font-medium rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
          {channel.unreadCount > 99 ? '99+' : channel.unreadCount}
        </span>
      )}
    </button>
  );
};

// DM Item Component
const DMItem: React.FC<{
  conversation: any;
  isSelected: boolean;
  onClick: () => void;
  currentUserId: string;
}> = ({ conversation, isSelected, onClick, currentUserId }) => {
  // Find the other participant - handle both _id and id fields
  const otherParticipant = conversation.participants.find(
    (p: any) => {
      const participantId = p.user?._id || p.user?.id;
      return participantId !== currentUserId && participantId?.toString() !== currentUserId;
    }
  );

  const displayName = conversation.type === 'group'
    ? conversation.name || conversation.participants.map((p: any) => p.user?.name || 'Unknown').join(', ')
    : otherParticipant?.user?.name || 'Unknown';

  const otherUserId = conversation.type !== 'group' ? (otherParticipant?.user?._id || otherParticipant?.user?.id) : null;
  const conv = conversation;

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-1 rounded-md transition-colors ${isSelected
        ? 'bg-[#1264a3] text-white'
        : 'text-white/70 hover:text-white hover:bg-white/10'
        }`}
    >
      <div className="relative">
        <div
          className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold shadow-sm"
          style={{ background: `linear-gradient(135deg, ${getUserGradient(otherParticipant?.user?._id || conv._id).from}, ${getUserGradient(otherParticipant?.user?._id || conv._id).to})` }}
        >
          {getInitials(displayName)}
        </div>
        {otherUserId && (
          <div className="absolute -bottom-0.5 -right-0.5">
            <OnlineStatusIndicator userId={otherUserId} size="sm" />
          </div>
        )}
      </div>
      <span className="truncate flex-1 text-left text-[15px]">{displayName}</span>
      {conversation.unreadCount > 0 && (
        <span className="bg-[#e01e5a] text-white text-xs font-medium rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
          {conversation.unreadCount}
        </span>
      )}
    </button>
  );
};

// Main Sidebar Component
const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const {
    currentWorkspace,
    channels,
    conversations,
    currentChannel,
    currentConversation,
    currentView,
    selectChannel,
    selectConversation,
    setCurrentView,
    fetchConversations,
    fetchChannels
  } = useWorkspace();

  const [channelsExpanded, setChannelsExpanded] = useState(true);
  const [dmsExpanded, setDmsExpanded] = useState(true);
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [showStartDM, setShowStartDM] = useState(false);

  const handleDMSelect = async (conversation: any) => {
    selectConversation(conversation);
    setShowStartDM(false);
    // Refresh conversations list to ensure sync with database
    await fetchConversations();
  };

  return (
    <div className="flex h-full bg-[#3f0e40]">
      {/* Workspace Rail */}
      <div className="w-[70px] flex flex-col items-center py-3 gap-3 bg-[#3f0e40] border-r border-[#522653]">
        <WorkspaceSwitcher />

        {/* Navigation Icons */}
        <div className="mt-4 flex flex-col items-center gap-2 w-full px-3">
          <button className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" title="Home">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>
          <button className="w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors" title="DMs">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          <button className="w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors" title="Activity">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </div>

        <div className="flex-1" />

        {/* Add button */}
        <button className="w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors mb-2" title="Create new">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Channel List */}
      <div className="w-[260px] flex flex-col bg-[#3f0e40]">
        {/* Workspace Header */}
        <div className="h-[49px] flex items-center justify-between px-4 border-b border-[#522653] shadow-sm">
          <button className="flex items-center gap-1 hover:bg-white/10 rounded px-1 py-0.5 transition-colors group">
            <h2 className="text-white font-bold text-[18px] truncate">{currentWorkspace?.name || 'Workspace'}</h2>
            <svg className="w-4 h-4 text-white/70 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pt-3">
          {/* Quick Actions */}
          <div className="px-2 mb-2">
            <button
              onClick={() => selectChannel(null as any)}
              className="w-full flex items-center gap-3 px-3 py-1.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors rounded-md text-[15px]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Threads
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-1.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors rounded-md text-[15px]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Saved items
            </button>
            {/* Todo Lists Button */}
            <button
              onClick={() => setCurrentView('todos')}
              className={`w-full flex items-center gap-3 px-3 py-1.5 transition-colors rounded-md text-[15px] ${currentView === 'todos'
                ? 'bg-[#1264a3] text-white'
                : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Todo Lists
              {user?.role === 'admin' && (
                <span className="ml-auto text-[10px] bg-[#8E609B]/50 px-1.5 py-0.5 rounded">Admin</span>
              )}
            </button>
            {/* Payroll Button */}
            <a
              href={user?.role === 'admin'
                ? "https://frontend-silk-two-26.vercel.app/#/login"
                : "https://employee-portal-omega-roan.vercel.app/"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-3 px-3 py-1.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors rounded-md text-[15px]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Payroll
            </a>
          </div>

          {/* Channels Section */}
          <div className="mt-2">
            <button
              onClick={() => setChannelsExpanded(!channelsExpanded)}
              className="w-full flex items-center justify-between px-4 py-1 text-[15px] text-white/70 hover:text-white transition-colors group"
            >
              <span className="flex items-center gap-1">
                <svg
                  className={`w-3 h-3 transition-transform ${channelsExpanded ? 'rotate-90' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Channels
              </span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </span>
            </button>

            <AnimatePresence>
              {channelsExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden px-2"
                >
                  {channels.map((channel) => (
                    <ChannelItem
                      key={channel._id}
                      channel={channel}
                      isSelected={currentChannel?._id === channel._id && currentView === 'messages'}
                      onClick={() => { selectChannel(channel); setCurrentView('messages'); }}
                    />
                  ))}
                  <button
                    onClick={() => setShowCreateChannel(true)}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-white/50 hover:text-white/70 transition-colors text-[15px] rounded-md hover:bg-white/5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add channels
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Direct Messages Section */}
          <div className="mt-4">
            <button
              onClick={() => setDmsExpanded(!dmsExpanded)}
              className="w-full flex items-center justify-between px-4 py-1 text-[15px] text-white/70 hover:text-white transition-colors group"
            >
              <span className="flex items-center gap-1">
                <svg
                  className={`w-3 h-3 transition-transform ${dmsExpanded ? 'rotate-90' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Direct messages
              </span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </span>
            </button>

            <AnimatePresence>
              {dmsExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden px-2"
                >
                  {conversations.map((conv) => (
                    <DMItem
                      key={conv._id}
                      conversation={conv}
                      isSelected={currentConversation?._id === conv._id && currentView === 'messages'}
                      onClick={() => { selectConversation(conv); setCurrentView('messages'); }}
                      currentUserId={user?.id || ''}
                    />
                  ))}
                  <button
                    onClick={() => setShowStartDM(true)}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-white/50 hover:text-white/70 transition-colors text-[15px] rounded-md hover:bg-white/5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add teammates
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* User Profile */}
        <UserProfileSection />
      </div>

      {/* Start DM Modal */}
      <StartDMModal
        isOpen={showStartDM}
        onClose={() => setShowStartDM(false)}
        onSelect={handleDMSelect}
      />

      {/* Create Channel Modal */}
      <CreateChannelModal
        isOpen={showCreateChannel}
        onClose={() => setShowCreateChannel(false)}
        onCreated={async (channel) => {
          await fetchChannels();
          selectChannel(channel);
        }}
      />
    </div>
  );
};

// User Profile Section with Status Dropdown
const UserProfileSection: React.FC = () => {
  const { user, logout } = useAuth();
  const { setUserStatus, isConnected } = useSocket();
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<'online' | 'away' | 'dnd'>('online');

  const statusOptions = [
    { value: 'online', label: 'Active', color: 'bg-green-500' },
    { value: 'away', label: 'Away', color: 'bg-yellow-500' },
    { value: 'dnd', label: 'Do not disturb', color: 'bg-red-500' }
  ];

  const handleStatusChange = (status: 'online' | 'away' | 'dnd') => {
    setCurrentStatus(status);
    setUserStatus(status);
    setShowStatusMenu(false);
  };

  const currentStatusOption = statusOptions.find(s => s.value === currentStatus);
  const userGradient = getUserGradient(user?.id || '');
  const userAvatar = user?.avatar;

  return (
    <div className="p-3 border-t border-[#522653] relative">
      <button
        onClick={() => setShowStatusMenu(!showStatusMenu)}
        className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        <div className="relative">
          {userAvatar ? (
            <div
              className="w-9 h-9 rounded-lg bg-cover bg-center shadow-sm"
              style={{ backgroundImage: `url(${userAvatar})` }}
            />
          ) : (
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold shadow-sm"
              style={{ background: `linear-gradient(135deg, ${userGradient.from}, ${userGradient.to})` }}
            >
              {getInitials(user?.name || 'U')}
            </div>
          )}
          <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 ${currentStatusOption?.color} border-2 border-[#3f0e40] rounded-full`} />
        </div>
        <div className="flex-1 text-left min-w-0">
          <div className="text-white text-sm font-medium truncate">{user?.name || 'User'}</div>
          <div className="text-xs text-white/50 flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${currentStatusOption?.color}`} />
            {currentStatusOption?.label}
            {!isConnected && <span className="text-red-400 ml-1">(Offline)</span>}
          </div>
        </div>
        <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {showStatusMenu && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowStatusMenu(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full left-3 right-3 mb-2 bg-white rounded-xl shadow-2xl z-50 overflow-hidden border border-gray-100"
            >
              <div className="p-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  {userAvatar ? (
                    <div
                      className="w-10 h-10 rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${userAvatar})` }}
                    />
                  ) : (
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                      style={{ background: `linear-gradient(135deg, ${userGradient.from}, ${userGradient.to})` }}
                    >
                      {getInitials(user?.name || 'U')}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-gray-900">{user?.name}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${currentStatusOption?.color}`} />
                      {currentStatusOption?.label}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-1.5">
                <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide px-2 py-1">Set status</div>
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleStatusChange(option.value as 'online' | 'away' | 'dnd')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors ${currentStatus === option.value ? 'bg-blue-50' : ''
                      }`}
                  >
                    <span className={`w-3 h-3 rounded-full ${option.color}`} />
                    <span className="text-gray-700 text-sm font-medium">{option.label}</span>
                    {currentStatus === option.value && (
                      <span className="ml-auto text-blue-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="border-t border-gray-100 p-1.5">
                <button
                  onClick={() => {
                    setShowStatusMenu(false);
                    setShowProfileModal(true);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 text-sm"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Edit Profile
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 text-sm">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Preferences
                </button>
                <button
                  onClick={() => {
                    setShowStatusMenu(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-red-600 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />


    </div>
  );
};

export default Sidebar;
