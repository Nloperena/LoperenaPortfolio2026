import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const testimonials = [
  {
    id: "forza-built",
    hook: "THE BEST SINGLE WEBSITE CONTACT IN COMPANY HISTORY.",
    quote: '"Literally the best single website contact in the history of the company. Your website and all of our marketing efforts drove that. Excellent engagement from a HUGE potential customer."',
    attribution: "FORZA BUILT LEADERSHIP TEAM // INDUSTRIAL ADHESIVES MANUFACTURER"
  },
  {
    id: "vito-ag",
    hook: "FRONT-END DEVELOPMENT AND DESIGN SKILLS ARE OUTSTANDING.",
    quote: '"I highly recommend Nicholas. Working with him has been a pleasure due to his friendly and supportive attitude. Nico is always willing to help with ongoing tasks and provides valuable suggestions and input. His front-end development, design, and digital marketing skills are outstanding, making him a great asset to any team."',
    attribution: "MUHAMMAD TAYYAB HASSAN // GRAPHIC DESIGNER & MARKETING MANAGER"
  },
  {
    id: "furniture-packages-usa",
    hook: "WE WERE AND ARE AN AUTHORITY IN OUR SPACE.",
    quote: '"When the website launched we had some of our best years during the peak covid rental boom. We were and are an authority in our space, because of our presentation and design skills. The website just makes that more clear to our audience"',
    attribution: "LAURA WYSOKI // MANAGER, FURNITURE PACKAGES USA"
  }
];

export const Proof = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Top-level crossfade thresholds for 3 slides
  const slide1Opacity = useTransform(scrollYProgress, [0, 0.28, 0.38], [1, 1, 0]);
  const slide1Y = useTransform(scrollYProgress, [0, 0.28, 0.38], [0, 0, -20]);
  
  const slide2Opacity = useTransform(scrollYProgress, [0.28, 0.38, 0.62, 0.72], [0, 1, 1, 0]);
  const slide2Y = useTransform(scrollYProgress, [0.28, 0.38, 0.62, 0.72], [20, 0, 0, -20]);

  const slide3Opacity = useTransform(scrollYProgress, [0.62, 0.72, 1], [0, 1, 1]);
  const slide3Y = useTransform(scrollYProgress, [0.62, 0.72, 1], [20, 0, 0]);

  // Footer crossfade step
  const footer1Opacity = useTransform(scrollYProgress, (v) => v < 0.38 ? 1 : 0);
  const footer2Opacity = useTransform(scrollYProgress, (v) => (v >= 0.38 && v < 0.72 ? 1 : 0));
  const footer3Opacity = useTransform(scrollYProgress, (v) => v >= 0.72 ? 1 : 0);

  return (
    <section ref={targetRef} className="relative w-full h-[300vh] bg-background">
      <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden px-4 md:px-8 lg:px-12 bg-background">
        <div className="relative z-10 w-full max-w-[1400px] mx-auto h-full flex flex-col border-x border-accent/20 bg-background/95 backdrop-blur-sm shadow-2xl shadow-accent/5">
          
          {/* Header Row */}
          <div className="border-b border-accent/20 p-6 md:p-8 shrink-0 bg-white/30 flex items-center">
             <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-accent">
               Engineered for Impact
             </span>
          </div>

          {/* Colossal Central Grid Cell */}
          <div className="flex-1 relative p-8 md:p-16 lg:p-24 overflow-hidden bg-accent/[0.02]">
            {/* Architectural Grid Lines behind */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-accent/10 pointer-events-none hidden md:block z-0"></div>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-accent/10 pointer-events-none hidden md:block z-0"></div>

            <div className="relative w-full h-full z-10 flex flex-col justify-center">
               
               {/* Slide 1 */}
               <motion.div 
                 className="absolute inset-0 flex flex-col justify-center"
                 style={{ opacity: slide1Opacity, y: slide1Y }}
               >
                 <h2 className="text-[clamp(3rem,6vw,8rem)] font-black uppercase leading-[0.9] tracking-tighter text-gray-900 max-w-5xl">
                   &ldquo;{testimonials[0].hook}&rdquo;
                 </h2>
                 <p className="text-2xl lg:text-3xl font-light leading-relaxed max-w-4xl text-gray-600 mt-8">
                   {testimonials[0].quote}
                 </p>
               </motion.div>

               {/* Slide 2 */}
               <motion.div 
                 className="absolute inset-0 flex flex-col justify-center"
                 style={{ opacity: slide2Opacity, y: slide2Y }}
               >
                 <h2 className="text-[clamp(3rem,6vw,8rem)] font-black uppercase leading-[0.9] tracking-tighter text-gray-900 max-w-5xl">
                   &ldquo;{testimonials[1].hook}&rdquo;
                 </h2>
                 <p className="text-2xl lg:text-3xl font-light leading-relaxed max-w-4xl text-gray-600 mt-8">
                   {testimonials[1].quote}
                 </p>
               </motion.div>

              {/* Slide 3 */}
              <motion.div 
                className="absolute inset-0 flex flex-col justify-center"
                style={{ opacity: slide3Opacity, y: slide3Y }}
              >
                <h2 className="text-[clamp(3rem,6vw,8rem)] font-black uppercase leading-[0.9] tracking-tighter text-gray-900 max-w-5xl">
                  &ldquo;{testimonials[2].hook}&rdquo;
                </h2>
                <p className="text-2xl lg:text-3xl font-light leading-relaxed max-w-4xl text-gray-600 mt-8">
                  {testimonials[2].quote}
                </p>
              </motion.div>

            </div>
          </div>

          {/* The Metadata Footer */}
          <div className="border-t border-accent/20 shrink-0 h-24 md:h-20 bg-white/30 relative overflow-hidden">
             
             {/* Footer State 1 */}
             <motion.div 
               className="absolute inset-0 flex items-center px-6 md:px-8 h-full"
               style={{ opacity: footer1Opacity }}
             >
                <span className="font-mono text-[10px] md:text-sm font-bold tracking-widest text-foreground uppercase">
                  {testimonials[0].attribution}
                </span>
             </motion.div>

             {/* Footer State 2 */}
             <motion.div 
               className="absolute inset-0 flex items-center px-6 md:px-8 h-full"
               style={{ opacity: footer2Opacity }}
             >
                <span className="font-mono text-[10px] md:text-sm font-bold tracking-widest text-foreground uppercase">
                  {testimonials[1].attribution}
                </span>
             </motion.div>

             {/* Footer State 3 */}
             <motion.div 
               className="absolute inset-0 flex items-center px-6 md:px-8 h-full"
               style={{ opacity: footer3Opacity }}
             >
                <span className="font-mono text-[10px] md:text-sm font-bold tracking-widest text-foreground uppercase">
                  {testimonials[2].attribution}
                </span>
             </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};