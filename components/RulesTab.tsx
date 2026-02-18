import React from 'react';
import { Camera, Share2, Globe, Gift } from 'lucide-react';

const RulesTab: React.FC = () => {
  const steps = [
    {
      icon: <Camera size={24} className="text-blue-500" />,
      title: "1. Try a search",
      description: "Describe what you remember from the Ramadan scenes in the AcuSeek interface."
    },
    {
      icon: <Share2 size={24} className="text-blue-500" />,
      title: "2. Share & Tag",
      description: "Click the Facebook share button and tag @hikvision.mea1 in your post caption."
    },
    {
      icon: <Globe size={24} className="text-blue-500" />,
      title: "3. Keep your post public",
      description: "Ensure judges can view your entry by keeping your Facebook post visibility set to Public."
    }
  ];

  const criteria = [
    { 
      t: 'Lucky Draw', 
      d: '10 Winners will be randomly selected by the last week of Ramadan from all eligible entries submitted during the Campaign period.' 
    },
    { 
      t: 'Correct Tagging', 
      d: 'Posts must correctly tag @hikvision.mea1 to be eligible for the draw.' 
    },
    { 
      t: 'Public Visibility', 
      d: 'Only publicly visible posts can be tracked and included in the selection.' 
    },
    { 
      t: 'Prize', 
      d: 'Each selected winner will receive one (1) EZVIZ home camera. The exact model may vary based on availability.' 
    }
  ];

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500 py-10 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Challenge Instructions</h1>
        <p className="text-slate-500 text-sm">Follow these simple steps to enter the AcuSeek Ramadan Challenge.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-[#11111a] rounded-2xl p-8 border border-[#2d2d3f] flex flex-col items-center text-center group hover:border-blue-500/50 transition-all">
            <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              {step.icon}
            </div>
            <h3 className="text-base font-bold text-slate-200 mb-3">{step.title}</h3>
            <p className="text-slate-500 leading-relaxed text-[11px]">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-[#11111a] rounded-2xl p-8 border border-[#2d2d3f] shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <Gift className="text-amber-500" size={20} />
            <h3 className="text-base font-bold text-white tracking-tight">Selection Criteria</h3>
          </div>
          <ul className="space-y-6">
            {criteria.map(item => (
              <li key={item.t} className="flex items-start gap-4 group">
                <div className="w-5 h-5 rounded bg-blue-500/20 text-blue-500 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✓</div>
                <div>
                  <p className="font-bold text-slate-300 text-xs mb-1">{item.t}</p>
                  <p className="text-slate-500 text-[10px] leading-relaxed group-hover:text-slate-400 transition-colors">
                    {item.d}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RulesTab;