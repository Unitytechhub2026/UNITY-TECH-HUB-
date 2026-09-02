import React, { useState } from 'react';
import { 
  Shield, 
  Search, 
  Plus, 
  Globe, 
  User, 
  Bell, 
  LogOut, 
  FileText, 
  Receipt, 
  UserPlus, 
  PackagePlus, 
  DollarSign,
  Menu,
  ChevronDown
} from 'lucide-react';
import { AppUser, AdminTab } from '../../types';
import { dbStore } from '../../data/dbStore';

interface AdminHeaderProps {
  user?: AppUser;
  currentUser?: AppUser;
  activeTab?: AdminTab;
  onNavigate?: (tab: AdminTab) => void;
  onBackToWebsite?: () => void;
  onSwitchToWebsite?: () => void;
  onLogout: () => void;
  onToggleSidebar?: () => void;
  onCreateQuotation?: () => void;
  onCreateInvoice?: () => void;
  onRecordPayment?: () => void;
  onGlobalSearch?: (query: string) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  user,
  currentUser,
  activeTab,
  onNavigate,
  onBackToWebsite,
  onSwitchToWebsite,
  onLogout,
  onToggleSidebar,
  onCreateQuotation,
  onCreateInvoice,
  onRecordPayment,
  onGlobalSearch
}) => {
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Safe user resolution
  const activeUser = user || currentUser || dbStore.getCurrentUser() || {
    id: 'usr-1',
    name: 'Kasun Jayawardena',
    email: 'kasun@unitytechhub.lk',
    phone: '072 740 2288',
    role: 'ADMIN',
    isActive: true,
    createdAt: '2026-01-01T00:00:00.000Z'
  };

  const handleBackToWebsite = onBackToWebsite || onSwitchToWebsite || (() => {});

  const handleCreateQuote = () => {
    if (onCreateQuotation) {
      onCreateQuotation();
    } else if (onNavigate) {
      onNavigate('quotations');
    }
  };

  const handleCreateInv = () => {
    if (onCreateInvoice) {
      onCreateInvoice();
    } else if (onNavigate) {
      onNavigate('invoices');
    }
  };

  const handleRecordPay = () => {
    if (onRecordPayment) {
      onRecordPayment();
    } else if (onNavigate) {
      onNavigate('payments');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onGlobalSearch && searchQuery.trim()) {
      onGlobalSearch(searchQuery);
    }
  };

  return (
    <header id="admin-topbar" className="sticky top-0 z-30 bg-[#030712]/95 backdrop-blur-md border-b border-cyan-500/20 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Mobile Toggle & Brand Indicator */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-md shadow-cyan-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold font-['Outfit',sans-serif] tracking-wider text-sm text-white">
                  UNITY TECH HUB
                </span>
                <span className="px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-400 text-[10px] font-mono font-bold uppercase">
                  Billing OS
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                CCTV Quotations • Invoicing • Stock • 072 740 2288
              </p>
            </div>
          </div>
        </div>

        {/* Center: Search Indicator */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Quotations (QT-...), Invoices (INV-...), Customers, CCTV Models..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (onGlobalSearch) onGlobalSearch(e.target.value);
              }}
              className="w-full bg-slate-900/80 border border-slate-800 focus:border-cyan-500/50 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
            />
          </form>
        </div>

        {/* Right: Quick Action Dropdown, Public Website Link, User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Create Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowQuickMenu(!showQuickMenu)}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-transform active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span className="hidden sm:inline">Quick Action</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {showQuickMenu && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-[#0b1329] border border-cyan-500/40 rounded-2xl p-2 shadow-2xl z-50 text-slate-200 animate-in fade-in zoom-in-95 duration-100"
                onClick={() => setShowQuickMenu(false)}
              >
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-400 border-b border-slate-800">
                  New Transaction
                </div>
                
                <button
                  onClick={handleCreateQuote}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-xs font-medium flex items-center gap-2 text-slate-200 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>+ New CCTV Quotation</span>
                </button>

                <button
                  onClick={handleCreateInv}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-xs font-medium flex items-center gap-2 text-slate-200 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <Receipt className="w-4 h-4 text-emerald-400" />
                  <span>+ New Tax Invoice / Bill</span>
                </button>

                <button
                  onClick={() => onNavigate && onNavigate('customers')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-xs font-medium flex items-center gap-2 text-slate-200 hover:text-blue-300 transition-colors cursor-pointer"
                >
                  <UserPlus className="w-4 h-4 text-blue-400" />
                  <span>+ Add Customer</span>
                </button>

                <button
                  onClick={() => onNavigate && onNavigate('products')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-xs font-medium flex items-center gap-2 text-slate-200 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <PackagePlus className="w-4 h-4 text-amber-400" />
                  <span>+ Add Product / Model</span>
                </button>

                <button
                  onClick={handleRecordPay}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-xs font-medium flex items-center gap-2 text-slate-200 hover:text-purple-300 transition-colors cursor-pointer"
                >
                  <DollarSign className="w-4 h-4 text-purple-400" />
                  <span>+ Record Payment</span>
                </button>
              </div>
            )}
          </div>

          {/* Switch to Public Website */}
          <button
            onClick={handleBackToWebsite}
            title="View Public Customer Website"
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Public Website</span>
          </button>

          {/* User Profile / Logout */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400 text-xs font-bold">
                {(activeUser.name || 'A').charAt(0)}
              </div>
              <div className="text-left hidden xl:block">
                <div className="text-xs font-semibold text-slate-200 leading-tight">
                  {activeUser.name || 'User'}
                </div>
                <div className="text-[10px] text-cyan-400 font-mono">
                  {activeUser.role || 'STAFF'}
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showUserMenu && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-[#0b1329] border border-cyan-500/40 rounded-2xl p-2 shadow-2xl z-50 text-slate-200"
                onClick={() => setShowUserMenu(false)}
              >
                <div className="px-3 py-2 border-b border-slate-800">
                  <p className="text-xs font-bold text-white">{activeUser.name}</p>
                  <p className="text-[10px] text-slate-400">{activeUser.email}</p>
                </div>

                <button
                  onClick={() => onNavigate && onNavigate('settings')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer mt-1"
                >
                  Company Settings
                </button>

                <button
                  onClick={() => onNavigate && onNavigate('users')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  Manage Staff Users
                </button>

                <button
                  onClick={onLogout}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-950/60 text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-2 cursor-pointer border-t border-slate-800 mt-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
