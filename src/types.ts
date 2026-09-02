export type TabType = 
  | 'home'
  | 'catalog'
  | 'about'
  | 'cctv'
  | 'repairs'
  | 'networking'
  | 'services'
  | 'contact';

export type AdminTab = 
  | 'dashboard'
  | 'customers'
  | 'site-surveys'
  | 'site-survey-create'
  | 'site-survey-view'
  | 'price-search'
  | 'quotations'
  | 'quotation-create'
  | 'quotation-view'
  | 'invoices'
  | 'invoice-create'
  | 'invoice-view'
  | 'products'
  | 'stock'
  | 'warranty'
  | 'suppliers'
  | 'service-history'
  | 'services'
  | 'payments'
  | 'reports'
  | 'settings'
  | 'users'
  | 'templates';

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  category: 'cctv' | 'repair' | 'networking' | 'it';
  features: string[];
  benefits: string[];
  imageUrl: string;
  popular?: boolean;
}

export interface CctvProduct {
  id: string;
  name: string;
  category: 'indoor' | 'outdoor' | 'night_vision' | 'ip_camera' | 'hd_camera' | 'dvr_nvr' | 'accessories';
  specs: string[];
  bestFor: string;
  resolution: string;
  features: string[];
  imageUrl: string;
}

export interface RepairItem {
  id: string;
  title: string;
  category: 'cctv' | 'computer' | 'network' | 'software';
  symptoms: string[];
  turnaroundTime: string;
  warranty: string;
  description: string;
  iconName: string;
}

export interface QuoteFormData {
  name: string;
  phone: string;
  email: string;
  location: string;
  serviceType: string;
  propertyType: 'home' | 'office' | 'shop' | 'hotel' | 'school' | 'factory' | 'other';
  cameraCount?: number;
  notes: string;
}

export interface RepairBookingData {
  name: string;
  phone: string;
  email: string;
  deviceType: string;
  brandModel: string;
  issueDescription: string;
  serviceMode: 'onsite' | 'dropoff' | 'pickup';
  preferredDate: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

// ==========================================
// CCTV QUOTATION & BILLING SYSTEM DATA TYPES
// ==========================================

export type UnitType = 
  | 'PCS'
  | 'NOS'
  | 'MTR'
  | 'METER'
  | 'ROLL'
  | 'BOX'
  | 'SET'
  | 'UNIT'
  | 'DAY'
  | 'JOB'
  | 'MONTH';

export type ProductCategory = 
  | 'CCTV Cameras'
  | 'Recorders (DVR/NVR)'
  | 'Storage & Hard Disks'
  | 'Power & SMPS'
  | 'Cables & Wiring'
  | 'Connectors & Accessories'
  | 'Displays & Monitors'
  | 'Network & Switches'
  | 'Racks & Enclosures'
  | 'Smart Security & Access Points'
  | 'Tools & Consumables'
  | 'Other';

export interface Customer {
  id: string;
  customerCode: string; // e.g. CUST-001
  name: string;
  companyName?: string;
  nicBrNumber?: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  address: string;
  city: string;
  province?: string;
  siteAddress?: string;
  notes?: string;
  createdAt: string;
}

export interface CameraModel {
  id: string;
  name: string;
  model?: string;
  resolution: string; // 2MP, 3MP, 4MP, 5MP, 6MP, 8MP 4K
  cameraType?: 'Dome Camera' | 'Bullet Camera' | 'PTZ Camera' | 'WiFi Camera' | 'IP Camera' | 'Night Vision Camera' | 'Full Color (ColorVu) Camera' | string;
  type?: string;
  brand: string;
  suggestedPrice?: number;
  defaultPrice?: number;
  warrantyPeriod?: string;
  nightVision?: string;
  audio?: string;
}

export type UserRole = 'Super Admin' | 'Technician' | 'Sales Manager' | 'Accountant' | 'Manager' | 'Billing Staff' | 'Admin' | string;

export interface AppUser {
  id: string;
  name: string;
  username?: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
  active?: boolean;
  createdAt?: string;
}

export type User = AppUser;
export type Payment = PaymentRecord;
export type InstallationChargeItem = InstallationItem;

export interface MasterServiceRate {
  id: string;
  name: string;
  category: string;
  defaultRate: number;
  unit: string;
  description?: string;
}

export interface Product {
  id: string;
  code?: string; // e.g. UTH-CAM-001
  name: string;
  category: ProductCategory;
  subcategory?: string;
  brand: string;
  model?: string;
  description?: string;
  specifications?: string;
  isArchived?: boolean;
  unit: UnitType;
  purchasePrice: number;
  marketPrice?: number;
  sellingPrice: number;
  stockQuantity: number;
  minStock: number;
  warrantyPeriod?: string;
  warranty?: string;
  expectedUsefulLife?: string; // e.g. "3-5 Years (Estimated)"
  supplier?: string;
  supplierCode?: string;
  location?: string; // e.g. "Rack A-02, Colombo Main Store"
  imageUrl?: string;
  datasheetUrl?: string;
  manualUrl?: string;
  sourceUrl?: string;
  lastPriceCheck?: string;
  
