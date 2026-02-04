import React from 'react';
import { ArrowLeft, Phone, Star, CheckCircle, Users, Send } from 'lucide-react';
import { Page } from './types';
import { Button, Section, Heading } from './Common';

export const ServicesPage = ({ setPage }: { setPage: (p: Page) => void }) => (
  <div className="fade-in">
    <div className="bg-stone-100 py-20 px-6 border-b border-stone-200 relative">
      <button onClick={() => setPage('home')} className="absolute top-8 left-6 md:left-12 z-20 text-stone-500 hover:text-brand-600 flex items-center gap-2 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </button>
      <div className="max-w-4xl mx-auto text-center mt-6">
        <span className="text-accent-600 font-bold tracking-wider text-xs uppercase mb-3 block">Professional Care</span>
        <Heading level={1} className="text-stone-900 mb-4">Clinical Services</Heading>
        <p className="text-stone-600 text-lg max-w-2xl mx-auto">Professional support tailored to your unique history, challenges, and goals for growth.</p>
      </div>
    </div>

    <Section>
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Private Phone Counseling Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100 flex flex-col md:flex-row min-h-[400px]">
            <div className="md:w-2/5 bg-brand-800 text-white p-10 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-brand-700 rounded-full opacity-50"></div>
                <div className="relative z-10">
                    <div className="w-14 h-14 bg-brand-700 rounded-xl flex items-center justify-center mb-6 shadow-inner"><Phone className="w-7 h-7 text-accent-300" strokeWidth={1.5} /></div>
                    <h3 className="text-3xl font-serif font-bold mb-2">Private Phone Counseling</h3>
                    <p className="text-brand-200 mb-8 font-medium">Direct, confidential, and professional support from anywhere.</p>
                </div>
                <div className="relative z-10">
                  <div className="text-xl font-bold mb-2 text-stone-300">Contact: 0932229193</div>
                  <div className="text-4xl font-black mb-1 text-accent-200">1,980 ETB</div>
                  <div className="text-brand-300 text-xs font-black uppercase tracking-widest">per session</div>
                </div>
            </div>
            <div className="md:w-3/5 p-10 flex flex-col justify-center">
                 <h4 className="font-black text-stone-800 mb-4 flex items-center gap-2 uppercase tracking-tighter"><Star className="w-5 h-5 text-accent-500 fill-current" /> Premium Support</h4>
                 <p className="text-stone-600 mb-8 leading-relaxed font-medium">You can book a private phone counseling session with ቻLu. This service is designed for those seeking immediate, professional guidance on personal matters, anxiety, relationships, or self-discovery.</p>
                 <div className="grid sm:grid-cols-2 gap-y-4 gap-x-6 mb-10">
                    <div className="flex items-center gap-3 text-sm text-stone-700 font-bold"><CheckCircle className="w-5 h-5 text-brand-500" /> <span>Confidential & Secure</span></div>
                    <div className="flex items-center gap-3 text-sm text-stone-700 font-bold"><CheckCircle className="w-5 h-5 text-brand-500" /> <span>Flexible Scheduling</span></div>
                    <div className="flex items-center gap-3 text-sm text-stone-700 font-bold"><CheckCircle className="w-5 h-5 text-brand-500" /> <span>1-on-1 Attention</span></div>
                    <div className="flex items-center gap-3 text-sm text-stone-700 font-bold"><CheckCircle className="w-5 h-5 text-brand-500" /> <span>Direct Support</span></div>
                 </div>
                 
                 <div className="flex flex-col sm:flex-row gap-4">
                   <a href="tel:0932229193" className="flex-1 bg-accent-600 text-white font-black text-xs uppercase tracking-widest py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-accent-700 transition-all shadow-lg active:scale-95">
                     <Phone className="w-4 h-4" /> Call 0932229193
                   </a>
                   <a href="https://t.me/Chalu_MailBot" target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#229ED9] text-white font-black text-xs uppercase tracking-widest py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-[#1d8dbf] transition-all shadow-lg active:scale-95">
                     <Send className="w-4 h-4" /> Text us on Telegram
                   </a>
                 </div>
            </div>
        </div>

        {/* Free Classes Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100 flex flex-col md:flex-row min-h-[400px]">
            <div className="md:w-2/5 bg-[#229ED9] text-white p-10 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-sky-400 rounded-full opacity-30"></div>
                <div className="relative z-10">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-6">
                      <Send className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-3xl font-serif font-bold mb-2">Free Psychology Classes</h3>
                    <p className="text-sky-50 mb-8 font-medium">Access high-quality psychological education at no cost.</p>
                </div>
                <div className="relative z-10">
                  <div className="text-4xl font-black mb-1 text-white uppercase tracking-tighter">Community</div>
                  <div className="text-sky-100 text-xs font-black uppercase tracking-widest">Join 5,000+ members</div>
                </div>
            </div>
            <div className="md:w-3/5 p-10 flex flex-col justify-center">
                 <h4 className="font-black text-stone-800 mb-4 flex items-center gap-2 uppercase tracking-tighter"><Users className="w-5 h-5 text-[#229ED9]" /> Public Education</h4>
                 <p className="text-stone-600 mb-8 leading-relaxed font-medium">Join ቻLu's psychology community on Telegram. We believe in making mental health knowledge accessible to everyone through free educational resources, digital handbooks, and community-led discussions.</p>
                 <div className="grid sm:grid-cols-2 gap-y-4 gap-x-6 mb-10">
                    <div className="flex items-center gap-3 text-sm text-stone-700 font-bold"><CheckCircle className="w-5 h-5 text-emerald-500" /> <span>Free PDF Handbooks</span></div>
                    <div className="flex items-center gap-3 text-sm text-stone-700 font-bold"><CheckCircle className="w-5 h-5 text-emerald-500" /> <span>Psychological Exercises</span></div>
                    <div className="flex items-center gap-3 text-sm text-stone-700 font-bold"><CheckCircle className="w-5 h-5 text-emerald-500" /> <span>Direct Resource Access</span></div>
                    <div className="flex items-center gap-3 text-sm text-stone-700 font-bold"><CheckCircle className="w-5 h-5 text-emerald-500" /> <span>Community Support</span></div>
                 </div>
                 <Button 
                   variant="primary" 
                   onClick={() => window.open('https://t.me/chaluAssefa', '_blank')} 
                   className="w-full md:w-auto bg-[#229ED9] hover:bg-[#1d8dbf] border-none py-4 px-10 rounded-xl font-black uppercase tracking-widest text-[11px]"
                 >
                   Get for free
                 </Button>
            </div>
        </div>
      </div>
    </Section>
  </div>
);
