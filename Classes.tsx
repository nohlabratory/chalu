
import React from 'react';
import { ArrowLeft, Users, Send, ArrowRight, Layers, Brain, Shield, Compass } from 'lucide-react';
import { Page } from './types';
import { Section, Heading } from './Common';

const CourseCard = ({ title, description, price, level = "Class", icon: Icon, recommended = false }: { title: string; description: string; price: string; level?: string; icon: any; recommended?: boolean; }) => (
    <div className={`group relative bg-white rounded-2xl p-1 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-full ${recommended ? 'ring-2 ring-accent-400 shadow-lg' : 'shadow-soft border border-stone-100'}`}>
        {recommended && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest z-20 shadow-md">Most Popular</div>}
        <div className="bg-white rounded-xl p-6 flex flex-col h-full relative overflow-hidden z-10">
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full -mr-10 -mt-10 transition-colors duration-500 ${recommended ? 'bg-accent-50' : 'bg-stone-50 group-hover:bg-brand-50'}`}></div>
            <div className="relative z-10 mb-6 flex justify-between items-start">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-300 ${recommended ? 'bg-accent-100 text-accent-700' : 'bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white'}`}><Icon className="w-7 h-7" strokeWidth={1.5} /></div>
                <div className="text-right"><span className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">{level}</span></div>
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-800 mb-3 group-hover:text-brand-700 transition-colors">{title}</h3>
            <p className="text-stone-600 text-sm leading-relaxed mb-8 flex-grow">{description}</p>
            <div className="pt-6 border-t border-stone-100">
                <div className="flex items-end justify-between mb-4"><span className="text-sm text-stone-400">Tuition</span><span className="text-2xl font-bold text-brand-900">{price}</span></div>
                <button className={`w-full py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${recommended ? 'bg-accent-600 text-white hover:bg-accent-700 shadow-md' : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-800'}`}>View Details <ArrowRight className="w-4 h-4" /></button>
            </div>
        </div>
    </div>
);

export const ClassesPage = ({ setPage }: { setPage: (p: Page) => void }) => (
  <div className="fade-in bg-stone-50">
    <div className="bg-[#1c2423] text-white py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-800 via-stone-900 to-transparent"></div>
      <button onClick={() => setPage('home')} className="absolute top-8 left-6 md:left-12 z-20 text-white/60 hover:text-white flex items-center gap-2 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </button>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="inline-block py-1 px-3 rounded-full bg-brand-900/50 border border-brand-800 text-accent-300 text-xs font-bold uppercase tracking-widest mb-6">Educational Programs</span>
        <Heading level={1} className="text-white mb-6">School of Psychology</Heading>
        <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">Deep, structured learning environments designed to help you understand the complexities of human behavior, personality, and the psyche.</p>
      </div>
    </div>

    <Section>
        <div className="relative overflow-hidden bg-white rounded-3xl border border-stone-200 p-8 md:p-12 mb-20 shadow-soft">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-[#229ED9]/10 rounded-full blur-3xl"></div>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 relative z-10">
                <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 text-[#229ED9] font-bold mb-4 bg-blue-50 px-3 py-1 rounded-full text-sm"><Users className="w-4 h-4" /> Community Access</div>
                    <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Join Free Training</h2>
                    <p className="text-stone-600 text-lg leading-relaxed mb-8">Access ቻLu's psychology training, reading materials, and community discussions directly on our Telegram channel.</p>
                    <a href="https://t.me/chaluAssefa" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#229ED9] hover:bg-[#1d8dbf] text-white px-8 py-4 rounded-full font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-1"><Send className="w-5 h-5" /> Join Telegram Channel</a>
                </div>
                <div className="hidden md:flex justify-center flex-1">
                     <div className="bg-white p-6 rounded-2xl shadow-xl border border-stone-100 -rotate-2 hover:rotate-0 transition-transform duration-500">
                        <div className="flex items-center gap-4 mb-4 border-b border-stone-50 pb-4">
                            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-400"><Users className="w-6 h-6" /></div>
                            <div>
                                <div className="font-bold text-stone-800 text-lg">Psychology Today</div>
                                <div className="text-xs text-[#229ED9] font-bold">5,000+ Subscribers</div>
                            </div>
                        </div>
                        <div className="space-y-3 opacity-30"><div className="h-2 w-full bg-stone-400 rounded"></div><div className="h-2 w-3/4 bg-stone-400 rounded"></div><div className="h-2 w-5/6 bg-stone-400 rounded"></div></div>
                     </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-stone-200 pb-4">
           <div><span className="text-brand-600 font-bold tracking-wider text-xs uppercase mb-2 block">Curriculum</span><h2 className="text-3xl font-serif font-bold text-stone-800">Available Classes</h2></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <CourseCard title="Personality Psychology" description="A comprehensive full class diving deep into the structures of personality types and formation." price="9,270 Birr" level="Full Program" icon={Layers} recommended={true} />
            <CourseCard title="Depth Psychology" description="Explore the unconscious mind, dreams, and underlying psychological forces." price="3,700 Birr" level="Advanced" icon={Brain} />
            <CourseCard title="Structural Psychology" description="Understanding the structural components of the human psyche and how they interact." price="3,700 Birr" level="Intermediate" icon={Shield} />
            <CourseCard title="Existential Psychology" description="Confronting the ultimate concerns of life: death, freedom, isolation and meaning." price="3,700 Birr" level="Advanced" icon={Compass} />
        </div>
    </Section>
  </div>
);
