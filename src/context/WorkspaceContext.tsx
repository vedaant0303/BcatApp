import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

interface Workspace {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  members: Array<{
    user: any;
    role: string;
    joinedAt: string;
  }>;
  settings: {
    defaultChannel?: string;
  };
}

interface Channel {
  _id: string;
  name: string;
  displayName: string;
  type: 'public' | 'private' | 'shared';
  topic?: string;
  description?: string;
  workspace: string;
  createdBy?: any;
  members: Array<{
    user: any;
    role: 'admin' | 'member';
    notifications?: 'all' | 'mentions' | 'none';
    starred?: boolean;
    muted?: boolean;
    lastRead?: string;
    joinedAt?: string;
  }>;
  unreadCount?: number;
  isDefault?: boolean;
  isArchived?: boolean;
  messageCount?: number;
  lastActivity?: string;
}

interface Conversation {
  _id: string;
  type: 'direct' | 'group';
  name?: string;
  participants: Array<{
    user: any;
    role: string;
  }>;
  lastMessage?: any;
  lastActivity: string;
  unreadCount?: number;
}

type ViewType = 'messages' | 'todos' | 'files' | 'canvas';

interface WorkspaceContextType {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  channels: Channel[];
  conversations: Conversation[];
  currentChannel: Channel | null;
  currentConversation: Conversation | null;
  currentView: ViewType;
  loading: boolean;
  error: string | null;

  // Actions
  fetchWorkspaces: () => Promise<void>;
  selectWorkspace: (workspace: Workspace) => void;
  fetchChannels: () => Promise<void>;
  selectChannel: (channel: Channel) => void;
  fetchConversations: () => Promise<void>;
  selectConversation: (conversation: Conversation) => void;
  setCurrentView: (view: ViewType) => void;
  createChannel: (data: Partial<Channel>) => Promise<Channel>;
  createConversation: (participants: string[]) => Promise<Conversation>;
  joinChannel: (channelId: string) => Promise<void>;
  leaveChannel: (channelId: string) => Promise<void>;
}

export type { ViewType };

const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('messages');

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const fetchWorkspaces = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/workspaces`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setWorkspaces(data.workspaces);
        // Auto-select first workspace if none selected
        if (data.workspaces.length > 0 && !currentWorkspace) {
          setCurrentWorkspace(data.workspaces[0]);
        }
      }
    } catch (err) {
      setError('Failed to fetch workspaces');
    } finally {
      setLoading(false);
    }
  }, [token, currentWorkspace]);

  const selectWorkspace = useCallback((workspace: Workspace) => {
    setCurrentWorkspace(workspace);
    setCurrentChannel(null);
    setCurrentConversation(null);
  }, []);

  const fetchChannels = useCallback(async () => {
    if (!token || !currentWorkspace) return;

    try {
      const response = await fetch(
        `${API_BASE}/channels?workspace=${currentWorkspace._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      if (data.success) {
        setChannels(data.channels);
        // Auto-select default channel or first channel ONLY if no channel or conversation is selected
        if (data.channels.length > 0 && !currentChannel && !currentConversation) {
          const defaultChannel = data.channels.find(
            (c: Channel) => c._id === currentWorkspace.settings?.defaultChannel
          ) || data.channels[0];
          setCurrentChannel(defaultChannel);
        }
      }
    } catch (err) {
      setError('Failed to fetch channels');
    }
  }, [token, currentWorkspace, currentChannel, currentConversation]);

  const selectChannel = useCallback((channel: Channel) => {
    setCurrentChannel(channel);
    setCurrentConversation(null);
  }, []);

  const fetchConversations = useCallback(async () => {
    if (!token || !currentWorkspace) return;

    try {
      const response = await fetch(
        `${API_BASE}/conversations?workspace=${currentWorkspace._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      if (data.success) {
        setConversations(data.conversations);
      }
    } catch (err) {
      setError('Failed to fetch conversations');
    }
  }, [token, currentWorkspace]);

  const selectConversation = useCallback((conversation: Conversation) => {
    setCurrentConversation(conversation);
    setCurrentChannel(null);
  }, []);

  const createChannel = useCallback(async (data: Partial<Channel>): Promise<Channel> => {
    if (!token || !currentWorkspace) throw new Error('Not authenticated');

    const response = await fetch(`${API_BASE}/channels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ ...data, workspace: currentWorkspace._id })
    });

    const result = await response.json();
    if (result.success) {
      setChannels(prev => [...prev, result.channel]);
      return result.channel;
    }
    throw new Error(result.message);
  }, [token, currentWorkspace]);

  const createConversation = useCallback(async (participantIds: string[]): Promise<Conversation> => {
    if (!token || !currentWorkspace) throw new Error('Not authenticated');

    // Build the request body based on number of participants
    const body: any = { workspace: currentWorkspace._id };

    if (participantIds.length === 1) {
      // 1:1 direct message
      body.userId = participantIds[0];
    } else {
      // Group DM
      body.userIds = participantIds;
    }

    const response = await fetch(`${API_BASE}/conversations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    const result = await response.json();
    if (result.success) {
      // Check if conversation already exists in list
      const existingIndex = conversations.findIndex(c => c._id === result.conversation._id);
      if (existingIndex === -1) {
        setConversations(prev => [result.conversation, ...prev]);
      }
      return result.conversation;
    }
    throw new Error(result.message);
  }, [token, currentWorkspace, conversations]);

  const joinChannel = useCallback(async (channelId: string) => {
    if (!token) return;

    const response = await fetch(`${API_BASE}/channels/${channelId}/join`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });

    const result = await response.json();
    if (result.success) {
      await fetchChannels();
    }
  }, [token, fetchChannels]);

  const leaveChannel = useCallback(async (channelId: string) => {
    if (!token) return;

    const response = await fetch(`${API_BASE}/channels/${channelId}/leave`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    const result = await response.json();
    if (result.success) {
      if (currentChannel?._id === channelId) {
        setCurrentChannel(null);
      }
      await fetchChannels();
    }
  }, [token, fetchChannels, currentChannel]);

  // Fetch workspaces on mount
  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  // Fetch channels and conversations when workspace changes
  useEffect(() => {
    if (currentWorkspace) {
      fetchChannels();
      fetchConversations();
    }
  }, [currentWorkspace, fetchChannels, fetchConversations]);



  const value: WorkspaceContextType = {
    workspaces,
    currentWorkspace,
    channels,
    conversations,
    currentChannel,
    currentConversation,
    currentView,
    loading,
    error,
    fetchWorkspaces,
    selectWorkspace,
    fetchChannels,
    selectChannel,
    fetchConversations,
    selectConversation,
    setCurrentView,
    createChannel,
    createConversation,
    joinChannel,
    leaveChannel
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceContext;
