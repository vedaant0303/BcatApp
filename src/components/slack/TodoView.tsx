import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useSocket } from '../../context/SocketContext';
import { getUserGradient, getInitials } from '../../utils/userColors';

// Types
interface TodoItem {
    _id: string;
    title: string;
    description?: string;
    isCompleted: boolean;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    dueDate?: string;
    completedAt?: string;
    completedBy?: { _id: string; name: string; avatar?: string };
    notes?: string;
    order: number;
    createdAt: string;
}

interface TodoList {
    _id: string;
    title: string;
    description?: string;
    assignedTo: { _id: string; name: string; email: string; avatar?: string; department?: string; position?: string };
    createdBy: { _id: string; name: string; avatar?: string };
    color: string;
    icon: string;
    items: TodoItem[];
    isArchived: boolean;
    isPinned: boolean;
    category: string;
    dueDate?: string;
    progress: number;
    completedCount: number;
    createdAt: string;
    updatedAt: string;
}

interface TodoStats {
    totalLists: number;
    totalItems: number;
    completedItems: number;
    pendingItems: number;
    overdueItems: number;
    completionRate: number;
}

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Priority Colors
const priorityConfig = {
    low: { color: 'bg-gray-500', text: 'text-gray-500', label: 'Low' },
    medium: { color: 'bg-blue-500', text: 'text-blue-500', label: 'Medium' },
    high: { color: 'bg-orange-500', text: 'text-orange-500', label: 'High' },
    urgent: { color: 'bg-red-500', text: 'text-red-500', label: 'Urgent' }
};

// Category Icons
const categoryIcons: Record<string, string> = {
    work: '💼',
    personal: '🏠',
    project: '📊',
    daily: '📅',
    weekly: '🗓️',
    other: '📌'
};

