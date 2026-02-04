import React from 'react';
import { Send, Youtube } from 'lucide-react';
import { Page } from './types';

export const Footer = ({ setPage }: { setPage: (p: Page) => void }) => (
  <footer className="bg-stone-900 text-stone-400 py-16 px-6 border-t border-stone-800">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1">
        <h2 className="text-2xl font-serif text-stone-100 mb-4 tracking-wide">ቻLu Assefa</h2>
        <p className="text-sm leading-relaxed mb-6 opacity-80">Psychologist | Thinker | Author <br/> Based in Addis Ababa, Ethiopia</p>
      </div>
      <div>
        <h3 className="text-stone-100 font-bold mb-4 uppercase tracking-wider text-xs">Explore</h3>
        <ul className="space-y-2 text-sm">
          <li><button onClick={() => setPage('home')} className="hover:text-brand-300 transition-colors">Home</button></li>
          <li><button onClick={() => setPage('about')} className="hover:text-brand-300 transition-colors">About</button></li>
          <li><button onClick={() => setPage('resources')} className="hover:text-brand-300 transition-colors">Resources</button></li>
          <li><button onClick={() => setPage('services')} className="hover:text-brand-300 transition-colors">Services</button></li>
        </ul>
      </div>
      <div>
        <h3 className="text-stone-100 font-bold mb-4 uppercase tracking-wider text-xs">Contact</h3>
        <ul className="space-y-2 text-sm"><li>0932229193</li><li>ChaluAssefa@outlook.com</li><li>Addis Ababa, Ethiopia</li></ul>
      </div>
      <div>
        <h3 className="text-stone-100 font-bold mb-4 uppercase tracking-wider text-xs">Stay Updated</h3>
        <div className="flex gap-2"><input type="email" placeholder="Your email" className="bg-stone-800 border-none rounded-lg px-3 py-2 text-sm w-full outline-none" /><button className="bg-brand-600 hover:bg-brand-500 text-white rounded-lg px-4 py-2 text-sm font-bold transition-colors">Join</button></div>
        <div className="flex gap-4 mt-6">
          <a href="https://t.me/chaluAssefa" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-brand-300 transition-colors"><Send className="w-5 h-5" /></a>
          <a href="https://youtube.com/@chaluassefa?si=uLu-" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-brand-300 transition-colors"><Youtube className="w-5 h-5" /></a>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-800 text-xs text-stone-500 text-center">
      <div>&copy; {new Date().getFullYear()} ቻLu Assefa Psychology. All rights reserved.</div>
      <div className="mt-4 text-stone-600 text-[10px] font-black uppercase tracking-[0.2em]">
        Website made by <a href="https://t.me/utoptechnology" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-brand-300 underline decoration-stone-800/50 transition-colors">Utop technology</a>
      </div>
    </div>
  </footer>
);