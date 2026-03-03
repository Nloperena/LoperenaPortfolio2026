import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Briefcase, Cloud, Cpu, Globe, X, Database, Network } from 'lucide-react';
import { track } from '../utils/analytics';
import {
  sectionSequence,
  drawLineX,
  drawLineY,
  stampUp,
  VIEWPORT_ONCE,
} from '../utils/motionBlueprint';

const WebAppMockup = ({ isBefore }: { isBefore?: boolean }) => {
  return (
    <div className="absolute inset-[-28px] bg-white border-t border-l border-[#D8D4CC] shadow-[-8px_8px_32px_rgba(44,42,39,0.05)] overflow-hidden flex flex-col min-w-[500px]" style={{ borderRadius: '8px 0 0 8px', willChange: "transform" }}>
      <div className="h-12 bg-[#F9F9F8] border-b border-[#D8D4CC] flex items-center px-6 gap-4 shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#D8D4CC]"></div>
          <div className="w-3 h-3 rounded-full bg-[#D8D4CC]"></div>
          <div className="w-3 h-3 rounded-full bg-[#D8D4CC]"></div>
        </div>
        <div className="flex-1 bg-white rounded-md h-7 border border-[#D8D4CC] flex items-center justify-center text-[10px] font-mono text-[#7A7670] shadow-sm max-w-sm mx-4">yourstore.com</div>
      </div>
      <div className="h-6 bg-[#F9F9F8] border-b border-[#D8D4CC] w-full flex items-center px-4 shrink-0">
         <div className="h-2.5 w-[94%] bg-[#22C55E] rounded-sm flex items-center px-2">
            <span className="text-[8px] text-white font-bold tracking-wider uppercase">● PAGESPEED 94</span>
         </div>
      </div>
      <div className="flex-1 flex flex-col relative bg-white overflow-hidden p-16 pb-20">
        <div className={`transition-opacity duration-500 z-0 ${isBefore ? 'opacity-20' : 'opacity-100'}`}>
          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1]}} style={{ willChange: "transform, opacity" }}>
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] text-[#2C2A27] leading-[0.85]" style={{ fontFamily: '"Playfair Display", "Fraunces", serif', fontStyle: 'italic' }}>SHOP.<br/>FAST.</h1>
          </motion.div>
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.5}} className="mt-8" style={{ willChange: "opacity" }}>
             <button className="bg-[#2C2A27] text-white px-8 py-4 font-mono text-[10px] uppercase tracking-widest font-bold">Start Shopping →</button>
          </motion.div>
        </div>

        {isBefore && (
           <div className="absolute inset-0 bg-white/40 flex flex-col p-16 gap-6 z-10 backdrop-blur-[2px]">
              <div className="w-[80%] h-24 bg-gradient-to-r from-[#EEEAE3] to-[#E4E0D8] animate-pulse rounded-lg opacity-80"></div>
              <div className="w-[40%] h-12 bg-gradient-to-r from-[#EEEAE3] to-[#E4E0D8] animate-pulse rounded-lg opacity-80 mt-4"></div>
           </div>
        )}

        {!isBefore && (
           <motion.div 
             initial={{opacity: 0, scale: 0.95}} 
             animate={{opacity: 1, scale: 1}} 
             transition={{delay: 0.8}} 
             className="absolute bottom-8 left-8 bg-[#1A1A18] text-white px-6 py-5 rounded-xl z-20 flex flex-col shadow-2xl"
           >
              <span className="text-[52px] font-bold leading-none font-mono">0.6s</span>
              <span className="text-[9px] tracking-widest uppercase mt-2 text-white/70">LOAD TIME</span>
           </motion.div>
        )}
      </div>
    </div>
  );
};

