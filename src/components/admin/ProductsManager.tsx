import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  X, 
  Layers, 
  Camera,
  Archive,
  RotateCcw,
  DollarSign,
  Lock,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Building2,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import { Product, CameraModel, ProductCategory, UnitType } from '../../types';
import { dbStore, formatLKR } from '../../data/dbStore';
import { OwnerVerificationModal } from '../common/OwnerVerificationModal';
import { OWNER_VERIFICATION_MESSAGES } from '../../services/ownerSecurity';

type PendingOwnerAction = 
  | { type: 'ADD_PRODUCT' }
  | { type: 'EDIT_PRODUCT'; product: Product }
  | { type: 'DELETE_PRODUCT'; productId: string; productName: string }
  | { type: 'ARCHIVE_PRODUCT'; productId: string; productName: string; isArchived: boolean }
  | { type: 'CHANGE_PRICE_STOCK'; product: Product }
  | { type: 'ADD_CAMERA_MODEL' };

export const ProductsManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'camera-models' | 'archived'>('products');
  const [products, setProducts] = useState<Product[]>(() => dbStore.getProducts());
  const [cameraModels, setCameraModels] = useState<CameraModel[]>(() => dbStore.getCameraModels());

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Owner Verification Modal State
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingOwnerAction | null>(null);
  const [verificationMessage, setVerificationMessage] = useState(OWNER_VERIFICATION_MESSAGES.ADD_PRODUCT);

  // Product Add / Edit Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // All 16 Form Fields for Product Management
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('CCTV Cameras');
  const [subcategory, setSubcategory] = useState('');
  const [brand, setBrand] = useState('Hikvision');
  const [model, setModel] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [specifications, setSpecifications] = useState('');
  const [purchasePrice, setPurchasePrice] = useState<number>(0);
  const [sellingPrice, setSellingPrice] = useState<number>(0);
  const [warranty, setWarranty] = useState('2 Years Comprehensive Replacement Warranty');
  const [expectedUsefulLife, setExpectedUsefulLife] = useState('3-5 Years (Surveillance Grade)');
  const [stockQuantity, setStockQuantity] = useState<number>(10);
  const [unit, setUnit] = useState<UnitType>('PCS');
  const [minStock, setMinStock] = useState<number>(2);
  const [supplier, setSupplier] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [datasheetUrl, setDatasheetUrl] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');

  // Quick Price / Stock Adjustment Modal State
  const [isQuickAdjustModalOpen, setIsQuickAdjustModalOpen] = useState(false);
  const [adjustingProduct, setAdjustingProduct] = useState<Product | null>(null);
  const [adjPurchasePrice, setAdjPurchasePrice] = useState<number>(0);
  const [adjSellingPrice, setAdjSellingPrice] = useState<number>(0);
  const [adjStockQty, setAdjStockQty] = useState<number>(0);

  // Camera Model Modal
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [cameraBrand, setCameraBrand] = useState('Hikvision');
  const [cameraModelName, setCameraModelName] = useState('');
  const [cameraType, setCameraType] = useState('ColorVu Bullet');
  const [cameraResolution, setCameraResolution] = useState('2MP (1080p)');
  const [cameraNightVision, setCameraNightVision] = useState('Full Color 24/7 (20m)');
  const [cameraAudio, setCameraAudio] = useState(true);
  const [cameraDefaultPrice, setCameraDefaultPrice] = useState<number>(6800);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const refreshList = () => {
    setProducts(dbStore.getProducts());
    setCameraModels(dbStore.getCameraModels());
  };

  // ===================================================
  // OWNER VERIFICATION INVOCATION HANDLERS
  // ===================================================

  const handleRequestAddProduct = () => {
    setPendingAction({ type: 'ADD_PRODUCT' });
    setVerificationMessage(OWNER_VERIFICATION_MESSAGES.ADD_PRODUCT);
    setIsOwnerModalOpen(true);
  };

  const handleRequestEditProduct = (p: Product) => {
    setPendingAction({ type: 'EDIT_PRODUCT', product: p });
    setVerificationMessage(OWNER_VERIFICATION_MESSAGES.EDIT_PRODUCT);
    setIsOwnerModalOpen(true);
  };

  const handleRequestDeleteProduct = (productId: string, productName: string) => {
    setPendingAction({ type: 'DELETE_PRODUCT', productId, productName });
    setVerificationMessage(OWNER_VERIFICATION_MESSAGES.DELETE_PRODUCT);
    setIsOwnerModalOpen(true);
  };

  const handleRequestArchiveProduct = (productId: string, productName: string, isArchived: boolean) => {
    setPendingAction({ type: 'ARCHIVE_PRODUCT', productId, productName, isArchived });
    setVerificationMessage(isArchived ? OWNER_VERIFICATION_MESSAGES.RESTORE_PRODUCT : OWNER_VERIFICATION_MESSAGES.ARCHIVE_PRODUCT);
    setIsOwnerModalOpen(true);
  };

  const handleRequestQuickAdjust = (p: Product) => {
    setPendingAction({ type: 'CHANGE_PRICE_STOCK', product: p });
    setVerificationMessage(OWNER_VERIFICATION_MESSAGES.CHANGE_PRICE);
    setIsOwnerModalOpen(true);
  };

  const handleRequestAddCameraModel = () => {
    setPendingAction({ type: 'ADD_CAMERA_MODEL' });
    setVerificationMessage('Enter Owner Password to add a camera model.');
    setIsOwnerModalOpen(true);
  };

  // ===================================================
  // OWNER VERIFICATION SUCCESS DISPATCHER
  // ===================================================
  const handleOwnerVerificationSuccess = (_verifiedPassword: string) => {
    if (!pendingAction) return;

    switch (pendingAction.type) {
      case 'ADD_PRODUCT': {
        setEditingProduct(null);
        setName('');
        setCategory('CCTV Cameras');
        setSubcategory('ColorVu 24/7 Full Color');
        setBrand('Hikvision');
        setModel('');
        setCode(`UTH-${Date.now().toString().slice(-4)}`);
        setDescription('');
        setSpecifications('');
        setPurchasePrice(4500);
        setSellingPrice(6800);
        setWarranty('2 Years Comprehensive Replacement Warranty');
        setExpectedUsefulLife('3-5 Years (Surveillance Grade)');
        setStockQuantity(10);
        setUnit('PCS');
        setMinStock(2);
        setSupplier('Redington Sri Lanka / Metropolitan');
        setImageUrl('');
        setDatasheetUrl('');
        setSourceUrl('');
        setIsProductModalOpen(true);
        break;
      }

      case 'EDIT_PRODUCT': {
        const p = pendingAction.product;
        setEditingProduct(p);
        setName(p.name);
        setCategory(p.category);
        setSubcategory(p.subcategory || '');
        setBrand(p.brand);
        setModel(p.model || '');
        setCode(p.code || `UTH-${p.id.slice(-4)}`);
        setDescription(p.description || '');
        setSpecifications(p.specifications || '');
        setPurchasePrice(p.purchasePrice);
        setSellingPrice(p.sellingPrice);
        setWarranty(p.warranty || p.warrantyPeriod || '2 Years Warranty');
        setExpectedUsefulLife(p.expectedUsefulLife || '3-5 Years (Surveillance Grade)');
        setStockQuantity(p.stockQuantity);
        setUnit(p.unit || 'PCS');
        setMinStock(p.minStock || 2);
        setSupplier(p.supplier || '');
        setImageUrl(p.imageUrl || '');
        setDatasheetUrl(p.datasheetUrl || '');
        setSourceUrl(p.sourceUrl || '');
        setIsProductModalOpen(true);
        break;
      }

      case 'DELETE_PRODUCT': {
        dbStore.deleteProduct(pendingAction.productId);
        refreshList();
        showToast(`Product "${pendingAction.productName}" permanently deleted by Owner.`);
        break;
      }

      case 'ARCHIVE_PRODUCT': {
        const newArchivedState = !pendingAction.isArchived;
        dbStore.archiveProduct(pendingAction.productId, newArchivedState);
        refreshList();
        showToast(`Product "${pendingAction.productName}" ${newArchivedState ? 'archived' : 'restored'} successfully.`);
        break;
      }

      case 'CHANGE_PRICE_STOCK': {
        const p = pendingAction.product;
        setAdjustingProduct(p);
        setAdjPurchasePrice(p.purchasePrice);
        setAdjSellingPrice(p.sellingPrice);
        setAdjStockQty(p.stockQuantity);
        setIsQuickAdjustModalOpen(true);
        break;
      }

      case 'ADD_CAMERA_MODEL': {
        setIsCameraModalOpen(true);
        break;
      }
    }

    setPendingAction(null);
  };

  // ===================================================
  // FORM SAVE HANDLERS
  // ===================================================
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || sellingPrice <= 0) {
      alert('Please fill the Product Name and Selling Price.');
      return;
    }

    const prodData: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      code: code.trim() || `UTH-PRD-${Date.now().toString().slice(-4)}`,
      name: name.trim(),
      category: category,
      subcategory: subcategory.trim() || undefined,
      brand: brand.trim() || 'Hikvision',
      model: model.trim() || 'N/A',
      description: description.trim() || undefined,
      specifications: specifications.trim() || undefined,
      unit: unit,
      purchasePrice: Number(purchasePrice),
      sellingPrice: Number(sellingPrice),
      stockQuantity: Number(stockQuantity),
      minStock: Number(minStock),
      warranty: warranty.trim() || '2 Years Comprehensive Replacement Warranty',
      warrantyPeriod: warranty.trim() || '2 Years',
      expectedUsefulLife: expectedUsefulLife.trim() || '3-5 Years (Surveillance Grade)',
      supplier: supplier.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
      datasheetUrl: datasheetUrl.trim() || undefined,
      sourceUrl: sourceUrl.trim() || undefined,
      isArchived: editingProduct ? editingProduct.isArchived : false,
      createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString()
    };

    dbStore.saveProduct(prodData);
    refreshList();
    setIsProductModalOpen(false);
    showToast(editingProduct ? `Product "${prodData.name}" updated successfully!` : `Product "${prodData.name}" added to inventory!`);
  };

  const handleSaveQuickAdjust = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustingProduct) return;

    dbStore.updateProductPriceAndStock(
      adjustingProduct.id,
      Number(adjPurchasePrice),
      Number(adjSellingPrice),
      Number(adjStockQty)
    );

    refreshList();
    setIsQuickAdjustModalOpen(false);
    showToast(`Price and stock updated for "${adjustingProduct.name}".`);
  };

  const handleSaveCameraModel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cameraModelName.trim()) {
      alert('Please enter camera model name.');
      return;
    }

    const newCam: CameraModel = {
      id: `cm-${Date.now()}`,
      name: `${cameraBrand} ${cameraModelName.trim()}`,
      brand: cameraBrand,
      model: cameraModelName.trim(),
      type: cameraType,
      resolution: cameraResolution,
      nightVision: cameraNightVision,
      audio: cameraAudio ? 'Yes' : 'No',
      defaultPrice: Number(cameraDefaultPrice)
    };

    dbStore.saveCameraModel(newCam);
    refreshList();
    setIsCameraModalOpen(false);
    showToast(`Camera model "${newCam.name}" added to catalog.`);
  };

  // Filter Categories
  const categoryFilters = [
    'ALL',
    'CCTV Cameras',
    'Recorders (DVR/NVR)',
    'Storage & Hard Disks',
    'Power & SMPS',
    'Cables & Wiring',
    'Connectors & Accessories',
    'Network & Switches',
    'Displays & Monitors'
  ];

  const activeProducts = products.filter(p => !p.isArchived);
  const archivedProducts = products.filter(p => p.isArchived);

  const displayedList = activeTab === 'archived' ? archivedProducts : activeProducts;

  const filteredProducts = displayedList.filter((p) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      p.name.toLowerCase().includes(q) ||
      (p.model || '').toLowerCase().includes(q) ||
      (p.code || '').toLowerCase().includes(q) ||
      (p.brand || '').toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.supplier || '').toLowerCase().includes(q);

    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 border-2 border-amber-500 text-white shadow-2xl flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
              <Lock className="w-3 h-3" />
              OWNER-PROTECTED INVENTORY
            </span>
          </div>
          <h1 className="text-2xl font-black font-['Outfit',sans-serif] text-white tracking-tight flex items-center gap-2">
            <Package className="w-6 h-6 text-amber-400" />
            <span>Product Inventory & Master Catalog</span>
          </h1>
          <p className="text-xs text-slate-400">
            Secure inventory management. Adding, editing, deleting, and price/stock adjustments require owner verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab !== 'camera-models' ? (
            <button
              onClick={handleRequestAddProduct}
              id="add-product-btn"
              title="Requires Owner Password"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2 cursor-pointer group"
            >
              <Lock className="w-3.5 h-3.5 opacity-80 group-hover:scale-110 transition-transform" />
              <Plus className="w-4 h-4" />
              <span>+ ADD PRODUCT</span>
            </button>
          ) : (
            <button
              onClick={handleRequestAddCameraModel}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 opacity-80" />
              <Plus className="w-4 h-4" />
              <span>+ ADD CAMERA MODEL</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'products'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Active Products ({activeProducts.length})
        </button>

        <button
          onClick={() => setActiveTab('archived')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'archived'
              ? 'bg-red-500/20 text-red-300 border border-red-500/40 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Archived Items ({archivedProducts.length})
        </button>

        <button
          onClick={() => setActiveTab('camera-models')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'camera-models'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Camera Catalog Models ({cameraModels.length})
        </button>
      </div>

      {activeTab !== 'camera-models' ? (
        <div className="space-y-4">
          
          {/* Category Filter Pills & Search */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold">
              {categoryFilters.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by product name, model, code, brand, supplier..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="text-xs text-slate-400 font-mono hidden sm:block">
                Showing {filteredProducts.length} items
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                    <th className="p-4 font-semibold">Product, Code & Model</th>
                    <th className="p-4 font-semibold">Category / Brand</th>
                    <th className="p-4 font-semibold">Stock</th>
                    <th className="p-4 font-semibold">Cost (Purchase)</th>
                    <th className="p-4 font-semibold">Selling Price</th>
                    <th className="p-4 font-semibold">Warranty & Life</th>
                    <th className="p-4 text-right font-semibold">Owner Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400">
                        No products found matching your search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((p) => {
                      const isLowStock = p.stockQuantity <= p.minStock;
                      return (
                        <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                          
                          {/* Product Details */}
                          <td className="p-4">
                            <div className="flex items-start gap-3">
                              {p.imageUrl ? (
                                <img 
                                  src={p.imageUrl} 
                                  alt={p.name}
                                  referrerPolicy="no-referrer"
                                  className="w-10 h-10 rounded-lg object-cover bg-slate-950 border border-slate-700 shrink-0" 
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 shrink-0">
                                  <Package className="w-5 h-5" />
                                </div>
                              )}
                              <div>
                                <div className="font-bold text-white text-sm">
                                  {p.name}
                                </div>
                                <div className="flex items-center gap-2 mt-0.5">
                                  {p.code && (
                                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                                      {p.code}
                                    </span>
                                  )}
                                  <span className="text-[11px] font-mono text-slate-300">
                                    Model: <strong className="text-amber-300">{p.model || 'N/A'}</strong>
                                  </span>
                                </div>
                                {p.supplier && (
                                  <div className="text-[10px] text-slate-400 mt-0.5">
                                    Supplier: {p.supplier}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Category & Brand */}
                          <td className="p-4">
                            <div className="font-semibold text-slate-200">{p.category}</div>
                            <div className="text-[10px] text-slate-400">{p.brand} {p.subcategory ? `• ${p.subcategory}` : ''}</div>
                          </td>

                          {/* Stock */}
                          <td className="p-4 font-mono">
                            <div className="flex items-center gap-2">
                              <span className={`font-bold text-sm ${isLowStock ? 'text-red-400' : 'text-emerald-400'}`}>
                                {p.stockQuantity} {p.unit || 'PCS'}
                              </span>
                              {isLowStock && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-950 border border-red-500/40 text-red-300 animate-pulse">
                                  LOW
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500">Min: {p.minStock || 2} {p.unit || 'PCS'}</div>
                          </td>

                          {/* Cost */}
                          <td className="p-4 font-mono text-slate-400">
                            {formatLKR(p.purchasePrice)}
                          </td>

                          {/* Selling Price */}
                          <td className="p-4 font-mono font-bold text-amber-300 text-sm">
                            {formatLKR(p.sellingPrice)}
                          </td>

                          {/* Warranty & Useful Life */}
                          <td className="p-4 text-[11px] text-slate-300">
                            <div className="font-medium text-slate-200">{p.warranty || p.warrantyPeriod || '2 Years'}</div>
                            <div className="text-[10px] text-slate-400">{p.expectedUsefulLife || '3-5 Years Life'}</div>
                          </td>

                          {/* Actions */}
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Quick Price/Stock adjustment */}
                              <button
                                onClick={() => handleRequestQuickAdjust(p)}
                                title="Change Price / Stock (Requires Owner Password)"
                                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-amber-300 transition-colors cursor-pointer"
                              >
                                <DollarSign className="w-3.5 h-3.5" />
                              </button>

                              {/* Edit Product */}
                              <button
                                onClick={() => handleRequestEditProduct(p)}
                                title="Edit Product (Requires Owner Password)"
                                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-cyan-300 transition-colors cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              {/* Archive Product */}
                              <button
                                onClick={() => handleRequestArchiveProduct(p.id, p.name, !!p.isArchived)}
                                title={p.isArchived ? "Restore Product" : "Archive Product"}
                                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 transition-colors cursor-pointer"
                              >
                                {p.isArchived ? <RotateCcw className="w-3.5 h-3.5 text-emerald-400" /> : <Archive className="w-3.5 h-3.5 text-slate-400" />}
                              </button>

                              {/* Delete Product */}
                              <button
                                onClick={() => handleRequestDeleteProduct(p.id, p.name)}
                                title="Delete Product (Requires Owner Password)"
                                className="p-2 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-300 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>

                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      ) : (
        /* Camera Models Catalog */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cameraModels.map((cam) => (
            <div key={cam.id} className="p-5 rounded-3xl bg-slate-900 border border-cyan-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                  {cam.brand}
                </span>
                <span className="text-xs font-mono font-bold text-amber-400">
                  {formatLKR(cam.defaultPrice || cam.suggestedPrice || 0)}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-white text-base">{cam.model || cam.name}</h3>
                <p className="text-xs text-slate-300">{cam.type || cam.cameraType || 'Surveillance Camera'}</p>
              </div>

              <div className="space-y-1 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <div className="flex justify-between">
                  <span>Resolution:</span>
                  <span className="font-semibold text-slate-200">{cam.resolution}</span>
                </div>
                <div className="flex justify-between">
                  <span>Night Vision:</span>
                  <span className="font-semibold text-cyan-400">{cam.nightVision || 'IR / ColorVu'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Audio Support:</span>
                  <span className="font-semibold text-emerald-400">
                    {cam.audio === 'Yes' || cam.audio === true ? 'Yes (Built-in Mic)' : 'Standard'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =================================================== */}
      {/* OWNER VERIFICATION POPUP (REQUIRED BEFORE ACTIONS) */}
      {/* =================================================== */}
      <OwnerVerificationModal
        isOpen={isOwnerModalOpen}
        onClose={() => {
          setIsOwnerModalOpen(false);
          setPendingAction(null);
        }}
        onSuccess={handleOwnerVerificationSuccess}
        actionTitle="OWNER VERIFICATION"
        actionMessage={verificationMessage}
      />

      {/* =================================================== */}
      {/* ADD / EDIT PRODUCT MODAL (16 SPECIFIED FIELDS)     */}
      {/* =================================================== */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0b1329] border-2 border-amber-500/50 rounded-3xl w-full max-w-4xl p-6 sm:p-8 shadow-2xl relative my-8 text-slate-100 max-h-[90vh] overflow-y-auto">
            
            {/* Close */}
            <button
              onClick={() => setIsProductModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-xl bg-slate-900 border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  OWNER VERIFIED ACCESS
                </span>
              </div>
              <h2 className="text-xl font-bold font-['Outfit',sans-serif] text-white flex items-center gap-2">
                <Package className="w-6 h-6 text-amber-400" />
                <span>{editingProduct ? 'EDIT PRODUCT' : 'ADD PRODUCT'}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Configure all catalog details, specifications, costings, warranty terms, and media resources.
              </p>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-6 text-xs">
              
              {/* Section 1: Basic Product Information */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <h3 className="font-bold text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  <span>1. Identification & Classification</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  
                  {/* Product Name */}
                  <div className="sm:col-span-2 lg:col-span-3">
                    <label className="block text-slate-300 font-bold uppercase mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Hikvision 2MP ColorVu Audio Bullet Camera"
                      className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">
                      Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ProductCategory)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="CCTV Cameras">CCTV Cameras</option>
                      <option value="Recorders (DVR/NVR)">Recorders (DVR / NVR)</option>
                      <option value="Storage & Hard Disks">Storage & Hard Disks</option>
                      <option value="Power & SMPS">Power & SMPS</option>
                      <option value="Cables & Wiring">Cables & Wiring</option>
                      <option value="Connectors & Accessories">Connectors & Accessories</option>
                      <option value="Network & Switches">Network & Switches</option>
                      <option value="Displays & Monitors">Displays & Monitors</option>
                      <option value="Racks & Enclosures">Racks & Enclosures</option>
                      <option value="Tools & Consumables">Tools & Consumables</option>
                      <option value="Smart Security & Access Points">Smart Security & Access</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Subcategory */}
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">
                      Subcategory
                    </label>
                    <input
                      type="text"
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      placeholder="e.g. ColorVu 24/7 Color, PoE Bullet, NVR 16CH"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Brand */}
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">
                      Brand *
                    </label>
                    <input
                      type="text"
                      required
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      placeholder="Hikvision, Dahua, Uniview, Seagate, WD..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Model */}
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">
                      Model
                    </label>
                    <input
                      type="text"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="DS-2CE10DF0T-FS"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Product Code */}
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">
                      Product Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="UTH-CAM-001"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-cyan-300 font-mono focus:outline-none focus:border-amber-400"
                      />
                      <button
                        type="button"
                        onClick={() => setCode(`UTH-${Date.now().toString().slice(-4)}`)}
                        className="px-2.5 py-1 rounded-xl bg-slate-800 text-[10px] text-slate-300 hover:text-white"
                        title="Auto generate code"
                      >
                        Auto
                      </button>
                    </div>
                  </div>

                  {/* Unit Type */}
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">
                      Unit
                    </label>
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value as UnitType)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                    >
                      <option value="PCS">PCS (Pieces)</option>
                      <option value="NOS">NOS (Numbers)</option>
                      <option value="MTR">MTR (Meters)</option>
                      <option value="ROLL">ROLL (100M/305M)</option>
                      <option value="BOX">BOX</option>
                      <option value="SET">SET</option>
                      <option value="JOB">JOB</option>
                    </select>
                  </div>

                </div>
              </div>

              {/* Section 2: Pricing, Stock & Supply */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <h3 className="font-bold text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>2. Pricing, Inventory & Procurement</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* Purchase Price */}
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">
                      Purchase Price (Rs.) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Selling Price */}
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">
                      Selling Price (Rs.) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={sellingPrice}
                      onChange={(e) => setSellingPrice(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-amber-500/60 rounded-xl px-3.5 py-2.5 text-xs text-amber-300 font-bold font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Stock Quantity */}
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={stockQuantity}
                      onChange={(e) => setStockQuantity(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-emerald-400 font-bold font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Low Stock Alert */}
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">
                      Low Stock Threshold
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={minStock}
                      onChange={(e) => setMinStock(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none"
                    />
                  </div>

                  {/* Supplier */}
                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 font-bold uppercase mb-1">
                      Supplier
                    </label>
                    <input
                      type="text"
                      value={supplier}
                      onChange={(e) => setSupplier(e.target.value)}
                      placeholder="e.g. Redington Sri Lanka, Metropolitan, Singer SL, Winsoft"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Warranty */}
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">
                      Warranty
                    </label>
                    <input
                      type="text"
                      value={warranty}
                      onChange={(e) => setWarranty(e.target.value)}
                      placeholder="2 Years Comprehensive Replacement"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Estimated Useful Life */}
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">
                      Estimated Useful Life
                    </label>
                    <input
                      type="text"
                      value={expectedUsefulLife}
                      onChange={(e) => setExpectedUsefulLife(e.target.value)}
                      placeholder="3-5 Years (Surveillance Grade)"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                </div>
              </div>

              {/* Section 3: Detailed Description & Technical Specifications */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <h3 className="font-bold text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>3. Description & Technical Specifications</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Description */}
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Short commercial description for quotation line items and invoices..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Specifications */}
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">
                      Specifications
                    </label>
                    <textarea
                      rows={3}
                      value={specifications}
                      onChange={(e) => setSpecifications(e.target.value)}
                      placeholder="e.g. 2MP 1080P, 24/7 Color Night Vision, Built-in Mic, IP67 Weatherproof, 2.8mm fixed lens..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                </div>
              </div>

              {/* Section 4: Media, Datasheets & Source Links */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <h3 className="font-bold text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>4. Product Media & Source Documents</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Product Image */}
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">
                      Product Image URL
                    </label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Datasheet */}
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">
                      Datasheet URL
                    </label>
                    <input
                      type="url"
                      value={datasheetUrl}
                      onChange={(e) => setDatasheetUrl(e.target.value)}
                      placeholder="https://hikvision.com/datasheet.pdf"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Source URL */}
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1">
                      Source URL
                    </label>
                    <input
                      type="url"
                      value={sourceUrl}
                      onChange={(e) => setSourceUrl(e.target.value)}
                      placeholder="https://redington.lk/product/..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                </div>
              </div>

              {/* Action Buttons: SAVE PRODUCT and CANCEL */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  id="cancel-product-btn"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  id="save-product-btn"
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all cursor-pointer text-xs flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>SAVE PRODUCT</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* =================================================== */}
      {/* QUICK PRICE & STOCK ADJUSTMENT MODAL                */}
      {/* =================================================== */}
      {isQuickAdjustModalOpen && adjustingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0b1329] border-2 border-amber-500/50 rounded-3xl w-full max-w-md p-6 shadow-2xl relative text-slate-100 space-y-4">
            
            <button
              onClick={() => setIsQuickAdjustModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                Owner Price & Stock Adjustment
              </span>
              <h3 className="text-base font-bold text-white mt-1">
                {adjustingProduct.name}
              </h3>
              <p className="text-xs text-slate-400">Model: {adjustingProduct.model || 'N/A'}</p>
            </div>

            <form onSubmit={handleSaveQuickAdjust} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold uppercase">Purchase Cost (Rs.)</label>
                <input
                  type="number"
                  min="0"
                  value={adjPurchasePrice}
                  onChange={(e) => setAdjPurchasePrice(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold uppercase">Selling Price (Rs.) *</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={adjSellingPrice}
                  onChange={(e) => setAdjSellingPrice(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-amber-500/60 rounded-xl p-2.5 text-amber-300 font-bold font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold uppercase">Current Stock Quantity</label>
                <input
                  type="number"
                  min="0"
                  value={adjStockQty}
                  onChange={(e) => setAdjStockQty(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-emerald-400 font-bold font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsQuickAdjustModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold uppercase tracking-wider"
                >
                  UPDATE
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* =================================================== */}
      {/* ADD CAMERA MODEL MODAL                              */}
      {/* =================================================== */}
      {isCameraModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0b1329] border border-cyan-500/40 rounded-3xl w-full max-w-md p-6 shadow-2xl relative text-slate-100 space-y-4">
            
            <button
              onClick={() => setIsCameraModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Camera className="w-4 h-4 text-cyan-400" />
              <span>Add Camera Model to Catalog</span>
            </h3>

            <form onSubmit={handleSaveCameraModel} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Brand</label>
                <input
                  type="text"
                  value={cameraBrand}
                  onChange={(e) => setCameraBrand(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Model Code *</label>
                <input
                  type="text"
                  required
                  value={cameraModelName}
                  onChange={(e) => setCameraModelName(e.target.value)}
                  placeholder="e.g. DS-2CE70DF0T-PFS"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Camera Type</label>
                <input
                  type="text"
                  value={cameraType}
                  onChange={(e) => setCameraType(e.target.value)}
                  placeholder="ColorVu Dome / Bullet / PTZ"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Resolution</label>
                  <input
                    type="text"
                    value={cameraResolution}
                    onChange={(e) => setCameraResolution(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Selling Rate (Rs.)</label>
                  <input
                    type="number"
                    value={cameraDefaultPrice}
                    onChange={(e) => setCameraDefaultPrice(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="cam-audio-chk"
                  checked={cameraAudio}
                  onChange={(e) => setCameraAudio(e.target.checked)}
                  className="rounded text-cyan-500"
                />
                <label htmlFor="cam-audio-chk" className="text-slate-300">
                  Built-in Audio / Microphone Support
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCameraModalOpen(false)}
                  className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-cyan-400 text-slate-950 font-bold"
                >
                  SAVE MODEL
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
