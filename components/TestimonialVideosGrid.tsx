'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, Star } from 'lucide-react';

interface Metric {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
}

interface VideoTestimonial {
  videoUrl: string;
  title: string;
  description: string;
  clientName?: string;
  clientTitle?: string;
  company?: string;
  metrics?: Metric[];
}

const testimonials: VideoTestimonial[] = [
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Caption_video_project-1_1__1_dbbb9822-d82e-45ee-9225-a25be9f41f0b.mp4?v=1724180981',
    title: 'Waterside Market',
    description: 'Waterside Market found the secret to keeping their flavors fresh and their kitchen efficient with VITO! Just like Chris, you can save up to 50% on cooking oil and serve up the best of the Vineyard every day.',
    clientName: 'Chris',
    company: 'Waterside Market',
    metrics: [
      { value: '50%', label: 'Oil Savings', icon: TrendingUp, color: 'text-green-600' }
    ]
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Caption_video_project_1.mp4?v=1724354006',
    title: 'Good Ol Days Diner',
    description: 'Good Ol\' Days Diner welcomes Smarter Frying with VITO! They\'ve maintained the flavor of yesteryears while stepping into the future. Now, they cook that homemade taste efficiently, saving on oil costs and keeping their kitchen clean.',
    company: 'Good Ol\' Days Diner',
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Untitled-1_17.mp4?v=1726158775',
    title: 'Nineveh Assyrian',
    description: 'Jacob from Nineveh has seen the difference VITO makes in both their food truck and restaurant kitchens! Easy to use, keeps their oil cleaner, and extends its life—helping them serve the freshest dishes every time.',
    clientName: 'Jacob',
    company: 'Nineveh Assyrian',
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Caption_video_project_2.mp4?v=1724179828',
    title: 'Teters Market',
    description: 'Teter\'s Market has discovered the secret for magical savings with VITO, and they\'ve nicknamed it \'The Wizard\'! Come witness the enchanting change in your kitchen and watch the oil costs drop by up to 50%.',
    company: 'Teter\'s Market',
    metrics: [
      { value: '50%', label: 'Cost Reduction', icon: TrendingUp, color: 'text-green-600' }
    ]
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Baily_Testimonial_-_Short_1_1.mp4?v=1724180955',
    title: 'Bailey Seafood',
    description: 'Freshness is king, and VITO helps us keep it fresh. Serving Buffalo\'s best seafood for decades, Bailey Seafood trusts VITO to keep top-quality food while reducing oil costs.',
    company: 'Bailey Seafood',
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/platime_1_033ab9cd-3ced-4972-9eda-487b96bd0412.mp4?v=1724180986',
    title: 'Playtime Arcade and Bar',
    description: 'At Playtime Arcade & Bar, the fun never stops! With VITO, they\'re not just saving on cooking oil – they\'re keeping their kitchen clean and efficient, so you can enjoy your favorite snacks while diving into endless entertainment.',
    company: 'Playtime Arcade & Bar',
  }
];

interface TestimonialVideosGridProps {
  title?: string;
  description?: string;
  showHeader?: boolean;
}

const TestimonialVideosGrid: React.FC<TestimonialVideosGridProps> = ({
  title = 'Client Success Stories',
  description = 'Real results from real clients. See how our digital solutions drive measurable business outcomes.',
  showHeader = true
}) => {
  // Use testimonials without VITO (VITO has its own dedicated section)
  const allTestimonials = [...testimonials];
  
  // Duplicate testimonials multiple times for seamless infinite scroll
  const duplicatedTestimonials = [...allTestimonials, ...allTestimonials, ...allTestimonials];
  
  // Calculate the width of one set
  const singleSetWidth = allTestimonials.length * 448; // 400px width + 48px gap

  return (
    <div className="w-full bg-gray-900 py-16 md:py-20 overflow-hidden">
      {showHeader && (
        <div className="mb-12 px-6 max-w-7xl mx-auto">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 text-left">
            {title}
          </h3>
          <p className="text-lg text-gray-300 max-w-3xl mb-6 text-left">
            {description}
          </p>
          <div className="mt-8 max-w-4xl">
            <p className="text-xl md:text-2xl font-semibold text-white mb-4 text-left">
              Struggling to get Testimonials?
            </p>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed text-left">
              My results speak for themselves. If you&apos;re serious about looking like a credible and authentic business, building trust with potential clients, and showcasing real social proof that converts—let&apos;s talk about how I can help you generate authentic testimonials that drive results.
            </p>
          </div>
        </div>
      )}

      {/* Full-width edge-to-edge scrolling marquee with wider gaps */}
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex gap-12 pl-8 md:pl-12 lg:pl-16 xl:pl-20"
          animate={{
            x: [0, -singleSetWidth],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 40, // Adjust speed here (higher = slower)
              ease: 'linear',
            },
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => {
            const hasMetrics = testimonial.metrics && testimonial.metrics.length > 0;
            
            return (
              <div
                key={index}
                className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[400px] lg:w-[450px] bg-white rounded-xl overflow-hidden shadow-xl border border-gray-700 hover:shadow-2xl transition-shadow flex flex-col"
              >
                {/* 1. Video Thumbnail - Top */}
                <div className="relative aspect-[9/16] bg-black rounded-t-xl overflow-hidden flex-shrink-0">
                  <video
                    playsInline
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                  >
                    <source src={testimonial.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                {/* 2. Metrics Section - Middle (if available) */}
                {hasMetrics && (
                  <div className="px-4 py-4 bg-gradient-to-b from-gray-50 to-white border-y border-gray-200">
                    <div className={`grid ${testimonial.metrics!.length === 4 ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
                      {testimonial.metrics!.map((metric, metricIndex) => {
                        const IconComponent = metric.icon;
                        return (
                          <div key={metricIndex} className="flex items-center gap-2">
                            {IconComponent && (
                              <IconComponent className={`w-4 h-4 ${metric.color || 'text-gray-600'}`} />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className={`text-lg font-bold ${metric.color || 'text-gray-900'}`}>
                                {metric.value}
                              </div>
                              <div className="text-xs text-gray-600 leading-tight">
                                {metric.label}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {/* 3. Quote and Client Info - Bottom */}
                <div className="p-4 bg-white flex-1 flex flex-col">
                  <div className="mb-3">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      {testimonial.title}
                    </h4>
                    {(testimonial.clientName || testimonial.company) && (
                      <p className="text-xs text-gray-500 mb-2">
                        {testimonial.clientName && <span className="font-semibold">{testimonial.clientName}</span>}
                        {testimonial.clientName && testimonial.company && ' at '}
                        {testimonial.company && <span>{testimonial.company}</span>}
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">
                    {testimonial.description}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialVideosGrid;