  // Detailed Camera Specifications
  cameraType?: string; // Dome, Bullet, Turret, PTZ, Eyeball, WiFi, etc.
  technology?: string; // HD-TVI, IP PoE, AHD, CVI, Analog, WiFi, 4G
  resolution?: string; // 2MP, 3MP, 4MP, 5MP, 6MP, 8MP (4K), 12MP
  lens?: string; // 2.8mm, 3.6mm, 4mm, 6mm, Varifocal 2.7-13.5mm
  lensSize?: string;
  imageSensor?: string;
  frameRate?: string;
  nightVision?: string;
  irDistance?: string; // 20m, 30m, 40m, 60m, 80m
  fullColor?: boolean; // ColorVu / 24/7 Color Night Vision
  wdr?: string; // 120dB WDR, 130dB WDR, DWDR
  audio?: string; // Built-in Mic, Two-Way Audio, Audio over Coax
  microphone?: boolean;
  speaker?: boolean;
  twoWayAudio?: boolean;
  storageSupport?: string; // MicroSD up to 256GB / 512GB
  microSdSupport?: string;
  onvif?: boolean;
  poe?: boolean;
  powerInput?: string; // 12V DC / PoE (802.3af)
  powerConsumption?: string; // 4.5W Max
  ipRating?: string; // IP67 Weatherproof, IP66, IK10 Vandal-Proof
  operatingTemperature?: string; // -30 °C to 60 °C
  dimensions?: string;
  weight?: string;
  installationType?: string; // Indoor / Outdoor
  indoorOutdoor?: 'Indoor' | 'Outdoor' | 'Both';
  mobileApp?: string; // Hik-Connect, DMSS, XMeye, Guarding Vision
  cloudSupport?: boolean;
  videoCompression?: string; // H.265+, H.265, H.264
  manufacturer?: string;
  countryOfOrigin?: string;

  // DVR / NVR Specifications
  channelCount?: number; // 4, 8, 16, 32, 64, 128
  hddBays?: number; // 1 SATA, 2 SATA, 4 SATA, 8 SATA
  maxHddCapacity?: string; // Up to 10TB per bay
  sataPorts?: number;
  poePorts?: number;
  incomingBandwidth?: string; // 80Mbps, 160Mbps, 256Mbps
  recordingResolution?: string;
  hdmiOutput?: string;
  vgaOutput?: string;

  // Surveillance HDD & SSD Specifications
  capacity?: string; // 1TB, 2TB, 4TB, 6TB, 8TB, 10TB, 12TB, 16TB, 18TB
  rpm?: string; // 5400 RPM, 5900 RPM, 7200 RPM
  cache?: string; // 64MB, 256MB
  workloadRating?: string; // 180TB/year
  surveillanceRating?: string; // 24/7 Continuous Surveillance
  recommendedCameraCount?: string; // Up to 64 HD Cameras

  // Power Supply Specifications
  voltage?: string; // 12V DC
  current?: string; // 5A, 10A, 20A, 30A
  wattage?: string; // 60W, 120W, 240W, 360W
  cameraSupportCount?: number; // 4CH, 9CH, 18CH

  // Cable Specifications
  cableType?: string; // CAT6, CAT5e, RG59 Coaxial + Power
  coreType?: string; // 100% Pure Bare Copper, CCA
  rollLength?: string; // 305m Box, 100m Roll, Per Meter
  shielding?: string; // UTP, FTP, SFTP

  // Switch / Network Specifications
  ports?: number;
  poeBudget?: string; // 65W, 120W, 250W
  speed?: string; // Gigabit, 10/100 Mbps

  // Display Specifications
  screenSize?: string; // 19", 22", 24", 32", 43"
  panelType?: string; // IPS, VA, LED

