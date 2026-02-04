import React, { useState } from 'react';
import { Download, Loader2, CheckCircle2, ShieldCheck, Phone, X, Send, BookOpen } from 'lucide-react';

// Utility to escape HTML for Telegram API
const escapeHTML = (text: string) => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

export const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '',
  type = 'button',
  disabled = false
}: { 
  children?: React.ReactNode; 
  variant?: 'primary' | 'outline' | 'text' | 'danger' | 'accent'; 
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}) => {
  const baseStyle = "px-6 py-3 rounded-lg transition-all duration-300 font-bold tracking-wide flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100";
  const variants = {
    primary: "bg-brand-900 text-white hover:bg-brand-950 border border-transparent",
    accent: "bg-accent-700 text-white hover:bg-accent-800 border border-transparent",
    outline: "border-2 border-brand-900 text-brand-900 hover:bg-brand-50",
    text: "text-brand-900 hover:text-brand-950 underline-offset-4 hover:underline p-0 shadow-none hover:shadow-none",
    danger: "bg-red-700 text-white hover:bg-red-800 border border-transparent"
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export const Section = ({ 
  children, 
  className = '', 
  id = '' 
}: { 
  children?: React.ReactNode; 
  className?: string; 
  id?: string 
}) => (
  <section id={id} className={`py-20 px-6 md:px-12 lg:px-24 ${className}`}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

export const Heading = ({ 
  children, 
  level = 2, 
  className = '' 
}: { 
  children?: React.ReactNode; 
  level?: 1 | 2 | 3; 
  className?: string 
}) => {
  const styles = {
    1: "text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 tracking-tight text-brand-950",
    2: "text-3xl md:text-4xl font-bold mb-8 text-brand-900 tracking-tight",
    3: "text-xl md:text-2xl font-bold mb-4 text-brand-800"
  };
  
  const Tag = `h${level}` as React.ElementType;
  
  return <Tag className={`${styles[level]} ${className}`}>{children}</Tag>;
};

export const JoinClassesModal = ({ isOpen, onClose, onContinue }: { isOpen: boolean; onClose: () => void; onContinue: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-300 border border-stone-100">
        <button onClick={onClose} className="absolute top-6 right-6 z-20 p-2 text-stone-400 hover:text-brand-950 hover:bg-stone-100 rounded-full transition-all">
          <X className="w-6 h-6" />
        </button>

        <div className="p-10 text-center">
          <div className="w-20 h-20 bg-accent-100 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
            <Sparkles className="w-10 h-10 text-accent-600" />
          </div>
          <h3 className="text-3xl font-serif font-black text-brand-950 mb-4 leading-tight">Start Your Journey</h3>
          <p className="text-stone-600 text-base mb-10 font-bold leading-relaxed px-4">
            Are you ready to enroll in our professional psychology courses? Text us on Telegram to finalize your registration and start learning.
          </p>
          
          <div className="flex flex-col gap-4">
            <a 
              href="https://t.me/Chalu_MailBot" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-[#229ED9] hover:bg-[#1d8dbf] text-white font-black text-sm uppercase tracking-[0.2em] py-5 rounded-2xl transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 active:scale-95"
            >
              <Send className="w-5 h-5" /> Message us on Telegram
            </a>
            <button 
              onClick={onClose}
              className="w-full py-4 text-[10px] font-black text-stone-400 hover:text-brand-950 uppercase tracking-[0.3em] transition-colors"
            >
              I'll do it later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SubscribeModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+251'
  });

  if (!isOpen) return null;

  const validatePhone = (phone: string) => {
    // Regex: Starts with +251, followed by 9 or 7, then exactly 7 digits.
    const etPhoneRegex = /^\+251[79]\d{7}$/;
    return etPhoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhone(formData.phone)) {
      alert("Invalid Phone Number! Format: +251 followed by 9 or 7 and 7 more digits (e.g. +25191234567).");
      return;
    }

    setLoading(true);

    const botToken = "8490899529:AAE_LM6Vjz4DvRkwfRPu3GirD1JRzULFrnc";
    const chatId = "-1003855671675";
    
    const message = `
#ads
Name: ${escapeHTML(formData.name)}
Email: ${escapeHTML(formData.email)}
Phone: ${escapeHTML(formData.phone)}
    `.trim();

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      });

      const responseData = await response.json();

      if (response.ok && responseData.ok) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setFormData({ name: '', email: '', phone: '+251' });
        }, 2000);
      } else {
        console.error('Telegram Error:', responseData);
        alert(`Telegram Error: ${responseData.description}.`);
      }
    } catch (error: any) {
      console.error('Submission failed:', error);
      alert("Submission failed. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith('+251')) {
      value = '+251';
    }
    const digitsOnly = value.slice(1).replace(/\D/g, '');
    const newValue = '+' + digitsOnly;
    if (newValue.length <= 12) {
      setFormData({ ...formData, phone: newValue });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-300 border border-stone-100">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-brand-950 hover:bg-stone-100 rounded-full transition-all"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="bg-brand-50 p-6 text-center border-b border-brand-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-600"></div>
          <div className="w-14 h-14 bg-white shadow-sm text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-brand-100">
            {success ? (
              <CheckCircle2 className="w-8 h-8 animate-in zoom-in text-emerald-600" />
            ) : (
              <Download className="w-8 h-8" strokeWidth={2.5} />
            )}
          </div>
          <h3 className="text-xl font-serif font-black text-brand-950 mb-1">
            {success ? 'Success' : 'Free Resources'}
          </h3>
          <p className="text-stone-700 text-[11px] leading-relaxed font-bold px-2">
            {success 
              ? 'Access confirmed. Welcome aboard.' 
              : 'Enter details to unlock our psychological library.'}
          </p>
        </div>
        <div className="p-6">
          {success ? (
            <div className="py-6 text-center flex flex-col items-center gap-3">
               <div className="w-10 h-10 border-[4px] border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
               <div className="text-brand-950 font-black uppercase tracking-[0.2em] text-[9px]">Redirecting...</div>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label className="block text-[9px] font-black text-brand-800 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  required 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Abebe Bikila" 
                  className="w-full py-3 px-4 bg-stone-50 border-2 border-stone-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-100 focus:border-brand-900 transition-all text-xs font-black text-brand-950 placeholder:text-stone-400" 
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[9px] font-black text-brand-800 uppercase tracking-widest ml-1">Email</label>
                <input 
                  required 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="abebe@example.com" 
                  className="w-full py-3 px-4 bg-stone-50 border-2 border-stone-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-100 focus:border-brand-900 transition-all text-xs font-black text-brand-950 placeholder:text-stone-400" 
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[9px] font-black text-brand-800 uppercase tracking-widest ml-1">Phone (+251...)</label>
                <div className="relative">
                   <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-brand-400" />
                   <input 
                    required 
                    type="tel" 
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="+251..." 
                    className="w-full py-3 pl-10 pr-4 bg-stone-50 border-2 border-stone-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-100 focus:border-brand-900 transition-all text-xs font-black text-brand-950 placeholder:text-stone-400" 
                  />
                </div>
              </div>
              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-emerald-600 text-white font-black text-[10px] uppercase tracking-[0.2em] py-4 rounded-xl hover:bg-emerald-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 active:scale-95"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> 
                      Sending...
                    </>
                  ) : (
                    <>
                      Access for free
                    </>
                  )}
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 pt-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <p className="text-[8px] font-black text-stone-500 uppercase tracking-[0.1em]">
                  Secure Transmission
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
import { Sparkles } from 'lucide-react';