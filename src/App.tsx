import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScopePlanner } from './components/ScopePlanner';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ServiceModal } from './components/ServiceModal';
import { ProposalModal } from './components/ProposalModal';
import { VisitorChatbox } from './components/VisitorChatbox';
import { ServiceItem } from './types';
import { TreeSectionDivider } from './components/TreeSilhouettes';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [plannerPresetServiceId, setPlannerPresetServiceId] = useState<string | undefined>(undefined);

  const [proposalModalState, setProposalModalState] = useState<{
    isOpen: boolean;
    subject: string;
    bodyText: string;
    recipient: string;
  }>({
    isOpen: false,
    subject: '',
    bodyText: '',
    recipient: 'connect@kohilyn.com',
  });

  const handleOpenContactWithTopic = (topic: string) => {
    setProposalModalState({
      isOpen: true,
      subject: `C-Suite Discussion - ${topic}`,
      bodyText: `Hello Koh I-Lyn,\n\nI would like to initiate a confidential discussion regarding:\n${topic}\n\nPlease reach out to schedule an initial consultation.\n\nThank you.`,
      recipient: 'connect@kohilyn.com',
    });
  };

  const handleRequestScopeProposalEmail = (scopeSummary: string) => {
    setProposalModalState({
      isOpen: true,
      subject: 'Official Scope Proposal Request - Koh I-Lyn & Co.',
      bodyText: `Hello Koh I-Lyn,\n\nI would like to request an official proposal for the following selected scope:\n\n${scopeSummary}\n\nPlease reach out to me to schedule an initial consultation.\n\nThank you.`,
      recipient: 'connect@kohilyn.com',
    });
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

        {/* Tree Divider */}
        <div className="max-w-7xl mx-auto px-4 py-2">
          <TreeSectionDivider label="Executive Scope Planner • C-Suite Engagement" />
        </div>

        {/* Custom Scope Planner */}
        <ScopePlanner
          initialSelectedId={plannerPresetServiceId}
          onOpenContactWithScope={handleRequestScopeProposalEmail}
        />

        {/* Tree Divider */}
        <div className="max-w-7xl mx-auto px-4 py-2">
          <TreeSectionDivider label="Independent Practice • Oxford Certified" />
        </div>

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

      {/* Proposal Request Modal */}
      <ProposalModal
        isOpen={proposalModalState.isOpen}
        onClose={() => setProposalModalState((prev) => ({ ...prev, isOpen: false }))}
        proposalDetails={{
          subject: proposalModalState.subject,
          bodyText: proposalModalState.bodyText,
          recipient: proposalModalState.recipient,
        }}
      />

      {/* Visitor AI Advisory Chatbox */}
      <VisitorChatbox
        onOpenProposalModal={(topic) => handleOpenContactWithTopic(topic)}
        onScrollToScopePlanner={() => {
          const el = document.getElementById('scope-planner');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

    </div>
  );
}
