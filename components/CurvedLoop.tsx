'use client'

import { useRef, useEffect, useState, useMemo, useId, FC } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: 'left' | 'right';
  interactive?: boolean;
}

const CurvedLoop: FC<CurvedLoopProps> = ({
  marqueeText = '',
  speed = 2,
  className,
  curveAmount = 400,
  direction = 'left',
  interactive = true
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
  }, [marqueeText]);

  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<SVGTextElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid}`;
  const pathD = `M-100,40 Q500,${40 + curveAmount} 1540,40`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef<'left' | 'right'>(direction);
  const velRef = useRef(0);
  const baseOffsetRef = useRef(0);
  const scrollOffsetRef = useRef(0);

  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Transform scroll progress to offset movement (multiply by spacing for full loop)
  const scrollOffsetValue = useTransform(
    scrollYProgress,
    [0, 1],
    [0, spacing || 100]
  );

  const textLength = spacing;
  const totalText = textLength
    ? Array(Math.ceil(1800 / textLength) + 2)
        .fill(text)
        .join('')
    : text;
  const ready = spacing > 0;

  useEffect(() => {
    if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength());
  }, [text, className]);

  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      const initial = -spacing;
      baseOffsetRef.current = initial;
      textPathRef.current.setAttribute('startOffset', initial + 'px');
      setOffset(initial);
    }
  }, [spacing]);

  useEffect(() => {
    if (!spacing || !ready) return;
    let frame = 0;
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed;
        baseOffsetRef.current += delta;
        
        // Wrap the base offset
        const wrapPoint = spacing;
        if (baseOffsetRef.current <= -wrapPoint) baseOffsetRef.current += wrapPoint;
        if (baseOffsetRef.current > 0) baseOffsetRef.current -= wrapPoint;
        
        // Apply both base offset and scroll offset
        const scrollDelta = dirRef.current === 'right' 
          ? scrollOffsetRef.current 
          : -scrollOffsetRef.current;
        
        let totalOffset = baseOffsetRef.current + scrollDelta;
        
        // Wrap the total offset
        if (totalOffset <= -wrapPoint) totalOffset += wrapPoint;
        if (totalOffset > 0) totalOffset -= wrapPoint;
        
        textPathRef.current.setAttribute('startOffset', totalOffset + 'px');
        setOffset(totalOffset);
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed, ready, scrollOffsetValue]);

  // Subscribe to scroll offset changes
  useEffect(() => {
    if (!spacing || !ready) return;
    
    const unsubscribe = scrollOffsetValue.on('change', (latest) => {
      scrollOffsetRef.current = latest;
    });

    return () => unsubscribe();
  }, [spacing, ready, scrollOffsetValue]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    
    // Update base offset (remove scroll offset to get base position)
    const scrollDelta = dirRef.current === 'right' 
      ? scrollOffsetRef.current 
      : -scrollOffsetRef.current;
    
    baseOffsetRef.current += dx;
    const wrapPoint = spacing;
    if (baseOffsetRef.current <= -wrapPoint) baseOffsetRef.current += wrapPoint;
    if (baseOffsetRef.current > 0) baseOffsetRef.current -= wrapPoint;
    
    // Apply both base and scroll offsets
    let newOffset = baseOffsetRef.current + scrollDelta;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset > 0) newOffset -= wrapPoint;
    
    textPathRef.current.setAttribute('startOffset', newOffset + 'px');
    setOffset(newOffset);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? 'right' : 'left';
  };

  const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';

  return (
    <motion.div
      ref={containerRef}
      className="min-h-[250px] md:min-h-[300px] flex items-center justify-center w-full -mt-8 md:-mt-12 pb-[54px] md:pb-[81px]"
      style={{ visibility: ready ? 'visible' : 'hidden', cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg
        className="select-none w-full overflow-visible block aspect-[100/12] text-[6rem] font-bold uppercase leading-none"
        viewBox="0 0 1440 120"
      >
        <text ref={measureRef} xmlSpace="preserve" style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}>
          {text}
        </text>
        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        {ready && (
          <text xmlSpace="preserve" className={`fill-[#1a4d3a] ${className ?? ''}`}>
            <textPath ref={textPathRef} href={`#${pathId}`} startOffset={offset + 'px'} xmlSpace="preserve">
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </motion.div>
  );
};

export default CurvedLoop;