  createdAt?: string;
  updatedAt?: string;
}

// ==========================================
// STOCK MOVEMENT & SERIAL NUMBER TYPES (#47, #49, #50)
// ==========================================

export type StockMovementType = 'STOCK_IN' | 'STOCK_OUT' | 'ADJUSTMENT' | 'TRANSFER';

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  productCode?: string;
  type: StockMovementType;
  quantity: number;
  previousStock: number;
  newStock: number;
  date: string;
  reason: string; // e.g. "Distributor Purchase SUP-001", "Invoice INV-2026-0004", "Damaged in transit"
  referenceNumber?: string; // e.g. "INV-2026-0004" or "PO-9912"
  performedBy: string; // Staff member
  notes?: string;
}

export type SerialStatus = 'IN_STOCK' | 'INSTALLED' | 'UNDER_REPAIR' | 'REPLACED' | 'EXPIRED' | 'DISPOSED';

export interface SerialNumberRecord {
  id: string;
  serialNumber: string; // e.g. "HKV202688912"
  productId: string;
  productName: string;
  brand: string;
  model: string;
  category: ProductCategory;
  status: SerialStatus;
  customerId?: string;
  customerName?: string;
  siteAddress?: string;
  invoiceId?: string;
  invoiceNumber?: string;
  purchaseDate?: string;
  installationDate?: string;
  warrantyPeriod?: string;
  warrantyStartDate?: string;
  warrantyEndDate?: string;
  expectedUsefulLife?: string;
  technicianName?: string;
  notes?: string;
  createdAt: string;
}

// ==========================================
// CUSTOMER SITE & INSTALLED REGISTER (#28, #51)
// ==========================================

export interface CustomerSite {
  id: string;
  customerId: string;
  siteName: string; // e.g. "Head Office - Colombo 03" or "Warehouse - Kelaniya"
  address: string;
  contactPerson: string;
  contactPhone: string;
  notes?: string;
  createdAt: string;
}

export interface InstalledEquipmentItem {
  id: string;
  customerId: string;
  siteId?: string;
  siteName: string;
  productId: string;
  productName: string;
  brand: string;
  model: string;
  serialNumber?: string;
  quantity: number;
  installationDate: string;
  warrantyStartDate: string;
  warrantyEndDate: string;
  expectedUsefulLife?: string;
  technicianName: string;
  invoiceNumber?: string;
  notes?: string;
}

// ==========================================
// WARRANTY CLAIMS (#53) & SERVICE RECORDS (#52)
// ==========================================

export type WarrantyClaimStatus = 'OPEN' | 'UNDER REVIEW' | 'APPROVED' | 'REPAIRED' | 'REPLACED' | 'REJECTED' | 'CLOSED';

export interface WarrantyClaim {
  id: string;
  claimNumber: string; // e.g. "CLM-2026-001"
  customerId: string;
  customerName: string;
  customerPhone: string;
  productId: string;
  productName: string;
  brand: string;
  model: string;
  serialNumber: string;
  invoiceNumber?: string;
  purchaseDate: string;
  warrantyPeriod: string;
  warrantyEndDate: string;
  problemDescription: string;
  claimDate: string;
  technicianName: string;
  status: WarrantyClaimStatus;
  resolutionNotes?: string;
  replacementSerialNumber?: string;
  closedAt?: string;
}

export type ServiceTypeCategory = 
  | 'CCTV Repair'
  | 'Camera Replacement'
  | 'DVR Repair'
  | 'NVR Repair'
  | 'HDD Replacement'
  | 'Cable Repair'
  | 'Network Repair'
  | 'Maintenance & Cleaning'
  | 'Configuration & Remote Setup'
  | 'Other IT Support';

export interface ServiceRecord {
  id: string;
  serviceCode: string; // e.g. "SRV-2026-001"
  customerId: string;
  customerName: string;
  customerPhone: string;
  siteAddress: string;
  date: string;
  technicianName: string;
  serviceType: ServiceTypeCategory;
  problem: string;
  solution: string;
  partsUsed: {
    productId?: string;
    productName: string;
    qty: number;
    unitPrice: number;
    amount: number;
  }[];
  laborCharge: number;
  totalAmount: number;
  warrantyGiven: string; // e.g. "6 Months on replaced power unit"
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  notes?: string;
  createdAt: string;
}

export interface QuotationItem {
  id: string;
  srNo: number;
  productId?: string;
  description: string;
  model: string;
  unit: UnitType;
  qty: number;
  rate: number;
  amount: number; // qty * rate
  warranty: string;
}

export interface InstallationItem {
  id: string;
  srNo: number;
  serviceName: string;
  description?: string;
  unit: UnitType;
  qty: number;
  rate: number;
  amount: number; // qty * rate
}

