import React from 'react';
import { motion } from 'framer-motion';

const TrustBar = () => {
  const brands = [
    "VITO Fryfilter",
    "Rugged Red",
    "Furniture Packages USA",
    "Waterside Market",
    "Teter's Market",
    "Good Ol' Days Diner"
  ];

  return (
    <section 
      className="bg-[#FAF9F6] border-b border-[#8C7A5E]/20 py-8 relative transition-colors duration-300" 
    >
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border border-[#8C7A5E]/20">
                {brands.map((brand, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="p-6 text-center font-serif text-xs md:text-sm text-[#1C1B1A]/60 italic border-r border-b border-[#8C7A5E]/10 last:border-r-0 hover:bg-[#8C7A5E]/5 transition-colors"
                    >
                        {brand}
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default TrustBar;

