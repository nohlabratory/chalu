
import React from 'react';
import { ArrowLeft, Video, BookOpen, Send } from 'lucide-react';
import { Page } from './types';
import { Section, Heading } from './Common';

export const ResourcesPage = ({ setPage }: { setPage: (p: Page) => void }) => (
  <div className="fade-in">
    <Section className="bg-brand-50 text-center relative">
        <button onClick={() => setPage('home')} className="absolute top-6 left-6 flex items-center gap-2 text-stone-500 hover:text-brand-600 transition-colors"><ArrowLeft className="w-4 h-4" /> Back to Home</button>
        <Heading level={1}>Resources & Insights</Heading>
        <p className="text-stone-600 max-w-2xl mx-auto">Books, classes, videos, and articles to support your mental health journey.</p>
    </Section>
    <Section className="bg-stone-900 text-white">
        <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            <div>
                <h2 className="text-3xl font-serif font-bold mb-2 flex items-center gap-3">
                    <div className="w-12 h-8 bg-red-600 rounded-lg flex items-center justify-center"><div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div></div> ቻLu's YouTube
                </h2>
                <p className="text-stone-300 text-lg max-w-xl">You can enjoy High Class Psychology Education for Free on My YouTube channel.</p>
            </div>
            <a href="https://youtube.com/@chaluassefa?si=uLu-" target="_blank" rel="noopener noreferrer" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-md font-bold transition-all shadow-lg flex items-center gap-2"><Video className="w-5 h-5" /> Watch Now</a>
        </div>
    </Section>
    <Section className="bg-white">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-brand-800 mb-8 border-b border-stone-100 pb-4 flex items-center gap-2"><BookOpen className="w-6 h-6 text-accent-600" /> Free Books</h2>
            <div className="grid md:grid-cols-1 gap-8">
                <div className="bg-brand-50/50 border border-brand-100 rounded-xl p-8 flex flex-col sm:flex-row gap-8 items-start shadow-sm hover:shadow-md transition-shadow group">
                    <div className="w-full sm:w-1/3 aspect-[2/3] bg-stone-300 rounded shadow-md overflow-hidden shrink-0"><img src="https://staticfile-7bdbd.wasmer.app/images/book.jpg" alt="ምን ሆኜ ነበር?" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                    <div>
                    <h3 className="text-2xl font-bold text-brand-900 mb-2">ምን ሆኜ ነበር?</h3>
                    <span className="inline-block bg-accent-100 text-accent-800 text-xs font-bold px-3 py-1 rounded-full mb-4">Psychological Guide</span>
                    <p className="text-stone-700 text-base leading-relaxed mb-8 font-serif">ስላለፈው የህይወት ታሪክዎ ፍንትው ያለ ገፅታ የሚያገኙበት ፣ ከኋላ ታሪክዎ ጋር የሚታረቁበት።</p>
                    <a href="https://t.me/ChaluAssefa" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#229ED9] hover:bg-[#1d8dbf] text-white px-6 py-3 rounded-lg font-bold transition-all shadow-md hover:shadow-lg"><Send className="w-5 h-5" /> Download on Telegram</a>
                    </div>
                </div>
                <div className="bg-brand-50/50 border border-brand-100 rounded-xl p-8 flex flex-col sm:flex-row gap-8 items-start shadow-sm hover:shadow-md transition-shadow group">
                    <div className="w-full sm:w-1/3 aspect-[2/3] bg-brand-800 rounded shadow-md overflow-hidden shrink-0 flex items-center justify-center text-brand-200 relative"><img src="https://staticfile-7bdbd.wasmer.app/images/book2.jpg" alt="Personality Psychology Handbook" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                    <div>
                    <h3 className="text-2xl font-bold text-brand-900 mb-2">Personality Psychology Handbook (by ቻLu)</h3>
                    <span className="inline-block bg-accent-100 text-accent-800 text-xs font-bold px-3 py-1 rounded-full mb-4">Psychological Guide</span>
                    <p className="text-stone-700 text-base leading-relaxed mb-8 font-serif">This handbook reveals the hidden structures shaping your thoughts, emotions, and choices.</p>
                    <a href="https://t.me/ChaluAssefa/154" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#229ED9] hover:bg-[#1d8dbf] text-white px-6 py-3 rounded-lg font-bold transition-all shadow-md hover:shadow-lg"><Send className="w-5 h-5" /> Download for free</a>
                    </div>
                </div>
            </div>
        </div>
    </Section>
  </div>
);
