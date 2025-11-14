'use client'

import React from 'react';
import { motion } from 'framer-motion';

interface VideoTestimonial {
  videoUrl: string;
  title: string;
  description: string;
}

const testimonials: VideoTestimonial[] = [
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Caption_video_project-1_1__1_dbbb9822-d82e-45ee-9225-a25be9f41f0b.mp4?v=1724180981',
    title: 'Waterside Market',
    description: 'Waterside Market found the secret to keeping their flavors fresh and their kitchen efficient with VITO! Just like Chris, you can save up to 50% on cooking oil and serve up the best of the Vineyard every day.'
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Caption_video_project_1.mp4?v=1724354006',
    title: 'Good Ol Days Diner',
    description: 'Good Ol\' Days Diner welcomes Smarter Frying with VITO! They\'ve maintained the flavor of yesteryears while stepping into the future. Now, they cook that homemade taste efficiently, saving on oil costs and keeping their kitchen clean.'
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Untitled-1_17.mp4?v=1726158775',
    title: 'Nineveh Assyrian',
    description: 'Jacob from Nineveh has seen the difference VITO makes in both their food truck and restaurant kitchens! Easy to use, keeps their oil cleaner, and extends its life—helping them serve the freshest dishes every time.'
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Caption_video_project_2.mp4?v=1724179828',
    title: 'Teters Market',
    description: 'Teter\'s Market has discovered the secret for magical savings with VITO, and they\'ve nicknamed it \'The Wizard\'! Come witness the enchanting change in your kitchen and watch the oil costs drop by up to 50%.'
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Baily_Testimonial_-_Short_1_1.mp4?v=1724180955',
    title: 'Bailey Seafood',
    description: 'Freshness is king, and VITO helps us keep it fresh. Serving Buffalo\'s best seafood for decades, Bailey Seafood trusts VITO to keep top-quality food while reducing oil costs.'
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/platime_1_033ab9cd-3ced-4972-9eda-487b96bd0412.mp4?v=1724180986',
    title: 'Playtime Arcade and Bar',
    description: 'At Playtime Arcade & Bar, the fun never stops! With VITO, they\'re not just saving on cooking oil – they\'re keeping their kitchen clean and efficient, so you can enjoy your favorite snacks while diving into endless entertainment.'
  }
];

interface TestimonialVideosGridProps {
  title?: string;
  description?: string;
  showHeader?: boolean;
}

const TestimonialVideosGrid: React.FC<TestimonialVideosGridProps> = ({
  title = 'Client Testimonial Videos',
  description = 'Hear directly from clients who\'ve experienced the VITO transformation—over 70 video testimonials generated through our incentive program.',
  showHeader = true
}) => {
  // Duplicate testimonials multiple times for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];
  
  // Calculate the width of one set (6 testimonials)
  // Card width: 320px on mobile, 400px on desktop + 48px gap (wider)
  const singleSetWidth = testimonials.length * 448; // 400px width + 48px gap

  return (
    <div className="w-full bg-gray-900 py-16 md:py-20 overflow-hidden">
      {showHeader && (
        <div className="mb-12 text-center px-6 max-w-7xl mx-auto">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            {title}
          </h3>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-6">
            {description}
          </p>
          <div className="mt-8 max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl font-semibold text-white mb-4">
              Struggling to get Testimonials?
            </p>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              My results speak for themselves. If you're serious about looking like a credible and authentic business, building trust with potential clients, and showcasing real social proof that converts—let's talk about how I can help you generate authentic testimonials that drive results.
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
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[400px] lg:w-[450px] bg-white rounded-xl overflow-hidden shadow-xl border border-gray-700 hover:shadow-2xl transition-shadow"
            >
              <div className="relative aspect-[9/16] bg-black rounded-t-xl overflow-hidden">
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
              
              <div className="p-4 bg-white">
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {testimonial.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {testimonial.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialVideosGrid;

