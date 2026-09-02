import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  X, 
  Check, 
  Receipt, 
  Calendar, 
  FileText,
  Building2
} from 'lucide-react';
import { PaymentMethod, Invoice } from '../../types';
import { dbStore, formatLKR } from '../../data/dbStore';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetInvoiceId?: string;
  onPaymentSuccess: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  targetInvoiceId,
  onPaymentSuccess
}) => {
  const invoices = dbStore.getInvoices().filter(i => i.paymentStatus !== 'PAID');
  const allInvoices = dbStore.getInvoices();

  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>(
    targetInvoiceId || (invoices[0]?.id || allInvoices[0]?.id || '')
  );

  const selectedInvoice = allInvoices.find(i => i.id === selectedInvoiceId);

  const [amount, setAmount] = useState<number>(selectedInvoice ? selectedInvoice.balanceDue : 0);
  const [paymentDate, setPaymentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Bank Transfer');
  const [referenceNumber, setReferenceNumber] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    if (targetInvoiceId) {
      setSelectedInvoiceId(targetInvoiceId);
    }
  }, [targetInvoiceId]);

  useEffect(() => {
    if (selectedInvoice) {
      setAmount(selectedInvoice.balanceDue > 0 ? selectedInvoice.balanceDue : selectedInvoice.grandTotal);
    }
  }, [selectedInvoiceId]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) {
      alert('Please select an invoice.');
      return;
    }

    if (amount <= 0) {
      alert('Please enter a valid payment amount greater than zero.');
      return;
    }

    dbStore.recordPayment({
      invoiceId: selectedInvoice.id,
      invoiceNumber: selectedInvoice.invoiceNumber,
      customerId: selectedInvoice.customerId,
      customerName: selectedInvoice.customerName,
      amount: Number(amount),
      paymentDate: paymentDate,
      paymentMethod: paymentMethod,
      referenceNumber: referenceNumber.trim() || undefined,
      notes: notes.trim() || undefined,
      recordedBy: dbStore.getCurrentUser()?.name || 'Staff'
    });

    onPaymentSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0b1329] border border-purple-500/40 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative text-slate-100 space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-500/50 flex items-center justify-center text-purple-400">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-['Outfit',sans-serif] text-white">
              Record Customer Payment
            </h2>
            <p className="text-xs text-slate-400">
              Update invoice balance, receipt ledger, and financial reports.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Select Invoice */}
          <div>
            <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
              Select Invoice to Settle *
            </label>
            <select
              value={selectedInvoiceId}
              onChange={(e) => setSelectedInvoiceId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
            >
              {allInvoices.map((inv) => (
                <option key={inv.id} value={inv.id}>
                  {inv.invoiceNumber} - {inv.customerName} (Total: {formatLKR(inv.grandTotal)} | Balance: {formatLKR(inv.balanceDue)})
                </option>
              ))}
            </select>
          </div>

          {selectedInvoice && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-2 gap-2 text-slate-300">
              <div>
                <span className="text-slate-500 block text-[10px]">Customer Name:</span>
                <span className="font-bold text-white">{selectedInvoice.customerName}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block text-[10px]">Outstanding Due:</span>
                <span className="font-mono font-bold text-amber-400">{formatLKR(selectedInvoice.balanceDue)}</span>
              </div>
            </div>
          )}

          {/* Amount & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                Payment Amount (Rs.) *
              </label>
              <input
                type="number"
                required
                min="1"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-purple-300 focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                Payment Date *
              </label>
              <input
                type="date"
                required
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          {/* Method & Ref */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                Payment Method *
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
              >
                <option value="Cash">Cash Payment</option>
                <option value="Bank Transfer">Bank Transfer (Commercial / Sampath)</option>
                <option value="Card">Credit / Debit Card POS</option>
                <option value="Online">Online Gateway / Mobile Pay</option>
                <option value="Cheque">Bank Cheque</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
                Bank Slip / Reference No.
              </label>
              <input
                type="text"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder="e.g. TXN-8930129"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1">
              Payment Remarks / Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. 50% advance settlement before site installation."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold uppercase transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Confirm & Record</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
