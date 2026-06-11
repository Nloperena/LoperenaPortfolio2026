import React, { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { ProjectBrandedPlaceholder } from './ProjectBrandedPlaceholder';

interface Props {
  projectId: string;
  title: string;
  link?: string;
  image?: string;
  allowEmbed?: boolean;
  compact?: boolean;
  imageClassName?: string;
}

export function ProjectPreviewMedia({
  projectId,
  title,
  link,
  image,
  allowEmbed = false,
  compact = false,
  imageClassName = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '120px' });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [iframeRequested, setIframeRequested] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const shouldLoadImage = Boolean(image) && inView && !imageFailed;
  const showIframe = Boolean(allowEmbed && link && iframeRequested);
  const isLoading = (shouldLoadImage && !imageLoaded) || (showIframe && !iframeLoaded);
  const hidePlaceholder = (shouldLoadImage && imageLoaded) || (showIframe && iframeLoaded);

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden bg-background">
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
          alt={title}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageFailed(true)}
          className={`absolute inset-0 z-[2] w-full h-full object-cover transition-opacity duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${imageClassName}`}
        />
      )}

      {showIframe && link && (
        <iframe
          src={link}
          title={`${title} live preview`}
          loading="lazy"
          onLoad={() => setIframeLoaded(true)}
          className={`absolute inset-0 z-[3] w-full h-full border-0 transition-opacity duration-700 ${
            iframeLoaded ? 'opacity-100' : 'opacity-0'
          } ${imageClassName}`}
        />
      )}

      {allowEmbed && link && !iframeRequested && !imageLoaded && (
        <button
          type="button"
          onClick={() => setIframeRequested(true)}
          className="absolute bottom-4 right-4 z-20 font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 border border-accent/30 bg-background/90 text-foreground hover:bg-foreground hover:text-background transition-colors"
        >
          Load live preview
        </button>
      )}
    </div>
  );
}
