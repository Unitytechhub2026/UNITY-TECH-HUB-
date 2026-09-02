import React, { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  DollarSign, 
  PackagePlus, 
  Share2, 
  ShoppingBag, 
  Building2, 
  ShieldCheck, 
  Tag, 
  Layers, 
  Sparkles,
  ArrowRight,
  Filter,
  Sliders,
  Clock,
  Plus
} from 'lucide-react';
import { MarketPriceResult, Product } from '../../types';
import { dbStore, formatLKR } from '../../data/dbStore';
import { OwnerVerificationModal } from '../common/OwnerVerificationModal';
import { OWNER_VERIFICATION_MESSAGES } from '../../services/ownerSecurity';

interface PriceSearchHubProps {
  onAddToQuotation?: (item: { description: string; model: string; rate: number; warranty: string }) => void;
  onNavigateToQuotation?: () => void;
}

export const PriceSearchHub: React.FC<PriceSearchHubProps> = ({
  onAddToQuotation,
  onNavigateToQuotation
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<MarketPriceResult[]>([]);
  const [lastChecked, setLastChecked] = useState<string | null>(null);
  const [isCached, setIsCached] = useState<boolean>(false);
  const [selectedResult, setSelectedResult] = useState<MarketPriceResult | null>(null);

  // Markup Calculator State
  const [markupPercent, setMarkupPercent] = useState<number>(25);
  const [manualCostPrice, setManualCostPrice] = useState<number | ''>('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Owner Verification for adding to inventory
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [pendingResultForInventory, setPendingResultForInventory] = useState<MarketPriceResult | null>(null);

  const quickSearches = [
    { label: "Hikvision 2MP ColorVu Bullet", q: "Hikvision 2MP ColorVu bullet camera price Sri Lanka" },
    { label: "Hikvision 5MP ColorVu 3K", q: "Hikvision 5MP ColorVu audio bullet camera price Sri Lanka" },
    { label: "4-Channel AcuSense DVR", q: "Hikvision 4 channel AcuSense DVR price Sri Lanka" },
    { label: "8-Channel AcuSense DVR", q: "Hikvision 8 channel DVR price Sri Lanka" },
    { label: "16-Channel 4K NVR", q: "Hikvision 16 channel NVR PoE price Sri Lanka" },
    { label: "1TB Surveillance HDD", q: "Seagate SkyHawk 1TB surveillance hard disk price Sri Lanka" },
    { label: "2TB WD Purple HDD", q: "WD Purple 2TB surveillance hard disk price Sri Lanka" },
    { label: "4TB WD Purple HDD", q: "WD Purple 4TB surveillance hard disk price Sri Lanka" },
    { label: "Cat6 Solid Copper Cable (305m)", q: "Cat6 network cable 305m roll price Sri Lanka" },
    { label: "12V 10A Central Power Box", q: "12V 10A CCTV central power supply box price Sri Lanka" },
    { label: "8-Port PoE Switch", q: "Hikvision 8 port PoE switch price Sri Lanka" },
  ];

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);
    setSelectedResult(null);

    try {
      const res = await fetch('/api/market-price-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery })
      });

      if (!res.ok) {
        throw new Error('Failed to fetch market pricing');
      }

      const data = await res.json();
      setResults(data.results || []);
      setLastChecked(data.lastChecked || new Date().toISOString());
      setIsCached(data.cached || false);

      if (data.results && data.results.length > 0) {
        setSelectedResult(data.results[0]);
        setManualCostPrice(data.results[0].priceLKR);
      } else {
        setError(data.message || 'No market price found. Please enter selling price manually.');
      }
    } catch (err: any) {
      console.error(err);
      setError('Unable to perform search. Please check your connection or enter the price manually.');
    } finally {
      setLoading(false);
    }
  };

  const currentCost = typeof manualCostPrice === 'number' ? manualCostPrice : (selectedResult?.priceLKR || 0);
  const calculatedSellingPrice = Math.round(currentCost * (1 + markupPercent / 100));
  const calculatedProfit = Math.max(0, calculatedSellingPrice - currentCost);

  const handleRequestSaveToInventory = (result: MarketPriceResult) => {
    setPendingResultForInventory(result);
    setIsOwnerModalOpen(true);
  };

  const executeSaveToInventory = (result: MarketPriceResult) => {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      code: `UTH-AUTO-${Date.now().toString().slice(-4)}`,
      name: result.productName,
      category: 'CCTV Cameras',
      brand: result.brand,
      model: result.model,
      description: result.specifications,
      unit: 'PCS',
      purchasePrice: result.priceLKR,
      sellingPrice: calculatedSellingPrice || result.suggestedSellingPrice || Math.round(result.priceLKR * 1.25),
      stockQuantity: 10,
      minStock: 2,
      warranty: '2 Years Warranty',
      warrantyPeriod: '2 Years',
      supplier: result.seller,
      createdAt: new Date().toISOString()
    };

    dbStore.saveProduct(newProduct);

    // Also log price history
    dbStore.addPriceHistoryRecord({
      productId: newProduct.id,
      productName: result.productName,
      model: result.model,
      brand: result.brand,
      date: new Date().toISOString().split('T')[0],
      marketPrice: result.priceLKR,
      purchasePrice: result.priceLKR,
      sellingPrice: newProduct.sellingPrice,
      sellerSource: result.seller,
      recordedBy: 'Admin Staff'
    });

    setSuccessToast(`"${result.productName}" added to Unity Tech Hub product inventory!`);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const handleWhatsAppSupplierInquiry = (result: MarketPriceResult) => {
    const text = encodeURIComponent(
      `Hello, I am contacting you from *UNITY TECH HUB* regarding CCTV hardware availability:\n\n` +
      `📦 *Product:* ${result.productName}\n` +
      `🏷️ *Model:* ${result.model}\n` +
      `💰 *Listed Rate:* ${formatLKR(result.priceLKR)}\n\n` +
      `Please confirm current stock availability and wholesale dealer rate for Unity Tech Hub.`
    );
    window.open(`https://wa.me/94727402288?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-20 right-8 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span className="font-semibold text-sm">{successToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950/70 to-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Real-Time Market Intelligence
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              CCTV Market Price Search & Comparison Hub
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Query current wholesale distributor rates and verified Sri Lankan market retail prices across Redington, Metropolitan, Singer, TechZone, CameraLK, and Barclays.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Default Currency</div>
              <div className="text-sm font-bold text-cyan-400">Sri Lankan Rupee (LKR)</div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query);
            }}
            className="flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search CCTV model (e.g., Hikvision 5MP ColorVu, 2TB WD Purple, 4CH AcuSense DVR, 305m Cat6)..."
                className="w-full pl-12 pr-4 py-3.5 bg-slate-950/90 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-sm"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Searching Market...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Search Market Prices
                </>
              )}
            </button>
          </form>

          {/* Quick Filter Tags */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1">Quick Search:</span>
            {quickSearches.slice(0, 6).map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(item.q);
                  handleSearch(item.q);
                }}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-cyan-950 hover:text-cyan-300 hover:border-cyan-500/40 text-slate-300 border border-slate-700/60 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Search Results & Price Cards */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Tag className="w-4 h-4 text-cyan-400" />
              Market Price Results & Distributor Comparison
            </h2>

            {lastChecked && (
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Last Verified: {new Date(lastChecked).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                {isCached && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800">Cached 24h</span>
                )}
              </div>
            )}
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-amber-300">Price Information Notice</div>
                <div className="mt-1">{error}</div>
                <div className="mt-2 text-xs text-amber-300/80">
                  Tip: Use the markup calculator on the right to manually input your wholesale cost and calculate your quotation price.
                </div>
              </div>
            </div>
          )}

          {results.length === 0 && !loading && !error && (
            <div className="p-12 text-center bg-slate-900/40 border border-slate-800/80 rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4 text-cyan-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Search Sri Lanka CCTV Market Prices</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto mt-2">
                Type any camera model, DVR, hard disk, or networking cable above to fetch verified distributor and retail benchmark rates in LKR.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {quickSearches.slice(6).map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuery(item.q);
                      handleSearch(item.q);
                    }}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Grid */}
          <div className="grid grid-cols-1 gap-4">
            {results.map((res) => {
              const isSelected = selectedResult?.id === res.id;

              return (
                <div
                  key={res.id}
                  onClick={() => {
                    setSelectedResult(res);
                    setManualCostPrice(res.priceLKR);
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900/90 border-cyan-500 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-500/50'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                          {res.brand}
                        </span>
                        <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                          {res.model}
                        </span>
                        {res.verified && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">
                            <CheckCircle2 className="w-3 h-3" /> Verified SL Distributor
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                          {res.availability}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white leading-snug">
                        {res.productName}
                      </h3>

                      <p className="text-xs text-slate-400 leading-relaxed">
                        {res.specifications}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                        <span className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-500" />
                          <strong className="text-slate-300">{res.seller}</strong>
                        </span>
                        <span>•</span>
                        <span className="text-slate-400 font-mono">{res.sourceWebsite}</span>
                      </div>
                    </div>

                    {/* Price Block */}
                    <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6 flex flex-col justify-between shrink-0">
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                          Market Price
                        </div>
                        <div className="text-2xl font-black text-cyan-300 mt-0.5">
                          {formatLKR(res.priceLKR)}
                        </div>
                        <div className="text-[11px] text-emerald-400 font-medium mt-0.5">
                          Rec. Sale: {formatLKR(res.suggestedSellingPrice || Math.round(res.priceLKR * 1.25))}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRequestSaveToInventory(res);
                          }}
                          title="Requires Owner Verification"
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                        >
                          <PackagePlus className="w-3.5 h-3.5 text-cyan-400" />
                          Add to Inventory
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Column: Profit Margin Calculator & Quotation Insert */}
        <div className="space-y-6">
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 sticky top-20 shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider mb-1">
                <DollarSign className="w-4 h-4" />
                Profit & Markup Calculator
              </div>
              <h3 className="text-lg font-black text-white">Quotation Rate Estimator</h3>
              <p className="text-xs text-slate-400 mt-1">
                Calculate Unity Tech Hub selling price, profit margin, and instant quotation insertion.
              </p>
            </div>

            {/* Selected Product Summary */}
            {selectedResult ? (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  Selected Item
                </div>
                <div className="text-xs font-bold text-white line-clamp-2">
                  {selectedResult.productName}
                </div>
                <div className="text-[11px] text-slate-400">
                  Model: <span className="text-slate-200 font-mono">{selectedResult.model}</span>
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-dashed border-slate-800 text-center text-xs text-slate-400">
                Select a product from the left or enter cost below manually.
              </div>
            )}

            {/* Cost Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Wholesale / Cost Price (LKR)</span>
                {selectedResult && (
                  <span className="text-[10px] text-cyan-400 cursor-pointer" onClick={() => setManualCostPrice(selectedResult.priceLKR)}>
                    Reset to Market Rate
                  </span>
                )}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  Rs.
                </span>
                <input
                  type="number"
                  value={manualCostPrice}
                  onChange={(e) => setManualCostPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Enter cost in LKR"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-bold text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Markup Slider / Presets */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300">Target Profit Margin Markup</span>
                <span className="text-cyan-400 font-black text-sm">{markupPercent}%</span>
              </div>

              <input
                type="range"
                min="5"
                max="80"
                step="5"
                value={markupPercent}
                onChange={(e) => setMarkupPercent(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />

              <div className="grid grid-cols-4 gap-1.5">
                {[15, 20, 25, 35].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setMarkupPercent(pct)}
                    className={`py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      markupPercent === pct
                        ? 'bg-cyan-500 text-slate-950 font-black'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    +{pct}%
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated Breakdown Card */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-slate-950 to-blue-950/40 border border-cyan-500/30 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Wholesale Cost:</span>
                <span className="font-mono text-slate-300 font-bold">{formatLKR(currentCost)}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Estimated Profit (per unit):</span>
                <span className="font-mono text-emerald-400 font-bold">+{formatLKR(calculatedProfit)}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Suggested Selling Price</div>
                  <div className="text-xl font-black text-white">{formatLKR(calculatedSellingPrice)}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              {onAddToQuotation && selectedResult && (
                <button
                  type="button"
                  onClick={() => {
                    onAddToQuotation({
                      description: selectedResult.productName,
                      model: selectedResult.model,
                      rate: calculatedSellingPrice,
                      warranty: '2 Years Comprehensive Warranty'
                    });
                    setSuccessToast(`Added ${selectedResult.model} to active quotation!`);
                    setTimeout(() => setSuccessToast(null), 3500);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider"
                >
                  <Plus className="w-4 h-4" />
                  Insert into Active Quotation
                </button>
              )}

              {selectedResult && (
                <button
                  type="button"
                  onClick={() => handleWhatsAppSupplierInquiry(selectedResult)}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold rounded-xl border border-emerald-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  WhatsApp Supplier for Stock & Rate
                </button>
              )}

              {onNavigateToQuotation && (
                <button
                  type="button"
                  onClick={onNavigateToQuotation}
                  className="w-full py-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  Go to Quotations Manager
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* Owner Verification Modal */}
      <OwnerVerificationModal
        isOpen={isOwnerModalOpen}
        onClose={() => {
          setIsOwnerModalOpen(false);
          setPendingResultForInventory(null);
        }}
        onSuccess={() => {
          if (pendingResultForInventory) {
            executeSaveToInventory(pendingResultForInventory);
            setPendingResultForInventory(null);
          }
        }}
        actionTitle="OWNER VERIFICATION"
        actionMessage={OWNER_VERIFICATION_MESSAGES.ADD_PRODUCT}
      />

    </div>
  );
};
