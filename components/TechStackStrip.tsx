'use client'

import React from 'react';

const TechStackStrip = () => {
  const techStack = [
    { name: 'React' },
    { name: 'TypeScript' },
    { name: 'Tailwind CSS' },
    { name: 'Next.js' },
  ];

  return (
    <section 
      aria-label="Tech stack"
      className="bg-[#f5f5f0] py-6 border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          {/* Label */}
          <div className="flex-shrink-0">
            <p className="text-sm md:text-base text-gray-600 font-medium whitespace-nowrap">
              Primary tech stack:
            </p>
          </div>

          {/* Tech Stack Items */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            {techStack.map((tech, index) => (
              <React.Fragment key={tech.name}>
                <span className="text-gray-800 font-semibold text-base md:text-lg lg:text-xl">
                  {tech.name}
                </span>
                {index < techStack.length - 1 && (
                  <span className="text-gray-400 text-lg">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackStrip;

