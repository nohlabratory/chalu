import React, { useState, useRef } from 'react';
import { 
  LayoutDashboard, PlusCircle, Image as ImageIcon,
  Edit, Trash2, Search, Layers, Send, Save, AlertCircle,
  Upload, Type, Tag, ChevronLeft
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

  const handleDelete = async (id: number) => {
    if(window.confirm('WARNING: Are you sure you want to delete this post forever? It will be removed from the database.')) {
        const updatedBlogs = blogs.filter(b => b.id !== id);
        setStatus('saving');
        const success = await saveDBBlogs(updatedBlogs);
        if (success) {
            setBlogs(updatedBlogs);
            setStatus('idle');
        } else {
            setStatus('error');
            alert('Error: Could not update the database.');
        }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');

    const finalCategory = formData.category === 'Other' ? formData.customCategory : formData.category;

    let updatedBlogs: BlogPost[];
    const blogData = {
        title: formData.title,
        category: finalCategory || 'Psychology',
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
        alert('Publication Successful: Changes saved to Upstash Database.');
    } else {
        setStatus('error');
        alert('Database Error: Failed to save post. Please check your connection.');
    }
  };

  return (
    <div className="fade-in bg-[#fdfcfb] min-h-screen pb-20">
      <div className="bg-brand-950 text-white py-10 px-6 shadow-2xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <button onClick={() => setPage('home')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
                <h1 className="text-2xl font-serif font-bold tracking-tight">Blog Management Panel</h1>
                <div className="flex items-center gap-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${status === 'saving' ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'}`}></div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-brand-400 font-bold">Upstash Cloud Database Connected</span>
                </div>
            </div>
          </div>
          <Button variant="accent" onClick={() => setPage('home')}>View Live Website</Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-6">
        <div className="flex gap-1 mb-10 bg-white p-1 rounded-2xl shadow-sm border border-stone-200 inline-flex">
          <button onClick={() => setActiveTab('create')} className={`flex items-center gap-2 px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-xl ${activeTab === 'create' ? 'bg-brand-900 text-white' : 'text-stone-400 hover:text-brand-900'}`}>
            {editingId ? <Edit className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />} {editingId ? 'Editing Draft' : 'Write New Post'}
          </button>
          <button onClick={() => { setActiveTab('manage'); setEditingId(null); }} className={`flex items-center gap-2 px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-xl ${activeTab === 'manage' ? 'bg-brand-900 text-white' : 'text-stone-400 hover:text-brand-900'}`}>
            <Layers className="w-4 h-4" /> All Publications ({blogs.length})
          </button>
        </div>

        {activeTab === 'create' ? (
          <form onSubmit={handleSubmit} className="space-y-8 fade-in">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Write Area */}
              <div className="lg:col-span-3 space-y-6">
                <div className="bg-white rounded-3xl shadow-xl border border-stone-100 p-10 min-h-[800px] flex flex-col">
                  <input 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    required 
                    placeholder="Enter Article Title..." 
                    className="w-full text-5xl font-serif font-bold border-none focus:ring-0 placeholder:text-stone-100 mb-10 text-brand-950" 
                  />
                  <textarea 
                    name="content" 
                    value={formData.content} 
                    onChange={handleChange} 
                    required 
                    placeholder="Start writing your masterpiece... Your content length is unlimited." 
                    className={`w-full flex-grow p-0 border-none focus:ring-0 placeholder:text-stone-100 text-xl leading-relaxed text-stone-700 outline-none resize-none ${formData.fontFamily}`}
                  ></textarea>
                </div>
              </div>

              {/* Sidebar Settings */}
              <div className="space-y-6">
                <div className="bg-white rounded-3xl shadow-xl border border-stone-100 p-8 sticky top-24">
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-[0.2em] mb-8 border-b pb-4 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-accent-500" /> Post Configuration
                  </h4>
                  
                  <div className="space-y-8">
                    {/* Categories */}
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-3 block">Publication Category</label>
                      <select name="category" value={formData.category} onChange={handleChange} className="w-full p-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-brand-500 transition-all outline-none text-sm font-medium">
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        <option value="Other">Other (Custom Name)</option>
                      </select>
                      {formData.category === 'Other' && (
                        <input 
                          type="text" 
                          name="customCategory" 
                          value={formData.customCategory} 
                          onChange={handleChange} 
                          placeholder="Type Category Name..." 
                          className="w-full mt-3 p-4 bg-brand-50 border border-brand-100 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none animate-in slide-in-from-top-1 text-sm font-bold" 
                        />
                      )}
                    </div>

                    {/* Font Choice */}
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-3 block">Post Typography (English Font)</label>
                      <div className="grid grid-cols-1 gap-2">
                        {FONTS.map(f => (
                          <button 
                            key={f.value} 
                            type="button" 
                            onClick={() => setFormData(prev => ({ ...prev, fontFamily: f.value }))}
                            className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${formData.fontFamily === f.value ? 'border-brand-900 bg-brand-950 text-white' : 'border-stone-100 text-stone-600 hover:bg-stone-50'}`}
                          >
                            <span className={f.value}>{f.name}</span>
                            {formData.fontFamily === f.value && <Type className="w-3 h-3" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Image Settings */}
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-3 block">Featured Image</label>
                      <div className="space-y-4">
                        {formData.imageUrl && (
                          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md group">
                            <img src={formData.imageUrl} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button type="button" onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))} className="bg-white text-red-600 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest">Remove</button>
                            </div>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <button type="button" onClick={() => fileInputRef.current?.click()} className="flex-1 p-4 bg-brand-50 text-brand-900 text-xs font-bold rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-brand-100 transition-all">
                            <Upload className="w-5 h-5" /> <span>Upload File</span>
                          </button>
                          <button type="button" onClick={() => { const url = prompt('Enter Image URL:'); if(url) setFormData(p => ({...p, imageUrl: url})) }} className="flex-1 p-4 bg-stone-50 text-stone-600 text-xs font-bold rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-stone-100 transition-all">
                            <ImageIcon className="w-5 h-5" /> <span>Use URL</span>
                          </button>
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-3 block">Homepage Excerpt</label>
                      <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} rows={3} placeholder="A short 2-sentence summary for the main page..." className="w-full p-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-brand-500 text-sm outline-none resize-none"></textarea>
                    </div>

                    <div className="pt-6 border-t flex flex-col gap-4">
                        <Button 
                            type="submit" 
                            variant="primary" 
                            className={`w-full py-5 text-base shadow-xl ${status === 'saving' ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            {status === 'saving' ? 'Saving to Cloud...' : (editingId ? 'Update Publication' : 'Publish to Database')}
                        </Button>
                        {editingId && (
                            <button type="button" onClick={() => { setEditingId(null); setFormData({ ...formData, title: '', excerpt: '', content: '', imageUrl: '' }); }} className="text-stone-400 hover:text-red-500 font-bold text-[9px] uppercase tracking-[0.2em] transition-colors">Discard Draft Changes</button>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="bg-white rounded-[40px] shadow-2xl border border-stone-100 fade-in overflow-hidden">
            {blogs.length === 0 ? (
              <div className="py-40 text-center">
                <AlertCircle className="w-20 h-20 text-stone-100 mx-auto mb-8" />
                <h3 className="text-3xl font-serif font-bold text-stone-400">Your database is currently empty.</h3>
                <p className="text-stone-300 mt-4 text-lg">Every blog post you publish will stay here permanently.</p>
                <Button variant="accent" className="mt-8" onClick={() => setActiveTab('create')}>Start Your First Post</Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-stone-50/50 text-[10px] font-bold uppercase tracking-[0.3em] border-b text-stone-400">
                      <tr>
                        <th className="px-10 py-8">Featured Post</th>
                        <th className="px-10 py-8">Database Timestamp</th>
                        <th className="px-10 py-8 text-right">Settings</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-50">
                      {blogs.map(blog => (
                        <tr key={blog.id} className="hover:bg-stone-50/50 transition-all group">
                          <td className="px-10 py-8">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-stone-100 shadow-sm shrink-0">
                                    {blog.imageUrl ? <img src={blog.imageUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xs text-stone-300 font-serif">ቻLu</div>}
                                </div>
                                <div>
                                    <div className="font-bold text-xl text-brand-950 group-hover:text-brand-600 transition-colors leading-tight">{blog.title}</div>
                                    <div className="flex items-center gap-3 mt-2">
                                        <span className="text-[9px] bg-brand-50 text-brand-700 px-3 py-1 rounded-full font-bold uppercase tracking-widest">{blog.category}</span>
                                        <span className="text-[9px] text-stone-400 font-bold uppercase tracking-widest">{blog.date}</span>
                                    </div>
                                </div>
                            </div>
                          </td>
                          <td className="px-10 py-8 text-xs text-stone-300 font-mono tracking-tighter">REF_DB_{blog.id}</td>
                          <td className="px-10 py-8 text-right">
                            <div className="flex justify-end gap-3">
                              <button onClick={() => handleEdit(blog)} className="p-4 bg-stone-50 rounded-2xl text-stone-400 hover:text-brand-900 hover:bg-brand-50 hover:shadow-lg transition-all" title="Edit Publication">
                                <Edit className="w-5 h-5" />
                              </button>
                              <button onClick={() => handleDelete(blog.id)} className="p-4 bg-stone-50 rounded-2xl text-stone-400 hover:text-red-600 hover:bg-red-50 hover:shadow-lg transition-all" title="Delete from Database">
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};