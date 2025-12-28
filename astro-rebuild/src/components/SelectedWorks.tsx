import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Monitor, Info } from 'lucide-react';

const projects = [
  {
    id: 'rugged-red',
    title: 'RuggedRed',
    role: 'Lead Architect',
    year: '2024',
    outcome: 'High-Concurrency Commerce Scale',
    challenge: 'Outdated platform reliant on ads, with critical performance bottlenecks.',
    craft: 'Architected a scalable headless ecosystem using React, AWS, and custom analytics.',
    result: '+41% Organic Revenue Growth. Transformed legacy infrastructure into a high-performance growth engine without advertising expenditure.',
    image: '/RuggedRed.png',
    demoLink: 'https://ruggedred.com',
    embedUrl: 'https://ruggedred.com'
  },
  {
    id: 'forza-adhesives',
    title: 'Forza Adhesives',
    role: 'Digital Architect & Partner',
    year: '2025',
    outcome: 'Industrial Scale E-Commerce',
    challenge: 'Forza needed a digital home that matched the strength and reliability of their industrial adhesives.',
    craft: 'We designed a high-speed storefront that feels as premium as the products themselves, making complex ordering feel effortless.',
    result: 'A digital foundation that transformed a complex catalog into an industry-leading commerce experience.',
    image: '/ForzaPreview.png',
    demoLink: 'https://forza-built-com.vercel.app',
    embedUrl: 'https://forza-built-com.vercel.app'
  },
  {
    id: 'vito-shop',
    title: 'VITO Fryfilter',
    role: 'Architect & Partner',
    year: '2024',
    outcome: 'Surgical Digital Presence',
    challenge: 'Helping a legacy brand find its footing in a digital-first market.',
    craft: 'We built a bridge between traditional sales and modern e-commerce, opening doors to global partners like McDonald’s.',
    result: '584% Increase in Engagement and 19% revenue growth; secured partnerships with major QSR brands like McDonald\'s.',
    image: '/VITOShop.png',
    demoLink: 'https://shop.vitofryfilter.com'
  },
  {
    id: 'loperena-lineage',
    title: 'Loperena Lineage',
    role: 'Architect & Partner',
    year: '2025',
    outcome: 'Foundational Trust Architecture',
    challenge: 'Documenting and architecting a digital lineage spanning centuries of engineering heritage.',
    craft: 'Archival data structure integrated within a neoclassical architectural interface.',
    result: 'Historical Preservation secured via a permanent digital repository of heritage and structural foundations.',
    image: '/LineagePreview.png',
    demoLink: 'https://loperena-lineage.vercel.app',
    embedUrl: 'https://loperena-lineage.vercel.app'
  }
];

