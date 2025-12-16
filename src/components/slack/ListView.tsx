import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useWorkspace } from '../../context/WorkspaceContext';

interface ListItem {
  _id: string;
  title: string;
  description?: string;
  status: 'not-started' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignees: Array<{ _id: string; name: string; avatar?: string }>;
  dueDate?: string;
  subtasks: Array<{
    _id: string;
    title: string;
    isCompleted: boolean;
  }>;
  order: number;
}

interface List {
  _id: string;
  name: string;
  description?: string;
  channel?: string;
  workspace: string;
  items: ListItem[];
  createdBy: { _id: string; name: string };
  createdAt: string;
  updatedAt: string;
}

// List Hook
export const useList = (channelId?: string) => {
  const { token } = useAuth();
  const { currentWorkspace } = useWorkspace();
  const [lists, setLists] = useState<List[]>([]);
  const [currentList, setCurrentList] = useState<List | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const fetchLists = useCallback(async () => {
    if (!token || !currentWorkspace) return;

    setLoading(true);
    try {
      let url = `${API_BASE}/lists?workspace=${currentWorkspace._id}`;
      if (channelId) {
        url += `&channel=${channelId}`;
      }

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        setLists(data.lists);
      }
    } catch (err) {
      setError('Failed to fetch lists');
    } finally {
      setLoading(false);
    }
  }, [token, currentWorkspace, channelId]);

  const createList = useCallback(async (name: string, description?: string): Promise<List> => {
    if (!token || !currentWorkspace) throw new Error('Not authenticated');

    const response = await fetch(`${API_BASE}/lists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        description,
        workspace: currentWorkspace._id,
        channel: channelId
      })
    });

    const data = await response.json();
    if (data.success) {
      setLists(prev => [data.list, ...prev]);
      return data.list;
    }
    throw new Error(data.message);
  }, [token, currentWorkspace, channelId]);

  const addItem = useCallback(async (listId: string, item: Partial<ListItem>): Promise<ListItem> => {
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_BASE}/lists/${listId}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(item)
    });

    const data = await response.json();
    if (data.success) {
      setLists(prev => prev.map(l => l._id === listId ? data.list : l));
      if (currentList?._id === listId) {
        setCurrentList(data.list);
      }
      return data.item;
    }
    throw new Error(data.message);
  }, [token, currentList]);

  const updateItem = useCallback(async (listId: string, itemId: string, updates: Partial<ListItem>) => {
    if (!token) return;

    const response = await fetch(`${API_BASE}/lists/${listId}/items/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updates)
    });

    const data = await response.json();
    if (data.success) {
      setLists(prev => prev.map(l => l._id === listId ? data.list : l));
      if (currentList?._id === listId) {
        setCurrentList(data.list);
      }
    }
  }, [token, currentList]);

  const deleteItem = useCallback(async (listId: string, itemId: string) => {
    if (!token) return;

    const response = await fetch(`${API_BASE}/lists/${listId}/items/${itemId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await response.json();
    if (data.success) {
      setLists(prev => prev.map(l => l._id === listId ? data.list : l));
      if (currentList?._id === listId) {
        setCurrentList(data.list);
      }
    }
  }, [token, currentList]);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  return {
    lists,
    currentList,
    loading,
    error,
    fetchLists,
    createList,
    addItem,
    updateItem,
    deleteItem,
    setCurrentList
  };
};

// Task Item Component
const TaskItem: React.FC<{
  item: ListItem;
  onToggle: () => void;
  onUpdate: (updates: Partial<ListItem>) => void;
  onDelete: () => void;
}> = ({ item, onToggle, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);

  const priorityColors: Record<string, string> = {
    low: 'bg-gray-500',
    medium: 'bg-blue-500',
    high: 'bg-orange-500',
    urgent: 'bg-red-500'
  };

  const statusIcons: Record<string, string> = {
    'not-started': '○',
    'in-progress': '◐',
    'completed': '●'
  };

  const completedSubtasks = item.subtasks.filter(s => s.isCompleted).length;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group p-3 rounded-lg border transition-colors ${
        item.status === 'completed' 
          ? 'bg-[#2d1f33]/50 border-[#8E609B]/10' 
          : 'bg-[#2d1f33] border-[#8E609B]/20 hover:border-[#8E609B]/40'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={onToggle}
          className={`mt-0.5 text-lg transition-colors ${
            item.status === 'completed' ? 'text-green-500' : 'text-gray-400 hover:text-[#8E609B]'
          }`}
        >
          {statusIcons[item.status]}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => {
                onUpdate({ title });
                setIsEditing(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onUpdate({ title });
                  setIsEditing(false);
                }
              }}
              className="w-full bg-transparent text-white focus:outline-none"
              autoFocus
            />
          ) : (
            <div
              onClick={() => setIsEditing(true)}
              className={`text-white cursor-text ${item.status === 'completed' ? 'line-through opacity-50' : ''}`}
            >
              {item.title}
            </div>
          )}

          {item.description && (
            <p className="text-sm text-gray-400 mt-1 line-clamp-2">{item.description}</p>
          )}

          <div className="flex items-center gap-3 mt-2 flex-wrap">
            {/* Priority */}
            <span className={`px-2 py-0.5 rounded text-xs text-white ${priorityColors[item.priority]}`}>
              {item.priority}
            </span>

            {/* Due Date */}
            {item.dueDate && (
              <span className={`text-xs ${
                new Date(item.dueDate) < new Date() && item.status !== 'completed'
                  ? 'text-red-400'
                  : 'text-gray-400'
              }`}>
                📅 {new Date(item.dueDate).toLocaleDateString()}
              </span>
            )}

            {/* Subtasks */}
            {item.subtasks.length > 0 && (
              <span className="text-xs text-gray-400">
                ☑ {completedSubtasks}/{item.subtasks.length}
              </span>
            )}

            {/* Assignees */}
            {item.assignees.length > 0 && (
              <div className="flex -space-x-2">
                {item.assignees.slice(0, 3).map(a => (
                  <div
                    key={a._id}
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-[#8E609B] to-[#FF5722] flex items-center justify-center text-white text-xs border-2 border-[#2d1f33]"
                    title={a.name}
                  >
                    {a.avatar ? (
                      <img src={a.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      a.name.charAt(0).toUpperCase()
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-400 transition-all"
        >
          🗑
        </button>
      </div>
    </motion.div>
  );
};

// Add Task Form
const AddTaskForm: React.FC<{
  onAdd: (title: string) => void;
}> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full p-3 text-left text-gray-400 hover:text-white hover:bg-[#8E609B]/10 rounded-lg transition-colors flex items-center gap-2"
      >
        <span>+</span>
        <span>Add task</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-[#2d1f33] rounded-lg border border-[#8E609B]/20">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task name..."
        className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none mb-3"
        autoFocus
      />
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!title.trim()}
          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
            title.trim()
              ? 'bg-[#8E609B] text-white hover:bg-[#8E609B]/80'
              : 'bg-[#2d1f33] text-gray-500 cursor-not-allowed'
          }`}
        >
          Add
        </button>
      </div>
    </form>
  );
};

