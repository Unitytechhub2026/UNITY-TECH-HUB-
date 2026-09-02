import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Eye, 
  Edit3, 
  Receipt, 
  Trash2, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Filter,
  Check,
  XCircle,
  ExternalLink
} from 'lucide-react';
import { Quotation, QuotationStatus } from '../../types';
import { dbStore, formatLKR } from '../../data/dbStore';

interface QuotationsManagerProps {
  onCreateNew: () => void;
  onViewQuotation: (id: string) => void;
  onEditQuotation: (id: string) => void;
  onConvertToInvoice: (id: string) => void;
}

export const QuotationsManager: React.FC<QuotationsManagerProps> = ({
  onCreateNew,
  onViewQuotation,
  onEditQuotation,
  onConvertToInvoice
}) => {
  const [quotations, setQuotations] = useState<Quotation[]>(dbStore.getQuotations());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>('ALL');

  const refreshList = () => {
    setQuotations(dbStore.getQuotations());
  };

  const handleDelete = (id: string, number: string) => {
    if (confirm(`Are you sure you want to delete quotation ${number}?`)) {
      dbStore.deleteQuotation(id);
      refreshList();
    }
  };

  const handleUpdateStatus = (id: string, status: QuotationStatus) => {
    const q = dbStore.getQuotationById(id);
    if (q) {
      dbStore.saveQuotation({ ...q, status });
      refreshList();
    }
  };

  const filteredQuotations = quotations.filter((q) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      q.quotationNumber.toLowerCase().includes(query) ||
      q.customerName.toLowerCase().includes(query) ||
      (q.customerCompany && q.customerCompany.toLowerCase().includes(query)) ||
      q.customerPhone.includes(query) ||
      (q.siteAddress && q.siteAddress.toLowerCase().includes(query));

    const matchesStatus = activeStatusFilter === 'ALL' || q.status === activeStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: QuotationStatus) => {
    switch (status) {
      case 'APPROVED':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 border border-emerald-500/40 text-emerald-300">APPROVED</span>;
      case 'CONVERTED':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-950 border border-blue-500/40 text-blue-300">INVOICED</span>;
      case 'PENDING':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 border border-amber-500/40 text-amber-300">PENDING</span>;
      case 'SENT':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 border border-cyan-500/40 text-cyan-300">SENT</span>;
      case 'DRAFT':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 border border-slate-700 text-slate-300">DRAFT</span>;
      case 'REJECTED':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-950 border border-red-500/40 text-red-300">REJECTED</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & New Quotation Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-['Outfit',sans-serif] text-white tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-cyan-400" />
            <span>CCTV Quotations Management</span>
          </h1>
          <p className="text-xs text-slate-400">
            Generate, customize, print, send via WhatsApp, and convert CCTV quotations into official bills.
          </p>
        </div>

        <button
          onClick={onCreateNew}
          id="create-new-quotation-btn"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ CREATE NEW QUOTATION</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        
        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold">
          {[
            { id: 'ALL', label: `All (${quotations.length})` },
            { id: 'PENDING', label: `Pending (${quotations.filter(q => q.status === 'PENDING').length})` },
            { id: 'SENT', label: `Sent (${quotations.filter(q => q.status === 'SENT').length})` },
            { id: 'APPROVED', label: `Approved (${quotations.filter(q => q.status === 'APPROVED').length})` },
            { id: 'CONVERTED', label: `Invoiced (${quotations.filter(q => q.status === 'CONVERTED').length})` },
            { id: 'DRAFT', label: `Drafts (${quotations.filter(q => q.status === 'DRAFT').length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
                activeStatusFilter === tab.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by quote no, customer, company..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div className="text-xs text-slate-400 font-mono hidden sm:block">
            Showing {filteredQuotations.length} records
          </div>
        </div>

      </div>

      {/* Quotations Table */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                <th className="p-4 font-semibold">Quote No / Date</th>
                <th className="p-4 font-semibold">Customer & Site</th>
                <th className="p-4 font-semibold">Hardware & Work</th>
                <th className="p-4 font-semibold">Grand Total</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredQuotations.map((quote) => (
                <tr key={quote.id} className="hover:bg-slate-800/40 transition-colors">
                  
                  {/* Quote No & Date */}
                  <td className="p-4">
                    <div className="font-mono font-bold text-cyan-300 text-sm">
                      {quote.quotationNumber}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{quote.date}</span>
                    </div>
                    <div className="text-[10px] text-amber-400/90">
                      Valid: {quote.validUntil}
                    </div>
                  </td>

                  {/* Customer */}
                  <td className="p-4">
                    <div className="font-bold text-white text-sm">
                      {quote.customerName}
                    </div>
                    {quote.customerCompany && (
                      <div className="text-[11px] text-slate-300 font-medium">
                        {quote.customerCompany}
                      </div>
                    )}
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {quote.customerPhone}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate max-w-[180px]">
                      {quote.siteAddress || quote.customerAddress}
                    </div>
                  </td>

                  {/* Items Count & Installation */}
                  <td className="p-4">
                    <div className="font-medium text-slate-200">
                      {quote.items.length} Product Items
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {quote.installationCharges?.length || 0} Installation Points
                    </div>
                    <div className="text-[10px] text-cyan-400 truncate max-w-[160px]">
                      {quote.items[0]?.description || 'Custom Scope'}
                    </div>
                  </td>

                  {/* Grand Total */}
                  <td className="p-4">
                    <div className="font-mono font-bold text-white text-sm">
                      {formatLKR(quote.grandTotal)}
                    </div>
                    {quote.discount > 0 && (
                      <div className="text-[10px] text-emerald-400 font-mono">
                        Saved: {formatLKR(quote.discount)}
                      </div>
                    )}
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <div className="space-y-1">
                      {getStatusBadge(quote.status)}
                      
                      {/* Quick Status Changers */}
                      {quote.status !== 'CONVERTED' && (
                        <div className="flex items-center gap-1 text-[10px] pt-1">
                          {quote.status !== 'APPROVED' && (
                            <button
                              onClick={() => handleUpdateStatus(quote.id, 'APPROVED')}
                              className="text-emerald-400 hover:underline cursor-pointer"
                            >
                              Approve
                            </button>
                          )}
                          {quote.status !== 'REJECTED' && (
                            <button
                              onClick={() => handleUpdateStatus(quote.id, 'REJECTED')}
                              className="text-red-400 hover:underline cursor-pointer"
                            >
                              Reject
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      
                      {/* View / Print */}
                      <button
                        onClick={() => onViewQuotation(quote.id)}
                        title="View & Print Official Quotation"
                        className="p-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Convert to Invoice */}
                      {quote.status !== 'CONVERTED' && (
                        <button
                          onClick={() => onConvertToInvoice(quote.id)}
                          title="Convert to Official Invoice (Auto Deducts Stock)"
                          className="p-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-300 transition-colors cursor-pointer"
                        >
                          <Receipt className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Edit */}
                      <button
                        onClick={() => onEditQuotation(quote.id)}
                        title="Edit Quotation"
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(quote.id, quote.quotationNumber)}
                        title="Delete Quotation"
                        className="p-2 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-300 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
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
  );
};
