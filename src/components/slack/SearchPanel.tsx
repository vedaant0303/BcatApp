import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useWorkspace } from '../../context/WorkspaceContext';

interface SearchResult {
  _id: string;
  type: 'message' | 'file' | 'channel' | 'user' | 'canvas';
  content?: string;
  title?: string;
  name?: string;
  channel?: { _id: string; name: string };
  conversation?: { _id: string };
  author?: { _id: string; name: string; avatar?: string };
  createdAt: string;
  highlights?: string[];
}

interface SearchFilters {
  type?: 'messages' | 'files' | 'channels' | 'people' | 'canvas';
  from?: string;
  in?: string;
  dateRange?: 'today' | 'week' | 'month' | 'year' | 'custom';
  hasFile?: boolean;
  hasLink?: boolean;
  hasReaction?: boolean;
}

// Search Hook
export const useSearch = () => {
  const { token } = useAuth();
  const { currentWorkspace } = useWorkspace();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const search = useCallback(async (query: string, filters?: SearchFilters) => {
    if (!token || !currentWorkspace || !query.trim()) return;

    setLoading(true);
    try {
      const params = new URLSearchParams({
        q: query,
        workspace: currentWorkspace._id
      });

      if (filters?.type) params.append('type', filters.type);
      if (filters?.from) params.append('from', filters.from);
      if (filters?.in) params.append('in', filters.in);
      if (filters?.dateRange) params.append('dateRange', filters.dateRange);
      if (filters?.hasFile) params.append('hasFile', 'true');
      if (filters?.hasLink) params.append('hasLink', 'true');

      const response = await fetch(`${API_BASE}/search?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        setResults(data.results);
        
        // Save to recent searches
        setRecentSearches(prev => {
          const updated = [query, ...prev.filter(s => s !== query)].slice(0, 10);
          localStorage.setItem('recentSearches', JSON.stringify(updated));
          return updated;
        });
      }
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  }, [token, currentWorkspace]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return {
    results,
    loading,
    search,
    recentSearches,
    clearRecentSearches
  };
};

// Search Result Item Component
const SearchResultItem: React.FC<{
  result: SearchResult;
  onClick: () => void;
}> = ({ result, onClick }) => {
  const renderIcon = () => {
    switch (result.type) {
      case 'message':
        return '💬';
      case 'file':
        return '📎';
      case 'channel':
        return '#';
      case 'user':
        return '👤';
      case 'canvas':
        return '📄';
      default:
        return '📌';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className="p-3 rounded-lg hover:bg-[#8E609B]/10 cursor-pointer transition-colors group"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded bg-[#2d1f33] flex items-center justify-center text-lg flex-shrink-0">
          {renderIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          {/* Title/Name */}
          <div className="flex items-center gap-2">
            {result.type === 'channel' && (
              <span className="text-white font-medium">#{result.name}</span>
            )}
            {result.type === 'user' && (
              <span className="text-white font-medium">{result.name}</span>
            )}
            {result.type === 'message' && result.author && (
              <span className="text-white font-medium">{result.author.name}</span>
            )}
            {result.type === 'file' && (
              <span className="text-white font-medium">{result.title || result.name}</span>
            )}
            {result.type === 'canvas' && (
              <span className="text-white font-medium">{result.title}</span>
            )}
            
            {/* Channel/Location */}
            {result.channel && (
              <span className="text-xs text-gray-400">in #{result.channel.name}</span>
            )}
          </div>

          {/* Content Preview */}
          {result.content && (
            <p className="text-sm text-gray-400 mt-1 line-clamp-2">
              {result.highlights && result.highlights.length > 0 ? (
                <span dangerouslySetInnerHTML={{ __html: result.highlights[0] }} />
              ) : (
                result.content
              )}
            </p>
          )}

          {/* Date */}
          <span className="text-xs text-gray-500 mt-1 block">
            {new Date(result.createdAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Filter Chips Component
const FilterChips: React.FC<{
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
}> = ({ filters, onChange }) => {
  const typeOptions = [
    { value: undefined, label: 'All' },
    { value: 'messages', label: 'Messages' },
    { value: 'files', label: 'Files' },
    { value: 'channels', label: 'Channels' },
    { value: 'people', label: 'People' },
    { value: 'canvas', label: 'Canvases' }
  ] as const;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Type filter */}
      <div className="flex items-center gap-1 bg-[#2d1f33] rounded-lg p-1">
        {typeOptions.map(option => (
          <button
            key={option.value ?? 'all'}
            onClick={() => onChange({ ...filters, type: option.value })}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              filters.type === option.value
                ? 'bg-[#8E609B] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Additional filters */}
      <button
        onClick={() => onChange({ ...filters, hasFile: !filters.hasFile })}
        className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
          filters.hasFile
            ? 'bg-[#8E609B]/20 border-[#8E609B] text-white'
            : 'border-[#8E609B]/20 text-gray-400 hover:text-white'
        }`}
      >
        📎 Has file
      </button>
      
      <button
        onClick={() => onChange({ ...filters, hasLink: !filters.hasLink })}
        className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
          filters.hasLink
            ? 'bg-[#8E609B]/20 border-[#8E609B] text-white'
            : 'border-[#8E609B]/20 text-gray-400 hover:text-white'
        }`}
      >
        🔗 Has link
      </button>
    </div>
  );
};

// Search Modifiers Help
const SearchModifiersHelp: React.FC = () => {
  const modifiers = [
    { key: 'from:', desc: 'Search messages from a specific person', example: 'from:@john' },
    { key: 'in:', desc: 'Search in a specific channel', example: 'in:#general' },
    { key: 'has:', desc: 'Filter by attachments', example: 'has:file, has:link, has:reaction' },
    { key: 'before:', desc: 'Messages before a date', example: 'before:2024-01-01' },
    { key: 'after:', desc: 'Messages after a date', example: 'after:2024-01-01' },
    { key: '"..."', desc: 'Exact phrase match', example: '"meeting notes"' },
    { key: '-', desc: 'Exclude terms', example: '-draft' }
  ];

  return (
    <div className="bg-[#1a0b1e] border border-[#8E609B]/20 rounded-xl p-4 mb-4">
      <h4 className="text-white font-medium mb-3 flex items-center gap-2">
        <span>✨</span>
        Search modifiers
      </h4>
      <div className="space-y-2">
        {modifiers.map(mod => (
          <div key={mod.key} className="flex items-start gap-3">
            <code className="text-[#8E609B] text-sm bg-[#8E609B]/10 px-2 py-0.5 rounded">{mod.key}</code>
            <div>
              <span className="text-sm text-gray-300">{mod.desc}</span>
              <span className="text-xs text-gray-500 block">{mod.example}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Search Panel Component
export const SearchPanel: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onResultClick?: (result: SearchResult) => void;
}> = ({ isOpen, onClose, onResultClick }) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showModifiers, setShowModifiers] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { results, loading, search, recentSearches, clearRecentSearches } = useSearch();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard shortcut to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      search(query, filters);
    }
  };

  const handleRecentClick = (recent: string) => {
    setQuery(recent);
    search(recent, filters);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center pt-[10vh]"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-2xl bg-[#0d0611] rounded-xl shadow-2xl border border-[#8E609B]/20 overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="p-4 border-b border-[#8E609B]/20">
            <form onSubmit={handleSearch} className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search messages, files, channels..."
                className="w-full bg-[#2d1f33] border border-[#8E609B]/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#8E609B]/50"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowModifiers(!showModifiers)}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  ?
                </button>
                <span className="text-xs text-gray-500 bg-[#1a0b1e] px-1.5 py-0.5 rounded">⌘K</span>
              </div>
            </form>
          </div>

          {/* Filters */}
          <div className="px-4 py-3 border-b border-[#8E609B]/20">
            <FilterChips filters={filters} onChange={setFilters} />
          </div>

          {/* Content */}
          <div className="max-h-[60vh] overflow-y-auto">
            {/* Modifiers Help */}
            {showModifiers && (
              <div className="p-4">
                <SearchModifiersHelp />
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-2 border-[#8E609B] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-gray-400">Searching...</p>
              </div>
            )}

            {/* Results */}
            {!loading && results.length > 0 && (
              <div className="p-4">
                <h4 className="text-xs uppercase text-gray-400 font-semibold mb-2">
                  {results.length} results
                </h4>
                <div className="space-y-1">
                  {results.map(result => (
                    <SearchResultItem
                      key={result._id}
                      result={result}
                      onClick={() => {
                        onResultClick?.(result);
                        onClose();
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {!loading && query && results.length === 0 && (
              <div className="p-8 text-center">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-white font-medium">No results found</p>
                <p className="text-gray-400 text-sm mt-1">Try different keywords or filters</p>
              </div>
            )}

            {/* Recent Searches (when no query) */}
            {!query && recentSearches.length > 0 && (
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs uppercase text-gray-400 font-semibold">Recent searches</h4>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    Clear
                  </button>
                </div>
                <div className="space-y-1">
                  {recentSearches.map((recent, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleRecentClick(recent)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#8E609B]/10 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <span className="text-gray-500">🕐</span>
                      {recent}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {!query && recentSearches.length === 0 && (
              <div className="p-8 text-center">
                <div className="text-4xl mb-3">🔎</div>
                <p className="text-white font-medium">Search your workspace</p>
                <p className="text-gray-400 text-sm mt-1">Find messages, files, channels, and more</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-[#8E609B]/20 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span><kbd className="px-1 bg-[#2d1f33] rounded">↵</kbd> to search</span>
              <span><kbd className="px-1 bg-[#2d1f33] rounded">esc</kbd> to close</span>
            </div>
            <span>Powered by advanced search</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchPanel;
