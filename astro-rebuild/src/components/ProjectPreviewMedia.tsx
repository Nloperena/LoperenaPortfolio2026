import React, { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { track } from '../utils/analytics';
import { ProjectBrandedPlaceholder } from './ProjectBrandedPlaceholder';

interface Props {
  projectId: string;
  title: string;
  link?: string;
  image?: string;
  compact?: boolean;
  imageClassName?: string;
  /** Shows a hover overlay that opens the live site in a new tab. */
  showLinkOverlay?: boolean;
}

export function ProjectPreviewMedia({
  projectId,
  title,
  link,
  image,
  compact = false,
  imageClassName = '',
  showLinkOverlay = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '120px' });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const shouldLoadImage = Boolean(image) && inView && !imageFailed;
  const isLoading = shouldLoadImage && !imageLoaded;
  const hidePlaceholder = shouldLoadImage && imageLoaded;

  const handlePreviewClick = () => {
    if (!link) return;
    track('project_click', { id: projectId, title, url: link, source: 'preview' });
  };

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden bg-background group/preview">
      <ProjectBrandedPlaceholder
        projectId={projectId}
        title={title}
        compact={compact}
        className={`transition-opacity duration-700 ${hidePlaceholder ? 'opacity-0' : 'opacity-100'}`}
      />

      {isLoading && (
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="absolute inset-0 bg-background/20" />
          <div className="absolute inset-0 project-preview-skeleton" />
        </div>
      )}

      {shouldLoadImage && (
        <img
          src={image}
          alt={`${title} production screenshot`}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageFailed(true)}
          className={`absolute inset-0 z-[2] w-full h-full object-cover object-top transition-opacity duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${imageClassName}`}
        />
      )}

      {link && showLinkOverlay && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handlePreviewClick}
          aria-label={`Open ${title} live site`}
          className="absolute inset-0 z-[3] flex flex-col justify-end focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/15 to-transparent opacity-0 transition-opacity duration-500 group-hover/preview:opacity-100 group-focus-within/preview:opacity-100" />
          <span className="relative z-10 m-4 md:m-6 flex items-center justify-between gap-4 border border-white/25 bg-foreground/85 px-4 py-3 text-white opacity-0 translate-y-2 transition-all duration-500 group-hover/preview:opacity-100 group-hover/preview:translate-y-0 group-focus-within/preview:opacity-100 group-focus-within/preview:translate-y-0">
            <span className="font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-[0.22em]">
              Open live site
            </span>
            <span className="font-mono text-base leading-none" aria-hidden="true">
              ↗
            </span>
          </span>
        </a>
      )}
    </div>
  );
}
