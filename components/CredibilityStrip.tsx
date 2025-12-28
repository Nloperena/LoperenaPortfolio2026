'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Quote, TrendingUp } from 'lucide-react';

interface Metric {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface VideoTestimonial {
  videoUrl: string;
  title: string;
  context?: string;
  description: string;
  clientName?: string;
  company?: string;
  metrics?: Metric[];
}

const testimonials: VideoTestimonial[] = [
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Caption_video_project-1_1__1_dbbb9822-d82e-45ee-9225-a25be9f41f0b.mp4?v=1724180981',
    title: 'Waterside Market',
    context: 'Martha\'s Vineyard Favorite',
    description: 'Found the secret to keeping flavors fresh and kitchen efficient. Save up to 50% on cooking oil.',
    clientName: 'Chris',
    company: 'Waterside Market',
    metrics: [
      { value: '50%', label: 'Oil Savings', icon: TrendingUp }
    ]
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Caption_video_project_2.mp4?v=1724179828',
    title: 'Teter\'s Market',
    context: 'High-Volume Grocery & Deli',
    description: 'Discovered the secret for magical savings. Watch the oil costs drop by up to 50%.',
    company: 'Teter\'s Market',
    metrics: [
      { value: '50%', label: 'Cost Reduction', icon: TrendingUp }
    ]
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Caption_video_project_1.mp4?v=1724354006',
    title: 'Good Ol Days Diner',
    context: 'Classic American Diner',
    description: 'Maintained the flavor of yesteryears while stepping into the future. Homemade taste efficiently.',
    company: 'Good Ol\' Days Diner',
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Untitled-1_17.mp4?v=1726158775',
    title: 'Nineveh Assyrian',
    context: 'Authentic Middle Eastern Cuisine',
    description: 'Jacob has seen the difference in both food truck and restaurant kitchens! Easy to use, keeps oil cleaner.',
    clientName: 'Jacob',
    company: 'Nineveh Assyrian',
  }
];

const CredibilityStrip = () => {
  // Limit to exactly 4 items for 2x2 grid
  const gridItems = testimonials.slice(0, 4);

  return (
    <section className="w-full bg-[#F5F5DC] dark:bg-[#0A1F1C] py-24 border-b border-[#1C1B1A]/20 dark:border-white/10 relative transition-colors duration-300">
      {/* Swiss Grid Lines */}
      <div className="absolute inset-0 pointer-events-none max-w-7xl mx-auto px-6 md:px-12 border-x border-[#1C1B1A]/20 dark:border-white/10">
         <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#1C1B1A]/20 dark:bg-white/10 hidden md:block" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-end border-b border-[#1C1B1A] dark:border-white/20 pb-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
               <span className="h-px w-8 bg-[#E2725B]"></span>
               <span className="font-mono text-xs text-[#E2725B] uppercase tracking-[0.2em]">IV. Social Proof</span>
            </div>
            <h2 className="font-serif text-5xl text-[#1C1B1A] dark:text-white">
              Proof: 70+ Testimonials Captured
            </h2>
          </div>
          <div className="text-right md:text-left">
             <p className="text-[#1C1B1A]/60 dark:text-white/60 font-serif italic text-lg">
               &quot;Real results from partners who built their digital legacy with us.&quot;
             </p>
          </div>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#1C1B1A]/20 dark:border-white/10">
          {gridItems.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white dark:bg-[#1a1a1a] border-r border-b border-[#1C1B1A]/20 dark:border-white/10 overflow-hidden h-[450px] flex flex-col"
            >
              {/* Video Section - Top Half */}
              <div className="h-1/2 relative overflow-hidden bg-black">
                 <video
                  playsInline
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover group-hover:opacity-100 transition-all duration-700"
                  style={{ filter: 'brightness(0.7) contrast(1.1)' }}
                >
                  <source src={testimonial.videoUrl} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                
                {/* Gold Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-[#8C7A5E]/80 dark:bg-[#E2725B]/80 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-[#8C7A5E] dark:group-hover:bg-[#E2725B] transition-all duration-300 shadow-xl border border-white/20">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 text-white z-10 drop-shadow-lg">
                   <h3 className="font-serif text-xl">{testimonial.title}</h3>
                   <p className="font-mono text-[10px] uppercase tracking-widest text-white/80 mt-1">{testimonial.context}</p>
                </div>
              </div>

              {/* Content Section - Bottom Half */}
              <div className="h-1/2 p-8 flex flex-col justify-between bg-[#F9F5F1] dark:bg-[#1a1a1a]">
                 <div className="space-y-4">
                    <p className="text-[#1C1B1A]/80 dark:text-white/80 font-sans text-sm leading-relaxed line-clamp-3">
                      &quot;{testimonial.description}&quot;
                    </p>
                 </div>

                 <div className="flex items-center justify-between pt-4 border-t border-[#1C1B1A]/10 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      {testimonial.metrics ? (
                        <>
                          <TrendingUp className="w-4 h-4 text-[#006400] dark:text-[#4ade80]" />
                          <span className="font-bold text-sm text-[#006400] dark:text-[#4ade80]">{testimonial.metrics[0].value} Savings</span>
                        </>
                      ) : (
                         <span className="text-xs font-mono uppercase tracking-widest text-[#1C1B1A]/40 dark:text-white/40">Client Review</span>
                      )}
                    </div>
                    <Play className="w-8 h-8 p-2 border border-[#1C1B1A] dark:border-white rounded-full hover:bg-[#1C1B1A] dark:hover:bg-white hover:text-white dark:hover:text-[#1C1B1A] transition-colors cursor-pointer text-[#1C1B1A] dark:text-white" />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 flex justify-center">
            <button className="px-8 py-4 border border-[#1C1B1A] dark:border-white text-[#1C1B1A] dark:text-white font-mono text-xs uppercase tracking-widest hover:bg-[#1C1B1A] dark:hover:bg-white hover:text-white dark:hover:text-[#1C1B1A] transition-all duration-300">
                View All Testimonials
            </button>
        </div>

      </div>
    </section>
  );
};

export default CredibilityStrip;
