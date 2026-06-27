import React from 'react';
import { hiringProfile } from '../data/hiring';
import { siteProfile } from '../data/site';
import { track } from '../utils/analytics';

type RecruiterSkimProps = {
  compact?: boolean;
};

export const RecruiterSkim = ({ compact = false }: RecruiterSkimProps) => {
  const openContact = () => {
    track('contact_click', { source: 'recruiter_skim' });
    // @ts-expect-error global contact hub
    if (typeof window !== 'undefined' && window.openContactHub) window.openContactHub();
  };

  const facts = [
    { label: 'Name', value: `${hiringProfile.legalName} (${hiringProfile.preferredName})` },
    { label: 'Title', value: hiringProfile.title },
    { label: 'Experience', value: `${hiringProfile.yearsExperience} years in production` },
    { label: 'Location', value: hiringProfile.location },
    { label: 'Work auth', value: hiringProfile.workAuthorization },
    { label: 'Role type', value: hiringProfile.roleTypes.join(' · ') },
    { label: 'Stack', value: hiringProfile.specialty },
    { label: 'Availability', value: hiringProfile.availability },
  ];

  return (
    <section
      id="recruiter-skim"
      className={`scroll-mt-24 brutal-section bg-background ${compact ? '' : 'border-t-2 border-foreground'}`}
      aria-label="Recruiter quick reference"
    >
      <div className="border-b-2 border-foreground bg-highlight px-4 py-5 md:px-6 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-secondary">
            {compact ? 'For recruiters' : 'About me'}
          </span>
          <h2 className="mt-1 font-mono text-xl font-black uppercase tracking-tight md:text-2xl">
            {compact ? '30-second skim' : hiringProfile.title}
          </h2>
          {!compact && (
            <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-foreground md:text-base">
              {hiringProfile.aboutMeShort}
            </p>
          )}
          {!compact && (
            <p className="mt-2 max-w-2xl font-sans text-sm leading-relaxed text-foreground/75">
              {hiringProfile.founderNote}
            </p>
          )}
          {compact && (
            <p className="mt-2 max-w-2xl font-sans text-sm leading-relaxed text-foreground md:text-base">
              {hiringProfile.founderNote}
            </p>
          )}
        </div>
      </div>

      <dl className="mx-auto max-w-[1400px] divide-y-2 divide-foreground border-b-2 border-foreground">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-12 sm:gap-4 sm:px-6 md:py-3.5 lg:px-8"
          >
            <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-secondary sm:col-span-3 lg:col-span-2">
              {fact.label}
            </dt>
            <dd className="font-sans text-sm leading-relaxed text-foreground sm:col-span-9 lg:col-span-10">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mx-auto flex max-w-[1400px] flex-wrap gap-2 border-b-2 border-foreground px-4 py-4 md:px-6 lg:px-8">
        <a
          href={siteProfile.resumePath}
          download={siteProfile.resumeDownloadName}
          onClick={() => track('resume_download', { source: 'recruiter_skim' })}
          className="brutal-btn !py-2.5 !px-4 !text-[10px]"
        >
          Download PDF
        </a>
        <a href="/resume" className="brutal-btn-ghost !py-2.5 !px-4 !text-[10px]">
          HTML resume
        </a>
        <a href="/for-recruiters" className="brutal-btn-ghost !py-2.5 !px-4 !text-[10px]">
          Recruiter hub
        </a>
        <a
          href={siteProfile.linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="brutal-btn-ghost !py-2.5 !px-4 !text-[10px]"
        >
          LinkedIn
        </a>
        <a href={`mailto:${siteProfile.email}`} className="brutal-btn-ghost !py-2.5 !px-4 !text-[10px]">
          Email
        </a>
        <button type="button" onClick={openContact} className="brutal-btn-ghost !py-2.5 !px-4 !text-[10px]">
          Contact form
        </button>
      </div>
    </section>
  );
};
