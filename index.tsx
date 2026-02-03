import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Page, BlogPost } from './types';
import { SubscribeModal } from './Common';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { HomePage } from './Home';
import { AboutPage } from './About';
import { ClassesPage } from './Classes';
import { ServicesPage } from './Services';
import { ResourcesPage } from './Resources';
import { ContactPage } from './Contact';
import { AdminPage } from './AdminPanel';
import { getDBBlogs } from './db';

const App = () => {
  const [page, setPage] = useState<Page>('home');
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Persistence: Load blogs from Upstash on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await getDBBlogs();
      setBlogs(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSubscribe(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-accent-200 selection:text-brand-900 relative">
      <Navbar 
        page={page} 
        setPage={setPage} 
      />
      
      <main className="flex-grow pt-20">
        {page === 'home' && <HomePage setPage={setPage} blogs={blogs} />}
        {page === 'about' && <AboutPage setPage={setPage} />}
        {page === 'classes' && <ClassesPage setPage={setPage} />}
        {page === 'services' && <ServicesPage setPage={setPage} />}
        {page === 'resources' && <ResourcesPage setPage={setPage} />}
        {page === 'contact' && <ContactPage setPage={setPage} />}
        {page === 'admin' && <AdminPage setPage={setPage} blogs={blogs} setBlogs={setBlogs} />}
      </main>

      <Footer setPage={setPage} />
      
      <SubscribeModal isOpen={showSubscribe} onClose={() => setShowSubscribe(false)} />
      
      {isLoading && page !== 'admin' && (
        <div className="fixed bottom-8 right-8 bg-white/80 backdrop-blur shadow-lg rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-brand-600 flex items-center gap-2 z-40">
          <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
          Syncing Database...
        </div>
      )}
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}