// Custom Hook for Todos
const useTodos = () => {
    const { token, user } = useAuth();
    const { currentWorkspace } = useWorkspace();
    const { socket } = useSocket();
    const [todos, setTodos] = useState<TodoList[]>([]);
    const [stats, setStats] = useState<TodoStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTodos = useCallback(async (assignedTo?: string) => {
        if (!token) return;

        try {
            let url = `${API_BASE}/todos?`;
            if (currentWorkspace) url += `workspace=${currentWorkspace._id}&`;
            if (assignedTo) url += `assignedTo=${assignedTo}`;

            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();

            if (data.success) {
                setTodos(data.todos);
            }
        } catch (err) {
            setError('Failed to fetch todos');
        } finally {
            setLoading(false);
        }
    }, [token, currentWorkspace]);

    const fetchStats = useCallback(async () => {
        if (!token) return;

        try {
            const response = await fetch(`${API_BASE}/todos/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();

            if (data.success) {
                setStats(data.stats);
            }
        } catch (err) {
            console.error('Failed to fetch stats');
        }
    }, [token]);

    const createTodo = useCallback(async (todoData: Partial<TodoList>) => {
        if (!token) throw new Error('Not authenticated');

        const response = await fetch(`${API_BASE}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                ...todoData,
                workspace: currentWorkspace?._id
            })
        });

        const data = await response.json();
        if (data.success) {
            setTodos(prev => [data.todo, ...prev]);
            fetchStats();
            return data.todo;
        }
        throw new Error(data.message);
    }, [token, currentWorkspace, fetchStats]);

    const updateTodo = useCallback(async (todoId: string, updates: Partial<TodoList>) => {
        if (!token) return;

        const response = await fetch(`${API_BASE}/todos/${todoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(updates)
        });

        const data = await response.json();
        if (data.success) {
            setTodos(prev => prev.map(t => t._id === todoId ? data.todo : t));
            return data.todo;
        }
    }, [token]);

    const deleteTodo = useCallback(async (todoId: string) => {
        if (!token) return;

        const response = await fetch(`${API_BASE}/todos/${todoId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        });

        const data = await response.json();
        if (data.success) {
            setTodos(prev => prev.filter(t => t._id !== todoId));
            fetchStats();
        }
    }, [token, fetchStats]);

    const addItem = useCallback(async (todoId: string, item: Partial<TodoItem>) => {
        if (!token) throw new Error('Not authenticated');

        const response = await fetch(`${API_BASE}/todos/${todoId}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(item)
        });

        const data = await response.json();
        if (data.success) {
            setTodos(prev => prev.map(t => t._id === todoId ? data.todo : t));
            fetchStats();
            return data.item;
        }
        throw new Error(data.message);
    }, [token, fetchStats]);

    const toggleItem = useCallback(async (todoId: string, itemId: string) => {
        if (!token) return;

        const response = await fetch(`${API_BASE}/todos/${todoId}/items/${itemId}/toggle`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}` }
        });

        const data = await response.json();
        if (data.success) {
            setTodos(prev => prev.map(t => t._id === todoId ? data.todo : t));
            fetchStats();
        }
    }, [token, fetchStats]);

    const updateItem = useCallback(async (todoId: string, itemId: string, updates: Partial<TodoItem>) => {
        if (!token) return;

        const response = await fetch(`${API_BASE}/todos/${todoId}/items/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(updates)
        });

        const data = await response.json();
        if (data.success) {
            setTodos(prev => prev.map(t => t._id === todoId ? data.todo : t));
        }
    }, [token]);

    const deleteItem = useCallback(async (todoId: string, itemId: string) => {
        if (!token) return;

        const response = await fetch(`${API_BASE}/todos/${todoId}/items/${itemId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        });

        const data = await response.json();
        if (data.success) {
            setTodos(prev => prev.map(t => t._id === todoId ? data.todo : t));
            fetchStats();
        }
    }, [token, fetchStats]);

    // Socket listeners for real-time updates
    useEffect(() => {
        if (!socket) return;

        const handleTodoCreated = (data: { todo: TodoList; assignedTo: string }) => {
            if (user?.role === 'admin' || data.assignedTo === user?.id) {
                setTodos(prev => {
                    if (prev.some(t => t._id === data.todo._id)) return prev;
                    return [data.todo, ...prev];
                });
                fetchStats();
            }
        };

        const handleTodoUpdated = (data: { todo: TodoList }) => {
            setTodos(prev => prev.map(t => t._id === data.todo._id ? data.todo : t));
        };

        const handleTodoDeleted = (data: { todoId: string }) => {
            setTodos(prev => prev.filter(t => t._id !== data.todoId));
            fetchStats();
        };

        const handleItemToggled = (data: { todoId: string; todo: TodoList }) => {
            setTodos(prev => prev.map(t => t._id === data.todoId ? data.todo : t));
            fetchStats();
        };

        const handleItemAdded = (data: { todoId: string; todo: TodoList }) => {
            setTodos(prev => prev.map(t => t._id === data.todoId ? data.todo : t));
            fetchStats();
        };

        const handleItemDeleted = (data: { todoId: string; todo: TodoList }) => {
            setTodos(prev => prev.map(t => t._id === data.todoId ? data.todo : t));
            fetchStats();
        };

        socket.on('todo:created', handleTodoCreated);
        socket.on('todo:updated', handleTodoUpdated);
        socket.on('todo:deleted', handleTodoDeleted);
        socket.on('todo:itemToggled', handleItemToggled);
        socket.on('todo:itemAdded', handleItemAdded);
        socket.on('todo:itemDeleted', handleItemDeleted);

        return () => {
            socket.off('todo:created', handleTodoCreated);
            socket.off('todo:updated', handleTodoUpdated);
            socket.off('todo:deleted', handleTodoDeleted);
            socket.off('todo:itemToggled', handleItemToggled);
            socket.off('todo:itemAdded', handleItemAdded);
            socket.off('todo:itemDeleted', handleItemDeleted);
        };
    }, [socket, user, fetchStats]);

    useEffect(() => {
        fetchTodos();
        fetchStats();
    }, [fetchTodos, fetchStats]);

    return {
        todos,
        stats,
        loading,
        error,
        fetchTodos,
        createTodo,
        updateTodo,
        deleteTodo,
        addItem,
        toggleItem,
        updateItem,
        deleteItem
    };
};

// Progress Bar Component
const ProgressBar: React.FC<{ progress: number; color: string }> = ({ progress, color }) => (
    <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
        />
    </div>
);

