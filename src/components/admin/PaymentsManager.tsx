import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Search, 
  DollarSign, 
  Calendar, 
  Receipt, 
  Trash2,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { Payment } from '../../types';
import { dbStore, formatLKR } from '../../data/dbStore';

interface PaymentsManagerProps {
  onOpenRecordPayment: () => void;
  onViewInvoice: (id: string) => void;
}

export const PaymentsManager: React.FC<PaymentsManagerProps> = ({
  onOpenRecordPayment,
  onViewInvoice
}) => {
  const [payments, setPayments] = useState<Payment[]>(dbStore.getPayments());
  const [searchQuery, setSearchQuery] = useState('');

  const refreshList = () => {
    setPayments(dbStore.getPayments());
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this payment record?')) {
      dbStore.deletePayment(id);
      refreshList();
    }
  };

  const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);

  const filteredPayments = payments.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.customerName.toLowerCase().includes(q) ||
      p.invoiceNumber.toLowerCase().includes(q) ||
      p.paymentMethod.toLowerCase().includes(q) ||
      (p.referenceNumber && p.referenceNumber.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-['Outfit',sans-serif] text-white tracking-tight flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-purple-400" />
            <span>Payments & Collections Ledger</span>
          </h1>
          <p className="text-xs text-slate-400">
            Recorded bank transfers, cash receipts, and customer payment history.
          </p>
        </div>

        <button
          onClick={onOpenRecordPayment}
          id="record-payment-main-btn"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ RECORD NEW PAYMENT</span>
        </button>
      </div>

      {/* Summary Card & Search */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-purple-950/40 border border-purple-500/40 space-y-1">
          <div className="text-xs font-bold text-purple-300 uppercase tracking-wider">
            Total Collections to Date
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            {formatLKR(totalCollected)}
          </div>
          <div className="text-[10px] text-purple-400">
            {payments.length} successful payment receipts
          </div>
        </div>

        <div className="sm:col-span-2 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by customer, invoice number, reference..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition-colors"
            />
          </div>
        </div>

      </div>

      {/* Payments Table */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Invoice No</th>
                <th className="p-4 font-semibold">Amount (LKR)</th>
                <th className="p-4 font-semibold">Method & Ref</th>
                <th className="p-4 font-semibold">Notes</th>
                <th className="p-4 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  
                  <td className="p-4 font-mono text-slate-300">
                    <div className="font-semibold text-white">{p.paymentDate}</div>
                  </td>

                  <td className="p-4 font-bold text-white text-sm">
                    {p.customerName}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => onViewInvoice(p.invoiceId)}
                      className="font-mono font-bold text-emerald-400 hover:underline cursor-pointer"
                    >
                      {p.invoiceNumber}
                    </button>
                  </td>

                  <td className="p-4 font-mono font-black text-emerald-400 text-sm">
                    {formatLKR(p.amount)}
                  </td>

                  <td className="p-4">
                    <div className="font-semibold text-slate-200">{p.paymentMethod}</div>
                    {p.referenceNumber && (
                      <div className="text-[10px] text-slate-400 font-mono">Ref: {p.referenceNumber}</div>
                    )}
                  </td>

                  <td className="p-4 text-slate-400 text-[11px] max-w-xs truncate">
                    {p.notes || '-'}
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(p.id)}
                      title="Delete Record"
                      className="p-2 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-300 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
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
