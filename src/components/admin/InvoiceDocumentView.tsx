import React, { useState } from 'react';
import { 
  Printer, 
  MessageSquare, 
  Mail, 
  ArrowLeft, 
  Shield, 
  CheckCircle2, 
  Phone, 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  CreditCard,
  Check,
  AlertCircle
} from 'lucide-react';
import { Invoice } from '../../types';
import { dbStore, formatLKR, numberToWordsLKR } from '../../data/dbStore';

interface InvoiceDocumentViewProps {
  invoiceId: string;
  onBack: () => void;
  onRecordPayment: (invoiceId: string) => void;
}

export const InvoiceDocumentView: React.FC<InvoiceDocumentViewProps> = ({
  invoiceId,
  onBack,
  onRecordPayment
}) => {
  const invoice = dbStore.getInvoiceById(invoiceId);
  const company = dbStore.getCompanySettings();

  if (!invoice) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-slate-400">Invoice not found.</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-cyan-600 text-white rounded-xl text-xs font-bold"
        >
          Return to List
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const rawNumber = invoice.customerPhone.replace(/[^0-9]/g, '');
    let formattedPhone = rawNumber;
    if (rawNumber.startsWith('0')) {
      formattedPhone = '94' + rawNumber.substring(1);
    }

    const primaryBank = company.bankAccounts?.[0] || {
      bankName: company.bankName || "Commercial Bank of Ceylon",
      accountName: company.bankAccountName || "UNITY TECH HUB (PVT) LTD",
      accountNumber: company.bankAccountNumber || "1000 4829 1102",
      branchName: company.bankBranch || "Nugegoda Branch"
    };

    const message = `*UNITY TECH HUB - OFFICIAL TAX INVOICE*
_Smart Technology. Secure Future._

Dear ${invoice.customerName},

Please find your official tax invoice details below:

🧾 *Invoice No:* ${invoice.invoiceNumber}
📅 *Date:* ${invoice.invoiceDate}
${invoice.quotationReference ? `📄 *Quotation Ref:* ${invoice.quotationReference}\n` : ''}
💰 *Total Amount:* ${formatLKR(invoice.grandTotal)}
✅ *Amount Paid:* ${formatLKR(invoice.amountPaid)}
⚠️ *Balance Due:* ${formatLKR(invoice.balanceDue)}
🏷️ *Payment Status:* ${invoice.paymentStatus}

*Bank Transfer Details for Payment:*
Bank: ${primaryBank.bankName}
Account Name: ${primaryBank.accountName}
Account No: ${primaryBank.accountNumber}
Branch: ${primaryBank.branchName}

📞 *Hotline / WhatsApp:* ${company.phone}
🏢 *Unity Tech Hub, Colombo, Sri Lanka*`;

    const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Tax Invoice ${invoice.invoiceNumber} - UNITY TECH HUB`);
    const body = encodeURIComponent(`Dear ${invoice.customerName},\n\nPlease find your tax invoice (${invoice.invoiceNumber}) attached.\n\nTotal: ${formatLKR(invoice.grandTotal)}\nAmount Paid: ${formatLKR(invoice.amountPaid)}\nBalance Due: ${formatLKR(invoice.balanceDue)}\n\nThank you for choosing Unity Tech Hub.\n\nHotline: ${company.phone}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      
      {/* Top Action Bar (Hidden on Print) */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40">
                {invoice.invoiceNumber}
              </span>
              <span className="text-xs font-semibold text-slate-300">
                {invoice.customerName}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          
          <button
            onClick={handlePrint}
            id="print-invoice-btn"
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-700/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Send WhatsApp</span>
          </button>

          {invoice.balanceDue > 0 && (
            <button
              onClick={() => onRecordPayment(invoice.id)}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Record Payment</span>
            </button>
          )}

          <button
            onClick={handleEmailShare}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Send Email"
          >
            <Mail className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* A4 Printable Document Container */}
      <div className="printable-document bg-white text-slate-900 rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-200 font-['Outfit',sans-serif] relative overflow-hidden">
        
        {/* Payment Status Stamp Watermark */}
        <div className="absolute top-8 right-8 pointer-events-none opacity-90 sm:opacity-100">
          {invoice.paymentStatus === 'PAID' ? (
            <div className="border-4 border-emerald-600 text-emerald-600 px-4 py-1.5 rounded-2xl font-black text-lg sm:text-2xl uppercase tracking-widest rotate-[-12deg] shadow-lg">
              PAID IN FULL
            </div>
          ) : invoice.paymentStatus === 'PARTIALLY PAID' ? (
            <div className="border-4 border-amber-600 text-amber-600 px-4 py-1.5 rounded-2xl font-black text-lg sm:text-2xl uppercase tracking-widest rotate-[-12deg] shadow-lg">
              PARTIAL PAID
            </div>
          ) : (
            <div className="border-4 border-red-600 text-red-600 px-4 py-1.5 rounded-2xl font-black text-lg sm:text-2xl uppercase tracking-widest rotate-[-12deg] shadow-lg">
              UNPAID / PENDING
            </div>
          )}
        </div>

        {/* Document Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 pb-6 border-b-2 border-slate-900">
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-emerald-400">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-slate-950 uppercase">
                  {company.companyName}
                </h1>
                <p className="text-[11px] font-bold text-emerald-700 tracking-widest uppercase">
                  {company.tagline}
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-700 space-y-0.5 pt-2">
              <p className="font-semibold">{company.address}</p>
              <p className="text-slate-600">Branch: {company.branch}</p>
              <p className="flex items-center gap-3 pt-1 text-slate-800 font-medium">
                <span>📞 Hotline: <strong>{company.phone}</strong></span>
                <span>💬 WhatsApp: <strong>{company.whatsapp}</strong></span>
              </p>
              <p className="text-[11px] text-slate-600">
                Email: {company.email} | Reg (BR): {company.brNumber} {company.vatNumber ? `| VAT: ${company.vatNumber}` : ''}
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 min-w-[240px] space-y-2 mt-4 sm:mt-0">
            <div className="inline-block px-3 py-1 rounded bg-slate-900 text-emerald-400 text-xs font-black uppercase tracking-widest">
              TAX INVOICE / BILL
            </div>

            <div className="text-xs space-y-1">
              <div className="flex justify-between gap-3">
                <span className="text-slate-500 font-medium">Invoice No:</span>
                <span className="font-mono font-bold text-slate-950">{invoice.invoiceNumber}</span>
              </div>
              {invoice.quotationReference && (
                <div className="flex justify-between gap-3">
                  <span className="text-slate-500 font-medium">Quote Ref:</span>
                  <span className="font-mono text-slate-700">{invoice.quotationReference}</span>
                </div>
              )}
              <div className="flex justify-between gap-3">
                <span className="text-slate-500 font-medium">Date:</span>
                <span className="font-bold text-slate-900">{invoice.invoiceDate}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-slate-500 font-medium">Due Date:</span>
                <span className="font-bold text-slate-900">{invoice.dueDate}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Customer Info */}
        <div className="my-6 p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Billed To:
          </div>
          <div className="font-black text-slate-950 text-base">
            {invoice.customerName}
          </div>
          {invoice.customerCompany && (
            <div className="font-bold text-slate-700">
              {invoice.customerCompany}
            </div>
          )}
          <div className="text-slate-600 mt-1">
            {invoice.customerAddress}
          </div>
          <div className="text-slate-800 font-medium mt-0.5">
            Phone: {invoice.customerPhone}
          </div>
        </div>

        {/* Line Items Table */}
        <div className="space-y-2 mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-300 border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
                  <th className="p-2.5 border border-slate-700 text-center w-12">#</th>
                  <th className="p-2.5 border border-slate-700">Description & Equipment</th>
                  <th className="p-2.5 border border-slate-700 text-center">Model</th>
                  <th className="p-2.5 border border-slate-700 text-center w-14">Unit</th>
                  <th className="p-2.5 border border-slate-700 text-center w-12">Qty</th>
                  <th className="p-2.5 border border-slate-700 text-right">Rate (LKR)</th>
                  <th className="p-2.5 border border-slate-700 text-right">Amount (LKR)</th>
                  <th className="p-2.5 border border-slate-700 text-center">Warranty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {invoice.items.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                    <td className="p-2.5 border border-slate-200 text-center font-mono font-bold text-slate-600">
                      {index + 1}
                    </td>
                    <td className="p-2.5 border border-slate-200 font-semibold text-slate-950">
                      {item.description}
                    </td>
                    <td className="p-2.5 border border-slate-200 text-center font-mono text-[11px] text-slate-700">
                      {item.model || '-'}
                    </td>
                    <td className="p-2.5 border border-slate-200 text-center font-mono text-slate-600">
                      {item.unit}
                    </td>
                    <td className="p-2.5 border border-slate-200 text-center font-bold text-slate-950">
                      {item.qty}
                    </td>
                    <td className="p-2.5 border border-slate-200 text-right font-mono font-medium text-slate-800">
                      {formatLKR(item.rate)}
                    </td>
                    <td className="p-2.5 border border-slate-200 text-right font-mono font-bold text-slate-950">
                      {formatLKR(item.amount)}
                    </td>
                    <td className="p-2.5 border border-slate-200 text-center text-[10px] font-bold text-emerald-800">
                      {item.warranty || 'Standard'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Installation Services */}
        {invoice.installationItems && invoice.installationItems.length > 0 && (
          <div className="space-y-2 mb-6">
            <div className="text-xs font-black uppercase tracking-wider text-slate-950">
              Installation & Configuration Services
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-300 border-collapse">
                <thead>
                  <tr className="bg-slate-800 text-white uppercase text-[10px] tracking-wider">
                    <th className="p-2 border border-slate-700 text-center w-12">#</th>
                    <th className="p-2 border border-slate-700">Service Description</th>
                    <th className="p-2 border border-slate-700 text-center w-16">Qty</th>
                    <th className="p-2 border border-slate-700 text-right w-28">Rate (LKR)</th>
                    <th className="p-2 border border-slate-700 text-right w-32">Amount (LKR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {invoice.installationItems.map((charge, idx) => (
                    <tr key={charge.id} className="bg-white">
                      <td className="p-2 border border-slate-200 text-center font-mono text-slate-600">
                        {idx + 1}
                      </td>
                      <td className="p-2 border border-slate-200 font-medium text-slate-900">
                        {charge.serviceName || charge.description}
                      </td>
                      <td className="p-2 border border-slate-200 text-center font-bold text-slate-950">
                        {charge.qty}
                      </td>
                      <td className="p-2 border border-slate-200 text-right font-mono text-slate-800">
                        {formatLKR(charge.rate)}
                      </td>
                      <td className="p-2 border border-slate-200 text-right font-mono font-bold text-slate-950">
                        {formatLKR(charge.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Calculation & Bank Transfer Details */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pb-6 border-b border-slate-300">
          
          {/* Bank Transfer Details */}
          <div className="sm:col-span-7 space-y-3 text-xs text-slate-700">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-300 space-y-1.5">
              <div className="font-bold text-slate-950 uppercase text-[11px] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Direct Bank Transfer Payment Details:</span>
              </div>
              <div className="space-y-0.5 text-[11px] text-slate-800 font-medium">
                {company.bankAccounts && company.bankAccounts.length > 0 ? (
                  company.bankAccounts.map((acc, i) => (
                    <div key={i} className="mb-1 pb-1 border-b border-slate-200 last:border-0 last:pb-0 last:mb-0">
                      <p>Bank: <strong>{acc.bankName}</strong> ({acc.branchName})</p>
                      <p>Account Name: <strong>{acc.accountName}</strong></p>
                      <p>Account Number: <strong className="font-mono text-slate-950 text-xs">{acc.accountNumber}</strong></p>
                    </div>
                  ))
                ) : (
                  <>
                    <p>Bank: <strong>{company.bankName || "Commercial Bank"}</strong></p>
                    <p>Account Name: <strong>{company.bankAccountName || "UNITY TECH HUB"}</strong></p>
                    <p>Account Number: <strong className="font-mono text-slate-950 text-xs">{company.bankAccountNumber || "1000 4829 1102"}</strong></p>
                    <p>Branch: <strong>{company.bankBranch || "Nugegoda"}</strong></p>
                  </>
                )}
              </div>
              <p className="text-[10px] text-slate-500 pt-1">
                * Please send payment deposit slip via WhatsApp to 072 740 2288 with Invoice Number.
              </p>
            </div>

            <div>
              <div className="font-bold text-slate-950 uppercase text-[10px] mb-0.5">
                Total in Words:
              </div>
              <p className="font-semibold text-slate-900 italic text-[11px]">
                {numberToWordsLKR(invoice.grandTotal)}
              </p>
            </div>
          </div>

          {/* Totals & Outstanding Ledger */}
          <div className="sm:col-span-5 bg-slate-50 p-4 rounded-2xl border-2 border-slate-900 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-mono font-semibold text-slate-950">{formatLKR(invoice.subtotal)}</span>
            </div>

            {invoice.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Discount:</span>
                <span className="font-mono">- {formatLKR(invoice.discount)}</span>
              </div>
            )}

            {invoice.vatAmount > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>VAT (18%):</span>
                <span className="font-mono font-semibold text-slate-950">{formatLKR(invoice.vatAmount)}</span>
              </div>
            )}

            <div className="pt-2 border-t border-slate-300 flex justify-between items-baseline">
              <span className="font-black uppercase text-slate-950">Grand Total:</span>
              <span className="text-lg font-black font-mono text-slate-950">
                {formatLKR(invoice.grandTotal)}
              </span>
            </div>

            <div className="flex justify-between text-emerald-700 font-bold">
              <span>Amount Paid:</span>
              <span className="font-mono">{formatLKR(invoice.amountPaid)}</span>
            </div>

            <div className="pt-2 border-t-2 border-slate-900 flex justify-between items-baseline">
              <span className="text-xs font-black uppercase text-red-600">Balance Due:</span>
              <span className={`text-xl font-black font-mono ${invoice.balanceDue > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                {formatLKR(invoice.balanceDue)}
              </span>
            </div>
          </div>

        </div>

        {/* Dual Signatures */}
        <div className="grid grid-cols-2 gap-8 pt-8 text-xs">
          <div className="space-y-4">
            <div className="h-16 flex items-end">
              <div className="w-48 border-b-2 border-slate-900"></div>
            </div>
            <div>
              <p className="font-bold text-slate-950">Authorized Signature & Official Seal</p>
              <p className="text-[11px] font-bold text-slate-900 uppercase">UNITY TECH HUB</p>
            </div>
          </div>

          <div className="space-y-4 text-right">
            <div className="h-16 flex items-end justify-end">
              <div className="w-48 border-b-2 border-slate-900"></div>
            </div>
            <div>
              <p className="font-bold text-slate-950">Customer Received / Verified By</p>
              <p className="text-[11px] text-slate-600">Goods received in good order and condition.</p>
            </div>
          </div>
        </div>

        {/* Document Footer */}
        <div className="mt-8 pt-4 border-t border-slate-300 text-center text-[10px] text-slate-500">
          <p className="font-bold tracking-wider text-slate-700 uppercase">
            UNITY TECH HUB • SMART TECHNOLOGY. SECURE FUTURE.
          </p>
          <p>
            Hotline: 072 740 2288 • WhatsApp: +94727402288 • Colombo, Sri Lanka
          </p>
        </div>

      </div>

    </div>
  );
};
