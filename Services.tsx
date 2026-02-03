
import React from 'react';
import { ArrowLeft, Phone, Star, CheckCircle, Users, Clock, Lightbulb, Brain } from 'lucide-react';
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
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100 mb-16 flex flex-col md:flex-row">
            <div className="md:w-2/5 bg-brand-800 text-white p-10 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-brand-700 rounded-full opacity-50"></div>
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-brand-700 rounded-lg flex items-center justify-center mb-6"><Phone className="w-6 h-6 text-accent-300" strokeWidth={1.5} /></div>
                    <h3 className="text-3xl font-serif font-bold mb-2">Private Phone Counseling</h3>
                    <p className="text-brand-200 mb-8">Direct, confidential, and professional support from anywhere.</p>
                </div>
                <div className="relative z-10"><div className="text-4xl font-bold mb-1 text-accent-200">1,980 ETB</div><div className="text-brand-300 text-sm">per session</div></div>
            </div>
            <div className="md:w-3/5 p-10">
                 <h4 className="font-bold text-stone-800 mb-4 flex items-center gap-2"><Star className="w-5 h-5 text-accent-500 fill-current" /> Premium Support</h4>
                 <p className="text-stone-600 mb-8 leading-relaxed">You can book a private phone counseling session with ቻLu. This service is designed for those seeking immediate, professional guidance on personal matters, anxiety, relationships, or self-discovery.</p>
                 <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3 text-sm text-stone-700"><CheckCircle className="w-5 h-5 text-brand-500" /> <span>Confidential & Secure</span></div>
                    <div className="flex items-center gap-3 text-sm text-stone-700"><CheckCircle className="w-5 h-5 text-brand-500" /> <span>Flexible Scheduling</span></div>
                    <div className="flex items-center gap-3 text-sm text-stone-700"><CheckCircle className="w-5 h-5 text-brand-500" /> <span>1-on-1 Attention</span></div>
                    <div className="flex items-center gap-3 text-sm text-stone-700"><CheckCircle className="w-5 h-5 text-brand-500" /> <span>Payment Confirmation Required</span></div>
                 </div>
                 <Button variant="accent" onClick={() => setPage('contact')} className="w-full md:w-auto">Book Appointment Now</Button>
            </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl border border-stone-200 hover:border-accent-300 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center mb-6 text-stone-600 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors"><Users className="w-6 h-6" strokeWidth={1.5} /></div>
                <h3 className="text-2xl font-serif font-bold text-stone-800 mb-3">Group Sessions</h3>
                <div className="flex items-center gap-2 text-sm text-stone-500 mb-4"><Clock className="w-4 h-4" /> 90 Minutes</div>
                <p className="text-stone-600 mb-6">Small, facilitated groups focused on shared experiences such as grief, social anxiety, or mindfulness practice.</p>
                <Button variant="outline" onClick={() => setPage('contact')} className="w-full">Inquire About Groups</Button>
            </div>
            <div className="bg-white p-8 rounded-xl border border-stone-200 hover:border-accent-300 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center mb-6 text-stone-600 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors"><Lightbulb className="w-6 h-6" strokeWidth={1.5} /></div>
                <h3 className="text-2xl font-serif font-bold text-stone-800 mb-3">Evaluation Tools</h3>
                <div className="flex items-center gap-2 text-sm text-stone-500 mb-4"><Brain className="w-4 h-4" /> Self-Reflection</div>
                <p className="text-stone-600 mb-6">Access various tools for psychological evaluation and self-reflection to help you better understand your personality structure.</p>
                <Button variant="outline" onClick={() => setPage('contact')} className="w-full">Request Info</Button>
            </div>
        </div>
      </div>
    </Section>
  </div>
);
