import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { education } from '../data/education';
import { experience } from '../data/experience';
import { siteProfile } from '../data/site';
import { track } from '../utils/analytics';
import { RecruiterSkim } from './RecruiterSkim';
import { StackSection } from './StackSection';

function formatCompany(company: string, location?: string) {
  const base = company.toUpperCase();
  return location ? `${base} · ${location.toUpperCase()}` : base;
}

export const AboutExperience = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  return (
    <div className="w-full relative block bg-background pb-0">
      <RecruiterSkim compact />
      <section
        id="experience"
        className="w-full bg-background text-foreground pt-20 pb-12 md:pb-16 px-4 md:px-6 border-t-2 border-foreground"
      >
         <div className="max-w-[1400px] w-full mx-auto flex flex-col">
            <div className="mb-8 overflow-hidden">
              <motion.h2 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(3rem,5vw,6rem)] font-black uppercase tracking-tighter leading-none"
              >
                Experience
              </motion.h2>
            </div>
            
            <div className="flex flex-col flex-1">
              <div className="grid grid-cols-12 gap-4 pb-4 border-b-2 border-foreground text-secondary">
                <div className="col-span-3 lg:col-span-2 font-mono text-[10px] font-bold uppercase tracking-widest hidden md:block">YEAR</div>
                <div className="col-span-12 md:col-span-4 lg:col-span-4 font-mono text-[10px] font-bold uppercase tracking-widest">ROLE</div>
                <div className="col-span-4 md:col-span-4 lg:col-span-4 font-mono text-[10px] font-bold uppercase tracking-widest hidden md:block">ORGANIZATION</div>
                <div className="col-span-4 md:col-span-1 lg:col-span-2 font-mono text-[10px] font-bold uppercase tracking-widest text-right hidden md:block">DETAILS</div>
              </div>

              {experience.map((job, idx) => {
                const isExpanded = expandedRow === idx;
                return (
                  <motion.div 
                    key={job.id} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className="flex flex-col border-b-2 border-foreground last:border-b-0 group/row"
                  >
                    <button 
                      onClick={() => {
                        const nextState = isExpanded ? null : idx;
                        setExpandedRow(nextState);
                        if (nextState !== null) {
                          track('about_experience_expand', { company: job.company });
                        }
                      }}
                      className="w-full grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-8 items-start md:items-center text-left hover:bg-highlight transition-none cursor-pointer relative md:px-4 md:-mx-4"
                    >
                      <div className="col-span-1 md:col-span-3 lg:col-span-2 font-mono text-xs text-secondary mb-1 md:mb-0">{job.dates}</div>
                      <div className="col-span-1 md:col-span-4 lg:col-span-4 font-mono text-xl md:text-2xl font-bold uppercase tracking-tight">{job.role.toUpperCase()}</div>
                      <div className="col-span-1 md:col-span-4 lg:col-span-4 font-mono text-sm md:text-base uppercase tracking-wide mt-1 md:mt-0">
                        {job.companyUrl ? (
                          <a
                            href={job.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-black transition-colors underline-offset-4 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {formatCompany(job.company, job.location)}
                          </a>
                        ) : (
                          formatCompany(job.company, job.location)
                        )}
                      </div>
                      <div className="col-span-1 md:col-span-1 lg:col-span-2 flex justify-end items-center absolute top-8 right-0 md:relative md:top-0">
                        <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-secondary group-hover/row:text-foreground transition-none">
                          <span className="hidden lg:inline-block">{isExpanded ? 'Show less' : 'Read more'}</span>
                          <span className={`text-2xl leading-none transition-transform duration-300 ${isExpanded ? 'rotate-45' : 'rotate-0'}`}>+</span>
                        </span>
                      </div>
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden bg-concrete border-t-2 border-foreground md:-mx-4 md:px-4"
                        >
                          <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
                            <div className="md:col-span-3 lg:col-span-2 hidden md:block">
                               <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">WHAT I DID</span>
                            </div>
                            <div className="md:col-span-9 lg:col-span-8">
                              <ul className="font-sans text-base md:text-lg leading-relaxed space-y-3 list-disc pl-5 border-l-4 border-foreground ml-2">
                                {job.bullets.map((bullet) => (
                                  <li key={bullet}>{bullet}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
         </div>
      </section>

      <section className="w-full bg-concrete py-12 md:py-16 px-4 md:px-6 border-t-2 border-foreground">
        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center border-2 border-foreground bg-background p-8 md:p-10 shadow-brutal">
          <div className="lg:col-span-7">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em]">Separate from this portfolio</span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-mono font-black uppercase tracking-tighter leading-[0.95]">
              Client work on Nexrena.
            </h2>
            <p className="mt-5 max-w-2xl font-sans text-base md:text-lg leading-relaxed">
              {siteProfile.nexrenaBlurb}
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-3">
            <a
              href={siteProfile.nexrenaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('about_nexrena_click', { source: 'founder_callout' })}
              className="brutal-btn !justify-between"
            >
              Visit Nexrena (agency)
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href={`${siteProfile.nexrenaUrl}/about/leadership/`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('about_nexrena_click', { source: 'leadership' })}
              className="brutal-btn-ghost !justify-between"
            >
              Leadership & two-site model
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <StackSection />

      <section className="w-full bg-background py-16 md:py-20 px-4 md:px-6 border-t-2 border-foreground">        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 border-2 border-foreground bg-background p-8 md:p-12 shadow-brutal-lg">
          <div>
            <div className="overflow-hidden mb-8">
              <motion.h2 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(3rem,5vw,6rem)] font-black uppercase tracking-tighter leading-none text-foreground"
              >
                Education
              </motion.h2>
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="font-sans text-lg md:text-xl max-w-md"
            >
              UCF boot camp, cyber defense coursework, and Valencia business studies — plus a lot of learning on the job since.
            </motion.p>
          </div>

          <div className="flex flex-col gap-16 lg:border-l-2 lg:border-foreground lg:pl-12 relative">
            <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-highlight hidden lg:block" />

            {education.map((school, schoolIdx) => (
              <motion.div
                key={school.school}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + schoolIdx * 0.2, duration: 0.6 }}
                className="relative"
              >
                <div className="flex items-center gap-4 mb-8">
                  <img
                    src={school.logo}
                    alt={school.logoAlt}
                    className="h-14 w-14 object-contain shrink-0"
                    width={56}
                    height={56}
                  />
                  <h3 className="font-mono text-xl md:text-2xl font-bold uppercase tracking-tight">
                    {school.school}
                  </h3>
                </div>
                <div className="space-y-8">
                  {school.items.map((item) => (
                    <div key={item.label} className="group">
                      <span className="font-mono text-sm uppercase tracking-widest mb-2 block bg-foreground text-background px-2 py-0.5 w-fit">
                        {item.dates}
                      </span>
                      <span className="font-sans text-base md:text-lg group-hover:bg-highlight px-1 -mx-1 transition-none">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Spacer removed - let layout footer handle flow */}
    </div>
  );
};
