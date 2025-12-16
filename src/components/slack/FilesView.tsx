import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useWorkspace } from '../../context/WorkspaceContext';

interface File {
  _id: string;
  name: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  channel?: string;
  conversation?: string;
  workspace: string;
  uploadedBy: {
    _id: string;
    name: string;
    avatar?: string;
  };
  message?: string;
  createdAt: string;
}

// Files Hook
export const useFiles = (channelId?: string, conversationId?: string) => {
  const { token } = useAuth();
  const { currentWorkspace } = useWorkspace();
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const fetchFiles = useCallback(async () => {
    if (!token || !currentWorkspace) return;

    setLoading(true);
    try {
      let url = `${API_BASE}/files?workspace=${currentWorkspace._id}`;
      if (channelId) {
        url += `&channel=${channelId}`;
      } else if (conversationId) {
        url += `&conversation=${conversationId}`;
      }

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        setFiles(data.files);
      }
    } catch (err) {
      setError('Failed to fetch files');
    } finally {
      setLoading(false);
    }
  }, [token, currentWorkspace, channelId, conversationId]);

  const uploadFile = useCallback(async (file: globalThis.File): Promise<File> => {
    if (!token || !currentWorkspace) throw new Error('Not authenticated');

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('workspace', currentWorkspace._id);
      if (channelId) formData.append('channel', channelId);
      if (conversationId) formData.append('conversation', conversationId);

      const response = await fetch(`${API_BASE}/files/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setFiles(prev => [data.file, ...prev]);
        return data.file;
      }
      throw new Error(data.message);
    } finally {
      setUploading(false);
    }
  }, [token, currentWorkspace, channelId, conversationId]);

  const deleteFile = useCallback(async (fileId: string) => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE}/files/${fileId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        setFiles(prev => prev.filter(f => f._id !== fileId));
      }
    } catch (err) {
      setError('Failed to delete file');
    }
  }, [token]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return {
    files,
    loading,
    error,
    uploading,
    fetchFiles,
    uploadFile,
    deleteFile
  };
};

// File type icons
const getFileIcon = (mimeType: string) => {
  if (mimeType.startsWith('image/')) return '🖼️';
  if (mimeType.startsWith('video/')) return '🎬';
  if (mimeType.startsWith('audio/')) return '🎵';
  if (mimeType.includes('pdf')) return '📕';
  if (mimeType.includes('word') || mimeType.includes('document')) return '📄';
  if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return '📊';
  if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return '📽️';
  if (mimeType.includes('zip') || mimeType.includes('archive')) return '📦';
  if (mimeType.includes('text')) return '📝';
  return '📎';
};

// Format file size
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
};

// File Item Component
const FileItem: React.FC<{
  file: File;
  onDelete: () => void;
  viewMode: 'grid' | 'list';
}> = ({ file, onDelete, viewMode }) => {
  const [showMenu, setShowMenu] = useState(false);
  const isImage = file.mimeType.startsWith('image/');

  if (viewMode === 'grid') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="group relative bg-[#2d1f33] rounded-lg border border-[#8E609B]/20 hover:border-[#8E609B]/40 transition-colors overflow-hidden"
      >
        {/* Preview */}
        <div className="aspect-square bg-[#1a0b1e] flex items-center justify-center">
          {isImage && file.url ? (
            <img 
              src={file.url} 
              alt={file.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-4xl">{getFileIcon(file.mimeType)}</span>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <h4 className="text-white text-sm font-medium truncate" title={file.originalName}>
            {file.originalName}
          </h4>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-400">{formatFileSize(file.size)}</span>
            <span className="text-xs text-gray-400">
              {new Date(file.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-colors"
          >
            ⋮
          </button>

          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 top-10 bg-[#1a0b1e] border border-[#8E609B]/20 rounded-lg shadow-xl z-10 py-1 min-w-[120px]"
              >
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-3 py-2 text-left text-sm text-white hover:bg-[#8E609B]/10 transition-colors"
                >
                  Download
                </a>
                <button
                  onClick={() => {
                    onDelete();
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  Delete
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }

  // List view
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="group flex items-center gap-4 p-3 bg-[#2d1f33] rounded-lg border border-[#8E609B]/20 hover:border-[#8E609B]/40 transition-colors"
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-[#1a0b1e] flex items-center justify-center">
        {isImage && file.thumbnailUrl ? (
          <img 
            src={file.thumbnailUrl} 
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-2xl">{getFileIcon(file.mimeType)}</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-medium truncate">{file.originalName}</h4>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="text-xs text-gray-400">{formatFileSize(file.size)}</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-400">
            Shared by {file.uploadedBy.name}
          </span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-400">
            {new Date(file.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <a
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-400 hover:text-white hover:bg-[#8E609B]/10 rounded-lg transition-colors"
        >
          ⬇️
        </a>
        <button
          onClick={onDelete}
          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          🗑️
        </button>
      </div>
    </motion.div>
  );
};

// Upload Drop Zone
const UploadDropZone: React.FC<{
  onUpload: (files: FileList) => void;
  uploading: boolean;
}> = ({ onUpload, uploading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
        isDragging
          ? 'border-[#8E609B] bg-[#8E609B]/10'
          : 'border-[#8E609B]/30 hover:border-[#8E609B]/50 hover:bg-[#8E609B]/5'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {uploading ? (
        <>
          <div className="w-10 h-10 border-2 border-[#8E609B] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-white">Uploading...</p>
        </>
      ) : (
        <>
          <div className="text-4xl mb-3">📁</div>
          <p className="text-white font-medium">Drop files here or click to upload</p>
          <p className="text-gray-400 text-sm mt-1">Support for images, documents, and more</p>
        </>
      )}
    </div>
  );
};

// Main Files View Component
export const FilesView: React.FC<{
  channelId?: string;
  conversationId?: string;
}> = ({ channelId, conversationId }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const { files, loading, uploading, uploadFile, deleteFile } = useFiles(channelId, conversationId);

  const handleUpload = async (fileList: FileList) => {
    for (let i = 0; i < fileList.length; i++) {
      await uploadFile(fileList[i]);
    }
  };

  // Filter files
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.originalName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || 
      (filterType === 'images' && file.mimeType.startsWith('image/')) ||
      (filterType === 'documents' && (file.mimeType.includes('pdf') || file.mimeType.includes('document') || file.mimeType.includes('text'))) ||
      (filterType === 'media' && (file.mimeType.startsWith('video/') || file.mimeType.startsWith('audio/')));
    
    return matchesSearch && matchesType;
  });

  if (loading && files.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400">
        Loading files...
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      {/* Header */}
      <div className="sticky top-0 bg-[#0d0611] z-10 p-4 border-b border-[#8E609B]/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Files</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-[#8E609B]/30 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              ▦
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-[#8E609B]/30 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search files..."
              className="w-full bg-[#2d1f33] border border-[#8E609B]/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#8E609B]/50"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-[#2d1f33] border border-[#8E609B]/20 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-[#8E609B]/50"
          >
            <option value="all">All files</option>
            <option value="images">Images</option>
            <option value="documents">Documents</option>
            <option value="media">Media</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Upload Zone */}
        <UploadDropZone onUpload={handleUpload} uploading={uploading} />

        {/* Files */}
        {filteredFiles.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            {files.length === 0 ? 'No files shared yet' : 'No files match your search'}
          </div>
        ) : (
          <div className={`mt-6 ${
            viewMode === 'grid' 
              ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
              : 'space-y-2'
          }`}>
            {filteredFiles.map(file => (
              <FileItem
                key={file._id}
                file={file}
                onDelete={() => deleteFile(file._id)}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilesView;
