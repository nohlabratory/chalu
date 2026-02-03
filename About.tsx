
import React from 'react';
import { ArrowLeft, GraduationCap, Brain, FileText, Sparkles, Users, Star } from 'lucide-react';
import { Page } from './types';
import { Section, Heading } from './Common';

const CredentialItem = ({ title, institution }: { title: string, institution: string }) => (
    <div className="mb-4 pl-4 border-l-2 border-accent-200 hover:border-accent-400 transition-colors">
        <h5 className="font-bold text-stone-800 text-sm leading-tight">{title}</h5>
        <p className="text-xs text-stone-500 mt-1">{institution}</p>
    </div>
);

export const AboutPage = ({ setPage }: { setPage: (p: Page) => void }) => (
  <div className="fade-in">
    <Section className="bg-stone-50">
      <button onClick={() => setPage('home')} className="flex items-center gap-2 text-stone-500 hover:text-brand-600 mb-6 transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
      </button>
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/3 aspect-[3/4] bg-stone-300 rounded-lg overflow-hidden shadow-md relative">
           <img src="https://staticfile-7bdbd.wasmer.app/images/chalu.jpg" alt="ቻLu Assefa" className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-2/3">
          <Heading level={1}>Meet ቻLu Assefa</Heading>
          <div className="mb-8">
            <h3 className="text-2xl font-serif font-bold text-brand-800 mb-2">Education</h3>
            <div className="flex items-center gap-3 text-stone-700 bg-white p-4 rounded-lg shadow-sm border border-stone-100 inline-block">
                <GraduationCap className="w-6 h-6 text-brand-600" />
                <div>
                    <span className="block font-bold">Bachelor of Arts in Education Psychology</span>
                    <span className="text-sm text-stone-500">Addis Ababa University</span>
                </div>
            </div>
          </div>
          <p className="text-lg text-stone-700 mb-6 leading-relaxed">
            I am a general psychology practitioner and thinker based in Addis Ababa, Ethiopia. 
            I am drawn to deep questions about how people think, struggle, grow, and find meaning.
          </p>
          <p className="text-stone-600 mb-6 leading-relaxed">
            My approach combines psychological theory with real-world experience, always rooted in culture and reflection. 
            I believe psychology should be thoughtful, honest, and connected to the everyday lives of people.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-soft hover:shadow-md transition-all group">
              <h4 className="font-bold text-brand-800 flex items-center gap-3 mb-4">
                <div className="bg-brand-50 p-2 rounded-lg text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <Brain className="w-5 h-5" strokeWidth={1.5} />
                </div>
                Interests
              </h4>
              <ul className="text-stone-600 text-sm space-y-3">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-400 rounded-full"></div> Mental Health & Wellness</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-400 rounded-full"></div> Psychology of Religion</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-400 rounded-full"></div> Personality Psychology</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-400 rounded-full"></div> Personality Change & Growth</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-soft hover:shadow-md transition-all group">
              <h4 className="font-bold text-brand-800 flex items-center gap-3 mb-4">
                <div className="bg-brand-50 p-2 rounded-lg text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <FileText className="w-5 h-5" strokeWidth={1.5} />
                </div>
                Work
              </h4>
              <ul className="text-stone-600 text-sm space-y-3">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-400 rounded-full"></div> General Psychology Practice</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-400 rounded-full"></div> Psychological Evaluation Tools</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-400 rounded-full"></div> Magazine Publication</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-400 rounded-full"></div> Personal Essays & Reflection</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>

    <Section className="bg-white">
        <Heading level={2} className="text-center mb-12">Certificates & Accreditations</Heading>
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
                <h4 className="flex items-center gap-3 font-serif font-bold text-xl text-brand-800 mb-6 pb-2 border-b border-stone-200">
                    <Brain className="w-6 h-6 text-accent-600" strokeWidth={1.5} /> Psychology & Mental Health
                </h4>
                <div className="space-y-3">
                    <CredentialItem title="Addiction Treatment: Clinical Skills" institution="Yale University – Online" />
                    <CredentialItem title="Basic Counseling Skills, Clinical Interview & Trauma-Informed Practice" institution="Ethiopian Psychologists Association" />
                    <CredentialItem title="Managing Common Psychiatric Conditions in Primary Care" institution="AAAP (IPCE Accredited) – Online" />
                    <CredentialItem title="Positive Psychiatry and Mental Health" institution="University of Sydney – Online" />
                    <CredentialItem title="Psychosocial Treatment Protocols with Medications for Addiction" institution="AAAP (APA Accredited) – Online" />
                    <CredentialItem title="Schizophrenia" institution="Wesleyan University – Online" />
                    <CredentialItem title="The Social Context of Mental Health and Illness" institution="University of Toronto – Online" />
                </div>
            </div>
            <div className="space-y-10">
                <div>
                    <h4 className="flex items-center gap-3 font-serif font-bold text-xl text-brand-800 mb-6 pb-2 border-b border-stone-200">
                        <Users className="w-6 h-6 text-accent-600" strokeWidth={1.5} /> Education & School Psychology
                    </h4>
                    <div className="space-y-3">
                        <CredentialItem title="Managing ADHD, Autism, Learning Disabilities, and Concussion in School" institution="University of Colorado System – Online" />
                        <CredentialItem title="Providing Social, Emotional, Behavioral, and Special Education Services in School" institution="University of Colorado System – Online" />
                        <CredentialItem title="Teaching Method and Volunteer Program" institution="Kelem Tutors & Karalo School" />
                    </div>
                </div>
                <div>
                    <h4 className="flex items-center gap-3 font-serif font-bold text-xl text-brand-800 mb-6 pb-2 border-b border-stone-200">
                        <Sparkles className="w-6 h-6 text-accent-600" strokeWidth={1.5} /> Philosophy & Neuroscience
                    </h4>
                    <div className="space-y-3">
                        <CredentialItem title="Consumer Neuroscience & Neuromarketing" institution="Copenhagen Business School – Online" />
                        <CredentialItem title="Philosophy, Science and Religion: Religion & Science" institution="University of Edinburgh – Online" />
                    </div>
                </div>
                <div>
                    <h4 className="flex items-center gap-3 font-serif font-bold text-xl text-brand-800 mb-6 pb-2 border-b border-stone-200">
                        <Star className="w-6 h-6 text-accent-600" strokeWidth={1.5} /> Career & Community
                    </h4>
                    <div className="space-y-3">
                        <CredentialItem title="Mini MBA Start-up Training" institution="Addis Chamber BIC" />
                        <CredentialItem title="Career Coach and Navigator Certificate" institution="Goodwill Industries" />
                        <CredentialItem title="Life Skills Training for Street Children" institution="Good Samaritan Family Support Org" />
                    </div>
                </div>
            </div>
        </div>
    </Section>
  </div>
);
