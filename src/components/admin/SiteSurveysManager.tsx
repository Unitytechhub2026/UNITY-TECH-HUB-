import React, { useState } from 'react';
import { 
  ClipboardList, 
  Plus, 
  Search, 
  MapPin, 
  Camera, 
  HardDrive, 
  Cpu, 
  Zap, 
  FileText, 
  User, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  Trash2, 
  Edit3, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  Eye, 
  Printer, 
  Share2, 
  AlertCircle,
  HelpCircle,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import { SiteSurvey, CameraLocation, CameraType, CableType, Customer, Quotation } from '../../types';
import { dbStore, formatLKR } from '../../data/dbStore';

interface SiteSurveysManagerProps {
  onSurveyConvertedToQuotation?: (quotation: Quotation) => void;
}

export const SiteSurveysManager: React.FC<SiteSurveysManagerProps> = ({
  onSurveyConvertedToQuotation
}) => {
  const [surveys, setSurveys] = useState<SiteSurvey[]>(dbStore.getSiteSurveys());
  const [customers] = useState<Customer[]>(dbStore.getCustomers());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Draft' | 'Completed' | 'Quoted'>('ALL');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSurveyId, setEditingSurveyId] = useState<string | null>(null);
  const [viewingSurvey, setViewingSurvey] = useState<SiteSurvey | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form State
  const [activeStep, setActiveStep] = useState<number>(1);
  const [surveyNumber, setSurveyNumber] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [propertyType, setPropertyType] = useState('Residential Home');
  const [technicianName, setTechnicianName] = useState('Niroshan Bandara');
  const [systemType, setSystemType] = useState<'HD CCTV' | 'IP CCTV' | 'WiFi Wireless' | 'Hybrid'>('HD CCTV');
  
  // Camera Points
  const [cameraLocations, setCameraLocations] = useState<CameraLocation[]>([
    {
      id: 'cl-1',
      cameraNo: 1,
      locationName: 'Main Entrance & Gate',
      cameraType: 'ColorVu Camera',
      model: 'Hikvision 2MP/5MP ColorVu Bullet',
      resolution: '5MP (Ultra HD)',
      distanceMeters: 30,
      cableType: 'RG59 Coaxial Cable + Power',
      mountingType: 'Wall Mount',
      casingConduit: '20mm PVC Conduit',
      indoorOutdoor: 'Outdoor Weatherproof (IP67)',
      audioRequired: true,
      notes: 'Faces front main gate and driveway'
    }
  ]);

  // Central Hub & Infrastructure
  const [dvrNvrLocation, setDvrNvrLocation] = useState('Living Room TV Unit / Rack');
  const [monitorLocation, setMonitorLocation] = useState('Living Room TV (HDMI)');
  const [monitorSize, setMonitorSize] = useState('None / Client Monitor');
  const [powerPointsAvailable, setPowerPointsAvailable] = useState(true);
  const [storageDaysRequired, setStorageDaysRequired] = useState(30);
  const [recordingMode, setRecordingMode] = useState('AI Smart Event / AcuSense');
  const [extraSparePercent, setExtraSparePercent] = useState(10);
  const [internetAvailable, setInternetAvailable] = useState(true);
  const [ispType, setIspType] = useState('SLT Fiber');
  const [wifiStrength, setWifiStrength] = useState('Strong');
  const [remoteViewingDevices, setRemoteViewingDevices] = useState(2);
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [status, setStatus] = useState<'Draft' | 'Completed' | 'Quoted'>('Completed');

  // Computed Smart Estimations
  const cameraCount = cameraLocations.length;
  const rawCableMeters = cameraLocations.reduce((sum, cam) => sum + (cam.distanceMeters || 0), 0);
  const finalCableMeters = Math.ceil(rawCableMeters * (1 + extraSparePercent / 100));
  
  // Suggested Power Supply
  const suggestedPowerSupply = systemType === 'IP CCTV' 
    ? (cameraCount > 8 ? '16-Port PoE Switch' : (cameraCount > 4 ? '8-Port PoE Switch' : '4-Port PoE Switch'))
    : (cameraCount > 8 ? '12V 20A Central SMPS' : (cameraCount > 4 ? '12V 10A Central SMPS' : '12V 5A Central SMPS'));

  // Suggested HDD capacity
  const suggestedHddCapacity = storageDaysRequired > 30 || cameraCount > 8 
    ? '4TB Surveillance HDD' 
    : (storageDaysRequired > 15 || cameraCount > 4 ? '2TB Surveillance HDD' : '1TB Surveillance HDD');

  // Suggested DVR/NVR
  const suggestedRecorder = cameraCount > 8 
    ? `16-Channel ${systemType === 'IP CCTV' ? '4K NVR' : 'AcuSense DVR'}` 
    : (cameraCount > 4 ? `8-Channel ${systemType === 'IP CCTV' ? 'PoE NVR' : 'AcuSense DVR'}` : `4-Channel ${systemType === 'IP CCTV' ? 'PoE NVR' : 'AcuSense DVR'}`);

  const handleOpenCreateModal = () => {
    setEditingSurveyId(null);
    setSurveyNumber(dbStore.generateNextSurveyNumber());
    setDate(new Date().toISOString().split('T')[0]);
    setSelectedCustomerId('');
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setSiteAddress('');
    setPropertyType('Residential Home');
    setTechnicianName('Niroshan Bandara');
    setSystemType('HD CCTV');
    setCameraLocations([
      {
        id: `cl-${Date.now()}-1`,
        cameraNo: 1,
        locationName: 'Front Entrance & Driveway',
        cameraType: 'ColorVu Camera',
        model: 'Hikvision 2MP/5MP ColorVu Bullet',
        resolution: '5MP (Ultra HD)',
        distanceMeters: 30,
        cableType: 'RG59 Coaxial Cable + Power',
        mountingType: 'Wall Mount',
        casingConduit: '20mm PVC Conduit',
        indoorOutdoor: 'Outdoor Weatherproof (IP67)',
        audioRequired: true,
        notes: ''
      },
      {
        id: `cl-${Date.now()}-2`,
        cameraNo: 2,
        locationName: 'Backyard & Kitchen Exit',
        cameraType: 'ColorVu Camera',
        model: 'Hikvision 2MP ColorVu Bullet',
        resolution: '2MP (1080P)',
        distanceMeters: 25,
        cableType: 'RG59 Coaxial Cable + Power',
        mountingType: 'Wall Mount',
        casingConduit: '20mm PVC Conduit',
        indoorOutdoor: 'Outdoor Weatherproof (IP67)',
        audioRequired: false,
        notes: ''
      }
    ]);
    setDvrNvrLocation('Living Room TV Unit / Rack');
    setMonitorLocation('Living Room TV (HDMI)');
    setMonitorSize('None / Client Monitor');
    setPowerPointsAvailable(true);
    setStorageDaysRequired(30);
    setRecordingMode('AI Smart Event / AcuSense');
    setExtraSparePercent(10);
    setInternetAvailable(true);
    setIspType('SLT Fiber');
    setWifiStrength('Strong');
    setRemoteViewingDevices(3);
    setSpecialRequirements('');
    setStatus('Completed');
    setActiveStep(1);
    setIsModalOpen(true);
  };

  const handleCustomerSelect = (custId: string) => {
    setSelectedCustomerId(custId);
    const c = customers.find(item => item.id === custId);
    if (c) {
      setCustomerName(c.name);
      setCustomerPhone(c.phone);
      setCustomerEmail(c.email || '');
      setSiteAddress(c.address);
    }
  };

  const handleAddCameraLocation = () => {
    const nextNo = cameraLocations.length + 1;
    setCameraLocations([
      ...cameraLocations,
      {
        id: `cl-${Date.now()}-${nextNo}`,
        cameraNo: nextNo,
        locationName: `Camera Point #${nextNo}`,
        cameraType: 'ColorVu Camera',
        model: 'Hikvision 2MP ColorVu',
        resolution: '2MP (1080P)',
        distanceMeters: 25,
        cableType: systemType === 'IP CCTV' ? 'Pure Solid Copper CAT6 Cable' : 'RG59 Coaxial Cable + Power',
        mountingType: 'Wall Mount',
        casingConduit: 'PVC Casing (1x1/2)',
        indoorOutdoor: 'Outdoor Weatherproof (IP67)',
        audioRequired: false,
        notes: ''
      }
    ]);
  };

  const handleRemoveCameraLocation = (id: string) => {
    if (cameraLocations.length <= 1) return;
    const filtered = cameraLocations.filter(c => c.id !== id);
    // re-index
    const reindexed = filtered.map((c, idx) => ({ ...c, cameraNo: idx + 1 }));
    setCameraLocations(reindexed);
  };

  const handleUpdateCameraLocation = (id: string, updates: Partial<CameraLocation>) => {
    setCameraLocations(cameraLocations.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const handleSaveSurvey = () => {
    if (!customerName || !customerPhone || !siteAddress) {
      alert('Please fill in Customer Name, Phone, and Site Address');
      return;
    }

    const newSurvey: SiteSurvey = {
      id: editingSurveyId || `surv-${Date.now()}`,
      surveyNumber: surveyNumber || dbStore.generateNextSurveyNumber(),
      date,
      customerId: selectedCustomerId || `cust-${Date.now()}`,
      customerName,
      customerPhone,
      customerEmail,
      siteAddress,
      propertyType,
      technicianName,
      systemType,
      cameraCount: cameraLocations.length,
      cameraLocations,
      dvrNvrLocation,
      monitorLocation,
      monitorSize,
      powerPointsAvailable,
      suggestedPowerSupply,
      storageDaysRequired,
      recordingMode,
      suggestedHddCapacity,
      internetAvailable,
      ispType,
      wifiStrength,
      remoteViewingDevices,
      totalCalculatedCableMeters: rawCableMeters,
      extraSparePercent,
      totalFinalCableMeters: finalCableMeters,
      totalCasingMeters: Math.round(finalCableMeters * 0.4),
      totalConduitMeters: Math.round(finalCableMeters * 0.6),
      specialRequirements,
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    dbStore.saveSiteSurvey(newSurvey);
    setSurveys(dbStore.getSiteSurveys());
    setIsModalOpen(false);
    setSuccessMessage(`Site Survey ${newSurvey.surveyNumber} saved successfully!`);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  const handleConvertToQuotation = (survey: SiteSurvey) => {
    try {
      const quotation = dbStore.generateQuotationFromSurvey(survey.id);
      setSurveys(dbStore.getSiteSurveys());
      setSuccessMessage(`Successfully converted Survey ${survey.surveyNumber} to Quotation ${quotation.quotationNumber}!`);
      setTimeout(() => setSuccessMessage(null), 3500);

      if (onSurveyConvertedToQuotation) {
        onSurveyConvertedToQuotation(quotation);
      }
    } catch (err: any) {
      alert(`Error converting survey: ${err.message}`);
    }
  };

  const handleDeleteSurvey = (id: string) => {
    if (window.confirm('Are you sure you want to delete this Site Survey?')) {
      dbStore.deleteSiteSurvey(id);
      setSurveys(dbStore.getSiteSurveys());
    }
  };

  const filteredSurveys = surveys.filter(s => {
    const matchesSearch = 
      s.surveyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.siteAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.technicianName.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'ALL') return matchesSearch;
    return matchesSearch && s.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {successMessage && (
        <div className="fixed top-20 right-8 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span className="font-semibold text-sm">{successMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950/70 to-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <ClipboardList className="w-3.5 h-3.5" />
              Technical Site Auditing & Estimation
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              CCTV Site Survey & Smart Material Estimator
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Log on-site client inspections, camera distance points, cabling paths, and convert technical surveys into accurate A4 quotations with 1 click.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            New Site Survey
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Survey #, Customer, Address..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {(['ALL', 'Draft', 'Completed', 'Quoted'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-cyan-500 text-slate-950 font-black'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {st === 'ALL' ? 'All Surveys' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Surveys List Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filteredSurveys.map((survey) => (
          <div
            key={survey.id}
            className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-2.5 py-0.5 rounded">
                  {survey.surveyNumber}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {survey.date}
                </span>
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  survey.status === 'Quoted'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : survey.status === 'Completed'
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                }`}>
                  {survey.status}
                </span>
                <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  {survey.propertyType}
                </span>
              </div>

              <div>
                <h3 className="text-base font-black text-white">
                  {survey.customerName}
                </h3>
                <div className="flex items-center gap-4 text-xs text-slate-400 mt-0.5 flex-wrap">
                  <span className="flex items-center gap-1 text-slate-300">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    {survey.customerPhone}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {survey.siteAddress}
                  </span>
                  <span>•</span>
                  <span>Tech: <strong className="text-slate-300">{survey.technicianName}</strong></span>
                </div>
              </div>

              {/* Technical Badges */}
              <div className="pt-2 flex items-center gap-3 text-xs flex-wrap">
                <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
                  <Camera className="w-3.5 h-3.5 text-cyan-400" />
                  <span><strong>{survey.cameraCount}</strong> Cameras ({survey.systemType})</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  <span><strong>{survey.totalFinalCableMeters}m</strong> Cable (+{survey.extraSparePercent}% spare)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
                  <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                  <span><strong>{survey.suggestedHddCapacity}</strong> ({survey.storageDaysRequired} Days)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>{survey.suggestedPowerSupply}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-2 border-t lg:border-t-0 border-slate-800 pt-3 lg:pt-0">
              <button
                type="button"
                onClick={() => handleConvertToQuotation(survey)}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {survey.status === 'Quoted' ? 'Re-Generate Quotation' : 'Convert to Quotation'}
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setViewingSurvey(survey)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  title="View Survey Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteSurvey(survey.id)}
                  className="p-2 bg-slate-800 hover:bg-rose-950/40 text-rose-400 rounded-lg text-xs font-semibold cursor-pointer"
                  title="Delete Survey"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredSurveys.length === 0 && (
          <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl">
            <ClipboardList className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No Site Surveys Found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Create a technical site survey before creating a quotation to calculate exact camera distances, cabling, and power equipment.
            </p>
            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="mt-4 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer"
            >
              Start New Survey
            </button>
          </div>
        )}
      </div>

      {/* View Survey Modal */}
      {viewingSurvey && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded">
                  {viewingSurvey.surveyNumber}
                </span>
                <h2 className="text-xl font-black text-white mt-1">
                  Site Audit: {viewingSurvey.customerName}
                </h2>
                <div className="text-xs text-slate-400">{viewingSurvey.siteAddress}</div>
              </div>
              <button
                type="button"
                onClick={() => setViewingSurvey(null)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Cameras</div>
                <div className="text-lg font-black text-white">{viewingSurvey.cameraCount} Points</div>
                <div className="text-[11px] text-cyan-400">{viewingSurvey.systemType}</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Total Cable</div>
                <div className="text-lg font-black text-white">{viewingSurvey.totalFinalCableMeters}m</div>
                <div className="text-[11px] text-slate-400">(+{viewingSurvey.extraSparePercent}% spare)</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Hard Disk</div>
                <div className="text-sm font-black text-white">{viewingSurvey.suggestedHddCapacity}</div>
                <div className="text-[11px] text-emerald-400">{viewingSurvey.storageDaysRequired} Days</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Power Supply</div>
                <div className="text-xs font-black text-white line-clamp-2">{viewingSurvey.suggestedPowerSupply}</div>
              </div>
            </div>

            {/* Camera Points Detail Table */}
            <div>
              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Camera className="w-4 h-4 text-cyan-400" />
                Audited Camera Installation Points ({viewingSurvey.cameraLocations.length})
              </h3>
              <div className="overflow-x-auto border border-slate-800 rounded-xl">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="p-2.5">#</th>
                      <th className="p-2.5">Location</th>
                      <th className="p-2.5">Type / Resolution</th>
                      <th className="p-2.5">Distance</th>
                      <th className="p-2.5">Casing/Conduit</th>
                      <th className="p-2.5">Audio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                    {viewingSurvey.cameraLocations.map((cam) => (
                      <tr key={cam.id}>
                        <td className="p-2.5 font-bold text-cyan-400 font-mono">{cam.cameraNo}</td>
                        <td className="p-2.5 font-medium text-white">{cam.locationName}</td>
                        <td className="p-2.5">
                          <div>{cam.cameraType}</div>
                          <div className="text-[10px] text-slate-400">{cam.resolution} • {cam.indoorOutdoor}</div>
                        </td>
                        <td className="p-2.5 font-mono font-bold text-cyan-300">{cam.distanceMeters}m</td>
                        <td className="p-2.5 text-slate-400">{cam.casingConduit}</td>
                        <td className="p-2.5">
                          {cam.audioRequired ? (
                            <span className="text-emerald-400 font-bold">Yes (Mic)</span>
                          ) : (
                            <span className="text-slate-500">No</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Network & Hub Info */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
              <div className="font-bold text-slate-200">Central Hub & Network Infrastructure:</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-400">
                <div>DVR/NVR Position: <strong className="text-white">{viewingSurvey.dvrNvrLocation}</strong></div>
                <div>Monitor: <strong className="text-white">{viewingSurvey.monitorLocation}</strong></div>
                <div>Internet: <strong className="text-white">{viewingSurvey.ispType} ({viewingSurvey.wifiStrength})</strong></div>
                <div>Live View Devices: <strong className="text-white">{viewingSurvey.remoteViewingDevices} Smartphones</strong></div>
                <div>Recording Mode: <strong className="text-white">{viewingSurvey.recordingMode}</strong></div>
                <div>Technician: <strong className="text-white">{viewingSurvey.technicianName}</strong></div>
              </div>
              {viewingSurvey.specialRequirements && (
                <div className="pt-2 border-t border-slate-800 text-slate-300">
                  <strong>Notes:</strong> {viewingSurvey.specialRequirements}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setViewingSurvey(null);
                  handleConvertToQuotation(viewingSurvey);
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs rounded-xl shadow-lg cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Generate Quotation Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Wizard Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded">
                    {surveyNumber}
                  </span>
                  <span className="text-xs text-slate-400">Step {activeStep} of 3</span>
                </div>
                <h2 className="text-xl font-black text-white mt-1">
                  New CCTV Site Survey & Estimation
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step Tabs */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { step: 1, label: "1. Customer & Site Info" },
                { step: 2, label: "2. Camera Locations & Distances" },
                { step: 3, label: "3. Central Hub & Auto-Estimate" }
              ].map((tab) => (
                <button
                  key={tab.step}
                  type="button"
                  onClick={() => setActiveStep(tab.step)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                    activeStep === tab.step
                      ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Step 1: Customer & Site Details */}
            {activeStep === 1 && (
              <div className="space-y-4">
                <div className="p-3 bg-cyan-950/40 border border-cyan-800/40 rounded-xl text-xs text-cyan-200">
                  Select an existing customer or enter new site details below.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Quick Customer Select
                    </label>
                    <select
                      value={selectedCustomerId}
                      onChange={(e) => handleCustomerSelect(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    >
                      <option value="">-- Choose Existing Customer or Enter Below --</option>
                      {customers.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.phone}) - {c.address}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Technician Assigned
                    </label>
                    <input
                      type="text"
                      value={technicianName}
                      onChange={(e) => setTechnicianName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Customer / Client Name *</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Mr. Samantha Perera"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Customer Phone / WhatsApp *</label>
                    <input
                      type="text"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. 077 345 6789"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Customer Email</label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="client@example.com"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-300 block mb-1">Site Physical Address *</label>
                    <input
                      type="text"
                      value={siteAddress}
                      onChange={(e) => setSiteAddress(e.target.value)}
                      placeholder="e.g. No. 142/B, Flower Road, Colombo 07"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Property Type</label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    >
                      <option value="Residential Home">Residential Home / Villa</option>
                      <option value="Commercial Office">Commercial Office</option>
                      <option value="Retail Shop / Showroom">Retail Shop / Showroom</option>
                      <option value="Factory / Warehouse">Factory / Warehouse</option>
                      <option value="Hotel / Restaurant">Hotel / Restaurant</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">System Architecture</label>
                    <select
                      value={systemType}
                      onChange={(e) => setSystemType(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    >
                      <option value="HD CCTV">HD CCTV (Coaxial RG59 + Power, 2MP / 5MP / ColorVu)</option>
                      <option value="IP CCTV">IP CCTV Network (Pure Solid Cat6 + PoE Switch, 4MP / 4K)</option>
                      <option value="WiFi Wireless">WiFi Wireless Smart Cameras (Ezviz / Imou)</option>
                      <option value="Hybrid">Hybrid (Combination of HD & IP)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Survey Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Camera Locations List */}
            {activeStep === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Camera Locations & Distances ({cameraLocations.length} Points)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Enter each camera's location and distance from DVR/NVR to automatically calculate total cables & casing.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddCameraLocation}
                    className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Camera Point
                  </button>
                </div>

                <div className="space-y-3">
                  {cameraLocations.map((cam, idx) => (
                    <div
                      key={cam.id}
                      className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 relative"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-black text-xs flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-white">Camera Point #{idx + 1}</span>
                        </div>

                        {cameraLocations.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveCameraLocation(cam.id)}
                            className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div className="sm:col-span-2">
                          <label className="text-[11px] font-bold text-slate-400 block mb-1">Location Name / Target</label>
                          <input
                            type="text"
                            value={cam.locationName}
                            onChange={(e) => handleUpdateCameraLocation(cam.id, { locationName: e.target.value })}
                            placeholder="e.g. Front Gate, Porch, Cash Counter, Garage"
                            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-400 block mb-1">Camera Type</label>
                          <select
                            value={cam.cameraType}
                            onChange={(e) => handleUpdateCameraLocation(cam.id, { cameraType: e.target.value as any })}
                            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                          >
                            <option value="ColorVu Camera">ColorVu Full Color</option>
                            <option value="Bullet Camera">Standard Bullet (IR)</option>
                            <option value="Dome Camera">Indoor Dome</option>
                            <option value="IP Camera">IP PoE Camera</option>
                            <option value="PTZ Camera">PTZ Speed Dome</option>
                            <option value="Audio Camera">Built-in Mic Audio Camera</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-400 block mb-1">Resolution</label>
                          <select
                            value={cam.resolution}
                            onChange={(e) => handleUpdateCameraLocation(cam.id, { resolution: e.target.value })}
                            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                          >
                            <option value="2MP (1080P)">2MP (1080P)</option>
                            <option value="5MP (Ultra HD)">5MP (Ultra HD 3K)</option>
                            <option value="4MP (2K)">4MP (2K QHD)</option>
                            <option value="8MP (4K)">8MP (4K Ultra HD)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-cyan-400 block mb-1">
                            Distance to DVR/NVR (Meters) *
                          </label>
                          <input
                            type="number"
                            value={cam.distanceMeters}
                            onChange={(e) => handleUpdateCameraLocation(cam.id, { distanceMeters: Number(e.target.value) })}
                            className="w-full px-2.5 py-1.5 bg-slate-900 border border-cyan-500/50 rounded-lg text-white font-mono font-bold text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-400 block mb-1">Casing / Conduit</label>
                          <select
                            value={cam.casingConduit}
                            onChange={(e) => handleUpdateCameraLocation(cam.id, { casingConduit: e.target.value })}
                            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                          >
                            <option value="PVC Casing (1x1/2)">PVC Casing (1x1/2 inch)</option>
                            <option value="20mm PVC Conduit">20mm PVC Electrical Conduit</option>
                            <option value="Concealed in Ceiling">Concealed / Ceiling Run</option>
                            <option value="Armored Conduit">Heavy Armored Conduit (Outdoor)</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-400 block mb-1">Environment</label>
                          <select
                            value={cam.indoorOutdoor}
                            onChange={(e) => handleUpdateCameraLocation(cam.id, { indoorOutdoor: e.target.value })}
                            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                          >
                            <option value="Outdoor Weatherproof (IP67)">Outdoor Weatherproof (IP67)</option>
                            <option value="Indoor">Indoor Room / Hall</option>
                          </select>
                        </div>

                        <div className="flex items-center gap-2 pt-5">
                          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={cam.audioRequired}
                              onChange={(e) => handleUpdateCameraLocation(cam.id, { audioRequired: e.target.checked })}
                              className="w-4 h-4 rounded text-cyan-500 accent-cyan-500"
                            />
                            <span>Audio Mic Required</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Sum of All Camera Run Distances:</span>
                  <span className="font-mono text-cyan-400 font-bold text-sm">{rawCableMeters} Meters</span>
                </div>
              </div>
            )}

            {/* Step 3: Central Hub & Estimation */}
            {activeStep === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">DVR / NVR Location</label>
                    <input
                      type="text"
                      value={dvrNvrLocation}
                      onChange={(e) => setDvrNvrLocation(e.target.value)}
                      placeholder="e.g. Master Bedroom, Living Room Rack, Server Closet"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Monitor Display Setup</label>
                    <input
                      type="text"
                      value={monitorLocation}
                      onChange={(e) => setMonitorLocation(e.target.value)}
                      placeholder="e.g. Connected to Living Room TV or Dedicated 22 Inch Monitor"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Target Storage Days</label>
                    <select
                      value={storageDaysRequired}
                      onChange={(e) => setStorageDaysRequired(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    >
                      <option value={15}>15 Days Recording</option>
                      <option value={30}>30 Days Recording (Standard)</option>
                      <option value={60}>60 Days Recording</option>
                      <option value={90}>90 Days Enterprise Retention</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Cable Extra Spare %</label>
                    <select
                      value={extraSparePercent}
                      onChange={(e) => setExtraSparePercent(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    >
                      <option value={5}>+5% (Tight)</option>
                      <option value={10}>+10% (Recommended for Bends)</option>
                      <option value={15}>+15% (High Ceilings / Complex Paths)</option>
                      <option value={20}>+20% (Industrial Warehouse)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Internet Connection</label>
                    <select
                      value={ispType}
                      onChange={(e) => setIspType(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    >
                      <option value="SLT Fiber">SLT Fiber (High Speed)</option>
                      <option value="Dialog 4G Router">Dialog 4G Router</option>
                      <option value="Mobitel / Airtel 4G">Mobitel / Airtel 4G</option>
                      <option value="No Internet">No Internet (Local Only)</option>
                    </select>
                  </div>
                </div>

                {/* Auto Calculated Summary Box */}
                <div className="p-5 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/40 border border-cyan-500/40 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    Automated Material Bill of Quantities (BOQ)
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                      <div className="text-[10px] text-slate-400">Total Cable Required</div>
                      <div className="text-base font-black text-cyan-300 font-mono">{finalCableMeters} Meters</div>
                      <div className="text-[10px] text-slate-500">Includes +{extraSparePercent}% slack</div>
                    </div>
                    <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                      <div className="text-[10px] text-slate-400">Recommended Recorder</div>
                      <div className="text-xs font-black text-white">{suggestedRecorder}</div>
                    </div>
                    <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                      <div className="text-[10px] text-slate-400">Hard Disk Size</div>
                      <div className="text-xs font-black text-emerald-400">{suggestedHddCapacity}</div>
                      <div className="text-[10px] text-slate-500">{storageDaysRequired} days 24/7</div>
                    </div>
                    <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                      <div className="text-[10px] text-slate-400">Power Supply</div>
                      <div className="text-xs font-black text-amber-400">{suggestedPowerSupply}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Special Technician Notes & Instructions</label>
                  <textarea
                    rows={2}
                    value={specialRequirements}
                    onChange={(e) => setSpecialRequirements(e.target.value)}
                    placeholder="e.g. Conceal cables through ceiling space. Configure remote view on 2 iPhones."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>
              </div>
            )}

            {/* Modal Footer Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              {activeStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setActiveStep(activeStep - 1)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2">
                {activeStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    Next Step
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSaveSurvey}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Save Site Survey
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
