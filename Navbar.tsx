import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import { Page } from './types';

export const Navbar = ({ 
  page, 
  setPage
}: { 
  page: Page; 
  setPage: (p: Page) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  
  const clickCountRef = useRef(0);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; value: Page }[] = [
    { label: 'Home', value: 'home' },
    { label: 'About', value: 'about' },
    { label: 'Classes', value: 'classes' },
    { label: 'Services', value: 'services' },
    { label: 'Resources', value: 'resources' },
    { label: 'Contact', value: 'contact' },
  ];

  const handleAdminClick = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setPasswordInput('');
    setPasswordError(false);
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "blogpost@9000") {
      setPage('admin');
      setShowPasswordModal(false);
      setIsOpen(false);
      setPasswordError(false);
    } else {
      setPasswordError(true);
      // Brief shake effect or just text error
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
    }
    
    clickCountRef.current += 1;

    if (clickCountRef.current >= 4) {
        clickCountRef.current = 0;
        handleAdminClick();
    } else {
        clickTimeoutRef.current = setTimeout(() => {
            const count = clickCountRef.current;
            clickCountRef.current = 0;
            if (count === 1 && page !== 'home') {
                setPage('home');
            }
        }, 300); 
    }
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            className="text-2xl font-serif font-bold text-brand-800 cursor-pointer select-none tracking-tight p-2 -m-2 select-none hover:text-brand-600 transition-colors" 
            onClick={handleLogoClick}
            role="button"
            tabIndex={0}
            aria-label="ቻLu Assefa Home"
          >
            ቻLu Assefa
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.value}
                type="button"
                onClick={() => setPage(link.value)}
                className={`text-sm font-medium transition-all duration-300 relative ${
                  page === link.value 
                    ? 'text-brand-600' 
                    : 'text-stone-600 hover:text-brand-600'
                }`}
              >
                {link.label}
                {page === link.value && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent-400 rounded-full"></span>
                )}
              </button>
            ))}
            
            <button 
              type="button"
              onClick={handleAdminClick}
              className="text-stone-300 hover:text-brand-600 transition-colors p-2 -mr-2"
              title="Admin Login"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>

          <button 
            type="button"
            className="md:hidden text-stone-600 p-2 -mr-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-stone-100 shadow-xl py-6 px-8 flex flex-col gap-1 animate-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <button
                key={link.value}
                type="button"
                onClick={() => {
                  setPage(link.value);
                  setIsOpen(false);
                }}
                className={`text-left py-4 border-b border-stone-50 font-semibold tracking-wide ${
                  page === link.value ? 'text-brand-600' : 'text-stone-600'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={handleAdminClick}
              className="text-left py-6 mt-2 flex items-center gap-3 text-stone-400 hover:text-brand-600 transition-all border-t border-stone-100 group"
            >
              <div className="p-2 bg-stone-50 rounded-lg group-hover:bg-brand-50 transition-colors">
                <Lock className="w-4 h-4 group-hover:text-brand-600" />
              </div>
              <span className="text-sm font-bold uppercase tracking-[0.2em]">Admin Panel</span>
            </button>
          </div>
        )}
      </nav>

      {/* Custom Password Modal - THIS WILL NOT BE BLOCKED BY BROWSER */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowPasswordModal(false)}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-brand-900 p-6 text-center">
              <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <ShieldCheck className="text-white w-6 h-6" />
              </div>
              <h3 className="text-white font-serif text-xl font-bold">Admin Access</h3>
              <p className="text-brand-300 text-xs uppercase tracking-widest mt-1">Authorized Personnel Only</p>
            </div>
            
            <form onSubmit={handlePasswordSubmit} className="p-8">
              <div className="mb-6">
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Password</label>
                <input 
                  autoFocus
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className={`w-full p-4 bg-stone-50 border-2 rounded-xl focus:outline-none transition-all ${passwordError ? 'border-red-500 animate-shake' : 'border-stone-100 focus:border-accent-400'}`}
                  placeholder="••••••••"
                />
                {passwordError && (
                  <p className="text-red-500 text-[10px] font-bold uppercase mt-2 text-center animate-in fade-in">Incorrect Password. Please try again.</p>
                )}
              </div>
              
              <div className="flex flex-col gap-3">
                <button 
                  type="submit" 
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group"
                >
                  Enter Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="w-full text-stone-400 hover:text-stone-600 text-xs font-bold py-2 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};