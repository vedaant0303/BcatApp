import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import { getUserGradient, getInitials } from '../../utils/userColors';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Types
interface Channel {
    _id: string;
    name: string;
    displayName: string;
    description?: string;
    topic?: string;
    type: 'public' | 'private' | 'shared';
    members: Array<{
        user: any;
        role: 'admin' | 'member';
        notifications?: 'all' | 'mentions' | 'none';
        starred?: boolean;
        muted?: boolean;
    }>;
    createdBy?: any;
    isDefault?: boolean;
    isArchived?: boolean;
    messageCount?: number;
    createdAt?: string;
}

interface User {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    employeeId?: string;
}

// ============ CREATE CHANNEL MODAL ============
export const CreateChannelModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onCreated: (channel: Channel) => void;
}> = ({ isOpen, onClose, onCreated }) => {
    const { token } = useAuth();
    const { currentWorkspace } = useWorkspace();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !token || !currentWorkspace) return;

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_BASE}/channels`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    workspace: currentWorkspace._id,
                    name: name.trim(),
                    displayName: name.trim(),
                    description: description.trim(),
                    type: isPrivate ? 'private' : 'public'
                })
            });

            const data = await response.json();
            if (data.success) {
                onCreated(data.channel);
                setName('');
                setDescription('');
                setIsPrivate(false);
                onClose();
            } else {
                setError(data.message || 'Failed to create channel');
            }
        } catch (err) {
            setError('Failed to create channel');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/50"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
                >
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-1">Create a channel</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Channels are where your team communicates. They're best when organized around a topic.
                        </p>

                        <form onSubmit={handleSubmit}>
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                                    {error}
                                </div>
                            )}

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">#</span>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '-'))}
                                        placeholder="e.g. marketing"
                                        className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        maxLength={80}
                                    />
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                    Names must be lowercase, without spaces or periods.
                                </p>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description <span className="text-gray-400">(optional)</span>
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="What's this channel about?"
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                    rows={3}
                                />
                            </div>

                            <div className="mb-6">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <div className={`relative w-11 h-6 rounded-full transition-colors ${isPrivate ? 'bg-purple-600' : 'bg-gray-200'}`}>
                                        <motion.div
                                            animate={{ x: isPrivate ? 20 : 0 }}
                                            className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow"
                                        />
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={isPrivate}
                                        onChange={(e) => setIsPrivate(e.target.checked)}
                                        className="sr-only"
                                    />
                                    <div>
                                        <span className="text-sm font-medium text-gray-900">Make private</span>
                                        <p className="text-xs text-gray-500">
                                            {isPrivate
                                                ? 'Only invited members can see and join this channel'
                                                : 'Anyone in the workspace can see and join this channel'
                                            }
                                        </p>
                                    </div>
                                </label>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!name.trim() || loading}
                                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Creating...' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

// ============ EDIT CHANNEL SETTINGS MODAL ============
export const EditChannelModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    channel: Channel | null;
    onUpdated: (channel: Channel) => void;
}> = ({ isOpen, onClose, channel, onUpdated }) => {
    const { token } = useAuth();
    const [displayName, setDisplayName] = useState('');
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (channel) {
            setDisplayName(channel.displayName || channel.name);
            setTopic(channel.topic || '');
            setDescription(channel.description || '');
        }
    }, [channel]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!channel || !token) return;

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_BASE}/channels/${channel._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    displayName,
                    topic,
                    description
                })
            });

            const data = await response.json();
            if (data.success) {
                onUpdated(data.channel);
                onClose();
            } else {
                setError(data.message || 'Failed to update channel');
            }
        } catch (err) {
            setError('Failed to update channel');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !channel) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/50"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
                >
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-1">Edit channel settings</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Update #{channel.name} settings
                        </p>

                        <form onSubmit={handleSubmit}>
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                                    {error}
                                </div>
                            )}

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Channel name
                                </label>
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Topic <span className="text-gray-400">(optional)</span>
                                </label>
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder="Let people know what this channel is about"
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description <span className="text-gray-400">(optional)</span>
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe what this channel is used for"
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                    rows={3}
                                />
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

// ============ ADD MEMBERS MODAL ============
export const AddMembersModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    channel: Channel | null;
    onMembersAdded: () => void;
}> = ({ isOpen, onClose, channel, onMembersAdded }) => {
    const { token } = useAuth();
    const { currentWorkspace } = useWorkspace();
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);

    // Fetch workspace members
    useEffect(() => {
        const fetchUsers = async () => {
            if (!token || !currentWorkspace || !isOpen) return;

            setSearchLoading(true);
            try {
                const response = await fetch(
                    `${API_BASE}/users?workspace=${currentWorkspace._id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const data = await response.json();
                if (data.success) {
                    // Filter out users already in the channel
                    const existingMemberIds = channel?.members.map(m => m.user?._id || m.user) || [];
                    const availableUsers = data.users.filter(
                        (u: User) => !existingMemberIds.includes(u._id)
                    );
                    setUsers(availableUsers);
                }
            } catch (err) {
                console.error('Failed to fetch users:', err);
            } finally {
                setSearchLoading(false);
            }
        };

        fetchUsers();
    }, [token, currentWorkspace, channel, isOpen]);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleUser = (user: User) => {
        setSelectedUsers(prev =>
            prev.some(u => u._id === user._id)
                ? prev.filter(u => u._id !== user._id)
                : [...prev, user]
        );
    };

    const handleAddMembers = async () => {
        if (!channel || selectedUsers.length === 0 || !token) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/channels/${channel._id}/members`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    userIds: selectedUsers.map(u => u._id)
                })
            });

            const data = await response.json();
            if (data.success) {
                onMembersAdded();
                setSelectedUsers([]);
                setSearchQuery('');
                onClose();
            }
        } catch (err) {
            console.error('Failed to add members:', err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !channel) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/50"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden max-h-[80vh] flex flex-col"
                >
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-1">Add people to #{channel.name}</h2>
                        <p className="text-sm text-gray-500">
                            Select team members to add to this channel
                        </p>
                    </div>

                    {/* Selected Users */}
                    {selectedUsers.length > 0 && (
                        <div className="px-6 py-3 border-b border-gray-100 flex flex-wrap gap-2">
                            {selectedUsers.map(user => {
                                const gradient = getUserGradient(user._id);
                                return (
                                    <div
                                        key={user._id}
                                        className="flex items-center gap-2 bg-purple-50 px-2 py-1 rounded-full"
                                    >
                                        <div
                                            className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                                            style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                                        >
                                            {getInitials(user.name)}
                                        </div>
                                        <span className="text-sm text-purple-700">{user.name}</span>
                                        <button
                                            onClick={() => toggleUser(user)}
                                            className="text-purple-400 hover:text-purple-600"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Search */}
                    <div className="p-4 border-b border-gray-100">
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name or email"
                                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* User List */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {searchLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : filteredUsers.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                {searchQuery ? 'No users found' : 'No available users to add'}
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {filteredUsers.map(user => {
                                    const isSelected = selectedUsers.some(u => u._id === user._id);
                                    const gradient = getUserGradient(user._id);
                                    return (
                                        <button
                                            key={user._id}
                                            onClick={() => toggleUser(user)}
                                            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${isSelected ? 'bg-purple-50' : 'hover:bg-gray-50'
                                                }`}
                                        >
                                            <div
                                                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                                                style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                                            >
                                                {getInitials(user.name)}
                                            </div>
                                            <div className="flex-1 text-left">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                <div className="text-xs text-gray-500">{user.email}</div>
                                            </div>
                                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${isSelected
                                                    ? 'bg-purple-600 border-purple-600'
                                                    : 'border-gray-300'
                                                }`}>
                                                {isSelected && (
                                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAddMembers}
                            disabled={selectedUsers.length === 0 || loading}
                            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Adding...' : `Add ${selectedUsers.length || ''} ${selectedUsers.length === 1 ? 'Member' : 'Members'}`}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

// ============ MANAGE MEMBER MODAL (Remove/Change Role) ============
export const ManageMemberModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    channel: Channel | null;
    member: any;
    onMemberUpdated: () => void;
    currentUserRole: 'admin' | 'member' | null;
}> = ({ isOpen, onClose, channel, member, onMemberUpdated, currentUserRole }) => {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleChangeRole = async (newRole: 'admin' | 'member') => {
        if (!channel || !member || !token) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/channels/${channel._id}/members/${member.user?._id}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ role: newRole })
            });

            const data = await response.json();
            if (data.success) {
                onMemberUpdated();
                onClose();
            }
        } catch (err) {
            console.error('Failed to update role:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveMember = async () => {
        if (!channel || !member || !token) return;

        if (!confirm(`Remove ${member.user?.name} from #${channel.name}?`)) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/channels/${channel._id}/members/${member.user?._id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await response.json();
            if (data.success) {
                onMemberUpdated();
                onClose();
            }
        } catch (err) {
            console.error('Failed to remove member:', err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !member) return null;

    const memberGradient = getUserGradient(member.user?._id || '');

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/50"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden"
                >
                    <div className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl font-bold"
                                style={{ background: `linear-gradient(135deg, ${memberGradient.from}, ${memberGradient.to})` }}
                            >
                                {getInitials(member.user?.name || '?')}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{member.user?.name}</h3>
                                <p className="text-sm text-gray-500 capitalize">{member.role}</p>
                            </div>
                        </div>

                        {currentUserRole === 'admin' && (
                            <div className="space-y-2">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Channel Role</p>
                                <button
                                    onClick={() => handleChangeRole('admin')}
                                    disabled={loading || member.role === 'admin'}
                                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${member.role === 'admin'
                                            ? 'bg-purple-50 border-2 border-purple-200'
                                            : 'hover:bg-gray-50 border-2 border-transparent'
                                        }`}
                                >
                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-medium text-gray-900">Admin</div>
                                        <div className="text-xs text-gray-500">Can manage channel settings and members</div>
                                    </div>
                                </button>
                                <button
                                    onClick={() => handleChangeRole('member')}
                                    disabled={loading || member.role === 'member'}
                                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${member.role === 'member'
                                            ? 'bg-purple-50 border-2 border-purple-200'
                                            : 'hover:bg-gray-50 border-2 border-transparent'
                                        }`}
                                >
                                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-medium text-gray-900">Member</div>
                                        <div className="text-xs text-gray-500">Can read and write messages</div>
                                    </div>
                                </button>

                                <hr className="my-4 border-gray-200" />

                                <button
                                    onClick={handleRemoveMember}
                                    disabled={loading}
                                    className="w-full flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium">Remove from channel</span>
                                </button>
                            </div>
                        )}

                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

