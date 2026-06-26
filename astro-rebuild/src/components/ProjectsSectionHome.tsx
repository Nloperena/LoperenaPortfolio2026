import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { featuredWorkByProjectId, featuredWorkSection } from '../data/featuredWork';
import { ProjectCaseStudyCard } from './ProjectCaseStudyCard';
import { stampUp, VIEWPORT_ONCE } from '../utils/motionBlueprint';

export const ProjectsSectionHome = () => (
  <section className="brutal-section bg-background" id="production-work">
    <motion.div
      className="brutal-section-head"
      variants={stampUp}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_ONCE}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-background/70">
            02 — Portfolio
          </span>
          <h2 className="mt-1 font-mono text-2xl font-black uppercase tracking-tight md:text-3xl">Selected Work</h2>
        </div>
        <p className="max-w-xl font-sans text-sm leading-relaxed text-background/90 md:text-right">
          {featuredWorkSection.intro}
        </p>
      </div>
    </motion.div>

    <div
      id="featured-work"
      className="grid grid-cols-1 divide-y-2 divide-foreground border-b-2 border-foreground sm:grid-cols-2 sm:divide-x-2 lg:grid-cols-3 xl:grid-cols-5 xl:divide-y-0"
    >
      {projects.map((project, index) => {
        const featured = featuredWorkByProjectId[project.id];

        return (
          <a
            key={project.id}
            href={`/work/${project.id}`}
            className="group flex flex-col bg-background p-4 transition-none hover:bg-highlight md:p-5"
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-mono text-[10px] font-bold tracking-[0.2em]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-secondary">
                {project.year}
              </span>
            </div>
            <h3 className="mt-2 font-mono text-base font-black uppercase tracking-tight">{project.title}</h3>
            {featured && (
              <p className="mt-1.5 font-mono text-[9px] font-bold uppercase tracking-widest text-secondary leading-snug">
                {featured.impact}
              </p>
            )}
            <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-foreground/90 line-clamp-4">
              {featured?.description ?? project.description}
            </p>
            <span className="mt-3 font-mono text-[10px] font-bold uppercase tracking-widest group-hover:underline">
              Read case study →
            </span>
          </a>
        );
      })}
    </div>

    <div className="divide-y-2 divide-foreground">
      {projects.map((project, index) => (
        <ProjectCaseStudyCard
          key={project.id}
          project={project}
          index={index}
          caseStudyHref={`/work/${project.id}`}
        />
      ))}
    </div>

    <div className="brutal-section-body flex justify-end border-t-2 border-foreground py-4">
      <a href="/work" className="brutal-btn-ghost">
        Full gallery →
      </a>
    </div>
  </section>
);
