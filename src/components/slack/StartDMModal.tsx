import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useSocket } from '../../context/SocketContext';
import { getUserGradient, getInitials } from '../../utils/userColors';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  department?: string;
  position?: string;
}

interface StartDMModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (conversation: any) => void;
}

export const StartDMModal: React.FC<StartDMModalProps> = ({ isOpen, onClose, onSelect }) => {
  const { token, user: currentUser } = useAuth();
  const { currentWorkspace, createConversation } = useWorkspace();
  const { onlineUsers } = useSocket();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  // Fetch all users (not just workspace members) for DM
  useEffect(() => {
    const fetchUsers = async () => {
      if (!isOpen || !token) return;
      
      setLoading(true);
      try {
        // Fetch all users using the search endpoint
        const response = await fetch(
          `${API_BASE}/users/search`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await response.json();
        
        if (data.success) {
          setUsers(data.users);
          setFilteredUsers(data.users);
        }
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isOpen, token]);

  // Search users as user types
  useEffect(() => {
    const searchUsers = async () => {
      if (!token) return;
      
      if (!searchQuery.trim()) {
        // Reset to all users when search is cleared
        try {
          const response = await fetch(
            `${API_BASE}/users/search`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const data = await response.json();
          if (data.success) {
            setFilteredUsers(data.users);
          }
        } catch (err) {
          console.error('Failed to fetch users:', err);
        }
        return;
      }
      
      // Search with query
      try {
        const response = await fetch(
          `${API_BASE}/users/search?q=${encodeURIComponent(searchQuery)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await response.json();
        if (data.success) {
          setFilteredUsers(data.users);
        }
      } catch (err) {
        setFilteredUsers(
          users.filter(
            u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                 u.email.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      }
    };
    
    const debounceTimer = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, token, users]);

  const toggleUserSelection = (user: User) => {
    setSelectedUsers(prev => {
      const isSelected = prev.some(u => u._id === user._id);
      if (isSelected) {
        return prev.filter(u => u._id !== user._id);
      }
      return [...prev, user];
    });
  };

  const handleStartConversation = async () => {
    if (selectedUsers.length === 0) return;

    setCreating(true);
    try {
      const participantIds = selectedUsers.map(u => u._id);
      const conversation = await createConversation(participantIds);
      onSelect(conversation);
      onClose();
      setSelectedUsers([]);
      setSearchQuery('');
    } catch (err) {
      console.error('Failed to create conversation:', err);
    } finally {
      setCreating(false);
    }
  };

  const getOnlineStatus = (userId: string) => {
    return onlineUsers.get(userId) || 'offline';
  };

  const statusColors: Record<string, string> = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-gray-500'
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedUsers.length > 1 ? 'New group message' : 'New message'}
              </h2>
              <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Search Input */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                To:
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for people..."
                className="w-full bg-gray-50 border-0 rounded-xl py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                autoFocus
              />
            </div>

            {/* Selected Users */}
            {selectedUsers.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedUsers.map(user => (
                  <span
                    key={user._id}
                    className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    {user.name}
                    <button
                      onClick={() => toggleUserSelection(user)}
                      className="hover:text-blue-900 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* User List */}
          <div className="max-h-80 overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center text-gray-500">
                Loading users...
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                {searchQuery ? 'No users found' : 'No team members available'}
              </div>
            ) : (
              <div className="py-2">
                {filteredUsers.map(user => {
                  const isSelected = selectedUsers.some(u => u._id === user._id);
                  const status = getOnlineStatus(user._id);
                  const userGradient = getUserGradient(user._id);
                  
                  return (
                    <button
                      key={user._id}
                      onClick={() => toggleUserSelection(user)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors ${
                        isSelected ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="relative">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold shadow-sm"
                          style={{ background: `linear-gradient(135deg, ${userGradient.from}, ${userGradient.to})` }}
                        >
                          {user.avatar ? (
                            <img src={user.avatar} alt="" className="w-full h-full rounded-lg object-cover" />
                          ) : (
                            getInitials(user.name)
                          )}
                        </div>
                        <span 
                          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${statusColors[status]}`}
                        />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="text-gray-900 font-medium truncate">{user.name}</div>
                        <div className="text-sm text-gray-500 truncate">
                          {user.position || user.department || user.email}
                        </div>
                      </div>
                      {isSelected && (
                        <span className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <button
              onClick={handleStartConversation}
              disabled={selectedUsers.length === 0 || creating}
              className={`w-full py-3 rounded-xl font-semibold transition-all ${
                selectedUsers.length > 0 && !creating
                  ? 'bg-[#007a5a] text-white hover:bg-[#006849] shadow-sm hover:shadow-md'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {creating ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating...
                </span>
              ) : selectedUsers.length > 1 ? 'Create group' : 'Start conversation'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Inline DM Composer for quick DM
export const QuickDMComposer: React.FC<{
  onStartDM: () => void;
}> = ({ onStartDM }) => {
  return (
    <button
      onClick={onStartDM}
      className="w-full flex items-center gap-2 px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-sm"
    >
      <span className="w-5 h-5 flex items-center justify-center rounded bg-gray-100 text-xs">+</span>
      <span>Add teammates</span>
    </button>
  );
};

export default StartDMModal;
