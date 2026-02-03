
import React from 'react';
import { ArrowLeft, Phone, Mail, MapPin } from 'lucide-react';
import { Page } from './types';
import { Button, Section, Heading } from './Common';

export const ContactPage = ({ setPage }: { setPage: (p: Page) => void }) => (
  <div className="fade-in">
    <Section className="bg-brand-50 text-center relative">
      <button onClick={() => setPage('home')} className="absolute top-6 left-6 flex items-center gap-2 text-stone-500 hover:text-brand-600 transition-colors"><ArrowLeft className="w-4 h-4" /> Back to Home</button>
      <Heading level={1}>Contact & Booking</Heading>
      <p className="text-stone-600 max-w-2xl mx-auto">Reach out for inquiries about counseling, classes, or collaborations.</p>
    </Section>
    <Section className="bg-white">
      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div>
          <h3 className="text-2xl font-serif font-bold text-brand-800 mb-6">Get in Touch</h3>
          <p className="text-stone-600 mb-8 leading-relaxed">I am available for private counseling, speaking engagements, and educational workshops.</p>
          <div className="space-y-6">
            <div className="flex items-start gap-4"><div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-brand-600 shrink-0"><Phone className="w-5 h-5" /></div><div><h4 className="font-bold text-stone-800">Phone</h4><p className="text-stone-600">0932229193</p></div></div>
            <div className="flex items-start gap-4"><div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-brand-600 shrink-0"><Mail className="w-5 h-5" /></div><div><h4 className="font-bold text-stone-800">Email</h4><p className="text-stone-600">ChaluAssefa@outlook.com</p></div></div>
            <div className="flex items-start gap-4"><div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-brand-600 shrink-0"><MapPin className="w-5 h-5" /></div><div><h4 className="font-bold text-stone-800">Location</h4><p className="text-stone-600">Addis Ababa, Ethiopia</p></div></div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100">
          <h3 className="text-xl font-bold text-brand-800 mb-6">Send a Message</h3>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}>
            <input required type="text" className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg" placeholder="Your Full Name" />
            <input required type="text" className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg" placeholder="Email or Phone" />
            <textarea required rows={4} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg" placeholder="How can I help you?"></textarea>
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </div>
      </div>
    </Section>
  </div>
);
