import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { track } from '../utils/analytics';
import { siteProfile } from '../data/site';

const CONTACT_EMAIL = 'nicholasloperena@gmail.com';
const CONTACT_PHONE = ''; // e.g. '+15551234567' for SMS fallback

/** Set in Vercel: PUBLIC_INTAKE_API_URL=https://your-app.herokuapp.com/api/submissions */
const INTAKE_API_URL = (import.meta.env.PUBLIC_INTAKE_API_URL as string | undefined)?.trim() || '';
const USE_HEROKU_BACKEND = INTAKE_API_URL.includes('/api/submissions');

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';
type InquiryType = 'hiring' | 'project';

function buildEmailFallbackBody(formData: { name: string; email: string; company: string; message: string }, inquiryType: InquiryType): string {
  const lines = [
    `Inquiry: ${inquiryType === 'hiring' ? 'Hiring / role' : 'Client project'}`,
    `Name: ${formData.name}`,
    `Email: ${formData.email}`,
    formData.company ? `Company: ${formData.company}` : '',
    formData.message ? (inquiryType === 'hiring' ? `Message:\n${formData.message}` : `Project scope:\n${formData.message}`) : '',
  ].filter(Boolean);
  return encodeURIComponent(lines.join('\n\n'));
}

function buildSmsFallbackBody(formData: { name: string; email: string; company: string; message: string }, inquiryType: InquiryType): string {
  const lines = [
    `Inquiry: ${inquiryType === 'hiring' ? 'Hiring' : 'Project'}`,
    `Name: ${formData.name}`,
    `Email: ${formData.email}`,
    formData.company ? `Company: ${formData.company}` : '',
    formData.message ? `Scope: ${formData.message}` : '',
  ].filter(Boolean);
  return encodeURIComponent(lines.join('\n'));
}

