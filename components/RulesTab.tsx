import React from 'react';
import { Camera, Share2, Globe, Sparkles, UserX, Gift } from 'lucide-react';

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

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500 py-10">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#11111a] rounded-2xl p-8 border border-[#2d2d3f]">
          <div className="flex items-center gap-3 mb-6">
            <Gift className="text-amber-500" size={20} />
            <h3 className="text-base font-bold text-white">Selection Criteria</h3>
          </div>
          <ul className="space-y-4">
            {[
              { t: 'Weekly Lucky Draw', d: 'Winners will be selected via a lucky draw conducted each week from all eligible entries.' },
              { t: 'Correct Tagging', d: 'Your post must successfully tag @hikvision.mea1 to be qualified for the draw.' },
              { t: 'Public Visibility', d: 'Only public posts can be tracked and entered into the weekly selection.' }
            ].map(item => (
              <li key={item.t} className="flex items-start gap-4">
                <div className="w-5 h-5 rounded bg-blue-500/20 text-blue-500 flex items-center justify-center text-[10px] font-bold shrink-0">✓</div>
                <div>
                  <p className="font-bold text-slate-300 text-xs">{item.t}</p>
                  <p className="text-slate-500 text-[10px]">{item.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-red-950/20 rounded-2xl p-8 border border-red-900/30">
          <div className="flex items-center gap-3 mb-4">
            <UserX className="text-red-500" size={20} />
            <h3 className="text-base font-bold text-red-200">Safety Notice</h3>
          </div>
          <p className="text-red-300/60 leading-relaxed text-[11px]">
            This is a simulated challenge environment. <strong>Do not enter real personal information</strong>, private addresses, or sensitive data in the search field.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RulesTab;