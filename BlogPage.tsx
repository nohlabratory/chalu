
import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  ArrowRightCircle, 
  Sparkles, 
  Search, 
  Filter, 
  SortAsc, 
  Clock, 
  ChevronDown,
  X
} from 'lucide-react';
import { BlogPost, Page } from './types';
import { Section, Heading, Button } from './Common';

interface BlogPageProps {
  blogs: BlogPost[];
  selectedBlog: BlogPost | null;
  setSelectedBlog: (blog: BlogPost | null) => void;
  setPage: (page: Page) => void;
}

type SortOption = 'newest' | 'oldest' | 'az' | 'za';

export const BlogPage = ({ blogs, selectedBlog, setSelectedBlog, setPage }: BlogPageProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Derive unique categories from available blogs
  const categories = useMemo(() => {
    const cats = new Set(blogs.map(b => b.category));
    return ['All', ...Array.from(cats)].sort();
  }, [blogs]);

  // Filter and Sort Logic
  const processedBlogs = useMemo(() => {
    let result = [...blogs];

    // Search Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(b => 
        b.title.toLowerCase().includes(query) || 
        b.excerpt.toLowerCase().includes(query) ||
        b.category.toLowerCase().includes(query)
      );
    }

    // Category Filter
    if (activeCategory !== 'All') {
      result = result.filter(b => b.category === activeCategory);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'az':
          return a.title.localeCompare(b.title);
        case 'za':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return result;
  }, [blogs, searchQuery, activeCategory, sortBy]);

  const getSortLabel = (val: SortOption) => {
    const labels = {
      newest: 'Newest First',
      oldest: 'Oldest First',
      az: 'Alphabetical (A-Z)',
      za: 'Alphabetical (Z-A)'
    };
    return labels[val];
  };

  if (selectedBlog) {
    return (
      <div className="fade-in bg-white min-h-screen pb-20">
        <div className="max-w-4xl mx-auto px-6 pt-12">
          <button 
            onClick={() => setSelectedBlog(null)} 
            className="flex items-center gap-2 text-stone-600 font-bold hover:text-brand-950 transition-colors mb-12 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Library
          </button>

          <article>
            <div className="mb-12">
              <span className="text-accent-700 font-black uppercase tracking-[0.3em] text-xs mb-4 block">
                {selectedBlog.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-black text-brand-950 mb-6 leading-tight">
                {selectedBlog.title}
              </h1>
              <div className="flex items-center gap-6 text-stone-800 text-xs font-black uppercase tracking-widest border-y border-stone-100 py-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-600" /> {selectedBlog.date}
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-brand-600" /> ቻLu Assefa
                </div>
              </div>
            </div>

            {selectedBlog.imageUrl && (
              <div className="mb-16 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white ring-1 ring-stone-50">
                <img src={selectedBlog.imageUrl} alt={selectedBlog.title} className="w-full h-auto" />
              </div>
            )}

            <div className={`prose prose-stone max-w-none text-xl leading-[2.1] text-brand-950 ${selectedBlog.fontFamily || 'font-serif'} whitespace-pre-wrap`}>
              {selectedBlog.content}
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in bg-[#fdfaf6] min-h-screen pb-24">
      <Section className="text-center pt-20 pb-12 bg-stone-50/50">
        <span className="text-accent-700 font-black uppercase tracking-[0.4em] text-xs mb-4 block">The Thinker's Archive</span>
        <Heading level={1} className="text-brand-950">Publications & Essays</Heading>
        <p className="text-stone-700 max-w-xl mx-auto font-serif italic text-lg font-medium leading-relaxed">
          A collection of deep psychological insights, philosophical reflections, and specialized research notes.
        </p>
      </Section>

      {/* Filter & Search Bar */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 mb-16 relative z-10">
        <div className="bg-white rounded-[2rem] shadow-glow border border-brand-100 p-3 md:p-4 flex flex-col lg:flex-row items-stretch lg:items-center gap-5">
          
          {/* Search Input */}
          <div className="relative flex-grow group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-brand-400 group-focus-within:text-brand-600 transition-colors" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, insight, or topic..."
              className="w-full bg-stone-50/50 border border-stone-100 rounded-2xl py-5 pl-16 pr-8 text-sm font-bold text-brand-950 focus:bg-white focus:border-brand-200 focus:ring-4 focus:ring-brand-50 outline-none transition-all placeholder:text-stone-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-6 flex items-center text-stone-400 hover:text-brand-950"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="h-px lg:h-10 w-full lg:w-px bg-stone-100 mx-2 hidden lg:block"></div>

          {/* Category Scroller */}
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide px-2 py-1 max-w-full lg:max-w-[450px]">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? 'bg-brand-900 text-white shadow-lg scale-105' 
                    : 'bg-white text-stone-500 hover:bg-brand-50 hover:text-brand-900 border border-stone-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="h-px lg:h-10 w-full lg:w-px bg-stone-100 mx-2 hidden lg:block"></div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="w-full lg:w-[250px] flex items-center justify-between gap-4 bg-stone-50/50 hover:bg-white border border-stone-100 px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-brand-900 transition-all shadow-sm"
            >
              <div className="flex items-center gap-2">
                <SortAsc className="w-5 h-5 text-accent-600" />
                <span>{getSortLabel(sortBy)}</span>
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>

            {isSortOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)}></div>
                <div className="absolute top-full mt-3 right-0 left-0 lg:right-auto lg:w-[250px] bg-white rounded-3xl shadow-2xl border border-stone-100 p-3 z-20 animate-in fade-in slide-in-from-top-4">
                  {(['newest', 'oldest', 'az', 'za'] as SortOption[]).map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setSortBy(opt); setIsSortOpen(false); }}
                      className={`w-full text-left px-5 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-between ${
                        sortBy === opt ? 'bg-brand-900 text-white' : 'text-stone-600 hover:bg-brand-50 hover:text-brand-900'
                      }`}
                    >
                      {getSortLabel(opt)}
                      {sortBy === opt && <div className="w-2 h-2 rounded-full bg-accent-400"></div>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Section className="pt-0">
        {processedBlogs.length === 0 ? (
          <div className="text-center py-40 bg-white rounded-[4rem] border border-brand-100 shadow-soft">
            <Sparkles className="w-20 h-20 text-stone-200 mx-auto mb-8" />
            <h3 className="text-3xl font-serif font-black text-brand-950 mb-3">No matching publications</h3>
            <p className="text-stone-500 font-serif italic text-xl max-w-sm mx-auto">
              {searchQuery ? `We couldn't find anything matching "${searchQuery}".` : "This part of the archive is currently under development."}
            </p>
            {(searchQuery || activeCategory !== 'All') && (
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="mt-10 text-xs font-black uppercase tracking-widest text-accent-700 hover:text-brand-900 underline underline-offset-8"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {processedBlogs.map(blog => (
              <div 
                key={blog.id} 
                className="group bg-white rounded-[3rem] border border-stone-100 overflow-hidden shadow-soft hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 flex flex-col"
              >
                <div className="aspect-[16/10] relative overflow-hidden bg-stone-50">
                  {blog.imageUrl ? (
                    <img src={blog.imageUrl} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" alt={blog.title} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-100 font-serif text-4xl font-bold">ቻL</div>
                  )}
                  <div className="absolute top-8 left-8">
                    <span className="bg-brand-900 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                      {blog.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-12 flex flex-col flex-grow">
                  <div className="text-[11px] text-accent-700 font-black uppercase tracking-[0.2em] mb-5 border-b-2 border-accent-50 pb-2 w-fit">{blog.date}</div>
                  <h3 className="text-2xl md:text-3xl font-serif font-black text-brand-950 mb-6 group-hover:text-brand-600 transition-colors leading-tight line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className={`text-stone-600 text-base leading-relaxed mb-10 line-clamp-3 font-bold ${blog.fontFamily || 'font-sans'}`}>
                    {blog.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-10 border-t border-stone-50 flex items-center justify-between">
                    <button 
                      onClick={() => setSelectedBlog(blog)}
                      className="text-sm font-black uppercase tracking-widest text-brand-900 flex items-center gap-3 hover:text-accent-700 transition-colors group/link"
                    >
                      Read Publication <ArrowRightCircle className="w-6 h-6 group-hover/link:translate-x-2 transition-transform text-accent-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
};
