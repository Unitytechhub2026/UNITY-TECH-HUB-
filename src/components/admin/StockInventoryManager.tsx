import React, { useState, useMemo } from 'react';
import { Product, StockMovement, SerialNumberRecord, Customer } from '../../types';
import { dbStore, formatLKR } from '../../data/dbStore';
import { OwnerVerificationModal } from '../common/OwnerVerificationModal';
import { OWNER_VERIFICATION_MESSAGES } from '../../services/ownerSecurity';
import { 
  Package, 
  ArrowUpRight, 
  ArrowDownRight, 
  RefreshCw, 
  Plus, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  Barcode, 
  History, 
  ShieldCheck, 
  Layers, 
  TrendingUp, 
  FileText, 
  X,
  User,
  Calendar,
  Building,
  Edit2,
  Trash2
} from 'lucide-react';

export const StockInventoryManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(() => dbStore.getProducts());
  const [movements, setMovements] = useState<StockMovement[]>(() => dbStore.getStockMovements());
  const [serials, setSerials] = useState<SerialNumberRecord[]>(() => dbStore.getSerialNumbers());
  const [customers] = useState<Customer[]>(() => dbStore.getCustomers());

  // Active view sub-tab
  const [activeTab, setActiveTab] = useState<'inventory' | 'movements' | 'serials'>('inventory');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [stockStatusFilter, setStockStatusFilter] = useState<'All' | 'in_stock' | 'low_stock' | 'out_of_stock'>('All');

  // Modals state
  const [isStockInModalOpen, setIsStockInModalOpen] = useState(false);
  const [isStockOutModalOpen, setIsStockOutModalOpen] = useState(false);
  const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false);
  const [isAddSerialModalOpen, setIsAddSerialModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Owner Verification Modal State
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [pendingStockAction, setPendingStockAction] = useState<(() => void) | null>(null);
  const [ownerPromptMessage, setOwnerPromptMessage] = useState(OWNER_VERIFICATION_MESSAGES.CHANGE_STOCK);

  const requireOwnerAuth = (action: () => void, message: string = OWNER_VERIFICATION_MESSAGES.CHANGE_STOCK) => {
    setPendingStockAction(() => action);
    setOwnerPromptMessage(message);
    setIsOwnerModalOpen(true);
  };

  // Form states
  const [stockInForm, setStockInForm] = useState({
    productId: '',
    quantity: 1,
    supplier: '',
    referenceNumber: '',
    reason: 'Distributor Wholesale Purchase',
    performedBy: 'Super Admin',
    notes: ''
  });

  const [stockOutForm, setStockOutForm] = useState({
    productId: '',
    quantity: 1,
    reason: 'Installation / Job Dispatch',
    referenceNumber: '',
    performedBy: 'Senior Technician',
    notes: ''
  });

  const [adjustmentForm, setAdjustmentForm] = useState({
    productId: '',
    adjustmentQty: 0, // + or -
    reason: 'Stock Audit / Recount',
    referenceNumber: 'ADJ-' + new Date().toISOString().slice(0,10),
    performedBy: 'Super Admin',
    notes: ''
  });

  const [serialForm, setSerialForm] = useState<Partial<SerialNumberRecord>>({
    serialNumber: '',
    productId: '',
    status: 'IN_STOCK',
    customerId: '',
    customerName: '',
    siteAddress: '',
    invoiceNumber: '',
    purchaseDate: new Date().toISOString().slice(0, 10),
    warrantyPeriod: '2 Years',
    warrantyStartDate: new Date().toISOString().slice(0, 10),
    warrantyEndDate: new Date(Date.now() + 730 * 86400000).toISOString().slice(0, 10),
    expectedUsefulLife: '3-5 Years (Estimated)',
    technicianName: 'Kasun Jayawardena',
    notes: ''
  });

  // Calculate Metrics
  const metrics = useMemo(() => {
    let totalItems = 0;
    let totalCostValuation = 0;
    let totalRetailValuation = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    products.forEach(p => {
      const stock = p.stockQuantity || 0;
      totalItems += stock;
      totalCostValuation += stock * (p.purchasePrice || 0);
      totalRetailValuation += stock * (p.sellingPrice || 0);

      const minStock = p.minStock || 5;
      if (stock === 0) {
        outOfStockCount++;
      } else if (stock <= minStock) {
        lowStockCount++;
      }
    });

    return {
      totalSKUs: products.length,
      totalItems,
      totalCostValuation,
      totalRetailValuation,
      lowStockCount,
      outOfStockCount
    };
  }, [products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match = 
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          (p.brand || '').toLowerCase().includes(q) ||
          (p.model || '').toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q);
        if (!match) return false;
      }

      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }

      const stock = p.stockQuantity || 0;
      const minStock = p.minStock || 5;

      if (stockStatusFilter === 'out_of_stock' && stock > 0) return false;
      if (stockStatusFilter === 'low_stock' && (stock === 0 || stock > minStock)) return false;
      if (stockStatusFilter === 'in_stock' && stock <= minStock) return false;

      return true;
    });
  }, [products, searchQuery, selectedCategory, stockStatusFilter]);

  // Filtered Serials
  const filteredSerials = useMemo(() => {
    return serials.filter(s => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        s.serialNumber.toLowerCase().includes(q) ||
        s.productName.toLowerCase().includes(q) ||
        (s.customerName || '').toLowerCase().includes(q) ||
        (s.invoiceNumber || '').toLowerCase().includes(q)
      );
    });
  }, [serials, searchQuery]);

  // Handlers
  const handleOpenStockIn = (prod?: Product) => {
    requireOwnerAuth(() => {
      setStockInForm({
        productId: prod ? prod.id : (products[0]?.id || ''),
        quantity: 5,
        supplier: prod?.supplier || 'Redington Sri Lanka',
        referenceNumber: 'PO-2026-' + Math.floor(100 + Math.random() * 900),
        reason: 'Distributor Wholesale Purchase',
        performedBy: 'Super Admin',
        notes: ''
      });
      setIsStockInModalOpen(true);
    }, OWNER_VERIFICATION_MESSAGES.CHANGE_STOCK);
  };

  const handleOpenStockOut = (prod?: Product) => {
    requireOwnerAuth(() => {
      setStockOutForm({
        productId: prod ? prod.id : (products[0]?.id || ''),
        quantity: 1,
        reason: 'Installation / Job Dispatch',
        referenceNumber: 'JOB-2026-' + Math.floor(100 + Math.random() * 900),
        performedBy: 'Senior Technician',
        notes: ''
      });
      setIsStockOutModalOpen(true);
    }, OWNER_VERIFICATION_MESSAGES.CHANGE_STOCK);
  };

  const handleOpenAdjustment = (prod?: Product) => {
    requireOwnerAuth(() => {
      setAdjustmentForm({
        productId: prod ? prod.id : (products[0]?.id || ''),
        adjustmentQty: 0,
        reason: 'Stock Audit / Recount',
        referenceNumber: 'ADJ-' + new Date().toISOString().slice(0,10),
        performedBy: 'Super Admin',
        notes: ''
      });
      setIsAdjustmentModalOpen(true);
    }, OWNER_VERIFICATION_MESSAGES.CHANGE_STOCK);
  };

  const handleExecuteStockIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stockInForm.productId || stockInForm.quantity <= 0) return;

    dbStore.recordStockMovement(
      stockInForm.productId,
      'STOCK_IN',
      stockInForm.quantity,
      stockInForm.reason,
      stockInForm.referenceNumber,
      stockInForm.performedBy,
      stockInForm.notes
    );

    setProducts(dbStore.getProducts());
    setMovements(dbStore.getStockMovements());
    setIsStockInModalOpen(false);
  };

  const handleExecuteStockOut = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stockOutForm.productId || stockOutForm.quantity <= 0) return;

    dbStore.recordStockMovement(
      stockOutForm.productId,
      'STOCK_OUT',
      stockOutForm.quantity,
      stockOutForm.reason,
      stockOutForm.referenceNumber,
      stockOutForm.performedBy,
      stockOutForm.notes
    );

    setProducts(dbStore.getProducts());
    setMovements(dbStore.getStockMovements());
    setIsStockOutModalOpen(false);
  };

  const handleExecuteAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustmentForm.productId || adjustmentForm.adjustmentQty === 0) return;

    dbStore.recordStockMovement(
      adjustmentForm.productId,
      'ADJUSTMENT',
      adjustmentForm.adjustmentQty,
      adjustmentForm.reason,
      adjustmentForm.referenceNumber,
      adjustmentForm.performedBy,
      adjustmentForm.notes
    );

    setProducts(dbStore.getProducts());
    setMovements(dbStore.getStockMovements());
    setIsAdjustmentModalOpen(false);
  };

  const handleSaveSerial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serialForm.serialNumber || !serialForm.productId) {
      alert("Serial number and product are required.");
      return;
    }

    const prod = products.find(p => p.id === serialForm.productId);
    const newRecord: SerialNumberRecord = {
      id: `sn-${Date.now()}`,
      serialNumber: serialForm.serialNumber,
      productId: serialForm.productId,
      productName: prod ? prod.name : 'Unknown Product',
      brand: prod ? prod.brand : 'Hikvision',
      model: prod ? prod.model : '',
      category: prod ? prod.category : 'CCTV Cameras',
      status: serialForm.status || 'IN_STOCK',
      customerId: serialForm.customerId || undefined,
      customerName: serialForm.customerName || undefined,
      siteAddress: serialForm.siteAddress || undefined,
      invoiceNumber: serialForm.invoiceNumber || undefined,
      purchaseDate: serialForm.purchaseDate,
      installationDate: serialForm.status === 'INSTALLED' ? serialForm.warrantyStartDate : undefined,
      warrantyPeriod: serialForm.warrantyPeriod || '2 Years',
      warrantyStartDate: serialForm.warrantyStartDate,
      warrantyEndDate: serialForm.warrantyEndDate,
      expectedUsefulLife: serialForm.expectedUsefulLife || '3-5 Years (Estimated)',
      technicianName: serialForm.technicianName,
      notes: serialForm.notes,
      createdAt: new Date().toISOString()
    };

    dbStore.saveSerialNumber(newRecord);
    setSerials(dbStore.getSerialNumbers());
    setIsAddSerialModalOpen(false);
  };

  const handleDeleteSerial = (id: string) => {
    requireOwnerAuth(() => {
      dbStore.deleteSerialNumber(id);
      setSerials(dbStore.getSerialNumbers());
    }, 'Enter Owner Password to delete this serial number record.');
  };

  return (
    <div className="space-y-6">
      
      {/* Metric Cards Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold uppercase">Total SKUs</span>
          <div className="text-xl font-black text-white">{metrics.totalSKUs}</div>
          <span className="text-[10px] text-cyan-400">{metrics.totalItems} Units in Stock</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold uppercase">Cost Valuation</span>
          <div className="text-xl font-black text-cyan-300">{formatLKR(metrics.totalCostValuation)}</div>
          <span className="text-[10px] text-slate-500">Purchase Value</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold uppercase">Retail Valuation</span>
          <div className="text-xl font-black text-emerald-400">{formatLKR(metrics.totalRetailValuation)}</div>
          <span className="text-[10px] text-slate-500">Selling Value</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/20 space-y-1">
          <span className="text-[11px] text-amber-400 font-semibold uppercase">Low Stock SKUs</span>
          <div className="text-xl font-black text-amber-300">{metrics.lowStockCount}</div>
          <span className="text-[10px] text-amber-400/80">Reorder Advised</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-rose-500/20 space-y-1">
          <span className="text-[11px] text-rose-400 font-semibold uppercase">Out of Stock</span>
          <div className="text-xl font-black text-rose-400">{metrics.outOfStockCount}</div>
          <span className="text-[10px] text-rose-400/80">Zero Available</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/20 space-y-1">
          <span className="text-[11px] text-cyan-400 font-semibold uppercase">Tracked Serials</span>
          <div className="text-xl font-black text-cyan-300">{serials.length}</div>
          <span className="text-[10px] text-slate-400">In Register</span>
        </div>
      </div>

      {/* Main Header & Sub Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'inventory'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Stock Inventory ({filteredProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('movements')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'movements'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Movement Audit Trail ({movements.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('serials')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'serials'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Barcode className="w-4 h-4" />
            <span>Serial Numbers ({serials.length})</span>
          </button>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => handleOpenStockIn()}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm shadow-emerald-600/30 cursor-pointer"
          >
            <ArrowDownRight className="w-4 h-4" />
            <span>+ STOCK IN</span>
          </button>

          <button
            onClick={() => handleOpenStockOut()}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-sm shadow-rose-600/30 cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>- STOCK OUT</span>
          </button>

          <button
            onClick={() => handleOpenAdjustment()}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>ADJUST</span>
          </button>

          {activeTab === 'serials' && (
            <button
              onClick={() => setIsAddSerialModalOpen(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ REGISTER SERIAL</span>
            </button>
          )}
        </div>
      </div>

      {/* TAB 1: INVENTORY TABLE */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
            <div className="flex items-center gap-2 flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-cyan-400" />
              <input
                type="text"
                placeholder="Search inventory by product name, code, brand, model..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
              >
                <option value="All">All Categories</option>
                <option value="CCTV Cameras">CCTV Cameras</option>
                <option value="Recorders (DVR/NVR)">DVR / NVR</option>
                <option value="Storage & Hard Disks">Hard Disks</option>
                <option value="Power & SMPS">Power Supplies</option>
                <option value="Cables & Wiring">Cables & Wiring</option>
                <option value="Network & Switches">PoE & Network</option>
                <option value="Displays & Monitors">Monitors</option>
                <option value="Connectors & Accessories">Accessories</option>
                <option value="Tools & Consumables">Tools & Consumables</option>
              </select>

              <select
                value={stockStatusFilter}
                onChange={(e: any) => setStockStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
              >
                <option value="All">All Stock Levels</option>
                <option value="in_stock">In Stock (&gt; Min)</option>
                <option value="low_stock">Low Stock Warning</option>
                <option value="out_of_stock">Out of Stock (0)</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="p-3.5">Code & Product</th>
                    <th className="p-3.5">Category & Brand</th>
                    <th className="p-3.5 text-center">In Stock</th>
                    <th className="p-3.5 text-right">Cost Price</th>
                    <th className="p-3.5 text-right">Selling Price</th>
                    <th className="p-3.5 text-right">Stock Valuation</th>
                    <th className="p-3.5 text-center">Status</th>
                    <th className="p-3.5 text-center">Quick Movement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredProducts.map((p) => {
                    const stock = p.stockQuantity || 0;
                    const minStock = p.minStock || 5;
                    const isOutOfStock = stock === 0;
                    const isLowStock = !isOutOfStock && stock <= minStock;
                    const valuation = stock * (p.purchasePrice || 0);

                    return (
                      <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5 space-y-0.5">
                          <div className="font-bold text-white text-sm">{p.name}</div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-cyan-400 text-[10px]">{p.code}</span>
                            {p.model && (
                              <span className="text-slate-400 text-[10px] truncate max-w-[200px]">
                                {p.model}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="p-3.5 space-y-0.5">
                          <div className="text-slate-200">{p.category}</div>
                          <div className="text-cyan-400/80 font-mono text-[10px]">{p.brand}</div>
                        </td>

                        <td className="p-3.5 text-center">
                          <span className={`inline-block font-black text-sm px-2.5 py-1 rounded-lg ${
                            isOutOfStock 
                              ? 'bg-rose-950/80 text-rose-400 border border-rose-500/30' 
                              : isLowStock 
                              ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30' 
                              : 'bg-slate-950 text-white border border-slate-800'
                          }`}>
                            {stock} {p.unit}
                          </span>
                          <span className="block text-[9px] text-slate-500 mt-0.5">Min: {minStock}</span>
                        </td>

                        <td className="p-3.5 text-right font-mono text-slate-300">
                          {formatLKR(p.purchasePrice)}
                        </td>

                        <td className="p-3.5 text-right font-mono font-bold text-cyan-300">
                          {formatLKR(p.sellingPrice)}
                        </td>

                        <td className="p-3.5 text-right font-mono text-slate-200">
                          {formatLKR(valuation)}
                        </td>

                        <td className="p-3.5 text-center">
                          {isOutOfStock ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-950 text-rose-400 border border-rose-500/30 text-[10px] font-bold">
                              OUT OF STOCK
                            </span>
                          ) : isLowStock ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                              LOW STOCK
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                              IN STOCK
                            </span>
                          )}
                        </td>

                        <td className="p-3.5 text-center">
                          <div className="inline-flex items-center gap-1">
                            <button
                              onClick={() => handleOpenStockIn(p)}
                              title="Stock In (+)"
                              className="p-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-800 text-emerald-300 border border-emerald-500/30 transition-colors"
                            >
                              <ArrowDownRight className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleOpenStockOut(p)}
                              title="Stock Out (-)"
                              className="p-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-800 text-rose-300 border border-rose-500/30 transition-colors"
                            >
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleOpenAdjustment(p)}
                              title="Adjust Stock"
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 transition-colors"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: MOVEMENTS AUDIT TRAIL */}
      {activeTab === 'movements' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="p-3.5">Date & Time</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5 text-center">Qty Changed</th>
                    <th className="p-3.5 text-center">Balance</th>
                    <th className="p-3.5">Reason & Reference</th>
                    <th className="p-3.5">Performed By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {movements.map((m) => {
                    const isStockIn = m.type === 'STOCK_IN';
                    const isStockOut = m.type === 'STOCK_OUT';
                    return (
                      <tr key={m.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5 text-slate-400 font-mono">
                          {new Date(m.date).toLocaleString()}
                        </td>

                        <td className="p-3.5">
                          {isStockIn ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                              <ArrowDownRight className="w-3 h-3" />
                              <span>STOCK IN</span>
                            </span>
                          ) : isStockOut ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-950 text-rose-400 border border-rose-500/30 text-[10px] font-bold">
                              <ArrowUpRight className="w-3 h-3" />
                              <span>STOCK OUT</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold">
                              <RefreshCw className="w-3 h-3" />
                              <span>ADJUSTMENT</span>
                            </span>
                          )}
                        </td>

                        <td className="p-3.5 space-y-0.5">
                          <div className="font-bold text-white">{m.productName}</div>
                          <div className="text-cyan-400 font-mono text-[10px]">{m.productCode}</div>
                        </td>

                        <td className="p-3.5 text-center font-mono font-bold text-sm">
                          <span className={isStockIn ? 'text-emerald-400' : isStockOut ? 'text-rose-400' : 'text-cyan-400'}>
                            {isStockIn ? `+${m.quantity}` : isStockOut ? `-${m.quantity}` : `${m.quantity > 0 ? '+' : ''}${m.quantity}`}
                          </span>
                        </td>

                        <td className="p-3.5 text-center font-mono text-slate-300">
                          {m.previousStock} → <strong className="text-white">{m.newStock}</strong>
                        </td>

                        <td className="p-3.5 space-y-0.5">
                          <div className="text-slate-200">{m.reason}</div>
                          {m.referenceNumber && (
                            <div className="text-cyan-400 font-mono text-[10px]">Ref: {m.referenceNumber}</div>
                          )}
                          {m.notes && <div className="text-slate-500 text-[10px] italic">{m.notes}</div>}
                        </td>

                        <td className="p-3.5 text-slate-300">
                          {m.performedBy || 'Super Admin'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SERIAL NUMBERS REGISTER */}
      {activeTab === 'serials' && (
        <div className="space-y-4">
          
          <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-cyan-400" />
              <input
                type="text"
                placeholder="Search by serial number, product, customer name, invoice..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
            <span className="text-slate-400 font-mono">
              Total Serials: <strong className="text-white">{serials.length}</strong>
            </span>
          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="p-3.5">Serial Number</th>
                    <th className="p-3.5">Product & Model</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Customer & Site</th>
                    <th className="p-3.5">Warranty End Date</th>
                    <th className="p-3.5">Estimated Life</th>
                    <th className="p-3.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredSerials.map((s) => {
                    const isInstalled = s.status === 'INSTALLED';
                    const isInStock = s.status === 'IN_STOCK';
                    const isExpired = s.warrantyEndDate && new Date(s.warrantyEndDate) < new Date();

                    return (
                      <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-cyan-300">
                          {s.serialNumber}
                        </td>

                        <td className="p-3.5 space-y-0.5">
                          <div className="font-semibold text-white">{s.productName}</div>
                          <div className="text-[10px] text-slate-400">{s.brand} {s.model ? `• ${s.model}` : ''}</div>
                        </td>

                        <td className="p-3.5">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isInStock 
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' 
                              : isInstalled 
                              ? 'bg-blue-950 text-blue-300 border border-blue-500/30'
                              : 'bg-slate-800 text-slate-300'
                          }`}>
                            {s.status}
                          </span>
                        </td>

                        <td className="p-3.5 space-y-0.5">
                          {s.customerName ? (
                            <>
                              <div className="font-semibold text-slate-200">{s.customerName}</div>
                              <div className="text-slate-400 text-[10px] truncate max-w-[180px]">{s.siteAddress}</div>
                            </>
                          ) : (
                            <span className="text-slate-500 italic">In Stock Store</span>
                          )}
                        </td>

                        <td className="p-3.5 font-mono">
                          <span className={isExpired ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                            {s.warrantyEndDate || 'N/A'}
                          </span>
                          {isExpired && <span className="block text-[9px] text-rose-400">EXPIRED</span>}
                        </td>

                        <td className="p-3.5 text-slate-300">
                          {s.expectedUsefulLife || '3-5 Years'}
                        </td>

                        <td className="p-3.5 text-center">
                          <button
                            onClick={() => handleDeleteSerial(s.id)}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                            title="Delete Serial Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: STOCK IN */}
      {isStockInModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-emerald-500/30 shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  <ArrowDownRight className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">+ STOCK IN (Receive Goods)</h3>
                  <p className="text-xs text-slate-400">Increase product stock from supplier PO or batch import</p>
                </div>
              </div>
              <button onClick={() => setIsStockInModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleExecuteStockIn} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Select Product *</label>
                <select
                  value={stockInForm.productId}
                  onChange={e => setStockInForm({ ...stockInForm, productId: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-400"
                  required
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.code}) - Current: {p.stockQuantity} {p.unit}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Quantity to Add *</label>
                  <input
                    type="number"
                    min="1"
                    value={stockInForm.quantity}
                    onChange={e => setStockInForm({ ...stockInForm, quantity: parseInt(e.target.value) || 1 })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Supplier Source</label>
                  <input
                    type="text"
                    value={stockInForm.supplier}
                    onChange={e => setStockInForm({ ...stockInForm, supplier: e.target.value })}
                    placeholder="e.g. Redington Sri Lanka"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">PO / Reference #</label>
                  <input
                    type="text"
                    value={stockInForm.referenceNumber}
                    onChange={e => setStockInForm({ ...stockInForm, referenceNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Performed By</label>
                  <input
                    type="text"
                    value={stockInForm.performedBy}
                    onChange={e => setStockInForm({ ...stockInForm, performedBy: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Reason / Notes</label>
                <input
                  type="text"
                  value={stockInForm.reason}
                  onChange={e => setStockInForm({ ...stockInForm, reason: e.target.value })}
                  placeholder="e.g. Wholesale purchase from distributor"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsStockInModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30"
                >
                  Confirm Stock In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: STOCK OUT */}
      {isStockOutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-rose-500/30 shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-rose-950 text-rose-400 border border-rose-500/30">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">- STOCK OUT (Dispatch / Issue)</h3>
                  <p className="text-xs text-slate-400">Deduct inventory for client installations, sales, or jobs</p>
                </div>
              </div>
              <button onClick={() => setIsStockOutModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleExecuteStockOut} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Select Product *</label>
                <select
                  value={stockOutForm.productId}
                  onChange={e => setStockOutForm({ ...stockOutForm, productId: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-400"
                  required
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.code}) - Current: {p.stockQuantity} {p.unit}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Quantity to Deduct *</label>
                  <input
                    type="number"
                    min="1"
                    value={stockOutForm.quantity}
                    onChange={e => setStockOutForm({ ...stockOutForm, quantity: parseInt(e.target.value) || 1 })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Invoice / Job #</label>
                  <input
                    type="text"
                    value={stockOutForm.referenceNumber}
                    onChange={e => setStockOutForm({ ...stockOutForm, referenceNumber: e.target.value })}
                    placeholder="e.g. INV-2026-0002"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Reason / Site</label>
                <input
                  type="text"
                  value={stockOutForm.reason}
                  onChange={e => setStockOutForm({ ...stockOutForm, reason: e.target.value })}
                  placeholder="e.g. Installation at Samantha Perera residence"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsStockOutModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30"
                >
                  Confirm Stock Out
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: STOCK ADJUSTMENT */}
      {isAdjustmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-cyan-500/30 shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Stock Adjustment (Audit Correction)</h3>
                  <p className="text-xs text-slate-400">Add or deduct inventory for physical recount or damage</p>
                </div>
              </div>
              <button onClick={() => setIsAdjustmentModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleExecuteAdjustment} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Select Product *</label>
                <select
                  value={adjustmentForm.productId}
                  onChange={e => setAdjustmentForm({ ...adjustmentForm, productId: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  required
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.code}) - Current: {p.stockQuantity} {p.unit}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Adjustment Delta (Positive + or Negative -) *
                </label>
                <input
                  type="number"
                  value={adjustmentForm.adjustmentQty}
                  onChange={e => setAdjustmentForm({ ...adjustmentForm, adjustmentQty: parseInt(e.target.value) || 0 })}
                  placeholder="e.g. -2 for damage, +3 for recount"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  required
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Positive numbers increase stock, negative numbers reduce stock.
                </span>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Reason / Justification</label>
                <input
                  type="text"
                  value={adjustmentForm.reason}
                  onChange={e => setAdjustmentForm({ ...adjustmentForm, reason: e.target.value })}
                  placeholder="e.g. Discarded 1 damaged camera box"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAdjustmentModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30"
                >
                  Save Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: REGISTER SERIAL NUMBER */}
      {isAddSerialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-cyan-500/30 shadow-2xl p-6 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                  <Barcode className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Register Hardware Serial Number</h3>
                  <p className="text-xs text-slate-400">Track individual camera, NVR, DVR, or HDD serial warranty</p>
                </div>
              </div>
              <button onClick={() => setIsAddSerialModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSerial} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Serial Number (S/N) *</label>
                  <input
                    type="text"
                    value={serialForm.serialNumber}
                    onChange={e => setSerialForm({ ...serialForm, serialNumber: e.target.value })}
                    placeholder="e.g. HKV202688912"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:border-cyan-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Hardware Status</label>
                  <select
                    value={serialForm.status}
                    onChange={(e: any) => setSerialForm({ ...serialForm, status: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="IN_STOCK">IN_STOCK (In Store)</option>
                    <option value="INSTALLED">INSTALLED (At Client Site)</option>
                    <option value="UNDER_REPAIR">UNDER_REPAIR</option>
                    <option value="REPLACED">REPLACED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Linked Product *</label>
                <select
                  value={serialForm.productId}
                  onChange={e => setSerialForm({ ...serialForm, productId: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  required
                >
                  <option value="">-- Choose Product --</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.brand} - {p.model || 'Standard'})
                    </option>
                  ))}
                </select>
              </div>

              {serialForm.status === 'INSTALLED' && (
                <>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Assigned Customer</label>
                    <select
                      value={serialForm.customerId}
                      onChange={e => {
                        const cust = customers.find(c => c.id === e.target.value);
                        setSerialForm({
                          ...serialForm,
                          customerId: e.target.value,
                          customerName: cust ? cust.name : '',
                          siteAddress: cust ? cust.address : ''
                        });
                      }}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="">-- Select Customer --</option>
                      {customers.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.phone})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Invoice Reference</label>
                      <input
                        type="text"
                        value={serialForm.invoiceNumber}
                        onChange={e => setSerialForm({ ...serialForm, invoiceNumber: e.target.value })}
                        placeholder="INV-2026-0001"
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Technician</label>
                      <input
                        type="text"
                        value={serialForm.technicianName}
                        onChange={e => setSerialForm({ ...serialForm, technicianName: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Warranty Start Date</label>
                  <input
                    type="date"
                    value={serialForm.warrantyStartDate}
                    onChange={e => setSerialForm({ ...serialForm, warrantyStartDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Warranty End Date</label>
                  <input
                    type="date"
                    value={serialForm.warrantyEndDate}
                    onChange={e => setSerialForm({ ...serialForm, warrantyEndDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Estimated Useful Life (Years)</label>
                <input
                  type="text"
                  value={serialForm.expectedUsefulLife}
                  onChange={e => setSerialForm({ ...serialForm, expectedUsefulLife: e.target.value })}
                  placeholder="e.g. 3-5 Years (Estimated)"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddSerialModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30"
                >
                  Register Serial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Owner Verification Modal */}
      <OwnerVerificationModal
        isOpen={isOwnerModalOpen}
        onClose={() => {
          setIsOwnerModalOpen(false);
          setPendingStockAction(null);
        }}
        onSuccess={() => {
          if (pendingStockAction) {
            pendingStockAction();
            setPendingStockAction(null);
          }
        }}
        actionTitle="OWNER VERIFICATION"
        actionMessage={ownerPromptMessage}
      />

    </div>
  );
};
