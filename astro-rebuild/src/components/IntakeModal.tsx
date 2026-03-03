import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { track } from '../utils/analytics';

const CONTACT_EMAIL = 'NicholasLoperena@gmail.com';
const CONTACT_PHONE = ''; // e.g. '+15551234567' for SMS fallback

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

function buildEmailFallbackBody(formData: { name: string; email: string; company: string; message: string }): string {
  const lines = [
    `Name: ${formData.name}`,
    `Email: ${formData.email}`,
    formData.company ? `Company: ${formData.company}` : '',
    formData.message ? `Project scope:\n${formData.message}` : '',
  ].filter(Boolean);
  return encodeURIComponent(lines.join('\n\n'));
}

function buildSmsFallbackBody(formData: { name: string; email: string; company: string; message: string }): string {
  const lines = [
    `Name: ${formData.name}`,
    `Email: ${formData.email}`,
    formData.company ? `Company: ${formData.company}` : '',
    formData.message ? `Scope: ${formData.message}` : '',
  ].filter(Boolean);
  return encodeURIComponent(lines.join('\n'));
}

export const IntakeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [copyDone, setCopyDone] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  useEffect(() => {
    // Override the global openContactHub function to open this modal
    // @ts-ignore
    window.openContactHub = () => {
      track('intake_modal_open');
      setIsOpen(true);
    };
  }, []);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const modalVariants = {
    hidden: { x: '-100%' },
    visible: { 
      x: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], staggerChildren: 0.1, delayChildren: 0.3 }
    },
    exit: {
      x: '-100%',
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    track('intake_modal_submit');
    setSubmitError(null);
    setSubmitMessage(null);
    setSubmitStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim() || undefined,
          message: formData.message.trim() || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(data.error || 'Something went wrong. Please try again.');
        setSubmitStatus('error');
        return;
      }
      setSubmitMessage(data.message ?? 'Thank you — I\'ll be in touch soon.');
      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
      setTimeout(() => {
        setIsOpen(false);
        setSubmitStatus('idle');
        setSubmitMessage(null);
      }, 3000);
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
      setSubmitStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] h-screen w-screen bg-[#0a0a0a] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden text-[#ededed]"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Subtle architectural grid lines behind everything */}
          <div className="absolute inset-0 pointer-events-none z-0" style={{
            backgroundImage: 'linear-gradient(to right, #262626 1px, transparent 1px), linear-gradient(to bottom, #262626 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.3
          }}></div>

          {/* Close Button */}
          <button 
            onClick={() => {
              track('intake_modal_close');
              setIsOpen(false);
              setSubmitError(null);
              setSubmitMessage(null);
              setCopyDone(false);
            }}
            className="absolute top-6 right-6 md:top-8 md:right-8 z-50 font-mono text-xs font-bold tracking-widest text-neutral-500 hover:text-white transition-colors duration-300 uppercase flex items-center gap-3 group"
          >
            Close
            <span className="text-lg leading-none -mt-0.5 group-hover:rotate-90 transition-transform duration-300">[ X ]</span>
          </button>

          {/* Left Column (Colossal Typography & Parameters) - 60% */}
          <div className="w-full md:w-[60%] border-b md:border-b-0 md:border-r border-neutral-800 p-8 md:p-12 lg:p-20 relative z-10 flex flex-col justify-between min-h-[50vh] md:min-h-0 bg-[#0a0a0a]/90 backdrop-blur-sm">
            <motion.div variants={contentVariants} className="mt-8 md:mt-0">
              <h2 className="text-[clamp(4rem,6vw,8rem)] font-black uppercase leading-[0.85] tracking-tighter text-[#ededed]">
                SCOPE.<br/>
                THE WORK.
              </h2>
            </motion.div>

            <motion.div variants={contentVariants} className="flex flex-col mt-16 md:mt-auto border border-neutral-800 bg-[#0a0a0a] max-w-xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-neutral-800">
                <div className="p-4 sm:col-span-1 border-b sm:border-b-0 sm:border-r border-neutral-800 font-mono text-[10px] font-bold text-neutral-500 tracking-widest uppercase">
                  AVAILABILITY
                </div>
                <div className="p-4 sm:col-span-2 font-mono text-xs font-bold text-[#ededed] tracking-widest uppercase">
                  ACCEPTING Q3/Q4 PROJECTS
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-neutral-800">
                <div className="p-4 sm:col-span-1 border-b sm:border-b-0 sm:border-r border-neutral-800 font-mono text-[10px] font-bold text-neutral-500 tracking-widest uppercase">
                  ENGAGEMENT RATE
                </div>
                <div className="p-4 sm:col-span-2 font-mono text-xs font-bold text-highlight tracking-widest uppercase flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-highlight rounded-full animate-pulse"></div>
                  $80 / HR USD
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3">
                <div className="p-4 sm:col-span-1 border-b sm:border-b-0 sm:border-r border-neutral-800 font-mono text-[10px] font-bold text-neutral-500 tracking-widest uppercase flex items-center">
                  SPECIALTY
                </div>
                <div className="p-4 sm:col-span-2 font-mono text-xs font-bold text-[#ededed] tracking-widest uppercase leading-loose">
                  WEB APPS, AI WORKFLOWS, CLOUD ARCHITECTURE
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column (The Intake Form) - 40% */}
          <div className="w-full md:w-[40%] relative z-10 flex flex-col bg-[#0a0a0a]/95 backdrop-blur-md">
            <div className="flex-1 flex flex-col justify-center p-8 md:p-12 lg:p-20">
              <motion.form
                variants={contentVariants}
                className="flex flex-col gap-12 w-full max-w-lg mx-auto md:mx-0"
                onSubmit={handleSubmit}
              >
                {submitError && (
                  <>
                    <div className="font-mono text-sm text-red-400 bg-red-950/40 border border-red-800/60 px-4 py-3 rounded-sm" role="alert">
                      {submitError}
                    </div>
                    <div className="flex flex-col gap-3">
                      <p className="font-mono text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
                        Send your message instead:
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <a
                          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Project brief from ${formData.name}`)}&body=${buildEmailFallbackBody(formData)}`}
                          className="inline-flex items-center justify-center font-mono text-xs font-bold tracking-widest uppercase px-5 py-3 bg-neutral-800 hover:bg-white text-neutral-300 hover:text-[#0a0a0a] border border-neutral-700 transition-colors"
                          onClick={() => track('intake_fallback_click', { method: 'email' })}
                        >
                          Email me
                        </a>
                        {CONTACT_PHONE ? (
                          <a
                            href={`sms:${CONTACT_PHONE}?body=${buildSmsFallbackBody(formData)}`}
                            className="inline-flex items-center justify-center font-mono text-xs font-bold tracking-widest uppercase px-5 py-3 bg-neutral-800 hover:bg-white text-neutral-300 hover:text-[#0a0a0a] border border-neutral-700 transition-colors"
                            onClick={() => track('intake_fallback_click', { method: 'sms' })}
                          >
                            Text me
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              const text = [
                                `Name: ${formData.name}`,
                                `Email: ${formData.email}`,
                                formData.company ? `Company: ${formData.company}` : '',
                                formData.message ? `Project scope: ${formData.message}` : '',
                              ].filter(Boolean).join('\n\n');
                              navigator.clipboard.writeText(text).then(() => {
                                track('intake_fallback_click', { method: 'copy' });
                                setCopyDone(true);
                                setTimeout(() => setCopyDone(false), 2000);
                              });
                            }}
                            className="inline-flex items-center justify-center font-mono text-xs font-bold tracking-widest uppercase px-5 py-3 bg-neutral-800 hover:bg-white text-neutral-300 hover:text-[#0a0a0a] border border-neutral-700 transition-colors"
                          >
                            {copyDone ? 'Copied!' : 'Copy message'}
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                )}
                {submitStatus === 'success' && submitMessage && (
                  <div className="font-mono text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-4 py-3 rounded-sm" role="status">
                    {submitMessage}
                  </div>
                )}
                <div className="flex flex-col gap-2 group">
                  <label htmlFor="contact-name" className="font-mono text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase transition-colors group-focus-within:text-highlight">Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Jane Doe"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-transparent border-b border-neutral-800 pb-2 text-2xl font-light text-[#ededed] placeholder:text-neutral-700 focus:outline-none focus:border-[#ededed] transition-colors rounded-none"
                  />
                </div>

                <div className="flex flex-col gap-2 group">
                  <label htmlFor="contact-email" className="font-mono text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase transition-colors group-focus-within:text-highlight">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="jane@company.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-transparent border-b border-neutral-800 pb-2 text-2xl font-light text-[#ededed] placeholder:text-neutral-700 focus:outline-none focus:border-[#ededed] transition-colors rounded-none"
                  />
                </div>

                <div className="flex flex-col gap-2 group">
                  <label htmlFor="contact-company" className="font-mono text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase transition-colors group-focus-within:text-highlight">Company</label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    placeholder="Acme Corp"
                    value={formData.company}
                    onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                    className="w-full bg-transparent border-b border-neutral-800 pb-2 text-2xl font-light text-[#ededed] placeholder:text-neutral-700 focus:outline-none focus:border-[#ededed] transition-colors rounded-none"
                  />
                </div>

                <div className="flex flex-col gap-2 group">
                  <label htmlFor="contact-message" className="font-mono text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase transition-colors group-focus-within:text-highlight">Project Scope</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="We need to migrate our legacy catalog to a Headless architecture..."
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-transparent border-b border-neutral-800 pb-2 text-xl font-light text-[#ededed] placeholder:text-neutral-700 focus:outline-none focus:border-[#ededed] transition-colors resize-none rounded-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === 'sending'}
                  className="w-full bg-neutral-900 hover:bg-white text-neutral-400 hover:text-[#0a0a0a] transition-colors duration-300 flex items-center justify-between p-8 md:p-12 border-t border-neutral-800 group shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="font-mono text-xl md:text-2xl font-bold tracking-widest uppercase">
                    {submitStatus === 'sending' ? 'SENDING…' : submitStatus === 'success' ? 'SENT' : 'SEND PROJECT BRIEF'}
                  </span>
                  {submitStatus !== 'success' && (
                    <span className="font-mono text-3xl group-hover:translate-x-4 transition-transform duration-300">
                      →
                    </span>
                  )}
                </button>
              </motion.form>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
