import React, { useState } from 'react';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';
import { AdminDashboard } from './AdminDashboard';
import { QuotationsManager } from './QuotationsManager';
import { QuotationCreator } from './QuotationCreator';
import { QuotationDocumentView } from './QuotationDocumentView';
import { InvoicesManager } from './InvoicesManager';
import { InvoiceCreator } from './InvoiceCreator';
import { InvoiceDocumentView } from './InvoiceDocumentView';
import { CustomersManager } from './CustomersManager';
import { ProductsManager } from './ProductsManager';
import { ServicesManager } from './ServicesManager';
import { PaymentsManager } from './PaymentsManager';
import { PaymentModal } from './PaymentModal';
import { ReportsManager } from './ReportsManager';
import { CompanySettingsView } from './CompanySettingsView';
import { UsersManager } from './UsersManager';
import { PdfTemplatesView } from './PdfTemplatesView';
import { SiteSurveysManager } from './SiteSurveysManager';
import { PriceSearchHub } from './PriceSearchHub';
import { SuppliersManager } from './SuppliersManager';
import { StockInventoryManager } from './StockInventoryManager';
import { WarrantyManager } from './WarrantyManager';
import { ServiceHistoryManager } from './ServiceHistoryManager';
import { AdminTab, User, Quotation } from '../../types';
import { dbStore } from '../../data/dbStore';

interface AdminPortalProps {
  currentUser: User;
  onLogout: () => void;
  onSwitchToWebsite: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  currentUser,
  onLogout,
  onSwitchToWebsite
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Sub-view flow state
  const [subView, setSubView] = useState<{
    type: 'none' | 'create-quote' | 'edit-quote' | 'view-quote' | 'create-invoice' | 'edit-invoice' | 'view-invoice';
    id?: string;
    customerId?: string;
    fromQuotationId?: string;
  }>({ type: 'none' });

