import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Brain, BarChart3, Settings2, ShieldCheck, Zap } from 'lucide-react';

const TechArsenal = () => {
  const categories = [
    {
      title: 'AI & Intelligence',
      icon: Brain,
      techs: ['LLM Orchestration', 'RAG Architecture', 'Agentic Workflows', 'Claude / GPT / Gemini']
    },
    {
      title: 'Core Engineering',
      icon: Code2,
      techs: ['Go (Backend Performance)', 'Python (AI Logic)', 'TypeScript / React', 'Astro / Next.js']
    },
    {
      title: 'Automation & Scale',
      icon: BarChart3,
      techs: ['n8n Orchestration', 'PostgreSQL / Vector DBs', 'Docker / Cloud Infrastructure', 'High-Concurrency Systems']
    }
  ];

  return (
    <section id="tech-stack" className="bg-[#FAF9F6] section-padding border-t-2 border-[#8C7A5E]/20 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="font-mono text-[10px] text-[#8C7A5E] uppercase tracking-[0.4em] block mb-4 font-bold">THE SPECIFICATION</span>
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-[#4A1010] tracking-tighter ink-bleed uppercase italic">Architectural Stack</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {categories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-8 p-8 border border-[#8C7A5E]/10 bg-white/5 backdrop-blur-sm relative group"
            >
              <div className="absolute top-0 left-0 w-8 h-px bg-[#8C7A5E]/30 group-hover:w-full transition-all duration-500"></div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#8C7A5E]/10 rounded-full">
                  <category.icon className="w-5 h-5 text-[#8C7A5E]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1C1B1A] uppercase tracking-wide">{category.title}</h3>
              </div>

              <ul className="space-y-4">
                {category.techs.map((tech) => (
                  <li key={tech} className="flex items-center gap-3 group/item">
                    <span className="w-1.5 h-1.5 bg-[#8C7A5E]/40 group-hover/item:bg-[#4A1010] transition-colors rotate-45"></span>
                    <span className="font-mono text-[11px] text-[#1C1B1A]/70 uppercase tracking-widest font-bold group-hover/item:text-[#1C1B1A] transition-colors">
                      {tech}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 pt-10 border-t border-[#8C7A5E]/20 text-center"
        >
           <p className="font-serif italic text-[#8C7A5E] text-base md:text-lg">
              &quot;Don&apos;t see your stack? I love learning new tools—let&apos;s chat.&quot;
           </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TechArsenal;