export type QuotationStatus = 
  | 'DRAFT'
  | 'SENT'
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'EXPIRED'
  | 'CONVERTED';

export interface Quotation {
  id: string;
  quotationNumber: string; // QT-2026-0001
  date: string;
  validUntil: string;
  customerId: string;
  customerName: string;
  customerCompany?: string;
  customerNicBr?: string;
  customerPhone: string;
  customerWhatsapp?: string;
  customerEmail?: string;
  customerAddress: string;
  siteAddress: string;
  
  items: QuotationItem[];
  installationItems: InstallationItem[];
  
  itemTotal: number;
  installationTotal: number;
  installationCharges?: number;
  transportCharges: number;
  otherCharges: number;
  subTotal: number;
  subtotal?: number;
  
  discountType: 'amount' | 'percent';
  discountValue: number;
  discountAmount: number;
  discount?: number;
  
  vatEnabled: boolean;
  vatPercent: number;
  vatAmount: number;
  
  grandTotal: number;
  
  notes: string[];
  warrantyDetails: {
    cameraWarranty: string;
    nvrWarranty: string;
    hddWarranty: string;
    installationWarranty: string;
    customWarranty?: string;
  };
  warrantyTerms?: string;
  paymentTerms: string;
  jobDuration?: string;
  
  status: QuotationStatus;
  convertedInvoiceId?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export type PaymentStatus = 'PAID' | 'PARTIALLY PAID' | 'UNPAID';

export type PaymentMethod = 
  | 'Cash'
  | 'Bank Transfer'
  | 'Card'
  | 'Online Payment'
  | 'Cheque'
  | 'Other';

export interface InvoiceItem {
  id: string;
  srNo: number;
  description: string;
  model: string;
  unit: UnitType;
  qty: number;
  rate: number;
  amount: number;
  warranty: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // INV-2026-0001
  invoiceDate: string;
  dueDate: string;
  quotationNumber?: string;
  quotationReference?: string;
  quotationId?: string;
  
  customerId: string;
  customerName: string;
  customerCompany?: string;
  customerNicBr?: string;
  customerPhone: string;
  customerWhatsapp?: string;
  customerEmail?: string;
  customerAddress: string;
  siteAddress: string;
  
  items: InvoiceItem[];
  installationItems: InstallationItem[];
  
  itemTotal: number;
  installationTotal: number;
  installationCharges?: number;
  transportCharges: number;
  otherCharges: number;
  subTotal: number;
  subtotal?: number;
  discountAmount: number;
  discount?: number;
  vatAmount: number;
  grandTotal: number;
  
  amountPaid: number;
  balanceDue: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod | string;
  bankDetails?: any;
  
  paymentTerms: string;
  notes: string[];
  warrantyDetails: {
    cameraWarranty: string;
    nvrWarranty: string;
    hddWarranty: string;
    installationWarranty: string;
    customWarranty?: string;
  };
  warrantyTerms?: string;
  
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentRecord {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  amount: number;
  referenceNumber?: string;
  notes?: string;
  recordedBy?: string;
  createdAt: string;
}

export interface BankAccountDetails {
  bankName: string;
  branchName: string;
  accountName: string;
  accountNumber: string;
  swiftCode?: string;
}

export interface CompanySettings {
  companyName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  branch: string;
  website: string;
  brNumber: string;
  vatNumber: string;
  authorizedPerson: string;
  signatureTitle: string;
  
  bankAccounts: BankAccountDetails[];
  bankName?: string;
  bankAccountName?: string;
  bankAccountNumber?: string;
  bankBranch?: string;
  
  quotationPrefix: string; // e.g. QT-2026-
  invoicePrefix: string;   // e.g. INV-2026-
  
  defaultVatPercent: number;
  defaultDiscountPercent: number;
  defaultValidityDays: number;
  
  defaultWarranty: {
    camera: string;
    nvr: string;
    hdd: string;
    installation: string;
  };
  defaultWarrantyTerms?: string;
  
