import React, { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, CornerUpLeft, Facebook, Clock, ImageOff, Loader2, AlertCircle } from 'lucide-react';
import { STATIC_RESULTS } from '../data';
import { SearchResult } from '../types';
import { analytics } from '../services/analytics';

interface TryTabProps {
  initialQuery: string;
  initialResultId?: string;
  onSearch: (query: string) => void;
  onSelectResult?: (id: string) => void;
}

/**
 * Enhanced Semantic Synonyms
 */
const SYNONYMS: Record<string, string[]> = {
  'mosque': ['masjid', 'masjed', 'jamaa', 'mosk', 'temple', 'place of worship'],
  'masjid': ['mosque', 'masjed', 'jamaa'],
  'lantern': ['fanoos', 'fanous', 'fanus', 'lamp', 'light', 'decoration'],
  'fanoos': ['lantern', 'fanous', 'fanus'],
  'fanous': ['lantern', 'fanoos', 'fanus'],
  'sweets': ['dessert', 'baklava', 'baklawa', 'treats', 'sweet', 'pastry'],
  'drummer': ['mesaharaty', 'musaharaty', 'mesaharati', 'musaharati', 'suhoor caller', 'dawn caller'],
  'mesaharaty': ['drummer', 'musaharaty', 'suhoor caller'],
  'dates': ['tamr', 'fruit', 'breaking fast', 'palm fruit'],
  'iftar': ['dinner', 'breaking fast', 'fasting', 'gathering', 'meal', 'food', 'maghrib'],
  'meal': ['food', 'iftar', 'dinner', 'break fast', 'dish', 'plate'],
  'food': ['meal', 'iftar', 'dinner', 'snack'],
  'cannon': ['madfa', 'madfaa', 'firing', 'artillery', 'gun', 'tradition', 'iftar cannon'],
  'madfa': ['cannon', 'iftar cannon', 'madfaa'],
  'playing': ['carrying', 'holding', 'walking', 'celebrating', 'gathering', 'moving'],
  'holding': ['carrying', 'playing', 'with', 'having'],
  'having': ['eating', 'holding', 'with']
};

/**
 * Expanded stop words list
 */
const STOP_WORDS = new Set(['a', 'an', 'the', 'is', 'are', 'doing', 'with', 'some', 'someone', 'and', 'in', 'at', 'on', 'of', 'for', 'having', 'has', 'had', 'take', 'taking', 'get', 'getting', 'there', 'was', 'were', 'by', 'that', 'this']);

/**
 * Basic Rule-based Stemming (Suffix stripping)
 */
const stem = (word: string): string => {
  if (word.length <= 3) return word;
  return word
    .replace(/(ing|ed|ly|es|s)$/, '')
    .replace(/([^aeiou])\1$/, '$1'); // Fix double consonants after stripping
};

const normalizeTerm = (term: string): string => {
  return term
    .toLowerCase()
    .trim()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
};

/**
 * Levenshtein distance for fuzzy matching
 */
const levenshtein = (a: string, b: string): number => {
  const matrix = Array.from({ length: a.length + 1 }, () => 
    Array.from({ length: b.length + 1 }, (_, i) => i)
  );
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
};

const fuzzyMatch = (s1: string, s2: string): number => {
  if (s1 === s2) return 1.0;
  if (s1.includes(s2) || s2.includes(s1)) return 0.85;
  const dist = levenshtein(s1, s2);
  const maxLen = Math.max(s1.length, s2.length);
  const similarity = (maxLen - dist) / maxLen;
  return similarity > 0.7 ? similarity : 0;
};

