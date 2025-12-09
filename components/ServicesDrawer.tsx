'use client'

import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  MapPin, 
  Zap,
  ArrowRight,
  X,
  MessageCircle,
  ChevronLeft
} from 'lucide-react';

interface ServicesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
}

interface FormResponses {
  project_type?: string;
  goal?: string;
  budget?: string;
  timeline?: string;
  start_timeframe?: string;
  contact_name?: string;
  contact_email?: string;
  website_url?: string;
  products_count?: string;
  automation_needs?: string;
  location_area?: string;
  message?: string;
}

const ServicesDrawer = ({ isOpen, onClose, onOpen }: ServicesDrawerProps) => {
  const [currentView, setCurrentView] = useState<'list' | 'qualification' | 'contact'>('list');
  const [selectedService, setSelectedService] = useState<string>('');
  const [formResponses, setFormResponses] = useState<FormResponses>({});
  const [isAnimating, setIsAnimating] = useState(false);

  // Remember selected service in sessionStorage
  useEffect(() => {
    if (selectedService) {
      sessionStorage.setItem('lastSelectedService', selectedService);
    }
  }, [selectedService]);

  // Restore last selected service on open
  useEffect(() => {
    if (isOpen && !selectedService) {
      const lastSelected = sessionStorage.getItem('lastSelectedService');
      if (lastSelected) {
        setSelectedService(lastSelected);
      }
    }
  }, [isOpen, selectedService]);

  const handleClose = React.useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      onClose();
      setIsAnimating(false);
    }, 300);
  }, [onClose]);

  // Close on Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose]);

  // Reset view when drawer is closed externally
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setCurrentView('list');
        setFormResponses({});
      }, 300);
    }
  }, [isOpen]);

  const handleServiceSelect = (serviceName: string) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedService(serviceName);
      setCurrentView('qualification');
      setFormResponses({ project_type: serviceName });
      setIsAnimating(false);
      
      console.log('Service selected:', serviceName);
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'service_selected', {
          service_name: serviceName
        });
      }
    }, 150);
  };

  const handleDirectContact = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedService('');
      setCurrentView('contact');
      setFormResponses({});
      setIsAnimating(false);
    }, 150);
  };

  const handleBack = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentView('list');
      setFormResponses({});
      setIsAnimating(false);
    }, 150);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormResponses((prev) => ({ ...prev, [name]: value }));
  };

  const submitQualification = (e: React.FormEvent) => {
    e.preventDefault();
    
    let messageBody = `${selectedService} Project Inquiry:\n\n`;
    messageBody += `What are you trying to achieve?\n${formResponses.goal || 'N/A'}\n\n`;
    if (formResponses.budget) {
      messageBody += `Budget Range: ${formResponses.budget}\n`;
    }
    if (formResponses.start_timeframe) {
      messageBody += `Ideal Start: ${formResponses.start_timeframe}\n`;
    }
    if (formResponses.timeline) {
      messageBody += `Timeline: ${formResponses.timeline}\n\n`;
    }
    
    if (selectedService === 'Revenue Websites' && formResponses.products_count) {
      messageBody += `Products/SKUs: ${formResponses.products_count}\n`;
    }
    if (selectedService === 'AI-Powered Media & Funnels' && formResponses.automation_needs) {
      messageBody += `Workflow Automation: ${formResponses.automation_needs}\n`;
    }
    if (selectedService === 'Local Visibility & Google Systems' && formResponses.location_area) {
      messageBody += `Target Location: ${formResponses.location_area}\n`;
    }
    
    messageBody += `\nContact Information:\n`;
    messageBody += `Name: ${formResponses.contact_name || 'N/A'}\n`;
    messageBody += `Email: ${formResponses.contact_email || 'N/A'}\n`;
    if (formResponses.website_url) {
      messageBody += `Website: ${formResponses.website_url}\n`;
    }

    const subject = encodeURIComponent(`${selectedService} Project Inquiry`);
    const mailtoLink = `mailto:nicholasloperena@gmail.com?subject=${subject}&body=${encodeURIComponent(messageBody)}`;

    window.location.href = mailtoLink;
    
    console.log('Form submitted:', selectedService);
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'project_inquiry_submitted', {
        service_name: selectedService
      });
    }
    
    setTimeout(() => {
      handleClose();
    }, 100);
  };

  const submitDirectContact = (e: React.FormEvent) => {
    e.preventDefault();
    
    let messageBody = `Direct Contact Inquiry:\n\n`;
    if (formResponses.message) {
      messageBody += `Message:\n${formResponses.message}\n\n`;
    }
    if (formResponses.goal) {
      messageBody += `What I'm looking for: ${formResponses.goal}\n\n`;
    }
    if (formResponses.budget) {
      messageBody += `Budget Range: ${formResponses.budget}\n`;
    }
    if (formResponses.timeline) {
      messageBody += `Timeline: ${formResponses.timeline}\n\n`;
    }
    
    messageBody += `Contact Information:\n`;
    messageBody += `Name: ${formResponses.contact_name || 'N/A'}\n`;
    messageBody += `Email: ${formResponses.contact_email || 'N/A'}\n`;
    if (formResponses.website_url) {
      messageBody += `Website: ${formResponses.website_url}\n`;
    }

    const subject = encodeURIComponent('Project Inquiry');
    const mailtoLink = `mailto:nicholasloperena@gmail.com?subject=${subject}&body=${encodeURIComponent(messageBody)}`;

    window.location.href = mailtoLink;
    
    console.log('Direct contact submitted');
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'direct_contact_submitted');
    }
    
    setTimeout(() => {
      handleClose();
    }, 100);
  };

  const services = [
    { 
      name: 'Revenue Websites', 
      eyebrow: 'WEB SYSTEMS',
      description: 'Turn visitors into booked calls and sales.',
      subline: 'Includes: Landing pages, brand sites, eCommerce',
      icon: TrendingUp,
      isPopular: true
    },
    { 
      name: 'Local Visibility & Google Systems', 
      eyebrow: 'LOCAL GROWTH',
      description: 'Make your business impossible to ignore in search and maps.',
      subline: 'Includes: Google Business Management & Local SEO',
      icon: MapPin,
      isPopular: false
    },
    { 
      name: 'AI-Powered Media & Funnels', 
      eyebrow: 'AI-DRIVEN GROWTH',
      description: 'Turn your best ideas into automated workflows that run every day.',
      subline: 'Includes: AI Media/Video & AI Consulting',
      icon: Zap,
      isPopular: false
    },
  ];

  // Trigger onOpen callback when modal becomes visible
  useEffect(() => {
    if (isOpen && onOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 will-change-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
        aria-hidden={!isOpen}
        style={{ 
          contain: 'layout style paint',
          transform: 'translateZ(0)'
        }}
      />

      {/* Side Panel */}
      <div 
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white shadow-2xl rounded-l-2xl transition-transform duration-300 ease-out overflow-hidden will-change-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
        style={{ 
          maxHeight: '90vh',
          contain: 'layout style paint',
          backfaceVisibility: 'hidden'
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 rounded-tl-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {currentView !== 'list' && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="p-2 -ml-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Go back"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              <div>
                <h2 id="drawer-title" className="text-xl font-bold text-gray-900">
                  {currentView === 'list' ? "Let's Design Your Next Growth System" : 
                   currentView === 'contact' ? "Let's Start a Conversation" :
                   selectedService}
                </h2>
                {currentView === 'list' && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    Step 1 · Pick where you need the most help
                  </p>
                )}
                {currentView === 'qualification' && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    Step 2 · Share a few details so I can map your system
                  </p>
                )}
                {currentView === 'contact' && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    Tell me what you&apos;re working on
                  </p>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="p-2 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 73px)' }}>
          <div className={`px-6 py-6 transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            {currentView === 'list' ? (
              /* Services List View */
              <div className="space-y-3">
                {services.map((service) => {
                  const IconComponent = service.icon;
                  const isSelected = selectedService === service.name;
                  return (
                    <button
                      key={service.name}
                      type="button"
                      onClick={() => handleServiceSelect(service.name)}
                      className={`relative w-full text-left rounded-xl px-5 py-4 transition-all duration-200 ${
                        isSelected 
                          ? 'bg-[#F2611D]/5 border-2 border-[#F2611D] shadow-sm' 
                          : 'bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 shadow-sm'
                      }`}
                    >
                      {service.isPopular && (
                        <div className="absolute top-3 right-3 hidden sm:inline-flex">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#F2611D] text-white">
                            Best place to start
                          </span>
                        </div>
                      )}
                      <div className="flex items-start gap-4 pr-8">
                        {IconComponent && (
                          <IconComponent className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            isSelected ? 'text-[#F2611D]' : 'text-gray-400'
                          }`} />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            {service.eyebrow}
                          </p>
                          <h3 className="text-base font-bold text-gray-900 mb-1.5 leading-tight">
                            {service.name}
                          </h3>
                          <p className="text-sm text-gray-700 leading-snug mb-1">{service.description}</p>
                          <p className="text-xs text-gray-500">{service.subline}</p>
                        </div>
                        <ArrowRight className={`w-4 h-4 flex-shrink-0 mt-1 ${
                          isSelected ? 'text-[#F2611D]' : 'text-gray-400'
                        }`} />
                      </div>
                    </button>
                  );
                })}

                {/* Direct Contact Option */}
                <button
                  type="button"
                  onClick={handleDirectContact}
                  className="relative w-full text-left rounded-xl px-5 py-4 bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 shadow-sm transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <MessageCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        DIRECT CONTACT
                      </p>
                      <h3 className="text-base font-bold text-gray-900 mb-1.5 leading-tight">
                        Just want to chat?
                      </h3>
                      <p className="text-sm text-gray-700 leading-snug">Skip the form and tell me what you&apos;re working on.</p>
                    </div>
                    <ArrowRight className="w-4 h-4 flex-shrink-0 mt-1 text-gray-400" />
                  </div>
                </button>
              </div>
            ) : currentView === 'contact' ? (
              /* Direct Contact Form */
              <form onSubmit={submitDirectContact} className="space-y-5">
                <div>
                  <label htmlFor="contact_name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="contact_name"
                    id="contact_name"
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#F2611D] focus:ring-2 focus:ring-[#F2611D]/20 transition-colors"
                    placeholder="John Doe"
                    value={formResponses.contact_name || ''}
                    onChange={handleFormChange}
                  />
                </div>

                <div>
                  <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="contact_email"
                    id="contact_email"
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#F2611D] focus:ring-2 focus:ring-[#F2611D]/20 transition-colors"
                    placeholder="you@example.com"
                    value={formResponses.contact_email || ''}
                    onChange={handleFormChange}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#F2611D] focus:ring-2 focus:ring-[#F2611D]/20 transition-colors resize-none"
                    placeholder="Tell me about your project, challenges, goals, or anything else you'd like me to know..."
                    value={formResponses.message || ''}
                    onChange={handleFormChange}
                  />
                </div>

                <div>
                  <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1.5">
                    What are you looking for? (optional)
                  </label>
                  <textarea
                    id="goal"
                    name="goal"
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#F2611D] focus:ring-2 focus:ring-[#F2611D]/20 transition-colors resize-none"
                    placeholder="Brief description of your project..."
                    value={formResponses.goal || ''}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-[#F2611D] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#ff7a3d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F2611D] focus:ring-offset-2"
                  >
                    Send Message
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  You&apos;ll hear back from me in 1–2 business days.
                </p>
              </form>
            ) : (
              /* Qualification Form */
              <form onSubmit={submitQualification} className="space-y-5">
                {/* Selected Service Indicator */}
                <div className="bg-[#F2611D]/5 border border-[#F2611D]/20 rounded-lg px-4 py-2.5 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{selectedService}</span>
                  <button
                    type="button"
                    onClick={handleBack}
                    className="text-xs text-[#F2611D] hover:text-[#ff7a3d] font-medium"
                  >
                    Change
                  </button>
                </div>

                <div>
                  <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1.5">
                    What are you trying to achieve?
                  </label>
                  <textarea
                    id="goal"
                    name="goal"
                    required
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#F2611D] focus:ring-2 focus:ring-[#F2611D]/20 transition-colors resize-none"
                    placeholder="Describe your goals, challenges, or what success looks like..."
                    value={formResponses.goal || ''}
                    onChange={handleFormChange}
                  />
                </div>

                {selectedService === 'Revenue Websites' && (
                  <div>
                    <label htmlFor="products_count" className="block text-sm font-medium text-gray-700 mb-1.5">
                      How many products? (optional)
                    </label>
                    <select
                      id="products_count"
                      name="products_count"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#F2611D] focus:ring-2 focus:ring-[#F2611D]/20 transition-colors"
                      value={formResponses.products_count || ''}
                      onChange={handleFormChange}
                    >
                      <option value="">Not applicable</option>
                      <option value="1-50 products">1-50 products</option>
                      <option value="51-200 products">51-200 products</option>
                      <option value="201-500 products">201-500 products</option>
                      <option value="500+ products">500+ products</option>
                    </select>
                  </div>
                )}

                {selectedService === 'AI-Powered Media & Funnels' && (
                  <div>
                    <label htmlFor="automation_needs" className="block text-sm font-medium text-gray-700 mb-1.5">
                      What workflow to automate? (optional)
                    </label>
                    <input
                      type="text"
                      id="automation_needs"
                      name="automation_needs"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#F2611D] focus:ring-2 focus:ring-[#F2611D]/20 transition-colors"
                      placeholder="e.g., content generation, customer support..."
                      value={formResponses.automation_needs || ''}
                      onChange={handleFormChange}
                    />
                  </div>
                )}

                {selectedService === 'Local Visibility & Google Systems' && (
                  <div>
                    <label htmlFor="location_area" className="block text-sm font-medium text-gray-700 mb-1.5">
                      City/area to rank in? (optional)
                    </label>
                    <input
                      type="text"
                      id="location_area"
                      name="location_area"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#F2611D] focus:ring-2 focus:ring-[#F2611D]/20 transition-colors"
                      placeholder="e.g., Miami, FL"
                      value={formResponses.location_area || ''}
                      onChange={handleFormChange}
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="contact_name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="contact_name"
                    id="contact_name"
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#F2611D] focus:ring-2 focus:ring-[#F2611D]/20 transition-colors"
                    placeholder="John Doe"
                    value={formResponses.contact_name || ''}
                    onChange={handleFormChange}
                  />
                </div>

                <div>
                  <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="contact_email"
                    id="contact_email"
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#F2611D] focus:ring-2 focus:ring-[#F2611D]/20 transition-colors"
                    placeholder="you@example.com"
                    value={formResponses.contact_email || ''}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-[#F2611D] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#ff7a3d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F2611D] focus:ring-offset-2"
                  >
                    Share This with Nico
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  You&apos;ll hear back from me in 1–2 business days with next steps.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @keyframes slideOut {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100%);
          }
        }
      `}</style>
    </>
  );
};

export default ServicesDrawer;
