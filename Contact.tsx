
import React, { useState } from 'react';
import { ArrowLeft, Phone, Mail, MapPin, Loader2, CheckCircle2 } from 'lucide-react';
import { Page } from './types';
import { Button, Section, Heading } from './Common';

// Utility to escape HTML for Telegram API (local copy for Contact)
const escapeHTML = (text: string) => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

export const ContactPage = ({ setPage }: { setPage: (p: Page) => void }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const botToken = "8490899529:AAE_LM6Vjz4DvRkwfRPu3GirD1JRzULFrnc";
    const chatId = "-1003855671675";

    const telegramMessage = `
<b>📩 NEW CONTACT MESSAGE 📩</b>
----------------------------------
<b>👤 Name:</b> ${escapeHTML(formData.name)}
<b>📧 Contact:</b> ${escapeHTML(formData.contact)}
----------------------------------
<b>💬 Message:</b>
${escapeHTML(formData.message)}
----------------------------------
<b>📅 Date:</b> ${new Date().toLocaleString()}
    `.trim();

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage,
          parse_mode: 'HTML'
        })
      });

      const responseData = await response.json();

      if (response.ok && responseData.ok) {
        setSuccess(true);
        setFormData({ name: '', contact: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        const errorMsg = responseData.description || 'Telegram API failure';
        throw new Error(errorMsg);
      }
    } catch (error: any) {
      console.error('Contact Submission Error:', error);
      alert(`Submission failed: ${error.message || 'Please check your connection.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
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
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 relative">
            {success && (
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-brand-950 mb-2">Message Sent</h3>
                <p className="text-stone-600 text-sm">Thank you for reaching out. ቻLu will get back to you shortly.</p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="mt-6 text-brand-600 font-bold text-xs uppercase tracking-widest hover:underline"
                >
                  Send another message
                </button>
              </div>
            )}
            <h3 className="text-xl font-bold text-brand-800 mb-6">Send a Message</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Full Name</label>
                <input 
                  required 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-brand-100 outline-none transition-all" 
                  placeholder="e.g. Abebe Bikila" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Email or Phone</label>
                <input 
                  required 
                  type="text" 
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-brand-100 outline-none transition-all" 
                  placeholder="How can we reach you?" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Message</label>
                <textarea 
                  required 
                  rows={4} 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-brand-100 outline-none transition-all resize-none" 
                  placeholder="How can I help you?"
                ></textarea>
              </div>
              <Button type="submit" disabled={loading} className="w-full h-12">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </div>
        </div>
      </Section>
    </div>
  );
};
