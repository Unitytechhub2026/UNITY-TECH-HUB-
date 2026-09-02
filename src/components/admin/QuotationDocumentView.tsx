import React, { useState } from 'react';
import { 
  Printer, 
  MessageSquare, 
  Mail, 
  Receipt, 
  Edit3, 
  ArrowLeft, 
  Shield, 
  CheckCircle2, 
  Phone, 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  Share2,
  Check,
  AlertCircle
} from 'lucide-react';
import { Quotation, CompanySettings } from '../../types';
import { dbStore, formatLKR, numberToWordsLKR } from '../../data/dbStore';

interface QuotationDocumentViewProps {
  quotationId: string;
  onBack: () => void;
  onEdit: (id: string) => void;
  onConvertToInvoice: (id: string) => void;
}

export const QuotationDocumentView: React.FC<QuotationDocumentViewProps> = ({
  quotationId,
  onBack,
  onEdit,
  onConvertToInvoice
}) => {
  const quotation = dbStore.getQuotationById(quotationId);
  const company = dbStore.getCompanySettings();

  const [copiedLink, setCopiedLink] = useState(false);
  const [whatsappSent, setWhatsappSent] = useState(false);

  if (!quotation) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-slate-400">Quotation not found.</p>
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
    const rawNumber = quotation.customerPhone.replace(/[^0-9]/g, '');
    let formattedPhone = rawNumber;
    if (rawNumber.startsWith('0')) {
      formattedPhone = '94' + rawNumber.substring(1);
    }

    const message = `*UNITY TECH HUB - CCTV & SECURITY SYSTEMS*
_Smart Technology. Secure Future._

Dear ${quotation.customerName},

Thank you for your inquiry. Please find your official quotation summary below:

📄 *Quotation No:* ${quotation.quotationNumber}
📅 *Date:* ${quotation.date}
📍 *Site Location:* ${quotation.siteAddress || quotation.customerAddress}

*Equipment Summary:*
${quotation.items.map((it, idx) => `${idx + 1}. ${it.description} (${it.qty} ${it.unit}) - ${formatLKR(it.amount)}`).join('\n')}

💰 *Subtotal:* ${formatLKR(quotation.subtotal)}
🏷️ *Discount:* ${formatLKR(quotation.discount)}
${quotation.vatAmount > 0 ? `🏛️ *VAT (18%):* ${formatLKR(quotation.vatAmount)}\n` : ''}⭐ *GRAND TOTAL:* ${formatLKR(quotation.grandTotal)}
_(${numberToWordsLKR(quotation.grandTotal)})_

🛡️ *Warranty:* ${quotation.warrantyTerms}
⏱️ *Quotation Validity:* Valid for 7 days until ${quotation.validUntil}.

📞 *Hotline / WhatsApp:* ${company.phone}
🏢 *Unity Tech Hub, Colombo, Sri Lanka*`;

    const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setWhatsappSent(true);

    // Update status to SENT if currently PENDING
    if (quotation.status === 'PENDING' || quotation.status === 'DRAFT') {
      dbStore.saveQuotation({ ...quotation, status: 'SENT' });
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`CCTV Security Quotation ${quotation.quotationNumber} - UNITY TECH HUB`);
    const body = encodeURIComponent(`Dear ${quotation.customerName},\n\nPlease find attached the quotation (${quotation.quotationNumber}) for your CCTV security system installation.\n\nGrand Total: ${formatLKR(quotation.grandTotal)}\nValidity: ${quotation.validUntil}\n\nFeel free to contact us on ${company.phone} for any inquiries.\n\nBest regards,\nUnity Tech Hub Team`);
    window.location.href = `mailto:${quotation.customerEmail || ''}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      
      {/* Top Toolbar (Hidden on Print) */}
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
              <span className="font-mono text-xs text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40">
                {quotation.quotationNumber}
              </span>
              <span className="text-xs font-semibold text-slate-300">
                {quotation.customerName}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          
          <button
            onClick={handlePrint}
            id="print-quotation-btn"
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Send WhatsApp</span>
          </button>

          {quotation.status !== 'CONVERTED' ? (
            <button
              onClick={() => onConvertToInvoice(quotation.id)}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>Convert to Invoice</span>
            </button>
          ) : (
            <span className="px-3 py-1.5 rounded-xl bg-blue-950 border border-blue-500/40 text-blue-300 text-xs font-bold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>Invoiced ({quotation.convertedInvoiceId})</span>
            </span>
          )}

          <button
            onClick={() => onEdit(quotation.id)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Edit Quotation"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          {quotation.customerEmail && (
            <button
              onClick={handleEmailShare}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Send via Email"
            >
              <Mail className="w-4 h-4" />
            </button>
          )}

        </div>
      </div>

      {/* A4 Printable Document Container */}
      <div className="printable-document bg-white text-slate-900 rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-200 font-['Outfit',sans-serif]">
        
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 pb-6 border-b-2 border-slate-900">
          
          {/* Company Brand & Contact */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-cyan-400">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-slate-950 uppercase">
                  {company.companyName}
                </h1>
                <p className="text-[11px] font-bold text-cyan-700 tracking-widest uppercase">
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
                Email: {company.email} | Reg (BR): {company.brNumber}
              </p>
            </div>
          </div>

          {/* Quotation Badge & Reference Box */}
          <div className="sm:text-right bg-slate-50 p-4 rounded-2xl border border-slate-200 min-w-[240px] space-y-2">
            <div className="inline-block px-3 py-1 rounded bg-slate-950 text-cyan-400 text-xs font-black uppercase tracking-widest">
              OFFICIAL QUOTATION
            </div>

            <div className="text-xs space-y-1">
              <div className="flex justify-between sm:justify-end gap-3">
                <span className="text-slate-500 font-medium">Quotation No:</span>
                <span className="font-mono font-bold text-slate-950">{quotation.quotationNumber}</span>
              </div>
              <div className="flex justify-between sm:justify-end gap-3">
                <span className="text-slate-500 font-medium">Date:</span>
                <span className="font-bold text-slate-900">{quotation.date}</span>
              </div>
              <div className="flex justify-between sm:justify-end gap-3">
                <span className="text-slate-500 font-medium">Valid Until:</span>
                <span className="font-bold text-red-600">{quotation.validUntil} (7 Days)</span>
              </div>
              <div className="flex justify-between sm:justify-end gap-3 pt-1 border-t border-slate-200">
                <span className="text-slate-500 font-medium">Prepared By:</span>
                <span className="font-semibold text-slate-800">Unity Tech Sales Dept</span>
              </div>
            </div>
          </div>

        </div>

        {/* Customer & Site Details Banner */}
        <div className="my-6 p-4 rounded-2xl bg-slate-100 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Quotation Issued To:
            </div>
            <div className="font-black text-slate-950 text-sm">
              {quotation.customerName}
            </div>
            {quotation.customerCompany && (
              <div className="font-bold text-slate-700">
                {quotation.customerCompany}
              </div>
            )}
            <div className="text-slate-600 mt-1">
              {quotation.customerAddress}
            </div>
            <div className="text-slate-800 font-medium mt-0.5">
              Phone: {quotation.customerPhone} {quotation.customerEmail ? `| ${quotation.customerEmail}` : ''}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              CCTV Installation Site Location:
            </div>
            <div className="font-bold text-slate-950 text-xs">
              {quotation.siteAddress || quotation.customerAddress}
            </div>
            <div className="mt-2 text-slate-600 space-y-0.5">
              <p>Project Scope: <strong>CCTV Security System Installation</strong></p>
              <p>Est. Work Duration: <strong>{quotation.jobDuration}</strong></p>
            </div>
          </div>
        </div>

        {/* Itemized CCTV Equipment Table */}
        <div className="space-y-2 mb-6">
          <div className="text-xs font-black uppercase tracking-wider text-slate-950 flex items-center justify-between">
            <span>1. CCTV Hardware & Security Equipment</span>
            <span className="text-[10px] text-slate-500 lowercase font-normal">all items brand new with company warranty</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-300 border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
                  <th className="p-2.5 border border-slate-700 text-center w-12">Sr.</th>
                  <th className="p-2.5 border border-slate-700">Item Description & Specifications</th>
                  <th className="p-2.5 border border-slate-700 text-center">Model</th>
                  <th className="p-2.5 border border-slate-700 text-center w-14">Unit</th>
                  <th className="p-2.5 border border-slate-700 text-center w-12">Qty</th>
                  <th className="p-2.5 border border-slate-700 text-right">Rate (LKR)</th>
                  <th className="p-2.5 border border-slate-700 text-right">Amount (LKR)</th>
                  <th className="p-2.5 border border-slate-700 text-center">Warranty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {quotation.items.map((item, index) => (
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
                    <td className="p-2.5 border border-slate-200 text-center text-[10px] font-bold text-cyan-800">
                      {item.warranty || 'Standard'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Installation & Technical Services Table */}
        {quotation.installationItems && quotation.installationItems.length > 0 && (
          <div className="space-y-2 mb-6">
            <div className="text-xs font-black uppercase tracking-wider text-slate-950">
              2. Installation, Cabling & System Configuration Services
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-300 border-collapse">
                <thead>
                  <tr className="bg-slate-800 text-white uppercase text-[10px] tracking-wider">
                    <th className="p-2 border border-slate-700 text-center w-12">#</th>
                    <th className="p-2 border border-slate-700">Technical Service Description</th>
                    <th className="p-2 border border-slate-700 text-center w-16">Qty / Points</th>
                    <th className="p-2 border border-slate-700 text-right w-28">Rate (LKR)</th>
                    <th className="p-2 border border-slate-700 text-right w-32">Amount (LKR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {quotation.installationItems.map((charge, idx) => (
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

        {/* Summary Calculation & Amount in Words */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pb-6 border-b border-slate-300">
          
          {/* Left: Notes & Bank Information */}
          <div className="sm:col-span-7 space-y-3 text-xs text-slate-700">
            <div>
              <div className="font-bold text-slate-950 uppercase text-[11px] mb-1">
                Amount in Words:
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 font-bold text-slate-900 capitalize">
                {numberToWordsLKR(quotation.grandTotal)}
              </div>
            </div>

            <div className="space-y-1 pt-1 text-[11px]">
              <p><strong>Payment Terms:</strong> {quotation.paymentTerms}</p>
              <p><strong>Warranty Policy:</strong> {quotation.warrantyTerms || (quotation.warrantyDetails ? `Cameras: ${quotation.warrantyDetails.cameraWarranty}, DVR/NVR: ${quotation.warrantyDetails.nvrWarranty}, HDD: ${quotation.warrantyDetails.hddWarranty}` : 'Standard Warranty')}</p>
              <p><strong>Terms & Notes:</strong> {Array.isArray(quotation.notes) ? quotation.notes.join(' | ') : quotation.notes}</p>
            </div>
          </div>

          {/* Right: Totals Box */}
          <div className="sm:col-span-5 bg-slate-50 p-4 rounded-2xl border-2 border-slate-900 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Equipment Subtotal:</span>
              <span className="font-mono font-semibold text-slate-950">
                {formatLKR(quotation.items.reduce((s, i) => s + i.amount, 0))}
              </span>
            </div>

            {quotation.installationItems && quotation.installationItems.length > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>Installation Services:</span>
                <span className="font-mono font-semibold text-slate-950">
                  {formatLKR(quotation.installationItems.reduce((s, i) => s + i.amount, 0))}
                </span>
              </div>
            )}

            {quotation.transportCharges > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>Transport / Delivery:</span>
                <span className="font-mono font-semibold text-slate-950">{formatLKR(quotation.transportCharges)}</span>
              </div>
            )}

            {quotation.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Special Discount:</span>
                <span className="font-mono">- {formatLKR(quotation.discount)}</span>
              </div>
            )}

            {quotation.vatAmount > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>VAT (18%):</span>
                <span className="font-mono font-semibold text-slate-950">{formatLKR(quotation.vatAmount)}</span>
              </div>
            )}

            <div className="pt-2 border-t-2 border-slate-900 flex justify-between items-baseline">
              <span className="text-sm font-black uppercase text-slate-950">GRAND TOTAL:</span>
              <span className="text-xl font-black font-mono text-cyan-900">
                {formatLKR(quotation.grandTotal)}
              </span>
            </div>
          </div>

        </div>

        {/* Dual Signatures & Acceptance Box */}
        <div className="grid grid-cols-2 gap-8 pt-8 text-xs">
          
          {/* Company Authorized Signature */}
          <div className="space-y-4">
            <div className="h-16 flex items-end">
              <div className="w-48 border-b-2 border-slate-900"></div>
            </div>
            <div>
              <p className="font-bold text-slate-950">Authorized Signature & Company Seal</p>
              <p className="text-[11px] text-slate-600">Proprietor / Managing Partner</p>
              <p className="text-[11px] font-bold text-slate-900 uppercase">UNITY TECH HUB</p>
            </div>
          </div>

          {/* Customer Acceptance Signature */}
          <div className="space-y-4 text-right">
            <div className="h-16 flex items-end justify-end">
              <div className="w-48 border-b-2 border-slate-900"></div>
            </div>
            <div>
              <p className="font-bold text-slate-950">Customer Acceptance Signature</p>
              <p className="text-[11px] text-slate-600">Name: .....................................................</p>
              <p className="text-[11px] text-slate-600">Date: ......................................................</p>
            </div>
          </div>

        </div>

        {/* Document Footer */}
        <div className="mt-8 pt-4 border-t border-slate-300 text-center text-[10px] text-slate-500 space-y-0.5">
          <p className="font-bold tracking-wider text-slate-700 uppercase">
            UNITY TECH HUB • SMART TECHNOLOGY. SECURE FUTURE.
          </p>
          <p>
            This document is a computer-generated official quotation. For inquiries, call 072 740 2288 or WhatsApp +94727402288.
          </p>
        </div>

      </div>

    </div>
  );
};
