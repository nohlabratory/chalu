import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Menu, X, BookOpen, Users, Brain, 
  Mail, Phone, MapPin, ChevronRight, GraduationCap, 
  Heart, Shield, Sparkles, ArrowRight,
  Youtube, Send, Lock, ArrowLeft,
  Download, FileText, Video,
  Clock, CheckCircle, Star, MessageCircle,
  Layers
} from 'lucide-react';

// --- Types ---

type Page = 'home' | 'about' | 'classes' | 'services' | 'resources' | 'contact';

// --- Components ---

const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '',
  type = 'button'
}: { 
  children?: React.ReactNode; 
  variant?: 'primary' | 'outline' | 'text' | 'danger'; 
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}) => {
  const baseStyle = "px-6 py-3 rounded-md transition-all duration-300 font-medium tracking-wide flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-sm hover:shadow-md",
    outline: "border-2 border-brand-600 text-brand-700 hover:bg-brand-50",
    text: "text-brand-700 hover:text-brand-800 underline-offset-4 hover:underline p-0",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm"
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Section = ({ 
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

const Heading = ({ 
  children, 
  level = 2, 
  className = '' 
}: { 
  children?: React.ReactNode; 
  level?: 1 | 2 | 3; 
  className?: string 
}) => {
  const styles = {
    1: "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6",
    2: "text-3xl md:text-4xl font-semibold mb-8 text-brand-800",
    3: "text-xl md:text-2xl font-medium mb-4 text-brand-700"
  };
  
  const Tag = `h${level}` as React.ElementType;
  
  return <Tag className={`${styles[level]} ${className}`}>{children}</Tag>;
};

const TESTIMONIALS = [
  {
    id: 1,
    text: "The classes completely changed how I understand my own reactions. It wasn't just theory; it was a roadmap to self-awareness.",
    author: "Bethlehem A.",
    role: "Student"
  },
  {
    id: 2,
    text: "I was hesitant about counseling, but FLu created such a safe space. I finally feel heard and understood.",
    author: "Dawit M.",
    role: "Private Client"
  },
  {
    id: 3,
    text: "The reading materials are profound. 'Past Self-Authoring' helped me close chapters I didn't know were still open.",
    author: "Hannan S.",
    role: "Reader"
  },
  {
    id: 4,
    text: "Joining the community was the best decision. Knowing others struggle with the same deep questions makes me feel less alone.",
    author: "Kirubel T.",
    role: "Community Member"
  }
];

const TestimonialSlider = () => {
  return (
    <div className="relative">
      <div className="md:hidden flex overflow-x-auto gap-4 snap-x snap-mandatory pb-6 px-1 hide-scrollbar -mx-4">
        {TESTIMONIALS.map((t) => (
            <div key={t.id} className="min-w-[85vw] ml-4 snap-center bg-white p-8 rounded-2xl shadow-sm border border-stone-100 flex flex-col">
                <div className="text-brand-200 mb-4">
                    <MessageCircle className="w-8 h-8" />
                </div>
                <p className="text-lg text-stone-600 italic mb-6 leading-relaxed">"{t.text}"</p>
                <div className="mt-auto">
                    <h4 className="font-bold text-brand-800">{t.author}</h4>
                    <span className="text-xs text-brand-500 uppercase tracking-wider">{t.role}</span>
                </div>
            </div>
        ))}
        <div className="w-4 shrink-0"></div>
      </div>

      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-all hover:-translate-y-1 flex flex-col h-full">
                <div className="text-brand-200 mb-4">
                    <MessageCircle className="w-6 h-6" />
                </div>
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
};

const HomePage = ({ setPage }: { setPage: (p: Page) => void }) => (
  <div className="fade-in">
    <div className="relative bg-brand-50 py-24 md:py-32 px-6 lg:px-24 flex flex-col items-center text-center">
      <div className="max-w-3xl z-10">
        <span className="text-brand-600 font-bold tracking-wider text-sm uppercase mb-4 block">ቻLu Assefa</span>
        <Heading level={1} className="text-brand-900">
          Psychology for Understanding, Healing, and Growth
        </Heading>
        <p className="text-xl text-stone-600 mb-10 leading-relaxed">
          A general psychology practitioner and thinker based in Addis Ababa, Ethiopia. 
          Exploring how people think, struggle, grow, and find meaning.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => setPage('classes')}>
            View Classes
          </Button>
          <Button variant="outline" onClick={() => setPage('contact')}>
            Book Counseling
          </Button>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-200 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/4"></div>
    </div>

    <Section className="bg-white">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/3 aspect-[3/4] bg-stone-300 rounded-2xl overflow-hidden shadow-lg relative">
           <img 
             src="http://chaluassefa.com/wp-content/uploads/elementor/thumbs/photo_2025-04-18_09-38-27-r4jrcgn9gifdhdaa6ctdqwj78vsfuj8vqkwtk5ueco.jpg"
             alt="ቻLu Assefa"
             className="w-full h-full object-cover"
           />
        </div>
        <div className="w-full md:w-2/3">
          <Heading level={1}>Meet ቻLu Assefa</Heading>
          <p className="text-lg text-stone-700 mb-6 leading-relaxed">
            I am a general psychology practitioner and thinker based in Addis Ababa, Ethiopia. 
            I am drawn to deep questions about how people think, struggle, grow, and find meaning.
          </p>
          <p className="text-stone-600 mb-6 leading-relaxed">
            My approach combines psychological theory with real-world experience, always rooted in culture and reflection. 
            I believe psychology should be thoughtful, honest, and connected to the everyday lives of people.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 mt-8">
            <div className="bg-brand-50 p-6 rounded-xl border border-brand-100">
              <h4 className="font-bold text-brand-800 flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5" /> Interests
              </h4>
              <ul className="text-stone-600 text-sm space-y-2">
                <li>• Mental Health & Wellness</li>
                <li>• Psychology of Religion</li>
                <li>• Personality Psychology</li>
                <li>• Personality Change & Growth</li>
              </ul>
            </div>
            <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
              <h4 className="font-bold text-brand-800 flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5" /> Work
              </h4>
              <ul className="text-stone-600 text-sm space-y-2">
                <li>• General Psychology Practice</li>
                <li>• Psychological Evaluation Tools</li>
                <li>• Magazine Publication</li>
                <li>• Personal Essays & Reflection</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>

    <Section className="bg-stone-100">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <Heading level={2}>Stories of Growth</Heading>
                <p className="text-stone-600 max-w-2xl mx-auto">
                    Reflections from students, clients, and readers who have engaged with the work.
                </p>
            </div>
            <TestimonialSlider />
        </div>
    </Section>
  </div>
);

const AboutPage = ({ setPage }: { setPage: (p: Page) => void }) => (
  <div className="fade-in">
    <Section className="bg-brand-50">
      <button onClick={() => setPage('home')} className="flex items-center gap-2 text-stone-500 hover:text-brand-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </button>
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/3 aspect-[3/4] bg-stone-300 rounded-lg overflow-hidden shadow-md relative">
           <img 
             src="http://chaluassefa.com/wp-content/uploads/elementor/thumbs/photo_2025-04-18_09-38-27-r4jrcgn9gifdhdaa6ctdqwj78vsfuj8vqkwtk5ueco.jpg"
             alt="ቻLu Assefa"
             className="w-full h-full object-cover"
           />
        </div>
        <div className="w-full md:w-2/3">
          <Heading level={1}>Meet ቻLu Assefa</Heading>
          <p className="text-lg text-stone-700 mb-6 leading-relaxed">
            I am a general psychology practitioner and thinker based in Addis Ababa, Ethiopia. 
            I am drawn to deep questions about how people think, struggle, grow, and find meaning.
          </p>
          <p className="text-stone-600 mb-6 leading-relaxed">
            My approach combines psychological theory with real-world experience, always rooted in culture and reflection. 
            I believe psychology should be thoughtful, honest, and connected to the everyday lives of people.
          </p>
        </div>
      </div>
    </Section>

    <Section>
      <div className="max-w-3xl mx-auto text-center">
        <Heading level={2}>The Philosophy</Heading>
        <p className="text-stone-600 text-lg leading-relaxed">
          "We are not our thoughts; we are the observers of our thoughts. In that space of observation lies our freedom."
        </p>
        <div className="mt-12 text-left">
          <Heading level={3}>A Quiet Place for Reflection</Heading>
          <p className="text-stone-600 mb-4">
            This website is designed to be a quiet place where I share my thoughts through blog posts, publish a magazine about psychological ideas, and showcase my ongoing work. 
          </p>
          <p className="text-stone-600">
            Whether you are a psychologist, a student, or someone simply curious about the mind and life — you’re welcome here to reflect and grow in your own way.
          </p>
        </div>
      </div>
    </Section>
  </div>
);

const CourseCard = ({ 
    title, 
    description, 
    price, 
    level = "Class", 
    icon: Icon,
    recommended = false
}: { 
    title: string; 
    description: string; 
    price: string; 
    level?: string; 
    icon: any; 
    recommended?: boolean;
}) => (
    <div className={`group relative bg-white rounded-2xl p-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col h-full ${recommended ? 'ring-2 ring-brand-500 shadow-lg' : 'shadow-sm border border-stone-100'}`}>
        {recommended && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest z-20 shadow-sm">
                Most Popular
            </div>
        )}
        
        <div className="bg-white rounded-xl p-6 flex flex-col h-full relative overflow-hidden z-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-stone-50 rounded-bl-full -mr-10 -mt-10 group-hover:bg-brand-50 transition-colors duration-500"></div>

            <div className="relative z-10 mb-6 flex justify-between items-start">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${recommended ? 'bg-brand-100 text-brand-700' : 'bg-stone-50 text-stone-600'} group-hover:bg-brand-600 group-hover:text-white transition-all duration-300`}>
                    <Icon className="w-7 h-7" />
                </div>
                <div className="text-right">
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">{level}</span>
                </div>
            </div>

            <h3 className="text-xl font-serif font-bold text-stone-800 mb-3 group-hover:text-brand-700 transition-colors">{title}</h3>
            <p className="text-stone-600 text-sm leading-relaxed mb-8 flex-grow">{description}</p>
            
            <div className="pt-6 border-t border-stone-100">
                <div className="flex items-end justify-between mb-4">
                    <span className="text-sm text-stone-400">Tuition</span>
                    <span className="text-2xl font-bold text-brand-900">{price}</span>
                </div>
                <button className={`w-full py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${recommended ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-md' : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-800'}`}>
                    View Details <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    </div>
);

const ClassesPage = ({ setPage }: { setPage: (p: Page) => void }) => (
  <div className="fade-in bg-stone-50">
    <div className="bg-[#1c2423] text-white py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-800 via-stone-900 to-transparent"></div>
      <button onClick={() => setPage('home')} className="absolute top-8 left-6 md:left-12 z-20 text-white/60 hover:text-white flex items-center gap-2 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </button>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="inline-block py-1 px-3 rounded-full bg-brand-900/50 border border-brand-800 text-brand-200 text-xs font-bold uppercase tracking-widest mb-6">Educational Programs</span>
        <Heading level={1} className="text-white mb-6">Institute of Psychology</Heading>
        <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
          Deep, structured learning environments designed to help you understand the complexities of human behavior, personality, and the psyche.
        </p>
      </div>
    </div>

    <Section>
        <div className="relative overflow-hidden bg-white rounded-3xl border border-stone-200 p-8 md:p-12 mb-20 shadow-sm">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-[#229ED9]/10 rounded-full blur-3xl"></div>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 relative z-10">
                <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 text-[#229ED9] font-bold mb-4 bg-blue-50 px-3 py-1 rounded-full text-sm">
                        <Users className="w-4 h-4" /> Community Access
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Join Free Training</h2>
                    <p className="text-stone-600 text-lg leading-relaxed mb-8">
                        Access FLu's psychology training, reading materials, and community discussions directly on our Telegram channel.
                    </p>
                    <a 
                        href="https://t.me/chaluAssefa" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#229ED9] hover:bg-[#1d8dbf] text-white px-8 py-4 rounded-full font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
                    >
                        <Send className="w-5 h-5" /> Join Telegram Channel
                    </a>
                </div>
                <div className="hidden md:flex justify-center flex-1">
                     <div className="bg-white p-6 rounded-2xl shadow-xl border border-stone-100 -rotate-2 hover:rotate-0 transition-transform duration-500">
                        <div className="flex items-center gap-4 mb-4 border-b border-stone-50 pb-4">
                            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-400">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="font-bold text-stone-800 text-lg">Psychology Today</div>
                                <div className="text-xs text-[#229ED9] font-bold">5,000+ Subscribers</div>
                            </div>
                        </div>
                        <div className="space-y-3 opacity-30">
                            <div className="h-2 w-full bg-stone-400 rounded"></div>
                            <div className="h-2 w-3/4 bg-stone-400 rounded"></div>
                            <div className="h-2 w-5/6 bg-stone-400 rounded"></div>
                        </div>
                     </div>
                </div>
            </div>
        </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-stone-200 pb-4">
         <div>
            <span className="text-brand-600 font-bold tracking-wider text-xs uppercase mb-2 block">Curriculum</span>
            <h2 className="text-3xl font-serif font-bold text-stone-800">Available Classes</h2>
         </div>
         <p className="text-stone-500 text-sm max-w-md text-right hidden md:block">
            Comprehensive classes ranging from personality structures to existential philosophy.
         </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <CourseCard 
          title="Personality Psychology"
          description="A comprehensive full class diving deep into the structures of personality types and formation."
          price="9,270 Birr"
          level="Full Program"
          icon={Layers}
          recommended={true}
        />
        <CourseCard 
          title="Depth Psychology"
          description="Explore the unconscious mind, dreams, and underlying psychological forces."
          price="3,700 Birr"
          level="Advanced"
          icon={Brain}
        />
        <CourseCard 
          title="Structural Psychology"
          description="Understanding the structural components of the human psyche and how they interact."
          price="3,700 Birr"
          level="Intermediate"
          icon={Shield}
        />
        <CourseCard 
          title="Existential Psychology"
          description="Confronting the ultimate concerns of life: death, freedom, isolation and meaning."
          price="3,700 Birr"
          level="Advanced"
          icon={Sparkles}
        />
      </div>
    </Section>
  </div>
);

const ServicesPage = ({ setPage }: { setPage: (p: Page) => void }) => (
  <div className="fade-in">
    <div className="bg-stone-100 py-20 px-6 border-b border-stone-200 relative">
      <button onClick={() => setPage('home')} className="absolute top-8 left-6 md:left-12 z-20 text-stone-500 hover:text-brand-600 flex items-center gap-2 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </button>
      <div className="max-w-4xl mx-auto text-center mt-6">
        <span className="text-brand-600 font-bold tracking-wider text-xs uppercase mb-3 block">Professional Care</span>
        <Heading level={1} className="text-stone-900 mb-4">Clinical Services</Heading>
        <p className="text-stone-600 text-lg max-w-2xl mx-auto">
          Professional support tailored to your unique history, challenges, and goals for growth.
        </p>
      </div>
    </div>

    <Section>
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100 mb-16 flex flex-col md:flex-row">
            <div className="md:w-2/5 bg-brand-800 text-white p-10 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-brand-700 rounded-full opacity-50"></div>
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-brand-700 rounded-lg flex items-center justify-center mb-6">
                        <Phone className="w-6 h-6 text-brand-200" />
                    </div>
                    <h3 className="text-3xl font-serif font-bold mb-2">Private Phone Counseling</h3>
                    <p className="text-brand-200 mb-8">Direct, confidential, and professional support from anywhere.</p>
                </div>
                <div className="relative z-10">
                    <div className="text-4xl font-bold mb-1">1,980 ETB</div>
                    <div className="text-brand-300 text-sm">per session</div>
                </div>
            </div>
            <div className="md:w-3/5 p-10">
                 <h4 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" /> Premium Support
                 </h4>
                 <p className="text-stone-600 mb-8 leading-relaxed">
                    You can book a private phone counseling session with FLu. This service is designed for those seeking immediate, professional guidance on personal matters, anxiety, relationships, or self-discovery.
                 </p>
                 
                 <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3 text-sm text-stone-700">
                        <CheckCircle className="w-5 h-5 text-brand-500" /> 
                        <span>Confidential & Secure</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-stone-700">
                        <CheckCircle className="w-5 h-5 text-brand-500" /> 
                        <span>Flexible Scheduling</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-stone-700">
                        <CheckCircle className="w-5 h-5 text-brand-500" /> 
                        <span>1-on-1 Attention</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-stone-700">
                        <CheckCircle className="w-5 h-5 text-brand-500" /> 
                        <span>Payment Confirmation Required</span>
                    </div>
                 </div>

                 <Button variant="primary" onClick={() => setPage('contact')} className="w-full md:w-auto">
                    Book Appointment Now
                 </Button>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl border border-stone-200 hover:border-brand-300 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center mb-6 text-stone-600">
                    <Users className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-800 mb-3">Group Sessions</h3>
                <div className="flex items-center gap-2 text-sm text-stone-500 mb-4">
                    <Clock className="w-4 h-4" /> 90 Minutes
                </div>
                <p className="text-stone-600 mb-6">
                    Small, facilitated groups focused on shared experiences such as grief, social anxiety, or mindfulness practice. Provides a sense of community.
                </p>
                <Button variant="outline" onClick={() => setPage('contact')} className="w-full">Inquire About Groups</Button>
            </div>

            <div className="bg-white p-8 rounded-xl border border-stone-200 hover:border-brand-300 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center mb-6 text-stone-600">
                    <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-800 mb-3">Evaluation Tools</h3>
                <div className="flex items-center gap-2 text-sm text-stone-500 mb-4">
                    <Brain className="w-4 h-4" /> Self-Reflection
                </div>
                <p className="text-stone-600 mb-6">
                    Access various tools for psychological evaluation and self-reflection to help you better understand your personality structure and mental state.
                </p>
                <Button variant="outline" onClick={() => setPage('contact')} className="w-full">Request Info</Button>
            </div>
        </div>
      </div>
    </Section>
  </div>
);

const ResourcesPage = ({ setPage }: { setPage: (p: Page) => void }) => {
  return (
    <div className="fade-in">
        <Section className="bg-brand-50 text-center relative">
        <button onClick={() => setPage('home')} className="absolute top-6 left-6 flex items-center gap-2 text-stone-500 hover:text-brand-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        <Heading level={1}>Resources & Insights</Heading>
        <p className="text-stone-600 max-w-2xl mx-auto">
            Books, classes, videos, and articles to support your mental health journey.
        </p>
        </Section>

        <Section className="bg-stone-900 text-white">
            <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
                <div>
                    <h2 className="text-3xl font-serif font-bold mb-2 flex items-center gap-3">
                        <div className="w-12 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                        </div>
                         FLu's YouTube
                    </h2>
                    <p className="text-stone-300 text-lg max-w-xl">
                        You can enjoy High Class Psychology Education for Free on My YouTube channel.
                    </p>
                </div>
                <a 
                    href="https://youtube.com/@chaluassefa?si=uLu-" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-md font-bold transition-all shadow-lg flex items-center gap-2"
                >
                    <Video className="w-5 h-5" /> Watch Now
                </a>
            </div>
        </Section>

        <Section className="bg-white">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-brand-800 mb-8 border-b border-stone-100 pb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6" /> Free Books
            </h2>
            <div className="grid md:grid-cols-1 gap-8">
                <div className="bg-brand-50 border border-brand-100 rounded-xl p-8 flex flex-col sm:flex-row gap-8 items-start shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-full sm:w-1/3 aspect-[2/3] bg-stone-300 rounded shadow-md overflow-hidden shrink-0">
                        <img 
                            src="https://chaluassefa.com/wp-content/uploads/2025/08/Screenshot_5-8-2025_222741_.jpeg" 
                            alt="ምን ሆኜ ነበር?" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                    <h3 className="text-2xl font-bold text-brand-900 mb-2">ምን ሆኜ ነበር?</h3>
                    <span className="inline-block bg-brand-100 text-brand-800 text-xs font-bold px-3 py-1 rounded-full mb-4">Psychological Guide</span>
                    <p className="text-stone-700 text-base leading-relaxed mb-8 font-serif">
                        ስላለፈው የህይወት ታሪክዎ ፍንትው ያለ ገፅታ የሚያገኙበት ፣ ከኋላ ታሪክዎ ጋር የሚታረቁበት።
                    </p>
                    <a 
                        href="https://t.me/ChaluAssefa" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#229ED9] hover:bg-[#1d8dbf] text-white px-6 py-3 rounded-lg font-bold transition-all shadow-md hover:shadow-lg"
                    >
                        <Send className="w-5 h-5" /> Download on Telegram
                    </a>
                    </div>
                </div>
            </div>
        </div>
        </Section>
    </div>
  );
};

const ContactPage = ({ setPage }: { setPage: (p: Page) => void }) => (
  <div className="fade-in">
    <Section>
      <button onClick={() => setPage('home')} className="flex items-center gap-2 text-stone-500 hover:text-brand-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </button>
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <Heading level={1}>Get in Touch</Heading>
          <p className="text-stone-600 mb-8">
            Whether you are interested in a consultation, collaboration, or simply want to say hello, I'd love to hear from you.
          </p>
          
          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-brand-600 mt-1" />
              <div>
                <h4 className="font-bold text-stone-800">Email</h4>
                <p className="text-stone-600">hello@chaluassefa-psychology.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-brand-600 mt-1" />
              <div>
                <h4 className="font-bold text-stone-800">Phone</h4>
                <p className="text-stone-600">(251) 911-123-456</p>
                <p className="text-xs text-stone-500">Mon-Fri, 9am - 5pm EAT</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-brand-600 mt-1" />
              <div>
                <h4 className="font-bold text-stone-800">Location</h4>
                <p className="text-stone-600">Addis Ababa, Ethiopia</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-100">
          <h3 className="text-2xl font-serif font-bold text-brand-800 mb-6">Send a Message</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">First Name</label>
                <input type="text" className="w-full p-3 bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">Last Name</label>
                <input type="text" className="w-full p-3 bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-1">Email Address</label>
              <input type="email" className="w-full p-3 bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-1">Phone Number</label>
              <input type="tel" className="w-full p-3 bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="+251 ..." />
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-1">Topic</label>
              <select className="w-full p-3 bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 text-stone-600">
                <option>General Inquiry</option>
                <option>Booking a Consultation</option>
                <option>Magazine/Writing</option>
                <option>Speaking Engagement</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-1">Message</label>
              <textarea rows={4} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"></textarea>
            </div>
            <Button className="w-full">Send Message</Button>
          </form>
        </div>
      </div>
    </Section>
  </div>
);

const Footer = ({ setPage }: { setPage: (p: Page) => void }) => (
  <footer className="bg-stone-900 text-stone-400 py-16 px-6 border-t border-stone-800">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1">
        <h2 className="text-2xl font-serif text-stone-100 mb-4">ቻLu Assefa</h2>
        <p className="text-sm leading-relaxed mb-6">
          A quiet place for reflection, growth, and psychological understanding. Based in Addis Ababa.
        </p>
      </div>
      
      <div>
        <h3 className="text-stone-100 font-bold mb-4 uppercase tracking-wider text-xs">Explore</h3>
        <ul className="space-y-2 text-sm">
          <li><button onClick={() => setPage('home')} className="hover:text-brand-300 transition-colors">Home</button></li>
          <li><button onClick={() => setPage('about')} className="hover:text-brand-300 transition-colors">About</button></li>
          <li><button onClick={() => setPage('resources')} className="hover:text-brand-300 transition-colors">Magazine & Books</button></li>
          <li><button onClick={() => setPage('services')} className="hover:text-brand-300 transition-colors">Services</button></li>
        </ul>
      </div>

      <div>
        <h3 className="text-stone-100 font-bold mb-4 uppercase tracking-wider text-xs">Contact</h3>
        <ul className="space-y-2 text-sm">
          <li>(251) 911-123-456</li>
          <li>hello@chaluassefa-psychology.com</li>
          <li>Addis Ababa, Ethiopia</li>
        </ul>
      </div>

      <div>
        <h3 className="text-stone-100 font-bold mb-4 uppercase tracking-wider text-xs">Stay Updated</h3>
        <div className="flex gap-2">
          <input type="email" placeholder="Your email" className="bg-stone-800 border-none rounded px-3 py-2 text-sm w-full focus:ring-1 focus:ring-brand-500" />
          <button className="bg-brand-600 hover:bg-brand-500 text-white rounded px-3 py-2 text-sm font-bold">Join</button>
        </div>
        <p className="text-xs mt-3 mb-6 text-stone-500">Subscribe for mental health tips and new articles.</p>
        
        <div className="flex gap-4">
          <a href="https://t.me/chaluAssefa" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-brand-300 transition-colors" aria-label="Telegram">
            <Send className="w-5 h-5" />
          </a>
          <a href="#" className="text-stone-400 hover:text-brand-300 transition-colors" aria-label="TikTok">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
            </svg>
          </a>
          <a href="https://youtube.com/@chaluassefa?si=uLu-" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-brand-300 transition-colors" aria-label="YouTube">
            <Youtube className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-800 text-xs text-stone-500 flex flex-col md:flex-row justify-between items-center gap-4">
      <p>&copy; {new Date().getFullYear()} ቻLu Assefa Psychology. All rights reserved.</p>
    </div>
  </footer>
);

const Navbar = ({ 
  page, 
  setPage
}: { 
  page: Page; 
  setPage: (p: Page) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="text-2xl font-serif font-bold text-brand-800 cursor-pointer select-none" 
          onClick={() => setPage('home')}
        >
          ቻLu Assefa
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.value}
              onClick={() => setPage(link.value)}
              className={`text-sm font-medium transition-colors ${
                page === link.value 
                  ? 'text-brand-600' 
                  : 'text-stone-600 hover:text-brand-600'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <button 
          className="md:hidden text-stone-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-stone-100 shadow-lg py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <button
              key={link.value}
              onClick={() => {
                setPage(link.value);
                setIsOpen(false);
              }}
              className={`text-left py-2 font-medium ${
                page === link.value ? 'text-brand-600' : 'text-stone-600'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

const App = () => {
  const [page, setPage] = useState<Page>('home');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar 
        page={page} 
        setPage={setPage} 
      />
      
      <main className="flex-grow pt-20">
        {page === 'home' && <HomePage setPage={setPage} />}
        {page === 'about' && <AboutPage setPage={setPage} />}
        {page === 'classes' && <ClassesPage setPage={setPage} />}
        {page === 'services' && <ServicesPage setPage={setPage} />}
        {page === 'resources' && <ResourcesPage setPage={setPage} />}
        {page === 'contact' && <ContactPage setPage={setPage} />}
      </main>

      <Footer setPage={setPage} />
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}