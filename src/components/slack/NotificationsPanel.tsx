import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useWorkspace } from '../../context/WorkspaceContext';

interface Notification {
  _id: string;
  type: 'mention' | 'dm' | 'reaction' | 'thread' | 'channel' | 'keyword' | 'reminder';
  title: string;
  message: string;
  channel?: { _id: string; name: string };
  conversation?: { _id: string };
  sender?: { _id: string; name: string; avatar?: string };
  relatedMessage?: string;
  read: boolean;
  createdAt: string;
}

interface NotificationPreferences {
  desktop: boolean;
  mobile: boolean;
  email: boolean;
  mentions: boolean;
  directMessages: boolean;
  threads: boolean;
  keywords: string[];
  dnd: {
    enabled: boolean;
    from?: string;
    to?: string;
  };
}

// Notifications Hook
export const useNotifications = () => {
  const { token } = useAuth();
  const { currentWorkspace } = useWorkspace();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const fetchNotifications = useCallback(async () => {
    if (!token || !currentWorkspace) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE}/notifications?workspace=${currentWorkspace._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      
      if (data.success) {
        setNotifications(data.notifications);
        setUnreadCount(data.notifications.filter((n: Notification) => !n.read).length);
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    } finally {
      setLoading(false);
    }
  }, [token, currentWorkspace]);

  const markAsRead = useCallback(async (notificationId: string) => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE}/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        setNotifications(prev => 
          prev.map(n => n._id === notificationId ? { ...n, read: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  }, [token]);

  const markAllAsRead = useCallback(async () => {
    if (!token || !currentWorkspace) return;

    try {
      const response = await fetch(
        `${API_BASE}/notifications/mark-all-read?workspace=${currentWorkspace._id}`,
        {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const data = await response.json();
      if (data.success) {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        setUnreadCount(0);
      }
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  }, [token, currentWorkspace]);

  const deleteNotification = useCallback(async (notificationId: string) => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE}/notifications/${notificationId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        const notification = notifications.find(n => n._id === notificationId);
        setNotifications(prev => prev.filter(n => n._id !== notificationId));
        if (notification && !notification.read) {
          setUnreadCount(prev => Math.max(0, prev - 1));
        }
      }
    } catch (err) {
      console.error('Failed to delete notification:', err);
    }
  }, [token, notifications]);

  const fetchPreferences = useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE}/notifications/preferences`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        setPreferences(data.preferences);
      }
    } catch (err) {
      console.error('Failed to fetch preferences:', err);
    }
  }, [token]);

  const updatePreferences = useCallback(async (updates: Partial<NotificationPreferences>) => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE}/notifications/preferences`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });

      const data = await response.json();
      if (data.success) {
        setPreferences(data.preferences);
      }
    } catch (err) {
      console.error('Failed to update preferences:', err);
    }
  }, [token]);

  useEffect(() => {
    fetchNotifications();
    fetchPreferences();
  }, [fetchNotifications, fetchPreferences]);

  return {
    notifications,
    unreadCount,
    loading,
    preferences,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    updatePreferences
  };
};