const TryTab: React.FC<TryTabProps> = ({ initialQuery, initialResultId, onSearch, onSelectResult }) => {
  const [query, setQuery] = useState(initialQuery);
  const [similarityThreshold, setSimilarityThreshold] = useState(41); 
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasAgreedToDisclaimer, setHasAgreedToDisclaimer] = useState(false);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const filteredResults = useMemo(() => {
    if (!initialQuery) return [];
    
    const rawQuery = initialQuery.toLowerCase().trim();
    const queryTokens = rawQuery
      .split(/\s+/)
      .filter(word => word.length >= 2 && !STOP_WORDS.has(word));

    if (queryTokens.length === 0 && rawQuery.length > 0) {
      queryTokens.push(...rawQuery.split(/\s+/));
    }

    const normalizedQueryTokens = queryTokens.map(normalizeTerm);
    const stemmedQueryTokens = normalizedQueryTokens.map(stem);

    return STATIC_RESULTS
      .map(res => {
        const resTags = res.tags.map(t => t.toLowerCase());
        const resCamera = res.camera.toLowerCase();
        
        const exactFullMatch = resTags.some(tag => tag === rawQuery) || resCamera.includes(rawQuery);
        
        let totalTokenScore = 0;
        let matchedTokensCount = 0;

        normalizedQueryTokens.forEach((qToken, idx) => {
          let bestMatchForToken = 0;
          const qStem = stemmedQueryTokens[idx];
          const synonyms = SYNONYMS[qToken] || [];

          resTags.forEach(tag => {
            const normTag = normalizeTerm(tag);
            const tagWords = normTag.split(/\s+/);
            const tagStem = stem(normTag);
            
            if (normTag === qToken) {
              bestMatchForToken = 1.0;
            } 
            else if (tagWords.includes(qToken)) {
              bestMatchForToken = Math.max(bestMatchForToken, 0.4);
            }
            else if (tagStem === qStem) {
              bestMatchForToken = Math.max(bestMatchForToken, 0.9);
            }
            else if (resCamera.includes(qToken)) {
              bestMatchForToken = Math.max(bestMatchForToken, 0.5);
            }
            else if (synonyms.some(syn => normalizeTerm(syn) === normTag || tagWords.includes(normalizeTerm(syn)))) {
              bestMatchForToken = Math.max(bestMatchForToken, 0.2); 
            }
            else {
              const fScore = fuzzyMatch(normTag, qToken);
              if (fScore > 0.85) {
                bestMatchForToken = Math.max(bestMatchForToken, 0.1);
              }
            }
          });

          if (bestMatchForToken > 0.35) {
            matchedTokensCount++;
          }
          totalTokenScore += bestMatchForToken;
        });

        const coverage = queryTokens.length > 0 ? (totalTokenScore / queryTokens.length) : 0;
        const matchedRatio = queryTokens.length > 0 ? (matchedTokensCount / queryTokens.length) : 1;

        let finalScore = exactFullMatch ? 100 : (coverage * 100);

        if (matchedRatio < 1.0) {
          finalScore = finalScore * Math.pow(matchedRatio, 3); 
        }

        return { ...res, displayScore: Math.round(finalScore) };
      })
      .filter(res => (res.displayScore ?? 0) >= similarityThreshold)
      .sort((a, b) => {
          if ((b.displayScore ?? 0) !== (a.displayScore ?? 0)) {
              return (b.displayScore ?? 0) - (a.displayScore ?? 0);
          }
          return b.score - a.score;
      });
  }, [initialQuery, similarityThreshold]);

  useEffect(() => {
    if (filteredResults.length > 0) {
      if (initialResultId) {
        const resultFromUrl = filteredResults.find(r => r.id === initialResultId);
        if (resultFromUrl) { setSelectedResult(resultFromUrl); return; }
      }
      const isStillInList = filteredResults.some(r => r.id === selectedResult?.id);
      if (!isStillInList) setSelectedResult(filteredResults[0]);
    } else {
      setSelectedResult(null);
    }
  }, [filteredResults, selectedResult?.id, initialResultId]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) { setError('Please enter a description.'); return; }
    setError(null);
    onSearch(query.trim());
  };

  const handleSelectResult = (result: SearchResult) => {
    setSelectedResult(result);
    if (onSelectResult) onSelectResult(result.id);
  };

  const handleShare = () => {
    if (!selectedResult) return;
    const baseUrl = 'https://acuseek-ramadan-git.vercel.app/';
    const fullUrl = `${baseUrl}#try?q=${encodeURIComponent(initialQuery)}&id=${selectedResult.id}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`, '_blank', 'width=600,height=400');
  };

  const exampleTerms = ['a box of dates', 'people having iftar meal', 'iftar cannon in the square', 'mesaharaty with drums', 'kids playing with lanterns', 'grand mosque entrance with decorations'];

  if (!initialQuery) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 relative">
        <div className="flex flex-col items-center mb-6">
          <img src="https://i.imgur.com/9xOewfs.png" alt="AcuSeek" className="w-48 md:w-[480px]" />
          <p className="mt-8 text-[11px] md:text-xs text-slate-500 font-medium tracking-wide opacity-80 uppercase text-center animate-in fade-in duration-700">
             Search results are simulated for demonstration purposes only.
          </p>
        </div>
        <div className="w-full max-w-4xl">
          <div className="relative z-[210]">
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:relative mb-8 gap-3 sm:gap-0">
              <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Describe what happened... e.g. 'people having iftar meal'" 
                className="w-full h-12 md:h-16 px-6 sm:pr-40 rounded-2xl sm:rounded-full border border-[#2d2d3f] bg-[#11111a] text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-2xl" 
              />
              <button 
                type="submit" 
                className="sm:absolute sm:right-1.5 sm:top-1.5 sm:bottom-1.5 px-10 py-3 sm:py-0 bg-gradient-to-r from-[#9b67f1] to-[#3476f1] text-white font-medium rounded-full transition-all hover:brightness-110 active:scale-95"
              >
                Search
              </button>
            </form>
          </div>
          <div className="flex flex-col items-center gap-3 relative z-[210]">
             <div className="text-[10px] uppercase tracking-widest font-black text-slate-600">Sample Queries</div>
             <div className="flex flex-wrap justify-center gap-2">
                {exampleTerms.map(term => (
                  <button 
                    key={term} 
                    onClick={() => { setQuery(term); onSearch(term); }} 
                    className="px-3 py-1.5 bg-[#2d2d3f]/40 hover:bg-[#3b82f6]/20 border border-[#2d2d3f] rounded-full text-[10px] text-slate-400 flex items-center gap-1.5 transition-colors"
                  >
                    <Clock size={12} /> {term}
                  </button>
                ))}
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 pb-24 min-[1100px]:pb-0 relative">
      {/* Disclaimer Modal */}
      {!hasAgreedToDisclaimer && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative bg-[#11111a] border border-[#2d2d3f] rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <AlertCircle size={32} className="text-blue-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-100 text-center mb-4">AcuSeek Simulation Policy</h2>
            <p className="text-slate-400 text-sm leading-relaxed text-center mb-8">
              In real deployments, AcuSeek searches based on detectable visual elements and events. Cultural or seasonal concepts like <span className="text-blue-400 font-semibold">“Ramadan”</span> are used here only to illustrate how those visual elements might appear.
            </p>
            <button 
              onClick={() => setHasAgreedToDisclaimer(true)}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-2xl transition-all shadow-lg active:scale-[0.98]"
            >
              I Understand & Agree
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-end mb-4">
        <p className="text-[10px] md:text-xs text-slate-500 font-medium tracking-wide opacity-80 uppercase text-right">
           Search results are simulated for demonstration purposes only.
        </p>
      </div>
      <div className="flex flex-col gap-3 mb-8">
         <div className="flex items-center gap-3 w-full">
            <button onClick={() => onSearch('')} className="h-10 w-10 bg-[#11111a] border border-[#2d2d3f] rounded-xl text-slate-400 flex items-center justify-center hover:bg-[#1c1c28] transition-colors"><CornerUpLeft size={18} /></button>
            <form onSubmit={handleSearchSubmit} className="flex-grow relative h-10">
               <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full h-full pl-10 pr-4 rounded-xl border border-[#2d2d3f] bg-[#11111a] text-slate-200 text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            </form>
         </div>
         <button onClick={handleSearchSubmit} className="w-full px-10 h-10 bg-gradient-to-r from-[#9b67f1] to-[#3476f1] text-white font-medium rounded-xl text-sm transition-all hover:brightness-110 active:scale-[0.98]">Search</button>
      </div>
      <div className="flex flex-col mb-8 bg-[#11111a] p-4 rounded-xl border border-[#2d2d3f] shadow-sm">
        <div className="flex items-center gap-4 w-full">
          <SlidersHorizontal size={16} className="text-slate-500" />
          <span className="text-[10px] font-medium text-slate-400">Strictness Threshold</span>
          <input type="range" min="1" max="100" value={similarityThreshold} onChange={(e) => setSimilarityThreshold(parseInt(e.target.value))} className="flex-grow accent-blue-500 h-1 bg-[#2d2d3f] rounded-lg cursor-pointer" />
          <span className="text-[10px] font-bold text-blue-500 w-8 text-right">{similarityThreshold}%</span>
        </div>
        <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-3">FOUND {filteredResults.length} ACCURATE MATCHES</div>
      </div>
      
      {filteredResults.length > 0 ? (
        <div className="flex flex-col min-[1100px]:grid min-[1100px]:grid-cols-[1fr_450px] gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 order-2 min-[1100px]:order-1">
            {filteredResults.map((result) => {
              return (
                <div key={result.id} onClick={() => handleSelectResult(result)} className={`group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${selectedResult?.id === result.id ? 'border-blue-500 bg-[#11111a] ring-4 ring-blue-500/10' : 'border-transparent bg-[#11111a]/40 hover:bg-[#11111a]/60 hover:border-[#2d2d3f]'}`}>
                  <div className="aspect-video relative overflow-hidden bg-slate-900">
                    <img src={result.thumbnail} alt={result.camera} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-blue-600/90 backdrop-blur-sm rounded text-[8px] font-bold text-white z-20 shadow-lg">{result.displayScore}% Similarity</div>
                    {selectedResult?.id === result.id && (
                        <div className="absolute inset-0 bg-blue-500/10 z-10 pointer-events-none" />
                    )}
                  </div>
                  <div className="p-3">
                    <div className="text-[10px] font-bold text-slate-200 truncate">{result.camera}</div>
                    <div className="text-[9px] text-slate-500 mt-1 flex items-center gap-1.5"><Clock size={10} /> {result.timestamp}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="order-1 min-[1100px]:order-2">
            <div className="min-[1100px]:sticky min-[1100px]:top-24 bg-[#11111a] rounded-2xl p-4 shadow-2xl border border-[#2d2d3f]">
              <div className="aspect-video relative rounded-lg overflow-hidden mb-4 bg-slate-900 border border-[#2d2d3f]">
                {selectedResult && (
                  <img src={selectedResult.preview} alt="Preview" className="w-full h-full object-cover animate-in fade-in duration-500" />
                )}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-[8px] text-slate-300 z-20 font-mono">REC LIVE</div>
                <div className="absolute top-2 right-2 flex gap-1 items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[8px] font-bold text-white uppercase tracking-tighter shadow-sm">AI Analyzed</span>
                </div>
              </div>
              {selectedResult && (
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-sm font-bold text-slate-200 mb-1">{selectedResult.camera}</h3>
                        <p className="text-[10px] text-slate-500 flex items-center gap-1.5"><Clock size={12} /> {selectedResult.timestamp}</p>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded">
                        <span className="text-[9px] font-black text-blue-400">{selectedResult.displayScore}% Match</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-[#2d2d3f]/20 rounded-lg border border-[#2d2d3f]"><div className="text-[8px] font-bold uppercase text-slate-500 mb-1">Duration</div><div className="text-[10px] font-semibold text-slate-300">00:00:05.12</div></div>
                    <div className="p-3 bg-[#2d2d3f]/20 rounded-lg border border-[#2d2d3f]"><div className="text-[8px] font-bold uppercase text-slate-500 mb-1">Resolution</div><div className="text-[10px] font-semibold text-slate-300">4K AcuSense</div></div>
                  </div>
                  
                  <div className="py-2">
                    <div className="text-[8px] font-bold uppercase text-slate-600 mb-2 tracking-widest">Metadata Tags</div>
                    <div className="flex flex-wrap gap-1.5">
                        {selectedResult.tags.slice(0, 6).map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-[#1c1c28] border border-[#2d2d3f] rounded text-[8px] text-slate-400">#{tag}</span>
                        ))}
                    </div>
                  </div>

                  <button onClick={handleShare} className="w-full flex items-center justify-center gap-3 py-3.5 bg-[#1877F2] hover:bg-[#166fe5] text-white text-sm font-bold rounded-xl shadow-lg transition-all active:scale-[0.97]"><Facebook size={16} fill="white" />Share Moment on Facebook</button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#11111a] rounded-2xl p-20 text-center border border-[#2d2d3f] animate-in fade-in zoom-in-95 duration-300">
            <ImageOff size={40} className="text-slate-700 mx-auto mb-4 opacity-50" />
            <h3 className="text-sm font-bold text-slate-300 mb-1">No footage found</h3>
            <p className="text-[10px] text-slate-500 max-w-xs mx-auto">Try adjusting the strictness slider or using different keywords like "lantern", "IFTAR", or "dates".</p>
        </div>
      )}
    </div>
  );
};

export default TryTab;