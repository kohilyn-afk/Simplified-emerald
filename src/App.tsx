import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScopePlanner } from './components/ScopePlanner';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ServiceModal } from './components/ServiceModal';
import { ServiceItem } from './types';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [plannerPresetServiceId, setPlannerPresetServiceId] = useState<string | undefined>(undefined);

  const handleOpenContactWithTopic = (topic: string) => {
    const subject = encodeURIComponent(`C-Suite Advisory Discussion - ${topic}`);
    const body = encodeURIComponent(`Hello Koh I-Lyn,\n\nI would like to initiate a confidential advisory discussion regarding:\n${topic}\n\nPlease reach out to schedule an initial consultation.`);
    window.location.href = `mailto:connect@kohilyn.com?subject=${subject}&body=${body}`;
  };

  const handleOpenPlannerWithService = (serviceId: string) => {
    setPlannerPresetServiceId(serviceId);
    const el = document.getElementById('scope-planner');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#091710] text-[#e2f1e8] font-sans forest-bg-mesh">
      
      {/* Navbar */}
      <Navbar
        onOpenContact={() => handleOpenContactWithTopic('General C-Suite Inquiry')}
        activeSection="home"
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Custom Advisory Engagement Planner */}
        <ScopePlanner
          initialSelectedId={plannerPresetServiceId}
          onOpenContactWithScope={(scopeSummary) => handleOpenContactWithTopic(scopeSummary)}
        />

        {/* About Koh I-Lyn */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onSelectInPlanner={(serviceId) => handleOpenPlannerWithService(serviceId)}
          onBookCall={() => handleOpenContactWithTopic(`Inquiry regarding ${selectedService.title}`)}
        />
      )}

    </div>
  );
}
