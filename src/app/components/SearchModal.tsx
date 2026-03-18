'use client';

import { useState, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'anime' | 'manga' | 'users' | 'posts'>('all');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    // TODO: Connect to Python AI Microservice: fetch('http://localhost:8000/search?q=' + query + '&filter=' + filter)
    // Simulating response for now
    setTimeout(() => {
      setResults([
        { id: 1, type: 'anime', title: 'Demon Slayer', description: 'Găsit prin Căutare Semantică IA: "Anime cu demoni și săbii"' },
        { id: 2, type: 'post', title: 'Review Episodul 19', description: 'Găsit semantic în postările utilizatorilor.' }
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm">
      <div
        className="bg-base-100 w-11/12 max-w-3xl rounded-xl shadow-2xl overflow-hidden border border-border flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Input */}
        <div className="p-4 border-b border-border flex items-center gap-3">
          <Search className="text-base-content/50" />
          <form onSubmit={handleSearch} className="flex-1">
            <input
              type="text"
              autoFocus
              placeholder="Ex: Un garçon qui veut devenir roi des pirates..."
              className="w-full bg-transparent outline-none text-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 p-3 bg-base-200/50 overflow-x-auto border-b border-border">
          {['all', 'anime', 'manga', 'users', 'posts'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`btn btn-sm rounded-full ${filter === f ? 'btn-primary' : 'btn-outline border-base-content/20'}`}
            >
              {f === 'all' ? 'Toate (IA)' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full text-base-content/50 mt-10">
              <Loader2 className="animate-spin mb-4" size={32} />
              <p>Recherche en cours...</p>
            </div>
          ) : results.length > 0 ? (
            results.map((res) => (
              <div key={res.id} className="flex gap-4 p-3 rounded-lg hover:bg-base-200 cursor-pointer transition-colors border border-transparent hover:border-border">
                <div className="w-12 h-12 bg-base-300 rounded flex-shrink-0 flex items-center justify-center font-bold text-xs uppercase text-base-content/50">
                  {res.type}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{res.title}</h3>
                  <p className="text-sm text-base-content/70">{res.description}</p>
                </div>
              </div>
            ))
          ) : query ? (
            <div className="text-center h-full flex flex-col justify-center items-center text-base-content/50 mt-10">
              <p>Pas de résultat pour "{query}"</p>
            </div>
          ) : (
            <div className="text-center h-full flex flex-col justify-center items-center text-base-content/50 mt-10">
              <Search className="mx-auto mb-4 opacity-20" size={48} />
              <p className="font-semibold mb-1">Cherche intelligemment avec NakamaAI</p>
              <p className="text-sm opacity-70 max-w-sm text-center">
                Utilise des descriptions naturelles. Essaie de chercher l'histoire au lieu du titre exact!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
