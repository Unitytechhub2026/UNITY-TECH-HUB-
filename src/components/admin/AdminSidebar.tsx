import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Receipt, 
  Package, 
  Wrench, 
  CreditCard, 
  BarChart3, 
  Building2, 
  ShieldCheck, 
  FileCheck,
  PlusCircle,
  Phone,
  HelpCircle,
  Sparkles,
  ClipboardList,
  Search,
  Truck,
  Boxes,
  ShieldAlert,
  History
} from 'lucide-react';
import { AdminTab } from '../../types';
import { dbStore } from '../../data/dbStore';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onNavigate: (tab: AdminTab) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onNavigate,
  isOpen,
  onCloseMobile
}) => {
  const quotations = dbStore.getQuotations();
  const invoices = dbStore.getInvoices();
  const products = dbStore.getProducts();
  const surveys = dbStore.getSiteSurveys();
  const claims = dbStore.getWarrantyClaims();
  const serials = dbStore.getSerialNumbers();

  const pendingQuotes = quotations.filter(q => q.status === 'PENDING' || q.status === 'SENT').length;
  const unpaidInvoices = invoices.filter(i => i.paymentStatus !== 'PAID').length;
  const lowStockCount = products.filter(p => p.stockQuantity <= p.minStock).length;
  const activeSurveys = surveys.filter(s => s.status !== 'Quoted').length;
  const openClaimsCount = claims.filter(c => c.status === 'OPEN' || c.status === 'UNDER REVIEW').length;

  const navItems: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number; badgeColor?: string }[] = [
    { id: 'dashboard', label: '1. Dashboard', icon: LayoutDashboard },
    { id: 'customers', label: '2. Customers & Sites', icon: Users },
    { id: 'site-surveys', label: '3. Site Surveys & Estimator', icon: ClipboardList, badge: activeSurveys > 0 ? activeSurveys : undefined, badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' },
    { id: 'price-search', label: '4. Market Price Search', icon: Search },
    { id: 'quotations', label: '5. Quotations', icon: FileText, badge: pendingQuotes > 0 ? pendingQuotes : undefined, badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
    { id: 'invoices', label: '6. Invoices / Bills', icon: Receipt, badge: unpaidInvoices > 0 ? unpaidInvoices : undefined, badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
    { id: 'products', label: '7. Products & Specs', icon: Package },
    { id: 'stock', label: '8. Stock & Inventory', icon: Boxes, badge: lowStockCount > 0 ? lowStockCount : undefined, badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40' },
    { id: 'suppliers', label: '9. Suppliers & Vendors', icon: Truck },
    { id: 'services', label: '10. Standard Rates', icon: Wrench },
    { id: 'service-history', label: '11. Service & Repair Jobs', icon: History },
    { id: 'warranty', label: '12. Warranty & Useful Life', icon: ShieldAlert, badge: openClaimsCount > 0 ? openClaimsCount : undefined, badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
    { id: 'payments', label: '13. Payments', icon: CreditCard },
    { id: 'reports', label: '14. Reports & Analytics', icon: BarChart3 },
    { id: 'settings', label: '15. Company Settings', icon: Building2 },
    { id: 'users', label: '16. Users / Staff', icon: ShieldCheck },
    { id: 'templates', label: '17. PDF Templates', icon: FileCheck },
  ];

  const handleSelect = (tab: AdminTab) => {
    onNavigate(tab);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="admin-sidebar"
        className={`fixed lg:sticky top-0 lg:top-[57px] left-0 z-40 h-screen lg:h-[calc(100vh-57px)] w-64 bg-[#030712] border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Navigation List */}
        <div className="p-4 space-y-1 overflow-y-auto flex-1">
          
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            System Modules
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || 
              (item.id === 'quotations' && (activeTab === 'quotation-create' || activeTab === 'quotation-view')) ||
              (item.id === 'invoices' && (activeTab === 'invoice-create' || activeTab === 'invoice-view'));

            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-950/90 to-blue-950/70 border border-cyan-500/50 text-cyan-300 shadow-md shadow-cyan-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Quick Create Shortcuts Section */}
          <div className="pt-4 mt-4 border-t border-slate-800/80 space-y-2">
            <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Quick Shortcuts
            </div>

            <button
              onClick={() => handleSelect('quotation-create')}
              className="w-full text-left px-3.5 py-2 rounded-xl bg-cyan-950/40 hover:bg-cyan-950/80 border border-cyan-500/30 text-xs font-semibold text-cyan-300 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>+ Create Quotation</span>
            </button>

            <button
              onClick={() => handleSelect('invoice-create')}
              className="w-full text-left px-3.5 py-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/80 border border-emerald-500/30 text-xs font-semibold text-emerald-300 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>+ Create Invoice</span>
            </button>
          </div>

        </div>

        {/* Sidebar Footer Info */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 text-xs space-y-2">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-slate-200">UNITY TECH HUB</span>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                ONLINE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 flex items-center gap-1">
              <Phone className="w-3 h-3 text-cyan-400" />
              <span>Hotline: 072 740 2288</span>
            </p>
          </div>
        </div>

      </aside>
    </>
  );
};
