import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ListTodo, LogOut, Calendar, Clock, CheckCircle2, 
  AlertCircle, MessageSquare, ChevronRight, Filter, Home
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedBy: any;
  project?: any;
  dueDate?: string;
  tags: string[];
  comments: any[];
  createdAt: string;
}

const EmployeeDashboard: React.FC = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/tasks`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();
      if (data.success) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const filteredTasks = selectedStatus === 'all' 
    ? tasks 
    : tasks.filter(t => t.status === selectedStatus);

  const tasksByStatus = {
    todo: tasks.filter(t => t.status === 'todo'),
    'in-progress': tasks.filter(t => t.status === 'in-progress'),
    review: tasks.filter(t => t.status === 'review'),
    completed: tasks.filter(t => t.status === 'completed')
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'review': return 'bg-purple-500';
      case 'todo': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1a0b1e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <Home size={18} />
                <span className="text-sm font-medium hidden sm:inline">Back to Home</span>
              </Link>
              <Link
                to="/workspace"
                className="flex items-center gap-2 px-3 py-2 text-white bg-[#8E609B] hover:bg-[#7d5389] rounded-lg transition-colors"
              >
                <MessageSquare size={18} />
                <span className="text-sm font-medium hidden sm:inline">Open Chat</span>
              </Link>
              <div className="h-6 w-px bg-white/20 hidden sm:block" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  My Workspace
                </h1>
                <p className="text-sm text-white/60">
                  {user?.name} • {user?.position} • {user?.department}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{tasksByStatus.todo.length}</div>
              <div className="text-sm text-gray-500">To Do</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{tasksByStatus['in-progress'].length}</div>
              <div className="text-sm text-gray-500">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{tasksByStatus.review.length}</div>
              <div className="text-sm text-gray-500">In Review</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{tasksByStatus.completed.length}</div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <svg className="animate-spin h-10 w-10 text-[#8E609B] mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-500">Loading your tasks...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Filter Buttons */}
            <div className="flex items-center gap-2 mb-6">
              <Filter size={18} className="text-gray-400" />
              {['all', 'todo', 'in-progress', 'review', 'completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                    selectedStatus === status
                      ? 'bg-[#8E609B] text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {status === 'all' ? 'All Tasks' : status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </button>
              ))}
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
                <div key={status} className="bg-gray-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 uppercase text-sm tracking-wide">
                      {status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </h3>
                    <span className="bg-white text-gray-600 rounded-full px-2 py-1 text-xs font-bold">
                      {statusTasks.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {statusTasks.map((task) => (
                      <motion.div
                        key={task._id}
                        layout
                        className="bg-white p-4 rounded-lg border-l-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        style={{ borderLeftColor: getStatusColor(task.status) }}
                        onClick={() => setSelectedTask(task)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 text-sm flex-1 pr-2">
                            {task.title}
                          </h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>

                        {task.description && (
                          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                            {task.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          {task.dueDate && (
                            <div className="flex items-center gap-1">
                              <Calendar size={12} />
                              {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                          )}
                          {task.comments.length > 0 && (
                            <div className="flex items-center gap-1">
                              <MessageSquare size={12} />
                              {task.comments.length}
                            </div>
                          )}
                        </div>

                        {/* Status Change Buttons */}
                        {status !== 'completed' && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <select
                              value={task.status}
                              onChange={(e) => {
                                e.stopPropagation();
                                updateTaskStatus(task._id, e.target.value);
                              }}
                              className="w-full text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-[#8E609B]"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <option value="todo">To Do</option>
                              <option value="in-progress">In Progress</option>
                              <option value="review">In Review</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {statusTasks.length === 0 && (
                      <div className="text-center py-8 text-gray-400 text-sm">
                        No tasks
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTask(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Oswald, sans-serif' }}>
                Task Details
              </h2>
              <button
                onClick={() => setSelectedTask(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight size={20} className="rotate-90" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(selectedTask.priority)}`}>
                    {selectedTask.priority} priority
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getStatusColor(selectedTask.status)}`}>
                    {selectedTask.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedTask.title}</h3>
                {selectedTask.description && (
                  <p className="text-gray-600">{selectedTask.description}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-semibold text-gray-500 mb-1">Assigned By</div>
                  <div className="text-gray-900">{selectedTask.assignedBy?.name}</div>
                </div>
                {selectedTask.dueDate && (
                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-1">Due Date</div>
                    <div className="text-gray-900 flex items-center gap-2">
                      <Calendar size={16} />
                      {new Date(selectedTask.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>

              {selectedTask.project && (
                <div>
                  <div className="text-sm font-semibold text-gray-500 mb-1">Project</div>
                  <div 
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-white text-sm font-semibold"
                    style={{ backgroundColor: selectedTask.project.color }}
                  >
                    {selectedTask.project.name}
                  </div>
                </div>
              )}

              {selectedTask.tags.length > 0 && (
                <div>
                  <div className="text-sm font-semibold text-gray-500 mb-2">Tags</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedTask.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="text-sm font-semibold text-gray-500 mb-2">Update Status</div>
                <select
                  value={selectedTask.status}
                  onChange={(e) => {
                    updateTaskStatus(selectedTask._id, e.target.value);
                    setSelectedTask(null);
                  }}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#8E609B]"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">In Review</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
