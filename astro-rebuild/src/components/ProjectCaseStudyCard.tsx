import React from 'react';
import type { Project } from '../data/projects';
import { track } from '../utils/analytics';
import { ProjectPreviewMedia } from './ProjectPreviewMedia';

type ProjectCaseStudyCardProps = {
  project: Project;
  index: number;
  compact?: boolean;
  caseStudyHref?: string;
};

export const ProjectCaseStudyCard = ({ project, index, compact = false, caseStudyHref }: ProjectCaseStudyCardProps) => {
  const cs = project.caseStudy;

  return (
    <article
      id={project.id}
      className={`group scroll-mt-24 bg-background transition-none hover:bg-concrete ${
        compact ? 'brutal-section-body py-5' : 'brutal-section-body py-6 md:py-8'
      }`}
    >
      <div className={`grid grid-cols-1 items-start gap-5 ${compact ? '' : 'lg:grid-cols-12 lg:gap-6'}`}>
        <div className={compact ? 'space-y-3' : 'lg:col-span-5 space-y-4'}>
          <div className="flex items-start gap-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-secondary tabular-nums">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3
                  className={`font-mono font-black uppercase tracking-tight leading-none ${
                    compact ? 'text-xl' : 'text-2xl md:text-3xl'
                  }`}
                >
                  {project.title}
                </h3>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-secondary">
                  {project.year}
                </span>
              </div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em]">{project.impact}</p>
            </div>
          </div>

          {!compact && (
            <p className="border-l-4 border-foreground pl-3 font-sans text-sm leading-relaxed text-foreground md:text-base">
              {project.longDescription}
            </p>
          )}

          {compact && (
            <p className="line-clamp-2 font-sans text-sm leading-relaxed text-foreground/90">{project.description}</p>
          )}

          {cs && !compact && (
            <dl className="grid grid-cols-1 gap-0 border-2 border-foreground sm:grid-cols-2 sm:divide-x-2 sm:divide-y-0 divide-y-2 sm:divide-foreground">
              {(['problem', 'role', 'approach', 'outcome'] as const).map((key) => (
                <div key={key} className="bg-background p-3 md:p-4">
                  <dt className="mb-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em]">{key}</dt>
                  <dd className="text-sm leading-relaxed">{cs[key]}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border-2 border-foreground bg-background px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              onClick={() => track('project_click', { id: project.id, title: project.title, url: project.link })}
              className="brutal-btn-ghost inline-flex !px-4 !py-2 text-[10px]"
            >
              View live →
            </a>
            {caseStudyHref && (
              <a
                href={caseStudyHref}
                onClick={() => track('case_study_click', { id: project.id, title: project.title })}
                className="brutal-btn inline-flex !px-4 !py-2 text-[10px]"
              >
                Read case study →
              </a>
            )}
          </div>
        </div>

        {!compact && (
          <div className="lg:col-span-7">
            <div className="overflow-hidden border-2 border-foreground bg-background">
              <div className="flex h-8 shrink-0 items-center gap-2 border-b-2 border-foreground bg-foreground px-3">
                <div className="h-2 w-2 border border-background bg-highlight" />
                <div className="h-2 w-2 border border-background bg-background" />
                <div className="h-2 w-2 border border-background bg-signal" />
                <span className="ml-1 truncate font-mono text-[9px] uppercase tracking-widest text-background">
                  {project.link.replace('https://', '')}
                </span>
              </div>
              <div className="relative aspect-[16/10] min-h-[180px] bg-concrete">
                <ProjectPreviewMedia
                  projectId={project.id}
                  title={project.title}
                  link={project.link}
                  image={project.image}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
