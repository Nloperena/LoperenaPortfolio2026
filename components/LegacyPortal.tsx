'use client';

import { motion } from 'framer-motion';

const timelineData = [
  { year: '1685', name: 'Diego', title: 'The Root', location: 'Navarre' },
  { year: '1750', name: 'Pedro Juan', title: 'The Immigrant', location: 'Puerto Rico' },
  { year: '1833', name: 'Manuel', title: 'Criollo', location: 'Moca' },
  { year: '1865', name: 'Félix Antonio', title: 'The Landowner', location: '& Conti' },
  { year: '1939', name: 'Hipólito Sr.', title: 'The Anchor', location: '' },
  { year: '2024', name: 'RuggedRed', title: 'deployment', location: 'Record revenue quarter' },
  { year: '2025 →', name: 'Nicholas & William', title: 'Standard Bearers', location: 'Available' }
];

const LegacyPortal = () => {
  return (
    <section className="w-full bg-[#F8F4F0] py-24 relative overflow-hidden font-serif text-[#1C1B1A]">
       
       {/* Header */}
       <div className="text-center mb-16">
          <p className="font-mono text-sm tracking-widest text-[#1C1B1A]/70 uppercase mb-2">The Loperena Lineage</p>
          <p className="text-[#1C1B1A]/60 text-sm italic font-serif">est. 1685 – present day</p>
       </div>

       <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
          {/* Desktop Line */}
          <div className="absolute top-[5.5rem] left-12 right-12 h-px bg-[#8C7A5E]/70 shadow-[0_0_4px_rgba(140,122,94,0.3)] hidden md:block"></div>

          <div className="grid grid-cols-1 md:grid-cols-9 gap-12 md:gap-2 text-center">
             {timelineData.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex flex-col items-center group cursor-default"
                >
                   {/* Year */}
                   <div className="mb-6 font-mono text-xs tracking-[0.15em] text-[#1C1B1A]/80 hidden md:block">
                      {item.year}
                   </div>

                   {/* Dot */}
                   <div className="w-[10px] h-[10px] bg-[#8C7A5E] rounded-full border border-[#1C1B1A] relative z-20 transition-all duration-300 group-hover:bg-[#49111C] group-hover:scale-[1.4] group-hover:border-none shadow-sm mb-4">
                   </div>
                   
                   {/* Vertical line for mobile */}
                   <div className="absolute top-4 left-1/2 w-px h-16 bg-[#8C7A5E]/40 -translate-x-1/2 md:hidden"></div>
                   
                   {/* Mobile Year */}
                   <div className="font-mono text-xs tracking-[0.15em] text-[#1C1B1A]/80 md:hidden mb-2">
                      {item.year}
                   </div>

                   {/* Content */}
                   <div className="flex flex-col gap-1 px-1">
                      <h3 className="font-serif text-[1rem] md:text-[1.1rem] leading-tight text-[#1C1B1A]">
                        {item.name}
                      </h3>
                      <p className="font-serif italic text-xs text-[#1C1B1A]/70">
                         {item.title}
                      </p>
                      {item.location && (
                        <p className="font-sans text-[0.6rem] uppercase tracking-wider text-[#1C1B1A]/50 mt-2 leading-snug">
                           {item.location}
                        </p>
                      )}
                   </div>
                </motion.div>
             ))}
          </div>
       </div>

       {/* Micro-copy */}
       <div className="text-center mt-20">
          <p className="font-mono text-xs tracking-widest text-[#1C1B1A]/50 uppercase">
            Nine generations of builders. One continuous standard.
          </p>
       </div>
    </section>
  );
};

export default LegacyPortal;
