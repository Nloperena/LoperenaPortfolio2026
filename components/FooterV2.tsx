import React from 'react';

const FooterV2 = () => {
  return (
    <footer id="contact-section" className="relative py-10 md:py-12 overflow-hidden bg-[#1a4d3a] text-white">
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden flex flex-col gap-4 mb-5">
          {/* Logo and Social Media */}
          <div className="flex items-center justify-between">
            <span 
              className="text-white text-2xl font-bold"
              style={{ 
                fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                fontWeight: 700,
                letterSpacing: '-0.02em'
              }}
            >
              Nicholas Loperena
            </span>
            {/* LinkedIn Icon */}
            <div>
              <a href="https://www.linkedin.com/in/nicholas-loperena-022813185/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white rounded flex items-center justify-center hover:bg-white/80 transition-colors">
                <span className="text-[#2c476e] text-sm font-bold">in</span>
              </a>
            </div>
          </div>
          {/* Navigation Links */}
          <div className="flex items-center gap-4 flex-wrap">
            <a href="/" className="text-white hover:text-white/80 transition-colors font-poppins text-sm">Home</a>
            <span className="text-white/50">|</span>
            <a href="/services" className="text-white hover:text-white/80 transition-colors font-poppins text-sm">My Skills</a>
            <span className="text-white/50">|</span>
            <a href="/contact" className="text-white hover:text-white/80 transition-colors font-poppins text-sm">Contact</a>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-5 gap-5 mb-5">
          {/* Logo Column - Spans more space on desktop */}
          <div className="col-span-2">
            <span 
              className="text-white text-4xl font-bold"
              style={{ 
                fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                fontWeight: 700,
                letterSpacing: '-0.02em'
              }}
            >
              Nicholas Loperena
            </span>
          </div>

          {/* Navigation Column */}
          <div className="space-y-1.5">
            <h3 className="text-white font-bold text-base font-poppins">Navigation</h3>
            <ul className="space-y-1">
              <li><a href="/" className="text-white hover:text-white/80 transition-colors font-poppins leading-tight">Home</a></li>
              <li><a href="/services" className="text-white hover:text-white/80 transition-colors font-poppins leading-tight">My Skills</a></li>
              <li><a href="/contact" className="text-white hover:text-white/80 transition-colors font-poppins leading-tight">Contact</a></li>
            </ul>
          </div>
          
          {/* Personal Info Column */}
          <div className="space-y-1.5">
            <h3 className="text-white font-bold text-base font-poppins">About</h3>
            <div className="text-white space-y-1">
              <p className="font-poppins leading-tight">Senior Full-Stack Developer</p>
              <p className="font-poppins leading-tight">Kissimmee, Florida</p>
            </div>
          </div>
          
          {/* Contact Column */}
          <div className="space-y-1.5">
            <h3 className="text-white font-bold text-base font-poppins">Contact</h3>
            <div className="text-white space-y-1">
              <p className="font-poppins leading-tight">P: (407) 790-5891</p>
              <p className="font-poppins leading-tight"><a href="mailto:nicholasloperena@gmail.com" className="hover:underline">nicholasloperena@gmail.com</a></p>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-white/30 mb-5"></div>

        {/* Bottom Section with Copyright and Follow Us */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Copyright */}
          <p className="text-white/70 text-xs font-poppins leading-tight flex-1">
            © {new Date().getFullYear()} Nicholas Loperena. All rights reserved.
          </p>

          {/* LinkedIn Icon - Aligned on the right */}
          <div className="ml-auto">
            <a href="https://www.linkedin.com/in/nicholas-loperena-022813185/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#2d6b52] transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterV2;