const AIChatMockup = () => {
  return (
    <div className="absolute inset-[-28px] pointer-events-none">
       {/* Chat Window */}
       <div className="absolute top-[24px] left-[28px] w-[340px] min-h-[280px] bg-[#FFFFFF] border border-[#D8D4CC] rounded-xl flex flex-col shadow-sm pb-[44px] pointer-events-auto overflow-hidden">
          <div className="p-[20px] flex flex-col flex-1 relative gap-5">
             <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2}} className="self-end bg-[#E2DDD6] text-[#2C2A27] px-4 py-3 rounded-2xl rounded-tr-sm text-sm font-sans shadow-sm max-w-[85%]" style={{ willChange: "transform, opacity" }}>
                How do I integrate the new fulfillment API?
             </motion.div>
             
             <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: 2.1}} className="self-start flex gap-3 items-start relative mt-2" style={{ willChange: "transform, opacity" }}>
                <div className="relative w-8 h-8 rounded-full bg-[#2C2A27] text-white flex items-center justify-center shrink-0 shadow-md">
                   <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#22C55E] rounded-full border-[1.5px] border-white"></div>
                   <Cpu size={14} />
                </div>
                <div className="bg-white border border-[#D0CBC2] px-4 py-3 rounded-2xl rounded-tl-sm text-sm shadow-sm font-sans text-[#2C2A27] max-w-[85%] leading-relaxed">
                   I found 3 relevant endpoints in the documentation. I have drafted a Node.js implementation for the webhook listener<motion.span animate={{opacity: [1, 0, 1]}} transition={{repeat: Infinity, duration: 1}} className="inline-block w-[1.5px] h-[14px] bg-[#2C2A27] ml-[3px] align-middle" />
                </div>
             </motion.div>
          </div>

          {/* Input bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[44px] border-t border-[#E8E4DC] flex items-center justify-between px-4 bg-[#FFFFFF]">
             <span className="text-[#9A9690] italic text-sm font-sans">Ask anything...</span>
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A7670" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </div>
       </div>

       {/* Source Docs */}
       <div className="absolute top-[24px] right-[28px] w-[200px] flex flex-col gap-2 pointer-events-auto">
          <motion.div initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} transition={{delay: 2.3}} className="bg-[#FFFFFF] border border-[#D8D4CC] p-[12px_14px] rounded-lg shadow-sm" style={{ willChange: "transform, opacity" }}>
             <div className="text-[10px] font-mono font-bold text-[#2C2A27] mb-1 tracking-widest">94% MATCH</div>
             <div className="text-[13px] font-medium text-[#2C2A27]">API Docs v3.2</div>
          </motion.div>
          <motion.div initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} transition={{delay: 2.4}} className="bg-[#FFFFFF] border border-[#D8D4CC] p-[12px_14px] rounded-lg shadow-sm" style={{ willChange: "transform, opacity" }}>
             <div className="text-[10px] font-mono font-bold text-[#2C2A27] mb-1 tracking-widest">82% MATCH</div>
             <div className="text-[13px] font-medium text-[#2C2A27]">Webhooks Guide</div>
          </motion.div>
          <motion.div initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} transition={{delay: 2.5}} className="bg-[#FFFFFF] border border-[#D8D4CC] p-[12px_14px] rounded-lg shadow-sm" style={{ willChange: "transform, opacity" }}>
             <div className="text-[10px] font-mono font-bold text-[#2C2A27] mb-1 tracking-widest">71% MATCH</div>
             <div className="text-[13px] font-medium text-[#2C2A27]">Onboarding FAQ</div>
          </motion.div>
       </div>
    </div>
  );
};

const NodeCard = ({ x, y, title, icon: Icon, dark = false, isCdn = false, delay = 0 }: any) => (
   <motion.div 
      initial={{scale: 0}} animate={{scale: 1}} transition={{type: "spring", delay}}
      className={`absolute w-[72px] h-[72px] rounded-[10px] border ${dark ? 'bg-[#2C2A27] border-[#2C2A27] text-white' : 'bg-white border-[#D0CBC2] text-[#2C2A27]'} flex flex-col items-center justify-center shadow-sm z-10`} 
      style={{ left: x - 36, top: y - 36 }}
   >
      <div className="absolute top-2 right-2 flex items-center gap-1">
         <div className={`w-1.5 h-1.5 rounded-full ${isCdn ? 'bg-[#4ADE80]' : 'bg-[#22C55E]'}`}></div>
         <span className={`text-[6px] font-mono font-bold tracking-widest ${isCdn ? 'text-[#4ADE80]' : 'text-[#22C55E]'}`}>HEALTHY</span>
      </div>
      <Icon size={24} className="mb-1 mt-2" strokeWidth={1.5} />
      <span className="text-[9px] font-mono tracking-widest uppercase text-center leading-none">{title}</span>
   </motion.div>
);

