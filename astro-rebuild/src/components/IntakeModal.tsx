import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { track } from '../utils/analytics';
import { siteProfile } from '../data/site';
import { hiringProfile } from '../data/hiring';
import { INTAKE_SUBMIT_URL } from '../data/intakeApi';

const CONTACT_EMAIL = siteProfile.email;
const CONTACT_PHONE = hiringProfile.phone;

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';
type InquiryType = 'hiring' | 'project';

const inputClass =
  'w-full border-2 border-foreground bg-background px-4 py-3 text-base font-sans text-foreground placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-highlight focus:border-foreground transition-none rounded-none';

const labelClass = 'font-mono text-[11px] font-bold tracking-[0.16em] text-foreground uppercase';

type HiringFormData = {
  name: string;
  email: string;
  company: string;
  roleTitle: string;
  compBand: string;
  remotePolicy: string;
  message: string;
};

function buildEmailFallbackBody(formData: HiringFormData, inquiryType: InquiryType): string {
  const lines = [
    `Inquiry: ${inquiryType === 'hiring' ? 'Hiring / role' : 'Client project'}`,
    `Name: ${formData.name}`,
    `Email: ${formData.email}`,
    formData.company ? `Company: ${formData.company}` : '',
    inquiryType === 'hiring' && formData.roleTitle ? `Role: ${formData.roleTitle}` : '',
    inquiryType === 'hiring' && formData.compBand ? `Comp band: ${formData.compBand}` : '',
    inquiryType === 'hiring' && formData.remotePolicy ? `Remote policy: ${formData.remotePolicy}` : '',
    formData.message
      ? inquiryType === 'hiring'
        ? `Message:\n${formData.message}`
        : `Project scope:\n${formData.message}`
      : '',
  ].filter(Boolean);
  return encodeURIComponent(lines.join('\n\n'));
}

function buildSmsFallbackBody(formData: HiringFormData, inquiryType: InquiryType): string {
  const lines = [
    `Inquiry: ${inquiryType === 'hiring' ? 'Hiring' : 'Project'}`,
    `Name: ${formData.name}`,
    `Email: ${formData.email}`,
    formData.company ? `Company: ${formData.company}` : '',
    formData.roleTitle ? `Role: ${formData.roleTitle}` : '',
    formData.message ? `Scope: ${formData.message}` : '',
  ].filter(Boolean);
  return encodeURIComponent(lines.join('\n'));
}

function closeModal(setIsOpen: (open: boolean) => void, reset: () => void) {
  track('intake_modal_close');
  setIsOpen(false);
  reset();
}

