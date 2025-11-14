'use client'

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import TextType from './TextType';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Star, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  Play,
  User,
  Briefcase,
  Video,
  BarChart3,
  Sprout,
  Award
} from 'lucide-react';

interface VideoTestimonial {
  videoUrl: string;
  quote: string;
  clientName: string;
  clientTitle: string;
  company: string;
  type: 'executive' | 'user';
}

const vitoTestimonials: VideoTestimonial[] = [
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Caption_video_project-1_1__1_dbbb9822-d82e-45ee-9225-a25be9f41f0b.mp4?v=1724180981',
    quote: 'Complete digital transformation that eliminated customer confusion and drove unprecedented growth.',
    clientName: 'VITO Team',
    clientTitle: 'Executive Team',
    company: 'VITO Fryfilter Inc.',
    type: 'executive'
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Caption_video_project_1.mp4?v=1724354006',
    quote: 'Good Ol\' Days Diner welcomes Smarter Frying with VITO! They\'ve maintained the flavor of yesteryears while stepping into the future.',
    clientName: 'Good Ol\' Days Diner',
    clientTitle: 'Restaurant Owner',
    company: 'Good Ol\' Days Diner',
    type: 'user'
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Untitled-1_17.mp4?v=1726158775',
    quote: 'Jacob from Nineveh has seen the difference VITO makes in both their food truck and restaurant kitchens!',
    clientName: 'Jacob',
    clientTitle: 'Owner',
    company: 'Nineveh Assyrian',
    type: 'user'
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Caption_video_project_2.mp4?v=1724179828',
    quote: 'Teter\'s Market has discovered the secret for magical savings with VITO, and they\'ve nicknamed it \'The Wizard\'!',
    clientName: 'Teter\'s Market',
    clientTitle: 'Market Owner',
    company: 'Teter\'s Market',
    type: 'user'
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/Baily_Testimonial_-_Short_1_1.mp4?v=1724180955',
    quote: 'Freshness is king, and VITO helps us keep it fresh. Serving Buffalo\'s best seafood for decades.',
    clientName: 'Bailey Seafood',
    clientTitle: 'Restaurant Manager',
    company: 'Bailey Seafood',
    type: 'user'
  },
  {
    videoUrl: 'https://cdn.shopify.com/s/files/1/0004/2496/8203/files/platime_1_033ab9cd-3ced-4972-9eda-487b96bd0412.mp4?v=1724180986',
    quote: 'At Playtime Arcade & Bar, the fun never stops! With VITO, they\'re keeping their kitchen clean and efficient.',
    clientName: 'Playtime Arcade',
    clientTitle: 'Operations Manager',
    company: 'Playtime Arcade & Bar',
    type: 'user'
  }
];

const VITOCaseStudySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, vitoTestimonials.length - 1));
    setCurrentIndex(newIndex);
    if (carouselRef.current) {
      const card = carouselRef.current.children[newIndex] as HTMLElement;
      if (card) {
        const cardWidth = card.offsetWidth;
        const gap = 24; // gap-6 = 24px
        carouselRef.current.scrollTo({
          left: newIndex * (cardWidth + gap),
          behavior: 'smooth'
        });
      }
    }
  };

  const nextTestimonial = () => {
    scrollToIndex(currentIndex + 1);
  };

  const prevTestimonial = () => {
    scrollToIndex(currentIndex - 1);
  };

  // Track scroll position to update currentIndex
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const cardWidth = 400; // Approximate width including gap
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(Math.min(newIndex, vitoTestimonials.length - 1));
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <section className="relative overflow-x-hidden bg-[#f5f5f0] py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-10">
          {/* Unified Teaser Section */}
          <div className="max-w-3xl space-y-4">
            <TextType
              as="h2"
              text="VITO Fryfilter: From US Obscurity to Market Leader"
              className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1a4d3a] block text-left"
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={false}
              loop={false}
              startOnVisible={true}
            />
            <p className="text-base md:text-lg text-[#1a4d3a]/80">
              How strategic technology and narrative design turned a hidden leader into a category authority.
            </p>
          </div>

          {/* Problem Snapshot Grid */}
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
            {/* Copy */}
            <div className="space-y-4">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#1a4d3a]/70">
                Before we worked together
              </p>

              <h3 className="text-2xl md:text-3xl font-extrabold text-[#1a4d3a]">
                Before: Great Product, Almost No Digital Leverage
              </h3>

              <p className="text-base md:text-lg text-[#1a4d3a]/80">
                VITO had an incredible solution, but their online presence kept them
                hidden: an outdated site, unclear messaging, and no real path from
                attention to sales.
              </p>

              <ul className="space-y-2 text-sm md:text-base text-[#1a4d3a]/85">
                <li className="flex items-start">
                  <span className="text-[#F2611D] mr-3 font-bold mt-0.5">•</span>
                  <span>Website didn't match the quality of the product</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#F2611D] mr-3 font-bold mt-0.5">•</span>
                  <span>No clear journey from interest → demo → purchase</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#F2611D] mr-3 font-bold mt-0.5">•</span>
                  <span>Scattered brand assets and inconsistent story</span>
                </li>
              </ul>

              <div className="mt-4">
                <Link href="/projects/vito-fryfilter">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-6 py-3 text-sm font-semibold rounded-full bg-[#F2611D] text-white shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    View the full VITO case study
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.button>
                </Link>
              </div>
            </div>

           
           
           
           
           
            {/* "Before" visual */}
            <div className="relative">
              <div className="rounded-3xl border border-black/10 bg-white shadow-xl shadow-black/10 overflow-hidden">
                <div className="relative">
                  <div className="absolute top-3 right-3 text-[10px] font-bold bg-[#1a4d3a] text-white px-3 py-1 rounded-full shadow-lg z-10">
                    Before
                  </div>
                  <Image 
                    src="/vito-before-website.png" 
                    alt="VITO Fryfilter original website before redesign"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tangible Results - Full Width Green Band */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-[#1a4d3a] py-12 md:py-16"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-8">
          {/* Heading Section */}
          <header className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/60">
              VITO Fryfilter · Results
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Tangible Wins & Compounding Impact
            </h3>
            <p className="text-sm md:text-base text-white/80 max-w-3xl">
              These are the outcomes the new system delivers today—and the foundation it created for long-term, compounding growth.
            </p>
          </header>

          {/* Metrics Grid */}
          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 - Video Testimonials */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/10 rounded-lg p-5 md:p-6 text-center border border-white/20 space-y-2"
            >
              <Video className="w-8 h-8 text-[#F2611D] mx-auto" />
              <div className="text-3xl font-extrabold text-white">70+</div>
              <div className="text-white/90 font-semibold text-sm uppercase tracking-wide">
                Video Testimonials
              </div>
              <p className="text-white/70 text-sm">
                Captured from real chefs, owners, and operators.
              </p>
            </motion.div>

            {/* Card 2 - Traffic Levels */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/10 rounded-lg p-5 md:p-6 text-center border border-white/20 space-y-2"
            >
              <BarChart3 className="w-8 h-8 text-[#F2611D] mx-auto" />
              <div className="text-3xl font-extrabold text-white">Record</div>
              <div className="text-white/90 font-semibold text-sm uppercase tracking-wide">
                Traffic Levels
              </div>
              <p className="text-white/70 text-sm">
                Highest site volume in their US history.
              </p>
            </motion.div>

            {/* Card 3 - Paid Ad Spend */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white/10 rounded-lg p-5 md:p-6 text-center border border-white/20 space-y-2"
            >
              <Sprout className="w-8 h-8 text-[#F2611D] mx-auto" />
              <div className="text-3xl font-extrabold text-white">0$</div>
              <div className="text-white/90 font-semibold text-sm uppercase tracking-wide">
                Paid Ad Spend
              </div>
              <p className="text-white/70 text-sm">
                An organic engine that keeps generating new leads.
              </p>
            </motion.div>
          </div>

          {/* Philosophy Statement */}
          <p className="text-white/75 text-sm md:text-base max-w-3xl">
            I design systems that keep compounding value long after launch, so growth doesn't depend on constant campaigns—or my ongoing involvement.
          </p>
        </div>
      </motion.div>

      {/* Case Study Core Block - Grouped Sections */}
      <section className="bg-[#f0f3f1] py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-16">
          {/* The Challenge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl space-y-4"
          >
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#1a4d3a]">
              Challenge: Building Trust & Scale
            </h3>
            <p className="text-base md:text-lg text-[#1a4d3a]/80 leading-relaxed">
              When VITO Fryfilter, a successful German company, embarked on its US market entry, they were virtually invisible. Their digital presence was non-existent.
            </p>
            <p className="text-base md:text-lg text-[#1a4d3a]/80 leading-relaxed">
              They had zero credibility—going from literally 0 to 70+ video testimonials. They faced significant challenges: a terrible website, outdated branding that failed to resonate with American consumers, and just 6 Google reviews, 3 of which were internal. For their entire existence, they were effectively unknown in the competitive US market.
            </p>
            <p className="text-base md:text-lg text-[#1a4d3a]/80 leading-relaxed">
              I partnered directly with their executives to architect a new foundation for their US operation. This wasn't just a redesign; I designed and built the compounding systems they needed to build their market presence—systems that continue to generate value long after implementation:
            </p>
            <ul className="space-y-2 text-sm md:text-base text-[#1a4d3a]/85 mt-3">
              <li className="flex items-start">
                <span className="text-[#F2611D] mr-3 font-bold mt-0.5">•</span>
                <span><strong>Digital Architecture:</strong> A new, high-performance web platform engineered for the US audience.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#F2611D] mr-3 font-bold mt-0.5">•</span>
                <span><strong>Brand & Strategy:</strong> A complete visual and messaging overhaul to establish authority and trust.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#F2611D] mr-3 font-bold mt-0.5">•</span>
                <span><strong>The Credibility Engine:</strong> A proprietary, automated system I built to consistently capture authentic video testimonials from real customers, directly addressing their critical lack of social proof. This system generated 70+ video testimonials, transforming them from zero credibility to market leaders.</span>
              </li>
            </ul>
          </motion.div>

          

          {/* Credibility Engine Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 md:mt-12"
          >
            <div className="space-y-3 max-w-3xl mb-6">
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#1a4d3a]">
                Proof: A Credibility Engine with 70+ Video Testimonials
              </h3>
              <p className="text-sm md:text-base text-[#1a4d3a]/80">
                These are just a few of the customer stories recorded after the new systems rolled out.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 md:p-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1"></div>
                {/* Navigation Arrows */}
                <div className="hidden md:flex gap-2">
                  <button
                    onClick={prevTestimonial}
                    disabled={currentIndex === 0}
                    className="p-2 rounded-full bg-[#1a4d3a] text-white hover:bg-[#2a5d4a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    disabled={currentIndex >= vitoTestimonials.length - 1}
                    className="p-2 rounded-full bg-[#1a4d3a] text-white hover:bg-[#2a5d4a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Carousel Container - Show 2 videos side-by-side with peeking effect */}
              <div className="relative mt-6">
                {/* Peeking effect overlay on right */}
                <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 hidden md:block" />
                <div
                  ref={carouselRef}
                  className="flex gap-6 overflow-x-auto scroll-smooth pb-4 hide-scrollbar"
                  style={{
                    scrollSnapType: 'x mandatory',
                    scrollPaddingLeft: '0px',
                    scrollPaddingRight: '20px'
                  }}
                >
                  {vitoTestimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex-shrink-0 w-[280px] md:w-[320px] bg-[#f5f5f0] rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
                      style={{ scrollSnapAlign: 'start' }}
                    >
                      {/* Video Thumbnail - Reduced height for better carousel display */}
                      <div className="relative bg-black rounded-t-xl overflow-hidden group cursor-pointer" style={{ height: '280px' }}>
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
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>

                      {/* Quote and Client Info - More concise */}
                      <div className="p-4">
                        <p className="text-gray-700 text-sm leading-relaxed mb-3 italic line-clamp-3">
                          "{testimonial.quote}"
                        </p>
                        <div className="border-t border-gray-200 pt-3">
                          <p className="font-bold text-gray-900 text-sm">{testimonial.clientName}</p>
                          <p className="text-xs text-gray-600">
                            {testimonial.clientTitle}
                            {testimonial.company && ` • ${testimonial.company}`}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Navigation Dots */}
                <div className="md:hidden flex justify-center gap-2 mt-6">
                  {vitoTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex ? 'bg-[#F2611D]' : 'bg-gray-300'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* E. Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="py-10 max-w-3xl"
          >
            <h3 className="text-lg md:text-xl font-semibold text-[#1a4d3a] mb-4">
              Ready for similar results?
            </h3>
            <p className="text-base md:text-lg text-[#1a4d3a]/80 mb-6">
              Let's discuss your project and how we can build a strategic foundation for your growth.
            </p>
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.dispatchEvent(new CustomEvent('openContactModal'))}
                className="bg-[#F2611D] hover:bg-[#ff7a3d] text-white px-6 py-3 rounded-md font-semibold text-base transition-colors shadow-lg"
              >
                Schedule a Consultation
              </motion.button>
              <Link href="/projects/vito-fryfilter">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-[#1a4d3a] text-[#1a4d3a] hover:bg-[#1a4d3a] hover:text-white px-6 py-3 rounded-md font-semibold text-base transition-colors"
                >
                  View Case Studies
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default VITOCaseStudySection;