  defaultPaymentTerms: string;
  defaultNotes: string[];
}

// ==========================================
// MARKET PRICE SEARCH & SUPPLIER TYPES
// ==========================================

export interface MarketPriceResult {
  id: string;
  query: string;
  productName: string;
  brand: string;
  model: string;
  specifications: string;
  seller: string;
  sourceWebsite: string;
  priceLKR: number;
  currency: 'LKR';
  availability: 'In Stock' | 'Limited Stock' | 'Pre-Order' | 'Call for Price';
  productUrl?: string;
  dateChecked: string;
  verified: boolean;
  suggestedSellingPrice?: number;
  markupPercent?: number;
  notes?: string;
}

export interface Supplier {
  id: string;
  supplierCode: string; // e.g. SUP-001
  name: string;
  company: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  address: string;
  website?: string;
  productCategories: string[];
  brandsDistributed: string[];
  paymentTerms?: string;
  rating?: number;
  notes?: string;
  createdAt: string;
}

export interface PriceHistoryRecord {
  id: string;
  productId: string;
  productName: string;
  model: string;
  brand: string;
  date: string;
  marketPrice: number;
  purchasePrice: number;
  sellingPrice: number;
  sellerSource: string;
  recordedBy?: string;
  notes?: string;
}

// ==========================================
// SITE SURVEY & SMART ESTIMATION TYPES
// ==========================================

export type CameraType = 'Dome Camera' | 'Bullet Camera' | 'ColorVu Camera' | 'IP PoE Camera' | 'PTZ Camera' | 'WiFi Camera';
export type CableType = 'RG59 Coaxial Cable + Power' | 'CAT6 Network Cable' | 'CAT5e Network Cable' | '3C2V Coaxial';
export type PowerSupplyType = '12V 5A Central SMPS' | '12V 10A Central SMPS' | '12V 20A Central SMPS' | '12V 30A Central SMPS' | '4-Port PoE Switch' | '8-Port PoE Switch' | '16-Port PoE Switch' | 'Individual Adapters';

export interface CameraLocation {
  id: string;
  cameraNo: number;
  locationName: string; // e.g. "Main Gate / Driveway", "Living Room", "Cashier Counter", "Server Room"
  cameraType: CameraType;
  model: string;
  resolution: '2MP (1080P)' | '3MP (2K)' | '4MP (QHD)' | '5MP (Ultra HD)' | '6MP' | '8MP (4K)';
  distanceMeters: number;
  cableType: CableType;
  mountingType: 'Wall Mount' | 'Ceiling Mount' | 'Pole Mount' | 'Corner Mount';
  casingConduit: 'PVC Casing (1x1/2)' | '20mm PVC Conduit' | '25mm Heavy Conduit' | 'Open Run / False Ceiling';
  indoorOutdoor: 'Indoor' | 'Outdoor Weatherproof (IP67)';
  audioRequired: boolean;
  notes?: string;
}

export interface SiteSurvey {
  id: string;
  surveyNumber: string; // e.g. SURV-2026-0001
  date: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  siteAddress: string;
  propertyType: 'Residential Home' | 'Commercial Office' | 'Retail Shop' | 'Warehouse / Factory' | 'Hotel / Villa' | 'School / Institution' | 'Other';
  technicianName: string;
  systemType: 'HD CCTV' | 'IP CCTV' | 'WiFi CCTV' | 'Hybrid CCTV' | 'Custom CCTV System';
  cameraCount: number;
  cameraLocations: CameraLocation[];
  
  // Power & Central Location
  dvrNvrLocation: string;
  monitorLocation: string;
  monitorSize: 'None / Client Monitor' | '19 inch LED' | '22 inch LED' | '24 inch Full HD LED' | '32 inch Smart TV' | '43 inch Smart TV';
  powerPointsAvailable: boolean;
  suggestedPowerSupply: PowerSupplyType | string;
  
  // Storage & Recording
  storageDaysRequired: number; // e.g. 15, 30, 45, 60
  recordingMode: 'Continuous 24/7' | 'Motion Detection Only' | 'AI Smart Event / AcuSense';
  suggestedHddCapacity: '1TB Surveillance HDD' | '2TB Surveillance HDD' | '4TB Surveillance HDD' | '6TB Surveillance HDD' | '8TB Surveillance HDD';
  
  // Connectivity
  internetAvailable: boolean;
  ispType?: 'SLT Fiber' | 'Dialog 4G' | 'Mobitel 4G' | 'LankaBell' | 'No Internet';
  wifiStrength: 'Strong' | 'Medium' | 'Weak' | 'None';
  remoteViewingDevices: number; // e.g. 2 phones, 1 laptop
  
  // Calculations
  totalCalculatedCableMeters: number;
  extraSparePercent: number; // 5%, 10%, 15%, 20%
  totalFinalCableMeters: number;
  totalCasingMeters: number;
  totalConduitMeters: number;
  
  specialRequirements?: string;
  status: 'Draft' | 'Completed' | 'Quoted';
  convertedQuotationId?: string;
  createdAt: string;
  updatedAt: string;
}