  // Payment modal state
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentTargetInvoiceId, setPaymentTargetInvoiceId] = useState<string | undefined>();

  // Global search handler
  const handleGlobalSearch = (query: string) => {
    setActiveTab('quotations');
    setSubView({ type: 'none' });
  };

  // Action helpers
  const handleCreateQuotation = (customerId?: string) => {
    setSubView({ type: 'create-quote', customerId });
  };

  const handleEditQuotation = (id: string) => {
    setSubView({ type: 'edit-quote', id });
  };

  const handleViewQuotation = (id: string) => {
    setSubView({ type: 'view-quote', id });
  };

  const handleCreateInvoice = (fromQuotationId?: string, customerId?: string) => {
    setSubView({ type: 'create-invoice', fromQuotationId, customerId });
  };

  const handleEditInvoice = (id: string) => {
    setSubView({ type: 'edit-invoice', id });
  };

  const handleViewInvoice = (id: string) => {
    setSubView({ type: 'view-invoice', id });
  };

  const handleOpenRecordPayment = (invoiceId?: string) => {
    setPaymentTargetInvoiceId(invoiceId);
    setPaymentModalOpen(true);
  };

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
    setSubView({ type: 'none' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Outfit',sans-serif]">
      
      {/* Top Header */}
      <AdminHeader
        user={currentUser}
        currentUser={currentUser}
        activeTab={activeTab}
        onNavigate={handleTabChange}
        onLogout={onLogout}
        onBackToWebsite={onSwitchToWebsite}
        onSwitchToWebsite={onSwitchToWebsite}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        onCreateQuotation={() => handleCreateQuotation()}
        onCreateInvoice={() => handleCreateInvoice()}
        onRecordPayment={() => handleOpenRecordPayment()}
        onGlobalSearch={handleGlobalSearch}
      />

      {/* Body Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar */}
        <div className="no-print">
          <AdminSidebar
            activeTab={activeTab}
            onSelectTab={handleTabChange}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          
          {/* Sub-view Overrides */}
          {subView.type === 'create-quote' && (
            <QuotationCreator
              initialCustomerId={subView.customerId}
              onBack={() => setSubView({ type: 'none' })}
              onViewQuotation={(id) => setSubView({ type: 'view-quote', id })}
            />
          )}

          {subView.type === 'edit-quote' && subView.id && (
            <QuotationCreator
              editingQuotationId={subView.id}
              onBack={() => setSubView({ type: 'none' })}
              onViewQuotation={(id) => setSubView({ type: 'view-quote', id })}
            />
          )}

          {subView.type === 'view-quote' && subView.id && (
            <QuotationDocumentView
              quotationId={subView.id}
              onBack={() => setSubView({ type: 'none' })}
              onConvertToInvoice={(id) => handleCreateInvoice(id)}
            />
          )}

          {subView.type === 'create-invoice' && (
            <InvoiceCreator
              fromQuotationId={subView.fromQuotationId}
              initialCustomerId={subView.customerId}
              onBack={() => setSubView({ type: 'none' })}
              onViewInvoice={(id) => setSubView({ type: 'view-invoice', id })}
            />
          )}

          {subView.type === 'edit-invoice' && subView.id && (
            <InvoiceCreator
              editingInvoiceId={subView.id}
              onBack={() => setSubView({ type: 'none' })}
              onViewInvoice={(id) => setSubView({ type: 'view-invoice', id })}
            />
          )}

          {subView.type === 'view-invoice' && subView.id && (
            <InvoiceDocumentView
              invoiceId={subView.id}
              onBack={() => setSubView({ type: 'none' })}
              onRecordPayment={(id) => handleOpenRecordPayment(id)}
            />
          )}

          {/* Standard Tabs */}
          {subView.type === 'none' && (
            <>
              {activeTab === 'dashboard' && (
                <AdminDashboard
                  onNavigate={handleTabChange}
                  onCreateQuotation={() => handleCreateQuotation()}
                  onCreateInvoice={() => handleCreateInvoice()}
                  onViewQuotation={handleViewQuotation}
                  onViewInvoice={handleViewInvoice}
                  onOpenRecordPayment={(invoiceId) => handleOpenRecordPayment(invoiceId)}
                  onOpenNewCustomer={() => handleTabChange('customers')}
                  onOpenNewProduct={() => handleTabChange('products')}
                />
              )}

              {activeTab === 'quotations' && (
                <QuotationsManager
                  onCreateNew={() => handleCreateQuotation()}
                  onViewQuotation={handleViewQuotation}
                  onEditQuotation={handleEditQuotation}
                  onConvertToInvoice={(id) => handleCreateInvoice(id)}
                />
              )}

              {activeTab === 'invoices' && (
                <InvoicesManager
                  onCreateNew={() => handleCreateInvoice()}
                  onViewInvoice={handleViewInvoice}
                  onRecordPayment={handleOpenRecordPayment}
                />
              )}

              {activeTab === 'customers' && (
                <CustomersManager
                  onCreateQuotationForCustomer={(customerId) => handleCreateQuotation(customerId)}
                  onCreateInvoiceForCustomer={(customerId) => handleCreateInvoice(undefined, customerId)}
                />
              )}

              {activeTab === 'site-surveys' && (
                <SiteSurveysManager
                  onSurveyConvertedToQuotation={(quotation) => {
                    handleViewQuotation(quotation.id);
                  }}
                />
              )}

              {activeTab === 'price-search' && (
                <PriceSearchHub
                  onNavigateToQuotation={() => handleTabChange('quotations')}
                  onAddToQuotation={() => {
                    handleCreateQuotation();
                  }}
                />
              )}

              {activeTab === 'products' && (
                <ProductsManager />
              )}

              {activeTab === 'stock' && (
                <StockInventoryManager />
              )}

              {activeTab === 'suppliers' && (
                <SuppliersManager />
              )}

              {activeTab === 'services' && (
                <ServicesManager />
              )}

              {activeTab === 'service-history' && (
                <ServiceHistoryManager />
              )}

              {activeTab === 'warranty' && (
                <WarrantyManager />
              )}

              {activeTab === 'payments' && (
                <PaymentsManager
                  onOpenRecordPayment={() => handleOpenRecordPayment()}
                  onViewInvoice={handleViewInvoice}
                />
              )}

              {activeTab === 'reports' && (
                <ReportsManager />
              )}

              {activeTab === 'templates' && (
                <PdfTemplatesView />
              )}

              {activeTab === 'settings' && (
                <CompanySettingsView />
              )}

              {activeTab === 'users' && (
                <UsersManager />
              )}
            </>
          )}

        </main>

      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        targetInvoiceId={paymentTargetInvoiceId}
        onPaymentSuccess={() => {
          // Tab refresh happens automatically through direct dbStore calls
        }}
      />

    </div>
  );
};
