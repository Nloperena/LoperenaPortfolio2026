import React from 'react';
import { ArrowUpRight, Cpu } from 'lucide-react';

interface CADProjectCardProps {
  title: string;
  fig: string;
  scale?: string;
  icon?: React.ElementType;
}

export default function CADProjectCard({ title, fig, scale = "1:1", icon: Icon = Cpu }: CADProjectCardProps) {
  return (
    <div className="group relative w-full aspect-[16/9] bg-[#F0EBE5] overflow-hidden border border-[#1C1B1A]/10 hover:border-[#4A0E1B]/30 transition-colors duration-500 shadow-md hover:shadow-lg rounded-sm">
      
      {/* 1. THE CAD GRID BACKGROUND (Light Technical Look) with Crosshairs */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#8C7A5E 1px, transparent 1px), linear-gradient(90deg, #8C7A5E 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>
      
      {/* 2. THE FLOATING UI (Measurements) */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-[#8C7A5E] tracking-widest flex gap-4 z-20 bg-white/90 px-2 py-1 shadow-sm border border-[#1C1B1A]/5">
        <span className="text-[#4A0E1B] font-bold">{fig}</span>
        <span>{'//'} {title.toUpperCase().replace(/\s+/g, '_')}</span>
        <span>SCALE: {scale}</span>
      </div>
      
      {/* 3. THE CENTERPIECE (The Schematic Device Mockup) */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* The "Device" Box - simulating a screen */}
        <div className="relative w-3/5 h-3/4 bg-white border border-[#1C1B1A]/20 shadow-xl transform group-hover:scale-105 transition-transform duration-700 flex flex-col rounded-sm overflow-hidden">
           
           {/* Browser Header */}
           <div className="h-6 bg-[#F5F5F5] border-b border-[#1C1B1A]/10 flex items-center px-2 gap-1">
             <div className="w-2 h-2 rounded-full bg-[#FF5F57]"></div>
             <div className="w-2 h-2 rounded-full bg-[#FFBD2E]"></div>
             <div className="w-2 h-2 rounded-full bg-[#28C940]"></div>
           </div>

           {/* Screen Content Area */}
           <div className="flex-1 relative bg-gradient-to-br from-white to-[#F9F5F1] flex items-center justify-center p-8 overflow-hidden">
              
              {/* Decorative Abstract Shapes */}
              <div className="absolute inset-0 opacity-10">
                 <div className="absolute top-10 left-10 w-20 h-20 border border-[#1C1B1A] rounded-full"></div>
                 <div className="absolute bottom-10 right-10 w-32 h-32 border border-[#E2725B] rounded-full"></div>
              </div>

              {/* Main Icon */}
              <div className="relative z-10 text-[#1C1B1A]/80 group-hover:text-[#E2725B] transition-colors duration-500">
                <Icon size={48} strokeWidth={1.5} />
              </div>

              {/* Code Overlay */}
              <div className="absolute bottom-4 right-4 font-mono text-[8px] text-[#1C1B1A]/30 leading-tight text-right">
                 <div>import &#123; Future &#125; from &apos;legacy&apos;;</div>
                 <div>export default function Scale() &#123;</div>
                 <div>&nbsp;&nbsp;return &lt;Growth /&gt;;</div>
                 <div>&#125;</div>
              </div>
           </div>
        </div>
      </div>

      {/* 4. THE HOVER REVEAL */}
      <div className="absolute inset-0 bg-[#F8F4F0]/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm z-30">
        <button className="flex items-center gap-3 text-[#4A0E1B] border border-[#4A0E1B] px-6 py-3 hover:bg-[#4A0E1B] hover:text-[#F8F4F0] transition-all shadow-sm">
          <span className="font-mono text-xs uppercase tracking-widest font-bold">Analyze Blueprint</span>
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* 5. DECORATIVE DATA STREAM */}
      <div className="absolute bottom-4 right-4 text-right font-mono text-[9px] text-[#8C7A5E]/60 leading-tight z-20">
        <p>STATUS::OPTIMIZED</p>
        <p>RENDER::60FPS</p>
      </div>
    </div>
  );
}
