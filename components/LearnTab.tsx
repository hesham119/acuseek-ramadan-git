
import React from 'react';
import { ExternalLink, Zap, Target, Search } from 'lucide-react';

const LearnTab: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500 py-10">
      <div className="bg-[#11111a] rounded-3xl overflow-hidden border border-[#2d2d3f] shadow-2xl">
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-500/20">
                Hikvision DeepinMind
              </div>
              <h1 className="text-4xl font-bold text-white leading-tight tracking-tight">
                AcuSeek AI Search
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed">
                AcuSeek leverages advanced deep learning to provide natural language video search, allowing operators to locate specific events instantly without manual scrubbing.
              </p>
              
              <div className="space-y-4 pt-4">
                {[
                  { i: <Search />, t: 'Text-based Search', d: 'Describe events in natural language for instant retrieval.' },
                  { i: <Zap />, t: 'Faster Response', d: 'Seconds to find evidence, not hours of playback.' },
                  { i: <Target />, t: 'Semantic Precision', d: 'Identifies objects, actions, and attributes automatically.' }
                ].map(item => (
                  <div key={item.t} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-blue-500">
                      {item.i}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-200 text-sm">{item.t}</h4>
                      <p className="text-slate-500 text-[11px]">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <a
                  href="https://www.hikvision.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-95 text-sm"
                >
                  View Official NVR Documentation
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-xs md:max-w-none">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-3xl rounded-full opacity-10 animate-pulse"></div>
                <div className="relative aspect-square bg-[#1c1c28] rounded-[2rem] p-8 border border-[#2d2d3f] flex items-center justify-center">
                   <div className="w-full h-full border-2 border-dashed border-[#2d2d3f] rounded-[1.5rem] flex items-center justify-center">
                      <div className="text-center p-4">
                         <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Zap className="text-white" size={24} />
                         </div>
                         <div className="text-lg font-black text-white tracking-widest">AI-CORE</div>
                         <div className="text-[10px] text-slate-500 mt-1 font-bold uppercase">Ready for Pro Search</div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnTab;
