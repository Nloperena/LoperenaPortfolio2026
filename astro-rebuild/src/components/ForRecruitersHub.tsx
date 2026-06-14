import React from 'react';
import { hiringProfile } from '../data/hiring';
import { siteProfile } from '../data/site';
import { track } from '../utils/analytics';
import { RecruiterSkim } from './RecruiterSkim';
import { IdealRoleFit } from './IdealRoleFit';

const openContact = () => {
  track('contact_click', { source: 'for_recruiters' });
  // @ts-expect-error global contact hub
  if (typeof window !== 'undefined' && window.openContactHub) window.openContactHub();
};

export const ForRecruitersHub = () => (
  <div className="w-full bg-background">
    <RecruiterSkim compact />
    <IdealRoleFit />

    <section className="brutal-section bg-concrete">
      <div className="border-b-2 border-foreground bg-foreground px-4 py-5 text-background md:px-6 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight md:text-3xl">Next steps</h2>
          <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-background/90 md:text-base">
            Everything you need to evaluate fit — resume, work samples, and a hiring guide written for recruiters and
            engineering leaders.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 divide-y-2 divide-foreground sm:grid-cols-2 sm:divide-x-2 sm:divide-y-0 lg:grid-cols-4">
        {[
          {
            label: 'Resume (PDF)',
            href: siteProfile.resumePath,
            download: siteProfile.resumeDownloadName,
            desc: 'One-page PDF — same file as LinkedIn.',
          },
          { label: 'Resume (HTML)', href: '/resume', desc: 'Copy-paste friendly for ATS notes.' },
          { label: 'Work samples', href: '/work', desc: 'Production systems with role and outcomes.' },
          {
            label: 'Hiring guide',
            href: hiringProfile.quickLinks.hiringGuide,
            desc: 'What to look for in senior full-stack hires.',
          },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            download={'download' in item ? item.download : undefined}
            className="group flex flex-col bg-background p-5 transition-none hover:bg-highlight md:p-6"
          >
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest group-hover:underline">
              {item.label} →
            </span>
            <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-foreground/90">{item.desc}</p>
          </a>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 border-t-2 border-foreground px-4 py-4 md:px-6 lg:px-8">
        <button type="button" onClick={openContact} className="brutal-btn">
          Start a conversation
        </button>
        <a href={`mailto:${siteProfile.email}`} className="brutal-btn-ghost">
          {siteProfile.email}
        </a>
        {hiringProfile.phone && (
          <a href={`tel:${hiringProfile.phone.replace(/\D/g, '')}`} className="brutal-btn-ghost">
            {hiringProfile.phone}
          </a>
        )}
        {hiringProfile.schedulingUrl ? (
          <a
            href={hiringProfile.schedulingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-btn-ghost"
          >
            Schedule a call ↗
          </a>
        ) : null}
      </div>
    </section>
  </div>
);
