import React, { useState } from 'react';
import { 
  FileCheck, 
  FileText, 
  Receipt, 
  Printer, 
  CheckCircle2, 
  Shield, 
  Sparkles,
  Download
} from 'lucide-react';
import { QuotationDocumentView } from './QuotationDocumentView';
import { InvoiceDocumentView } from './InvoiceDocumentView';
import { dbStore } from '../../data/dbStore';

export const PdfTemplatesView: React.FC = () => {
  const [templateType, setTemplateType] = useState<'quotation' | 'invoice'>('quotation');

  const quotes = dbStore.getQuotations();
  const invoices = dbStore.getInvoices();

  const [selectedQuoteId, setSelectedQuoteId] = useState(quotes[0]?.id || '');
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(invoices[0]?.id || '');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-['Outfit',sans-serif] text-white tracking-tight flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-cyan-400" />
            <span>Official A4 PDF Print Templates</span>
          </h1>
          <p className="text-xs text-slate-400">
            Preview exact printed layout matching the official Unity Tech Hub quotation and billing structure.
          </p>
        </div>

        {/* Template Selector Pills */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setTemplateType('quotation')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              templateType === 'quotation'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Quotation Template</span>
          </button>

          <button
            onClick={() => setTemplateType('invoice')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              templateType === 'invoice'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>Tax Invoice / Bill Template</span>
          </button>
        </div>
      </div>

      {/* Select sample document */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="text-slate-400 font-semibold uppercase">
            Previewing Document Sample:
          </span>
          {templateType === 'quotation' ? (
            <select
              value={selectedQuoteId}
              onChange={(e) => setSelectedQuoteId(e.target.value)}
              className="bg-slate-950 border border-cyan-500/40 text-cyan-300 rounded-xl px-3 py-1.5 font-mono font-bold"
            >
              {quotes.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.quotationNumber} - {q.customerName}
                </option>
              ))}
            </select>
          ) : (
            <select
              value={selectedInvoiceId}
              onChange={(e) => setSelectedInvoiceId(e.target.value)}
              className="bg-slate-950 border border-emerald-500/40 text-emerald-300 rounded-xl px-3 py-1.5 font-mono font-bold"
            >
              {invoices.map((inv) => (
                <option key={inv.id} value={inv.id}>
                  {inv.invoiceNumber} - {inv.customerName} ({inv.paymentStatus})
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="text-slate-500 text-[11px] flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>A4 format compliant, high-resolution header & clean vector typography</span>
        </div>
      </div>

      {/* Document Render View */}
      <div>
        {templateType === 'quotation' && selectedQuoteId && (
          <QuotationDocumentView
            quotationId={selectedQuoteId}
            onBack={() => {}}
            onConvertToInvoice={() => {}}
          />
        )}

        {templateType === 'invoice' && selectedInvoiceId && (
          <InvoiceDocumentView
            invoiceId={selectedInvoiceId}
            onBack={() => {}}
            onRecordPayment={() => {}}
          />
        )}
      </div>

    </div>
  );
};
