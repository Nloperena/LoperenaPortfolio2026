'use client'

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServicesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormResponses {
  goal?: string;
  current_content?: string;
  budget?: string;
  timeline?: string;
  contact_email?: string;
  project_type?: string;
  current_website?: string;
  products_count?: string;
  target_audience?: string;
  existing_platform?: string;
  automation_needs?: string;
}

const ServicesDrawer = ({ isOpen, onClose }: ServicesDrawerProps) => {
  const [currentView, setCurrentView] = useState<'list' | 'qualification'>('list');
  const [selectedService, setSelectedService] = useState<string>('');
  const [formResponses, setFormResponses] = useState<FormResponses>({});

  // Close on Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        setCurrentView('list');
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Reset view when drawer is closed externally
  useEffect(() => {
    if (!isOpen) {
      setCurrentView('list');
      setFormResponses({});
      setSelectedService('');
    }
  }, [isOpen]);

  const handleServiceSelect = (serviceName: string) => {
    setSelectedService(serviceName);
    setCurrentView('qualification');
    setFormResponses({});
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormResponses((prev) => ({ ...prev, [name]: value }));
  };

  const submitQualification = (e: React.FormEvent) => {
    e.preventDefault();
    
    let messageBody = `${selectedService} Qualification:\n\n`;
    
    // Build message body based on service type
    if (selectedService === 'Top-end AI Media & Video') {
      messageBody += `Project Goal: ${formResponses.goal || 'N/A'}\n` +
                     `Current Content: ${formResponses.current_content || 'N/A'}\n` +
                     `Budget Range: ${formResponses.budget || 'N/A'}\n` +
                     `Timeline: ${formResponses.timeline || 'N/A'}\n`;
    } else if (selectedService === 'Landing Pages') {
      messageBody += `Project Goal: ${formResponses.goal || 'N/A'}\n` +
                     `Target Audience: ${formResponses.target_audience || 'N/A'}\n` +
                     `Current Website: ${formResponses.current_website || 'N/A'}\n` +
                     `Budget Range: ${formResponses.budget || 'N/A'}\n` +
                     `Timeline: ${formResponses.timeline || 'N/A'}\n`;
    } else if (selectedService === 'Brand Websites') {
      messageBody += `Project Type: ${formResponses.project_type || 'N/A'}\n` +
                     `Current Website: ${formResponses.current_website || 'N/A'}\n` +
                     `Target Audience: ${formResponses.target_audience || 'N/A'}\n` +
                     `Budget Range: ${formResponses.budget || 'N/A'}\n` +
                     `Timeline: ${formResponses.timeline || 'N/A'}\n`;
    } else if (selectedService === 'eCommerce Websites') {
      messageBody += `Products/SKUs: ${formResponses.products_count || 'N/A'}\n` +
                     `Existing Platform: ${formResponses.existing_platform || 'N/A'}\n` +
                     `Target Audience: ${formResponses.target_audience || 'N/A'}\n` +
                     `Budget Range: ${formResponses.budget || 'N/A'}\n` +
                     `Timeline: ${formResponses.timeline || 'N/A'}\n`;
    } else if (selectedService === 'Google Business Management') {
      messageBody += `Current Status: ${formResponses.current_website || 'N/A'}\n` +
                     `Business Type: ${formResponses.project_type || 'N/A'}\n` +
                     `Target Audience: ${formResponses.target_audience || 'N/A'}\n` +
                     `Budget Range: ${formResponses.budget || 'N/A'}\n` +
                     `Timeline: ${formResponses.timeline || 'N/A'}\n`;
    } else if (selectedService === 'Artificial Intelligence Consulting') {
      messageBody += `Automation Needs: ${formResponses.automation_needs || 'N/A'}\n` +
                     `Current Systems: ${formResponses.current_website || 'N/A'}\n` +
                     `Project Goal: ${formResponses.goal || 'N/A'}\n` +
                     `Budget Range: ${formResponses.budget || 'N/A'}\n` +
                     `Timeline: ${formResponses.timeline || 'N/A'}\n`;
    }
    
    messageBody += `Contact: ${formResponses.contact_email || 'N/A'}`;

    const subject = encodeURIComponent(`${selectedService} Qualification`);
    const mailtoLink = `mailto:nicholasloperena@gmail.com?subject=${subject}&body=${encodeURIComponent(messageBody)}`;

    window.location.href = mailtoLink;
    
    // Close drawer after a brief delay to allow mailto to open
    setTimeout(() => {
      onClose();
      setCurrentView('list');
      setFormResponses({});
      setSelectedService('');
    }, 100);
  };

  const services = [
    { name: 'Landing Pages', description: 'High-converting pages designed to capture leads.' },
    { name: 'Brand Websites', description: 'Full-scale digital presence reflecting your brand identity.' },
    { name: 'eCommerce Websites', description: 'Robust online stores built for sales growth.' },
    { name: 'Google Business Management', description: 'Optimizing your local online presence for visibility.' },
    { name: 'Top-end AI Media & Video', description: 'Cutting-edge content creation using AI for unique visuals.' },
    { name: 'Artificial Intelligence Consulting', description: 'Integrating AI solutions to automate and innovate.' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-gray-900/50"
            onClick={onClose}
            aria-hidden={!isOpen}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-gray-900 p-8 shadow-2xl overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="services-drawer-title"
          >
            <div className="flex items-center justify-between pb-6 border-b border-gray-700">
              <h2 id="services-drawer-title" className="text-2xl md:text-3xl font-bold text-white">
                {currentView === 'list' ? 'Discover My Services' : `Your ${selectedService} Project`}
              </h2>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-400 hover:text-white transition-colors"
                onClick={() => {
                  onClose();
                  setCurrentView('list');
                }}
                aria-label="Close menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {currentView === 'list' ? (
              /* Services List View */
              <div className="mt-8">
                <div className="space-y-1">
                  {services.map((service) => (
                    <button
                      key={service.name}
                      type="button"
                      onClick={() => handleServiceSelect(service.name)}
                      className="block w-full text-left rounded-lg px-4 py-4 text-base font-semibold leading-7 text-white hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#F2611D] focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                      {service.name}
                      <p className="mt-1 text-sm font-normal text-gray-400">{service.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Qualification Form View */
              <div className="mt-8">
                <p className="text-gray-300 text-sm mb-6">
                  To best understand your vision and how I can deliver an exceptional solution, please share a few details about your project below.
                </p>

                <form onSubmit={submitQualification} className="space-y-6">
                  {/* AI Media & Video Specific Fields */}
                  {selectedService === 'Top-end AI Media & Video' && (
                    <>
                      <div>
                        <label htmlFor="goal" className="block text-sm font-medium text-white mb-2">
                          What is the primary goal for this AI-generated media/video?
                        </label>
                        <input
                          type="text"
                          name="goal"
                          id="goal"
                          required
                          className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-[#F2611D] focus:ring-[#F2611D] sm:text-sm p-3"
                          placeholder="e.g., brand awareness, product demonstration, social engagement"
                          value={formResponses.goal || ''}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="current_content" className="block text-sm font-medium text-white mb-2">
                          Do you have existing footage or content I can leverage?
                        </label>
                        <select
                          id="current_content"
                          name="current_content"
                          required
                          className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-[#F2611D] focus:ring-[#F2611D] sm:text-sm p-3"
                          value={formResponses.current_content || ''}
                          onChange={handleFormChange}
                        >
                          <option value="">Please select...</option>
                          <option value="Yes, high quality">Yes, high quality footage/assets</option>
                          <option value="Yes, low quality">Yes, some low quality footage/assets</option>
                          <option value="No, start from scratch">No, I need you to create everything from scratch</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* Landing Pages Specific Fields */}
                  {selectedService === 'Landing Pages' && (
                    <>
                      <div>
                        <label htmlFor="goal" className="block text-sm font-medium text-white mb-2">
                          What is the primary goal for this landing page?
                        </label>
                        <input
                          type="text"
                          name="goal"
                          id="goal"
                          required
                          className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-[#F2611D] focus:ring-[#F2611D] sm:text-sm p-3"
                          placeholder="e.g., lead generation, product launch, event registration"
                          value={formResponses.goal || ''}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="target_audience" className="block text-sm font-medium text-white mb-2">
                          Who is your target audience?
                        </label>
                        <input
                          type="text"
                          name="target_audience"
                          id="target_audience"
                          required
                          className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-[#F2611D] focus:ring-[#F2611D] sm:text-sm p-3"
                          placeholder="e.g., B2B decision makers, consumers, enterprise clients"
                          value={formResponses.target_audience || ''}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="current_website" className="block text-sm font-medium text-white mb-2">
                          Do you currently have a website?
                        </label>
                        <select
                          id="current_website"
                          name="current_website"
                          required
                          className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-[#F2611D] focus:ring-[#F2611D] sm:text-sm p-3"
                          value={formResponses.current_website || ''}
                          onChange={handleFormChange}
                        >
                          <option value="">Please select...</option>
                          <option value="Yes, existing website">Yes, I have an existing website</option>
                          <option value="No, starting fresh">No, this will be my first website</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* Brand Websites Specific Fields */}
                  {selectedService === 'Brand Websites' && (
                    <>
                      <div>
                        <label htmlFor="project_type" className="block text-sm font-medium text-white mb-2">
                          What type of project is this?
                        </label>
                        <select
                          id="project_type"
                          name="project_type"
                          required
                          className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-[#F2611D] focus:ring-[#F2611D] sm:text-sm p-3"
                          value={formResponses.project_type || ''}
                          onChange={handleFormChange}
                        >
                          <option value="">Please select...</option>
                          <option value="New website build">New website build</option>
                          <option value="Website redesign">Website redesign</option>
                          <option value="Brand refresh">Brand refresh</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="current_website" className="block text-sm font-medium text-white mb-2">
                          Do you currently have a website?
                        </label>
                        <input
                          type="text"
                          name="current_website"
                          id="current_website"
                          className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-[#F2611D] focus:ring-[#F2611D] sm:text-sm p-3"
                          placeholder="e.g., www.example.com or No current website"
                          value={formResponses.current_website || ''}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="target_audience" className="block text-sm font-medium text-white mb-2">
                          Who is your target audience?
                        </label>
                        <input
                          type="text"
                          name="target_audience"
                          id="target_audience"
                          required
                          className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-[#F2611D] focus:ring-[#F2611D] sm:text-sm p-3"
                          placeholder="e.g., B2B professionals, consumers, enterprise clients"
                          value={formResponses.target_audience || ''}
                          onChange={handleFormChange}
                        />
                      </div>
                    </>
                  )}

                  {/* eCommerce Websites Specific Fields */}
                  {selectedService === 'eCommerce Websites' && (
                    <>
                      <div>
                        <label htmlFor="products_count" className="block text-sm font-medium text-white mb-2">
                          Approximately how many products/SKUs will you be selling?
                        </label>
                        <select
                          id="products_count"
                          name="products_count"
                          required
                          className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-[#F2611D] focus:ring-[#F2611D] sm:text-sm p-3"
                          value={formResponses.products_count || ''}
                          onChange={handleFormChange}
                        >
                          <option value="">Please select...</option>
                          <option value="1-50 products">1-50 products</option>
                          <option value="51-200 products">51-200 products</option>
                          <option value="201-500 products">201-500 products</option>
                          <option value="500+ products">500+ products</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="existing_platform" className="block text-sm font-medium text-white mb-2">
                          Do you currently sell on any platform?
                        </label>
                        <select
                          id="existing_platform"
                          name="existing_platform"
                          required
                          className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-[#F2611D] focus:ring-[#F2611D] sm:text-sm p-3"
                          value={formResponses.existing_platform || ''}
                          onChange={handleFormChange}
                        >
                          <option value="">Please select...</option>
                          <option value="No, starting fresh">No, starting fresh</option>
                          <option value="Shopify">Shopify</option>
                          <option value="WooCommerce">WooCommerce</option>
                          <option value="Amazon/eBay">Amazon/eBay</option>
                          <option value="Other platform">Other platform</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="target_audience" className="block text-sm font-medium text-white mb-2">
                          Who is your target audience?
                        </label>
                        <input
                          type="text"
                          name="target_audience"
                          id="target_audience"
                          required
                          className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-[#F2611D] focus:ring-[#F2611D] sm:text-sm p-3"
                          placeholder="e.g., consumers, B2B buyers, wholesale clients"
                          value={formResponses.target_audience || ''}
                          onChange={handleFormChange}
                        />
                      </div>
                    </>
                  )}

                  {/* Google Business Management Specific Fields */}
                  {selectedService === 'Google Business Management' && (
                    <>
                      <div>
                        <label htmlFor="current_website" className="block text-sm font-medium text-white mb-2">
                          What is your current Google Business status?
                        </label>
                        <select
                          id="current_website"
                          name="current_website"
                          required
                          className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-[#F2611D] focus:ring-[#F2611D] sm:text-sm p-3"
                          value={formResponses.current_website || ''}
                          onChange={handleFormChange}
                        >
                          <option value="">Please select...</option>
                          <option value="No Google Business profile">No Google Business profile</option>
                          <option value="Existing profile, needs optimization">Existing profile, needs optimization</option>
                          <option value="Active profile, needs management">Active profile, needs ongoing management</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="project_type" className="block text-sm font-medium text-white mb-2">
                          What type of business is this?
                        </label>
                        <input
                          type="text"
                          name="project_type"
                          id="project_type"
                          required
                          className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-[#F2611D] focus:ring-[#F2611D] sm:text-sm p-3"
                          placeholder="e.g., restaurant, retail store, service business"
                          value={formResponses.project_type || ''}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="target_audience" className="block text-sm font-medium text-white mb-2">
                          Who is your target audience?
                        </label>
                        <input
                          type="text"
                          name="target_audience"
                          id="target_audience"
                          required
                          className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-[#F2611D] focus:ring-[#F2611D] sm:text-sm p-3"
                          placeholder="e.g., local customers, tourists, B2B clients"
                          value={formResponses.target_audience || ''}
                          onChange={handleFormChange}
                        />
                      </div>
                    </>
                  )}

                  {/* AI Consulting Specific Fields */}
                  {selectedService === 'Artificial Intelligence Consulting' && (
                    <>
                      <div>
                        <label htmlFor="automation_needs" className="block text-sm font-medium text-white mb-2">
                          What processes or workflows would you like to automate?
                        </label>
                        <textarea
                          id="automation_needs"
                          name="automation_needs"
                          required
                          rows={4}
                          className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-[#F2611D] focus:ring-[#F2611D] sm:text-sm p-3"
                          placeholder="e.g., customer support, data analysis, content generation, lead qualification"
                          value={formResponses.automation_needs || ''}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="current_website" className="block text-sm font-medium text-white mb-2">
                          What systems or platforms do you currently use?
                        </label>
                        <input
                          type="text"
                          name="current_website"
                          id="current_website"
                          required
                          className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-[#F2611D] focus:ring-[#F2611D] sm:text-sm p-3"
                          placeholder="e.g., CRM, CMS, eCommerce platform, custom systems"
                          value={formResponses.current_website || ''}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="goal" className="block text-sm font-medium text-white mb-2">
                          What is the primary goal for AI integration?
                        </label>
                        <input
                          type="text"
                          name="goal"
                          id="goal"
                          required
                          className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-[#F2611D] focus:ring-[#F2611D] sm:text-sm p-3"
                          placeholder="e.g., increase efficiency, reduce costs, improve customer experience"
                          value={formResponses.goal || ''}
                          onChange={handleFormChange}
                        />
                      </div>
                    </>
                  )}

                  {/* Common Fields (Budget, Timeline, Email) */}
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-white mb-2">
                      What is your estimated budget range for this project?
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      required
                      className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-[#F2611D] focus:ring-[#F2611D] sm:text-sm p-3"
                      value={formResponses.budget || ''}
                      onChange={handleFormChange}
                    >
                      <option value="">Please select...</option>
                      <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                      <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                      <option value="$15,000+">$15,000+</option>
                      <option value="Undecided / Discuss">Undecided / Let's discuss</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-white mb-2">
                      What is your ideal project timeline?
                    </label>
                    <input
                      type="text"
                      name="timeline"
                      id="timeline"
                      required
                      className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-[#F2611D] focus:ring-[#F2611D] sm:text-sm p-3"
                      placeholder="e.g., 2-4 weeks, within the next month, flexible"
                      value={formResponses.timeline || ''}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact_email" className="block text-sm font-medium text-white mb-2">
                      Your best contact email:
                    </label>
                    <input
                      type="email"
                      name="contact_email"
                      id="contact_email"
                      required
                      className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-[#F2611D] focus:ring-[#F2611D] sm:text-sm p-3"
                      placeholder="you@example.com"
                      value={formResponses.contact_email || ''}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentView('list');
                        setFormResponses({});
                        setSelectedService('');
                      }}
                      className="flex-1 rounded-md bg-gray-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
                    >
                      Back to All Services
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded-md bg-[#F2611D] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#ff7a3d] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2611D]"
                    >
                      Send Project Details
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServicesDrawer;

