import React, { useState, useEffect, useCallback } from 'react';
import { AppTab, RouteState } from './types';
import TryTab from './components/TryTab';
import RulesTab from './components/RulesTab';
import LearnTab from './components/LearnTab';
import { Search, Info, ShieldCheck } from 'lucide-react';
import { analytics } from './services/analytics';

const App: React.FC = () => {
  const [route, setRoute] = useState<RouteState>({ tab: AppTab.TRY, query: '' });

  const parseHash = useCallback(() => {
    const hash = window.location.hash.replace('#', '');
    const [tabPart, queryPart] = hash.split('?');
    
    let tab = AppTab.TRY;
    if (tabPart === 'rules') tab = AppTab.RULES;
    if (tabPart === 'learn') tab = AppTab.LEARN;

    const params = new URLSearchParams(queryPart || '');
    const query = params.get('q') || '';
    const resultId = params.get('id') || undefined;

    setRoute({ tab, query, resultId });
    
    // Track page/tab view
    analytics.trackEvent('tab_view', { tab_name: tab });
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', parseHash);
    parseHash(); 
    return () => window.removeEventListener('hashchange', parseHash);
  }, [parseHash]);

  const navigateTo = (tab: AppTab, query?: string, resultId?: string) => {
    let newHash = `#${tab}`;
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (resultId) params.set('id', resultId);
    
    const queryString = params.toString();
    if (queryString) newHash += `?${queryString}`;
    
    window.location.hash = newHash;
  };

  const renderContent = () => {
    switch (route.tab) {
      case AppTab.TRY:
        return (
          <TryTab 
            initialQuery={route.query} 
            initialResultId={route.resultId}
            onSearch={(q) => navigateTo(AppTab.TRY, q)} 
            onSelectResult={(id) => navigateTo(AppTab.TRY, route.query, id)}
          />
        );
      case AppTab.RULES:
        return <RulesTab />;
      case AppTab.LEARN:
        return <LearnTab />;
      default:
        return <TryTab initialQuery="" onSearch={(q) => navigateTo(AppTab.TRY, q)} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1c1c28]">
      <header className="bg-[#11111a] border-b border-[#2d2d3f] px-4 md:px-6 py-1 md:py-2 flex items-center justify-between sticky top-0 z-[100]">
        <div className="flex items-center gap-4 md:gap-6 overflow-hidden w-full">
          <div className="flex items-center gap-2 shrink-0">
             <div className="bg-gradient-to-tr from-blue-500 to-purple-600 w-5 h-5 md:w-6 md:h-6 rounded-md flex items-center justify-center">
                <span className="text-white text-[8px] md:text-[10px] font-bold">D</span>
             </div>
             <span className="text-slate-300 font-bold text-xs md:text-sm tracking-tight hidden sm:inline">DeepinMind <span className="text-[8px] md:text-[10px] bg-amber-500/20 text-amber-500 px-1 rounded ml-1">Pro</span></span>
          </div>
          
          <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar whitespace-nowrap">
             <button 
                onClick={() => navigateTo(AppTab.TRY)}
                className={`flex items-center gap-2 px-3 md:px-6 py-2 text-xs md:text-sm font-medium border-b-2 transition-all ${route.tab === AppTab.TRY ? 'border-blue-500 text-blue-400 bg-blue-500/5' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
             >
               <Search size={14} className="md:w-4 md:h-4" /> AcuSeek
             </button>
             <button 
                onClick={() => navigateTo(AppTab.RULES)}
                className={`flex items-center gap-2 px-3 md:px-6 py-2 text-xs md:text-sm font-medium border-b-2 transition-all ${route.tab === AppTab.RULES ? 'border-blue-500 text-blue-400 bg-blue-500/5' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
             >
               <ShieldCheck size={14} className="md:w-4 md:h-4" /> <span className="hidden sm:inline">How to Participate</span><span className="sm:hidden">Rules</span>
             </button>
             <button 
                onClick={() => navigateTo(AppTab.LEARN)}
                className={`flex items-center gap-2 px-3 md:px-6 py-2 text-xs md:text-sm font-medium border-b-2 transition-all ${route.tab === AppTab.LEARN ? 'border-blue-500 text-blue-400 bg-blue-500/5' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
             >
               <Info size={14} className="md:w-4 md:h-4" /> Learn More
             </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>

      <footer className="mt-8 py-4 px-6 border-t border-[#2d2d3f] text-center text-slate-500 text-[9px] md:text-[10px] flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
        <span className="order-2 md:order-1">AcuSeek Version 10.31.11</span>
        <span className="order-1 md:order-2 opacity-40 uppercase tracking-widest font-bold">Hikvision</span>
        <span className="order-3">Usage Policy for AcuSeek</span>
      </footer>
    </div>
  );
};

export default App;