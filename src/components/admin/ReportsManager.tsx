import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Download, 
  Printer, 
  Calendar, 
  FileText, 
  Receipt, 
  Users, 
  Package, 
  CheckCircle2, 
  Clock,
  AlertTriangle
} from 'lucide-react';
import { dbStore, formatLKR } from '../../data/dbStore';

export const ReportsManager: React.FC = () => {
  const [reportPeriod, setReportPeriod] = useState<'month' | 'quarter' | 'year' | 'all'>('month');

  const customers = dbStore.getCustomers();
  const quotations = dbStore.getQuotations();
  const invoices = dbStore.getInvoices();
  const products = dbStore.getProducts();
  const payments = dbStore.getPayments();

  // Financial Metrics
  const totalSales = invoices.reduce((sum, i) => sum + i.grandTotal, 0);
  const totalCollections = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalOutstanding = invoices.reduce((sum, i) => sum + i.balanceDue, 0);

  // Profit estimation
  const totalCost = invoices.reduce((sum, inv) => {
    return sum + inv.items.reduce((iSum, item) => {
      const prod = products.find(p => p.name === item.description || p.model === item.model);
      const unitCost = prod ? prod.purchasePrice : item.rate * 0.7;
      return iSum + (unitCost * item.qty);
    }, 0);
  }, 0);

  const estimatedGrossProfit = Math.max(0, totalSales - totalCost);
  const profitMarginPercent = totalSales > 0 ? Math.round((estimatedGrossProfit / totalSales) * 100) : 0;

  // Conversion rate
  const conversionRate = quotations.length > 0
    ? Math.round((quotations.filter(q => q.status === 'CONVERTED' || q.status === 'APPROVED').length / quotations.length) * 100)
    : 0;

  // Stock inventory valuation
  const inventoryRetailValue = products.reduce((sum, p) => sum + (p.sellingPrice * p.stockQuantity), 0);
  const inventoryCostValue = products.reduce((sum, p) => sum + (p.purchasePrice * p.stockQuantity), 0);

  // Export to CSV Function
  const handleExportCSV = () => {
    const headers = ['Invoice Number', 'Invoice Date', 'Customer Name', 'Quotation Ref', 'Grand Total (LKR)', 'Amount Paid (LKR)', 'Balance Due (LKR)', 'Payment Status'];
    const rows = invoices.map(i => [
      i.invoiceNumber,
      i.invoiceDate,
      `"${i.customerName}"`,
      i.quotationReference || '-',
      i.grandTotal,
      i.amountPaid,
      i.balanceDue,
      i.paymentStatus
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Unity_Tech_Hub_Sales_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-['Outfit',sans-serif] text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            <span>Business Reports & Sales Analytics</span>
          </h1>
          <p className="text-xs text-slate-400">
            Real-time turnover, collections, gross profit margin, inventory valuation, and tax audit records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            id="export-csv-btn"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV / Excel</span>
          </button>

          <button
            onClick={handlePrintReport}
            id="print-report-btn"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* 4 Financial Performance Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Billed Sales */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider">Gross Invoiced Sales</span>
            <DollarSign className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            {formatLKR(totalSales)}
          </div>
          <div className="text-[11px] text-cyan-400 font-semibold">
            Across {invoices.length} Issued Invoices
          </div>
        </div>

        {/* Collections */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider">Actual Cash Collected</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
            {formatLKR(totalCollections)}
          </div>
          <div className="text-[11px] text-emerald-300 font-semibold">
            Bank Transfers & Cash
          </div>
        </div>

        {/* Outstanding Receivables */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider">Pending Receivables</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
            {formatLKR(totalOutstanding)}
          </div>
          <div className="text-[11px] text-amber-300 font-semibold">
            Due from Active Accounts
          </div>
        </div>

        {/* Estimated Gross Margin */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 to-emerald-950/40 border border-emerald-500/40 space-y-2">
          <div className="flex items-center justify-between text-emerald-300 text-xs">
            <span className="font-semibold uppercase tracking-wider">Gross Profit Margin</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
            {formatLKR(estimatedGrossProfit)}
          </div>
          <div className="text-[11px] text-emerald-300 font-semibold">
            ~{profitMarginPercent}% Margin on Equipment & Labor
          </div>
        </div>

      </div>

      {/* Inventory Valuation & Conversion Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Inventory Valuation */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-lg">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Package className="w-4 h-4 text-amber-400" />
            <span>CCTV Warehouse Stock Valuation</span>
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-[11px] text-slate-400">Total Selling Value</div>
              <div className="text-xl font-bold font-mono text-amber-300 mt-1">
                {formatLKR(inventoryRetailValue)}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-[11px] text-slate-400">Total Purchase Cost</div>
              <div className="text-xl font-bold font-mono text-slate-200 mt-1">
                {formatLKR(inventoryCostValue)}
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Total Catalog SKUs:</span>
              <span className="font-mono font-bold text-white">{products.length} Items</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Low Stock Items Needing Reorder:</span>
              <span className="font-mono font-bold text-red-400">
                {products.filter(p => p.stockQuantity <= p.minStock).length} Items
              </span>
            </div>
          </div>
        </div>

        {/* Quotation Pipeline Conversion */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-lg">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Quotation-to-Invoice Conversion Pipeline</span>
          </h3>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Quotes</div>
              <div className="text-xl font-mono font-black text-cyan-400 mt-1">{quotations.length}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Approved/Billed</div>
              <div className="text-xl font-mono font-black text-emerald-400 mt-1">
                {quotations.filter(q => q.status === 'CONVERTED' || q.status === 'APPROVED').length}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Success Rate</div>
              <div className="text-xl font-mono font-black text-white mt-1">{conversionRate}%</div>
            </div>
          </div>

          <div className="space-y-2 pt-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Pending Quotes Value:</span>
              <span className="font-mono font-bold text-amber-300">
                {formatLKR(quotations.filter(q => q.status === 'PENDING' || q.status === 'SENT').reduce((s, q) => s + q.grandTotal, 0))}
              </span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Customer Base Growth:</span>
              <span className="font-mono font-bold text-emerald-400">+{customers.length} Registered Accounts</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
