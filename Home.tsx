import React from 'react';
import { ArrowRight, GraduationCap, Sparkles, MessageCircle, ArrowRightCircle } from 'lucide-react';
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
    <div className="md:hidden flex overflow-x-auto gap-4 snap-x snap-mandatory pb-6 px-1 hide-scrollbar -mx-4">
      {TESTIMONIALS.map((t) => (
        <div key={t.id} className="min-w-[85vw] ml-4 snap-center bg-white p-8 rounded-2xl shadow-soft border border-stone-100 flex flex-col">
          <div className="text-accent-300 mb-4"><MessageCircle className="w-8 h-8" strokeWidth={1.5} /></div>
          <p className="text-lg text-stone-600 italic mb-6 leading-relaxed">"{t.text}"</p>
          <div className="mt-auto">
            <h4 className="font-bold text-brand-800">{t.author}</h4>
            <span className="text-xs text-brand-500 uppercase tracking-wider">{t.role}</span>
          </div>
        </div>
      ))}
    </div>
    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {TESTIMONIALS.map((t) => (
        <div key={t.id} className="bg-white p-6 rounded-xl shadow-soft border border-stone-100 hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col h-full group">
          <div className="text-accent-200 group-hover:text-accent-400 transition-colors mb-4"><MessageCircle className="w-6 h-6" strokeWidth={1.5} /></div>
          <p className="text-stone-600 italic mb-4 text-sm leading-relaxed flex-grow">"{t.text}"</p>
          <div className="mt-auto border-t border-stone-50 pt-4">
            <h4 className="font-bold text-brand-800 text-sm">{t.author}</h4>
            <span className="text-[10px] text-brand-500 uppercase tracking-wider">{t.role}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const HomePage = ({ setPage, blogs }: { setPage: (p: Page) => void, blogs: BlogPost[] }) => (
  <div className="fade-in">
    {/* Hero Section */}
    <div className="relative bg-brand-50 py-24 md:py-32 px-6 lg:px-24 flex flex-col items-center text-center overflow-hidden">
      <div className="max-w-3xl z-10">
        <span className="text-accent-600 font-bold tracking-widest text-xs uppercase mb-4 block animate-in slide-in-from-bottom-2 duration-700">ቻLu Assefa Psychology</span>
        <Heading level={1} className="text-brand-900">Psychologist | Thinker | Author</Heading>
        <p className="text-xl text-stone-600 mb-10 leading-relaxed max-w-2xl mx-auto">
          Based in Addis Ababa, Ethiopia. Exploring the complexities of the human mind through structured education and professional counseling.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => setPage('classes')} className="shadow-xl shadow-brand-200/50 py-4 px-10 text-lg">Browse Classes</Button>
          <Button variant="outline" onClick={() => setPage('contact')} className="py-4 px-10 text-lg">Book Session</Button>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-100 rounded-full blur-[100px] opacity-40 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-200 rounded-full blur-[100px] opacity-40 translate-y-1/2 -translate-x-1/4"></div>
    </div>

    {/* Bio Section */}
    <Section className="bg-white">
      <div className="flex flex-col md:flex-row items-start gap-12">
        <div className="w-full md:w-1/3 md:sticky md:top-24">
           <div className="aspect-[3/4] bg-stone-200 rounded-3xl overflow-hidden shadow-2xl mb-8 relative group">
             <img src="https://staticfile-7bdbd.wasmer.app/images/chalu.jpg" alt="ቻLu Assefa" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 to-transparent"></div>
           </div>
           <div className="flex items-center gap-4 text-stone-700 bg-white p-6 rounded-2xl border border-stone-100 shadow-xl">
                <div className="bg-brand-50 p-3 rounded-xl"><GraduationCap className="w-8 h-8 text-brand-600" strokeWidth={1.5} /></div>
                <div>
                    <span className="block font-bold text-base text-brand-900">Education Psychology</span>
                    <span className="text-xs text-stone-400 uppercase tracking-widest font-bold">Addis Ababa University</span>
                </div>
            </div>
        </div>
        <div className="w-full md:w-2/3 pt-4">
          <Heading level={1}>Meet ቻLu Assefa</Heading>
          <p className="text-xl text-stone-700 mb-6 leading-relaxed font-serif italic">
            "I believe psychology should be thoughtful, honest, and connected to the everyday lives of people."
          </p>
          <p className="text-stone-600 mb-6 leading-relaxed text-lg">
            I am a general psychology practitioner and thinker drawn to deep questions about how people think, struggle, grow, and find meaning. My work focuses on providing structured learning environments where individuals can explore their psyche with depth and compassion.
          </p>
          <p className="text-stone-600 mb-10 leading-relaxed text-lg">
            Through my classes and counseling sessions, I bridge the gap between academic theory and human experience, always staying rooted in the unique cultural context of Ethiopia.
          </p>
          <Button onClick={() => setPage('about')} variant="text" className="text-xl font-bold">
            Read My Full Story <ArrowRight className="w-6 h-6 ml-2 animate-pulse" />
          </Button>
        </div>
      </div>
    </Section>

    {/* Blog Section - REAL DATA FROM DB */}
    <Section className="bg-stone-50 border-y border-stone-100">
        <div className="text-center mb-16">
            <span className="text-brand-600 font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">Selected Publications</span>
            <Heading level={2} className="mb-4">From the Thinker's Desk</Heading>
            <p className="text-stone-500 max-w-xl mx-auto italic">Reflections on personality, culture, and the human condition.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map(blog => (
                <article key={blog.id} className="bg-white rounded-[2rem] shadow-soft overflow-hidden border border-stone-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                    <div className="aspect-[16/10] relative overflow-hidden bg-stone-100">
                        {blog.imageUrl ? (
                          <img src={blog.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={blog.title} />
                        ) : (
                          <div className="w-full h-full bg-brand-950 flex items-center justify-center text-brand-800 font-serif italic text-2xl">ቻLu Assefa</div>
                        )}
                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                            <span className="bg-white/95 backdrop-blur shadow-lg text-brand-900 text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">{blog.category}</span>
                        </div>
                    </div>
                    <div className="p-8">
                        <div className="text-[10px] text-stone-300 font-black uppercase tracking-[0.2em] mb-4">{blog.date}</div>
                        <h3 className="text-2xl font-serif font-bold text-brand-950 mb-4 group-hover:text-brand-600 transition-colors leading-tight line-clamp-2">{blog.title}</h3>
                        <p className={`text-stone-500 text-base leading-relaxed mb-8 line-clamp-3 ${blog.fontFamily || 'font-sans'}`}>{blog.excerpt}</p>
                        <div className="pt-6 border-t border-stone-50">
                            <Button variant="text" className="text-xs font-black uppercase tracking-widest flex items-center gap-2 group-hover:text-accent-600 transition-colors">
                                Read Publication <ArrowRightCircle className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </article>
            ))}
            {blogs.length === 0 && (
              <div className="col-span-full py-32 text-center">
                 <Sparkles className="w-16 h-16 text-stone-200 mx-auto mb-6" />
                 <p className="text-stone-400 font-serif italic text-xl">The thinker is currently drafting new insights... Stay tuned.</p>
              </div>
            )}
        </div>
    </Section>

    {/* Philosophy Section */}
    <Section className="bg-white overflow-hidden relative">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <Heading level={2} className="mb-12">The Philosophy</Heading>
        <div className="mb-20">
            <p className="text-brand-900 text-3xl md:text-4xl font-serif italic leading-snug mb-8">
            "We are not our thoughts; we are the observers of our thoughts. In that space of observation lies our freedom."
            </p>
            <div className="w-20 h-1 bg-accent-400 mx-auto rounded-full"></div>
        </div>
        
        <div className="text-left bg-stone-50 p-10 md:p-16 rounded-[3rem] border border-stone-100 flex flex-col md:flex-row gap-10 items-center shadow-inner">
          <div className="bg-white p-6 rounded-3xl shadow-lg shrink-0 border border-stone-100"><Sparkles className="w-10 h-10 text-accent-500" strokeWidth={1.5} /></div>
          <div>
            <Heading level={3} className="text-brand-950 mb-4">A Space for Intentional Growth</Heading>
            <p className="text-stone-600 text-lg mb-4 leading-relaxed font-light">
                This digital space is an extension of my work in Addis Ababa—a quiet corner for reflection, learning, and psychological discovery. 
            </p>
            <p className="text-stone-600 text-lg leading-relaxed font-light">
                Whether you're exploring personality structures in my classes or reading a long-form essay on the psyche, the goal is always clarity and depth.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent-50 rounded-full blur-3xl -translate-x-1/2 opacity-60"></div>
    </Section>

    {/* Testimonials */}
    <Section className="bg-brand-950 text-white">
        <div className="max-w-6xl mx-auto text-center mb-20">
            <span className="text-accent-400 font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">Impact</span>
            <Heading level={2} className="text-white">Reflections from the Community</Heading>
        </div>
        <TestimonialSlider />
    </Section>
  </div>
);