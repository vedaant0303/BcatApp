import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useSocket } from '../../context/SocketContext';

interface HuddleParticipant {
  _id: string;
  name: string;
  avatar?: string;
  isMuted: boolean;
  isDeafened: boolean;
  isSpeaking: boolean;
  isScreenSharing: boolean;
}

interface Huddle {
  _id: string;
  channel?: { _id: string; name: string };
  conversation?: { _id: string };
  workspace: string;
  initiator: { _id: string; name: string };
  participants: HuddleParticipant[];
  status: 'active' | 'ended';
  startedAt: string;
  endedAt?: string;
}

// Huddles Hook
export const useHuddle = () => {
  const { token, user } = useAuth();
  const { currentWorkspace, currentChannel, currentConversation } = useWorkspace();
  const { socket } = useSocket();
  const [activeHuddle, setActiveHuddle] = useState<Huddle | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Start a new huddle
  const startHuddle = useCallback(async () => {
    if (!token || !currentWorkspace) return;

    try {
      const response = await fetch(`${API_BASE}/huddles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          workspace: currentWorkspace._id,
          channel: currentChannel?._id,
          conversation: currentConversation?._id
        })
      });

      const data = await response.json();
      if (data.success) {
        setActiveHuddle(data.huddle);
        socket?.emit('huddle:start', data.huddle);
        return data.huddle;
      }
    } catch (err) {
      console.error('Failed to start huddle:', err);
    }
  }, [token, currentWorkspace, currentChannel, currentConversation, socket]);

  // Join an existing huddle
  const joinHuddle = useCallback(async (huddleId: string) => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE}/huddles/${huddleId}/join`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        setActiveHuddle(data.huddle);
        socket?.emit('huddle:join', { huddleId, userId: user?.id });
        return data.huddle;
      }
    } catch (err) {
      console.error('Failed to join huddle:', err);
    }
  }, [token, socket, user]);

  // Leave the current huddle
  const leaveHuddle = useCallback(async () => {
    if (!token || !activeHuddle) return;

    try {
      const response = await fetch(`${API_BASE}/huddles/${activeHuddle._id}/leave`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        socket?.emit('huddle:leave', { huddleId: activeHuddle._id, userId: user?.id });
        setActiveHuddle(null);
        setIsMuted(false);
        setIsDeafened(false);
        setIsScreenSharing(false);
      }
    } catch (err) {
      console.error('Failed to leave huddle:', err);
    }
  }, [token, activeHuddle, socket, user]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (!activeHuddle) return;
    setIsMuted(prev => !prev);
    socket?.emit('huddle:toggleMute', { 
      huddleId: activeHuddle._id, 
      userId: user?.id,
      isMuted: !isMuted 
    });
  }, [activeHuddle, socket, user, isMuted]);

  // Toggle deafen
  const toggleDeafen = useCallback(() => {
    if (!activeHuddle) return;
    setIsDeafened(prev => !prev);
    socket?.emit('huddle:toggleDeafen', { 
      huddleId: activeHuddle._id, 
      userId: user?.id,
      isDeafened: !isDeafened 
    });
  }, [activeHuddle, socket, user, isDeafened]);

  // Toggle screen sharing
  const toggleScreenShare = useCallback(async () => {
    if (!activeHuddle) return;

    if (!isScreenSharing) {
      try {
        // Request screen share permission
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        setIsScreenSharing(true);
        socket?.emit('huddle:startScreenShare', { 
          huddleId: activeHuddle._id, 
          userId: user?.id 
        });

        // Handle stream ended (user stopped sharing)
        stream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
          socket?.emit('huddle:stopScreenShare', { 
            huddleId: activeHuddle._id, 
            userId: user?.id 
          });
        };
      } catch (err) {
        console.error('Failed to start screen share:', err);
      }
    } else {
      setIsScreenSharing(false);
      socket?.emit('huddle:stopScreenShare', { 
        huddleId: activeHuddle._id, 
        userId: user?.id 
      });
    }
  }, [activeHuddle, socket, user, isScreenSharing]);

  // Listen for huddle events
  useEffect(() => {
    if (!socket) return;

    socket.on('huddle:started', (huddle: Huddle) => {
      // Show notification about new huddle
      console.log('Huddle started:', huddle);
    });

    socket.on('huddle:participantJoined', (data: { huddleId: string; participant: HuddleParticipant }) => {
      if (activeHuddle?._id === data.huddleId) {
        setActiveHuddle(prev => prev ? {
          ...prev,
          participants: [...prev.participants, data.participant]
        } : null);
      }
    });

    socket.on('huddle:participantLeft', (data: { huddleId: string; userId: string }) => {
      if (activeHuddle?._id === data.huddleId) {
        setActiveHuddle(prev => prev ? {
          ...prev,
          participants: prev.participants.filter(p => p._id !== data.userId)
        } : null);
      }
    });

    socket.on('huddle:ended', (data: { huddleId: string }) => {
      if (activeHuddle?._id === data.huddleId) {
        setActiveHuddle(null);
        setIsMuted(false);
        setIsDeafened(false);
        setIsScreenSharing(false);
      }
    });

    return () => {
      socket.off('huddle:started');
      socket.off('huddle:participantJoined');
      socket.off('huddle:participantLeft');
      socket.off('huddle:ended');
    };
  }, [socket, activeHuddle]);

  return {
    activeHuddle,
    isMuted,
    isDeafened,
    isScreenSharing,
    startHuddle,
    joinHuddle,
    leaveHuddle,
    toggleMute,
    toggleDeafen,
    toggleScreenShare
  };
};