export const IntakeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<InquiryType>('hiring');
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

  const getContactEndpoint = () => {
    if (USE_HEROKU_BACKEND) return INTAKE_API_URL;
    if (typeof window !== 'undefined' && window.location.hostname === 'nicoloperena.com') {
      return 'https://www.nicoloperena.com/api/contact';
    }
    return '/api/contact';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    track('intake_modal_submit');
    setSubmitError(null);
    setSubmitMessage(null);
    setSubmitStatus('sending');

    const form = e.currentTarget;
    const fd = new FormData(form);
    const values = {
      name: String(fd.get('name') ?? formData.name).trim(),
      email: String(fd.get('email') ?? formData.email).trim(),
      company: String(fd.get('company') ?? formData.company).trim(),
      message: String(fd.get('message') ?? formData.message).trim(),
    };
    const inquiryPrefix = inquiryType === 'hiring'
      ? '[Hiring inquiry]'
      : '[Project inquiry — routed from portfolio]';
    const composedMessage = values.message
      ? `${inquiryPrefix}\n\n${values.message}`
      : inquiryPrefix;

    if (!values.name || !values.email) {
      setSubmitError('Name and email are required.');
      setSubmitStatus('error');
      return;
    }

    try {
      const endpoint = getContactEndpoint();
      const payload = USE_HEROKU_BACKEND
        ? {
            name: values.name,
            email: values.email,
            company: values.company || undefined,
            message: values.message || undefined,
            projectScope: composedMessage || undefined,
          }
        : {
            name: values.name,
            email: values.email,
            company: values.company || undefined,
            message: composedMessage || undefined,
          };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(
          data.error ||
            (USE_HEROKU_BACKEND ? 'Submission failed. Please try again or use Email me below.' : 'Something went wrong. Please try again.')
        );
        setSubmitStatus('error');
        return;
      }
      setSubmitMessage(
        data.message ?? (USE_HEROKU_BACKEND ? 'Thank you — your brief was received.' : "Thank you — I'll be in touch soon.")
      );
      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
      form.reset();
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
              setInquiryType('hiring');
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
                GET IN<br/>
                TOUCH.
              </h2>
            </motion.div>

            <motion.div variants={contentVariants} className="flex flex-col mt-16 md:mt-auto border border-neutral-800 bg-[#0a0a0a] max-w-xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-neutral-800">
                <div className="p-4 sm:col-span-1 border-b sm:border-b-0 sm:border-r border-neutral-800 font-mono text-[10px] font-bold text-neutral-500 tracking-widest uppercase">
                  AVAILABILITY
                </div>
                <div className="p-4 sm:col-span-2 font-mono text-xs font-bold text-[#ededed] tracking-widest uppercase">
                  {siteProfile.availabilityShort}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-neutral-800">
                <div className="p-4 sm:col-span-1 border-b sm:border-b-0 sm:border-r border-neutral-800 font-mono text-[10px] font-bold text-neutral-500 tracking-widest uppercase">
                  LOCATION
                </div>
                <div className="p-4 sm:col-span-2 font-mono text-xs font-bold text-highlight tracking-widest uppercase flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-highlight rounded-full animate-pulse"></div>
                  {siteProfile.workStyle}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3">
                <div className="p-4 sm:col-span-1 border-b sm:border-b-0 sm:border-r border-neutral-800 font-mono text-[10px] font-bold text-neutral-500 tracking-widest uppercase flex items-center">
                  FOCUS
                </div>
                <div className="p-4 sm:col-span-2 font-mono text-xs font-bold text-[#ededed] tracking-widest uppercase leading-loose">
                  {siteProfile.specialty}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column (The Intake Form) - 40% */}
          <div className="w-full md:w-[40%] relative z-10 flex flex-col bg-[#0a0a0a]/95 backdrop-blur-md">
            <div className="flex-1 flex flex-col justify-center p-8 md:p-12 lg:p-20">
              <motion.div variants={contentVariants} className="mb-10 flex flex-col gap-4">
                <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase">
                  I&apos;m reaching out about
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setInquiryType('hiring');
                      track('intake_inquiry_select', { type: 'hiring' });
                    }}
                    className={`p-4 border text-left transition-colors ${
                      inquiryType === 'hiring'
                        ? 'border-[#ededed] bg-neutral-900 text-[#ededed]'
                        : 'border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300'
                    }`}
                  >
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-widest mb-2">Hiring</span>
                    <span className="block font-sans text-sm leading-snug text-neutral-400">
                      Recruiter, employer, or team building a role.
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInquiryType('project');
                      track('intake_inquiry_select', { type: 'project' });
                    }}
                    className={`p-4 border text-left transition-colors ${
                      inquiryType === 'project'
                        ? 'border-[#ededed] bg-neutral-900 text-[#ededed]'
                        : 'border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300'
                    }`}
                  >
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-widest mb-2">Client project</span>
                    <span className="block font-sans text-sm leading-snug text-neutral-400">
                      Web design, SEO, or agency engagement.
                    </span>
                  </button>
                </div>
              </motion.div>

              {inquiryType === 'project' ? (
                <motion.div variants={contentVariants} className="flex flex-col gap-8 w-full max-w-lg mx-auto md:mx-0">
                  <p className="font-serif text-lg italic leading-relaxed text-neutral-400">
                    Client projects run through{' '}
                    <a
                      href={siteProfile.nexrenaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ededed] underline underline-offset-4 hover:text-white"
                    >
                      Nexrena
                    </a>
                    — my B2B web design and SEO agency for Central Florida and US teams.
                  </p>
                  <p className="font-mono text-xs leading-relaxed text-neutral-500 uppercase tracking-wider">
                    This portfolio is for hiring conversations. For a 90-day growth plan, scope review, or agency retainer, use Nexrena&apos;s contact flow.
                  </p>
                  <a
                    href={`${siteProfile.nexrenaUrl}/contact/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('intake_nexrena_redirect')}
                    className="w-full bg-neutral-900 hover:bg-white text-neutral-400 hover:text-[#0a0a0a] transition-colors duration-300 flex items-center justify-between p-8 border border-neutral-800 group"
                  >
                    <span className="font-mono text-lg font-bold tracking-widest uppercase">
                      Contact Nexrena
                    </span>
                    <span className="font-mono text-2xl group-hover:translate-x-2 transition-transform duration-300">↗</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setInquiryType('hiring')}
                    className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-[#ededed] transition-colors text-left"
                  >
                    ← Hiring inquiry instead
                  </button>
                </motion.div>
              ) : (
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
                          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Hiring inquiry from ${formData.name}`)}&body=${buildEmailFallbackBody(formData, inquiryType)}`}
                          className="inline-flex items-center justify-center font-mono text-xs font-bold tracking-widest uppercase px-5 py-3 bg-neutral-800 hover:bg-white text-neutral-300 hover:text-[#0a0a0a] border border-neutral-700 transition-colors"
                          onClick={() => track('intake_fallback_click', { method: 'email' })}
                        >
                          Email me
                        </a>
                        {CONTACT_PHONE ? (
                          <a
                            href={`sms:${CONTACT_PHONE}?body=${buildSmsFallbackBody(formData, inquiryType)}`}
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
                    autoComplete="name"
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
                    autoComplete="email"
                    placeholder="jane@company.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-transparent border-b border-neutral-800 pb-2 text-2xl font-light text-[#ededed] placeholder:text-neutral-700 focus:outline-none focus:border-[#ededed] transition-colors rounded-none"
                  />
                </div>

                <div className="flex flex-col gap-2 group">
                  <label htmlFor="contact-company" className="font-mono text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase transition-colors group-focus-within:text-highlight">Company / team</label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Acme Corp"
                    value={formData.company}
                    onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                    className="w-full bg-transparent border-b border-neutral-800 pb-2 text-2xl font-light text-[#ededed] placeholder:text-neutral-700 focus:outline-none focus:border-[#ededed] transition-colors rounded-none"
                  />
                </div>

                <div className="flex flex-col gap-2 group">
                  <label htmlFor="contact-message" className="font-mono text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase transition-colors group-focus-within:text-highlight">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell me about the role, team, or opportunity..."
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
                    {submitStatus === 'sending' ? 'SENDING…' : submitStatus === 'success' ? 'SENT' : 'SEND MESSAGE'}
                  </span>
                  {submitStatus !== 'success' && (
                    <span className="font-mono text-3xl group-hover:translate-x-4 transition-transform duration-300">
                      →
                    </span>
                  )}
                </button>
              </motion.form>
              )}
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
