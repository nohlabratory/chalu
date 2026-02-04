
import React, { useState, useRef, useEffect } from 'react';
import { 
  PlusCircle, Image as ImageIcon,
  Edit, Trash2, Layers, Save, AlertCircle,
  Upload, Type, Tag, ChevronLeft, Eye, X,
  Type as FontIcon, AlignLeft, Layout, AlertTriangle
} from 'lucide-react';
import { BlogPost, Page } from './types';
import { Button } from './Common';
import { saveDBBlogs } from './db';

const CATEGORIES = [
  "Psychology", "Philosophy", "News", "Research", "Education", 
  "Mental Health", "Relationships", "Culture", "Personal Growth", "Ethics",
  "Neuroscience", "Spirituality", "Sociology"
];

const FONTS = [
  { name: 'Elegant Serif', value: 'font-serif' },
  { name: 'Modern Sans', value: 'font-sans' },
  { name: 'Classic Lato', value: "font-['Lato']" },
  { name: 'Professional Playfair', value: "font-['Playfair_Display']" },
  { name: 'Clean Mono', value: 'font-mono' }
];

export const AdminPage = ({ setPage, blogs, setBlogs }: { 
    setPage: (p: Page) => void, 
    blogs: BlogPost[], 
    setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>> 
}) => {
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'saving' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Psychology',
    customCategory: '',
    imageUrl: '',
    excerpt: '',
    content: '',
    fontFamily: 'font-serif'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (blog: BlogPost) => {
    const isStandardCategory = CATEGORIES.includes(blog.category);
    setFormData({
      title: blog.title,
      category: isStandardCategory ? blog.category : 'Other',
      customCategory: isStandardCategory ? '' : blog.category,
      imageUrl: blog.imageUrl,
      excerpt: blog.excerpt,
      content: blog.content,
      fontFamily: blog.fontFamily || 'font-serif'
    });
    setEditingId(blog.id);
    setActiveTab('create');
  };

  const confirmDelete = async (id: number) => {
    setStatus('saving');
    const updatedBlogs = blogs.filter(b => b.id !== id);
    const success = await saveDBBlogs(updatedBlogs);
    if (success) {
        setBlogs(updatedBlogs);
        setStatus('idle');
    } else {
        setStatus('error');
        alert('Database update failed. Check connection.');
    }
    setDeleteConfirmId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Title and content are required.");
      return;
    }
    
    setStatus('saving');
    const finalCategory = formData.category === 'Other' ? formData.customCategory : formData.category;

    let updatedBlogs: BlogPost[];
    const blogData = {
        title: formData.title,
        category: finalCategory || 'General',
        imageUrl: formData.imageUrl,
        excerpt: formData.excerpt,
        content: formData.content,
        fontFamily: formData.fontFamily,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    if (editingId) {
        updatedBlogs = blogs.map(b => b.id === editingId ? { ...b, ...blogData } : b);
    } else {
        const newBlog: BlogPost = { id: Date.now(), ...blogData };
        updatedBlogs = [newBlog, ...blogs];
    }

    const success = await saveDBBlogs(updatedBlogs);
    if (success) {
        setBlogs(updatedBlogs);
        setFormData({ title: '', category: 'Psychology', customCategory: '', imageUrl: '', excerpt: '', content: '', fontFamily: 'font-serif' });
        setEditingId(null);
        setStatus('idle');
        setActiveTab('manage');
    } else {
        setStatus('error');
        alert('Failed to save to database.');
    }
  };

  return (
    <div className="bg-[#f9f9f8] min-h-screen text-stone-900 font-sans relative">
      {/* Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm animate-in fade-in" onClick={() => setDeleteConfirmId(null)}></div>
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full relative z-10 shadow-2xl animate-in zoom-in-95 duration-200 border border-stone-100">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-6">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-black text-center mb-2 text-brand-950">Delete Publication?</h3>
            <p className="text-stone-500 text-center text-sm mb-8 leading-relaxed font-medium">
              This action cannot be undone. The article will be permanently removed from the database.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-3.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => confirmDelete(deleteConfirmId)}
                className="flex-1 py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-red-100"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Structural Top Nav */}
      <nav className="border-b border-stone-200 px-6 py-4 sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setPage('home')}
              className="text-stone-400 hover:text-brand-900 transition-colors p-2"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="h-6 w-px bg-stone-200"></div>
            <div>
              <h1 className="text-xs font-black uppercase tracking-[0.2em] text-stone-400">
                {editingId ? 'Edit Draft' : 'New Publication'}
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className={`w-1.5 h-1.5 rounded-full ${status === 'saving' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`}></div>
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">{status === 'saving' ? 'Syncing...' : 'Live Cloud'}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200">
               <button 
                 onClick={() => setActiveTab('create')}
                 className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === 'create' ? 'bg-white text-brand-900 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
               >
                 Editor
               </button>
               <button 
                 onClick={() => { setActiveTab('manage'); setEditingId(null); }}
                 className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === 'manage' ? 'bg-white text-brand-900 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
               >
                 Archive
               </button>
            </div>
          </div>
        </div>
      </nav>

      {activeTab === 'create' ? (
        <form onSubmit={handleSubmit} className="fade-in max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] h-[calc(100vh-73px)]">
          {/* Main Writing Workspace */}
          <div className="overflow-y-auto p-6 md:p-10 scrollbar-hide bg-[#f9f9f8]">
            <div className="max-w-[800px] mx-auto space-y-8">
              
              {/* Box: Title Section */}
              <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-4 block">Article Headline</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  placeholder="Enter a compelling title..." 
                  className="w-full text-4xl font-serif font-bold border-none focus:ring-0 placeholder:text-stone-200 p-0 bg-transparent text-stone-900" 
                />
              </div>

              {/* Box: Short Preview */}
              <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-4 block">Quick Summary (Homepage Excerpt)</label>
                <textarea 
                  name="excerpt" 
                  value={formData.excerpt} 
                  onChange={handleChange} 
                  placeholder="Write a brief 2-sentence summary that appears on the home page..." 
                  className="w-full text-lg font-light text-stone-500 border-none focus:ring-0 placeholder:text-stone-200 bg-transparent p-0 resize-none h-24 overflow-hidden leading-relaxed"
                ></textarea>
              </div>

              {/* Box: Content Body */}
              <div className="bg-white rounded-2xl p-8 md:p-12 border border-stone-200 shadow-sm">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-6 block flex items-center justify-between">
                  <span>Main Publication Body</span>
                  <span className="text-stone-200 normal-case font-medium">Unlimited length supported</span>
                </label>
                <textarea 
                  name="content" 
                  value={formData.content} 
                  onChange={handleChange} 
                  placeholder="The story begins here..." 
                  className={`w-full min-h-[600px] text-xl leading-[1.8] border-none focus:ring-0 placeholder:text-stone-200 bg-transparent p-0 resize-none ${formData.fontFamily} text-stone-800`}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Settings Column */}
          <aside className="border-l border-stone-200 bg-white p-8 overflow-y-auto space-y-12">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-brand-900 mb-8 border-b border-stone-100 pb-4">Metadata & Style</h3>
              
              <div className="space-y-10">
                {/* Category Selection */}
                <div className="bg-stone-50 rounded-2xl p-5 border border-stone-100">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3 block">Publication Path</label>
                  <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange} 
                    className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm font-bold text-brand-900 focus:ring-2 focus:ring-brand-500 transition-all outline-none"
                  >
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    <option value="Other">Other (Custom)...</option>
                  </select>
                  {formData.category === 'Other' && (
                    <input 
                      type="text" 
                      name="customCategory" 
                      value={formData.customCategory} 
                      onChange={handleChange} 
                      placeholder="Enter Custom Category Name" 
                      className="w-full mt-3 bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none animate-in fade-in"
                    />
                  )}
                </div>

                {/* Typography Settings */}
                <div className="bg-stone-50 rounded-2xl p-5 border border-stone-100">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-4 block">Visual Font Style</label>
                  <div className="grid grid-cols-1 gap-1">
                    {FONTS.map(f => (
                      <button 
                        key={f.value} 
                        type="button" 
                        onClick={() => setFormData(prev => ({ ...prev, fontFamily: f.value }))}
                        className={`text-left px-4 py-3 text-sm rounded-xl transition-all flex items-center justify-between group ${formData.fontFamily === f.value ? 'bg-brand-900 text-white font-bold shadow-md' : 'text-stone-500 hover:bg-white border border-transparent hover:border-stone-100'}`}
                      >
                        <span className={f.value}>{f.name}</span>
                        {formData.fontFamily === f.value && <FontIcon className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cover Image Settings */}
                <div className="bg-stone-50 rounded-2xl p-5 border border-stone-100">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-4 block">Featured Cover</label>
                  {formData.imageUrl ? (
                    <div className="relative mb-4 group aspect-[16/9] rounded-xl overflow-hidden shadow-inner border border-stone-200 bg-white">
                      <img src={formData.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="Cover" />
                      <button 
                        type="button" 
                        onClick={() => setFormData(p => ({...p, imageUrl: ''}))}
                        className="absolute top-2 right-2 bg-black/60 backdrop-blur-md p-1.5 rounded-lg text-white hover:bg-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center justify-center gap-3 py-4 bg-white border border-stone-200 rounded-xl text-xs font-black uppercase tracking-widest text-stone-600 hover:bg-brand-50 hover:text-brand-900 hover:border-brand-200 transition-all"
                      >
                        <Upload className="w-4 h-4" /> Upload File
                      </button>
                      <button 
                        type="button" 
                        onClick={() => { const url = prompt('Paste Image URL:'); if(url) setFormData(p => ({...p, imageUrl: url})) }}
                        className="flex items-center justify-center gap-3 py-4 bg-white border border-stone-200 rounded-xl text-xs font-black uppercase tracking-widest text-stone-400 hover:text-brand-900 transition-all"
                      >
                        <ImageIcon className="w-4 h-4" /> Web Link
                      </button>
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-stone-100 flex flex-col gap-3">
              <button 
                type="submit" 
                className={`w-full py-5 bg-brand-900 text-white rounded-2xl font-black text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-brand-100 ${status === 'saving' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-800'}`}
              >
                {status === 'saving' ? 'Processing...' : (editingId ? 'Save Edits' : 'Publish Article')} <Save className="w-4 h-4" />
              </button>
              {editingId && (
                <button 
                  type="button" 
                  onClick={() => { setEditingId(null); setFormData({ ...formData, title: '', excerpt: '', content: '', imageUrl: '' }); }}
                  className="w-full py-3 text-[10px] font-black text-stone-300 hover:text-red-500 transition-colors uppercase tracking-[0.2em]"
                >
                  Discard Changes
                </button>
              )}
            </div>
          </aside>
        </form>
      ) : (
        <div className="max-w-5xl mx-auto py-16 px-6 fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-serif font-bold text-brand-950 mb-2">Publication Archive</h2>
              <p className="text-stone-400 text-sm font-medium">Managing all articles currently live on the database.</p>
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl px-6 py-4 shadow-sm flex items-center gap-4">
               <Layers className="w-6 h-6 text-brand-400" />
               <div className="flex flex-col">
                 <span className="text-lg font-serif font-bold text-brand-950">{blogs.length}</span>
                 <span className="text-[10px] font-black uppercase tracking-widest text-stone-300">Total Posts</span>
               </div>
            </div>
          </div>
          
          {blogs.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[2.5rem] border border-stone-200 shadow-sm">
               <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Layers className="w-8 h-8 text-stone-200" />
               </div>
               <h3 className="text-2xl font-serif font-bold text-stone-400">Archive is currently empty.</h3>
               <p className="text-stone-300 mt-2 mb-8">Start your journey by writing your first publication.</p>
               <Button variant="primary" onClick={() => setActiveTab('create')}>Compose New Post</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {blogs.map(blog => (
                <div key={blog.id} className="group bg-white border border-stone-100 rounded-[1.5rem] p-6 hover:shadow-2xl hover:border-brand-100 transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-2xl bg-stone-50 overflow-hidden flex-shrink-0 border border-stone-50 grayscale group-hover:grayscale-0 transition-all duration-700">
                       {blog.imageUrl ? <img src={blog.imageUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-stone-100 font-serif text-3xl">ቻL</div>}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-stone-100 text-[9px] font-black uppercase tracking-widest text-stone-500 rounded-lg group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">{blog.category}</span>
                        <span className="text-[10px] text-stone-300 font-bold">{blog.date}</span>
                      </div>
                      <h4 className="font-bold text-2xl text-brand-950 group-hover:text-brand-700 transition-colors mb-2 leading-tight">{blog.title}</h4>
                      <p className="text-stone-400 text-sm line-clamp-1 max-w-md">{blog.excerpt}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 md:pl-6 border-l-0 md:border-l border-stone-50">
                    <button 
                      onClick={() => handleEdit(blog)} 
                      className="flex-1 md:flex-none px-6 py-3 bg-stone-50 hover:bg-brand-900 hover:text-white rounded-xl transition-all font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 group/btn"
                    >
                      <Edit className="w-4 h-4 group-hover/btn:scale-110 transition-transform" /> Edit
                    </button>
                    <button 
                      onClick={() => setDeleteConfirmId(blog.id)} 
                      className="p-3 bg-stone-50 hover:bg-red-50 text-stone-300 hover:text-red-500 rounded-xl transition-all"
                      title="Delete Permanently"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
