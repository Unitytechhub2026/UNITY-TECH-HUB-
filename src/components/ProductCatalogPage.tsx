import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '../types';
import { dbStore, formatLKR } from '../data/dbStore';
import { PHONE_NUMBER, PHONE_CLICKABLE, WHATSAPP_CLICKABLE } from '../data/servicesData';
import { 
  Search, 
  Filter, 
  Camera, 
  HardDrive, 
  Tv, 
  Zap, 
  Cpu, 
  Cable, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ArrowRight, 
  Scale, 
  X, 
  SlidersHorizontal,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Info,
  Check,
  AlertCircle
} from 'lucide-react';

interface ProductCatalogPageProps {
  onOpenQuoteModal: (productDetails?: string) => void;
  onOpenChat: () => void;
}

export const ProductCatalogPage: React.FC<ProductCatalogPageProps> = ({
  onOpenQuoteModal,
  onOpenChat
}) => {
  const [products] = useState<Product[]>(() => dbStore.getProducts());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedResolution, setSelectedResolution] = useState<string>('All');
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  
  // Selected product for detailed modal
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  // Products selected for comparison (Max 3)
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Extract unique brands and resolutions
  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    products.forEach(p => {
      if (p.brand) {
        // Split combined brands like "Hikvision / Dahua"
        p.brand.split('/').forEach(b => brands.add(b.trim()));
      }
    });
    return ['All', ...Array.from(brands).sort()];
  }, [products]);

  const availableResolutions = useMemo(() => {
    const res = new Set<string>();
    products.forEach(p => {
      if (p.resolution) res.add(p.resolution);
    });
    return ['All', ...Array.from(res).sort()];
  }, [products]);

  const categories = [
    { id: 'All', label: 'All Products', icon: Layers },
    { id: 'CCTV Cameras', label: 'CCTV Cameras', icon: Camera },
    { id: 'Recorders (DVR/NVR)', label: 'DVR & NVR', icon: Cpu },
    { id: 'Storage & Hard Disks', label: 'Surveillance HDDs', icon: HardDrive },
    { id: 'Power & SMPS', label: 'Power & SMPS', icon: Zap },
    { id: 'Cables & Wiring', label: 'Cables & Wiring', icon: Cable },
    { id: 'Network & Switches', label: 'PoE & Network', icon: Cpu },
    { id: 'Displays & Monitors', label: 'Monitors', icon: Tv },
    { id: 'Connectors & Accessories', label: 'Accessories', icon: Layers }
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchModel = (p.model || '').toLowerCase().includes(q);
        const matchBrand = (p.brand || '').toLowerCase().includes(q);
        const matchDesc = (p.description || '').toLowerCase().includes(q);
        const matchCategory = p.category.toLowerCase().includes(q);
        const matchRes = (p.resolution || '').toLowerCase().includes(q);
        if (!matchName && !matchModel && !matchBrand && !matchDesc && !matchCategory && !matchRes) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrand !== 'All' && !p.brand.toLowerCase().includes(selectedBrand.toLowerCase())) {
        return false;
      }

      // Resolution filter
      if (selectedResolution !== 'All' && p.resolution !== selectedResolution) {
        return false;
      }

      // Environment filter
      if (selectedEnvironment === 'Indoor' && p.indoorOutdoor === 'Outdoor') return false;
      if (selectedEnvironment === 'Outdoor' && p.indoorOutdoor === 'Indoor') return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.sellingPrice - b.sellingPrice;
      if (sortBy === 'price-desc') return b.sellingPrice - a.sellingPrice;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // featured default
    });
  }, [products, searchQuery, selectedCategory, selectedBrand, selectedResolution, selectedEnvironment, sortBy]);

  const toggleCompare = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (compareList.some(p => p.id === product.id)) {
      setCompareList(compareList.filter(p => p.id !== product.id));
    } else {
      if (compareList.length >= 3) {
        alert("You can compare up to 3 products at a time. Remove one to add another.");
        return;
      }
      setCompareList([...compareList, product]);
    }
  };

  const handleRequestQuote = (prod: Product) => {
    const details = `Product: ${prod.name} (${prod.brand} - ${prod.model || 'Standard'})\nCategory: ${prod.category}\nIndicative Rate: ${formatLKR(prod.sellingPrice)}`;
    setDetailProduct(null);
    onOpenQuoteModal(details);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-cyan-950/70 border border-cyan-500/20 p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>OFFICIAL PRODUCT & HARDWARE CATALOG</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-['Outfit',sans-serif]">
              CCTV, Security & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">IT Equipment</span> Database
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore genuine, warranty-backed surveillance cameras, 4K NVRs, WD Purple storage drives, Gigabit PoE switches, and professional installation materials verified for Sri Lankan conditions.
            </p>

            {/* Quick search input */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-cyan-400" />
                <input
                  type="text"
                  placeholder="Search CCTV camera, NVR, DVR, ColorVu, HDD, CAT6 cable, SMPS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/90 border border-cyan-500/30 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 shadow-inner"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <button
                onClick={onOpenChat}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 text-sm font-semibold transition-all cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>AI Technical Recommendation</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/50'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-cyan-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filter & Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-400">
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold text-slate-300">Filters:</span>
            </div>

            {/* Brand filter */}
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Brands</option>
              {availableBrands.filter(b => b !== 'All').map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            {/* Resolution filter */}
            <select
              value={selectedResolution}
              onChange={(e) => setSelectedResolution(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Resolutions</option>
              {availableResolutions.filter(r => r !== 'All').map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            {/* Environment filter */}
            <select
              value={selectedEnvironment}
              onChange={(e) => setSelectedEnvironment(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="All">Indoor & Outdoor</option>
              <option value="Indoor">Indoor Only</option>
              <option value="Outdoor">Outdoor Weatherproof</option>
            </select>

            {(selectedCategory !== 'All' || selectedBrand !== 'All' || selectedResolution !== 'All' || selectedEnvironment !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedBrand('All');
                  setSelectedResolution('All');
                  setSelectedEnvironment('All');
                  setSearchQuery('');
                }}
                className="text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Sort selector & Count */}
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-mono">
              Showing <strong className="text-white">{filteredProducts.length}</strong> items
            </span>

            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="featured">Sort: Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Product Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
            <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">No products found</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              We couldn't find any products matching your active filters. Try adjusting your search keywords or resetting the filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedBrand('All');
                setSelectedResolution('All');
                setSelectedEnvironment('All');
                setSearchQuery('');
              }}
              className="px-5 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold hover:bg-cyan-500"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isComparing = compareList.some(p => p.id === product.id);
              return (
                <div
                  key={product.id}
                  onClick={() => setDetailProduct(product)}
                  className="group relative rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all duration-200 shadow-md hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                  {/* Top Badges */}
                  <div className="p-4 pb-0 flex items-start justify-between gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                      {product.brand}
                    </span>

                    <button
                      onClick={(e) => toggleCompare(product, e)}
                      title={isComparing ? "Remove from comparison" : "Add to side-by-side comparison"}
                      className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                        isComparing 
                          ? 'bg-cyan-500 text-slate-950 font-bold' 
                          : 'bg-slate-800/80 text-slate-400 hover:text-cyan-300 hover:bg-slate-700'
                      }`}
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span className="text-[10px]">{isComparing ? 'Comparing' : 'Compare'}</span>
                    </button>
                  </div>

                  {/* Main Product Info */}
                  <div className="p-4 space-y-3 flex-1">
                    <div>
                      <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      {product.model && (
                        <p className="text-xs text-cyan-400/90 font-mono mt-0.5 line-clamp-1">
                          Model: {product.model}
                        </p>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Key Technical Highlights */}
                    <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
                      {product.resolution && (
                        <div className="flex items-center gap-1 text-slate-300">
                          <span className="text-cyan-400 font-semibold">Res:</span>
                          <span className="truncate">{product.resolution}</span>
                        </div>
                      )}
                      {product.warranty && (
                        <div className="flex items-center gap-1 text-emerald-400">
                          <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{product.warranty}</span>
                        </div>
                      )}
                      {product.expectedUsefulLife && (
                        <div className="col-span-2 flex items-center gap-1 text-slate-400 text-[10px]">
                          <Clock className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span>Useful Life: {product.expectedUsefulLife}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pricing and Action Footer */}
                  <div className="p-4 pt-3 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Estimated Price</span>
                      <span className="text-base font-black text-cyan-300">
                        {formatLKR(product.sellingPrice)}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRequestQuote(product);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 flex items-center gap-1 transition-all shadow-sm shadow-cyan-500/20"
                    >
                      <span>Quote</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Floating Comparison Tray */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40 bg-slate-900 border border-cyan-500/40 rounded-2xl p-4 shadow-2xl backdrop-blur-xl max-w-md w-full animate-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-bold text-white">Compare Products ({compareList.length}/3)</span>
            </div>
            <button
              onClick={() => setCompareList([])}
              className="text-xs text-slate-400 hover:text-white"
            >
              Clear All
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {compareList.map((p) => (
              <div key={p.id} className="relative flex-1 min-w-[120px] bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => toggleCompare(p)}
                  className="absolute top-1 right-1 p-0.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
                <div className="font-semibold text-white truncate pr-4">{p.name}</div>
                <div className="text-[10px] text-cyan-400 font-mono">{formatLKR(p.sellingPrice)}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="w-full mt-2 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:from-cyan-300 hover:to-blue-400 shadow-md shadow-cyan-500/20"
          >
            Launch Side-By-Side Comparison
          </button>
        </div>
      )}

      {/* Product Detail Modal */}
      {detailProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border border-cyan-500/30 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono text-xs mb-2">
                  <span>{detailProduct.category}</span>
                  <span>•</span>
                  <span>{detailProduct.brand}</span>
                </div>
                <h2 className="text-2xl font-black text-white font-['Outfit',sans-serif]">
                  {detailProduct.name}
                </h2>
                {detailProduct.model && (
                  <p className="text-sm font-mono text-cyan-400 mt-0.5">Model: {detailProduct.model}</p>
                )}
              </div>

              <button
                onClick={() => setDetailProduct(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description & Warranty */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Description</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {detailProduct.description}
                </p>
              </div>

              {/* Technical Specs Table */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Technical Specifications</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Brand:</span>
                    <span className="font-semibold text-slate-200">{detailProduct.brand}</span>
                  </div>
                  {detailProduct.resolution && (
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Resolution:</span>
                      <span className="font-semibold text-cyan-300">{detailProduct.resolution}</span>
                    </div>
                  )}
                  {detailProduct.technology && (
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Technology:</span>
                      <span className="font-semibold text-slate-200">{detailProduct.technology}</span>
                    </div>
                  )}
                  {detailProduct.lens && (
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Lens / Focal Length:</span>
                      <span className="font-semibold text-slate-200">{detailProduct.lens}</span>
                    </div>
                  )}
                  {detailProduct.nightVision && (
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Night Vision:</span>
                      <span className="font-semibold text-slate-200">{detailProduct.nightVision}</span>
                    </div>
                  )}
                  {detailProduct.ipRating && (
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Ingress Rating:</span>
                      <span className="font-semibold text-slate-200">{detailProduct.ipRating}</span>
                    </div>
                  )}
                  {detailProduct.warranty && (
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Warranty:</span>
                      <span className="font-semibold text-emerald-400">{detailProduct.warranty}</span>
                    </div>
                  )}
                  {detailProduct.expectedUsefulLife && (
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Estimated Useful Life:</span>
                      <span className="font-semibold text-cyan-300">{detailProduct.expectedUsefulLife}</span>
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 mt-1 italic">
                  * Estimated useful life is based on typical surveillance operating conditions and does not constitute a guaranteed replacement date.
                </p>
              </div>

              {/* Price and Call-To-Action */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 to-cyan-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400">Estimated Unit Price (Sri Lanka)</span>
                  <div className="text-2xl font-black text-cyan-300">
                    {formatLKR(detailProduct.sellingPrice)}
                  </div>
                  <span className="text-[10px] text-slate-400">Includes official hardware warranty</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => handleRequestQuote(detailProduct)}
                    className="flex-1 sm:flex-none px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 shadow-lg shadow-cyan-500/25 transition-all"
                  >
                    REQUEST OFFICIAL QUOTATION
                  </button>

                  <a
                    href={`${WHATSAPP_CLICKABLE}&text=${encodeURIComponent(`Hi Unity Tech Hub, I am interested in getting a quotation for: ${detailProduct.name} (${detailProduct.model || ''})`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                    title="Inquire on WhatsApp"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Side-By-Side Comparison Modal */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-5xl rounded-3xl bg-slate-900 border border-cyan-500/40 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/40">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">Side-by-Side Product Comparison</h2>
                  <p className="text-xs text-slate-400">Comparing {compareList.length} selected hardware specifications</p>
                </div>
              </div>

              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comparison Matrix Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="p-3 font-bold text-slate-400 w-1/4">Specification</th>
                    {compareList.map((p) => (
                      <th key={p.id} className="p-3 font-bold text-white w-1/4">
                        <div className="space-y-1">
                          <span className="text-cyan-400 font-mono text-[10px]">{p.brand}</span>
                          <div className="text-sm font-black">{p.name}</div>
                          <div className="text-cyan-300 font-mono">{formatLKR(p.sellingPrice)}</div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr>
                    <td className="p-3 font-semibold text-slate-400">Category</td>
                    {compareList.map(p => <td key={p.id} className="p-3 text-slate-200">{p.category}</td>)}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-400">Model Code</td>
                    {compareList.map(p => <td key={p.id} className="p-3 font-mono text-cyan-400">{p.model || 'Standard'}</td>)}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-400">Resolution</td>
                    {compareList.map(p => <td key={p.id} className="p-3 text-slate-200">{p.resolution || 'N/A'}</td>)}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-400">Night Vision & Optics</td>
                    {compareList.map(p => <td key={p.id} className="p-3 text-slate-200">{p.nightVision || (p.fullColor ? '24/7 Full Color ColorVu' : 'Standard')}</td>)}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-400">Audio Support</td>
                    {compareList.map(p => <td key={p.id} className="p-3 text-slate-200">{p.audio || (p.microphone ? 'Built-in Mic' : 'No')}</td>)}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-400">Environment Rating</td>
                    {compareList.map(p => <td key={p.id} className="p-3 text-slate-200">{p.ipRating || p.indoorOutdoor || 'Indoor/Outdoor'}</td>)}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-400">Hardware Warranty</td>
                    {compareList.map(p => <td key={p.id} className="p-3 text-emerald-400 font-semibold">{p.warranty || '1 Year'}</td>)}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-400">Estimated Useful Life</td>
                    {compareList.map(p => <td key={p.id} className="p-3 text-cyan-300 font-medium">{p.expectedUsefulLife || '3-5 Years (Estimated)'}</td>)}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-400">Action</td>
                    {compareList.map(p => (
                      <td key={p.id} className="p-3">
                        <button
                          onClick={() => {
                            setIsCompareModalOpen(false);
                            handleRequestQuote(p);
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950"
                        >
                          Request Quote
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
