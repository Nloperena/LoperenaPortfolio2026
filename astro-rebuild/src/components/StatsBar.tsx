import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useInView } from 'framer-motion';
import { Zap, Award, TrendingUp } from 'lucide-react';

const Counter = ({ value }: { value: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [inView, spring, value]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      setCurrentValue(Math.round(latest));
    });
  }, [spring]);

  return <span ref={ref}>{currentValue}</span>;
};

const StatsBar = () => {
  const stats = [
    { value: 10, suffix: '+', label: 'Years Experience', subLabel: 'Precision Digital Craft', icon: Zap },
    { value: 2, suffix: 'M+', label: 'ARR Generated', subLabel: 'Scalable Growth Impact', icon: Award },
    { value: 50, suffix: '+', label: 'Systems Delivered', subLabel: 'Autonomous Foundations', icon: TrendingUp }
  ];

  return (
    <section className="relative bg-[#1A2F28] border-b border-[#8C7A5E]/30 section-padding overflow-hidden">
      {/* Ledger Line Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
           style={{ backgroundImage: 'linear-gradient(#FAF9F6 0.5px, transparent 0.5px), linear-gradient(90deg, #FAF9F6 0.5px, transparent 0.5px)', backgroundSize: '60px 60px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#8C7A5E]/30">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`group relative p-10 flex flex-col justify-between min-h-[240px] border-[#8C7A5E]/20 ${index < 2 ? 'md:border-r' : ''} ${index < stats.length - 1 ? 'border-b md:border-b-0' : ''}`}
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="p-3 bg-[#FAF9F6]/10 rounded-full border border-[#FAF9F6]/20 transition-all group-hover:bg-[#FAF9F6]/20">
                    <Icon className="w-5 h-5 text-[#FAF9F6]" strokeWidth={1.5} />
                  </div>
                  <div className="font-mono text-[10px] text-[#FAF9F6]/40 uppercase tracking-[0.3em] font-bold">
                    RECORD.0{index + 1}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-6xl font-serif font-bold text-[#FAF9F6] flex items-baseline tracking-tighter ink-bleed">
                    <Counter value={stat.value} />
                    <span className="text-2xl text-[#8C7A5E] ml-1 font-light italic">{stat.suffix}</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-mono font-bold text-[#FAF9F6] uppercase tracking-widest">
                      {stat.label}
                    </h3>
                    <p className="text-[10px] font-serif text-[#FAF9F6]/60 italic leading-tight tracking-widest uppercase">
                      {stat.subLabel}
                    </p>
                  </div>
                </div>
                
                {/* Decorative corner mark */}
                <div className="absolute bottom-4 right-4 w-3 h-3 border-r border-b border-[#8C7A5E]/30 group-hover:border-[#FAF9F6]/40 transition-colors" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
