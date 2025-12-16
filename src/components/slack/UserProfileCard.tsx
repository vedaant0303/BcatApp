import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  Briefcase,
  Building2,
  MessageSquare,
  Shield,
  Clock,
  User,
  Circle
} from 'lucide-react';
import { getUserGradient, getInitials } from '../../utils/userColors';

interface UserProfileCardProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id?: string;
    _id?: string;
    name: string;
    email?: string;
    employeeId?: string;
    role?: string;
    department?: string;
    position?: string;
    avatar?: string;
    isActive?: boolean;
    lastLogin?: string;
    status?: 'online' | 'away' | 'dnd' | 'offline';
  };
  onStartDM?: () => void;
  isCurrentUser?: boolean;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  isOpen,
  onClose,
  user,
  onStartDM,
  isCurrentUser = false
}) => {
  const userId = user.id || user._id || '';
  const gradient = getUserGradient(userId);
  const initials = getInitials(user.name);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'dnd': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'online': return 'Active';
      case 'away': return 'Away';
      case 'dnd': return 'Do Not Disturb';
      default: return 'Offline';
    }
  };

  const formatLastLogin = (dateStr?: string) => {
    if (!dateStr) return 'Never';
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-sm bg-[#1a1d21] rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Header Background */}
          <div
            className="h-24 relative"
            style={{
              background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/20 hover:bg-black/30 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Avatar */}
          <div className="relative px-6 -mt-12">
            <div className="relative inline-block">
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl border-4 border-[#1a1d21] overflow-hidden"
                style={{
                  background: user.avatar
                    ? `url(${user.avatar}) center/cover`
                    : `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`
                }}
              >
                {!user.avatar && initials}
              </div>
              {/* Status Indicator */}
              <div className={`absolute bottom-1 right-1 w-5 h-5 rounded-full ${getStatusColor(user.status)} border-3 border-[#1a1d21]`} />
            </div>
          </div>

          {/* Info */}
          <div className="px-6 pt-3 pb-6">
            {/* Name & Status */}
            <div className="mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {user.name}
                {isCurrentUser && (
                  <span className="text-xs font-normal text-gray-500 bg-gray-700/50 px-2 py-0.5 rounded">
                    You
                  </span>
                )}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Circle className={`w-2.5 h-2.5 fill-current ${user.status === 'online' ? 'text-green-500' : 'text-gray-500'}`} />
                <span className="text-sm text-gray-400">{getStatusText(user.status)}</span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3">
              {/* Employee ID & Role */}
              {user.employeeId && (
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-400">
                    {user.employeeId} • <span className="capitalize">{user.role || 'Employee'}</span>
                  </span>
                </div>
              )}

              {/* Email */}
              {user.email && (
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-300">{user.email}</span>
                </div>
              )}

              {/* Position */}
              {user.position && (
                <div className="flex items-center gap-3 text-sm">
                  <Briefcase className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-300">{user.position}</span>
                </div>
              )}

              {/* Department */}
              {user.department && (
                <div className="flex items-center gap-3 text-sm">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-300">{user.department}</span>
                </div>
              )}

              {/* Last Active */}
              {user.lastLogin && (
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-400">Last active {formatLastLogin(user.lastLogin)}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            {!isCurrentUser && onStartDM && (
              <div className="mt-6">
                <button
                  onClick={() => {
                    onStartDM();
                    onClose();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-[#4a154b] to-[#611f69] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  <MessageSquare className="w-4 h-4" />
                  Message
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UserProfileCard;
