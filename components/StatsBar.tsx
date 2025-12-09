'use client'

import React from 'react';
import { motion, useSpring, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { TrendingUp, Award, Zap } from 'lucide-react';

const Counter = ({ value }: { value: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const displayValue = useSpring(spring);

  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [inView, spring, value]);

  const [currentValue, setCurrentValue] = React.useState(0);

  useEffect(() => {
    return displayValue.on("change", (latest) => {
      setCurrentValue(Math.round(latest));
    });
  }, [displayValue]);

  return <span ref={ref}>{currentValue}</span>;
};

const StatsBar = () => {
  const stats = [
    { value: 70, suffix: '+', label: 'Projects Delivered', subLabel: 'Projects shipped', icon: Zap, color: 'text-[#E2725B]' },
    { value: 6, suffix: 'yrs', label: 'Engineering Excellence', subLabel: 'Years building', icon: Award, color: 'text-[#006400]' },
    { value: 285, suffix: '%', label: 'Client Growth', subLabel: 'Avg lift / best lift', icon: TrendingUp, color: 'text-[#800000]' }
  ];

  return (
    <section className="relative bg-[#F8F4F0] dark:bg-[#0A1F1C] border-b border-[#1C1B1A]/10 dark:border-white/10 py-16 md:py-24 overflow-hidden transition-colors duration-300">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #1a4d3a 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                className="group relative bg-white dark:bg-[#1a1a1a] p-8 border border-[#1C1B1A]/10 dark:border-white/10 shadow-sm hover:shadow-[8px_8px_0px_0px_rgba(28,27,26,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:border-[#1C1B1A] dark:hover:border-white transition-all duration-300 flex flex-col justify-between min-h-[240px]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-4 rounded-sm bg-[#F9F5F1] dark:bg-[#2a2a2a] group-hover:bg-[#1C1B1A] dark:group-hover:bg-white transition-colors duration-300 shadow-inner`}>
                    <Icon className={`w-8 h-8 ${stat.color} group-hover:text-white dark:group-hover:text-[#1C1B1A] transition-colors duration-300`} strokeWidth={1.5} />
                  </div>
                  <div className="font-mono text-xs text-[#1C1B1A]/40 dark:text-white/40 uppercase tracking-widest font-semibold">
                    STAT.0{index + 1}
                  </div>
                </div>

                <div className="relative">
                  <div className="text-6xl lg:text-7xl font-serif font-medium text-[#1C1B1A] dark:text-white mb-2 flex items-baseline tracking-tight">
                    <Counter value={stat.value} />
                    <span className="text-4xl text-[#E2725B] ml-1 font-light">{stat.suffix}</span>
                  </div>
                  <h3 className="text-lg font-sans font-bold text-[#1C1B1A] dark:text-white uppercase tracking-wide">
                    {stat.label}
                  </h3>
                  <p className="text-xs font-mono text-[#1C1B1A]/60 dark:text-white/60 mt-2 border-t border-[#1C1B1A]/10 dark:border-white/10 pt-2 inline-block w-full">
                    {stat.subLabel}
                  </p>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-[#E2725B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
