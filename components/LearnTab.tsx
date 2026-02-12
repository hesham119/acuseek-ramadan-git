import React from 'react';
import { ExternalLink, Zap, Target, Search } from 'lucide-react';
import { analytics } from '../services/analytics';

const LearnTab: React.FC = () => {
  const handleLearnMoreClick = () => {
    analytics.trackEvent('learn_more_click', {
      source: 'learn_tab_cta',
      target: 'hikvision_nvr_products'
    });
  };

  return (
    <div className="max-w-6xl mx-auto animate-in slide-in-from-bottom-4 duration-500 py-10">
      <div className="bg-[#11111a] rounded-[2rem] overflow-hidden border border-[#2d2d3f] shadow-2xl">
        <div className="p-8 md:p-16">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 space-y-8">
              <div className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-400 text-[11px] font-bold uppercase tracking-widest rounded-full border border-blue-500/20">
                Hikvision DeepinMind
              </div>
              <h1 className="text-5xl font-bold text-white leading-tight tracking-tight">
                AcuSeek AI Search
              </h1>
              <p className="text-base text-slate-400 leading-relaxed max-w-lg">
                AcuSeek leverages advanced deep learning to provide natural language video search, allowing operators to locate specific events instantly without manual scrubbing.
              </p>
              
              <div className="space-y-5 pt-4">
                {[
                  { i: <Search size={22} />, t: 'Text-based Search', d: 'Describe events in natural language for instant retrieval.' },
                  { i: <Zap size={22} />, t: 'Faster Response', d: 'Seconds to find evidence, not hours of playback.' },
                  { i: <Target size={22} />, t: 'Semantic Precision', d: 'Identifies objects, actions, and attributes automatically.' }
                ].map(item => (
                  <div key={item.t} className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-blue-500">
                      {item.i}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-200 text-base">{item.t}</h4>
                      <p className="text-slate-500 text-xs md:text-sm">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <a
                  href="https://www.hikvision.com/mena-en/products/IP-Products/Network-Video-Recorders/?category=Network+Products&subCategory=Network+Video+Recorders&checkedSubSeries=null"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLearnMoreClick}
                  className="inline-flex items-center gap-2 px-10 py-4.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-95 text-base"
                >
                  Learn more
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
            
            <div className="flex-[1.4] w-full">
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-500 blur-[100px] rounded-full opacity-10 animate-pulse"></div>
                <div className="relative overflow-hidden rounded-3xl border border-[#2d2d3f] bg-[#1c1c28] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                   <img 
                     src="https://www.hikvision.com/content/hikvision/en/newsroom/latest-news/2025/hikvision-launches-groundbreaking-acuseek-nvr-redefining-video-retrieval-with-large-multimodal-ai-models/_jcr_content/root/responsivegrid/image.coreimg.100.1280.jpeg/1749437775329/acuseek-nvr-1280x500.jpeg"
                     alt="Hikvision AcuSeek NVR Banner"
                     className="w-full h-auto object-cover rounded-3xl block transform group-hover:scale-105 transition-transform duration-700"
                   />
                   <div className="absolute inset-0 border-4 border-white/5 rounded-3xl pointer-events-none"></div>
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