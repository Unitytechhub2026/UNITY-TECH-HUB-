import React, { useState, useEffect } from 'react';
import { 
  Receipt, 
  Plus, 
  Trash2, 
  Save, 
  ArrowLeft, 
  UserPlus, 
  Eye, 
  Printer, 
  Check, 
  DollarSign,
  Package,
  Wrench,
  AlertCircle
} from 'lucide-react';
import { 
  Customer, 
  Product, 
  Invoice, 
  QuotationItem, 
  InstallationChargeItem, 
  PaymentMethod 
} from '../../types';
import { dbStore, formatLKR, numberToWordsLKR } from '../../data/dbStore';

interface InvoiceCreatorProps {
  initialCustomerId?: string;
  fromQuotationId?: string;
  editingInvoiceId?: string;
  onBack: () => void;
  onViewInvoice: (id: string) => void;
}

export const InvoiceCreator: React.FC<InvoiceCreatorProps> = ({
  initialCustomerId,
  fromQuotationId,
  editingInvoiceId,
  onBack,
  onViewInvoice
}) => {
  const customers = dbStore.getCustomers();
  const products = dbStore.getProducts();
  const services = dbStore.getServices();
  const companySettings = dbStore.getCompanySettings();

  // If converting from quotation
  const sourceQuotation = fromQuotationId ? dbStore.getQuotationById(fromQuotationId) : null;
  const existingInvoice = editingInvoiceId ? dbStore.getInvoiceById(editingInvoiceId) : null;

  // Form State
  const [invoiceNumber, setInvoiceNumber] = useState(
    existingInvoice?.invoiceNumber || dbStore.getNextInvoiceNumber()
  );
  const [quotationReference, setQuotationReference] = useState(
    existingInvoice?.quotationReference || sourceQuotation?.quotationNumber || ''
  );

  const [selectedCustomerId, setSelectedCustomerId] = useState(
    existingInvoice?.customerId || sourceQuotation?.customerId || initialCustomerId || (customers[0]?.id || '')
  );

  const [customerName, setCustomerName] = useState(
    existingInvoice?.customerName || sourceQuotation?.customerName || ''
  );
  const [customerCompany, setCustomerCompany] = useState(
    existingInvoice?.customerCompany || sourceQuotation?.customerCompany || ''
  );
  const [customerPhone, setCustomerPhone] = useState(
    existingInvoice?.customerPhone || sourceQuotation?.customerPhone || ''
  );
  const [customerAddress, setCustomerAddress] = useState(
    existingInvoice?.customerAddress || sourceQuotation?.customerAddress || ''
  );

  const [invoiceDate, setInvoiceDate] = useState(
    existingInvoice?.invoiceDate || new Date().toISOString().split('T')[0]
  );
  const [dueDate, setDueDate] = useState(
    existingInvoice?.dueDate || (() => {
      const d = new Date();
      d.setDate(d.getDate() + 14);
      return d.toISOString().split('T')[0];
    })()
  );

  // Line items
  const [items, setItems] = useState<QuotationItem[]>(
    existingInvoice?.items || sourceQuotation?.items || [
      {
        id: `item-${Date.now()}-1`,
        productId: 'p-1',
        description: 'Hikvision 2MP ColorVu Audio Bullet Camera (Full Color Night Vision)',
        model: 'DS-2CE10DF0T-FS',
        unit: 'PCS',
        qty: 4,
        rate: 6800,
        amount: 27200,
        warranty: '2 Years Comprehensive Warranty'
      }
    ]
  );

  const [installationCharges, setInstallationCharges] = useState<InstallationChargeItem[]>(
    existingInvoice?.installationCharges || sourceQuotation?.installationCharges || [
      {
        id: `inst-${Date.now()}-1`,
        description: 'Camera Point Installation & Precision Angle Mounting',
        qty: 4,
        rate: 1500,
        amount: 6000
      }
    ]
  );

  const [transportCharges, setTransportCharges] = useState<number>(
    existingInvoice?.transportCharges || sourceQuotation?.transportCharges || 0
  );
  const [otherCharges, setOtherCharges] = useState<number>(
    existingInvoice?.otherCharges || sourceQuotation?.otherCharges || 0
  );
  const [discount, setDiscount] = useState<number>(
    existingInvoice?.discount || sourceQuotation?.discount || 0
  );
  const [vatPercentage, setVatPercentage] = useState<number>(
    (existingInvoice?.vatAmount && existingInvoice.vatAmount > 0) || (sourceQuotation?.vatAmount && sourceQuotation.vatAmount > 0) ? 18 : 0
  );

  // Payment State
  const [initialAmountPaid, setInitialAmountPaid] = useState<number>(
    existingInvoice?.amountPaid || 0
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    existingInvoice?.paymentMethod || 'Bank Transfer'
  );

  const [notes, setNotes] = useState(
    existingInvoice?.notes || 'Thank you for your business. Please ensure bank transfers mention the invoice number.'
  );

  // Auto-fill customer
  useEffect(() => {
    if (selectedCustomerId) {
      const cust = customers.find(c => c.id === selectedCustomerId);
      if (cust) {
        setCustomerName(cust.name);
        setCustomerCompany(cust.companyName || '');
        setCustomerPhone(cust.phone);
        setCustomerAddress(cust.address);
      }
    }
  }, [selectedCustomerId]);

  // Calculations
  const itemsTotal = items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
  const installationTotal = installationCharges.reduce((sum, item) => sum + (item.qty * item.rate), 0);
  const rawSubtotal = itemsTotal + installationTotal + transportCharges + otherCharges;
  const subtotalAfterDiscount = Math.max(0, rawSubtotal - discount);
  const vatAmount = vatPercentage > 0 ? (subtotalAfterDiscount * vatPercentage) / 100 : 0;
  const grandTotal = Math.round(subtotalAfterDiscount + vatAmount);
  const balanceDue = Math.max(0, grandTotal - initialAmountPaid);

  const getPaymentStatus = (): 'PAID' | 'PARTIALLY PAID' | 'UNPAID' => {
    if (initialAmountPaid >= grandTotal && grandTotal > 0) return 'PAID';
    if (initialAmountPaid > 0) return 'PARTIALLY PAID';
    return 'UNPAID';
  };

  // Add Item
  const handleAddItem = (productId?: string) => {
    const prod = productId ? products.find(p => p.id === productId) : undefined;
    const newItem: QuotationItem = {
      id: `item-${Date.now()}-${items.length + 1}`,
      srNo: items.length + 1,
      productId: prod?.id,
      description: prod ? prod.name : '',
      model: prod?.model || '',
      unit: prod?.unit || 'PCS',
      qty: 1,
      rate: prod ? prod.sellingPrice : 0,
      amount: prod ? prod.sellingPrice : 0,
      warranty: prod?.warranty || prod?.warrantyPeriod || '2 Years Warranty'
    };
    setItems([...items, newItem]);
  };

  const handleUpdateItem = (index: number, field: keyof QuotationItem, value: any) => {
    const updated = [...items];
    const current = { ...updated[index], [field]: value };

    if (field === 'productId' && value) {
      const prod = products.find(p => p.id === value);
      if (prod) {
        current.description = prod.name;
        current.model = prod.model;
        current.unit = prod.unit;
        current.rate = prod.sellingPrice;
        current.warranty = prod.warranty;
      }
    }

    if (field === 'qty' || field === 'rate' || field === 'productId') {
      const q = field === 'qty' ? Number(value) : current.qty;
      const r = field === 'rate' ? Number(value) : current.rate;
      current.amount = (isNaN(q) ? 0 : q) * (isNaN(r) ? 0 : r);
    }

    updated[index] = current;
    setItems(updated);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSaveInvoice = () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please fill customer name and phone number.');
      return;
    }

    if (items.length === 0) {
      alert('Please add at least one line item.');
      return;
    }

    const pStatus = getPaymentStatus();

    const invoiceData: Invoice = {
      id: existingInvoice ? existingInvoice.id : `inv-${Date.now()}`,
      invoiceNumber: invoiceNumber,
      quotationReference: quotationReference || undefined,
      customerId: selectedCustomerId,
      customerName: customerName.trim(),
      customerCompany: customerCompany.trim() || undefined,
      customerPhone: customerPhone.trim(),
      customerAddress: customerAddress.trim(),
      siteAddress: customerAddress.trim(),
      invoiceDate: invoiceDate,
      dueDate: dueDate,
      paymentStatus: pStatus,
      items: items,
      installationItems: Array.isArray(installationCharges) ? installationCharges : [],
      installationCharges: typeof installationCharges === 'number' ? installationCharges : 0,
      itemTotal: itemsTotal,
      installationTotal: typeof installationCharges === 'number' ? installationCharges : 0,
      subTotal: rawSubtotal,
      subtotal: rawSubtotal,
      discountAmount: discount,
      discount: discount,
      vatAmount: vatAmount,
      transportCharges: transportCharges,
      otherCharges: otherCharges,
      grandTotal: grandTotal,
      amountPaid: initialAmountPaid,
      balanceDue: balanceDue,
      paymentMethod: pStatus !== 'UNPAID' ? paymentMethod : undefined,
      paymentTerms: 'Payment due on delivery / handover',
      warrantyDetails: {
        cameraWarranty: '2 Years',
        nvrWarranty: '2 Years',
        hddWarranty: '1 Year',
        installationWarranty: '6 Months'
      },
      notes: Array.isArray(notes) ? notes : [notes],
      bankDetails: {
        bankName: companySettings.bankName || "Commercial Bank",
        accountName: companySettings.bankAccountName || "UNITY TECH HUB",
        accountNumber: companySettings.bankAccountNumber || "1000 4829 1102",
        branch: companySettings.bankBranch || "Nugegoda"
      },
      createdBy: 'Super Admin',
      createdAt: existingInvoice ? existingInvoice.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    dbStore.saveInvoice(invoiceData);

    // If initial payment was made, record it
    if (initialAmountPaid > 0 && !existingInvoice) {
      dbStore.recordPayment({
        invoiceId: invoiceData.id,
        invoiceNumber: invoiceData.invoiceNumber,
        customerId: invoiceData.customerId,
        customerName: invoiceData.customerName,
        amount: initialAmountPaid,
        paymentDate: invoiceDate,
        paymentMethod: paymentMethod,
        notes: 'Initial invoice payment on issue',
        recordedBy: 'Super Admin'
      });
    }

    // Mark source quotation as converted if applicable
    if (sourceQuotation) {
      dbStore.saveQuotation({
        ...sourceQuotation,
        status: 'CONVERTED',
        convertedInvoiceId: invoiceData.invoiceNumber
      });
    }

    onViewInvoice(invoiceData.id);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0b1329] to-slate-900 border border-emerald-500/30 shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40">
                {invoiceNumber}
              </span>
              <h1 className="text-xl sm:text-2xl font-black font-['Outfit',sans-serif] text-white">
                {existingInvoice ? 'Edit Tax Invoice' : 'Create Tax Invoice / Bill'}
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              {quotationReference ? `Linked to Quotation: ${quotationReference}` : 'Standalone direct customer billing'}
            </p>
          </div>
        </div>

        <button
          onClick={handleSaveInvoice}
          id="save-invoice-btn"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4 stroke-[2.5]" />
          <span>Save & View Invoice</span>
        </button>
      </div>

      {/* Customer & Invoice Dates */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-lg">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200 pb-2 border-b border-slate-800">
          Customer & Billing Metadata
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Select Customer
            </label>
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} {c.companyName ? `(${c.companyName})` : ''} - {c.phone}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Invoice Date
            </label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Payment Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Customer Name
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Contact Phone
            </label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Quotation Reference (Optional)
            </label>
            <input
              type="text"
              value={quotationReference}
              onChange={(e) => setQuotationReference(e.target.value)}
              placeholder="e.g. QT-2026-0001"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Equipment & Product Items */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Hardware & Equipment Line Items
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <select
              onChange={(e) => {
                if (e.target.value) {
                  handleAddItem(e.target.value);
                  e.target.value = '';
                }
              }}
              className="bg-slate-950 border border-emerald-500/40 text-emerald-300 rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="">+ Add Product from Stock...</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (Stock: {p.stockQuantity}) - {formatLKR(p.sellingPrice)}
                </option>
              ))}
            </select>

            <button
              onClick={() => handleAddItem()}
              className="px-3 py-1.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Blank</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.id} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
              <div className="sm:col-span-6">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleUpdateItem(index, 'description', e.target.value)}
                  placeholder="Item Description"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <input
                  type="text"
                  value={item.model || ''}
                  onChange={(e) => handleUpdateItem(index, 'model', e.target.value)}
                  placeholder="Model"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                />
              </div>

              <div className="sm:col-span-1">
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => handleUpdateItem(index, 'qty', Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-1.5 py-1.5 text-xs text-white text-center font-bold"
                />
              </div>

              <div className="sm:col-span-2">
                <input
                  type="number"
                  min="0"
                  value={item.rate}
                  onChange={(e) => handleUpdateItem(index, 'rate', Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                />
              </div>

              <div className="sm:col-span-1 flex items-center justify-end">
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Settlement & Totals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Payment Recording */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-lg">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200 pb-2 border-b border-slate-800 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Payment & Settlement on Issue</span>
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Amount Paid Now (Rs.)
            </label>
            <input
              type="number"
              min="0"
              max={grandTotal}
              value={initialAmountPaid}
              onChange={(e) => setInitialAmountPaid(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold text-emerald-400 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
            >
              <option value="Cash">Cash Settlement</option>
              <option value="Bank Transfer">Bank Transfer / Online (Commercial / Sampath)</option>
              <option value="Card">Credit / Debit Card</option>
              <option value="Cheque">Bank Cheque</option>
            </select>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Payment Status:</span>
              <span className="font-bold text-emerald-400">{getPaymentStatus()}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Balance Due:</span>
              <span className="font-mono font-bold text-amber-400">{formatLKR(balanceDue)}</span>
            </div>
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-950 border border-emerald-500/40 space-y-4 shadow-2xl flex flex-col justify-between">
          <div className="space-y-3 text-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 pb-2 border-b border-slate-800">
              Tax Invoice Totals
            </h2>

            <div className="flex justify-between text-slate-300">
              <span>Items Total:</span>
              <span className="font-mono text-white">{formatLKR(itemsTotal)}</span>
            </div>

            <div className="flex justify-between text-slate-300">
              <span>Installation Services:</span>
              <span className="font-mono text-white">{formatLKR(installationTotal)}</span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-amber-400">Discount:</span>
              <input
                type="number"
                min="0"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-28 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-right text-xs font-mono text-amber-300"
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-300">VAT (18%):</span>
              <select
                value={vatPercentage}
                onChange={(e) => setVatPercentage(Number(e.target.value))}
                className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
              >
                <option value={0}>0%</option>
                <option value={18}>18%</option>
              </select>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
              <span className="font-black text-white text-base">GRAND TOTAL:</span>
              <span className="text-2xl font-black font-mono text-emerald-400">
                {formatLKR(grandTotal)}
              </span>
            </div>

            <div className="text-[11px] text-slate-400 italic">
              {numberToWordsLKR(grandTotal)}
            </div>
          </div>

          <button
            onClick={handleSaveInvoice}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
          >
            Issue & View Official Invoice
          </button>
        </div>

      </div>

    </div>
  );
};
