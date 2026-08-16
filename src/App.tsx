import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScopePlanner } from './components/ScopePlanner';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { VisitorChatbox } from './components/VisitorChatbox';
import { ServiceModal } from './components/ServiceModal';
import { ProposalModal } from './components/ProposalModal';
import { GoldSectionDivider } from './components/GoldAccents';
import { ServiceItem } from './types';
import { SERVICE_ITEMS } from './data/siteData';

export function App() {
  const [activeServiceModal, setActiveServiceModal] = useState<ServiceItem | null>(null);
  const [proposalModalOpen, setProposalModalOpen] = useState(false);
  const [proposalDetails, setProposalDetails] = useState({
    subject: 'Official Advisory Proposal Request - Koh I-Lyn & Co.',
    bodyText: '',
    recipient: 'connect@kohilyn.com',
  });

  const handleOpenProposalModalWithTopic = (topic: string) => {
    const emailBody = `Hello Koh I-Lyn,\r\n\r\nI am writing to inquire regarding your advisory practice on the following topic:\r\n\r\nTopic: ${topic}\r\n\r\nPlease send over further information or schedule an initial consultation.\r\n\r\nThank you.`;
    setProposalDetails({
      subject: `Advisory Inquiry: ${topic} - Koh I-Lyn & Co.`,
      bodyText: emailBody,
      recipient: 'connect@kohilyn.com',
    });
    setProposalModalOpen(true);
  };

  const handleOpenContactWithScope = (scopeSummary: string) => {
    const emailBody = `Hello Koh I-Lyn,\r\n\r\nI would like to request an official proposal for the following selected scope:\r\n\r\n${scopeSummary}\r\n\r\nPlease reach out to me to schedule an initial consultation.\r\n\r\nThank you.`;
    setProposalDetails({
      subject: 'Official Scope Proposal Request - Koh I-Lyn & Co.',
      bodyText: emailBody,
      recipient: 'connect@kohilyn.com',
    });
    setProposalModalOpen(true);
  };

  const handleScrollToScopePlanner = () => {
    const elem = document.getElementById('scope-planner');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf8] text-[#1c1917] white-gold-mesh flex flex-col selection:bg-[#edd89a] selection:text-[#5a420b]">
      
      {/* Top Navbar */}
      <Navbar
        onOpenContact={() => handleOpenProposalModalWithTopic('General Advisory Consultation')}
        activeSection="home"
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* 1. Hero Section */}
        <Hero />

        {/* Minimalist Gold Section Divider */}
        <GoldSectionDivider label="Sustainability • Accounting • Advisory" />

        {/* 2. Interactive Scope Planner */}
        <ScopePlanner
          onOpenContactWithScope={handleOpenContactWithScope}
        />

        {/* Minimalist Gold Section Divider */}
        <GoldSectionDivider label="Executive Qualifications • Professional Accreditations" />

        {/* 3. About Section */}
        <AboutSection
          onOpenContact={() => handleOpenProposalModalWithTopic('Executive Advisory Engagement')}
        />

      </main>

      {/* Footer */}
      <Footer />

      {/* Floating AI Chatbox */}
      <VisitorChatbox
        onOpenProposalModal={handleOpenProposalModalWithTopic}
        onScrollToScopePlanner={handleScrollToScopePlanner}
      />

      {/* Service Detail Modal */}
      <ServiceModal
        service={activeServiceModal}
        onClose={() => setActiveServiceModal(null)}
        onSelectInPlanner={(serviceId) => {
          handleScrollToScopePlanner();
        }}
        onBookCall={() => {
          if (activeServiceModal) {
            handleOpenProposalModalWithTopic(activeServiceModal.title);
          }
        }}
      />

      {/* Proposal Modal */}
      <ProposalModal
        isOpen={proposalModalOpen}
        onClose={() => setProposalModalOpen(false)}
        proposalDetails={proposalDetails}
      />

    </div>
  );
}

export default App;
