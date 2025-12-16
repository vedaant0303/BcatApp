import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useSocket } from '../../context/SocketContext';

interface Canvas {
  _id: string;
  title: string;
  content: string;
  channel?: string;
  workspace: string;
  createdBy: {
    _id: string;
    name: string;
    avatar?: string;
  };
  collaborators: Array<{
    user: { _id: string; name: string; avatar?: string };
    permission: string;
    addedAt: string;
  }>;
  template?: string;
  isPublished: boolean;
  version: number;
  createdAt: string;
  updatedAt: string;
}

interface CanvasVersion {
  version: number;
  content: string;
  editedBy: { _id: string; name: string };
  editedAt: string;
}

// Canvas Hook
export const useCanvas = (channelId?: string) => {
  const { token } = useAuth();
  const { currentWorkspace } = useWorkspace();
  const [canvases, setCanvases] = useState<Canvas[]>([]);
  const [currentCanvas, setCurrentCanvas] = useState<Canvas | null>(null);
  const [versions, setVersions] = useState<CanvasVersion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const fetchCanvases = useCallback(async () => {
    if (!token || !currentWorkspace) return;

    setLoading(true);
    try {
      let url = `${API_BASE}/canvas?workspace=${currentWorkspace._id}`;
      if (channelId) {
        url += `&channel=${channelId}`;
      }

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        setCanvases(data.canvases);
      }
    } catch (err) {
      setError('Failed to fetch canvases');
    } finally {
      setLoading(false);
    }
  }, [token, currentWorkspace, channelId]);

  const fetchCanvas = useCallback(async (canvasId: string) => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/canvas/${canvasId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        setCurrentCanvas(data.canvas);
      }
    } catch (err) {
      setError('Failed to fetch canvas');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const createCanvas = useCallback(async (title: string, template?: string): Promise<Canvas> => {
    if (!token || !currentWorkspace) throw new Error('Not authenticated');

    const response = await fetch(`${API_BASE}/canvas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        workspace: currentWorkspace._id,
        channel: channelId,
        template
      })
    });

    const data = await response.json();
    if (data.success) {
      setCanvases(prev => [data.canvas, ...prev]);
      return data.canvas;
    }
    throw new Error(data.message);
  }, [token, currentWorkspace, channelId]);

  const updateCanvas = useCallback(async (canvasId: string, content: string, title?: string) => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE}/canvas/${canvasId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content, title })
      });

      const data = await response.json();
      if (data.success) {
        setCurrentCanvas(data.canvas);
        setCanvases(prev => 
          prev.map(c => c._id === canvasId ? data.canvas : c)
        );
      }
    } catch (err) {
      setError('Failed to update canvas');
    }
  }, [token]);

  const deleteCanvas = useCallback(async (canvasId: string) => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE}/canvas/${canvasId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        setCanvases(prev => prev.filter(c => c._id !== canvasId));
        if (currentCanvas?._id === canvasId) {
          setCurrentCanvas(null);
        }
      }
    } catch (err) {
      setError('Failed to delete canvas');
    }
  }, [token, currentCanvas]);

  const fetchVersions = useCallback(async (canvasId: string) => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE}/canvas/${canvasId}/versions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        setVersions(data.versions);
      }
    } catch (err) {
      setError('Failed to fetch versions');
    }
  }, [token]);

  useEffect(() => {
    fetchCanvases();
  }, [fetchCanvases]);

  return {
    canvases,
    currentCanvas,
    versions,
    loading,
    error,
    fetchCanvases,
    fetchCanvas,
    createCanvas,
    updateCanvas,
    deleteCanvas,
    fetchVersions,
    setCurrentCanvas
  };
};

// Canvas List Component
export const CanvasList: React.FC<{
  channelId?: string;
  onSelect: (canvas: Canvas) => void;
  onCreate: () => void;
}> = ({ channelId, onSelect, onCreate }) => {
  const { canvases, loading, deleteCanvas } = useCanvas(channelId);
  const [showMenu, setShowMenu] = useState<string | null>(null);

  if (loading && canvases.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading canvases...
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Canvases</h3>
        <button
          onClick={onCreate}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#8E609B] text-white rounded-lg hover:bg-[#8E609B]/80 transition-colors text-sm"
        >
          <span>+</span>
          <span>New Canvas</span>
        </button>
      </div>

      {canvases.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📝</div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">No canvases yet</h4>
          <p className="text-gray-500 mb-4">Create a canvas to collaborate with your team</p>
          <button
            onClick={onCreate}
            className="px-4 py-2 bg-[#8E609B] text-white rounded-lg hover:bg-[#8E609B]/80 transition-colors"
          >
            Create Canvas
          </button>
        </div>
      ) : (
        <div className="grid gap-3">
          {canvases.map(canvas => (
            <motion.div
              key={canvas._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer group relative border border-gray-200"
              onClick={() => onSelect(canvas)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-900 font-medium truncate">{canvas.title}</h4>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {canvas.content?.replace(/<[^>]*>/g, '').slice(0, 100) || 'Empty canvas'}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span>By {canvas.createdBy.name}</span>
                    <span>•</span>
                    <span>{new Date(canvas.updatedAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>v{canvas.version}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(showMenu === canvas._id ? null : canvas._id);
                  }}
                  className="p-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-all"
                >
                  ⋮
                </button>
              </div>

              <AnimatePresence>
                {showMenu === canvas._id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-4 top-12 bg-white border border-gray-200 rounded-lg shadow-xl z-10 py-1 min-w-[120px]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => {
                        onSelect(canvas);
                        setShowMenu(null);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Open
                    </button>
                    <button
                      onClick={() => {
                        deleteCanvas(canvas._id);
                        setShowMenu(null);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      Delete
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

// Canvas Editor Component
export const CanvasEditor: React.FC<{
  canvas: Canvas;
  onBack: () => void;
  onUpdate: (content: string, title?: string) => void;
}> = ({ canvas, onBack, onUpdate }) => {
  const { user } = useAuth();
  const { joinCanvas, updateCanvas: socketUpdateCanvas, onCanvasUpdate } = useSocket();
  const [title, setTitle] = useState(canvas.title);
  const [content, setContent] = useState(canvas.content || '');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // Join canvas room for real-time updates
  useEffect(() => {
    joinCanvas(canvas._id);
    
    const unsubscribe = onCanvasUpdate((data) => {
      if (data.userId !== user?.id) {
        setContent(data.content);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [canvas._id, joinCanvas, onCanvasUpdate, user?.id]);

  // Auto-save with debounce
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      if (content !== canvas.content || title !== canvas.title) {
        setIsSaving(true);
        await onUpdate(content, title);
        socketUpdateCanvas(canvas._id, content);
        setLastSaved(new Date());
        setIsSaving(false);
      }
    }, 1000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [content, title, canvas.content, canvas.title, canvas._id, onUpdate, socketUpdateCanvas]);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100"
          >
            ← Back
          </button>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent text-xl font-semibold text-gray-900 focus:outline-none border-b-2 border-transparent focus:border-[#8E609B] transition-colors"
            placeholder="Canvas title..."
          />
        </div>

        <div className="flex items-center gap-3">
          {isSaving ? (
            <span className="text-sm text-gray-400">Saving...</span>
          ) : lastSaved ? (
            <span className="text-sm text-gray-400">
              Saved {lastSaved.toLocaleTimeString()}
            </span>
          ) : null}

          <div className="flex items-center gap-1">
            {canvas.collaborators.slice(0, 3).map((collab) => (
              <div
                key={collab.user._id}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8E609B] to-[#FF5722] flex items-center justify-center text-white text-xs font-bold border-2 border-white -ml-2 first:ml-0"
                title={collab.user.name}
              >
                {collab.user.avatar ? (
                  <img src={collab.user.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  collab.user.name.charAt(0).toUpperCase()
                )}
              </div>
            ))}
            {canvas.collaborators.length > 3 && (
              <span className="text-xs text-gray-400 ml-1">
                +{canvas.collaborators.length - 3}
              </span>
            )}
          </div>

          <button className="px-3 py-1.5 bg-[#8E609B] text-white rounded-lg hover:bg-[#8E609B]/80 transition-colors text-sm">
            Share
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <textarea
            ref={editorRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your canvas content here... Use Markdown for formatting."
            className="w-full min-h-[500px] bg-transparent text-gray-900 resize-none focus:outline-none text-lg leading-relaxed placeholder-gray-400"
            style={{ fontFamily: 'Georgia, serif' }}
          />
        </div>
      </div>

      {/* Footer Toolbar */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors" title="Bold">
            <strong>B</strong>
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors italic" title="Italic">
            I
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors" title="Heading">
            H
          </button>
          <span className="w-px h-6 bg-gray-200 mx-2" />
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors" title="Bullet List">
            •
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors" title="Numbered List">
            1.
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors" title="Checklist">
            ☑
          </button>
          <span className="w-px h-6 bg-gray-200 mx-2" />
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors" title="Link">
            🔗
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors" title="Image">
            🖼
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors" title="Code">
            {'</>'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Create Canvas Modal
export const CreateCanvasModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string, template?: string) => Promise<void>;
}> = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const templates = [
    { id: 'blank', name: 'Blank', icon: '📄', description: 'Start with a blank canvas' },
    { id: 'meeting-notes', name: 'Meeting Notes', icon: '📋', description: 'Template for meeting agendas and notes' },
    { id: 'project-brief', name: 'Project Brief', icon: '📊', description: 'Define project scope and goals' },
    { id: 'brainstorm', name: 'Brainstorm', icon: '💡', description: 'Capture and organize ideas' },
    { id: 'weekly-standup', name: 'Weekly Standup', icon: '📅', description: 'Track team progress weekly' },
  ];

  const handleCreate = async () => {
    if (!title.trim()) return;

    setCreating(true);
    try {
      await onCreate(title, selectedTemplate || undefined);
      onClose();
      setTitle('');
      setSelectedTemplate(null);
    } catch (err) {
      console.error('Failed to create canvas:', err);
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
          className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden border border-gray-200"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Create Canvas</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My Canvas"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2.5 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#8E609B]"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Template (optional)</label>
              <div className="grid grid-cols-2 gap-2">
                {templates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(
                      selectedTemplate === template.id ? null : template.id
                    )}
                    className={`p-3 rounded-lg text-left transition-colors ${
                      selectedTemplate === template.id
                        ? 'bg-[#8E609B]/10 border-[#8E609B]'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    } border`}
                  >
                    <div className="text-2xl mb-1">{template.icon}</div>
                    <div className="text-gray-900 text-sm font-medium">{template.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{template.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!title.trim() || creating}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                title.trim() && !creating
                  ? 'bg-[#8E609B] text-white hover:bg-[#8E609B]/80'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {creating ? 'Creating...' : 'Create Canvas'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Main Canvas View Component
export const CanvasView: React.FC<{
  channelId?: string;
}> = ({ channelId }) => {
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { 
    currentCanvas, 
    createCanvas, 
    updateCanvas, 
    fetchCanvas,
    setCurrentCanvas 
  } = useCanvas(channelId);

  const handleSelectCanvas = async (canvas: Canvas) => {
    await fetchCanvas(canvas._id);
    setView('editor');
  };

  const handleCreateCanvas = async (title: string, template?: string) => {
    const canvas = await createCanvas(title, template);
    setCurrentCanvas(canvas);
    setView('editor');
  };

  const handleUpdateCanvas = async (content: string, title?: string) => {
    if (currentCanvas) {
      await updateCanvas(currentCanvas._id, content, title);
    }
  };

  const handleBack = () => {
    setCurrentCanvas(null);
    setView('list');
  };

  return (
    <div className="h-full">
      {view === 'list' ? (
        <CanvasList
          channelId={channelId}
          onSelect={handleSelectCanvas}
          onCreate={() => setShowCreateModal(true)}
        />
      ) : currentCanvas ? (
        <CanvasEditor
          canvas={currentCanvas}
          onBack={handleBack}
          onUpdate={handleUpdateCanvas}
        />
      ) : null}

      <CreateCanvasModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateCanvas}
      />
    </div>
  );
};

export default CanvasView;