const ArchivalViewer = ({ url, title }: { url: string, title: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.01 }}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      className="relative w-full shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] border-2 border-[#8C7A5E]/20 rounded-sm bg-[#1C1B1A] overflow-hidden group transition-all duration-500 hover:shadow-[0_60px_120px_-20px_rgba(0,0,0,0.4)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Control Bar */}
      <div className="h-10 bg-[#2A2826] border-b border-[#8C7A5E]/20 flex items-center justify-between px-4">
         <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
               <div className="w-2.5 h-2.5 rounded-full bg-[#4A1010]/40 border border-[#4A1010]/20"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-[#8C7A5E]/40 border border-[#8C7A5E]/20"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-[#B87333]/40 border border-[#B87333]/20"></div>
            </div>
            <span className="font-mono text-[9px] text-[#8C7A5E]/60 uppercase tracking-[0.2em] ml-3">OPERATIONAL.ARTIFACT</span>
         </div>
         <div className="flex items-center gap-3">
            <span className="font-mono text-[8px] text-[#8C7A5E]/40 uppercase tracking-widest hidden md:block">{title}</span>
            <Monitor size={12} className="text-[#8C7A5E]/40" />
         </div>
      </div>

      <div className="relative aspect-[4/5] w-full overflow-hidden">
        {/* Physical Artifact Inner Border */}
        <div className="absolute inset-0 z-30 pointer-events-none border-[12px] border-[#1C1B1A]/10"></div>
        
        {/* Viewport Filters (Overlays) */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply"></div>
        <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.4)]"></div>
        
        {/* Scanlines Overlay */}
        <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.03)_50%),linear-gradient(90deg,rgba(255,0,0,0.005),rgba(0,255,0,0.005),rgba(0,0,255,0.005))] bg-[length:100%_2px,3px_100%]"></div>

        <iframe 
          src={url} 
          className="w-full h-full border-none relative z-10"
          title={`${title} Live Embed`}
          loading="lazy"
          style={{ filter: 'contrast(1.08) brightness(0.96) saturate(0.9)' }}
        ></iframe>

        {/* Operability Message */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
        >
          <div className="bg-[#1C1B1A]/90 backdrop-blur-md border border-[#8C7A5E]/40 px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl">
             <Info size={10} className="text-[#8C7A5E]" />
             <span className="font-mono text-[8px] text-[#8C7A5E] uppercase tracking-[0.2em] font-bold">Always Online & Ready to Help</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const SelectedWorks = () => {
  return (
    <section id="selected-works" className="bg-[#FAF9F6] section-padding relative border-b double-line border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 border-b border-[#8C7A5E]/20 pb-12 flex flex-col md:flex-row justify-between items-end gap-8"
        >
          <div className="space-y-4">
            <span className="font-mono text-[10px] text-[#4A1010] uppercase tracking-[0.4em] block font-bold">PORTFOLIO.ARCHIVE</span>
            <h2 className="font-serif text-5xl md:text-7xl font-bold text-[#4A1010] tracking-tighter ink-bleed uppercase">Sustainable Artifacts</h2>
          </div>
          <p className="font-serif italic text-[#8C7A5E] text-base md:text-xl max-w-md text-right leading-relaxed">
            &quot;A collection of digital foundations we built for endurance and shared success.&quot;
          </p>
        </motion.div>

        <div className="space-y-48">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center border-b border-[#8C7A5E]/10 pb-48 last:border-0"
            >
              <div className={`space-y-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center justify-between border-b border-[#8C7A5E]/10 pb-6">
                  <span className="font-serif italic text-[#8C7A5E] text-2xl tracking-tight">{project.year}</span>
                  <span className="font-mono text-[10px] text-[#8C7A5E]/40 uppercase tracking-[0.3em] font-bold">SPECIMEN.0{index + 1}</span>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-serif text-5xl md:text-6xl font-bold text-[#4A1010] tracking-tight ink-bleed uppercase">{project.title}</h3>
                  <div className="inline-block px-4 py-1.5 bg-[#8C7A5E]/10 text-[#8C7A5E] font-mono text-[10px] uppercase tracking-[0.2em] border border-[#8C7A5E]/20 font-bold">
                    {project.role}
                  </div>
                </div>

                <div className="space-y-10">
                  <p className="font-serif text-2xl md:text-4xl font-bold text-[#1A2F28] leading-tight italic tracking-tight">
                    {project.outcome}
                  </p>
                  
                  <div className="grid grid-cols-1 gap-10 text-lg font-serif leading-[1.8]">
                    <div className="space-y-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#8C7A5E] font-bold">I. THE PARTNERSHIP</span>
                      <p className="text-[#1C1B1A]/80 italic">{project.challenge}</p>
                    </div>
                    <div className="space-y-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#1A2F28] font-bold">II. THE SOLUTION</span>
                      <p className="text-[#1C1B1A]/80 italic">{project.craft}</p>
                    </div>
                    <div className="space-y-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#4A1010] font-bold">III. THE SUCCESS</span>
                      <p className="text-[#1C1B1A] font-bold italic border-l-2 border-[#4A1010]/20 pl-6">{project.result}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-8">
                  <a 
                    href={project.demoLink}
                    target="_blank"
                    className="inline-flex items-center gap-4 px-12 py-6 bg-[#1A2F28] text-[#FAF9F6] font-serif text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#4A1010] transition-all border border-[#8C7A5E]/20 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-2xl active:scale-[0.98]"
                  >
                    Explore Archive <ArrowRight size={16} />
                  </a>
                </div>
              </div>

              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                {project.embedUrl ? (
                  <ArchivalViewer url={project.embedUrl} title={project.title} />
                ) : (
                  <motion.div 
                    whileHover={{ y: -10, scale: 1.01 }}
                    transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                    className={`relative group bg-[#1C1B1A] p-4 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] border-2 border-[#8C7A5E]/20 transition-all duration-700 hover:shadow-[0_60px_120px_-20px_rgba(0,0,0,0.4)] ${index % 2 === 0 ? 'lg:rotate-1' : 'lg:-rotate-1'}`}
                  >
                    {/* Physical Artifact Inner Border */}
                    <div className="absolute inset-4 z-20 pointer-events-none border-2 border-[#FAF9F6]/10"></div>
                    
                    {/* Viewfinder Frame */}
                    <div className="absolute top-10 left-10 w-10 h-10 border-l-2 border-t-2 border-[#FAF9F6]/20 z-30"></div>
                    <div className="absolute top-10 right-10 w-10 h-10 border-r-2 border-t-2 border-[#FAF9F6]/20 z-30"></div>
                    <div className="absolute bottom-10 left-10 w-10 h-10 border-l-2 border-b-2 border-[#FAF9F6]/20 z-30"></div>
                    <div className="absolute bottom-10 right-10 w-10 h-10 border-r-2 border-b-2 border-[#FAF9F6]/20 z-30"></div>
                    
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover aspect-[4/5] filter grayscale-[0.3] sepia-[0.15] contrast-[1.1] brightness-[0.9] group-hover:grayscale-0 group-hover:sepia-0 group-hover:brightness-100 transition-all duration-700 opacity-90 group-hover:opacity-100 shadow-inner"
                    />
                    
                    {/* Overlay Texture */}
                    <div className="absolute inset-4 pointer-events-none z-10 border border-[#FAF9F6]/5 bg-gradient-to-tr from-black/20 to-transparent"></div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectedWorks;
