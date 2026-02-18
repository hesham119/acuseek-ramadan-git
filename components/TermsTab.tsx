import React from 'react';
import { ArrowLeft, ScrollText } from 'lucide-react';

interface TermsTabProps {
  onBack?: () => void;
}

const TermsTab: React.FC<TermsTabProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 py-10">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
          <ScrollText className="text-blue-500" size={24} />
          <h1 className="text-2xl font-bold text-white">Terms & Conditions</h1>
        </div>
      </div>

      <div className="bg-[#11111a] rounded-3xl border border-[#2d2d3f] p-8 md:p-12 shadow-2xl overflow-hidden relative">
        <div className="prose prose-invert prose-sm max-w-none text-slate-400 leading-relaxed space-y-8">
          <div>
            <h2 className="text-lg font-bold text-slate-100 mb-2">AcuSeek Ramadan Challenge – Terms & Conditions</h2>
            <div className="h-1 w-20 bg-blue-500 rounded-full mb-6"></div>
          </div>

          <section>
            <h3 className="text-slate-200 font-bold mb-3">1. Campaign Overview</h3>
            <p>The AcuSeek Ramadan Challenge (“the Campaign”) is a promotional demonstration campaign designed to illustrate the concept of AcuSeek’s search-by-description functionality using simulated content. Participation in the Campaign is voluntary and free of charge.</p>
          </section>

          <section>
            <h3 className="text-slate-200 font-bold mb-3">2. Demo Nature & Capability Disclaimer</h3>
            <p>This Campaign is conducted in a simulated demo environment and does not represent a live AcuSeek system.</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>All images, search results, scores, and matches shown during the Campaign are simulated and for demonstration purposes only.</li>
              <li>Ramadan-themed examples are used solely as a visual storytelling theme.</li>
              <li>AcuSeek retrieves video moments based on detectable visual elements and events (such as objects, scenes, or actions), not cultural, religious, or seasonal concepts.</li>
              <li>The actual performance, features, and searchable content of AcuSeek depend on deployed devices, system configuration, and available video data in real-world installations.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-slate-200 font-bold mb-3">3. Eligibility</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>The Campaign is open exclusively to participants located in the Middle East and Africa (MEA).</li>
              <li>Participants must be 18 years of age or older at the time of participation.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-slate-200 font-bold mb-3">4. Campaign Period</h3>
            <p>The Campaign will run during the period of Ramadan 2026. Entries submitted outside the Campaign period will not be considered.</p>
          </section>

          <section>
            <h3 className="text-slate-200 font-bold mb-3">5. How to Participate</h3>
            <p>Participants may take part in the Campaign by interacting with the AcuSeek demo interface and submitting search queries in accordance with the instructions provided on the Campaign page. Only entries submitted through the official Campaign interface during the Campaign period will be valid.</p>
          </section>

          <section>
            <h3 className="text-slate-200 font-bold mb-3">6. Evaluation & Results</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Participation outcomes, including displayed scores, matches, rankings, or feedback, are illustrative only and generated within the demo environment.</li>
              <li>Demo results do not represent real system accuracy, benchmarking, or performance metrics.</li>
              <li>All Campaign-related decisions are final.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-slate-200 font-bold mb-3">7. Prizes</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Any prizes offered as part of the Campaign are promotional in nature and have no cash alternative, unless explicitly stated otherwise.</li>
              <li>Prizes are non-transferable and subject to availability.</li>
              <li>Hikvision reserves the right to substitute prizes with alternatives of equal value if necessary.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-slate-200 font-bold mb-3">8. Data Usage & Privacy</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>No real surveillance footage or personal data is used in this Campaign.</li>
              <li>Search queries submitted during the Campaign may be collected in aggregated and anonymized form for Campaign analysis, reporting, or marketing insights.</li>
              <li>By participating, users consent to this limited and anonymized data usage.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-slate-200 font-bold mb-3">9. Intellectual Property</h3>
            <p>All Campaign materials, including demo interfaces, visuals, text, and branding elements, are the property of their respective owners and are protected by applicable intellectual property laws. Participants may not copy, reproduce, distribute, or use Campaign materials for commercial purposes without prior written permission.</p>
          </section>

          <section>
            <h3 className="text-slate-200 font-bold mb-3">10. Limitation of Liability</h3>
            <p>The organizer shall not be liable for:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Any misunderstanding or misinterpretation of AcuSeek capabilities based on the demo</li>
              <li>Technical interruptions, delays, or access issues</li>
              <li>Any direct or indirect losses arising from participation in the Campaign</li>
            </ul>
            <p className="mt-2">Participation is at the participant’s own discretion and risk.</p>
          </section>

          <section>
            <h3 className="text-slate-200 font-bold mb-3">11. Modification, Suspension & Disqualification</h3>
            <p>The organizer reserves the right to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Modify these Terms & Conditions at any time</li>
              <li>Suspend, extend, or terminate the Campaign without prior notice</li>
              <li>Disqualify any participant who misuses the Campaign, attempts to manipulate results, or violates these Terms & Conditions</li>
            </ul>
          </section>

          <section>
            <h3 className="text-slate-200 font-bold mb-3">12. Governing Law</h3>
            <p>These Terms & Conditions shall be governed by and interpreted in accordance with applicable local laws and regulations.</p>
          </section>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#2d2d3f] flex justify-center">
           <button 
             onClick={onBack}
             className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-blue-900/20"
           >
             Back to Challenge
           </button>
        </div>
      </div>
    </div>
  );
};

export default TermsTab;