
import React from 'react';
import { X, Download } from 'lucide-react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '',
  type = 'button'
}: { 
  children?: React.ReactNode; 
  variant?: 'primary' | 'outline' | 'text' | 'danger' | 'accent'; 
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}) => {
  const baseStyle = "px-6 py-3 rounded-lg transition-all duration-300 font-medium tracking-wide flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap";
  const variants = {
    primary: "bg-brand-600 text-white hover:bg-brand-700 border border-transparent",
    accent: "bg-accent-600 text-white hover:bg-accent-700 border border-transparent",
    outline: "border-2 border-brand-600 text-brand-700 hover:bg-brand-50",
    text: "text-brand-700 hover:text-brand-800 underline-offset-4 hover:underline p-0 shadow-none hover:shadow-none",
    danger: "bg-red-600 text-white hover:bg-red-700 border border-transparent"
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
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
    1: "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight",
    2: "text-3xl md:text-4xl font-semibold mb-8 text-brand-800 tracking-tight",
    3: "text-xl md:text-2xl font-medium mb-4 text-brand-700"
  };
  
  const Tag = `h${level}` as React.ElementType;
  
  return <Tag className={`${styles[level]} ${className}`}>{children}</Tag>;
};

export const SubscribeModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="bg-brand-50 p-8 text-center border-b border-brand-100">
          <div className="w-16 h-16 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Download className="w-8 h-8" strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-serif font-bold text-brand-900 mb-2">Free Resources</h3>
          <p className="text-stone-600 text-sm">
            Subscribe to get free PDF books, exclusive psychological insights, and updates on new classes directly to your inbox.
          </p>
        </div>

        <div className="p-8">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Name</label>
              <input type="text" placeholder="Your Name" className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Email</label>
              <input type="email" placeholder="your@email.com" className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500" />
            </div>
            <button type="submit" className="w-full bg-brand-600 text-white font-bold py-3 rounded-lg hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200">
              Get Free Access
            </button>
            <p className="text-center text-xs text-stone-400 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