const CloudDiagram = () => {
  return (
    <div className="absolute inset-[-28px] overflow-hidden flex flex-col">
       {/* Dot grid */}
       <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
         <pattern id="dotGridCloud" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
           <circle cx="1" cy="1" r="1" fill="#C8C4BC" fillOpacity="0.4" />
         </pattern>
         <rect x="0" y="0" width="100%" height="100%" fill="url(#dotGridCloud)" />
       </svg>

       <div className="flex-1 relative w-full h-full flex items-center justify-center pb-[48px]">
          <div className="relative w-[540px] h-[340px]">
             <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 540 340">
                <path id="p-user-cdn" d="M 40 60 L 124 60" stroke="#C8C4BC" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                <circle r="3" fill="#2C2A27"><animateMotion dur="2s" repeatCount="indefinite" path="M 40 60 L 124 60" begin="0s" /></circle>
                
                <path id="p-cdn-lb" d="M 196 60 L 304 60" stroke="#C8C4BC" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                <circle r="3" fill="#2C2A27"><animateMotion dur="2s" repeatCount="indefinite" path="M 196 60 L 304 60" begin="0.4s" /></circle>

                <path id="p-lb-app1" d="M 340 96 L 340 120 L 220 120 L 220 144" stroke="#C8C4BC" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                <circle r="3" fill="#2C2A27"><animateMotion dur="2s" repeatCount="indefinite" path="M 340 96 L 340 120 L 220 120 L 220 144" begin="0.8s" /></circle>

                <path id="p-lb-app2" d="M 340 96 L 340 120 L 460 120 L 460 144" stroke="#C8C4BC" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                <circle r="3" fill="#2C2A27"><animateMotion dur="2s" repeatCount="indefinite" path="M 340 96 L 340 120 L 460 120 L 460 144" begin="1s" /></circle>

                <path id="p-app1-db" d="M 220 216 L 220 260 L 340 260 L 340 264" stroke="#C8C4BC" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                <circle r="3" fill="#2C2A27"><animateMotion dur="2s" repeatCount="indefinite" path="M 220 216 L 220 260 L 340 260 L 340 264" begin="1.2s" /></circle>

                <path id="p-app2-db" d="M 460 216 L 460 260 L 340 260 L 340 264" stroke="#C8C4BC" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                <circle r="3" fill="#2C2A27"><animateMotion dur="2s" repeatCount="indefinite" path="M 460 216 L 460 260 L 340 260 L 340 264" begin="1.4s" /></circle>
             </svg>

             <div className="absolute top-[54px] left-[0px] font-mono text-[9px] font-bold text-[#7A7670] tracking-widest bg-[#E4E0D8] px-1 z-10">USER</div>

             <NodeCard x={160} y={60} title="CDN EDGE" icon={Globe} dark isCdn delay={0.1} />
             <NodeCard x={340} y={60} title={<>LOAD<br/>BALANCER</>} icon={Network} delay={0.3} />
             <NodeCard x={220} y={180} title={<>APP<br/>SERVER 1</>} icon={Cpu} delay={0.5} />
             <NodeCard x={460} y={180} title={<>APP<br/>SERVER 2</>} icon={Cpu} delay={0.6} />
             <NodeCard x={340} y={300} title="DATABASE" icon={Database} delay={0.8} />
          </div>
       </div>

       {/* Metric Bar */}
       <div className="absolute bottom-0 left-0 right-0 h-[48px] bg-[#2C2A27] flex items-center justify-center gap-12 px-8 z-20 shrink-0">
          <div className="flex items-center gap-3">
             <span className="text-[9px] font-mono tracking-widest uppercase text-white/70">REQUESTS/SEC</span>
             <span className="text-[16px] font-sans font-medium text-white">24,891</span>
          </div>
          <div className="w-px h-6 bg-white/20"></div>
          <div className="flex items-center gap-3">
             <span className="text-[9px] font-mono tracking-widest uppercase text-white/70">LATENCY</span>
             <span className="text-[16px] font-sans font-medium text-white">12ms</span>
          </div>
          <div className="w-px h-6 bg-white/20"></div>
          <div className="flex items-center gap-3">
             <span className="text-[9px] font-mono tracking-widest uppercase text-white/70">UPTIME</span>
             <span className="text-[16px] font-sans font-medium text-white">99.97%</span>
          </div>
       </div>
    </div>
  );
};

const DataCharts = () => {
  return (
    <div className="w-full h-full p-8 md:p-12 flex flex-col justify-center gap-6 min-w-[500px]">
       {/* Hero Donut */}
       <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.1}} className="bg-white border border-[#D8D4CC] shadow-[0_4px_24px_rgba(44,42,39,0.08)] rounded-xl p-8 flex items-center gap-12 w-full" style={{ willChange: "transform, opacity" }}>
          <div className="w-32 h-32 relative shrink-0">
             <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#F9F9F8" strokeWidth="16" />
                <motion.circle cx="50" cy="50" r="40" fill="none" stroke="#2C2A27" strokeWidth="16" strokeLinecap="square" strokeDasharray="251.2" initial={{strokeDashoffset: 251.2}} animate={{strokeDashoffset: 22.6}} transition={{duration: 1.2, delay: 0.4, ease: "easeOut"}} style={{ willChange: "stroke-dashoffset" }} />
             </svg>
          </div>
          <div>
             <div className="text-7xl font-black tracking-tighter text-[#2C2A27]">91%</div>
             <div className="font-mono text-[11px] font-bold text-[#7A7670] uppercase tracking-widest mt-2">Retention Rate</div>
          </div>
       </motion.div>

       <div className="grid grid-cols-2 gap-6 w-full">
          {/* Line Chart */}
          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2}} className="bg-white border border-[#D8D4CC] shadow-[0_4px_24px_rgba(44,42,39,0.08)] rounded-xl p-6 h-40 flex flex-col justify-between relative overflow-hidden" style={{ willChange: "transform, opacity" }}>
             <div className="absolute inset-0 top-auto h-24 opacity-[0.03] bg-gradient-to-t from-[#2C2A27] to-transparent"></div>
             <svg viewBox="0 0 100 40" className="absolute bottom-12 left-0 right-0 w-full h-16 px-4 overflow-visible">
                <motion.polyline points="0,40 20,30 40,35 60,15 80,20 100,5" fill="none" stroke="#2C2A27" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{pathLength: 0}} animate={{pathLength: 1}} transition={{duration: 1.5, delay: 0.6}} style={{ willChange: "pathLength" }} />
             </svg>
             <div className="mt-auto font-mono text-[10px] font-bold tracking-widest uppercase text-[#2C2A27] border-t border-[#EEEAE3] pt-3 z-10 bg-white">Revenue +34%</div>
          </motion.div>

          {/* Bar Chart */}
          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.3}} className="bg-white border border-[#D8D4CC] shadow-[0_4px_24px_rgba(44,42,39,0.08)] rounded-xl p-6 h-40 flex flex-col justify-between" style={{ willChange: "transform, opacity" }}>
             <div className="flex-1 flex items-end justify-center gap-3 pb-4">
                <motion.div className="w-6 bg-[#D8D4CC] rounded-t-sm" initial={{height: 0}} animate={{height: "100%"}} transition={{duration: 0.6, delay: 0.8}} style={{ willChange: "height" }} />
                <motion.div className="w-6 bg-[#7A7670] rounded-t-sm" initial={{height: 0}} animate={{height: "60%"}} transition={{duration: 0.6, delay: 0.95}} style={{ willChange: "height" }} />
                <motion.div className="w-6 bg-[#2C2A27] rounded-t-sm" initial={{height: 0}} animate={{height: "30%"}} transition={{duration: 0.6, delay: 1.1}} style={{ willChange: "height" }} />
             </div>
             <div className="mt-auto font-mono text-[10px] font-bold tracking-widest uppercase text-[#2C2A27] border-t border-[#EEEAE3] pt-3">CAC Down 18%</div>
          </motion.div>
       </div>
    </div>
  );
};