// Stats Card Component
const StatsCard: React.FC<{ stats: TodoStats }> = ({ stats }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-gradient-to-br from-[#8E609B]/20 to-[#8E609B]/5 rounded-xl p-4 border border-[#8E609B]/20">
            <div className="text-2xl font-bold text-white">{stats.totalLists}</div>
            <div className="text-sm text-gray-400">Total Lists</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-xl p-4 border border-blue-500/20">
            <div className="text-2xl font-bold text-white">{stats.pendingItems}</div>
            <div className="text-sm text-gray-400">Pending Tasks</div>
        </div>
        <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-xl p-4 border border-green-500/20">
            <div className="text-2xl font-bold text-white">{stats.completedItems}</div>
            <div className="text-sm text-gray-400">Completed</div>
        </div>
        <div className="bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-xl p-4 border border-red-500/20">
            <div className="text-2xl font-bold text-white">{stats.overdueItems}</div>
            <div className="text-sm text-gray-400">Overdue</div>
        </div>
    </div>
);

// Todo Item Component
const TodoItemRow: React.FC<{
    item: TodoItem;
    onToggle: () => void;
    onUpdate: (updates: Partial<TodoItem>) => void;
    onDelete: () => void;
}> = ({ item, onToggle, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(item.title);
    const [showDetails, setShowDetails] = useState(false);

    const isOverdue = item.dueDate && new Date(item.dueDate) < new Date() && !item.isCompleted;

    const handleSave = () => {
        if (title.trim() && title !== item.title) {
            onUpdate({ title: title.trim() });
        }
        setIsEditing(false);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`group relative ${item.isCompleted ? 'opacity-60' : ''}`}
        >
            <div className={`flex items-start gap-3 p-3 rounded-lg transition-all ${showDetails ? 'bg-[#3f0e40]/50' : 'hover:bg-[#3f0e40]/30'
                }`}>
                {/* Checkbox */}
                <button
                    onClick={onToggle}
                    className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 transition-all flex items-center justify-center ${item.isCompleted
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-500 hover:border-[#8E609B]'
                        }`}
                >
                    {item.isCompleted && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={handleSave}
                            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                            className="w-full bg-transparent text-white border-b border-[#8E609B] focus:outline-none py-0.5"
                            autoFocus
                        />
                    ) : (
                        <div
                            onClick={() => setIsEditing(true)}
                            className={`text-white cursor-text ${item.isCompleted ? 'line-through text-gray-400' : ''}`}
                        >
                            {item.title}
                        </div>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className={`px-2 py-0.5 rounded text-xs ${priorityConfig[item.priority].color} text-white`}>
                            {priorityConfig[item.priority].label}
                        </span>

                        {item.dueDate && (
                            <span className={`text-xs flex items-center gap-1 ${isOverdue ? 'text-red-400' : 'text-gray-400'}`}>
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {new Date(item.dueDate).toLocaleDateString()}
                                {isOverdue && ' (Overdue)'}
                            </span>
                        )}

                        {item.completedBy && item.completedAt && (
                            <span className="text-xs text-green-400 flex items-center gap-1">
                                ✓ by {item.completedBy.name}
                            </span>
                        )}
                    </div>

                    {/* Notes */}
                    {item.notes && showDetails && (
                        <p className="text-sm text-gray-400 mt-2 italic">{item.notes}</p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="p-1.5 text-gray-400 hover:text-white rounded transition-colors"
                        title="Details"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <button
                        onClick={onDelete}
                        className="p-1.5 text-gray-400 hover:text-red-400 rounded transition-colors"
                        title="Delete"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

// Add Item Form
const AddItemForm: React.FC<{ onAdd: (title: string, priority?: string, dueDate?: string) => void }> = ({ onAdd }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState<string>('medium');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onAdd(title.trim(), priority, dueDate || undefined);
            setTitle('');
            setPriority('medium');
            setDueDate('');
            setIsOpen(false);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="w-full flex items-center gap-2 p-3 text-gray-400 hover:text-white hover:bg-[#3f0e40]/30 rounded-lg transition-colors text-sm"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add task
            </button>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="p-3 bg-[#3f0e40]/50 rounded-lg border border-[#8E609B]/20">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none mb-3 text-sm"
                autoFocus
            />
            <div className="flex items-center gap-2 mb-3">
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="bg-[#2d1f33] text-white text-xs rounded px-2 py-1.5 border border-[#8E609B]/20 focus:outline-none focus:border-[#8E609B]/50"
                >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                </select>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="bg-[#2d1f33] text-white text-xs rounded px-2 py-1.5 border border-[#8E609B]/20 focus:outline-none focus:border-[#8E609B]/50"
                />
            </div>
            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={!title.trim()}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${title.trim()
                            ? 'bg-[#8E609B] text-white hover:bg-[#8E609B]/80'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    Add Task
                </button>
            </div>
        </form>
    );
};

// Todo List Card Component
const TodoListCard: React.FC<{
    todo: TodoList;
    onToggleItem: (itemId: string) => void;
    onAddItem: (title: string, priority?: string, dueDate?: string) => void;
    onUpdateItem: (itemId: string, updates: Partial<TodoItem>) => void;
    onDeleteItem: (itemId: string) => void;
    onDelete: () => void;
    onUpdate: (updates: Partial<TodoList>) => void;
    isAdmin: boolean;
}> = ({ todo, onToggleItem, onAddItem, onUpdateItem, onDeleteItem, onDelete, onUpdate, isAdmin }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [showOptions, setShowOptions] = useState(false);
    const userGradient = getUserGradient(todo.assignedTo._id);

    const pendingItems = todo.items.filter(i => !i.isCompleted);
    const completedItems = todo.items.filter(i => i.isCompleted);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1a0b1e] rounded-xl border border-[#8E609B]/20 overflow-hidden"
        >
            {/* Header */}
            <div
                className="p-4 border-b border-[#8E609B]/10 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                        <span className="text-2xl">{todo.icon}</span>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <h3 className="text-white font-semibold truncate">{todo.title}</h3>
                                {todo.isPinned && <span className="text-yellow-400 text-xs">📌</span>}
                                <span className="px-2 py-0.5 bg-[#8E609B]/20 text-[#8E609B] text-xs rounded">
                                    {categoryIcons[todo.category]} {todo.category}
                                </span>
                            </div>
                            {todo.description && (
                                <p className="text-sm text-gray-400 mt-1 truncate">{todo.description}</p>
                            )}

                            {/* Assigned To */}
                            <div className="flex items-center gap-2 mt-2">
                                <div
                                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                                    style={{ background: `linear-gradient(135deg, ${userGradient.from}, ${userGradient.to})` }}
                                >
                                    {todo.assignedTo.avatar ? (
                                        <img src={todo.assignedTo.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        getInitials(todo.assignedTo.name)
                                    )}
                                </div>
                                <span className="text-xs text-gray-400">
                                    Assigned to <span className="text-white">{todo.assignedTo.name}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Progress */}
                        <div className="text-right mr-2">
                            <div className="text-sm text-white font-medium">
                                {todo.completedCount}/{todo.items.length}
                            </div>
                            <div className="text-xs text-gray-400">{todo.progress}%</div>
                        </div>

                        {/* Options */}
                        <div className="relative">
                            <button
                                onClick={(e) => { e.stopPropagation(); setShowOptions(!showOptions); }}
                                className="p-1.5 text-gray-400 hover:text-white rounded transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                            </button>

                            <AnimatePresence>
                                {showOptions && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setShowOptions(false)} />
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="absolute right-0 top-full mt-1 w-40 bg-[#2d1f33] rounded-lg shadow-xl z-50 overflow-hidden border border-[#8E609B]/20"
                                        >
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onUpdate({ isPinned: !todo.isPinned }); setShowOptions(false); }}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-[#8E609B]/20 transition-colors"
                                            >
                                                📌 {todo.isPinned ? 'Unpin' : 'Pin'}
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onDelete(); setShowOptions(false); }}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                                            >
                                                🗑️ Delete List
                                            </button>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Expand/Collapse */}
                        <svg
                            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                    <ProgressBar progress={todo.progress} color={todo.color} />
                </div>
            </div>

            {/* Items */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-3 space-y-1">
                            {/* Pending Items */}
                            {pendingItems.map(item => (
                                <TodoItemRow
                                    key={item._id}
                                    item={item}
                                    onToggle={() => onToggleItem(item._id)}
                                    onUpdate={(updates) => onUpdateItem(item._id, updates)}
                                    onDelete={() => onDeleteItem(item._id)}
                                />
                            ))}

                            {/* Add Item Form */}
                            <AddItemForm onAdd={onAddItem} />

                            {/* Completed Items */}
                            {completedItems.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-[#8E609B]/10">
                                    <div className="text-xs text-gray-500 mb-2 px-3">
                                        Completed ({completedItems.length})
                                    </div>
                                    {completedItems.map(item => (
                                        <TodoItemRow
                                            key={item._id}
                                            item={item}
                                            onToggle={() => onToggleItem(item._id)}
                                            onUpdate={(updates) => onUpdateItem(item._id, updates)}
                                            onDelete={() => onDeleteItem(item._id)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// Create Todo Modal
const CreateTodoModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onCreate: (data: any) => Promise<void>;
    employees: any[];
    isAdmin: boolean;
}> = ({ isOpen, onClose, onCreate, employees, isAdmin }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('work');
    const [color, setColor] = useState('#8E609B');
    const [icon, setIcon] = useState('📋');
    const [assignedTo, setAssignedTo] = useState('');
    const [creating, setCreating] = useState(false);

    const icons = ['📋', '✅', '🎯', '💼', '📊', '🔥', '⭐', '🚀', '💡', '🎨'];
    const colors = ['#8E609B', '#FF5722', '#4CAF50', '#2196F3', '#FFC107', '#9C27B0', '#00BCD4', '#E91E63'];

    const handleCreate = async () => {
        if (!title.trim()) return;

        setCreating(true);
        try {
            await onCreate({
                title,
                description,
                category,
                color,
                icon,
                assignedTo: assignedTo || undefined
            });
            onClose();
            setTitle('');
            setDescription('');
            setCategory('work');
            setAssignedTo('');
        } catch (err) {
            console.error('Failed to create todo:', err);
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
                className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-[#1a0b1e] rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-[#8E609B]/20"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-4 border-b border-[#8E609B]/20 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-white">Create Todo List</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Form */}
                    <div className="p-4 space-y-4">
                        {/* Icon & Title */}
                        <div className="flex gap-3">
                            <div className="relative">
                                <button className="w-12 h-12 rounded-lg bg-[#2d1f33] border border-[#8E609B]/20 flex items-center justify-center text-2xl hover:border-[#8E609B]/50 transition-colors">
                                    {icon}
                                </button>
                                <div className="absolute top-full left-0 mt-2 p-2 bg-[#2d1f33] rounded-lg border border-[#8E609B]/20 hidden group-hover:grid grid-cols-5 gap-1">
                                    {icons.map(i => (
                                        <button key={i} onClick={() => setIcon(i)} className="p-1.5 hover:bg-[#8E609B]/20 rounded">
                                            {i}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="List title"
                                className="flex-1 bg-[#2d1f33] border border-[#8E609B]/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8E609B]/50"
                            />
                        </div>

                        {/* Description */}
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description (optional)"
                            rows={2}
                            className="w-full bg-[#2d1f33] border border-[#8E609B]/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8E609B]/50 resize-none"
                        />

                        {/* Category */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Category</label>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(categoryIcons).map(([cat, emoji]) => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(cat)}
                                        className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 transition-colors ${category === cat
                                                ? 'bg-[#8E609B] text-white'
                                                : 'bg-[#2d1f33] text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        {emoji} {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Color</label>
                            <div className="flex gap-2">
                                {colors.map(c => (
                                    <button
                                        key={c}
                                        onClick={() => setColor(c)}
                                        className={`w-8 h-8 rounded-full transition-transform ${color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1a0b1e] scale-110' : ''
                                            }`}
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Assign To (Admin only) */}
                        {isAdmin && employees.length > 0 && (
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Assign To</label>
                                <select
                                    value={assignedTo}
                                    onChange={(e) => setAssignedTo(e.target.value)}
                                    className="w-full bg-[#2d1f33] border border-[#8E609B]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#8E609B]/50"
                                >
                                    <option value="">Myself</option>
                                    {employees.map(emp => (
                                        <option key={emp._id} value={emp._id}>
                                            {emp.name} ({emp.employeeId})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="p-4 border-t border-[#8E609B]/20 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCreate}
                            disabled={!title.trim() || creating}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${title.trim() && !creating
                                    ? 'bg-[#8E609B] text-white hover:bg-[#8E609B]/80'
                                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
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

// Employee Filter (Admin Only)
const EmployeeFilter: React.FC<{
    employees: any[];
    selectedEmployee: string;
    onSelect: (id: string) => void;
}> = ({ employees, selectedEmployee, onSelect }) => {
    return (
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
            <button
                onClick={() => onSelect('')}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-sm transition-colors ${!selectedEmployee
                        ? 'bg-[#8E609B] text-white'
                        : 'bg-[#2d1f33] text-gray-400 hover:text-white'
                    }`}
            >
                All Employees
            </button>
            {employees.map(emp => {
                const gradient = getUserGradient(emp._id);
                return (
                    <button
                        key={emp._id}
                        onClick={() => onSelect(emp._id)}
                        className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${selectedEmployee === emp._id
                                ? 'bg-[#8E609B] text-white'
                                : 'bg-[#2d1f33] text-gray-400 hover:text-white'
                            }`}
                    >
                        <div
                            className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                            style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                        >
                            {emp.avatar ? (
                                <img src={emp.avatar} alt="" className="w-full h-full rounded-full" />
                            ) : (
                                getInitials(emp.name)
                            )}
                        </div>
                        {emp.name.split(' ')[0]}
                    </button>
                );
            })}
        </div>
    );
};

// Main TodoView Component
export const TodoView: React.FC = () => {
    const { user, token } = useAuth();
    const {
        todos,
        stats,
        loading,
        fetchTodos,
        createTodo,
        updateTodo,
        deleteTodo,
        addItem,
        toggleItem,
        updateItem,
        deleteItem
    } = useTodos();

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [employees, setEmployees] = useState<any[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [filter, setFilter] = useState<'all' | 'pinned' | 'active' | 'completed'>('all');

    const isAdmin = user?.role === 'admin';

    // Fetch employees for admin
    useEffect(() => {
        if (isAdmin && token) {
            fetch(`${API_BASE}/users`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setEmployees(data.users.filter((u: any) => u.role === 'employee'));
                    }
                })
                .catch(console.error);
        }
    }, [isAdmin, token]);

    // Re-fetch when employee filter changes
    useEffect(() => {
        if (isAdmin) {
            fetchTodos(selectedEmployee || undefined);
        }
    }, [selectedEmployee, isAdmin, fetchTodos]);

    // Filter todos
    const filteredTodos = todos.filter(todo => {
        if (filter === 'pinned') return todo.isPinned;
        if (filter === 'active') return todo.items.some(i => !i.isCompleted);
        if (filter === 'completed') return todo.items.every(i => i.isCompleted);
        return true;
    });

    const handleAddItem = async (todoId: string, title: string, priority?: string, dueDate?: string) => {
        await addItem(todoId, { title, priority: priority as any, dueDate });
    };

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-[#8E609B] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading todos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full overflow-auto">
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            ✅ Todo Lists
                            {isAdmin && <span className="text-sm font-normal text-[#8E609B] bg-[#8E609B]/10 px-2 py-0.5 rounded">Admin</span>}
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">
                            {isAdmin ? 'Manage todos for all employees' : 'Your personal task lists'}
                        </p>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#8E609B] text-white rounded-lg hover:bg-[#8E609B]/80 transition-colors font-medium"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New List
                    </button>
                </div>

                {/* Stats */}
                {stats && <StatsCard stats={stats} />}

                {/* Employee Filter (Admin Only) */}
                {isAdmin && employees.length > 0 && (
                    <EmployeeFilter
                        employees={employees}
                        selectedEmployee={selectedEmployee}
                        onSelect={setSelectedEmployee}
                    />
                )}

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 mb-6 border-b border-[#8E609B]/20 pb-3">
                    {(['all', 'pinned', 'active', 'completed'] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${filter === f
                                    ? 'bg-[#8E609B]/20 text-[#8E609B]'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Todo Lists */}
                {filteredTodos.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-xl font-semibold text-white mb-2">No todo lists yet</h3>
                        <p className="text-gray-400 mb-6">Create your first todo list to get started</p>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="px-6 py-3 bg-[#8E609B] text-white rounded-lg hover:bg-[#8E609B]/80 transition-colors font-medium"
                        >
                            Create Todo List
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredTodos.map(todo => (
                            <TodoListCard
                                key={todo._id}
                                todo={todo}
                                onToggleItem={(itemId) => toggleItem(todo._id, itemId)}
                                onAddItem={(title, priority, dueDate) => handleAddItem(todo._id, title, priority, dueDate)}
                                onUpdateItem={(itemId, updates) => updateItem(todo._id, itemId, updates)}
                                onDeleteItem={(itemId) => deleteItem(todo._id, itemId)}
                                onDelete={() => deleteTodo(todo._id)}
                                onUpdate={(updates) => updateTodo(todo._id, updates)}
                                isAdmin={isAdmin}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Create Modal */}
            <CreateTodoModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onCreate={createTodo}
                employees={employees}
                isAdmin={isAdmin}
            />
        </div>
    );
};

export default TodoView;
