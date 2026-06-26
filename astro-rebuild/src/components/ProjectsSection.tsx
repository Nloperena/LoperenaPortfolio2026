import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { projects } from '../data/projects';
import { track } from '../utils/analytics';
import { ProjectPreviewMedia } from './ProjectPreviewMedia';

export const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalPanels = projects.length;
  const trackHeight = `${totalPanels * 100}vh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 400, damping: 90, mass: 0.1 });
  const xTranslate = useTransform(smoothProgress, [0, 1], ['0%', `-${((totalPanels - 1) / totalPanels) * 100}%`]);
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section ref={containerRef} className="relative w-full bg-background" style={{ height: trackHeight }}>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-highlight origin-left z-50 border-b border-foreground" style={{ scaleX }} />

      <motion.div
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 font-mono text-[10px] tracking-widest uppercase z-40 flex items-center gap-3 bg-background px-4 py-2 border-2 border-foreground shadow-brutal-sm"
        style={{ opacity: useTransform(smoothProgress, [0, 0.02], [1, 0]) }}
      >
        <span>Scroll to explore</span>
        <span>→</span>
      </motion.div>

      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex bg-background">
        <motion.div
          className="flex h-full"
          style={{
            x: xTranslate,
            width: `${totalPanels * 100}vw`,
          }}
        >
          {projects.map((project, index) => (
            <div key={project.id} className="w-screen h-[100svh] shrink-0 relative border-r-2 border-foreground">
              <div className="flex flex-col md:grid md:grid-cols-12 h-full w-full">
                <div className="md:col-span-5 relative flex flex-col pt-20 pb-4 px-6 md:py-32 md:px-12 lg:px-16 bg-background border-b-2 md:border-b-0 md:border-r-2 border-foreground z-10 h-[50svh] md:h-full shrink-0">
                  <motion.div
                    className="flex flex-col gap-2 md:gap-5 flex-grow justify-center"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: '-10%' }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="font-mono text-3xl md:text-5xl font-black text-secondary leading-none">
                      {String(index + 1).padStart(2, '0')} //
                    </span>
                    <h2 className="font-mono text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none">
                      {project.title}
                    </h2>
                    <p className="font-sans text-foreground/90 text-sm md:text-lg border-l-4 border-foreground pl-4 mt-1 md:mt-2 line-clamp-3 md:line-clamp-none">
                      {project.longDescription}
                    </p>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] mt-2 md:mt-3 leading-snug">{project.impact}</p>

                    <div className="flex flex-wrap gap-2 border-y-2 border-foreground py-3 md:py-4 mt-2 md:mt-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[9px] uppercase tracking-widest px-2 py-1 border-2 border-foreground bg-background">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: '-10%' }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="mt-auto shrink-0 pt-2 flex flex-col gap-2"
                  >
                    <a
                      href={`/work/${project.id}`}
                      onClick={() => track('case_study_click', { id: project.id, title: project.title })}
                      className="brutal-btn w-full !justify-between !py-5"
                    >
                      Read case study
                      <span>→</span>
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => track('project_click', { id: project.id, title: project.title, url: project.link })}
                      className="brutal-btn-ghost w-full !justify-between !py-3 text-[10px]"
                    >
                      View live system
                      <span>↗</span>
                    </a>
                  </motion.div>
                </div>

                <div className="md:col-span-7 relative h-[50svh] md:h-full bg-concrete overflow-hidden border-b-2 md:border-b-0 border-foreground">
                  <motion.div
                    className="absolute inset-0 w-full h-full"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ margin: '-20%' }}
                    transition={{ duration: 0.5 }}
                  >
                    <ProjectPreviewMedia projectId={project.id} title={project.title} link={project.link} image={project.image} />
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