// Create List Modal
const CreateListModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, description?: string) => Promise<void>;
}> = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return;

    setCreating(true);
    try {
      await onCreate(name, description || undefined);
      onClose();
      setName('');
      setDescription('');
    } catch (err) {
      console.error('Failed to create list:', err);
    } finally {
      setCreating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
          className="bg-[#1a0b1e] rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-[#8E609B]/20"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4 border-b border-[#8E609B]/20">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Create List</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                ✕
              </button>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My List"
                className="w-full bg-[#2d1f33] border border-[#8E609B]/20 rounded-lg py-2.5 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#8E609B]/50"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Description (optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is this list for?"
                rows={2}
                className="w-full bg-[#2d1f33] border border-[#8E609B]/20 rounded-lg py-2.5 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#8E609B]/50 resize-none"
              />
            </div>
          </div>

          <div className="p-4 border-t border-[#8E609B]/20 flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!name.trim() || creating}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                name.trim() && !creating
                  ? 'bg-[#8E609B] text-white hover:bg-[#8E609B]/80'
                  : 'bg-[#2d1f33] text-gray-500 cursor-not-allowed'
              }`}
            >
              {creating ? 'Creating...' : 'Create List'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Main List View Component
export const ListView: React.FC<{
  channelId?: string;
}> = ({ channelId }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { lists, loading, createList, addItem, updateItem, deleteItem, setCurrentList, currentList } = useList(channelId);

  const handleCreateList = async (name: string, description?: string) => {
    const list = await createList(name, description);
    setCurrentList(list);
  };

  const handleAddTask = async (listId: string, title: string) => {
    await addItem(listId, { title, status: 'not-started', priority: 'medium' });
  };

  const handleToggleTask = async (listId: string, item: ListItem) => {
    const newStatus = item.status === 'completed' ? 'not-started' : 'completed';
    await updateItem(listId, item._id, { status: newStatus });
  };

  if (loading && lists.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400">
        Loading lists...
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Lists</h3>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#8E609B] text-white rounded-lg hover:bg-[#8E609B]/80 transition-colors text-sm"
        >
          <span>+</span>
          <span>New List</span>
        </button>
      </div>

      {lists.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">✅</div>
          <h4 className="text-lg font-medium text-white mb-2">No lists yet</h4>
          <p className="text-gray-400 mb-4">Create a list to start tracking tasks</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-[#8E609B] text-white rounded-lg hover:bg-[#8E609B]/80 transition-colors"
          >
            Create List
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {lists.map(list => (
            <div key={list._id} className="bg-[#1a0b1e] rounded-xl border border-[#8E609B]/20 overflow-hidden">
              <div className="p-4 border-b border-[#8E609B]/20">
                <h4 className="text-white font-semibold">{list.name}</h4>
                {list.description && (
                  <p className="text-sm text-gray-400 mt-1">{list.description}</p>
                )}
              </div>
              
              <div className="p-4 space-y-2">
                {list.items.map(item => (
                  <TaskItem
                    key={item._id}
                    item={item}
                    onToggle={() => handleToggleTask(list._id, item)}
                    onUpdate={(updates) => updateItem(list._id, item._id, updates)}
                    onDelete={() => deleteItem(list._id, item._id)}
                  />
                ))}
                
                <AddTaskForm onAdd={(title) => handleAddTask(list._id, title)} />
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateListModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateList}
      />
    </div>
  );
};

export default ListView;
