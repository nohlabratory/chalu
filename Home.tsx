import React from 'react';
import { ArrowRight, GraduationCap, Sparkles, MessageCircle, ArrowRightCircle, Quote, Star } from 'lucide-react';
import { Page, BlogPost } from './types';
import { Button, Section, Heading } from './Common';

const TESTIMONIALS = [
  { id: 1, text: "The classes completely changed how I understand my own reactions. It wasn't just theory; it was a roadmap to self-awareness.", author: "Bethlehem A.", role: "Student" },
  { id: 2, text: "I was hesitant about counseling, but ቻLu created such a safe space. I finally feel heard and understood.", author: "Dawit M.", role: "Private Client" },
  { id: 3, text: "The reading materials are profound. 'Past Self-Authoring' helped me close chapters I didn't know were still open.", author: "Hannan S.", role: "Reader" },
  { id: 4, text: "Joining the community was the best decision. Knowing others struggle with the same deep questions makes me feel less alone.", author: "Kirubel T.", role: "Community Member" }
];

const TestimonialSlider = () => (
  <div className="relative">
    {/* Mobile Scrollable View - Modern Bubble Style */}
    <div className="md:hidden flex overflow-x-auto gap-6 snap-x snap-mandatory pb-8 px-1 hide-scrollbar -mx-4">
      {TESTIMONIALS.map((t) => (
        <div key={t.id} className="min-w-[85vw] ml-4 snap-center">
          <div className="bg-white p-8 rounded-[2rem] shadow-soft border border-stone-100 flex flex-col h-full relative overflow-hidden">
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-accent-400 text-accent-400" />)}
            </div>
            <p className="text-brand-950 font-sans font-bold text-lg leading-relaxed mb-8">
              "{t.text}"
            </p>
            <div className="mt-auto flex items-center gap-4 pt-6 border-t border-stone-50">
              <div className="w-10 h-10 rounded-full bg-brand-900 flex items-center justify-center text-white font-bold text-xs">
                {t.author.charAt(0)}
              </div>
              <div>
                <h4 className="font-black text-brand-950 text-sm leading-none mb-1">{t.author}</h4>
                <span className="text-[10px] text-brand-400 font-bold uppercase tracking-widest">{t.role}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Desktop Grid View - Refined Minimalist Cards */}
    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {TESTIMONIALS.map((t) => (
        <div key={t.id} className="group h-full">
          <div className="bg-white h-full p-10 rounded-[2.5rem] shadow-soft hover:shadow-2xl transition-all duration-500 border border-stone-100 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-stone-50 rounded-bl-[4rem] group-hover:bg-brand-50 transition-colors duration-500 -z-0"></div>
            <Quote className="w-8 h-8 text-accent-500 mb-8 opacity-40 group-hover:opacity-100 transition-opacity" />
            <p className="text-brand-950 font-sans font-bold text-base leading-[1.7] mb-10 flex-grow relative z-10">
              {t.text}
            </p>
            <div className="mt-auto flex items-center gap-4 relative z-10">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-brand-900 flex items-center justify-center text-white font-black text-sm group-hover:bg-accent-600 transition-all duration-300">
                  {t.author.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h4 className="font-black text-brand-950 text-sm leading-none mb-1.5">{t.author}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-brand-400 font-black uppercase tracking-[0.15em]">{t.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const HomePage = ({ setPage, blogs, onReadBlog, onShowJoinClasses }: { setPage: (p: Page) => void, blogs: BlogPost[], onReadBlog?: (blog: BlogPost) => void, onShowJoinClasses?: () => void }) => (
  <div className="fade-in">
    {/* Hero Section */}
    <div className="relative bg-brand-50 py-24 md:py-40 px-6 lg:px-24 flex flex-col items-center text-center overflow-hidden">
      <div className="max-w-4xl z-10">
        <span className="text-accent-700 font-black tracking-[0.3em] text-sm uppercase mb-6 block animate-in slide-in-from-bottom-2 duration-700">ቻLu Assefa Psychology</span>
        <Heading level={1} className="text-brand-950 md:text-7xl font-black">Psychologist | Thinker | Author</Heading>
        <p className="text-xl md:text-2xl text-brand-900/80 mb-12 leading-relaxed max-w-2xl mx-auto font-bold">
          Based in Addis Ababa. Exploring the complexities of the human mind through structured education and professional counseling.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button onClick={onShowJoinClasses} className="shadow-2xl shadow-brand-200/50 py-5 px-12 text-lg">Browse Classes</Button>
          <Button variant="outline" onClick={() => setPage('services')} className="py-5 px-12 text-lg border-2">Book Session</Button>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-200 rounded-full blur-[150px] opacity-30 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-300 rounded-full blur-[150px] opacity-30 translate-y-1/2 -translate-x-1/4"></div>
    </div>

    {/* Bio Section */}
    <Section className="bg-white">
      <div className="flex flex-col md:flex-row items-start gap-10 lg:gap-24">
        <div className="w-full md:w-2/5 md:sticky md:top-32">
           <div className="aspect-[3/4] bg-stone-200 rounded-[2.5rem] overflow-hidden shadow-2xl mb-6 relative group border-4 border-white ring-1 ring-stone-100">
             <img src="https://staticfile-7bdbd.wasmer.app/images/chalu.jpg" alt="ቻLu Assefa" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 to-transparent"></div>
           </div>
           <div className="flex items-center gap-3 text-brand-950 bg-white p-4 rounded-[1.25rem] border border-brand-100 shadow-lg max-w-[240px] mx-auto md:ml-0 transition-all hover:scale-105">
                <div className="bg-brand-900 p-2.5 rounded-lg shrink-0"><GraduationCap className="w-5 h-5 text-white" strokeWidth={2.5} /></div>
                <div>
                    <span className="block font-black text-sm text-brand-950 leading-tight">Education Psychology</span>
                    <span className="text-[8px] text-brand-600 uppercase tracking-widest font-black opacity-80">AAU Graduate</span>
                </div>
            </div>
        </div>
        <div className="w-full md:w-3/5 pt-2">
          <Heading level={2} className="font-black text-brand-950 mb-5 text-2xl md:text-3xl">Meet ቻLu Assefa</Heading>
          <p className="text-brand-950 mb-5 leading-relaxed text-base md:text-lg font-bold">
            I am a general psychology practitioner and thinker drawn to deep questions about how people think, struggle, grow, and find meaning. My work focuses on providing structured learning environments where individuals can explore their psyche with depth and compassion.
          </p>
          <p className="text-stone-800 mb-8 leading-relaxed text-sm md:text-base font-medium italic border-l-4 border-accent-500 pl-5 py-2 bg-stone-50/50 rounded-r-lg">
            Through my classes and counseling sessions, I bridge the gap between academic theory and human experience, always staying rooted in the unique cultural context of Ethiopia.
          </p>
          <button 
            onClick={() => setPage('about')} 
            className="group flex items-center gap-3 bg-brand-950 hover:bg-black text-white px-6 py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-brand-100/50 active:scale-95"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.15em]">More about me</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-accent-400" />
          </button>
        </div>
      </div>
    </Section>

    {/* Blog Section */}
    <Section className="bg-stone-50 border-y-2 border-stone-100">
        <div className="text-center mb-20">
            <span className="text-accent-700 font-black tracking-[0.4em] text-xs uppercase mb-6 block">Selected Publications</span>
            <Heading level={2} className="mb-6 font-black text-brand-950">From the Thinker's Desk</Heading>
            <p className="text-stone-800 max-w-xl mx-auto font-bold text-lg italic">Reflections on personality, culture, and the human condition.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
            {blogs.slice(0, 3).map(blog => (
                <article key={blog.id} className="bg-white rounded-[3rem] shadow-xl overflow-hidden border-2 border-stone-100 hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 group">
                    <div className="aspect-[16/10] relative overflow-hidden bg-stone-100">
                        {blog.imageUrl ? (
                          <img src={blog.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={blog.title} />
                        ) : (
                          <div className="w-full h-full bg-brand-950 flex items-center justify-center text-brand-800 font-serif italic text-3xl">ቻLu Assefa</div>
                        )}
                        <div className="absolute top-8 left-8 flex flex-col gap-2">
                            <span className="bg-brand-950 text-white text-[10px] font-black px-5 py-2 rounded-xl uppercase tracking-widest shadow-2xl">{blog.category}</span>
                        </div>
                    </div>
                    <div className="p-10">
                        <div className="text-[11px] text-accent-700 font-black uppercase tracking-[0.2em] mb-6 border-b border-accent-50 pb-2 w-fit">{blog.date}</div>
                        <h3 className="text-2xl md:text-3xl font-serif font-black text-brand-950 mb-6 group-hover:text-brand-600 transition-colors leading-tight line-clamp-2">{blog.title}</h3>
                        <p className={`text-brand-900/70 text-base leading-relaxed mb-10 line-clamp-3 font-bold ${blog.fontFamily || 'font-sans'}`}>{blog.excerpt}</p>
                        <div className="pt-8 border-t-2 border-stone-50">
                            <Button 
                                variant="text" 
                                onClick={() => onReadBlog?.(blog)}
                                className="text-xs font-black uppercase tracking-widest flex items-center gap-3 group-hover:text-accent-700 transition-colors"
                            >
                                More Blogs And insights <ArrowRightCircle className="w-6 h-6 text-accent-600" />
                            </Button>
                        </div>
                    </div>
                </article>
            ))}
            {blogs.length === 0 && (
              <div className="col-span-full py-40 text-center">
                 <Sparkles className="w-20 h-20 text-stone-200 mx-auto mb-10" />
                 <p className="text-stone-400 font-serif italic text-2xl font-bold">The thinker is currently drafting new insights... Stay tuned.</p>
              </div>
            )}
        </div>
        {blogs.length > 3 && (
            <div className="mt-24 text-center">
                <Button onClick={() => setPage('blog')} variant="outline" className="px-14 py-5 font-black text-sm uppercase tracking-widest border-2">Explore Archive</Button>
            </div>
        )}
    </Section>

    {/* Testimonials */}
    <Section className="bg-brand-950 text-white py-32">
        <div className="max-w-6xl mx-auto text-center mb-24">
            <span className="text-accent-400 font-black tracking-[0.5em] text-xs uppercase mb-6 block">Community Impact</span>
            <Heading level={2} className="text-white md:text-5xl font-black">Reflections from the Community</Heading>
        </div>
        <TestimonialSlider />
    </Section>
  </div>
);
