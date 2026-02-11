
import React, { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, CornerUpLeft, Facebook, Clock, ImageOff } from 'lucide-react';
import { STATIC_RESULTS } from '../data';
import { SearchResult } from '../types';

interface TryTabProps {
  initialQuery: string;
  onSearch: (query: string) => void;
}

const TryTab: React.FC<TryTabProps> = ({ initialQuery, onSearch }) => {
  const [query, setQuery] = useState(initialQuery);
  const [similarity, setSimilarity] = useState(50);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const filteredResults = useMemo(() => {
    if (!initialQuery) return [];
    
    const normalizedQuery = initialQuery.toLowerCase().trim();
    const searchWords = normalizedQuery
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
      .split(/\s+/)
      .filter(word => word.length >= 2);

    return STATIC_RESULTS
      .map(res => {
        const exactPhraseMatch = res.tags.some(tag => tag.toLowerCase() === normalizedQuery);
        
        const matchCount = searchWords.filter(word => 
          res.tags.some(tag => tag.toLowerCase().includes(word)) ||
          res.camera.toLowerCase().includes(word)
        ).length;

        const matchStrength = searchWords.length > 0 ? (matchCount / searchWords.length) : 0;
        let adjustedScore = Math.min(100, res.score * (0.7 + (matchStrength * 0.3)));
        
        if (exactPhraseMatch) adjustedScore = 100;

        return { 
          ...res, 
          currentMatchScore: exactPhraseMatch ? 100 : matchCount, 
          displayScore: Math.round(adjustedScore) 
        } as SearchResult;
      })
      .filter(res => (res.displayScore ?? 0) >= similarity && (searchWords.length === 0 || (res.currentMatchScore ?? 0) > 0))
      .sort((a, b) => (b.currentMatchScore ?? 0) - (a.currentMatchScore ?? 0) || (b.displayScore ?? 0) - (a.displayScore ?? 0));
  }, [initialQuery, similarity]);

  // Auto-select first result when search results change
  useEffect(() => {
    if (filteredResults.length > 0) {
      const isStillInList = filteredResults.some(r => r.id === selectedResult?.id);
      if (!isStillInList) {
        setSelectedResult(filteredResults[0]);
      }
    } else {
      setSelectedResult(null);
    }
  }, [filteredResults]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a search description.');
      return;
    }
    setError(null);
    onSearch(query.trim());
  };

  const handleShare = () => {
    const url = window.location.href;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const exampleTerms = ['dates', 'iftar', 'prayer mat'];

  if (!initialQuery) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] animate-in fade-in duration-500 px-4">
        <div className="flex flex-col items-center mb-8 md:mb-12">
           <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-tr from-blue-500 via-purple-600 to-indigo-700 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden group">
              <div className="absolute inset-1 bg-[#1c1c28] rounded-full flex items-center justify-center overflow-hidden">
                 <div className="w-full h-full bg-gradient-to-tr from-blue-500/20 to-purple-600/20"></div>
              </div>
              <div className="z-10 w-8 h-8 md:w-12 md:h-12 border-4 border-blue-500 rounded-full border-r-transparent rotate-45 group-hover:rotate-[225deg] transition-transform duration-1000"></div>
           </div>
           <h1 className="text-3xl md:text-4xl font-bold mt-4 tracking-wider flex">
              <span className="text-white">Acu</span><span className="text-blue-500">Seek</span>
           </h1>
           <p className="text-slate-500 text-[10px] md:text-xs mt-2 font-medium tracking-tight uppercase">Video Content Search</p>
        </div>

        <div className="w-full max-w-4xl">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:relative group mb-6 gap-3 sm:gap-0">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type what you remember... e.g. 'dates'"
              className={`w-full h-12 md:h-14 px-6 sm:pr-32 rounded-2xl sm:rounded-full border ${error ? 'border-red-500' : 'border-[#2d2d3f]'} bg-[#11111a] text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-sm shadow-2xl placeholder:text-slate-600`}
            />
            <button
              type="submit"
              className="sm:absolute sm:right-1 sm:top-1 sm:bottom-1 px-8 py-3 sm:py-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl sm:rounded-full transition-all shadow-md active:scale-95 text-sm"
            >
              Search
            </button>
            {error && <p className="text-red-500 text-[10px] mt-2 ml-4 sm:absolute sm:top-full">{error}</p>}
          </form>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-2">
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
            className="w-full md:w-auto px-6 h-10 md:h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-md shrink-0 text-sm"
         >
           Search
         </button>
      </div>

      <div className="flex flex-col mb-6 md:mb-8 bg-[#11111a] p-4 rounded-xl border border-[#2d2d3f]">
        <div className="flex items-center gap-4 w-full">
          <SlidersHorizontal size={16} className="text-slate-500 shrink-0" />
          <span className="text-[10px] md:text-xs font-medium text-slate-400 shrink-0">Similarity</span>
          <input
            type="range"
            min="0"
            max="100"
            value={similarity}
            onChange={(e) => setSimilarity(parseInt(e.target.value))}
            className="flex-grow accent-blue-500 h-1 bg-[#2d2d3f] rounded-lg cursor-pointer"
          />
          <span className="text-[10px] md:text-xs font-bold text-blue-500 w-8 text-right">{similarity}%</span>
        </div>
        <div className="text-[9px] md:text-[10px] text-slate-500 font-black uppercase tracking-widest mt-3">
          Found {filteredResults.length} matches
        </div>
      </div>

      {filteredResults.length > 0 ? (
        <div className="flex flex-col min-[1100px]:grid min-[1100px]:grid-cols-[1fr_450px] gap-6 md:gap-8">
          {/* Results List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 order-2 min-[1100px]:order-1">
            {filteredResults.map((result) => (
              <div
                key={result.id}
                onClick={() => setSelectedResult(result)}
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
                       className="w-full h-full object-cover block"
                       onError={() => handleImageError(`preview-${selectedResult.id}`)}
                     />
                   ) : (
                     <div className="flex flex-col items-center gap-4 text-slate-600">
                        <ImageOff size={48} />
                        <span className="text-xs font-bold uppercase tracking-widest">Image Load Error</span>
                     </div>
                   )
                ) : (
                  <div className="text-slate-600 text-xs italic">Select a result to preview</div>
                )}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded text-[8px] md:text-[9px] text-slate-300">REC 10:31:11</div>
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
                      <div className="text-[8px] md:text-[9px] font-bold uppercase text-slate-500 mb-1">Score</div>
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
            Try searching for "dates", "iftar", or "prayer mat".
          </p>
        </div>
      )}

      <div className="mt-8 md:mt-12 p-4 rounded-lg bg-[#11111a]/30 border border-[#2d2d3f] text-center">
         <p className="text-[9px] md:text-[10px] text-slate-600 italic">
           “This is a simulated demo for the AcuSeek Challenge. Results are based on sample video metadata.”
         </p>
      </div>
    </div>
  );
};

export default TryTab;
