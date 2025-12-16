// Utility to generate consistent colors for users based on their ID
// This ensures each user always has the same color across the app

const USER_COLORS = [
  { bg: 'bg-rose-500', text: 'text-rose-500', hex: '#f43f5e' },
  { bg: 'bg-pink-500', text: 'text-pink-500', hex: '#ec4899' },
  { bg: 'bg-fuchsia-500', text: 'text-fuchsia-500', hex: '#d946ef' },
  { bg: 'bg-purple-500', text: 'text-purple-500', hex: '#a855f7' },
  { bg: 'bg-violet-500', text: 'text-violet-500', hex: '#8b5cf6' },
  { bg: 'bg-indigo-500', text: 'text-indigo-500', hex: '#6366f1' },
  { bg: 'bg-blue-500', text: 'text-blue-500', hex: '#3b82f6' },
  { bg: 'bg-sky-500', text: 'text-sky-500', hex: '#0ea5e9' },
  { bg: 'bg-cyan-500', text: 'text-cyan-500', hex: '#06b6d4' },
  { bg: 'bg-teal-500', text: 'text-teal-500', hex: '#14b8a6' },
  { bg: 'bg-emerald-500', text: 'text-emerald-500', hex: '#10b981' },
  { bg: 'bg-green-500', text: 'text-green-500', hex: '#22c55e' },
  { bg: 'bg-lime-500', text: 'text-lime-500', hex: '#84cc16' },
  { bg: 'bg-yellow-500', text: 'text-yellow-500', hex: '#eab308' },
  { bg: 'bg-amber-500', text: 'text-amber-500', hex: '#f59e0b' },
  { bg: 'bg-orange-500', text: 'text-orange-500', hex: '#f97316' },
  { bg: 'bg-red-500', text: 'text-red-500', hex: '#ef4444' },
];

// Slack-like gradient pairs for avatars - both Tailwind classes and hex values
const AVATAR_GRADIENTS = [
  { tailwind: 'from-rose-400 to-pink-500', from: '#fb7185', to: '#ec4899' },
  { tailwind: 'from-fuchsia-400 to-purple-500', from: '#e879f9', to: '#a855f7' },
  { tailwind: 'from-violet-400 to-indigo-500', from: '#a78bfa', to: '#6366f1' },
  { tailwind: 'from-blue-400 to-cyan-500', from: '#60a5fa', to: '#06b6d4' },
  { tailwind: 'from-teal-400 to-emerald-500', from: '#2dd4bf', to: '#10b981' },
  { tailwind: 'from-green-400 to-lime-500', from: '#4ade80', to: '#84cc16' },
  { tailwind: 'from-amber-400 to-orange-500', from: '#fbbf24', to: '#f97316' },
  { tailwind: 'from-orange-400 to-red-500', from: '#fb923c', to: '#ef4444' },
  { tailwind: 'from-pink-400 to-rose-500', from: '#f472b6', to: '#f43f5e' },
  { tailwind: 'from-purple-400 to-violet-500', from: '#c084fc', to: '#8b5cf6' },
  { tailwind: 'from-indigo-400 to-blue-500', from: '#818cf8', to: '#3b82f6' },
  { tailwind: 'from-cyan-400 to-teal-500', from: '#22d3ee', to: '#14b8a6' },
  { tailwind: 'from-emerald-400 to-green-500', from: '#34d399', to: '#22c55e' },
  { tailwind: 'from-yellow-400 to-amber-500', from: '#facc15', to: '#f59e0b' },
  { tailwind: 'from-red-400 to-orange-500', from: '#f87171', to: '#f97316' },
  { tailwind: 'from-sky-400 to-indigo-500', from: '#38bdf8', to: '#6366f1' },
];

// Simple hash function to convert string to number
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export function getUserColor(userId: string) {
  const index = hashString(userId) % USER_COLORS.length;
  return USER_COLORS[index];
}

export function getUserGradient(userId: string): { tailwind: string; from: string; to: string } {
  const index = hashString(userId) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index];
}

export function getUserColorHex(userId: string): string {
  return getUserColor(userId).hex;
}

// Get initials from name
export function getInitials(name: string): string {
  if (!name) return '?';
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

// Format timestamp for messages
export function formatMessageTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();
  
  const time = date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
  
  if (isToday) {
    return time;
  } else if (isYesterday) {
    return `Yesterday at ${time}`;
  } else {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
}

// Format date for message dividers
export function formatDateDivider(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();
  
  if (isToday) {
    return 'Today';
  } else if (isYesterday) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }
}

export default {
  getUserColor,
  getUserGradient,
  getUserColorHex,
  getInitials,
  formatMessageTime,
  formatDateDivider
};