// Notification Item Component
const NotificationItem: React.FC<{
  notification: Notification;
  onRead: () => void;
  onDelete: () => void;
  onClick: () => void;
}> = ({ notification, onRead, onDelete, onClick }) => {
  const [showMenu, setShowMenu] = useState(false);

  const getIcon = () => {
    switch (notification.type) {
      case 'mention': return '@';
      case 'dm': return '💬';
      case 'reaction': return '👍';
      case 'thread': return '🧵';
      case 'channel': return '#';
      case 'keyword': return '🔔';
      case 'reminder': return '⏰';
      default: return '📌';
    }
  };

  const getTimeAgo = (date: string) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`relative group p-3 rounded-lg cursor-pointer transition-colors ${
        notification.read 
          ? 'hover:bg-gray-100' 
          : 'bg-[#8E609B]/5 hover:bg-[#8E609B]/10'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        {/* Unread indicator */}
        {!notification.read && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#8E609B] rounded-r" />
        )}

        {/* Icon */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
          notification.read ? 'bg-gray-100' : 'bg-[#8E609B]/10'
        }`}>
          {notification.sender?.avatar ? (
            <img 
              src={notification.sender.avatar} 
              alt="" 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            getIcon()
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`font-medium ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
              {notification.title}
            </span>
            {notification.channel && (
              <span className="text-xs text-gray-500">in #{notification.channel.name}</span>
            )}
          </div>
          
          <p className={`text-sm mt-0.5 line-clamp-2 ${
            notification.read ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {notification.message}
          </p>

          <span className="text-xs text-gray-400 mt-1 block">
            {getTimeAgo(notification.createdAt)}
          </span>
        </div>

        {/* Actions */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
          >
            ⋮
          </button>

          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-xl z-10 py-1 min-w-[140px]"
              >
                {!notification.read && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRead();
                      setShowMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    ✓ Mark as read
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  🗑️ Delete
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

// Notification Preferences Panel
const PreferencesPanel: React.FC<{
  preferences: NotificationPreferences;
  onUpdate: (updates: Partial<NotificationPreferences>) => void;
  onClose: () => void;
}> = ({ preferences, onUpdate, onClose }) => {
  const [keywords, setKeywords] = useState(preferences.keywords.join(', '));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-gray-200"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              ✕
            </button>
          </div>

          <div className="p-4 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Notification Channels */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Notification Channels</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-gray-600">Desktop notifications</span>
                  <input
                    type="checkbox"
                    checked={preferences.desktop}
                    onChange={(e) => onUpdate({ desktop: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#8E609B] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all relative" />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-gray-600">Mobile push</span>
                  <input
                    type="checkbox"
                    checked={preferences.mobile}
                    onChange={(e) => onUpdate({ mobile: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#8E609B] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all relative" />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-gray-600">Email notifications</span>
                  <input
                    type="checkbox"
                    checked={preferences.email}
                    onChange={(e) => onUpdate({ email: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#8E609B] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all relative" />
                </label>
              </div>
            </div>

            {/* Notify Me About */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Notify Me About</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-gray-600">@ mentions</span>
                  <input
                    type="checkbox"
                    checked={preferences.mentions}
                    onChange={(e) => onUpdate({ mentions: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#8E609B] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all relative" />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-gray-600">Direct messages</span>
                  <input
                    type="checkbox"
                    checked={preferences.directMessages}
                    onChange={(e) => onUpdate({ directMessages: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#8E609B] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all relative" />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-gray-600">Thread replies</span>
                  <input
                    type="checkbox"
                    checked={preferences.threads}
                    onChange={(e) => onUpdate({ threads: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#8E609B] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all relative" />
                </label>
              </div>
            </div>

            {/* Custom Keywords */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Custom Keywords</h3>
              <p className="text-xs text-gray-500 mb-3">
                Get notified when these words are mentioned
              </p>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                onBlur={() => onUpdate({ keywords: keywords.split(',').map(k => k.trim()).filter(Boolean) })}
                placeholder="urgent, important, meeting..."
                className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2.5 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#8E609B]"
              />
            </div>          {/* Do Not Disturb */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Do Not Disturb</h3>
            <label className="flex items-center justify-between cursor-pointer mb-3">
              <span className="text-gray-600">Enable DND</span>
              <input
                type="checkbox"
                checked={preferences.dnd.enabled}
                onChange={(e) => onUpdate({ dnd: { ...preferences.dnd, enabled: e.target.checked } })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#8E609B] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all relative" />
            </label>

            {preferences.dnd.enabled && (
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="text-xs text-gray-500 block mb-1">From</label>
                  <input
                    type="time"
                    value={preferences.dnd.from || '22:00'}
                    onChange={(e) => onUpdate({ dnd: { ...preferences.dnd, from: e.target.value } })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-[#8E609B]"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500 block mb-1">To</label>
                  <input
                    type="time"
                    value={preferences.dnd.to || '08:00'}
                    onChange={(e) => onUpdate({ dnd: { ...preferences.dnd, to: e.target.value } })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:border-[#8E609B]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#8E609B] text-white rounded-lg hover:bg-[#8E609B]/80 transition-colors font-medium"
          >
            Done
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Notifications Panel Component
export const NotificationsPanel: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onNotificationClick?: (notification: Notification) => void;
}> = ({ isOpen, onClose, onNotificationClick }) => {
  const [showPreferences, setShowPreferences] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'mentions'>('all');
  const {
    notifications,
    unreadCount,
    loading,
    preferences,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    updatePreferences
  } = useNotifications();

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'mentions') return n.type === 'mention';
    return true;
  });

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed right-0 top-0 bottom-0 w-96 bg-white border-l border-gray-200 shadow-2xl z-50 flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 bg-[#8E609B] text-white text-xs rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPreferences(true)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Preferences"
              >
                ⚙️
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              {(['all', 'unread', 'mentions'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 text-sm rounded-md capitalize transition-colors ${
                    filter === f
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-[#8E609B] hover:text-white transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {loading && notifications.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-2 border-[#8E609B] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-gray-500">Loading notifications...</p>
              </div>
            ) : filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-4xl mb-3">🔔</div>
                <p className="text-gray-900 font-medium">
                  {filter === 'all' ? 'No notifications' : `No ${filter} notifications`}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {filter === 'all' 
                    ? "You're all caught up!" 
                    : 'Check back later or view all notifications'}
                </p>
              </div>
            ) : (
              <div className="p-2 space-y-1">
                {filteredNotifications.map(notification => (
                  <NotificationItem
                    key={notification._id}
                    notification={notification}
                    onRead={() => markAsRead(notification._id)}
                    onDelete={() => deleteNotification(notification._id)}
                    onClick={() => {
                      if (!notification.read) markAsRead(notification._id);
                      onNotificationClick?.(notification);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Preferences Modal */}
      <AnimatePresence>
        {showPreferences && preferences && (
          <PreferencesPanel
            preferences={preferences}
            onUpdate={updatePreferences}
            onClose={() => setShowPreferences(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default NotificationsPanel;