const RoadmapTimeline = () => {
  return (
    <div className="w-full h-full flex items-center justify-center px-12 md:px-20 min-w-[500px] py-8">
       <div className="relative flex flex-col justify-between h-full w-full max-w-md">
          {/* Vertical Line */}
          <div className="absolute top-4 bottom-4 left-[15px] w-0.5 bg-[#D8D4CC]"></div>
          <motion.div className="absolute top-4 left-[15px] w-0.5 bg-[#2C2A27]" initial={{height: 0}} animate={{height: "75%"}} transition={{duration: 1.5, ease: "easeInOut", delay: 0.2}} style={{ willChange: "height" }} />

          {/* Done: Audit */}
          <div className="relative z-10 flex items-center gap-6 w-full">
             <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{type: "spring", delay: 0.2}} className="w-8 h-8 rounded-full bg-[#2C2A27] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(44,42,39,0.2)] shrink-0" style={{ willChange: "transform" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
             </motion.div>
             <div className="flex-1 flex justify-between items-center bg-white border border-[#D8D4CC] shadow-sm rounded-lg px-4 py-3">
                <div>
                   <div className="font-mono text-[11px] font-bold text-[#2C2A27] tracking-widest">AUDIT</div>
                   <div className="font-mono text-[9px] text-[#7A7670] tracking-wider mt-0.5">WEEK 1-2</div>
                </div>
                <div className="text-[10px] font-sans text-[#7A7670] text-right">3 proposals reviewed</div>
             </div>
          </div>

          {/* Done: Strategy */}
          <div className="relative z-10 flex items-center gap-6 w-full mt-8">
             <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{type: "spring", delay: 0.6}} className="w-8 h-8 rounded-full bg-[#2C2A27] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(44,42,39,0.2)] shrink-0" style={{ willChange: "transform" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
             </motion.div>
             <div className="flex-1 flex justify-between items-center bg-white border border-[#D8D4CC] shadow-sm rounded-lg px-4 py-3">
                <div>
                   <div className="font-mono text-[11px] font-bold text-[#2C2A27] tracking-widest">STRATEGY</div>
                   <div className="font-mono text-[9px] text-[#7A7670] tracking-wider mt-0.5">WEEK 3</div>
                </div>
                <div className="text-[10px] font-sans text-[#7A7670] text-right">Architecture approved</div>
             </div>
          </div>

          {/* Current: Build */}
          <div className="relative z-10 flex items-center gap-6 w-full mt-8">
             <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{type: "spring", delay: 1.0}} className="w-8 h-8 rounded-full bg-white border-2 border-[#2C2A27] flex items-center justify-center shadow-[0_4px_12px_rgba(44,42,39,0.1)] relative shrink-0" style={{ willChange: "transform" }}>
                <div className="absolute inset-0 rounded-full animate-pulse shadow-[0_0_0_6px_rgba(44,42,39,0.1)]"></div>
                <div className="w-2.5 h-2.5 bg-[#2C2A27] rounded-full"></div>
             </motion.div>
             <div className="flex-1 flex justify-between items-center bg-white border border-[#2C2A27] shadow-md rounded-lg px-4 py-3 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2C2A27]"></div>
                <div className="pl-2">
                   <div className="font-mono text-[11px] font-bold text-[#2C2A27] tracking-widest">BUILD</div>
                   <div className="font-mono text-[9px] text-[#7A7670] tracking-wider mt-0.5">WEEK 4-10</div>
                </div>
                <div className="text-[10px] font-sans text-[#2C2A27] font-medium text-right">12 standards enforced</div>
             </div>
          </div>

          {/* Upcoming: Launch */}
          <div className="relative z-10 flex items-center gap-6 w-full mt-8 opacity-50">
             <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{type: "spring", delay: 1.2}} className="w-8 h-8 rounded-full bg-[#EEEAE3] border-2 border-dashed border-[#7A7670] flex items-center justify-center shrink-0" style={{ willChange: "transform" }}></motion.div>
             <div className="flex-1 flex justify-between items-center bg-transparent border border-dashed border-[#7A7670] rounded-lg px-4 py-3">
                <div>
                   <div className="font-mono text-[11px] font-bold text-[#2C2A27] tracking-widest">LAUNCH</div>
                   <div className="font-mono text-[9px] text-[#7A7670] tracking-wider mt-0.5">WEEK 11+</div>
                </div>
                <div className="text-[10px] font-sans text-[#7A7670] text-right">Zero rework needed</div>
             </div>
          </div>
       </div>
    </div>
  );
};

