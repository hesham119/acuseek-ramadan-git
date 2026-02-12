import React, { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, CornerUpLeft, Facebook, Clock, ImageOff, Loader2 } from 'lucide-react';
import { STATIC_RESULTS } from '../data';
import { SearchResult } from '../types';

interface TryTabProps {
  initialQuery: string;
  initialResultId?: string;
  onSearch: (query: string) => void;
  onSelectResult?: (id: string) => void;
}

/**
 * Basic NLP utility to clean and normalize search terms
 */
const normalizeTerm = (term: string): string => {
  return term
    .toLowerCase()
    .trim()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
    // Simple stemming: remove common suffixes to find the root
    .replace(/(ing|ers|ed|es|s)$/, "");
};

const STOP_WORDS = new Set(['a', 'an', 'the', 'is', 'are', 'doing', 'with', 'some', 'someone', 'people', 'and', 'in', 'at', 'on', 'of', 'for']);

const TryTab: React.FC<TryTabProps> = ({ initialQuery, initialResultId, onSearch, onSelectResult }) => {
  const [query, setQuery] = useState(initialQuery);
  const [similarity, setSimilarity] = useState(40); // Default similarity threshold
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const filteredResults = useMemo(() => {
    if (!initialQuery) return [];
    
    const rawQuery = initialQuery.toLowerCase().trim();
    const searchTokens = rawQuery
      .split(/\s+/)
      .filter(word => word.length >= 2 && !STOP_WORDS.has(word));

    const normalizedTokens = searchTokens.map(normalizeTerm);

    return STATIC_RESULTS
      .map(res => {
        const resTags = res.tags.map(t => t.toLowerCase());
        const resCamera = res.camera.toLowerCase();
        
        // 1. Check for exact phrase match (Highest Priority)
        const exactPhraseMatch = resTags.some(tag => tag === rawQuery) || resCamera.includes(rawQuery);
        
        // 2. Semantic Token Match
        let matchPoints = 0;
        normalizedTokens.forEach(token => {
          // Does the token match or partially match any tag?
          const tagMatch = resTags.some(tag => {
             const normTag = normalizeTerm(tag);
             return normTag.includes(token) || token.includes(normTag);
          });

          // Does the token appear in the camera name?
          const camMatch = resCamera.includes(token);

          if (tagMatch) matchPoints += 2;
          if (camMatch) matchPoints += 1;
        });

        // 3. Calculate Score
        const coverage = searchTokens.length > 0 ? (matchPoints / (searchTokens.length * 2)) : 0;
        let finalScore = exactPhraseMatch ? 100 : Math.min(100, (res.score * 0.5) + (coverage * 50));
        if (!exactPhraseMatch && matchPoints === 0) finalScore = 0;

        return { 
          ...res, 
          displayScore: Math.round(finalScore),
          matchStrength: matchPoints 
        };
      })
      .filter(res => (res.displayScore ?? 0) >= similarity)
      .sort((a, b) => {
        return (b.displayScore ?? 0) - (a.displayScore ?? 0) || b.score - a.score;
      });
  }, [initialQuery, similarity]);

  useEffect(() => {
    if (filteredResults.length > 0) {
      if (initialResultId) {
        const resultFromUrl = filteredResults.find(r => r.id === initialResultId);
        if (resultFromUrl) {
          setSelectedResult(resultFromUrl);
          return;
        }
      }

      const isStillInList = filteredResults.some(r => r.id === selectedResult?.id);
      if (!isStillInList) {
        setSelectedResult(filteredResults[0]);
      }
    } else {
      setSelectedResult(null);
    }
  }, [filteredResults, selectedResult?.id, initialResultId]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a search description.');
      return;
    }
    setError(null);
    onSearch(query.trim());
  };

  const handleSelectResult = (result: SearchResult) => {
    setSelectedResult(result);
    if (onSelectResult) onSelectResult(result.id);
  };

  const handleShare = () => {
    if (!selectedResult) return;
    const baseUrl = window.location.origin + window.location.pathname;
    const shareParams = new URLSearchParams();
    shareParams.set('q', initialQuery);
    shareParams.set('id', selectedResult.id);
    const fullUrl = `${baseUrl}#try?${shareParams.toString()}`;
    const quoteText = `I found a special Ramadan moment! AcuSeek Ramadan Challenge: Find Ramadan moments and win prizes.`;
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}&quote=${encodeURIComponent(quoteText)}`;
    window.open(fbUrl, '_blank', 'width=600,height=400');
  };

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const exampleTerms = ['dates', 'iftar', 'kids playing', 'festive lanterns'];

  if (!initialQuery) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] animate-in fade-in duration-500 px-4">
        <div className="flex flex-col items-center mb-10 md:mb-16">
           <div className="mb-2">
              <img 
                src="https://i.imgur.com/9xOewfs.png" 
                alt="Hikvision AcuSeek Logo" 
                className="w-48 h-auto md:w-[480px] object-contain"
              />
           </div>
        </div>

        <div className="w-full max-w-4xl">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:relative group mb-8 gap-3 sm:gap-0">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe what happened... e.g. 'kids playing with lanterns'"
              className={`w-full h-12 md:h-16 px-6 sm:pr-40 rounded-2xl sm:rounded-full border ${error ? 'border-red-500' : 'border-[#2d2d3f]'} bg-[#11111a] text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-sm md:text-base shadow-2xl placeholder:text-slate-600`}
            />
            <button
              type="submit"
              className="sm:absolute sm:right-1.5 sm:top-1.5 sm:bottom-1.5 px-10 py-3 sm:py-0 bg-gradient-to-r from-[#9b67f1] to-[#3476f1] hover:from-[#a87df2] hover:to-[#4a84f2] text-white font-medium rounded-full transition-all shadow-lg active:scale-95 text-base md:text-lg"
            >
              Search
            </button>
            {error && <p className="text-red-500 text-[10px] mt-2 ml-4 sm:absolute sm:top-full">{error}</p>}
          </form>

          <div className="flex flex-col items-center justify-center gap-3">
             <div className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-600">Sample Queries</div>
             <div className="flex flex-wrap justify-center gap-2">
                {exampleTerms.map(term => (
                   <button 
                     key={term} 
                     onClick={() => { setQuery(term); onSearch(term); }}
                     className="px-3 md:px-4 py-1.5 bg-[#2d2d3f]/40 hover:bg-[#3b82f6]/20 border border-[#2d2d3f] hover:border-blue-500/50 rounded-full text-[10px] md:text-[11px] text-slate-400 hover:text-blue-400 transition-all flex items-center gap-1.5 whitespace-nowrap"
                   >
                     <Clock size={12} className="text-slate-600 shrink-0" /> {term}
                   </button>
                ))}
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 pb-24 min-[1100px]:pb-0">
      <div className="flex flex-col gap-3 md:gap-4 mb-6 md:mb-8">
         <div className="flex items-center gap-3 w-full">
            <button 
              onClick={() => onSearch('')}
              className="h-10 md:h-11 w-10 md:w-11 bg-[#11111a] border border-[#2d2d3f] rounded-xl text-slate-400 hover:text-blue-400 transition-all shrink-0 flex items-center justify-center"
              aria-label="Go back"
            >
              <CornerUpLeft size={18} />
            </button>
            <form onSubmit={handleSearchSubmit} className="flex-grow relative h-10 md:h-11">
               <input
                 type="text"
                 value={query}
                 onChange={(e) => setQuery(e.target.value)}
                 className="w-full h-full pl-10 md:pl-12 pr-4 rounded-xl border border-[#2d2d3f] focus:outline-none focus:ring-1 focus:ring-blue-500 bg-[#11111a] text-slate-200 text-sm"
               />
               <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-500 md:w-4 md:h-4" size={14} />
            </form>
         </div>
         <button 
            onClick={handleSearchSubmit}
            className="w-full px-10 h-10 md:h-11 bg-gradient-to-r from-[#9b67f1] to-[#3476f1] hover:from-[#a87df2] hover:to-[#4a84f2] text-white font-medium rounded-xl transition-all shadow-md shrink-0 text-sm"
         >
           Search
         </button>
      </div>

      <div className="flex flex-col mb-6 md:mb-8 bg-[#11111a] p-4 rounded-xl border border-[#2d2d3f]">
        <div className="flex items-center gap-4 w-full">
          <SlidersHorizontal size={16} className="text-slate-500 shrink-0" />
          <span className="text-[10px] md:text-xs font-medium text-slate-400 shrink-0">Similarity Threshold</span>
          <input
            type="range"
            min="1"
            max="100"
            value={similarity}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setSimilarity(val < 1 ? 1 : val);
            }}
            className="flex-grow accent-blue-500 h-1 bg-[#2d2d3f] rounded-lg cursor-pointer"
          />
          <span className="text-[10px] md:text-xs font-bold text-blue-500 w-8 text-right">{Math.max(1, similarity)}%</span>
        </div>
        <div className="text-[9px] md:text-[10px] text-slate-500 font-black uppercase tracking-widest mt-3">
          DEEPINMIND SEARCH RESULTS: {filteredResults.length} MATCHES
        </div>
      </div>

      {filteredResults.length > 0 ? (
        <div className="flex flex-col min-[1100px]:grid min-[1100px]:grid-cols-[1fr_450px] gap-6 md:gap-8">
          {/* Results List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 order-2 min-[1100px]:order-1">
            {filteredResults.map((result) => (
              <div
                key={result.id}
                onClick={() => handleSelectResult(result)}
                className={`group relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                  selectedResult?.id === result.id ? 'border-blue-500 shadow-xl bg-[#11111a]' : 'border-transparent bg-[#11111a]/40 hover:bg-[#11111a]'
                }`}
              >
                <div className="aspect-video relative overflow-hidden bg-slate-900 flex items-center justify-center">
                  {!imageErrors[`thumb-${result.id}`] ? (
                    <img 
                      src={result.thumbnail} 
                      alt={result.camera} 
                      className="w-full h-full object-cover block transition-transform group-hover:scale-105"
                      onError={() => handleImageError(`thumb-${result.id}`)}
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-600">
                      <ImageOff size={24} />
                      <span className="text-[8px] uppercase tracking-tighter">No Preview</span>
                    </div>
                  )}
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-blue-600/90 backdrop-blur-md rounded text-[8px] md:text-[9px] font-bold text-white flex items-center gap-1">
                     {result.displayScore}% Sim.
                  </div>
                </div>
                <div className="p-2 md:p-3">
                  <div className="text-[10px] md:text-[11px] font-bold text-slate-200 truncate">{result.camera}</div>
                  <div className="text-[9px] md:text-[10px] text-slate-500 mt-1">{result.timestamp}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Large Preview Sidebar */}
          <div className="space-y-4 order-1 min-[1100px]:order-2">
            <div className="min-[1100px]:sticky min-[1100px]:top-24 bg-[#11111a] rounded-2xl p-4 shadow-2xl border border-[#2d2d3f] overflow-hidden">
              <div className="aspect-video relative rounded-lg overflow-hidden mb-4 bg-slate-900 border border-[#2d2d3f] flex items-center justify-center">
                {selectedResult ? (
                   !imageErrors[`preview-${selectedResult.id}`] ? (
                     <img 
                       key={`preview-${selectedResult.id}`}
                       src={selectedResult.preview} 
                       alt="Large Preview" 
                       className="w-full h-full object-cover block animate-in fade-in duration-300"
                       onError={() => handleImageError(`preview-${selectedResult.id}`)}
                     />
                   ) : (
                     <div className="flex flex-col items-center gap-4 text-slate-600 text-center px-4">
                        <ImageOff size={48} />
                        <span className="text-xs font-bold uppercase tracking-widest leading-relaxed">Image Load Error<br/><span className="text-[10px] font-normal lowercase opacity-50">Remote asset unreachable</span></span>
                     </div>
                   )
                ) : (
                  <div className="text-slate-600 text-xs italic flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Waiting for selection...
                  </div>
                )}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded text-[8px] md:text-[9px] text-slate-300 pointer-events-none">REC 10:31:11</div>
              </div>
              
              {selectedResult && (
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-slate-200 mb-1">{selectedResult.camera}</h3>
                    <p className="text-[10px] md:text-[11px] text-slate-500">{selectedResult.timestamp}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    <div className="p-2 md:p-3 bg-[#2d2d3f]/40 rounded-lg border border-[#2d2d3f]">
                      <div className="text-[8px] md:text-[9px] font-bold uppercase text-slate-500 mb-1">Duration</div>
                      <div className="text-[10px] md:text-xs font-semibold text-slate-300 tracking-tighter">00:00:05.12</div>
                    </div>
                    <div className="p-2 md:p-3 bg-[#2d2d3f]/40 rounded-lg border border-[#2d2d3f]">
                      <div className="text-[8px] md:text-[9px] font-bold uppercase text-slate-500 mb-1">Confidence</div>
                      <div className="text-[10px] md:text-xs font-semibold text-blue-500">{selectedResult.displayScore}% Sim.</div>
                    </div>
                  </div>

                  <button
                    onClick={handleShare}
                    className="hidden min-[1100px]:flex w-full items-center justify-center gap-3 py-3.5 bg-[#1877F2] hover:bg-[#166fe5] text-white text-sm font-bold rounded-xl transition-all shadow-lg active:scale-95"
                  >
                    <Facebook size={16} fill="white" />
                    Share Result on Facebook
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Bottom Bar */}
          {selectedResult && (
            <div className="min-[1100px]:hidden fixed bottom-0 left-0 right-0 p-4 bg-[#11111a]/95 backdrop-blur-md border-t border-[#2d2d3f] z-50 animate-in slide-in-from-bottom duration-300">
              <div className="max-w-7xl mx-auto">
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-[#1877F2] text-white text-sm font-bold rounded-lg shadow-lg active:scale-95"
                >
                  <Facebook size={16} fill="white" />
                  Share Result to Facebook
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-[#11111a] rounded-2xl p-10 md:p-16 text-center border border-[#2d2d3f]">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-[#1c1c28] rounded-full mb-4">
            <Search size={24} className="text-slate-600 md:w-7 md:h-7" />
          </div>
          <h3 className="text-sm md:text-base font-bold text-slate-300 mb-2">No results found</h3>
          <p className="text-slate-500 text-[10px] md:text-xs max-w-xs mx-auto leading-relaxed">
            Try describing scenes like "kids playing with lanterns" or "family iftar table".
          </p>
        </div>
      )}

      <div className="mt-8 md:mt-12 p-4 rounded-lg bg-[#11111a]/30 border border-[#2d2d3f] text-center">
         <p className="text-[9px] md:text-[10px] text-slate-600 italic">
           These results are simulated and shown for illustrative purposes only.
         </p>
      </div>
    </div>
  );
};

export default TryTab;