// ============ NOTIFICATION SETTINGS MODAL ============
export const NotificationSettingsModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    channel: Channel | null;
    currentSettings: 'all' | 'mentions' | 'none';
    onUpdated: (settings: 'all' | 'mentions' | 'none') => void;
}> = ({ isOpen, onClose, channel, currentSettings, onUpdated }) => {
    const { token } = useAuth();
    const [selected, setSelected] = useState<'all' | 'mentions' | 'none'>(currentSettings);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setSelected(currentSettings);
    }, [currentSettings]);

    const handleSave = async () => {
        if (!channel || !token) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/channels/${channel._id}/notifications`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ notifications: selected })
            });

            const data = await response.json();
            if (data.success) {
                onUpdated(selected);
                onClose();
            }
        } catch (err) {
            console.error('Failed to update notifications:', err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !channel) return null;

    const options = [
        { value: 'all', label: 'All messages', desc: 'Get notified for every message' },
        { value: 'mentions', label: 'Mentions only', desc: 'Only when someone mentions you' },
        { value: 'none', label: 'Nothing', desc: 'Mute all notifications' }
    ];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/50"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden"
                >
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-1">Notification preferences</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Choose how you want to be notified about #{channel.name}
                        </p>

                        <div className="space-y-2">
                            {options.map(option => (
                                <button
                                    key={option.value}
                                    onClick={() => setSelected(option.value as typeof selected)}
                                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${selected === option.value
                                            ? 'bg-purple-50 border-2 border-purple-200'
                                            : 'hover:bg-gray-50 border-2 border-transparent'
                                        }`}
                                >
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected === option.value
                                            ? 'border-purple-600 bg-purple-600'
                                            : 'border-gray-300'
                                        }`}>
                                        {selected === option.value && (
                                            <div className="w-2 h-2 bg-white rounded-full" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{option.label}</div>
                                        <div className="text-xs text-gray-500">{option.desc}</div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

// ============ DELETE/ARCHIVE CHANNEL CONFIRMATION ============
export const DeleteChannelModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    channel: Channel | null;
    action: 'archive' | 'delete';
    onConfirm: () => void;
}> = ({ isOpen, onClose, channel, action, onConfirm }) => {
    const { token } = useAuth();
    const [confirmText, setConfirmText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        if (!channel || !token) return;
        if (action === 'delete' && confirmText !== channel.name) return;

        setLoading(true);
        try {
            const endpoint = action === 'archive'
                ? `${API_BASE}/channels/${channel._id}/archive`
                : `${API_BASE}/channels/${channel._id}`;

            const response = await fetch(endpoint, {
                method: action === 'archive' ? 'POST' : 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await response.json();
            if (data.success) {
                onConfirm();
                onClose();
            }
        } catch (err) {
            console.error(`Failed to ${action} channel:`, err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !channel) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/50"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
                >
                    <div className="p-6">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            {action === 'archive' ? 'Archive' : 'Delete'} #{channel.name}?
                        </h2>
                        <p className="text-sm text-gray-500 mb-4">
                            {action === 'archive'
                                ? 'Archived channels are hidden from the channel list but can be restored.'
                                : 'This action cannot be undone. All messages and files will be permanently deleted.'
                            }
                        </p>

                        {action === 'delete' && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Type <strong>{channel.name}</strong> to confirm
                                </label>
                                <input
                                    type="text"
                                    value={confirmText}
                                    onChange={(e) => setConfirmText(e.target.value)}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    placeholder="Enter channel name"
                                />
                            </div>
                        )}

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                disabled={loading || (action === 'delete' && confirmText !== channel.name)}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Processing...' : action === 'archive' ? 'Archive' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default {
    CreateChannelModal,
    EditChannelModal,
    AddMembersModal,
    ManageMemberModal,
    NotificationSettingsModal,
    DeleteChannelModal
};