const renderVisual = (id: string, isBefore: boolean = false) => {
  switch(id) {
    case "01": return <WebAppMockup isBefore={isBefore} />;
    case "02": return <AIChatMockup />;
    case "03": return <CloudDiagram />;
    case "04": return <DataCharts />;
    case "05": return <RoadmapTimeline />;
    default: return null;
  }
};

export const Capabilities = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const capabilities = [
    {
      id: "01",
      title: "High-Performance Web Apps",
      desc: "Fast, conversion-focused web experiences that are maintainable, scalable, and built for growth.",
      scenario: "Your current e-commerce or B2B site takes 4 seconds to load, causing high-intent buyers to bounce before seeing your catalog. I migrate legacy systems to Headless architectures that load instantly, integrating seamlessly with your CMS or inventory management to capture lost revenue.",
      stat: "83%",
      statLabel: "AVG. LOAD TIME REDUCTION",
      quote: '"INCREDIBLE ENGAGEMENT FROM A HUGE POTENTIAL CUSTOMER." — FORZA',
      badges: ['NEXT.JS', 'ASTRO', 'VERCEL'],
      icon: Globe,
      span: "lg:col-span-6"
    },
    {
      id: "02",
      title: "AI Integrations",
      desc: "Practical AI workflows that reduce manual work, accelerate delivery, and improve decision speed.",
      scenario: "Your team is burning hours manually answering routine customer inquiries or digging through internal documents. I engineer custom LLM workflows that securely index your company's data, allowing employees or customers to instantly query exactly what they need, drastically reducing operational drag.",
      stat: "12x",
      statLabel: "FASTER KNOWLEDGE RETRIEVAL",
      quote: '"DRASTICALLY REDUCED OUR OPERATIONAL DRAG." — OPS TEAM',
      badges: ['OPENAI', 'PYTHON', 'VECTOR DB'],
      icon: Cpu,
      span: "lg:col-span-6"
    },
    {
      id: "03",
      title: "Cloud Architecture",
      desc: "Reliable cloud foundations designed for uptime, flexibility, and long-term operational efficiency.",
      scenario: "Your infrastructure crashes during traffic spikes, or your AWS bill is bleeding money due to over-provisioned, messy servers. I design and deploy scalable, modern cloud environments that auto-scale when you need power and spin down when you don't, ensuring 99.9% uptime and predictable costs.",
      stat: "99.9%",
      statLabel: "GUARANTEED UPTIME",
      quote: '"OUR INFRASTRUCTURE FINALLY SCALES WITH OUR TRAFFIC." — CTO',
      badges: ['AWS', 'DOCKER', 'CDN'],
      icon: Cloud,
      span: "lg:col-span-4"
    },
    {
      id: "04",
      title: "Data Analytics",
      desc: "Clear analytics pipelines and reporting that translate raw data into meaningful business actions.",
      scenario: "Your sales, marketing, and operational data are trapped in silos, forcing you to guess which channels are actually profitable. I build automated pipelines that aggregate your data into a single, real-time dashboard, giving leadership absolute clarity to make financial decisions.",
      stat: "360°",
      statLabel: "PIPELINE VISIBILITY",
      quote: '"GAVE LEADERSHIP ABSOLUTE CLARITY TO MAKE DECISIONS." — CEO',
      badges: ['POSTGRESQL', 'API', 'DASHBOARDS'],
      icon: BarChart3,
      span: "lg:col-span-4"
    },
    {
      id: "05",
      title: "Technical Consulting",
      desc: "Architecture-level guidance to prioritize the right technical investments and reduce costly rework.",
      scenario: "You are about to hand $150,000 to an outsourced agency for a massive digital transformation, but you don't have an internal technical leader to verify if their architecture makes sense. I act as your fractional architect, auditing proposals, enforcing code standards, and ensuring you don't build a product that needs to be rewritten.",
      stat: "100%",
      statLabel: "ARCHITECTURE CONFIDENCE",
      quote: '"VERIFIED OUR INVESTMENTS AND PREVENTED COSTLY REWORK." — FOUNDER',
      badges: ['AUDITS', 'STRATEGY', 'ROADMAPS'],
      icon: Briefcase,
      span: "lg:col-span-4"
    }
  ];

  const activeCapability = activeId ? capabilities.find(c => c.id === activeId) : null;
  const drillDownTransition = { type: "spring" as const, stiffness: 300, damping: 30 };

  const iconMotion = {
    rest: { rotate: 0, scale: 1, opacity: 0.85 },
    hover: {
      rotate: 45,
      scale: 1.08,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 200, damping: 25 }
    }
  };

  const descriptionMotion = {
    rest: { opacity: 0, y: 14 },
    hover: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 200, damping: 25 }
    }
  };

  return (
    <section className="relative w-full py-24 px-4 md:px-8 lg:px-12 overflow-hidden bg-background">
      <motion.div
        className="relative z-10 w-full max-w-[1400px] mx-auto bg-background/95 backdrop-blur-sm shadow-2xl shadow-accent/5 border border-accent/20"
        variants={sectionSequence}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_ONCE}
      >
        {/* --- HEADER ROW --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-accent/20">
          <div className="lg:col-span-12 p-8 md:p-12 relative flex flex-col justify-center bg-white/30">
            <motion.div className="absolute top-0 left-0 right-0 h-px bg-accent/20" variants={drawLineX} />
            <motion.div className="absolute bottom-0 left-0 right-0 h-px bg-accent/20" variants={drawLineX} />
            <motion.div className="absolute top-0 bottom-0 left-0 w-px bg-accent/20" variants={drawLineY} />
            <motion.div className="absolute top-0 bottom-0 right-0 w-px bg-accent/20" variants={drawLineY} />
            <div className="overflow-hidden">
              <motion.div variants={stampUp} className="flex items-center gap-6 mb-4">
                <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-accent">
                  Integrity & Impact
                </span>
                <div className="h-px flex-1 bg-accent/20"></div>
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.h2 variants={stampUp} className="text-4xl md:text-6xl font-sans font-black tracking-tighter uppercase text-foreground">
                Proof over promises.
              </motion.h2>
            </div>

            {/* Typographic ticker */}
            <div className="relative mt-10 border-y border-accent/20 py-3 overflow-hidden">
              <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 22, ease: "linear", repeat: Infinity }}
              >
                {Array.from({ length: 2 }).map((_, i) => (
                  <span
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    className="px-4 text-[2rem] md:text-[3.75rem] lg:text-[4.5rem] font-black uppercase tracking-tight text-transparent leading-none select-none"
                    style={{ WebkitTextStroke: "1px rgba(36, 33, 30, 0.28)" }}
                  >
                    WEB APPS // AI INTEGRATIONS // CLOUD ARCHITECTURE // DATA ANALYTICS // TECHNICAL CONSULTING //
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* --- CAPABILITIES BODY --- */}
        <div className="w-full relative">

          {/* MOBILE VIEW: Accordion */}
          <div className="block lg:hidden flex flex-col bg-accent/[0.01]">
            {capabilities.map((cap, index) => {
              const isActive = activeId === cap.id;
              const Icon = cap.icon;
              return (
                <div key={cap.id} className="border-b border-accent/20 bg-background transition-colors duration-300">
                  <button 
                    onClick={() => {
                      const nextId = isActive ? null : cap.id;
                      setActiveId(nextId);
                      if (nextId) track('capabilities_card_select', { id: cap.id, title: cap.title });
                    }} 
                    className="w-full p-6 md:p-8 flex justify-between items-center text-left hover:bg-white transition-colors duration-0"
                  >
                    <div className="flex items-start gap-4">
                      <div className="font-mono text-[10px] md:text-xs font-bold text-accent/70 pt-1 tracking-[0.2em]">{cap.id} //</div>
                      <div className="font-sans text-xl md:text-2xl font-black text-foreground tracking-tight max-w-[20ch]">{cap.title}</div>
                    </div>
                    <motion.div animate={{ rotate: isActive ? 45 : 0 }} className="text-foreground/70 shrink-0">
                      <Icon size={20} strokeWidth={2} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div initial={{height: 0, opacity: 0}} animate={{height: "auto", opacity: 1}} exit={{height: 0, opacity: 0}} className="overflow-hidden bg-[#EEEAE3]">
                        <div className="p-6 md:p-8 pb-8 border-t border-[#D8D4CC]">
                           {/* Mobile Scenario + Stat */}
                           <div className="mb-10">
                              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#7A7670] flex items-center gap-3 mb-4">
                                <div className="w-1.5 h-1.5 bg-[#2C2A27] rounded-full animate-pulse"></div>
                                The Scenario
                              </span>
                              <p className="font-sans text-base md:text-lg text-[#2C2A27]/90 leading-relaxed font-light tracking-tight mb-8">
                                {cap.scenario}
                              </p>
                              <div className="mt-4">
                                <div className="text-4xl md:text-5xl font-black tracking-tighter text-[#2C2A27] mb-1">{cap.stat}</div>
                                <div className="font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#7A7670]">{cap.statLabel}</div>
                              </div>
                           </div>

                           {/* Mobile Scrollable Visual Strip */}
                           <div className="w-full overflow-x-auto hide-scrollbar pb-6" style={{ WebkitOverflowScrolling: 'touch' }}>
                              <div className="relative min-h-[400px] flex items-center">
                                 {renderVisual(cap.id, false)}
                              </div>
                           </div>

                           {/* Mobile Footer */}
                           <div className="mt-6 border-t border-[#D8D4CC] pt-6 flex flex-col gap-6">
                              <div className="flex flex-col gap-1">
                                <div className="font-serif italic text-[14px] text-[#2C2A27] leading-tight">{cap.quote.split('—')[0]}</div>
                                <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#7A7670]">— {cap.quote.split('—')[1]}</div>
                              </div>
                              <div className="flex items-center justify-between">
                                 <div className="flex gap-2 flex-wrap">
                                    {cap.badges.map((b, i) => <span key={i} className="font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 bg-[#2C2A27] rounded-full text-white">{b}</span>)}
                                 </div>
                                 <a 
                                   href="/work" 
                                   onClick={() => track('capabilities_see_work', { from: 'mobile' })}
                                   className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#2C2A27] hover:text-[#7A7670] transition-colors flex items-center gap-2 shrink-0 group py-2"
                                 >
                                    SEE WORK <span className="inline-block transform -rotate-45 transition-transform duration-300 group-hover:rotate-0">→</span>
                                 </a>
                              </div>
                           </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          {/* DESKTOP VIEW: Bento Grid -> Split Pane */}
          <div className="hidden lg:block w-full">
            <AnimatePresence mode="wait">
              {activeId === null ? (
                <motion.div
                  key="grid-view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={drillDownTransition}
                  className="grid grid-cols-12"
                >
                  {capabilities.map((capability, index) => {
                    const Icon = capability.icon;
                    const rightBorderClass =
                      index === 0
                        ? "border-r"
                        : index === 1
                          ? "border-r-0"
                          : index === 2
                            ? "border-r"
                            : index === 3
                              ? "border-r"
                              : "border-r-0";
                    return (
                      <motion.article
                        key={capability.id}
                        onClick={() => {
                          setActiveId(capability.id);
                          track('capabilities_card_select', { id: capability.id, title: capability.title });
                        }}
                        className={`group relative ${capability.span} border-b border-accent/20 bg-accent/[0.01] hover:bg-white transition-colors duration-0 overflow-hidden min-h-[250px] cursor-pointer ${rightBorderClass}`}
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                      >
                        <div className="p-10 h-full flex flex-col justify-between relative z-10">
                          <div className="flex items-start justify-between gap-6">
                            <div>
                              <div className="font-mono text-xs font-bold tracking-[0.2em] text-accent/70 mb-6 group-hover:text-highlight transition-colors duration-300">
                                {capability.id} //
                              </div>
                              <h3 className="font-sans text-3xl font-black tracking-tight text-foreground max-w-[22ch] leading-tight">
                                {capability.title}
                              </h3>
                            </div>
                            <motion.div variants={iconMotion} className="text-foreground/70 pt-1">
                              <Icon size={22} strokeWidth={1.8} />
                            </motion.div>
                          </div>

                          <motion.p
                            variants={descriptionMotion}
                            className="font-sans text-lg text-foreground/85 leading-relaxed max-w-[44ch]"
                          >
                            {capability.desc}
                          </motion.p>
                        </div>
                      </motion.article>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="split-view"
                  initial={{ opacity: 0, scale: 0.98, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -20 }}
                  transition={drillDownTransition}
                  className="flex w-full bg-[#EEEAE3] relative z-20 min-h-[80vh]"
                >
                  {/* Left Sidebar (30%) */}
                  <div className="w-[30%] border-r border-[#D8D4CC] flex flex-col bg-white">
                    <div className="p-8 border-b border-[#D8D4CC] bg-[#F9F9F8]">
                      <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#7A7670]">Select System</span>
                    </div>
                    <div className="flex flex-col flex-1 py-4">
                      {capabilities.map((cap) => {
                        const isActive = cap.id === activeId;
                        return (
                          <button
                            key={cap.id}
                            onClick={() => {
                              setActiveId(cap.id);
                              track('capabilities_card_select', { id: cap.id, title: cap.title });
                            }}
                            className={`relative text-left w-full px-8 py-6 transition-colors duration-0 ${isActive ? 'bg-[#EEEAE3]' : 'hover:bg-[#F9F9F8]'}`}
                          >
                            <div className={`absolute left-0 top-0 bottom-0 w-[3px] transition-colors duration-300 ${isActive ? 'bg-[#2C2A27]' : 'bg-transparent'}`}></div>
                            <span className={`font-sans text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-[#2C2A27]' : 'text-[#7A7670]'}`}>
                              {cap.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Detail (70%) */}
                  <div className="w-[70%] flex flex-col relative overflow-hidden bg-[#F9F9F8]">
                    {/* Noise Texture */}
                    <svg className="absolute inset-0 w-full h-full opacity-[0.025] pointer-events-none mix-blend-overlay z-0">
                      <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
                      </filter>
                      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                    </svg>

                    <button 
                      onClick={() => {
                        setActiveId(null);
                        track('capabilities_close');
                      }}
                      className="absolute top-8 right-8 font-mono text-[10px] font-bold tracking-widest uppercase text-[#7A7670] hover:text-[#2C2A27] transition-colors z-50 flex items-center gap-2 group"
                    >
                      Close <X size={16} strokeWidth={2.5} />
                    </button>
                    
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeId || "empty"}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        variants={{
                          hidden: { opacity: 0 },
                          show: { opacity: 1, transition: { staggerChildren: 0.1 } },
                          exit: { opacity: 0 }
                        }}
                        className="flex flex-col h-full z-10 relative"
                      >
                        {activeId && (
                          <>
                            {/* Zone 1: Header */}
                            <div className="flex items-center gap-6 p-12 pb-8 border-b border-[#D8D4CC] bg-transparent">
                              <div className="w-16 h-16 bg-white border border-[#D8D4CC] shadow-[0_4px_24px_rgba(44,42,39,0.08)] flex items-center justify-center text-[#2C2A27] rounded-xl shrink-0">
                                {activeCapability && <activeCapability.icon size={28} strokeWidth={1.5} />}
                              </div>
                              <h3 className="font-sans text-4xl lg:text-5xl font-black tracking-tighter text-[#2C2A27] leading-none">
                                {activeCapability?.title}
                              </h3>
                            </div>
                            
                            {/* Zone 2: 40/60 Split */}
                            <div className="flex-1 flex w-full items-start min-h-[520px]">
                               {/* Left 40%: Scenario + Stat */}
                               <div className="w-[40%] p-12 pt-12 flex flex-col justify-between border-r border-[#D8D4CC] bg-transparent h-full min-h-[520px]">
                                  <div>
                                    <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#7A7670] flex items-center gap-3 mb-6">
                                      <div className="w-1.5 h-1.5 bg-[#2C2A27] rounded-full animate-pulse"></div>
                                      The Scenario
                                    </span>
                                    <p className="font-sans text-lg lg:text-xl text-[#2C2A27]/90 leading-relaxed font-light tracking-tight">
                                      {activeCapability?.scenario}
                                    </p>
                                  </div>
                                  <div className="mt-12">
                                    <div className="text-5xl lg:text-6xl font-black tracking-tighter text-[#2C2A27] mb-2">{activeCapability?.stat}</div>
                                    <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#7A7670]">{activeCapability?.statLabel}</div>
                                  </div>
                               </div>

                               {/* Right 60%: Visual Widget */}
                               <div 
                                 className="w-[60%] relative min-h-[520px] overflow-visible sticky top-0 p-[28px]"
                                 style={{
                                   backgroundColor: 
                                     activeId === '01' ? '#EEEAE3' : 
                                     activeId === '02' ? '#EEEAE3' : 
                                     activeId === '03' ? '#E4E0D8' : 
                                     activeId === '04' ? '#E4E0D8' : 
                                     activeId === '05' ? '#DEDAD2' : '#EEEAE3',
                                   backgroundImage: activeId === '04' ? 'linear-gradient(rgba(44, 42, 39, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(44, 42, 39, 0.04) 1px, transparent 1px)' : 'none',
                                   backgroundSize: activeId === '04' ? '24px 24px' : 'auto'
                                 }}
                               >
                                  {renderVisual(activeId, false)}
                               </div>
                            </div>

                            {/* Zone 3: Footer */}
                            <div className="border-t border-[#D8D4CC] p-0 flex items-stretch bg-white shrink-0 min-h-[80px]">
                               <div className="flex flex-col justify-center px-8 py-6 border-r border-[#D8D4CC] w-[40%]">
                                  <div className="font-serif italic text-[14px] text-[#2C2A27] leading-tight mb-2 line-clamp-2 max-w-[340px]">{activeCapability?.quote.split('—')[0]}</div>
                                  <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#7A7670]">— {activeCapability?.quote.split('—')[1]}</div>
                               </div>
                               <div className="flex items-center justify-center px-8 py-6 w-[35%] border-r border-[#D8D4CC]">
                                  <div className="flex gap-2 flex-wrap justify-center">
                                     {activeCapability?.badges.map((b, i) => <span key={i} className="font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 bg-[#2C2A27] rounded-full text-white">{b}</span>)}
                                  </div>
                               </div>
                               <div className="flex items-center justify-end px-8 py-6 w-[25%]">
                                  <a 
                                    href="/work" 
                                    onClick={() => track('capabilities_see_work', { from: 'desktop' })}
                                    className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#2C2A27] hover:text-[#7A7670] transition-colors flex items-center gap-2 group"
                                  >
                                     SEE A PROJECT <span className="inline-block transform -rotate-45 transition-transform duration-300 group-hover:rotate-0">→</span>
                                  </a>
                               </div>
                            </div>
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </motion.div>
    </section>
  );
};
