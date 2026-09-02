import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeHero } from './components/HomeHero';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { CtaSection } from './components/CtaSection';
import { CctvPage } from './components/CctvPage';
import { RepairServicesPage } from './components/RepairServicesPage';
import { NetworkingPage } from './components/NetworkingPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { ProductCatalogPage } from './components/ProductCatalogPage';
import { QuoteModal } from './components/QuoteModal';
import { BookRepairModal } from './components/BookRepairModal';
import { AiChatbotDrawer } from './components/AiChatbotDrawer';
import { FloatingActions } from './components/FloatingActions';
import { AdminPortal } from './components/admin/AdminPortal';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { User, TabType } from './types';
import { dbStore } from './data/dbStore';

export function App() {
  const [viewMode, setViewMode] = useState<'website' | 'admin'>('website');
  const [currentUser, setCurrentUser] = useState<User | null>(dbStore.getCurrentUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [activePage, setActivePage] = useState<TabType>('home');
  const [isQuoteOpen, setIsQuoteOpen] = useState<boolean>(false);
  const [isRepairOpen, setIsRepairOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  
  const [quoteDefaultService, setQuoteDefaultService] = useState<string>('CCTV Installation');
  const [repairDefaultDevice, setRepairDefaultDevice] = useState<string>('Laptop');

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage, viewMode]);

  const handleOpenQuote = (serviceName?: string) => {
    if (serviceName) setQuoteDefaultService(serviceName);
    setIsQuoteOpen(true);
  };

  const handleOpenRepair = (deviceName?: string) => {
    if (deviceName) setRepairDefaultDevice(deviceName);
    setIsRepairOpen(true);
  };

  const handleOpenAdminPortal = () => {
    if (currentUser) {
      setViewMode('admin');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    dbStore.setCurrentUser(user);
    setViewMode('admin');
  };

  const handleLogout = () => {
    dbStore.logout();
    setCurrentUser(null);
    setViewMode('website');
  };

  // If in Admin Mode, show full CCTV Quotation & Billing Web Application
  if (viewMode === 'admin' && currentUser) {
    return (
      <AdminPortal
        currentUser={currentUser}
        onLogout={handleLogout}
        onSwitchToWebsite={() => setViewMode('website')}
      />
    );
  }

  // Otherwise, render Public Website
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Navigation Bar */}
      <Header
        currentTab={activePage}
        setCurrentTab={(page) => setActivePage(page)}
        onOpenQuoteModal={() => handleOpenQuote()}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenAdminPortal={handleOpenAdminPortal}
      />

      {/* Main Content Pages */}
      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <HomeHero
              onOpenQuoteModal={() => handleOpenQuote('CCTV Installation')}
              onOpenChat={() => setIsChatOpen(true)}
              onNavigateCctv={() => setActivePage('cctv')}
              onNavigateRepairs={() => setActivePage('repairs')}
            />
            <ServicesSection
              onOpenQuoteModal={handleOpenQuote}
              onOpenRepairModal={handleOpenRepair}
              onNavigateCctv={() => setActivePage('cctv')}
              onNavigateRepairs={() => setActivePage('repairs')}
              onNavigateNetworking={() => setActivePage('networking')}
            />
            <ProcessSection onOpenQuoteModal={() => handleOpenQuote()} />
            <WhyChooseSection />
            <CtaSection onOpenQuoteModal={() => handleOpenQuote()} />
            <ContactPage onOpenChat={() => setIsChatOpen(true)} />
          </>
        )}

        {activePage === 'catalog' && (
          <ProductCatalogPage
            onOpenQuoteModal={handleOpenQuote}
            onOpenChat={() => setIsChatOpen(true)}
          />
        )}

        {activePage === 'cctv' && (
          <CctvPage
            onOpenQuoteModal={handleOpenQuote}
            onOpenChat={() => setIsChatOpen(true)}
          />
        )}

        {activePage === 'repairs' && (
          <RepairServicesPage
            onOpenRepairModal={handleOpenRepair}
            onOpenChat={() => setIsChatOpen(true)}
          />
        )}

        {activePage === 'networking' && (
          <NetworkingPage
            onOpenQuoteModal={handleOpenQuote}
            onOpenChat={() => setIsChatOpen(true)}
          />
        )}

        {activePage === 'services' && (
          <div className="py-8">
            <ServicesSection
              onOpenQuoteModal={handleOpenQuote}
              onOpenRepairModal={handleOpenRepair}
              onNavigateCctv={() => setActivePage('cctv')}
              onNavigateRepairs={() => setActivePage('repairs')}
              onNavigateNetworking={() => setActivePage('networking')}
            />
            <CtaSection onOpenQuoteModal={() => handleOpenQuote()} />
          </div>
        )}

        {activePage === 'about' && (
          <AboutPage
            onOpenQuoteModal={handleOpenQuote}
            onNavigateContact={() => setActivePage('contact')}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage onOpenChat={() => setIsChatOpen(true)} />
        )}
      </main>

      {/* Footer */}
      <Footer
        setCurrentTab={(page) => setActivePage(page)}
        onOpenQuoteModal={() => handleOpenQuote()}
        onOpenAdminPortal={handleOpenAdminPortal}
      />

      {/* Floating Action Buttons (Sticky Call Now & WhatsApp) */}
      <FloatingActions
        onOpenChat={() => setIsChatOpen(true)}
        isChatOpen={isChatOpen}
      />

      {/* Interactive Modals & AI Chat Drawer */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        defaultService={quoteDefaultService}
      />

      <BookRepairModal
        isOpen={isRepairOpen}
        onClose={() => setIsRepairOpen(false)}
        defaultDevice={repairDefaultDevice}
      />

      <AiChatbotDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpenQuoteModal={() => {
          setIsChatOpen(false);
          setIsQuoteOpen(true);
        }}
      />

      {/* Staff & Admin Authentication Modal */}
      <AdminAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onSuccess={handleLoginSuccess}
      />

    </div>
  );
}

export default App;