// Participant Avatar Component
const ParticipantAvatar: React.FC<{
  participant: HuddleParticipant;
  size?: 'sm' | 'md' | 'lg';
}> = ({ participant, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-20 h-20 text-2xl'
  };

  return (
    <div className="relative inline-flex flex-col items-center">
      <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden`}>
        {participant.avatar ? (
          <img 
            src={participant.avatar} 
            alt={participant.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#8E609B] to-[#FF5722] flex items-center justify-center text-white">
            {participant.name.charAt(0).toUpperCase()}
          </div>
        )}
        
        {/* Speaking indicator */}
        {participant.isSpeaking && (
          <div className="absolute inset-0 border-2 border-green-500 rounded-full animate-pulse" />
        )}
      </div>

      {/* Status indicators */}
      <div className="flex items-center gap-1 mt-1">
        {participant.isMuted && (
          <span className="text-xs bg-red-500/20 text-red-400 px-1 rounded">🔇</span>
        )}
        {participant.isScreenSharing && (
          <span className="text-xs bg-blue-500/20 text-blue-400 px-1 rounded">📺</span>
        )}
      </div>

      {/* Name */}
      <span className="text-xs text-gray-400 mt-1 max-w-[80px] truncate text-center">
        {participant.name}
      </span>
    </div>
  );
};

// Huddle Controls Component
const HuddleControls: React.FC<{
  isMuted: boolean;
  isDeafened: boolean;
  isScreenSharing: boolean;
  onToggleMute: () => void;
  onToggleDeafen: () => void;
  onToggleScreenShare: () => void;
  onLeave: () => void;
}> = ({ isMuted, isDeafened, isScreenSharing, onToggleMute, onToggleDeafen, onToggleScreenShare, onLeave }) => {
  return (
    <div className="flex items-center justify-center gap-3">
      {/* Mute */}
      <button
        onClick={onToggleMute}
        className={`p-3 rounded-full transition-colors ${
          isMuted 
            ? 'bg-red-100 text-red-500 hover:bg-red-200' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? '🔇' : '🎤'}
      </button>

      {/* Deafen */}
      <button
        onClick={onToggleDeafen}
        className={`p-3 rounded-full transition-colors ${
          isDeafened 
            ? 'bg-red-100 text-red-500 hover:bg-red-200' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        title={isDeafened ? 'Undeafen' : 'Deafen'}
      >
        {isDeafened ? '🔇' : '🔊'}
      </button>

      {/* Screen Share */}
      <button
        onClick={onToggleScreenShare}
        className={`p-3 rounded-full transition-colors ${
          isScreenSharing 
            ? 'bg-blue-100 text-blue-500 hover:bg-blue-200' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        title={isScreenSharing ? 'Stop sharing' : 'Share screen'}
      >
        📺
      </button>

      {/* Leave */}
      <button
        onClick={onLeave}
        className="p-3 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors"
        title="Leave huddle"
      >
        📞
      </button>
    </div>
  );
};

// Huddle Banner (shown in channel when huddle is active)
export const HuddleBannerInline: React.FC<{
  huddle: Huddle;
  onJoin: () => void;
}> = ({ huddle, onJoin }) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="bg-gradient-to-r from-[#8E609B]/10 to-[#FF5722]/10 border-b border-gray-200"
    >
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-xl">🎙️</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-[10px]">🔊</span>
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <span className="text-gray-900 font-medium">Huddle in progress</span>
              <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                Live
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              {huddle.participants.slice(0, 4).map(p => (
                <div
                  key={p._id}
                  className="w-5 h-5 -ml-1 first:ml-0 rounded-full bg-gradient-to-br from-[#8E609B] to-[#FF5722] flex items-center justify-center text-white text-[10px] border border-white"
                  title={p.name}
                >
                  {p.avatar ? (
                    <img src={p.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    p.name.charAt(0)
                  )}
                </div>
              ))}
              {huddle.participants.length > 4 && (
                <span className="text-xs text-gray-500 ml-1">
                  +{huddle.participants.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={onJoin}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium text-sm"
        >
          Join
        </button>
      </div>
    </motion.div>
  );
};

// Full Huddle View (when in a huddle)
export const HuddleView: React.FC = () => {
  const {
    activeHuddle,
    isMuted,
    isDeafened,
    isScreenSharing,
    leaveHuddle,
    toggleMute,
    toggleDeafen,
    toggleScreenShare
  } = useHuddle();

  if (!activeHuddle) return null;

  const duration = Math.floor((Date.now() - new Date(activeHuddle.startedAt).getTime()) / 1000);
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 w-96 bg-white rounded-xl border border-gray-200 shadow-2xl z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-gray-900 font-medium">
            {activeHuddle.channel?.name ? `#${activeHuddle.channel.name}` : 'Huddle'}
          </span>
        </div>
        <span className="text-xs text-gray-500">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>

      {/* Participants Grid */}
      <div className="p-4">
        <div className="flex flex-wrap justify-center gap-4">
          {activeHuddle.participants.map(participant => (
            <ParticipantAvatar
              key={participant._id}
              participant={participant}
              size="lg"
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 border-t border-gray-200">
        <HuddleControls
          isMuted={isMuted}
          isDeafened={isDeafened}
          isScreenSharing={isScreenSharing}
          onToggleMute={toggleMute}
          onToggleDeafen={toggleDeafen}
          onToggleScreenShare={toggleScreenShare}
          onLeave={leaveHuddle}
        />
      </div>
    </motion.div>
  );
};

// Start Huddle Button
export const StartHuddleButton: React.FC = () => {
  const { startHuddle, activeHuddle } = useHuddle();
  const { currentChannel, currentConversation } = useWorkspace();

  if (!currentChannel && !currentConversation) return null;
  if (activeHuddle) return null;

  return (
    <button
      onClick={startHuddle}
      className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm"
      title="Start a huddle"
    >
      <span>🎙️</span>
      <span>Huddle</span>
    </button>
  );
};

export default HuddleView;
