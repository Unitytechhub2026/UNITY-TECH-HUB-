import React from 'react';
import { 
  Users, 
  FileText, 
  Receipt, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Plus, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Phone, 
  MessageSquare, 
  Eye, 
  Printer, 
  Package,
  Calendar,
  Sparkles,
  ShoppingBag,
  CreditCard
} from 'lucide-react';
import { dbStore, formatLKR } from '../../data/dbStore';
import { AdminTab, Quotation, Invoice } from '../../types';

interface AdminDashboardProps {
  onNavigate: (tab: AdminTab) => void;
  onViewQuotation: (id: string) => void;
  onViewInvoice: (id: string) => void;
  onCreateQuotation?: () => void;
  onCreateInvoice?: () => void;
  onOpenNewCustomer?: () => void;
  onOpenNewProduct?: () => void;
  onOpenRecordPayment?: (invoiceId?: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigate,
  onViewQuotation,
  onViewInvoice,
  onCreateQuotation,
  onCreateInvoice,
  onOpenNewCustomer,
  onOpenNewProduct,
  onOpenRecordPayment
}) => {
  const customers = dbStore.getCustomers();
  const quotations = dbStore.getQuotations();
  const invoices = dbStore.getInvoices();
  const products = dbStore.getProducts();
  const payments = dbStore.getPayments();

  // Summary Metrics
  const totalCustomersCount = customers.length;
  const totalQuotationsCount = quotations.length;
  const pendingQuotationsCount = quotations.filter(q => q.status === 'PENDING' || q.status === 'SENT').length;
  const approvedQuotationsCount = quotations.filter(q => q.status === 'APPROVED' || q.status === 'CONVERTED').length;

  const totalInvoicesCount = invoices.length;
  const paidInvoicesCount = invoices.filter(i => i.paymentStatus === 'PAID').length;
  const unpaidInvoicesCount = invoices.filter(i => i.paymentStatus !== 'PAID').length;

  // Monthly Sales Calculation (Current Month)
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyInvoices = invoices.filter(inv => {
    const d = new Date(inv.invoiceDate);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const monthlySales = monthlyInvoices.reduce((sum, inv) => sum + inv.grandTotal, 0);

  // Monthly Profit Estimate (Total Sales minus estimated cost)
  const monthlyCostEstimate = monthlyInvoices.reduce((sum, inv) => {
    const itemsCost = inv.items.reduce((iSum, item) => {
      // Find matching product purchase price or default 70%
      const prod = products.find(p => p.name === item.description || p.model === item.model);
      const unitCost = prod ? prod.purchasePrice : item.rate * 0.7;
      return iSum + (unitCost * item.qty);
    }, 0);
    return sum + itemsCost;
  }, 0);

  const monthlyProfit = Math.max(0, monthlySales - monthlyCostEstimate);
  const lowStockProducts = products.filter(p => p.stockQuantity <= p.minStock);

  // Recent 5 Quotations & Invoices
  const recentQuotations = [...quotations].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
  const recentInvoices = [...invoices].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 border border-emerald-500/40 text-emerald-300">APPROVED</span>;
      case 'CONVERTED':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-950 border border-blue-500/40 text-blue-300">INVOICED</span>;
      case 'PENDING':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 border border-amber-500/40 text-amber-300">PENDING</span>;
      case 'SENT':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 border border-cyan-500/40 text-cyan-300">SENT</span>;
      case 'DRAFT':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 border border-slate-700 text-slate-300">DRAFT</span>;
      case 'REJECTED':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-950 border border-red-500/40 text-red-300">REJECTED</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">{status}</span>;
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'PAID':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 border border-emerald-500/40 text-emerald-300">PAID</span>;
      case 'PARTIALLY PAID':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 border border-amber-500/40 text-amber-300">PARTIAL</span>;
      case 'UNPAID':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-950 border border-red-500/40 text-red-300">UNPAID</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">{status}</span>;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0b1329] to-slate-900 border border-cyan-500/30 shadow-xl relative overflow-hidden">
        <div className="space-y-1 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[11px] font-mono font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Unity Tech Hub Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif] text-white">
            CCTV Quotation & Billing Management
          </h1>
          <p className="text-xs text-slate-300">
            Professional Quotations, Tax Invoicing, Real-Time Stock Tracking & Sri Lankan Payment Ledger.
          </p>
        </div>

        {/* 5 Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 z-10">
          <button
            onClick={() => onCreateQuotation ? onCreateQuotation() : onNavigate('quotation-create')}
            id="dash-new-quotation-btn"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+ NEW QUOTATION</span>
          </button>

          <button
            onClick={() => onCreateInvoice ? onCreateInvoice() : onNavigate('invoice-create')}
            id="dash-new-invoice-btn"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-600/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <Receipt className="w-4 h-4" />
            <span>+ NEW INVOICE</span>
          </button>

          <button
            onClick={() => onOpenNewCustomer ? onOpenNewCustomer() : onNavigate('customers')}
            id="dash-new-customer-btn"
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>+ CUSTOMER</span>
          </button>

          <button
            onClick={() => onOpenNewProduct ? onOpenNewProduct() : onNavigate('products')}
            id="dash-add-product-btn"
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-amber-500/50 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Package className="w-3.5 h-3.5 text-amber-400" />
            <span>+ PRODUCT</span>
          </button>

          <button
            onClick={() => onOpenRecordPayment ? onOpenRecordPayment() : onNavigate('payments')}
            id="dash-record-payment-btn"
            className="px-3.5 py-2.5 rounded-xl bg-purple-900/80 hover:bg-purple-800 border border-purple-500/40 text-purple-200 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-purple-900/20"
          >
            <CreditCard className="w-3.5 h-3.5 text-purple-300" />
            <span>+ PAYMENT</span>
          </button>
        </div>
      </div>

      {/* 10 Dashboard Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        
        {/* Total Customers */}
        <div 
          onClick={() => onNavigate('customers')}
          className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group space-y-2"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Total Customers</span>
            <Users className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {totalCustomersCount}
          </div>
          <p className="text-[10px] text-blue-400 font-semibold">
            Active Accounts
          </p>
        </div>

        {/* Total Quotations */}
        <div 
          onClick={() => onNavigate('quotations')}
          className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group space-y-2"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Total Quotations</span>
            <FileText className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {totalQuotationsCount}
          </div>
          <p className="text-[10px] text-cyan-400 font-semibold">
            {pendingQuotationsCount} Pending Action
          </p>
        </div>

        {/* Approved Quotations */}
        <div 
          onClick={() => onNavigate('quotations')}
          className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group space-y-2"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Approved Quotes</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {approvedQuotationsCount}
          </div>
          <p className="text-[10px] text-emerald-300 font-semibold">
            Ready for Invoicing
          </p>
        </div>

        {/* Total Invoices */}
        <div 
          onClick={() => onNavigate('invoices')}
          className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer group space-y-2"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Total Invoices</span>
            <Receipt className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {totalInvoicesCount}
          </div>
          <p className="text-[10px] text-indigo-400 font-semibold">
            {paidInvoicesCount} Fully Paid
          </p>
        </div>

        {/* Unpaid Invoices */}
        <div 
          onClick={() => onNavigate('invoices')}
          className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group space-y-2"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Unpaid / Balance</span>
            <Clock className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">
            {unpaidInvoicesCount}
          </div>
          <p className="text-[10px] text-amber-300 font-semibold">
            Pending Payment
          </p>
        </div>

        {/* Monthly Sales */}
        <div 
          onClick={() => onNavigate('reports')}
          className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-cyan-950/40 border border-cyan-500/40 hover:border-cyan-400 transition-all cursor-pointer group space-y-2 col-span-2 sm:col-span-1 lg:col-span-2"
        >
          <div className="flex items-center justify-between text-cyan-300">
            <span className="text-xs font-bold uppercase tracking-wider">Monthly Gross Sales</span>
            <DollarSign className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            {formatLKR(monthlySales)}
          </div>
          <p className="text-[10px] text-cyan-400 font-medium">
            Calculated across {monthlyInvoices.length} billing orders this month
          </p>
        </div>

        {/* Monthly Profit */}
        <div 
          onClick={() => onNavigate('reports')}
          className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950/40 border border-emerald-500/40 hover:border-emerald-400 transition-all cursor-pointer group space-y-2 col-span-2 sm:col-span-1 lg:col-span-2"
        >
          <div className="flex items-center justify-between text-emerald-300">
            <span className="text-xs font-bold uppercase tracking-wider">Estimated Profit</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
            {formatLKR(monthlyProfit)}
          </div>
          <p className="text-[10px] text-emerald-300 font-medium">
            Gross Margin after wholesale product costs
          </p>
        </div>

        {/* Low Stock Items */}
        <div 
          onClick={() => onNavigate('products')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer group space-y-2 ${
            lowStockProducts.length > 0 
              ? 'bg-red-950/30 border-red-500/50 hover:border-red-400' 
              : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Low Stock Alert</span>
            <AlertTriangle className={`w-4 h-4 ${lowStockProducts.length > 0 ? 'text-red-400 animate-pulse' : 'text-slate-400'}`} />
          </div>
          <div className={`text-2xl font-black font-mono ${lowStockProducts.length > 0 ? 'text-red-400' : 'text-slate-200'}`}>
            {lowStockProducts.length}
          </div>
          <p className="text-[10px] text-red-300 font-semibold">
            {lowStockProducts.length > 0 ? 'Reorder Needed' : 'Inventory Healthy'}
          </p>
        </div>

      </div>

      {/* Tables Row: Recent Quotations & Recent Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Quotations */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-white font-['Outfit',sans-serif]">
                Recent CCTV Quotations
              </h2>
            </div>
            <button
              onClick={() => onNavigate('quotations')}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({quotations.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-3 font-semibold">Quote No</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Grand Total</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentQuotations.map((quote) => (
                  <tr key={quote.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 font-mono font-bold text-cyan-300">
                      {quote.quotationNumber}
                    </td>
                    <td className="py-3">
                      <div className="font-semibold text-white truncate max-w-[140px]">
                        {quote.customerName}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[140px]">
                        {quote.siteAddress || quote.customerAddress}
                      </div>
                    </td>
                    <td className="py-3 font-mono font-semibold text-white whitespace-nowrap">
                      {formatLKR(quote.grandTotal)}
                    </td>
                    <td className="py-3">
                      {getStatusBadge(quote.status)}
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => onViewQuotation(quote.id)}
                        title="View & Print Quotation"
                        className="p-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white font-['Outfit',sans-serif]">
                Recent Invoices & Bills
              </h2>
            </div>
            <button
              onClick={() => onNavigate('invoices')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({invoices.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-3 font-semibold">Invoice No</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Total / Due</th>
                  <th className="pb-3 font-semibold">Payment</th>
                  <th className="pb-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 font-mono font-bold text-emerald-300">
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-3">
                      <div className="font-semibold text-white truncate max-w-[140px]">
                        {inv.customerName}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {inv.invoiceDate}
                      </div>
                    </td>
                    <td className="py-3 font-mono">
                      <div className="font-semibold text-white whitespace-nowrap">
                        {formatLKR(inv.grandTotal)}
                      </div>
                      {inv.balanceDue > 0 ? (
                        <div className="text-[10px] text-amber-400">
                          Due: {formatLKR(inv.balanceDue)}
                        </div>
                      ) : (
                        <div className="text-[10px] text-emerald-400">
                          Paid in Full
                        </div>
                      )}
                    </td>
                    <td className="py-3">
                      {getPaymentBadge(inv.paymentStatus)}
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {inv.balanceDue > 0 && (
                          <button
                            onClick={() => onOpenRecordPayment ? onOpenRecordPayment(inv.id) : onNavigate('payments')}
                            title="Record Payment"
                            className="p-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 transition-colors cursor-pointer"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => onViewInvoice(inv.id)}
                          title="View & Print Invoice"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
