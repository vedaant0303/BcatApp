import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { WorkspaceProvider, useWorkspace } from '../../context/WorkspaceContext';
import { getUserGradient, getInitials } from '../../utils/userColors';
import Sidebar from './Sidebar';
import ChannelHeader from './ChannelHeader';
import MessagesList from './MessagesList';
import TodoView from './TodoView';
import {
  EditChannelModal,
  AddMembersModal,
  ManageMemberModal,
  NotificationSettingsModal,
  DeleteChannelModal
} from './ChannelManagement';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Details Panel Component - Enhanced with Channel Management
const DetailsPanel: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const { currentChannel, currentConversation, fetchChannels } = useWorkspace();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'about' | 'members' | 'settings'>('about');
  const [memberSearch, setMemberSearch] = useState('');

  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteAction, setDeleteAction] = useState<'archive' | 'delete'>('archive');
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showMemberModal, setShowMemberModal] = useState(false);

  // Leave channel handler
  const handleLeaveChannel = async () => {
    if (!currentChannel || !token) return;
    if (!confirm(`Are you sure you want to leave #${currentChannel.name}?`)) return;

    try {
      const response = await fetch(`${API_BASE}/channels/${currentChannel._id}/leave`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        await fetchChannels();
        onClose();
      } else {
        alert(data.message || 'Failed to leave channel');
      }
    } catch (err) {
      console.error('Failed to leave channel:', err);
    }
  };

  // Get current user's role in channel
  const getCurrentUserRole = (): 'admin' | 'member' | null => {
    if (!currentChannel || !user) return null;
    const member = currentChannel.members?.find(
      (m: any) => (m.user?._id || m.user) === user.id
    );
    return member?.role || null;
  };

  // Get current user's notification settings
  const getCurrentUserNotifications = (): 'all' | 'mentions' | 'none' => {
    if (!currentChannel || !user) return 'all';
    const member = currentChannel.members?.find(
      (m: any) => (m.user?._id || m.user) === user.id
    );
    return member?.notifications || 'all';
  };

  const currentUserRole = getCurrentUserRole();
  const isAdmin = currentUserRole === 'admin';

  // Filter members by search
  const filteredMembers = (currentChannel?.members || currentConversation?.participants || []).filter(
    (member: any) => member.user?.name?.toLowerCase().includes(memberSearch.toLowerCase())
  );

  return (
    <>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 380, opacity: 1 }}
        exit={{ width: 0, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="border-l border-gray-200 bg-white flex flex-col"
      >
        {/* Header */}
        <div className="h-[49px] border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">{currentChannel ? '#' : '💬'}</span>
            <h3 className="text-gray-900 font-bold text-[15px]">
              {currentChannel?.displayName || currentChannel?.name || 'Details'}
            </h3>
            {currentChannel?.type === 'private' && (
              <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">🔒 Private</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          {[
            { id: 'about', label: 'About' },
            { id: 'members', label: 'Members' },
            { id: 'settings', label: 'Settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${activeTab === tab.id
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="p-4"
              >
                {currentChannel && (
                  <>
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Topic</label>
                        {isAdmin && (
                          <button
                            onClick={() => setShowEditModal(true)}
                            className="text-xs text-blue-600 hover:text-blue-700"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                      <p className="text-gray-700 text-sm">
                        {currentChannel.topic || (
                          <span className="text-gray-400 italic">Add a topic to let people know what this channel is about</span>
                        )}
                      </p>
                    </div>
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Description</label>
                        {isAdmin && (
                          <button
                            onClick={() => setShowEditModal(true)}
                            className="text-xs text-blue-600 hover:text-blue-700"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                      <p className="text-gray-700 text-sm">
                        {currentChannel.description || (
                          <span className="text-gray-400 italic">No description added</span>
                        )}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-gray-100 space-y-2">
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>Channel type</span>
                        <span className="font-medium text-gray-700 capitalize">{currentChannel.type}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>Created by</span>
                        <span className="font-medium text-gray-700">{(currentChannel as any)?.createdBy?.name || 'Admin'}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>Members</span>
                        <span className="font-medium text-gray-700">{currentChannel.members?.length || 0}</span>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {activeTab === 'members' && (
              <motion.div
                key="members"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">
                    {filteredMembers.length} members
                  </span>
                  {currentChannel && (
                    <button
                      onClick={() => setShowAddMembersModal(true)}
                      className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add people
                    </button>
                  )}
                </div>

                {/* Search Members */}
                <div className="relative mb-4">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Find members"
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  {filteredMembers.map((member: any, idx: number) => {
                    const userId = member.user?._id || member.user?.id || '';
                    const gradient = getUserGradient(userId);
                    const isCurrentUser = userId === user?.id;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                        onClick={() => {
                          if (isAdmin && !isCurrentUser && currentChannel) {
                            setSelectedMember(member);
                            setShowMemberModal(true);
                          }
                        }}
                      >
                        <div className="relative">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                            style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                          >
                            {getInitials(member.user?.name || '?')}
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-gray-900 text-sm font-medium truncate">
                            {member.user?.name || 'Unknown'}
                            {isCurrentUser && <span className="text-gray-400 ml-1">(you)</span>}
                          </div>
                          <div className="text-xs text-gray-500 truncate capitalize flex items-center gap-1">
                            {member.role === 'admin' && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700">
                                Admin
                              </span>
                            )}
                            {member.role !== 'admin' && 'Member'}
                          </div>
                        </div>
                        {isAdmin && !isCurrentUser && currentChannel && (
                          <button className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-gray-100 rounded transition-all">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="p-4"
              >
                <div className="space-y-1">
                  <button
                    onClick={() => setShowNotificationModal(true)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span className="text-lg">🔔</span>
                    <span className="flex-1 text-left">Notification preferences</span>
                    <span className="text-xs text-gray-400 capitalize">{getCurrentUserNotifications()}</span>
                  </button>

                  {isAdmin && currentChannel && (
                    <button
                      onClick={() => setShowEditModal(true)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="text-lg">✏️</span>
                      <span>Edit channel settings</span>
                    </button>
                  )}

                  <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-lg">📌</span>
                    <span>Pinned messages</span>
                  </button>

                  <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-lg">📁</span>
                    <span>Files</span>
                  </button>

                  <hr className="my-3 border-gray-200" />

                  {currentChannel && !currentChannel.isDefault && (
                    <button
                      onClick={handleLeaveChannel}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <span className="text-lg">🚪</span>
                      <span>Leave channel</span>
                    </button>
                  )}

                  {isAdmin && currentChannel && !currentChannel.isDefault && (
                    <>
                      <button
                        onClick={() => {
                          setDeleteAction('archive');
                          setShowDeleteModal(true);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                      >
                        <span className="text-lg">📦</span>
                        <span>Archive channel</span>
                      </button>

                      <button
                        onClick={() => {
                          setDeleteAction('delete');
                          setShowDeleteModal(true);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <span className="text-lg">🗑️</span>
                        <span>Delete channel</span>
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Modals */}
      <EditChannelModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        channel={currentChannel}
        onUpdated={() => fetchChannels()}
      />

      <AddMembersModal
        isOpen={showAddMembersModal}
        onClose={() => setShowAddMembersModal(false)}
        channel={currentChannel}
        onMembersAdded={() => fetchChannels()}
      />

      <ManageMemberModal
        isOpen={showMemberModal}
        onClose={() => {
          setShowMemberModal(false);
          setSelectedMember(null);
        }}
        channel={currentChannel}
        member={selectedMember}
        onMemberUpdated={() => fetchChannels()}
        currentUserRole={currentUserRole}
      />

      <NotificationSettingsModal
        isOpen={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
        channel={currentChannel}
        currentSettings={getCurrentUserNotifications()}
        onUpdated={() => fetchChannels()}
      />

      <DeleteChannelModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        channel={currentChannel}
        action={deleteAction}
        onConfirm={async () => {
          await fetchChannels();
          onClose();
        }}
      />
    </>
  );
};

// Main Content Area Component - Enhanced Style
const MainContent: React.FC = () => {
  const { currentChannel, currentConversation, loading, currentWorkspace, currentView, setCurrentView } = useWorkspace();
  const [showDetails, setShowDetails] = useState(false);

  const hasSelection = currentChannel || currentConversation;

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="relative w-12 h-12 mx-auto mb-4">
            <div className="absolute inset-0 border-3 border-purple-200 rounded-full" />
            <div className="absolute inset-0 border-3 border-transparent border-t-[#611f69] rounded-full animate-spin" />
          </div>
          <p className="text-gray-500 font-medium">Loading workspace...</p>
        </div>
      </div>
    );
  }

  if (!currentWorkspace) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center max-w-md p-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#611f69] to-[#8E609B] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Welcome to your Workspace</h2>
          <p className="text-gray-500 mb-6 leading-relaxed">
            Create or join a workspace to start collaborating with your team in real-time.
          </p>
          <button className="px-6 py-3 bg-[#611f69] hover:bg-[#4a154b] text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5">
            Create Workspace
          </button>
        </div>
      </div>
    );
  }

  // Show TodoView when currentView is 'todos'
  if (currentView === 'todos') {
    return (
      <div className="flex-1 flex flex-col bg-gradient-to-br from-[#1a0b1e] to-[#2d1f33]">
        {/* Todo View Header */}
        <div className="h-[49px] border-b border-[#8E609B]/20 flex items-center justify-between px-4 bg-[#1a0b1e]/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('messages')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Messages
            </button>
          </div>
        </div>
        {/* Todo Content */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <TodoView />
        </div>
      </div>
    );
  }

  if (!hasSelection) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center max-w-md p-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Start a conversation</h2>
          <p className="text-gray-500 leading-relaxed">
            Choose a channel or direct message from the sidebar to begin collaborating with your team.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex bg-white">
      {/* Main Channel/Conversation View */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChannelHeader
          onOpenDetails={() => setShowDetails(true)}
        />

        {/* Messages Content */}
        <div className="flex-1 min-h-0">
          <MessagesList
            channelId={currentChannel?._id}
            conversationId={currentConversation?._id}
          />
        </div>
      </div>

      {/* Details Panel */}
      <AnimatePresence>
        {showDetails && (
          <DetailsPanel onClose={() => setShowDetails(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

// Top Bar Component - Slack Style
const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userGradient = getUserGradient(user?.id || '');

  return (
    <div className="h-10 bg-[#350d36] flex items-center justify-between px-3">
      {/* Left - History Navigation */}
      <div className="flex items-center gap-1 w-24">
        <button className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors" title="Back">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors" title="Forward">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <button className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors" title="History">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <button
            onClick={() => setShowSearch(true)}
            className="w-full flex items-center gap-2 px-3 py-1.5 bg-white/20 hover:bg-white/25 rounded-md transition-colors text-white/80 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search Branding Catalyst</span>
            <span className="ml-auto text-xs bg-white/20 px-1.5 py-0.5 rounded">⌘K</span>
          </button>
        </div>
      </div>

      {/* Right - User Actions */}
      <div className="flex items-center gap-2 w-24 justify-end">
        <button className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors" title="Help">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="relative group"
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold ring-2 ring-white/20 group-hover:ring-white/40 transition-all"
              style={{ background: `linear-gradient(135deg, ${userGradient.from}, ${userGradient.to})` }}
            >
              {getInitials(user?.name || 'U')}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-[#350d36] rounded-full" />
          </button>

          <AnimatePresence>
            {showMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-2xl z-50 overflow-hidden border border-gray-100"
                >
                  <div className="p-4 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-sm"
                        style={{ background: `linear-gradient(135deg, ${userGradient.from}, ${userGradient.to})` }}
                      >
                        {getInitials(user?.name || 'U')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-gray-900 font-semibold truncate">{user?.name}</div>
                        <div className="text-sm text-gray-500 truncate">{user?.email}</div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-xs text-gray-500">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide px-3 py-2">Quick actions</div>
                    <button
                      onClick={() => navigate('/')}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Back to Home
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Preferences
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Edit Profile
                    </button>
                  </div>

                  <div className="border-t border-gray-100 p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
        </div>
      </div>
    </div>
  );
};

// Main Workspace Layout Component - Light Theme
const WorkspaceLayoutInner: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      <TopBar />
      <div className="flex-1 flex min-h-0">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
};

// Export with Provider wrapper
const WorkspaceLayout: React.FC = () => {
  return (
    <WorkspaceProvider>
      <WorkspaceLayoutInner />
    </WorkspaceProvider>
  );
};

export default WorkspaceLayout;
