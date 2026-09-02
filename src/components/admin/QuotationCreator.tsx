import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Save, 
  ArrowLeft, 
  UserPlus, 
  Eye, 
  Printer, 
  Send, 
  Receipt, 
  Check, 
  Sparkles,
  Info,
  Wrench,
  Package,
  Calendar,
  Layers,
  ClipboardList,
  Search,
  X
} from 'lucide-react';
import { 
  Customer, 
  Product, 
  Quotation, 
  QuotationItem, 
  InstallationChargeItem, 
  CompanySettings,
  UnitType,
  SiteSurvey
} from '../../types';
import { dbStore, formatLKR, numberToWordsLKR } from '../../data/dbStore';
import { PriceSearchHub } from './PriceSearchHub';

interface QuotationCreatorProps {
  initialCustomerId?: string;
  editingQuotationId?: string;
  onBack: () => void;
  onViewQuotation: (id: string) => void;
}

export const QuotationCreator: React.FC<QuotationCreatorProps> = ({
  initialCustomerId,
  editingQuotationId,
  onBack,
  onViewQuotation
}) => {
  const customers = dbStore.getCustomers();
  const products = dbStore.getProducts();
  const services = dbStore.getServices();
  const companySettings = dbStore.getCompanySettings();

  const [existingQuotation, setExistingQuotation] = useState<Quotation | null>(
    editingQuotationId ? dbStore.getQuotationById(editingQuotationId) || null : null
  );

  // Form State
  const [quotationNumber, setQuotationNumber] = useState(
    existingQuotation?.quotationNumber || dbStore.getNextQuotationNumber()
  );
  const [selectedCustomerId, setSelectedCustomerId] = useState(
    existingQuotation?.customerId || initialCustomerId || (customers[0]?.id || '')
  );

  const [customerName, setCustomerName] = useState(existingQuotation?.customerName || '');
  const [customerCompany, setCustomerCompany] = useState(existingQuotation?.customerCompany || '');
  const [customerPhone, setCustomerPhone] = useState(existingQuotation?.customerPhone || '');
  const [customerEmail, setCustomerEmail] = useState(existingQuotation?.customerEmail || '');
  const [customerAddress, setCustomerAddress] = useState(existingQuotation?.customerAddress || '');
  const [siteAddress, setSiteAddress] = useState(existingQuotation?.siteAddress || '');

  const [date, setDate] = useState(
    existingQuotation?.date || new Date().toISOString().split('T')[0]
  );
  const [validUntil, setValidUntil] = useState(
    existingQuotation?.validUntil || (() => {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      return d.toISOString().split('T')[0];
    })()
  );

  // Items State
  const [items, setItems] = useState<QuotationItem[]>(
    existingQuotation?.items || [
      {
        id: `item-${Date.now()}-1`,
        productId: 'p-1',
        description: 'Hikvision 2MP ColorVu Audio Bullet Camera (24/7 Full Color Night Vision)',
        model: 'DS-2CE10DF0T-FS',
        unit: 'PCS',
        qty: 4,
        rate: 6800,
        amount: 27200,
        warranty: '2 Years Comprehensive Warranty'
      },
      {
        id: `item-${Date.now()}-2`,
        productId: 'p-5',
        description: 'Hikvision 4-Channel AcuSense Audio DVR (Supports up to 5MP, H.265+)',
        model: 'iDS-7204HQHI-M1/S',
        unit: 'PCS',
        qty: 1,
        rate: 16500,
        amount: 16500,
        warranty: '2 Years Comprehensive Warranty'
      },
      {
        id: `item-${Date.now()}-3`,
        productId: 'p-11',
        description: 'Seagate SkyHawk 1TB Surveillance Hard Disk (24/7 Continuous Recording)',
        model: 'ST1000VX005',
        unit: 'PCS',
        qty: 1,
        rate: 14500,
        amount: 14500,
        warranty: '1 Year Warranty'
      },
      {
        id: `item-${Date.now()}-4`,
        productId: 'p-17',
        description: 'Solid High-Grade Full Copper RG59 Coaxial Video + Power Cable',
        model: 'RG59-CU-100M',
        unit: 'MTR',
        qty: 100,
        rate: 140,
        amount: 14000,
        warranty: 'Standard'
      }
    ]
  );

  // Installation Charges State
  const [installationCharges, setInstallationCharges] = useState<InstallationChargeItem[]>(
    existingQuotation?.installationCharges || [
      {
        id: `inst-${Date.now()}-1`,
        description: 'CCTV Camera Point Installation & Precision Angle Mounting (Indoor/Outdoor)',
        qty: 4,
        rate: 1500,
        amount: 6000
      },
      {
        id: `inst-${Date.now()}-2`,
        description: 'DVR/NVR Configuration, Storage Setup, Mobile App Live Remote Viewing on iOS/Android',
        qty: 1,
        rate: 3500,
        amount: 3500
      }
    ]
  );

  const [transportCharges, setTransportCharges] = useState<number>(existingQuotation?.transportCharges || 0);
  const [otherCharges, setOtherCharges] = useState<number>(existingQuotation?.otherCharges || 0);
  
  const [discountType, setDiscountType] = useState<'amount' | 'percentage'>('amount');
  const [discountValue, setDiscountValue] = useState<number>(existingQuotation?.discount || 2000);

  const [vatPercentage, setVatPercentage] = useState<number>(
    existingQuotation?.vatAmount && existingQuotation.vatAmount > 0 ? 18 : 0
  );

  const [warrantyTerms, setWarrantyTerms] = useState(
    existingQuotation?.warrantyTerms || 
    (companySettings.defaultWarranty ? `Cameras: ${companySettings.defaultWarranty.camera}, DVR/NVR: ${companySettings.defaultWarranty.nvr}, HDD: ${companySettings.defaultWarranty.hdd}, Installation: ${companySettings.defaultWarranty.installation}` : '2 Years Warranty on Cameras & Recorders, 1 Year on Hard Disk')
  );
  const [paymentTerms, setPaymentTerms] = useState(
    existingQuotation?.paymentTerms || companySettings.defaultPaymentTerms
  );
  const [jobDuration, setJobDuration] = useState(
    existingQuotation?.jobDuration || '1-2 Working Days upon order confirmation'
  );
  const [notes, setNotes] = useState(
    existingQuotation?.notes || companySettings.defaultNotes
  );

  // Quick Customer Modal
  const [showQuickCustModal, setShowQuickCustModal] = useState(false);
  const [quickCustName, setQuickCustName] = useState('');
  const [quickCustPhone, setQuickCustPhone] = useState('');
  const [quickCustAddress, setQuickCustAddress] = useState('');
  const [quickCustCompany, setQuickCustCompany] = useState('');

  // Auto-fill customer details when selected
  useEffect(() => {
    if (selectedCustomerId) {
      const cust = customers.find(c => c.id === selectedCustomerId);
      if (cust) {
        setCustomerName(cust.name);
        setCustomerCompany(cust.companyName || '');
        setCustomerPhone(cust.phone);
        setCustomerEmail(cust.email || '');
        setCustomerAddress(cust.address);
        setSiteAddress(cust.siteAddress || cust.address);
      }
    }
  }, [selectedCustomerId]);

  // Modals for Site Survey and Market Price Search
  const [showSurveyPickerModal, setShowSurveyPickerModal] = useState(false);
  const [showPriceSearchModal, setShowPriceSearchModal] = useState(false);
  const availableSurveys = dbStore.getSiteSurveys();

  const handleFillFromSurvey = (surveyId: string) => {
    try {
      const genQuote = dbStore.generateQuotationFromSurvey(surveyId);
      setCustomerName(genQuote.customerName);
      setCustomerPhone(genQuote.customerPhone);
      setCustomerEmail(genQuote.customerEmail || '');
      setCustomerAddress(genQuote.customerAddress);
      setSiteAddress(genQuote.siteAddress || genQuote.customerAddress);
      setSelectedCustomerId(genQuote.customerId);
      
      // Load items
      setItems(genQuote.items.map(it => ({
        id: it.id,
        srNo: it.srNo,
        description: it.description,
        model: it.model,
        unit: it.unit,
        qty: it.qty,
        rate: it.rate,
        amount: it.amount,
        warranty: it.warranty || '2 Years Warranty'
      })));

      // Load installation
      if (genQuote.installationItems) {
        setInstallationCharges(genQuote.installationItems.map(inst => ({
          id: inst.id,
          serviceName: inst.serviceName,
          description: inst.description || inst.serviceName,
          unit: (inst.unit as UnitType) || 'JOB',
          qty: inst.qty,
          rate: inst.rate,
          amount: inst.amount
        })));
      }

      setTransportCharges(genQuote.transportCharges || 1500);
      setDiscountType(genQuote.discountType || 'amount');
      setDiscountValue(genQuote.discountValue || 0);
      setNotes(genQuote.notes || []);

      setShowSurveyPickerModal(false);
      alert(`Quotation successfully auto-populated from Site Survey!`);
    } catch (err: any) {
      alert(`Failed to load survey: ${err.message}`);
    }
  };

  // Recalculate Totals
  const itemsTotal = items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
  const installationTotal = installationCharges.reduce((sum, item) => sum + (item.qty * item.rate), 0);
  const rawSubtotal = itemsTotal + installationTotal + transportCharges + otherCharges;

  let discountAmount = 0;
  if (discountType === 'percentage') {
    discountAmount = (rawSubtotal * discountValue) / 100;
  } else {
    discountAmount = Math.min(rawSubtotal, discountValue);
  }

  const subtotalAfterDiscount = Math.max(0, rawSubtotal - discountAmount);
  const vatAmount = vatPercentage > 0 ? (subtotalAfterDiscount * vatPercentage) / 100 : 0;
  const grandTotal = Math.round(subtotalAfterDiscount + vatAmount);

  // Line Item Handlers
  const handleAddItem = (productId?: string) => {
    let defaultProduct: Product | undefined;
    if (productId) {
      defaultProduct = products.find(p => p.id === productId);
    }

    const newItem: QuotationItem = {
      id: `item-${Date.now()}-${items.length + 1}`,
      srNo: items.length + 1,
      productId: defaultProduct?.id,
      description: defaultProduct ? defaultProduct.name : '',
      model: defaultProduct ? (defaultProduct.model || '') : '',
      unit: defaultProduct ? defaultProduct.unit : 'PCS',
      qty: 1,
      rate: defaultProduct ? defaultProduct.sellingPrice : 0,
      amount: defaultProduct ? defaultProduct.sellingPrice : 0,
      warranty: defaultProduct ? (defaultProduct.warranty || defaultProduct.warrantyPeriod || '2 Years') : '2 Years Warranty'
    };

    setItems([...items, newItem]);
  };

  const handleUpdateItem = (index: number, field: keyof QuotationItem, value: any) => {
    const updated = [...items];
    const current = { ...updated[index], [field]: value };

    // Auto-update price and model if product changed
    if (field === 'productId' && value) {
      const prod = products.find(p => p.id === value);
      if (prod) {
        current.description = prod.name;
        current.model = prod.model;
        current.unit = prod.unit;
        current.rate = prod.sellingPrice;
        current.warranty = prod.warranty || prod.warrantyPeriod || '2 Years';
      }
    }

    // Auto-recalculate amount
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

  // Installation Charges Handlers
  const handleAddInstallationCharge = (serviceId?: string) => {
    const srv = serviceId ? services.find(s => s.id === serviceId) : undefined;
    const newCharge: InstallationChargeItem = {
      id: `inst-${Date.now()}-${installationCharges.length + 1}`,
      srNo: installationCharges.length + 1,
      serviceName: srv ? srv.name : 'Custom Technical / Installation Work',
      description: srv ? srv.description || srv.name : 'Custom Technical / Installation Work',
      unit: (srv?.unit as UnitType) || 'JOB',
      qty: 1,
      rate: srv ? srv.defaultRate : 1500,
      amount: srv ? srv.defaultRate : 1500
    };
    setInstallationCharges([...installationCharges, newCharge]);
  };

  const handleUpdateInstallationCharge = (index: number, field: keyof InstallationChargeItem, value: any) => {
    const updated = [...installationCharges];
    const current = { ...updated[index], [field]: value };

    if (field === 'qty' || field === 'rate') {
      const q = field === 'qty' ? Number(value) : current.qty;
      const r = field === 'rate' ? Number(value) : current.rate;
      current.amount = (isNaN(q) ? 0 : q) * (isNaN(r) ? 0 : r);
    }

    updated[index] = current;
    setInstallationCharges(updated);
  };

  const handleRemoveInstallationCharge = (index: number) => {
    setInstallationCharges(installationCharges.filter((_, i) => i !== index));
  };

  // Quick Customer Create
  const handleSaveQuickCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickCustName || !quickCustPhone || !quickCustAddress) {
      alert('Please fill Name, Phone, and Address.');
      return;
    }

    const newCust: Customer = {
      id: `cust-${Date.now()}`,
      customerCode: `CUST-${(customers.length + 1).toString().padStart(3, '0')}`,
      name: quickCustName.trim(),
      companyName: quickCustCompany.trim() || undefined,
      phone: quickCustPhone.trim(),
      address: quickCustAddress.trim(),
      city: 'Colombo',
      siteAddress: quickCustAddress.trim(),
      createdAt: new Date().toISOString()
    };

    dbStore.saveCustomer(newCust);
    setSelectedCustomerId(newCust.id);
    setCustomerName(newCust.name);
    setCustomerCompany(newCust.companyName || '');
    setCustomerPhone(newCust.phone);
    setCustomerAddress(newCust.address);
    setSiteAddress(newCust.address);
    setShowQuickCustModal(false);
  };

  // Save Quotation Handler
  const handleSaveQuotation = (status: 'DRAFT' | 'SENT' | 'PENDING' = 'PENDING', redirectAfterSave = true) => {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please enter customer name and phone number.');
      return null;
    }

    if (items.length === 0) {
      alert('Please add at least one product or item to the quotation.');
      return null;
    }

    const quotationData: Quotation = {
      id: existingQuotation ? existingQuotation.id : `qt-${Date.now()}`,
      quotationNumber: quotationNumber,
      customerId: selectedCustomerId,
      customerName: customerName.trim(),
      customerCompany: customerCompany.trim() || undefined,
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim() || undefined,
      customerAddress: customerAddress.trim(),
      siteAddress: siteAddress.trim() || customerAddress.trim(),
      date: date,
      validUntil: validUntil,
      status: existingQuotation ? existingQuotation.status : status,
      items: items,
      installationItems: installationCharges,
      installationCharges: installationCharges.reduce((s, i) => s + i.amount, 0),
      itemTotal: itemsTotal,
      installationTotal: installationTotal,
      subTotal: rawSubtotal,
      subtotal: rawSubtotal,
      discountType: discountType,
      discountValue: Number(discountValue),
      discountAmount: discountAmount,
      discount: discountAmount,
      vatEnabled: vatPercentage > 0,
      vatPercent: vatPercentage,
      vatAmount: vatAmount,
      transportCharges: transportCharges,
      otherCharges: otherCharges,
      grandTotal: grandTotal,
      notes: Array.isArray(notes) ? notes : [notes],
      warrantyDetails: existingQuotation?.warrantyDetails || {
        cameraWarranty: '2 Years',
        nvrWarranty: '2 Years',
        hddWarranty: '1 Year',
        installationWarranty: '6 Months'
      },
      warrantyTerms: warrantyTerms,
      paymentTerms: paymentTerms,
      jobDuration: jobDuration,
      createdBy: 'Super Admin',
      createdAt: existingQuotation ? existingQuotation.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    dbStore.saveQuotation(quotationData);

    if (redirectAfterSave) {
      onViewQuotation(quotationData.id);
    }

    return quotationData;
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      
      {/* Top Bar with Navigation & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0b1329] to-slate-900 border border-cyan-500/30 shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40">
                {quotationNumber}
              </span>
              <h1 className="text-xl sm:text-2xl font-black font-['Outfit',sans-serif] text-white">
                {existingQuotation ? 'Edit CCTV Quotation' : 'Create CCTV Quotation'}
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Itemized equipment pricing, installation points, and official Sri Lankan warranty terms.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSaveQuotation('DRAFT')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-slate-400" />
            <span>Draft</span>
          </button>

          <button
            onClick={() => handleSaveQuotation('PENDING', true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Save & Preview PDF</span>
          </button>
        </div>
      </div>

      {/* Step 1 & 2: Customer & Quotation Meta */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Step 1: Customer & Site Details
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowSurveyPickerModal(true)}
              className="px-3 py-1.5 rounded-xl bg-indigo-950/70 hover:bg-indigo-900 border border-indigo-500/40 text-indigo-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
            >
              <ClipboardList className="w-3.5 h-3.5 text-indigo-400" />
              <span>Auto-Fill from Site Survey</span>
            </button>

            <button
              type="button"
              onClick={() => setShowQuickCustModal(true)}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Add New Customer</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Select Registered Customer
            </label>
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors"
            >
              <option value="">-- Choose Existing Customer or Type Below --</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} {c.companyName ? `(${c.companyName})` : ''} - {c.phone}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Quotation Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Quotation Validity (Until)
            </label>
            <input
              type="date"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Customer / Contact Person Name *
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Asela Jayawardena"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Company / Business Name (Optional)
            </label>
            <input
              type="text"
              value={customerCompany}
              onChange={(e) => setCustomerCompany(e.target.value)}
              placeholder="e.g. Jayawardena Pharmacy & Groceries"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Contact Phone / WhatsApp *
            </label>
            <input
              type="tel"
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="e.g. 077 348 9102"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Customer Billing Address
            </label>
            <input
              type="text"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              placeholder="e.g. No. 128, Galle Road, Colombo 03"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              CCTV Installation Site Address
            </label>
            <input
              type="text"
              value={siteAddress}
              onChange={(e) => setSiteAddress(e.target.value)}
              placeholder="e.g. Ground Floor Shop & Storage Backyard"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Step 3: CCTV Equipment & Hardware Line Items */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Step 2: CCTV Hardware & Equipment Table
            </h2>
          </div>

          {/* Quick Add Product Dropdown */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPriceSearchModal(true)}
              className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span>Search Market Rates (Google API)</span>
            </button>

            <select
              onChange={(e) => {
                if (e.target.value) {
                  handleAddItem(e.target.value);
                  e.target.value = '';
                }
              }}
              className="bg-slate-950 border border-cyan-500/40 text-cyan-300 rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="">+ Quick Add Catalog Product...</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.model}) - {formatLKR(p.sellingPrice)}
                </option>
              ))}
            </select>

            <button
              onClick={() => handleAddItem()}
              className="px-3 py-1.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Blank Row</span>
            </button>
          </div>
        </div>

        {/* Item Rows Table */}
        <div className="space-y-3">
          {items.map((item, index) => (
            <div 
              key={item.id} 
              className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5 transition-all hover:border-slate-700"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                  Item #{index + 1}
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    Amount: {formatLKR(item.amount)}
                  </span>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="p-1 rounded-lg hover:bg-red-950/60 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                
                {/* Description */}
                <div className="sm:col-span-6">
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-0.5">
                    Product Description / Specifications
                  </label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleUpdateItem(index, 'description', e.target.value)}
                    placeholder="e.g. Hikvision 2MP ColorVu Bullet Camera"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Model */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-0.5">
                    Model Number
                  </label>
                  <input
                    type="text"
                    value={item.model || ''}
                    onChange={(e) => handleUpdateItem(index, 'model', e.target.value)}
                    placeholder="DS-2CE10DF0T"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                {/* Unit */}
                <div className="sm:col-span-1">
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-0.5">
                    Unit
                  </label>
                  <select
                    value={item.unit}
                    onChange={(e) => handleUpdateItem(index, 'unit', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-1.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="PCS">PCS</option>
                    <option value="MTR">MTR</option>
                    <option value="BOX">BOX</option>
                    <option value="SET">SET</option>
                    <option value="ROLL">ROLL</option>
                    <option value="PKG">PKG</option>
                  </select>
                </div>

                {/* Qty */}
                <div className="sm:col-span-1">
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-0.5">
                    Qty
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => handleUpdateItem(index, 'qty', Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400 text-center font-bold"
                  />
                </div>

                {/* Rate */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-0.5">
                    Unit Rate (Rs.)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={item.rate}
                    onChange={(e) => handleUpdateItem(index, 'rate', Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

              </div>

              {/* Warranty selector for item */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px] text-slate-400">Warranty:</span>
                <input
                  type="text"
                  value={item.warranty || ''}
                  onChange={(e) => handleUpdateItem(index, 'warranty', e.target.value)}
                  placeholder="e.g. 2 Years Comprehensive Warranty"
                  className="w-full max-w-sm bg-slate-900/60 border border-slate-800 rounded px-2 py-1 text-[11px] text-cyan-300 focus:outline-none focus:border-cyan-500"
                />
              </div>

            </div>
          ))}

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <span className="font-semibold text-slate-300">Hardware & Equipment Subtotal:</span>
            <span className="font-mono font-bold text-white text-sm">{formatLKR(itemsTotal)}</span>
          </div>
        </div>
      </div>

      {/* Step 4: Installation & Technical Labor */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Step 3: Installation, Wiring & Configuration Charges
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <select
              onChange={(e) => {
                if (e.target.value) {
                  handleAddInstallationCharge(e.target.value);
                  e.target.value = '';
                }
              }}
              className="bg-slate-950 border border-emerald-500/40 text-emerald-300 rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="">+ Add Standard Service...</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({formatLKR(s.defaultRate)}/{s.unit})
                </option>
              ))}
            </select>

            <button
              onClick={() => handleAddInstallationCharge()}
              className="px-3 py-1.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Custom Service</span>
            </button>
          </div>
        </div>

        <div className="space-y-2.5">
          {installationCharges.map((charge, index) => (
            <div key={charge.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={charge.description}
                onChange={(e) => handleUpdateInstallationCharge(index, 'description', e.target.value)}
                placeholder="e.g. CCTV Camera Point Installation"
                className="w-full sm:flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-400"
              />

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="w-20">
                  <input
                    type="number"
                    min="1"
                    value={charge.qty}
                    onChange={(e) => handleUpdateInstallationCharge(index, 'qty', Number(e.target.value))}
                    placeholder="Qty"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-400 text-center font-bold"
                  />
                </div>

                <div className="w-28">
                  <input
                    type="number"
                    min="0"
                    value={charge.rate}
                    onChange={(e) => handleUpdateInstallationCharge(index, 'rate', Number(e.target.value))}
                    placeholder="Rate"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>

                <div className="w-28 text-right font-mono font-bold text-emerald-400 text-xs">
                  {formatLKR(charge.amount)}
                </div>

                <button
                  onClick={() => handleRemoveInstallationCharge(index)}
                  className="p-1 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <span className="font-semibold text-slate-300">Total Installation & Labor Charges:</span>
            <span className="font-mono font-bold text-emerald-400 text-sm">{formatLKR(installationTotal)}</span>
          </div>
        </div>
      </div>

      {/* Step 5: Adjustments, Discount, VAT & Grand Total Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Notes & Terms */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-lg">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200 pb-2 border-b border-slate-800">
            Step 4: Terms, Warranty & Job Scope
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Estimated Job Duration
            </label>
            <input
              type="text"
              value={jobDuration}
              onChange={(e) => setJobDuration(e.target.value)}
              placeholder="e.g. 1-2 Working Days upon order confirmation"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Warranty Terms (Printed on Quotation)
            </label>
            <textarea
              rows={2}
              value={warrantyTerms}
              onChange={(e) => setWarrantyTerms(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Payment Terms
            </label>
            <textarea
              rows={2}
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Terms & Conditions / Special Notes
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
            />
          </div>
        </div>

        {/* Live Bill Breakdown & Grand Total */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-950 border border-cyan-500/40 space-y-4 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 pb-2 border-b border-slate-800">
              Quotation Summary (LKR)
            </h2>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Hardware Total:</span>
                <span className="font-mono text-white font-semibold">{formatLKR(itemsTotal)}</span>
              </div>

              <div className="flex justify-between">
                <span>Installation / Services:</span>
                <span className="font-mono text-white font-semibold">{formatLKR(installationTotal)}</span>
              </div>

              {/* Transport input */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <span>Transport / Delivery:</span>
                <input
                  type="number"
                  min="0"
                  value={transportCharges}
                  onChange={(e) => setTransportCharges(Number(e.target.value))}
                  placeholder="0"
                  className="w-28 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-right text-xs font-mono text-white focus:outline-none"
                />
              </div>

              {/* Discount */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="text-amber-400">Special Discount:</span>
                <div className="flex items-center gap-1">
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="bg-slate-900 border border-slate-700 rounded px-1.5 py-1 text-[11px] text-slate-300"
                  >
                    <option value="amount">Rs.</option>
                    <option value="percentage">%</option>
                  </select>
                  <input
                    type="number"
                    min="0"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-24 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-right text-xs font-mono text-amber-300 focus:outline-none"
                  />
                </div>
              </div>

              {/* VAT */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <span>VAT (%):</span>
                <div className="flex items-center gap-1">
                  <select
                    value={vatPercentage}
                    onChange={(e) => setVatPercentage(Number(e.target.value))}
                    className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-300"
                  >
                    <option value={0}>0% (Exempt)</option>
                    <option value={18}>18% (Standard VAT)</option>
                  </select>
                  <span className="font-mono text-white text-xs w-20 text-right">
                    {formatLKR(vatAmount)}
                  </span>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-800 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Net Grand Total
              </div>
              <div className="text-3xl font-black font-mono text-cyan-300 tracking-tight">
                {formatLKR(grandTotal)}
              </div>
              <div className="text-[11px] text-slate-400 italic">
                {numberToWordsLKR(grandTotal)}
              </div>
            </div>
          </div>

          <div className="pt-6 space-y-2">
            <button
              type="button"
              onClick={() => handleSaveQuotation('PENDING', true)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4 stroke-[3]" />
              <span>Generate & View Printable Quotation</span>
            </button>

            <button
              type="button"
              onClick={onBack}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel & Return
            </button>
          </div>

        </div>

      </div>

      {/* Quick Add Customer Modal */}
      {showQuickCustModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0b1329] border border-cyan-500/40 rounded-3xl w-full max-w-md p-6 shadow-2xl relative text-slate-100">
            
            <button
              onClick={() => setShowQuickCustModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-cyan-400" />
              <span>Quick Add Customer</span>
            </h3>

            <form onSubmit={handleSaveQuickCustomer} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  value={quickCustName}
                  onChange={(e) => setQuickCustName(e.target.value)}
                  placeholder="e.g. Asela Jayawardena"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                  Company / Shop (Optional)
                </label>
                <input
                  type="text"
                  value={quickCustCompany}
                  onChange={(e) => setQuickCustCompany(e.target.value)}
                  placeholder="e.g. Jayawardena Supermarket"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={quickCustPhone}
                  onChange={(e) => setQuickCustPhone(e.target.value)}
                  placeholder="077 348 9102"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                  Address / Site Location *
                </label>
                <input
                  type="text"
                  required
                  value={quickCustAddress}
                  onChange={(e) => setQuickCustAddress(e.target.value)}
                  placeholder="No. 128, Galle Road, Colombo"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowQuickCustModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
                >
                  Add & Select
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Survey Picker Modal */}
      {showSurveyPickerModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-indigo-400" />
                Select Site Survey to Auto-Fill Quotation
              </h3>
              <button
                type="button"
                onClick={() => setShowSurveyPickerModal(false)}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Selecting a survey will automatically populate the customer information, camera equipment list, RG59 copper cabling meters, connectors, power supplies, and labor installation charges based on site measurements.
            </p>

            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
              {availableSurveys.map((srv) => (
                <div
                  key={srv.id}
                  className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-indigo-500/50 transition-all flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                        {srv.surveyNumber}
                      </span>
                      <span className="text-xs font-bold text-white">
                        {srv.customerName}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {srv.propertyType} • {srv.cameraCount} Cameras ({srv.systemType}) • Est. {srv.totalFinalCableMeters}m Cable
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Site: {srv.siteAddress}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleFillFromSurvey(srv.id)}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow cursor-pointer whitespace-nowrap"
                  >
                    Auto-Populate
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowSurveyPickerModal(false)}
                className="px-4 py-1.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Market Price Search Modal */}
      {showPriceSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-cyan-400" />
                Live Market Price Search (Sri Lanka CCTV Benchmark)
              </h3>
              <button
                type="button"
                onClick={() => setShowPriceSearchModal(false)}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <PriceSearchHub
              onAddToQuotation={(item) => {
                const newItem: QuotationItem = {
                  id: `item-${Date.now()}-${items.length + 1}`,
                  srNo: items.length + 1,
                  description: item.productName,
                  model: item.modelNumber || '',
                  unit: 'PCS',
                  qty: 1,
                  rate: item.calculatedSellingPrice,
                  amount: item.calculatedSellingPrice,
                  warranty: item.warranty || '2 Years Comprehensive Warranty'
                };
                setItems([...items, newItem]);
                setShowPriceSearchModal(false);
                alert(`Added "${item.productName}" at ${formatLKR(item.calculatedSellingPrice)} into quotation table!`);
              }}
            />
          </div>
        </div>
      )}

    </div>
  );
};