export const IntakeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<InquiryType>('hiring');
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [copyDone, setCopyDone] = useState(false);
  const [formData, setFormData] = useState<HiringFormData>({
    name: '',
    email: '',
    company: '',
    roleTitle: '',
    compBand: '',
    remotePolicy: '',
    message: '',
  });

  const resetState = () => {
    setInquiryType('hiring');
    setSubmitError(null);
    setSubmitMessage(null);
    setCopyDone(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      roleTitle: '',
      compBand: '',
      remotePolicy: '',
      message: '',
    });
  };

  useEffect(() => {
    // @ts-expect-error global contact hub
    window.openContactHub = () => {
      track('intake_modal_open');
      setIsOpen(true);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const getContactEndpoint = () => INTAKE_SUBMIT_URL;

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
      roleTitle: String(fd.get('roleTitle') ?? formData.roleTitle).trim(),
      compBand: String(fd.get('compBand') ?? formData.compBand).trim(),
      remotePolicy: String(fd.get('remotePolicy') ?? formData.remotePolicy).trim(),
      message: String(fd.get('message') ?? formData.message).trim(),
    };
    const inquiryLabel = inquiryType === 'hiring' ? 'Hiring inquiry' : 'Project inquiry';
    const composedScope = [
      inquiryLabel,
      inquiryType === 'hiring' && values.roleTitle ? `Role: ${values.roleTitle}` : '',
      inquiryType === 'hiring' && values.compBand ? `Comp band: ${values.compBand}` : '',
      inquiryType === 'hiring' && values.remotePolicy ? `Remote policy: ${values.remotePolicy}` : '',
      values.message || '',
    ]
      .filter(Boolean)
      .join('\n\n');

    if (!values.name || !values.email) {
      setSubmitError('Name and email are required.');
      setSubmitStatus('error');
      return;
    }

    try {
      const endpoint = getContactEndpoint();
      const payload = {
        name: values.name,
        email: values.email,
        company: values.company || undefined,
        projectScope: composedScope,
      };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(
          data.error || 'Submission failed. Please try again or use Email me below.',
        );
        setSubmitStatus('error');
        return;
      }
      setSubmitMessage(data.message ?? "Thank you — I'll be in touch soon.");
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        roleTitle: '',
        compBand: '',
        remotePolicy: '',
        message: '',
      });
      form.reset();
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
      setSubmitStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <motion.button
            type="button"
            aria-label="Close contact form"
            className="absolute inset-0 bg-foreground/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => closeModal(setIsOpen, resetState)}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="intake-modal-title"
            className="relative z-10 flex h-full w-full max-w-xl flex-col overflow-y-auto border-l-4 border-foreground bg-background text-foreground shadow-brutal-lg md:max-w-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="sticky top-0 z-20 border-b-2 border-foreground bg-background px-6 py-5 md:px-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">
                    Contact
                  </p>
                  <h2 id="intake-modal-title" className="mt-2 font-mono text-2xl md:text-3xl font-black uppercase tracking-tight leading-none">
                    Get in touch
                  </h2>
                  <p className="mt-3 font-sans text-sm md:text-base text-foreground leading-relaxed max-w-md">
                    {siteProfile.availability}. {siteProfile.workStyle}.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => closeModal(setIsOpen, resetState)}
                  className="brutal-btn-ghost shrink-0 !px-4 !py-2"
                >
                  Close
                </button>
              </div>
            </header>

            <div className="flex flex-1 flex-col gap-8 px-6 py-8 md:px-8">
              <div className="flex flex-col gap-3">
                <span className={labelClass}>I&apos;m reaching out about</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setInquiryType('hiring');
                      track('intake_inquiry_select', { type: 'hiring' });
                    }}
                    className={`border-2 p-4 text-left transition-none ${
                      inquiryType === 'hiring'
                        ? 'border-foreground bg-highlight text-foreground shadow-brutal-sm'
                        : 'border-foreground bg-background text-foreground hover:bg-concrete'
                    }`}
                  >
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-widest mb-1.5">
                      Hiring
                    </span>
                    <span className="block font-sans text-sm leading-relaxed">
                      Recruiting for a senior full-stack role — team, stack, and timeline.
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInquiryType('project');
                      track('intake_inquiry_select', { type: 'project' });
                    }}
                    className={`border-2 p-4 text-left transition-none ${
                      inquiryType === 'project'
                        ? 'border-foreground bg-highlight text-foreground shadow-brutal-sm'
                        : 'border-foreground bg-background text-foreground hover:bg-concrete'
                    }`}
                  >
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-widest mb-1.5">
                      Client project
                    </span>
                    <span className="block font-sans text-sm leading-relaxed">
                      Web design, SEO, or agency engagement.
                    </span>
                  </button>
                </div>
              </div>

              {inquiryType === 'project' ? (
                <div className="flex flex-col gap-5 border-2 border-foreground bg-concrete p-5 md:p-6">
                  <p className="font-sans text-base leading-relaxed text-foreground">
                    Client projects run through{' '}
                    <a
                      href={siteProfile.nexrenaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm font-bold uppercase tracking-wide underline decoration-2 underline-offset-4 hover:bg-highlight hover:no-underline"
                    >
                      Nexrena
                    </a>
                    , my B2B web studio for Central Florida and US teams.
                  </p>
                  <p className="font-sans text-sm leading-relaxed text-foreground/90">
                    This portfolio is for hiring. For scope reviews, retainers, or growth work, use Nexrena&apos;s
                    contact flow.
                  </p>
                  <a
                    href={`${siteProfile.nexrenaUrl}/contact/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('intake_nexrena_redirect')}
                    className="brutal-btn w-full !justify-between"
                  >
                    Contact Nexrena
                    <span aria-hidden="true">↗</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setInquiryType('hiring')}
                    className="font-mono text-[10px] font-bold uppercase tracking-widest text-foreground hover:underline text-left"
                  >
                    ← Hiring inquiry instead
                  </button>
                </div>
              ) : (
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  {submitError && (
                    <div className="flex flex-col gap-4 border-2 border-signal bg-background p-4" role="alert">
                      <p className="font-sans text-sm text-foreground leading-relaxed">{submitError}</p>
                      <div className="flex flex-wrap gap-3">
                        <a
                          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Hiring inquiry from ${formData.name}`)}&body=${buildEmailFallbackBody(formData, inquiryType)}`}
                          className="brutal-btn-ghost !py-2 !px-4"
                          onClick={() => track('intake_fallback_click', { method: 'email' })}
                        >
                          Email me
                        </a>
                        {CONTACT_PHONE ? (
                          <a
                            href={`sms:${CONTACT_PHONE}?body=${buildSmsFallbackBody(formData, inquiryType)}`}
                            className="brutal-btn-ghost !py-2 !px-4"
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
                                formData.message ? `Message: ${formData.message}` : '',
                              ]
                                .filter(Boolean)
                                .join('\n\n');
                              navigator.clipboard.writeText(text).then(() => {
                                track('intake_fallback_click', { method: 'copy' });
                                setCopyDone(true);
                                setTimeout(() => setCopyDone(false), 2000);
                              });
                            }}
                            className="brutal-btn-ghost !py-2 !px-4"
                          >
                            {copyDone ? 'Copied!' : 'Copy message'}
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {submitStatus === 'success' && submitMessage && (
                    <div className="border-2 border-foreground bg-highlight px-4 py-3 font-sans text-sm text-foreground" role="status">
                      {submitMessage}
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-name" className={labelClass}>
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Jane Doe"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-email" className={labelClass}>
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="jane@company.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-company" className={labelClass}>
                      Company / team
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Acme Corp"
                      value={formData.company}
                      onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                      className={inputClass}
                    />
                  </div>

                  {inquiryType === 'hiring' && (
                    <>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="contact-role" className={labelClass}>
                          Role title
                        </label>
                        <input
                          id="contact-role"
                          name="roleTitle"
                          type="text"
                          placeholder="Senior Full-Stack Engineer"
                          value={formData.roleTitle}
                          onChange={(e) => setFormData((prev) => ({ ...prev, roleTitle: e.target.value }))}
                          className={inputClass}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="contact-comp" className={labelClass}>
                            Comp band (optional)
                          </label>
                          <input
                            id="contact-comp"
                            name="compBand"
                            type="text"
                            placeholder="$150k–$180k"
                            value={formData.compBand}
                            onChange={(e) => setFormData((prev) => ({ ...prev, compBand: e.target.value }))}
                            className={inputClass}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="contact-remote" className={labelClass}>
                            Remote policy
                          </label>
                          <input
                            id="contact-remote"
                            name="remotePolicy"
                            type="text"
                            placeholder="Fully remote US"
                            value={formData.remotePolicy}
                            onChange={(e) => setFormData((prev) => ({ ...prev, remotePolicy: e.target.value }))}
                            className={inputClass}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-message" className={labelClass}>
                      {inquiryType === 'hiring' ? 'Notes' : 'Message'}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder={
                        inquiryType === 'hiring'
                          ? 'Team, stack, timeline — anything that helps me respond quickly.'
                          : 'What role, team, or stack should I know about?'
                      }
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      className={`${inputClass} resize-y min-h-[120px]`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitStatus === 'sending'}
                    className="brutal-btn w-full !justify-between !py-5 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span className="font-mono text-sm font-bold tracking-widest uppercase">
                      {submitStatus === 'sending' ? 'Sending…' : submitStatus === 'success' ? 'Sent' : 'Send message'}
                    </span>
                    {submitStatus !== 'success' && <span aria-hidden="true">→</span>}
                  </button>
                </form>
              )}

              <p className="border-t-2 border-foreground pt-5 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary leading-relaxed">
                Focus: {siteProfile.specialty}
              </p>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
