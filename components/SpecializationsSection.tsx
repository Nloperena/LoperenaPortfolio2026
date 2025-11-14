'use client'

import React from 'react';
import { motion } from 'framer-motion';

const specializations = [
  {
    title: "Website Rebuilds",
    body: "Turn slow, dated sites into fast, modern ones.",
    goodFor: [
      "Your site looks 5–10 years old",
      "You're nervous to send prospects there",
      "You want a cleaner structure + better speed"
    ]
  },
  {
    title: "Product & Quote Flows",
    body: "Quizzes, calculators, and forms that match how people buy.",
    goodFor: [
      "You sell technical or complex products",
      "Your sales team answers the same questions repeatedly",
      "You need a single link for reps to send prospects"
    ]
  },
  {
    title: "Internal Tools & Dashboards",
    body: "Custom UIs so your team stops fighting spreadsheets.",
    goodFor: [
      "You're doing manual work that could be automated",
      "Your team is stuck in spreadsheets and emails",
      "You need tools that match your exact workflow"
    ]
  },
  {
    title: "Automation & Integrations",
    body: "Connect your site, CRM, and tools so work happens automatically.",
    goodFor: [
      "You're manually moving data between systems",
      "You want smarter lead routing and qualification",
      "You need your website, CRM, and tools to talk"
    ]
  },
  {
    title: "Modernize Legacy Systems",
    body: "Replace or refactor old code without blowing everything up.",
    goodFor: [
      "You have old code or systems that need updating",
      "You're worried about breaking things during updates",
      "You want to add features but old system won't support them"
    ]
  },
  {
    title: "Custom Builds",
    body: "One-off apps or features you can't buy off the shelf.",
    goodFor: [
      "You need something specific that doesn't exist as a product",
      "You want tools built exactly for your workflow",
      "You need custom integrations between your systems"
    ]
  },
];

const SpecializationsSection = () => {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services-section" className="py-16 bg-[#f5f5f0]">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-[#1a4d3a] mb-10"
        >
          Specializations
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2">
          {specializations.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group rounded-2xl bg-[#0f172a] text-white p-6 shadow-sm
                         border border-transparent hover:border-[#1a4d3a]
                         hover:shadow-xl transition-all duration-200
                         hover:-translate-y-1 cursor-pointer"
            >
              <h3 className="text-lg font-semibold mb-3 group-hover:text-[#F2611D] transition-colors">
                {item.title}
              </h3>

              {/* Content swap container - fixed height to prevent jank */}
              <div className="relative mt-1 min-h-[72px]">
                {/* Default text */}
                <p className="text-sm text-gray-200 transition-opacity duration-150
                              group-hover:opacity-0">
                  {item.body}
                </p>

                {/* Hover bullets - absolute positioned */}
                <ul
                  className="absolute inset-0 mt-0 text-xs text-gray-200 space-y-1
                             opacity-0 group-hover:opacity-100
                             transition-opacity duration-150 pointer-events-none"
                >
                  {item.goodFor.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>• {bullet}</li>
                  ))}
                </ul>
              </div>

              {/* Footer row - conversion-first CTA */}
              <div className="mt-4 flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-700 pt-4">
                <span>Ready to fix this?</span>
                <a
                  href="#contact-section"
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-1 text-[#F2611D] hover:text-[#ff7a3d] transition-colors"
                >
                  Talk about it →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecializationsSection;

