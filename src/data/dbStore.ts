import { 
  Customer, 
  Product, 
  CameraModel, 
  Quotation, 
  Invoice, 
  PaymentRecord, 
  CompanySettings, 
  UnitType, 
  AppUser,
  InstallationItem,
  MasterServiceRate,
  Supplier,
  PriceHistoryRecord,
  SiteSurvey,
  CameraLocation,
  MarketPriceResult,
  StockMovement,
  SerialNumberRecord,
  CustomerSite,
  InstalledEquipmentItem,
  WarrantyClaim,
  ServiceRecord
} from '../types';

export const INITIAL_SERVICES: MasterServiceRate[] = [
  { id: 'srv-1', name: 'CCTV Camera Point Installation & Wiring', category: 'Installation', defaultRate: 2500, unit: 'per point', description: 'Mounting, BNC & DC jack termination, camera positioning & focus.' },
  { id: 'srv-2', name: 'Cat6 LAN Cabling with PVC Casing / Conduit', category: 'Cabling', defaultRate: 150, unit: 'per meter', description: 'High quality trunking, casing clip installation and cable pull.' },
  { id: 'srv-3', name: 'DVR / NVR 16CH Rack Configuration & Setup', category: 'Configuration', defaultRate: 4500, unit: 'per unit', description: 'HDD formatting, recording schedule, motion alert zones & password setup.' },
  { id: 'srv-4', name: 'Remote Mobile Phone Live View Setup', category: 'Configuration', defaultRate: 2000, unit: 'per setup', description: 'Cloud P2P Hik-Connect / DMSS configuration on up to 5 smartphones.' },
  { id: 'srv-5', name: 'CCTV Fault Inspection & Camera Servicing', category: 'Repair / Service', defaultRate: 3500, unit: 'per visit', description: 'Testing power supply, connectors, video signal integrity, and lens cleaning.' }
];

export const UNITS_LIST: UnitType[] = [
  'PCS',
  'NOS',
  'MTR',
  'METER',
  'ROLL',
  'BOX',
  'SET',
  'UNIT',
  'DAY',
  'JOB',
  'MONTH'
];

export const INITIAL_COMPANY_SETTINGS: CompanySettings = {
  companyName: "UNITY TECH HUB",
  tagline: "Smart Technology. Secure Future.",
  phone: "072 740 2288",
  whatsapp: "+94727402288",
  email: "unitytechhub.lk@gmail.com",
  address: "No. 45/A, High Level Road, Colombo, Sri Lanka",
  branch: "Colombo Head Office & Islandwide Technical Fleet",
  website: "https://unitytechhub.lk",
  brNumber: "PV-00284719/2024",
  vatNumber: "103948572-7000",
  authorizedPerson: "Managing Director / Technical Lead",
  signatureTitle: "UNITY TECH HUB (PVT) LTD",
  
  bankAccounts: [
    {
      bankName: "Commercial Bank of Ceylon",
      branchName: "Nugegoda Branch",
      accountName: "UNITY TECH HUB (PVT) LTD",
      accountNumber: "1000 4829 1102",
      swiftCode: "COMBCEKL"
    },
    {
      bankName: "Sampath Bank",
      branchName: "Maharagama Super Branch",
      accountName: "UNITY TECH HUB (PVT) LTD",
      accountNumber: "0192 1002 9384"
    }
  ],
  
  quotationPrefix: "QT-2026-",
  invoicePrefix: "INV-2026-",
  defaultVatPercent: 18,
  defaultDiscountPercent: 0,
  defaultValidityDays: 7,
  
  defaultWarranty: {
    camera: "2 Years Comprehensive Replacement Warranty",
    nvr: "2 Years Hardware Warranty",
    hdd: "2 Years Manufacturer Warranty (Surveillance Grade)",
    installation: "6 Months Free On-Site Service & Trouble-free Guarantee"
  },
  
  defaultPaymentTerms: "50% Advance with confirmation order, 50% upon successful completion, testing and client sign-off.",
  defaultNotes: [
    "Quotation is valid strictly for 7 days from the date of issue.",
    "Warranty period applies according to product / manufacturer warranty (2 Years for Cameras & NVRs, 2 Years for Surveillance HDDs).",
    "Installation warranty is subject to company terms and excludes damage caused by lightning, physical abuse, or third-party tampering.",
    "Payment terms: 50% advance before starting site work and 50% immediately upon installation, testing and camera handover.",
    "Additional civil work, extra conduit, or non-standard cabling will be charged based on actual site measurements.",
    "Customer must provide continuous 230V AC standard power supply points at DVR/NVR location.",
    "Working internet connection (Fiber/4G Wi-Fi) is mandatory for remote mobile viewing & app notifications.",
    "Prices are subject to revision after quotation validity expires."
  ]
};

// 13 Standard Camera Models
export const INITIAL_CAMERA_MODELS: CameraModel[] = [
  { id: "cm-1", name: "2MP HD Dome Camera (Indoor)", resolution: "2MP (1080P)", cameraType: "Dome Camera", brand: "Hikvision", suggestedPrice: 6500, warrantyPeriod: "2 Years" },
  { id: "cm-2", name: "2MP HD Bullet Camera (Outdoor IP67)", resolution: "2MP (1080P)", cameraType: "Bullet Camera", brand: "Hikvision", suggestedPrice: 7200, warrantyPeriod: "2 Years" },
  { id: "cm-3", name: "3MP Smart Wi-Fi 360 Camera", resolution: "3MP (2K)", cameraType: "WiFi Camera", brand: "Ezviz / Imou", suggestedPrice: 8900, warrantyPeriod: "1 Year" },
  { id: "cm-4", name: "4MP Super HD IP PoE Dome", resolution: "4MP (2K QHD)", cameraType: "IP Camera", brand: "Hikvision / Dahua", suggestedPrice: 12500, warrantyPeriod: "2 Years" },
  { id: "cm-5", name: "4MP Super HD IP PoE Bullet", resolution: "4MP (2K QHD)", cameraType: "IP Camera", brand: "Hikvision / Dahua", suggestedPrice: 13500, warrantyPeriod: "2 Years" },
  { id: "cm-6", name: "5MP ColorVu 24/7 Full Color Dome", resolution: "5MP Ultra HD", cameraType: "Full Color (ColorVu) Camera", brand: "Hikvision ColorVu", suggestedPrice: 11500, warrantyPeriod: "2 Years" },
  { id: "cm-7", name: "5MP ColorVu 24/7 Full Color Bullet", resolution: "5MP Ultra HD", cameraType: "Full Color (ColorVu) Camera", brand: "Hikvision ColorVu", suggestedPrice: 12800, warrantyPeriod: "2 Years" },
  { id: "cm-8", name: "6MP High-Res AcuSense IP Camera", resolution: "6MP", cameraType: "IP Camera", brand: "Hikvision AcuSense", suggestedPrice: 18500, warrantyPeriod: "2 Years" },
  { id: "cm-9", name: "8MP 4K Ultra HD IP PoE Camera", resolution: "8MP 4K", cameraType: "IP Camera", brand: "Hikvision / Dahua", suggestedPrice: 24500, warrantyPeriod: "2 Years" },
  { id: "cm-10", name: "4K 25X Optical Zoom Speed Dome PTZ", resolution: "8MP 4K PTZ", cameraType: "PTZ Camera", brand: "Hikvision DarkFighter", suggestedPrice: 85000, warrantyPeriod: "2 Years" },
  { id: "cm-11", name: "EXIR Smart Night Vision Bullet", resolution: "5MP", cameraType: "Night Vision Camera", brand: "Dahua Starlight", suggestedPrice: 11800, warrantyPeriod: "2 Years" },
  { id: "cm-12", name: "Solar Powered 4G LTE Outdoor Camera", resolution: "4MP ColorVu", cameraType: "WiFi Camera", brand: "Hikvision / Reolink", suggestedPrice: 38000, warrantyPeriod: "1 Year" },
  { id: "cm-13", name: "Audio Enabled 5MP Built-in Mic Camera", resolution: "5MP HD", cameraType: "Bullet Camera", brand: "Hikvision", suggestedPrice: 13200, warrantyPeriod: "2 Years" }
];

// Pre-populated comprehensive 33+ CCTV Products
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    code: "UTH-CAM-001",
    name: "CCTV CAMERA",
    category: "CCTV Cameras",
    brand: "Hikvision",
    model: "5MP ColorVu 24/7 Full Color Night Vision Bullet (DS-2CE10KF0T-FS)",
    description: "5MP high-resolution audio-enabled full color day/night weatherproof outdoor surveillance camera with built-in mic.",
    unit: "PCS",
    purchasePrice: 9200,
    sellingPrice: 12800,
    stockQuantity: 42,
    minStock: 10,
    warrantyPeriod: "2 Years Comprehensive",
    supplier: "Hikvision Sri Lanka Direct"
  },
  {
    id: "prod-2",
    code: "UTH-CAM-002",
    name: "CCTV CAMERA",
    category: "CCTV Cameras",
    brand: "Hikvision",
    model: "5MP ColorVu Indoor Eyeball Dome (DS-2CE70KF0T-MFS)",
    description: "5MP crystal clear indoor surveillance camera with white light illumination and studio clarity audio.",
    unit: "PCS",
    purchasePrice: 8400,
    sellingPrice: 11500,
    stockQuantity: 36,
    minStock: 8,
    warrantyPeriod: "2 Years Comprehensive",
    supplier: "Hikvision Sri Lanka Direct"
  },
  {
    id: "prod-3",
    code: "UTH-CAM-003",
    name: "WIFI CAMERA",
    category: "CCTV Cameras",
    brand: "Ezviz",
    model: "Ezviz C6N 360° Pan-Tilt Smart Wi-Fi Camera (3MP 2K)",
    description: "Motorized 360 pan-tilt smart Wi-Fi camera with two-way talk, smart tracking, and micro SD recording.",
    unit: "PCS",
    purchasePrice: 6200,
    sellingPrice: 8900,
    stockQuantity: 25,
    minStock: 5,
    warrantyPeriod: "1 Year Replacement",
    supplier: "Ezviz Official Distributor"
  },
  {
    id: "prod-4",
    code: "UTH-REC-001",
    name: "DVR",
    category: "Recorders (DVR/NVR)",
    brand: "Hikvision",
    model: "4-Channel 5MP AcuSense XVR Turbo HD Recorder (iDS-7204HUHI-M1)",
    description: "4-Channel intelligent motion detection recorder supporting up to 5MP cameras, HDMI/VGA output, H.265+ encoding.",
    unit: "PCS",
    purchasePrice: 14500,
    sellingPrice: 19500,
    stockQuantity: 18,
    minStock: 4,
    warrantyPeriod: "2 Years Warranty",
    supplier: "Hikvision Sri Lanka Direct"
  },
  {
    id: "prod-5",
    code: "UTH-REC-002",
    name: "DVR",
    category: "Recorders (DVR/NVR)",
    brand: "Hikvision",
    model: "8-Channel 5MP AcuSense XVR Turbo HD Recorder (iDS-7208HUHI-M1)",
    description: "8-Channel AcuSense smart human and vehicle search DVR recorder with cloud P2P mobile streaming.",
    unit: "PCS",
    purchasePrice: 21000,
    sellingPrice: 28500,
    stockQuantity: 14,
    minStock: 4,
    warrantyPeriod: "2 Years Warranty",
    supplier: "Hikvision Sri Lanka Direct"
  },
  {
    id: "prod-6",
    code: "UTH-REC-003",
    name: "NVR",
    category: "Recorders (DVR/NVR)",
    brand: "Hikvision",
    model: "8-Channel 4K PoE Network Video Recorder (DS-7608NI-Q1/8P)",
    description: "8-Channel 4K Ultra HD NVR with 8 built-in PoE ports, plug & play IP camera setup, and up to 8TB HDD support.",
    unit: "PCS",
    purchasePrice: 31000,
    sellingPrice: 42000,
    stockQuantity: 9,
    minStock: 3,
    warrantyPeriod: "2 Years Warranty",
    supplier: "Hikvision Sri Lanka Direct"
  },
  {
    id: "prod-7",
    code: "UTH-REC-004",
    name: "NVR",
    category: "Recorders (DVR/NVR)",
    brand: "Hikvision",
    model: "16-Channel 4K Pro NVR Recorder (DS-7716NI-K4)",
    description: "16-Channel enterprise-grade NVR with dual Gigabit LAN and 4 SATA hard disk slots (up to 40TB).",
    unit: "PCS",
    purchasePrice: 62000,
    sellingPrice: 84000,
    stockQuantity: 5,
    minStock: 2,
    warrantyPeriod: "2 Years Warranty",
    supplier: "Hikvision Sri Lanka Direct"
  },
  {
    id: "prod-8",
    code: "UTH-HDD-001",
    name: "HARD DISK / SURVEILLANCE HDD / SSD",
    category: "Storage & Hard Disks",
    brand: "Western Digital",
    model: "WD Purple 1TB 24/7 Surveillance Grade Hard Drive",
    description: "Engineered specifically for 24/7 continuous video surveillance recording with AllFrame AI technology.",
    unit: "PCS",
    purchasePrice: 17500,
    sellingPrice: 22500,
    stockQuantity: 30,
    minStock: 6,
    warrantyPeriod: "2 Years Replacement",
    supplier: "WD Authorized Partner"
  },
  {
    id: "prod-9",
    code: "UTH-HDD-002",
    name: "HARD DISK / SURVEILLANCE HDD / SSD",
    category: "Storage & Hard Disks",
    brand: "Western Digital",
    model: "WD Purple 2TB 24/7 Surveillance Grade Hard Drive",
    description: "2TB dedicated surveillance hard drive for extended video archives and 30+ days continuous loop recording.",
    unit: "PCS",
    purchasePrice: 24500,
    sellingPrice: 31500,
    stockQuantity: 22,
    minStock: 5,
    warrantyPeriod: "2 Years Replacement",
    supplier: "WD Authorized Partner"
  },
  {
    id: "prod-10",
    code: "UTH-HDD-003",
    name: "HARD DISK / SURVEILLANCE HDD / SSD",
    category: "Storage & Hard Disks",
    brand: "Seagate",
    model: "Seagate SkyHawk 4TB Surveillance Hard Drive",
    description: "4TB heavy-duty surveillance drive designed for 64-camera multi-stream video environments.",
    unit: "PCS",
    purchasePrice: 42000,
    sellingPrice: 54000,
    stockQuantity: 12,
    minStock: 3,
    warrantyPeriod: "2 Years Replacement",
    supplier: "Seagate Sri Lanka"
  },
  {
    id: "prod-11",
    code: "UTH-PWR-001",
    name: "POWER SUPPLY",
    category: "Power & SMPS",
    brand: "Huntkey / OEM",
    model: "12V 5A Centralized CCTV Power Supply",
    description: "Heavy-duty 12V 5A regulated DC power supply with overload and short circuit protection for 4 cameras.",
    unit: "PCS",
    purchasePrice: 2400,
    sellingPrice: 3800,
    stockQuantity: 45,
    minStock: 10,
    warrantyPeriod: "1 Year Warranty",
    supplier: "Prime Power LK"
  },
  {
    id: "prod-12",
    code: "UTH-PWR-002",
    name: "SMPS",
    category: "Power & SMPS",
    brand: "Suntron / CCTV Power",
    model: "12V 10A 9-Channel SMPS Metal Box with Key Lock",
    description: "Individual fused 9-channel power distribution unit in a sturdy metal enclosure with lock & key.",
    unit: "PCS",
    purchasePrice: 4800,
    sellingPrice: 7500,
    stockQuantity: 28,
    minStock: 5,
    warrantyPeriod: "1 Year Warranty",
    supplier: "Prime Power LK"
  },
  {
    id: "prod-13",
    code: "UTH-PWR-003",
    name: "SMPS",
    category: "Power & SMPS",
    brand: "Suntron / CCTV Power",
    model: "12V 20A 18-Channel Heavy Duty SMPS Metal Box",
    description: "18-Channel fused power supply unit for large 16-camera installations with surge suppression.",
    unit: "PCS",
    purchasePrice: 7800,
    sellingPrice: 11800,
    stockQuantity: 16,
    minStock: 4,
    warrantyPeriod: "1 Year Warranty",
    supplier: "Prime Power LK"
  },
  {
    id: "prod-14",
    code: "UTH-CAB-001",
    name: "CAMERA CABLE",
    category: "Cables & Wiring",
    brand: "ACL / D-Link",
    model: "3+1 Pure Copper CCTV Coaxial Cable with Power Line",
    description: "High-grade 3+1 composite CCTV cable (video signal + dual DC power conductors) for crystal clear video.",
    unit: "MTR",
    purchasePrice: 110,
    sellingPrice: 160,
    stockQuantity: 1800,
    minStock: 300,
    warrantyPeriod: "10 Years Material Life",
    supplier: "ACL Cables Distributor"
  },
  {
    id: "prod-15",
    code: "UTH-CAB-002",
    name: "NETWORK CABLE",
    category: "Cables & Wiring",
    brand: "D-Link / Schneider",
    model: "CAT6 UTP 100% Pure Copper Network Cable (305M Box / Per Meter)",
    description: "Gigabit Ethernet Cat6 solid copper network cable with low latency and high bandwidth capacity.",
    unit: "MTR",
    purchasePrice: 130,
    sellingPrice: 190,
    stockQuantity: 2400,
    minStock: 500,
    warrantyPeriod: "15 Years Material Life",
    supplier: "D-Link Sri Lanka"
  },
  {
    id: "prod-16",
    code: "UTH-CAB-003",
    name: "COAXIAL CABLE",
    category: "Cables & Wiring",
    brand: "Belden / CommScope",
    model: "RG59 / RG6 High Shielding Coaxial Cable",
    description: "Braided 95% shield coaxial cable for long-distance distortion-free analog video transmission.",
    unit: "MTR",
    purchasePrice: 95,
    sellingPrice: 145,
    stockQuantity: 1200,
    minStock: 200,
    warrantyPeriod: "10 Years Material Life",
    supplier: "CommScope Lanka"
  },
  {
    id: "prod-17",
    code: "UTH-CAB-004",
    name: "POWER CABLE",
    category: "Cables & Wiring",
    brand: "Kelani / ACL",
    model: "2-Core 0.75mm Flexible Power Cable",
    description: "Insulated 2-core power cable for supplying auxiliary power to CCTV power supplies and monitors.",
    unit: "MTR",
    purchasePrice: 85,
    sellingPrice: 130,
    stockQuantity: 900,
    minStock: 150,
    warrantyPeriod: "10 Years",
    supplier: "Kelani Cables LK"
  },
  {
    id: "prod-18",
    code: "UTH-CON-001",
    name: "BNC CONNECTOR",
    category: "Connectors & Accessories",
    brand: "GoldTech",
    model: "Heavy Duty Pure Copper Spring BNC Male Connector",
    description: "Premium gold-plated core BNC connector with protective spring relief for lossless video coupling.",
    unit: "PCS",
    purchasePrice: 80,
    sellingPrice: 150,
    stockQuantity: 350,
    minStock: 50,
    warrantyPeriod: "Standard",
    supplier: "GoldTech Hardware"
  },
  {
    id: "prod-19",
    code: "UTH-CON-002",
    name: "POWER CONNECTOR",
    category: "Connectors & Accessories",
    brand: "GoldTech",
    model: "12V DC Male & Female Screw Terminal Jack",
    description: "High-temperature resistant DC power connector with quick screw block for clean polarity wiring.",
    unit: "PCS",
    purchasePrice: 60,
    sellingPrice: 120,
    stockQuantity: 400,
    minStock: 50,
    warrantyPeriod: "Standard",
    supplier: "GoldTech Hardware"
  },
  {
    id: "prod-20",
    code: "UTH-CON-003",
    name: "RJ45 CONNECTOR",
    category: "Connectors & Accessories",
    brand: "D-Link / AMP",
    model: "Cat6 Gold Plated Modular Plug (Box of 100 / Per Piece)",
    description: "8P8C Cat6 shielded gold-plated modular network crimp connector.",
    unit: "PCS",
    purchasePrice: 25,
    sellingPrice: 50,
    stockQuantity: 800,
    minStock: 100,
    warrantyPeriod: "Standard",
    supplier: "D-Link Sri Lanka"
  },
  {
    id: "prod-21",
    code: "UTH-CON-004",
    name: "LAN CONNECTOR",
    category: "Connectors & Accessories",
    brand: "D-Link",
    model: "Cat6 RJ45 Inline Coupler / Keystone Jack",
    description: "Cat6 high-speed female-to-female LAN extender and keystone faceplate connector.",
    unit: "PCS",
    purchasePrice: 220,
    sellingPrice: 450,
    stockQuantity: 65,
    minStock: 15,
    warrantyPeriod: "Standard",
    supplier: "D-Link Sri Lanka"
  },
  {
    id: "prod-22",
    code: "UTH-ACC-001",
    name: "CAMERA JUNCTION BOX",
    category: "Connectors & Accessories",
    brand: "SecureBox",
    model: "Waterproof IP66 Deep PVC Junction Base (4x4 Inch)",
    description: "Weatherproof junction box for concealing BNC/DC connectors, protecting from moisture and corrosion.",
    unit: "PCS",
    purchasePrice: 280,
    sellingPrice: 550,
    stockQuantity: 180,
    minStock: 30,
    warrantyPeriod: "Standard",
    supplier: "SecureBox LK"
  },
  {
    id: "prod-23",
    code: "UTH-ACC-002",
    name: "CAMERA BRACKET",
    category: "Connectors & Accessories",
    brand: "Hikvision / OEM",
    model: "Universal Wall & Pole Mounting CCTV Bracket",
    description: "Heavy-duty aluminum alloy extension bracket for optimal camera positioning and wide viewing angles.",
    unit: "PCS",
    purchasePrice: 750,
    sellingPrice: 1450,
    stockQuantity: 50,
    minStock: 10,
    warrantyPeriod: "Standard",
    supplier: "Prime Power LK"
  },
  {
    id: "prod-24",
    code: "UTH-CAS-001",
    name: "CCTV CASING",
    category: "Tools & Consumables",
    brand: "National / PVC Pro",
    model: "Heavy Duty White Casing & Trunking (38mm x 16mm / 2 Meter Length)",
    description: "Flame-retardant PVC electrical casing for concealing indoor and outdoor cables cleanly along walls.",
    unit: "PCS",
    purchasePrice: 260,
    sellingPrice: 480,
    stockQuantity: 220,
    minStock: 40,
    warrantyPeriod: "Standard",
    supplier: "National Hardware LK"
  },
  {
    id: "prod-25",
    code: "UTH-CAS-002",
    name: "CONDUIT",
    category: "Tools & Consumables",
    brand: "Anton / S-lon",
    model: "20mm / 25mm Heavy Duty PVC Flexible & Rigid Conduit Pipe (4 Meter Length)",
    description: "Impact-resistant PVC electrical conduit pipe with clips for rugged outdoor and industrial cable protection.",
    unit: "PCS",
    purchasePrice: 320,
    sellingPrice: 580,
    stockQuantity: 160,
    minStock: 30,
    warrantyPeriod: "Standard",
    supplier: "Anton Lanka"
  },
  {
    id: "prod-26",
    code: "UTH-CAS-003",
    name: "ROLL PLUG",
    category: "Tools & Consumables",
    brand: "Fischer / Standard",
    model: "Wall Roll Plugs & Rustproof Drywall Screws (Box of 100)",
    description: "Heavy anchor nylon roll plugs and matching galvanized Phillips head screws for concrete/brick mounting.",
    unit: "BOX",
    purchasePrice: 450,
    sellingPrice: 850,
    stockQuantity: 40,
    minStock: 10,
    warrantyPeriod: "Standard",
    supplier: "National Hardware LK"
  },
  {
    id: "prod-27",
    code: "UTH-DIS-001",
    name: "CCTV DISPLAY / MONITOR",
    category: "Displays & Monitors",
    brand: "Hikvision / Dahua",
    model: "22-Inch Full HD 1080P 24/7 Security LED Monitor (HDMI/VGA)",
    description: "Continuous 24/7 operation LED display with wide viewing angles, anti-glare screen, and built-in speakers.",
    unit: "PCS",
    purchasePrice: 28000,
    sellingPrice: 37500,
    stockQuantity: 11,
    minStock: 3,
    warrantyPeriod: "2 Years Replacement",
    supplier: "Hikvision Sri Lanka Direct"
  },
  {
    id: "prod-28",
    code: "UTH-DIS-002",
    name: "CCTV DISPLAY / MONITOR",
    category: "Displays & Monitors",
    brand: "Hikvision / Dahua",
    model: "24-Inch Full HD Frameless Surveillance Monitor",
    description: "Ultra-thin bezel 24-inch security control display with vibrant colors and fast 75Hz refresh rate.",
    unit: "PCS",
    purchasePrice: 36000,
    sellingPrice: 46500,
    stockQuantity: 8,
    minStock: 2,
    warrantyPeriod: "2 Years Replacement",
    supplier: "Hikvision Sri Lanka Direct"
  },
  {
    id: "prod-29",
    code: "UTH-NET-001",
    name: "POE SWITCH",
    category: "Network & Switches",
    brand: "Hikvision / D-Link",
    model: "4-Port 10/100M PoE + 2 Uplink Switch (60W Total Power)",
    description: "4-Port Power over Ethernet switch with 250m long-range transmission mode for IP cameras.",
    unit: "PCS",
    purchasePrice: 9500,
    sellingPrice: 14500,
    stockQuantity: 15,
    minStock: 4,
    warrantyPeriod: "2 Years Warranty",
    supplier: "D-Link Sri Lanka"
  },
  {
    id: "prod-30",
    code: "UTH-NET-002",
    name: "POE SWITCH",
    category: "Network & Switches",
    brand: "Hikvision / D-Link",
    model: "8-Port Gigabit PoE+ Switch (120W Total Power)",
    description: "8-Port Gigabit PoE+ switch for high-bandwidth 4K IP cameras with intelligent power management.",
    unit: "PCS",
    purchasePrice: 19500,
    sellingPrice: 27500,
    stockQuantity: 12,
    minStock: 3,
    warrantyPeriod: "2 Years Warranty",
    supplier: "D-Link Sri Lanka"
  },
  {
    id: "prod-31",
    code: "UTH-NET-003",
    name: "NETWORK SWITCH",
    category: "Network & Switches",
    brand: "TP-Link / D-Link",
    model: "8-Port Gigabit Desktop Network Switch (LS1008G)",
    description: "Plug and play unmanaged Gigabit ethernet switch with energy-saving green technology.",
    unit: "PCS",
    purchasePrice: 4200,
    sellingPrice: 6500,
    stockQuantity: 24,
    minStock: 5,
    warrantyPeriod: "2 Years Warranty",
    supplier: "TP-Link Lanka"
  },
  {
    id: "prod-32",
    code: "UTH-NET-004",
    name: "ROUTER",
    category: "Network & Switches",
    brand: "TP-Link",
    model: "Archer AX12 Dual-Band Wi-Fi 6 Gigabit Router",
    description: "Next-gen Wi-Fi 6 router reaching speeds up to 1.5 Gbps with Beamforming signal boosting for smart homes.",
    unit: "PCS",
    purchasePrice: 11000,
    sellingPrice: 15800,
    stockQuantity: 14,
    minStock: 4,
    warrantyPeriod: "2 Years Warranty",
    supplier: "TP-Link Lanka"
  },
  {
    id: "prod-33",
    code: "UTH-RCK-001",
    name: "CCTV RACK",
    category: "Racks & Enclosures",
    brand: "ServerPro / LK Metal",
    model: "4U Wall Mount Equipment Rack with Glass Door & Fan",
    description: "Compact 4U wall mount lockable network rack for housing DVR/NVR, power supply, and patch panels safely.",
    unit: "PCS",
    purchasePrice: 10500,
    sellingPrice: 15500,
    stockQuantity: 10,
    minStock: 3,
    warrantyPeriod: "Standard",
    supplier: "ServerPro Lanka"
  },
  {
    id: "prod-34",
    code: "UTH-RCK-002",
    name: "NVR RACK",
    category: "Racks & Enclosures",
    brand: "ServerPro",
    model: "6U Wall Mount Deluxe Server & NVR Cabinet",
    description: "6U high ventilated server rack with removable side panels, cooling fan, and cable management tray.",
    unit: "PCS",
    purchasePrice: 14500,
    sellingPrice: 21500,
    stockQuantity: 8,
    minStock: 2,
    warrantyPeriod: "Standard",
    supplier: "ServerPro Lanka"
  },
  {
    id: "prod-35",
    code: "UTH-RCK-003",
    name: "DVR BOX",
    category: "Racks & Enclosures",
    brand: "SecureLock LK",
    model: "Heavy Gauge Metal Anti-Theft DVR / NVR Lockbox with Dual Key",
    description: "Wall-mountable anti-theft security enclosure designed to safeguard recording units from unauthorized tampering.",
    unit: "PCS",
    purchasePrice: 7200,
    sellingPrice: 10800,
    stockQuantity: 15,
    minStock: 4,
    warrantyPeriod: "Standard",
    supplier: "SecureLock LK"
  },
  {
    id: "prod-36",
    code: "UTH-CAB-005",
    name: "HDMI CABLE",
    category: "Cables & Wiring",
    brand: "GoldTech",
    model: "4K Ultra High Speed HDMI Cable (3 Meter / 5 Meter Gold Plated)",
    description: "Braided 4K 60Hz HDMI cable with aluminum alloy shell for crystal clear connection between DVR/NVR and TV/Monitor.",
    unit: "PCS",
    purchasePrice: 1200,
    sellingPrice: 2200,
    stockQuantity: 50,
    minStock: 10,
    warrantyPeriod: "1 Year",
    supplier: "GoldTech Hardware"
  },
  {
    id: "prod-37",
    code: "UTH-CAB-006",
    name: "VGA CABLE",
    category: "Cables & Wiring",
    brand: "GoldTech",
    model: "Full HD 1080P VGA Male to Male Cable (1.5M / 3M)",
    description: "Dual ferrite core shielded VGA video monitor connection cable.",
    unit: "PCS",
    purchasePrice: 850,
    sellingPrice: 1500,
    stockQuantity: 35,
    minStock: 8,
    warrantyPeriod: "1 Year",
    supplier: "GoldTech Hardware"
  },
  {
    id: "prod-38",
    code: "UTH-STO-001",
    name: "MICRO SD CARD",
    category: "Storage & Hard Disks",
    brand: "SanDisk / Hikvision",
    model: "64GB / 128GB High Endurance Surveillance MicroSD Card",
    description: "Designed for continuous recording in Wi-Fi and standalone IP cameras with Class 10 U3 speed ratings.",
    unit: "PCS",
    purchasePrice: 2600,
    sellingPrice: 4200,
    stockQuantity: 40,
    minStock: 10,
    warrantyPeriod: "2 Years Replacement",
    supplier: "SanDisk Lanka"
  },
  {
    id: "prod-39",
    code: "UTH-PWR-004",
    name: "UPS",
    category: "Power & SMPS",
    brand: "Prolink / APC",
    model: "Prolink 650VA / 1200VA Line Interactive Offline UPS for CCTV",
    description: "Provides uninterrupted power backup and AVR surge protection for DVR, NVR, and cameras during power outages.",
    unit: "PCS",
    purchasePrice: 13500,
    sellingPrice: 18500,
    stockQuantity: 14,
    minStock: 4,
    warrantyPeriod: "2 Years Warranty",
    supplier: "Prolink Lanka"
  },
  {
    id: "prod-40",
    code: "UTH-NET-005",
    name: "NETWORK ACCESS POINT",
    category: "Smart Security & Access Points",
    brand: "Ruijie Reyee / Ubiquiti",
    model: "Gigabit Dual-Band Ceiling Mount Mesh Wi-Fi Access Point",
    description: "High-density long range Wi-Fi access point covering up to 3000 sq ft for homes, hotels, and offices.",
    unit: "PCS",
    purchasePrice: 18000,
    sellingPrice: 26500,
    stockQuantity: 11,
    minStock: 3,
    warrantyPeriod: "3 Years Warranty",
    supplier: "Ruijie Lanka"
  },
  {
    id: "prod-41",
    code: "UTH-NET-006",
    name: "WIFI ROUTER",
    category: "Network & Switches",
    brand: "Huawei / D-Link",
    model: "4G LTE Sim-Card High-Power Wi-Fi Router (External Antennas)",
    description: "Accepts any Sri Lankan 4G SIM (Dialog, Mobitel, Airtel, Hutch) to provide dedicated internet to remote CCTV sites.",
    unit: "PCS",
    purchasePrice: 14500,
    sellingPrice: 21500,
    stockQuantity: 10,
    minStock: 3,
    warrantyPeriod: "1 Year Warranty",
    supplier: "D-Link Sri Lanka"
  }
];

// Pre-populated Standard Installation & Service items
export const INITIAL_INSTALLATION_SERVICES: InstallationItem[] = [
  { id: "inst-1", srNo: 1, serviceName: "Camera Installation & Alignment", description: "Per camera mounting, precision angle calibration, focus tuning, and weatherproof sealing.", unit: "PCS", qty: 4, rate: 3000, amount: 12000 },
  { id: "inst-2", srNo: 2, serviceName: "DVR / NVR System Configuration", description: "Hard disk installation, firmware update, recording schedules, motion detection zones, and password lockdown.", unit: "JOB", qty: 1, rate: 5000, amount: 5000 },
  { id: "inst-3", srNo: 3, serviceName: "CCTV Cabling & Conduit / Casing Fitting", description: "Neat surface casing or conduit pipe routing per meter including clips, roll plugs, and wall anchors.", unit: "MTR", qty: 80, rate: 100, amount: 8000 },
  { id: "inst-4", srNo: 4, serviceName: "Mobile App & Cloud P2P Remote Setup", description: "Hik-Connect / DMSS mobile application installation, user account creation, and live notification alerts on 2 phones.", unit: "JOB", qty: 1, rate: 3500, amount: 3500 },
  { id: "inst-5", srNo: 5, serviceName: "Network / Switch Configuration", description: "PoE switch termination, IP subnet allocation, and VLAN security isolation.", unit: "JOB", qty: 1, rate: 4500, amount: 4500 },
  { id: "inst-6", srNo: 6, serviceName: "System Testing, Training & Handover", description: "Day/night image verification, playback training for owner/staff, and warranty documentation sign-off.", unit: "JOB", qty: 1, rate: 2500, amount: 2500 }
];

// Seed Customers
export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: "cust-1",
    customerCode: "CUST-001",
    name: "Dr. Asela Jayawardena",
    companyName: "Jayawardena Healthcare Clinic",
    nicBrNumber: "197829401928 / PV-94810",
    phone: "077 348 9102",
    whatsapp: "+94773489102",
    email: "asela.jayawardena@gmail.com",
    address: "No. 128, Galle Road, Colombo 03",
    city: "Colombo",
    province: "Western Province",
    siteAddress: "Jayawardena Specialist Clinic, Colombo 03",
    notes: "Requires 8-camera 5MP ColorVu package with audio in consultation waiting areas.",
    createdAt: "2026-08-15T10:00:00.000Z"
  },
  {
    id: "cust-2",
    customerCode: "CUST-002",
    name: "Mr. Dilsara Fernando",
    companyName: "Dilsara Supermarket (Pvt) Ltd",
    nicBrNumber: "PV-104928",
    phone: "071 829 4410",
    whatsapp: "+94718294410",
    email: "dilsarasuper@sltnet.lk",
    address: "No. 45, High Level Road, Maharagama",
    city: "Maharagama",
    province: "Western Province",
    siteAddress: "Supermarket Main Floor & Warehouse Loading Bay",
    notes: "Upgrading existing analog cameras to 16CH 4K IP PoE setup with 2x 4TB HDDs.",
    createdAt: "2026-08-18T14:30:00.000Z"
  },
  {
    id: "cust-3",
    customerCode: "CUST-003",
    name: "Mrs. Shamila Senaratne",
    companyName: "Blue Horizon Luxury Villa",
    phone: "076 910 2233",
    whatsapp: "+94769102233",
    email: "reservations@bluehorizonvilla.com",
    address: "Beach Road, Unawatuna, Galle",
    city: "Galle",
    province: "Southern Province",
    siteAddress: "Beachfront Villa & Guest Entry Gate",
    notes: "Requires discreet weatherproof cameras with full-color night vision and long-range Wi-Fi mesh.",
    createdAt: "2026-08-20T09:15:00.000Z"
  },
  {
    id: "cust-4",
    customerCode: "CUST-004",
    name: "Eng. Chaminda Wickramasinghe",
    phone: "072 559 8812",
    whatsapp: "+94725598812",
    email: "chaminda.wick@yahoo.com",
    address: "No. 18/4, Lake Drive, Rajagiriya",
    city: "Rajagiriya",
    province: "Western Province",
    siteAddress: "Private 2-Story Residence, Rajagiriya",
    notes: "4-Camera residential ColorVu setup with 1TB HDD and smartphone live notifications.",
    createdAt: "2026-08-22T11:45:00.000Z"
  }
];

// Seed Quotations
export const INITIAL_QUOTATIONS: Quotation[] = [
  {
    id: "qt-1",
    quotationNumber: "QT-2026-0001",
    date: "2026-08-25",
    validUntil: "2026-09-01",
    customerId: "cust-4",
    customerName: "Eng. Chaminda Wickramasinghe",
    customerPhone: "072 559 8812",
    customerWhatsapp: "+94725598812",
    customerEmail: "chaminda.wick@yahoo.com",
    customerAddress: "No. 18/4, Lake Drive, Rajagiriya",
    siteAddress: "Private 2-Story Residence, Rajagiriya",
    items: [
      {
        id: "qi-1",
        srNo: 1,
        productId: "prod-1",
        description: "CCTV CAMERA",
        model: "5MP ColorVu 24/7 Full Color Bullet (Hikvision)",
        unit: "PCS",
        qty: 4,
        rate: 12800,
        amount: 51200,
        warranty: "2 Years"
      },
      {
        id: "qi-2",
        srNo: 2,
        productId: "prod-4",
        description: "DVR",
        model: "4-Channel 5MP AcuSense Turbo HD DVR (Hikvision)",
        unit: "PCS",
        qty: 1,
        rate: 19500,
        amount: 19500,
        warranty: "2 Years"
      },
      {
        id: "qi-3",
        srNo: 3,
        productId: "prod-8",
        description: "HARD DISK / SURVEILLANCE HDD",
        model: "1TB WD Purple 24/7 Surveillance Hard Drive",
        unit: "PCS",
        qty: 1,
        rate: 22500,
        amount: 22500,
        warranty: "2 Years"
      },
      {
        id: "qi-4",
        srNo: 4,
        productId: "prod-11",
        description: "POWER SUPPLY",
        model: "12V 5A Centralized CCTV Power Supply",
        unit: "PCS",
        qty: 1,
        rate: 3800,
        amount: 3800,
        warranty: "1 Year"
      },
      {
        id: "qi-5",
        srNo: 5,
        productId: "prod-14",
        description: "CAMERA CABLE",
        model: "3+1 Pure Copper Coaxial CCTV Cable",
        unit: "MTR",
        qty: 80,
        rate: 160,
        amount: 12800,
        warranty: "10 Years"
      },
      {
        id: "qi-6",
        srNo: 6,
        productId: "prod-22",
        description: "CAMERA JUNCTION BOX",
        model: "Waterproof IP66 Deep PVC Junction Base (4x4)",
        unit: "PCS",
        qty: 4,
        rate: 550,
        amount: 2200,
        warranty: "Standard"
      },
      {
        id: "qi-7",
        srNo: 7,
        productId: "prod-18",
        description: "BNC CONNECTOR",
        model: "Heavy Duty Pure Copper Spring BNC Male",
        unit: "PCS",
        qty: 8,
        rate: 150,
        amount: 1200,
        warranty: "Standard"
      },
      {
        id: "qi-8",
        srNo: 8,
        productId: "prod-19",
        description: "POWER CONNECTOR",
        model: "12V DC Male & Female Connectors",
        unit: "PCS",
        qty: 4,
        rate: 120,
        amount: 480,
        warranty: "Standard"
      },
      {
        id: "qi-9",
        srNo: 9,
        productId: "prod-36",
        description: "HDMI CABLE",
        model: "4K High Speed HDMI Cable (3 Meter)",
        unit: "PCS",
        qty: 1,
        rate: 2200,
        amount: 2200,
        warranty: "1 Year"
      }
    ],
    installationItems: [
      {
        id: "inst-q1",
        srNo: 1,
        serviceName: "Camera Installation & Alignment",
        description: "4x Outdoor and perimeter precision mounting & day/night tuning",
        unit: "PCS",
        qty: 4,
        rate: 3000,
        amount: 12000
      },
      {
        id: "inst-q2",
        srNo: 2,
        serviceName: "DVR System Configuration",
        description: "1TB HDD setup, AcuSense human filter, recording schedule",
        unit: "JOB",
        qty: 1,
        rate: 4500,
        amount: 4500
      },
      {
        id: "inst-q3",
        srNo: 3,
        serviceName: "Mobile App Setup & Remote Viewing",
        description: "Hik-Connect live streaming configuration on 2 client smartphones",
        unit: "JOB",
        qty: 1,
        rate: 3500,
        amount: 3500
      }
    ],
    itemTotal: 115880,
    installationTotal: 20000,
    transportCharges: 2500,
    otherCharges: 0,
    subTotal: 138380,
    discountType: "amount",
    discountValue: 8380,
    discountAmount: 8380,
    vatEnabled: false,
    vatPercent: 0,
    vatAmount: 0,
    grandTotal: 130000,
    notes: [
      "Quotation is valid only for 7 days from issue date.",
      "Warranty: 2 Years for Cameras, DVR and Surveillance HDD.",
      "Installation warranty: 6 Months free on-site service.",
      "Payment terms: 50% advance before starting, 50% upon successful handover.",
      "Customer must provide uninterrupted 230V power point and Wi-Fi internet for mobile view."
    ],
    warrantyDetails: {
      cameraWarranty: "2 Years Replacement Warranty",
      nvrWarranty: "2 Years Hardware Warranty",
      hddWarranty: "2 Years Manufacturer Warranty",
      installationWarranty: "6 Months Free On-Site Maintenance"
    },
    paymentTerms: "50% Advance with confirmation, 50% upon installation and live mobile handover.",
    jobDuration: "1 Working Day",
    status: "APPROVED",
    createdAt: "2026-08-25T11:00:00.000Z",
    updatedAt: "2026-08-26T09:00:00.000Z"
  },
  {
    id: "qt-2",
    quotationNumber: "QT-2026-0002",
    date: "2026-08-28",
    validUntil: "2026-09-04",
    customerId: "cust-1",
    customerName: "Dr. Asela Jayawardena",
    customerCompany: "Jayawardena Healthcare Clinic",
    customerPhone: "077 348 9102",
    customerWhatsapp: "+94773489102",
    customerEmail: "asela.jayawardena@gmail.com",
    customerAddress: "No. 128, Galle Road, Colombo 03",
    siteAddress: "Jayawardena Specialist Clinic, Colombo 03",
    items: [
      {
        id: "qi-21",
        srNo: 1,
        productId: "prod-2",
        description: "CCTV CAMERA",
        model: "5MP ColorVu Indoor Eyeball Dome with Audio (DS-2CE70KF0T-MFS)",
        unit: "PCS",
        qty: 6,
        rate: 11500,
        amount: 69000,
        warranty: "2 Years"
      },
      {
        id: "qi-22",
        srNo: 2,
        productId: "prod-1",
        description: "CCTV CAMERA",
        model: "5MP ColorVu Outdoor Bullet (DS-2CE10KF0T-FS)",
        unit: "PCS",
        qty: 2,
        rate: 12800,
        amount: 25600,
        warranty: "2 Years"
      },
      {
        id: "qi-23",
        srNo: 3,
        productId: "prod-5",
        description: "DVR",
        model: "8-Channel 5MP AcuSense XVR Turbo HD Recorder",
        unit: "PCS",
        qty: 1,
        rate: 28500,
        amount: 28500,
        warranty: "2 Years"
      },
      {
        id: "qi-24",
        srNo: 4,
        productId: "prod-9",
        description: "HARD DISK / SURVEILLANCE HDD",
        model: "2TB WD Purple 24/7 Surveillance Hard Drive",
        unit: "PCS",
        qty: 1,
        rate: 31500,
        amount: 31500,
        warranty: "2 Years"
      },
      {
        id: "qi-25",
        srNo: 5,
        productId: "prod-12",
        description: "SMPS",
        model: "12V 10A 9-Channel SMPS Metal Box with Key Lock",
        unit: "PCS",
        qty: 1,
        rate: 7500,
        amount: 7500,
        warranty: "1 Year"
      },
      {
        id: "qi-26",
        srNo: 6,
        productId: "prod-14",
        description: "CAMERA CABLE",
        model: "3+1 Pure Copper CCTV Coaxial Cable",
        unit: "MTR",
        qty: 150,
        rate: 160,
        amount: 24000,
        warranty: "10 Years"
      },
      {
        id: "qi-27",
        srNo: 7,
        productId: "prod-27",
        description: "CCTV DISPLAY / MONITOR",
        model: "22-Inch Full HD 1080P Surveillance LED Monitor",
        unit: "PCS",
        qty: 1,
        rate: 37500,
        amount: 37500,
        warranty: "2 Years"
      },
      {
        id: "qi-28",
        srNo: 8,
        productId: "prod-33",
        description: "CCTV RACK",
        model: "4U Wall Mount Equipment Rack with Glass Door",
        unit: "PCS",
        qty: 1,
        rate: 15500,
        amount: 15500,
        warranty: "Standard"
      }
    ],
    installationItems: [
      {
        id: "inst-21",
        srNo: 1,
        serviceName: "Camera Installation & Wiring",
        description: "8 Camera positions inside consultation rooms & entry gates",
        unit: "PCS",
        qty: 8,
        rate: 3000,
        amount: 24000
      },
      {
        id: "inst-22",
        srNo: 2,
        serviceName: "DVR & Wall Rack Installation",
        description: "Rack mounting, cable termination, and 2TB HDD format",
        unit: "JOB",
        qty: 1,
        rate: 6500,
        amount: 6500
      },
      {
        id: "inst-23",
        srNo: 3,
        serviceName: "Network & Mobile Remote Setup",
        description: "App configuration for doctors & receptionist PC monitor setup",
        unit: "JOB",
        qty: 1,
        rate: 4500,
        amount: 4500
      }
    ],
    itemTotal: 239100,
    installationTotal: 35000,
    transportCharges: 0,
    otherCharges: 0,
    subTotal: 274100,
    discountType: "amount",
    discountValue: 14100,
    discountAmount: 14100,
    vatEnabled: false,
    vatPercent: 0,
    vatAmount: 0,
    grandTotal: 260000,
    notes: [
      "Quotation valid for 7 days.",
      "2 Years Warranty for Cameras, DVR, Monitor and Hard Disk.",
      "Payment terms: 50% advance, 50% upon final handover.",
      "All cables will be concealed using neat PVC white casing."
    ],
    warrantyDetails: {
      cameraWarranty: "2 Years Comprehensive Replacement",
      nvrWarranty: "2 Years Hardware Warranty",
      hddWarranty: "2 Years Manufacturer Warranty",
      installationWarranty: "6 Months Free Service Guarantee"
    },
    paymentTerms: "50% Advance with confirmation, 50% on project handover.",
    jobDuration: "2 Working Days",
    status: "PENDING",
    createdAt: "2026-08-28T14:20:00.000Z",
    updatedAt: "2026-08-28T14:20:00.000Z"
  }
];

// Seed Invoices
export const INITIAL_INVOICES: Invoice[] = [
  {
    id: "inv-1",
    invoiceNumber: "INV-2026-0001",
    invoiceDate: "2026-08-26",
    dueDate: "2026-09-02",
    quotationNumber: "QT-2026-0001",
    quotationId: "qt-1",
    customerId: "cust-4",
    customerName: "Eng. Chaminda Wickramasinghe",
    customerPhone: "072 559 8812",
    customerWhatsapp: "+94725598812",
    customerEmail: "chaminda.wick@yahoo.com",
    customerAddress: "No. 18/4, Lake Drive, Rajagiriya",
    siteAddress: "Private 2-Story Residence, Rajagiriya",
    items: [
      { id: "ii-1", srNo: 1, description: "CCTV CAMERA", model: "5MP ColorVu 24/7 Full Color Bullet (Hikvision)", unit: "PCS", qty: 4, rate: 12800, amount: 51200, warranty: "2 Years" },
      { id: "ii-2", srNo: 2, description: "DVR", model: "4-Channel 5MP AcuSense Turbo HD DVR", unit: "PCS", qty: 1, rate: 19500, amount: 19500, warranty: "2 Years" },
      { id: "ii-3", srNo: 3, description: "HARD DISK / SURVEILLANCE HDD", model: "1TB WD Purple Surveillance Hard Drive", unit: "PCS", qty: 1, rate: 22500, amount: 22500, warranty: "2 Years" },
      { id: "ii-4", srNo: 4, description: "POWER SUPPLY", model: "12V 5A Centralized CCTV Power Supply", unit: "PCS", qty: 1, rate: 3800, amount: 3800, warranty: "1 Year" },
      { id: "ii-5", srNo: 5, description: "CAMERA CABLE", model: "3+1 Pure Copper Coaxial CCTV Cable", unit: "MTR", qty: 80, rate: 160, amount: 12800, warranty: "10 Years" },
      { id: "ii-6", srNo: 6, description: "ACCESSORIES & CONNECTORS", model: "Junction Boxes (4), BNC (8), DC Jacks (4), HDMI Cable", unit: "SET", qty: 1, rate: 6080, amount: 6080, warranty: "Standard" }
    ],
    installationItems: [
      { id: "inst-inv-1", srNo: 1, serviceName: "Complete Camera Mounting, Cabling & Setup", description: "4-Point installation, wiring, DVR setup & mobile app handover", unit: "JOB", qty: 1, rate: 20000, amount: 20000 }
    ],
    itemTotal: 115880,
    installationTotal: 20000,
    transportCharges: 2500,
    otherCharges: 0,
    subTotal: 138380,
    discountAmount: 8380,
    vatAmount: 0,
    grandTotal: 130000,
    amountPaid: 65000,
    balanceDue: 65000,
    paymentStatus: "PARTIALLY PAID",
    paymentTerms: "50% Advance Received. Balance due upon final camera testing.",
    notes: [
      "Thank you for choosing Unity Tech Hub.",
      "Hardware warranty valid for 2 Years with official warranty certificate.",
      "For emergency support or camera assistance, contact 072 740 2288."
    ],
    warrantyDetails: {
      cameraWarranty: "2 Years Comprehensive Replacement",
      nvrWarranty: "2 Years Hardware Warranty",
      hddWarranty: "2 Years Manufacturer Warranty",
      installationWarranty: "6 Months Free On-Site Maintenance"
    },
    createdAt: "2026-08-26T10:00:00.000Z",
    updatedAt: "2026-08-26T10:30:00.000Z"
  }
];

// Seed Payments
export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: "pay-1",
    invoiceId: "inv-1",
    invoiceNumber: "INV-2026-0001",
    customerId: "cust-4",
    customerName: "Eng. Chaminda Wickramasinghe",
    paymentDate: "2026-08-26",
    paymentMethod: "Bank Transfer",
    amount: 65000,
    referenceNumber: "TXN-COMB-98241029",
    notes: "50% Advance payment deposited to Commercial Bank account.",
    recordedBy: "Super Admin",
    createdAt: "2026-08-26T10:30:00.000Z"
  }
];

export const INITIAL_USERS: AppUser[] = [
  {
    id: "usr-1",
    name: "Kasun Jayasundara",
    email: "admin@unitytechhub.lk",
    role: "Super Admin",
    phone: "072 740 2288"
  },
  {
    id: "usr-2",
    name: "Niroshan Bandara",
    email: "tech@unitytechhub.lk",
    role: "Technician",
    phone: "072 740 2288"
  }
];

// 7 Leading Sri Lankan CCTV & IT Suppliers
export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: "sup-1",
    supplierCode: "SUP-001",
    name: "Redington Sri Lanka (Pvt) Ltd",
    company: "Redington Gulf / Sri Lanka",
    phone: "011 476 8000",
    whatsapp: "+94772004500",
    email: "cctv.sales@redington.lk",
    address: "No. 320, T.B. Jayah Mawatha, Colombo 10",
    website: "https://redington.lk",
    productCategories: ["CCTV Cameras", "Recorders (DVR/NVR)", "Cables & Wiring"],
    brandsDistributed: ["Hikvision", "Ezviz", "D-Link", "Western Digital"],
    paymentTerms: "30 Days Credit / PDC",
    rating: 5,
    notes: "Direct authorized national distributor for Hikvision in Sri Lanka with full warranty replacement support.",
    createdAt: "2026-01-15T09:00:00.000Z"
  },
  {
    id: "sup-2",
    supplierCode: "SUP-002",
    name: "Metropolitan Technologies (Pvt) Ltd",
    company: "Metropolitan Group Sri Lanka",
    phone: "011 470 0200",
    whatsapp: "+94777329100",
    email: "surveillance@metropolitan.lk",
    address: "No. 85, Braybrooke Place, Colombo 02",
    website: "https://metropolitan.lk",
    productCategories: ["CCTV Cameras", "Recorders (DVR/NVR)", "Displays & Monitors", "Network & Switches"],
    brandsDistributed: ["Hikvision", "AcuSense", "Canon", "Ubiquiti"],
    paymentTerms: "14 Days PDC",
    rating: 5,
    notes: "Official distributor for enterprise CCTV, 4K NVRs, and commercial monitors.",
    createdAt: "2026-01-20T10:00:00.000Z"
  },
  {
    id: "sup-3",
    supplierCode: "SUP-003",
    name: "Singer Sri Lanka PLC - Commercial",
    company: "Singer Sri Lanka PLC",
    phone: "011 540 0400",
    whatsapp: "+94773800200",
    email: "commercial.cctv@singersl.com",
    address: "No. 112, Havelock Road, Colombo 05",
    website: "https://singersl.com",
    productCategories: ["CCTV Cameras", "Recorders (DVR/NVR)", "Displays & Monitors"],
    brandsDistributed: ["Hikvision", "Dahua", "Singer CCTV", "Dell"],
    paymentTerms: "Cash / PDC",
    rating: 4,
    notes: "Wide retail network and fast islandwide branch dispatch for standard CCTV kits.",
    createdAt: "2026-02-01T11:00:00.000Z"
  },
  {
    id: "sup-4",
    supplierCode: "SUP-004",
    name: "Barclays Computers (Pvt) Ltd",
    company: "Barclays Technology",
    phone: "011 462 0000",
    whatsapp: "+94777123999",
    email: "sales@barclays.lk",
    address: "No. 110, Galle Road, Colombo 04",
    website: "https://barclays.lk",
    productCategories: ["Storage & Hard Disks", "Network & Switches", "Tools & Consumables"],
    brandsDistributed: ["Western Digital Purple", "Seagate SkyHawk", "D-Link", "TP-Link"],
    paymentTerms: "Immediate Bank Transfer / Cash on Delivery",
    rating: 5,
    notes: "Primary supplier for 1TB, 2TB, 4TB WD Purple and Seagate SkyHawk surveillance HDDs.",
    createdAt: "2026-02-10T12:00:00.000Z"
  },
  {
    id: "sup-5",
    supplierCode: "SUP-005",
    name: "Winsoft Technologies (Pvt) Ltd",
    company: "Winsoft Lanka",
    phone: "011 257 8888",
    whatsapp: "+94771458920",
    email: "cctv@winsoft.lk",
    address: "No. 42, Unity Plaza, Colombo 04",
    website: "https://winsoft.lk",
    productCategories: ["Power & SMPS", "Connectors & Accessories", "Cables & Wiring"],
    brandsDistributed: ["Dahua", "Belden", "Hunt CCTV", "Cisco"],
    paymentTerms: "Credit 15 Days",
    rating: 4,
    notes: "Reliable bulk supplier for BNC connectors, central 12V 10A/20A power supply boxes, and 305m Cat6 cable rolls.",
    createdAt: "2026-02-18T14:00:00.000Z"
  }
];

// Initial Site Surveys
export const INITIAL_SITE_SURVEYS: SiteSurvey[] = [
  {
    id: "surv-1",
    surveyNumber: "SURV-2026-0001",
    date: "2026-08-20",
    customerId: "cust-1",
    customerName: "Eng. Samantha Perera",
    customerPhone: "077 345 6789",
    customerEmail: "samantha.perera@gmail.com",
    siteAddress: "No. 142/B, Flower Road, Colombo 07",
    propertyType: "Residential Home",
    technicianName: "Niroshan Bandara",
    systemType: "HD CCTV",
    cameraCount: 4,
    cameraLocations: [
      {
        id: "cl-1",
        cameraNo: 1,
        locationName: "Main Entrance Gate & Driveway",
        cameraType: "ColorVu Camera",
        model: "Hikvision 5MP ColorVu Audio Bullet (DS-2CE10KF0T-FS)",
        resolution: "5MP (Ultra HD)",
        distanceMeters: 35,
        cableType: "RG59 Coaxial Cable + Power",
        mountingType: "Wall Mount",
        casingConduit: "20mm PVC Conduit",
        indoorOutdoor: "Outdoor Weatherproof (IP67)",
        audioRequired: true,
        notes: "Positioned high for full number plate and face coverage day & night."
      },
      {
        id: "cl-2",
        cameraNo: 2,
        locationName: "Front Garden & Porch",
        cameraType: "ColorVu Camera",
        model: "Hikvision 2MP ColorVu Bullet (DS-2CE10DF0T-FS)",
        resolution: "2MP (1080P)",
        distanceMeters: 25,
        cableType: "RG59 Coaxial Cable + Power",
        mountingType: "Wall Mount",
        casingConduit: "PVC Casing (1x1/2)",
        indoorOutdoor: "Outdoor Weatherproof (IP67)",
        audioRequired: true
      },
      {
        id: "cl-3",
        cameraNo: 3,
        locationName: "Rear Garden & Kitchen Backdoor",
        cameraType: "ColorVu Camera",
        model: "Hikvision 2MP ColorVu Bullet (DS-2CE10DF0T-FS)",
        resolution: "2MP (1080P)",
        distanceMeters: 40,
        cableType: "RG59 Coaxial Cable + Power",
        mountingType: "Wall Mount",
        casingConduit: "20mm PVC Conduit",
        indoorOutdoor: "Outdoor Weatherproof (IP67)",
        audioRequired: false
      },
      {
        id: "cl-4",
        cameraNo: 4,
        locationName: "Living Room / Main Corridor",
        cameraType: "Dome Camera",
        model: "Hikvision 2MP HD Dome (DS-2CE76D0T-EXIPF)",
        resolution: "2MP (1080P)",
        distanceMeters: 15,
        cableType: "RG59 Coaxial Cable + Power",
        mountingType: "Ceiling Mount",
        casingConduit: "PVC Casing (1x1/2)",
        indoorOutdoor: "Indoor",
        audioRequired: false
      }
    ],
    dvrNvrLocation: "Master Bedroom Wardrobe Top Shelf",
    monitorLocation: "Living Room TV (HDMI Splitter)",
    monitorSize: "None / Client Monitor",
    powerPointsAvailable: true,
    suggestedPowerSupply: "12V 10A Central SMPS",
    storageDaysRequired: 30,
    recordingMode: "AI Smart Event / AcuSense",
    suggestedHddCapacity: "1TB Surveillance HDD",
    internetAvailable: true,
    ispType: "SLT Fiber",
    wifiStrength: "Strong",
    remoteViewingDevices: 3,
    totalCalculatedCableMeters: 115,
    extraSparePercent: 10,
    totalFinalCableMeters: 130,
    totalCasingMeters: 40,
    totalConduitMeters: 75,
    specialRequirements: "Neat casing along skirting. Mobile live viewing for 2 iPhones and 1 Android phone.",
    status: "Completed",
    convertedQuotationId: "qt-1",
    createdAt: "2026-08-20T14:30:00.000Z",
    updatedAt: "2026-08-20T16:00:00.000Z"
  }
];

// Initial Price History Records
export const INITIAL_PRICE_HISTORY: PriceHistoryRecord[] = [
  {
    id: "ph-1",
    productId: "prod-1",
    productName: "Hikvision 5MP ColorVu Audio Bullet Camera",
    model: "DS-2CE10KF0T-FS",
    brand: "Hikvision",
    date: "2026-08-01",
    marketPrice: 11800,
    purchasePrice: 9800,
    sellingPrice: 13500,
    sellerSource: "Redington Sri Lanka",
    recordedBy: "Super Admin",
    notes: "Price stable. Distributor promo discount."
  },
  {
    id: "ph-2",
    productId: "prod-7",
    productName: "WD Purple 2TB Surveillance Hard Drive",
    model: "WD23PURZ",
    brand: "Western Digital",
    date: "2026-08-15",
    marketPrice: 22800,
    purchasePrice: 19500,
    sellingPrice: 24500,
    sellerSource: "Barclays Computers",
    recordedBy: "Super Admin"
  }
];

// Initial Stock Movements
export const INITIAL_STOCK_MOVEMENTS: StockMovement[] = [
  {
    id: "sm-1",
    productId: "prod-1",
    productName: "Hikvision 2MP ColorVu Indoor Dome Camera",
    productCode: "UTH-CAM-001",
    type: "STOCK_IN",
    quantity: 30,
    previousStock: 0,
    newStock: 30,
    date: "2026-08-01T10:00:00.000Z",
    reason: "Distributor Wholesale Purchase - Redington SL",
    referenceNumber: "PO-RED-2026-081",
    performedBy: "Super Admin",
    notes: "Batch import with 2-Year Distributor Warranty"
  },
  {
    id: "sm-2",
    productId: "prod-4",
    productName: "Hikvision 4-Channel AcuSense Turbo HD DVR",
    productCode: "UTH-DVR-001",
    type: "STOCK_IN",
    quantity: 15,
    previousStock: 0,
    newStock: 15,
    date: "2026-08-01T10:30:00.000Z",
    reason: "Distributor Wholesale Purchase - Redington SL",
    referenceNumber: "PO-RED-2026-081",
    performedBy: "Super Admin"
  },
  {
    id: "sm-3",
    productId: "prod-1",
    productName: "Hikvision 2MP ColorVu Indoor Dome Camera",
    productCode: "UTH-CAM-001",
    type: "STOCK_OUT",
    quantity: 4,
    previousStock: 30,
    newStock: 26,
    date: "2026-08-25T14:30:00.000Z",
    reason: "Installation for Invoice INV-2026-0001",
    referenceNumber: "INV-2026-0001",
    performedBy: "Kasun Jayawardena (Senior Technician)",
    notes: "Site: Residence - Rajagiriya"
  },
  {
    id: "sm-4",
    productId: "prod-8",
    productName: "WD Purple 1TB Surveillance Hard Drive",
    productCode: "UTH-HDD-001",
    type: "STOCK_OUT",
    quantity: 1,
    previousStock: 18,
    newStock: 17,
    date: "2026-08-25T14:30:00.000Z",
    reason: "Installation for Invoice INV-2026-0001",
    referenceNumber: "INV-2026-0001",
    performedBy: "Kasun Jayawardena (Senior Technician)"
  },
  {
    id: "sm-5",
    productId: "prod-14",
    productName: "RG59 Coaxial Video + 2-Core Power Cable (100m Roll)",
    productCode: "UTH-CAB-001",
    type: "ADJUSTMENT",
    quantity: -1,
    previousStock: 25,
    newStock: 24,
    date: "2026-08-28T16:00:00.000Z",
    reason: "Damaged outer drum in transport",
    referenceNumber: "ADJ-2026-001",
    performedBy: "Super Admin"
  }
];

// Initial Serial Numbers (#50)
export const INITIAL_SERIAL_NUMBERS: SerialNumberRecord[] = [
  {
    id: "sn-1",
    serialNumber: "HKV202688912",
    productId: "prod-1",
    productName: "Hikvision 2MP ColorVu Indoor Dome Camera",
    brand: "Hikvision",
    model: "DS-2CE70DF0T-PF",
    category: "CCTV Cameras",
    status: "INSTALLED",
    customerId: "cust-1",
    customerName: "Eng. Samantha Perera",
    siteAddress: "No. 42, Temple Road, Rajagiriya",
    invoiceNumber: "INV-2026-0001",
    purchaseDate: "2026-08-01",
    installationDate: "2026-08-25",
    warrantyPeriod: "2 Years",
    warrantyStartDate: "2026-08-25",
    warrantyEndDate: "2028-08-25",
    expectedUsefulLife: "3-5 Years (Estimated)",
    technicianName: "Kasun Jayawardena",
    notes: "Mounted at Living Room Entrance",
    createdAt: "2026-08-25T14:30:00.000Z"
  },
  {
    id: "sn-2",
    serialNumber: "HKV202688913",
    productId: "prod-2",
    productName: "Hikvision 2MP ColorVu Outdoor Bullet Camera",
    brand: "Hikvision",
    model: "DS-2CE10DF0T-FS",
    category: "CCTV Cameras",
    status: "INSTALLED",
    customerId: "cust-1",
    customerName: "Eng. Samantha Perera",
    siteAddress: "No. 42, Temple Road, Rajagiriya",
    invoiceNumber: "INV-2026-0001",
    purchaseDate: "2026-08-01",
    installationDate: "2026-08-25",
    warrantyPeriod: "2 Years",
    warrantyStartDate: "2026-08-25",
    warrantyEndDate: "2028-08-25",
    expectedUsefulLife: "3-5 Years (Estimated)",
    technicianName: "Kasun Jayawardena",
    notes: "Mounted at Main Gate Perimeter",
    createdAt: "2026-08-25T14:30:00.000Z"
  },
  {
    id: "sn-3",
    serialNumber: "WDP202699418",
    productId: "prod-8",
    productName: "WD Purple 1TB Surveillance Hard Drive",
    brand: "Western Digital",
    model: "WD11PURZ",
    category: "Storage & Hard Disks",
    status: "INSTALLED",
    customerId: "cust-1",
    customerName: "Eng. Samantha Perera",
    siteAddress: "No. 42, Temple Road, Rajagiriya",
    invoiceNumber: "INV-2026-0001",
    purchaseDate: "2026-08-01",
    installationDate: "2026-08-25",
    warrantyPeriod: "2 Years",
    warrantyStartDate: "2026-08-25",
    warrantyEndDate: "2028-08-25",
    expectedUsefulLife: "4-5 Years (Surveillance Rated)",
    technicianName: "Kasun Jayawardena",
    notes: "Installed inside Hikvision 4CH DVR",
    createdAt: "2026-08-25T14:30:00.000Z"
  },
  {
    id: "sn-4",
    serialNumber: "HKV202699501",
    productId: "prod-4",
    productName: "Hikvision 4-Channel AcuSense Turbo HD DVR",
    brand: "Hikvision",
    model: "iDS-7204HQHI-M1/S",
    category: "Recorders (DVR/NVR)",
    status: "IN_STOCK",
    warrantyPeriod: "2 Years",
    expectedUsefulLife: "4-6 Years (Estimated)",
    notes: "Main Store Colombo Rack A-01",
    createdAt: "2026-08-01T10:30:00.000Z"
  }
];

// Initial Customer Sites (#51)
export const INITIAL_CUSTOMER_SITES: CustomerSite[] = [
  {
    id: "site-1",
    customerId: "cust-1",
    siteName: "Primary Residence - Rajagiriya",
    address: "No. 42, Temple Road, Rajagiriya",
    contactPerson: "Eng. Samantha Perera",
    contactPhone: "077 345 6789",
    notes: "4-Camera ColorVu System active. Fiber router upstairs.",
    createdAt: "2026-08-20T09:00:00.000Z"
  },
  {
    id: "site-2",
    customerId: "cust-1",
    siteName: "Holiday Bungalow - Kandy",
    address: "River View Estate, Digana, Kandy",
    contactPerson: "Estate Caretaker (Banda)",
    contactPhone: "071 889 9122",
    notes: "Site survey completed for 8-Channel Solar 4G CCTV.",
    createdAt: "2026-08-28T10:00:00.000Z"
  },
  {
    id: "site-3",
    customerId: "cust-2",
    siteName: "Head Office & Showroom - Colombo 03",
    address: "No. 128, Galle Road, Colombo 03",
    contactPerson: "Mr. Rizwan Farook (MD)",
    contactPhone: "011 257 3400",
    notes: "16-Channel 4K NVR System active with 32\" Display.",
    createdAt: "2026-08-10T11:00:00.000Z"
  },
  {
    id: "site-4",
    customerId: "cust-2",
    siteName: "Warehouse - Kelaniya",
    address: "Peliyagoda Industrial Zone, Kelaniya",
    contactPerson: "Sunil (Warehouse Supervisor)",
    contactPhone: "077 982 1133",
    notes: "Proposed 8-Camera IP PoE setup with long-range Cat6 run.",
    createdAt: "2026-08-25T14:00:00.000Z"
  }
];

// Initial Installed Equipment Register (#28)
export const INITIAL_INSTALLED_EQUIPMENT: InstalledEquipmentItem[] = [
  {
    id: "inst-eq-1",
    customerId: "cust-1",
    siteId: "site-1",
    siteName: "Primary Residence - Rajagiriya",
    productId: "prod-1",
    productName: "Hikvision 2MP ColorVu Indoor Dome Camera",
    brand: "Hikvision",
    model: "DS-2CE70DF0T-PF",
    serialNumber: "HKV202688912",
    quantity: 2,
    installationDate: "2026-08-25",
    warrantyStartDate: "2026-08-25",
    warrantyEndDate: "2028-08-25",
    expectedUsefulLife: "3-5 Years (Estimated)",
    technicianName: "Kasun Jayawardena",
    invoiceNumber: "INV-2026-0001",
    notes: "Living Room & Kitchen Lobby"
  },
  {
    id: "inst-eq-2",
    customerId: "cust-1",
    siteId: "site-1",
    siteName: "Primary Residence - Rajagiriya",
    productId: "prod-2",
    productName: "Hikvision 2MP ColorVu Outdoor Bullet Camera",
    brand: "Hikvision",
    model: "DS-2CE10DF0T-FS",
    serialNumber: "HKV202688913",
    quantity: 2,
    installationDate: "2026-08-25",
    warrantyStartDate: "2026-08-25",
    warrantyEndDate: "2028-08-25",
    expectedUsefulLife: "3-5 Years (Estimated)",
    technicianName: "Kasun Jayawardena",
    invoiceNumber: "INV-2026-0001",
    notes: "Main Gate & Backyard Lawn"
  },
  {
    id: "inst-eq-3",
    customerId: "cust-1",
    siteId: "site-1",
    siteName: "Primary Residence - Rajagiriya",
    productId: "prod-4",
    productName: "Hikvision 4-Channel AcuSense Turbo HD DVR",
    brand: "Hikvision",
    model: "iDS-7204HQHI-M1/S",
    serialNumber: "DVR20264410",
    quantity: 1,
    installationDate: "2026-08-25",
    warrantyStartDate: "2026-08-25",
    warrantyEndDate: "2028-08-25",
    expectedUsefulLife: "4-6 Years (Estimated)",
    technicianName: "Kasun Jayawardena",
    invoiceNumber: "INV-2026-0001",
    notes: "Master Bedroom Wardrobe Setup with 1TB HDD"
  }
];

// Initial Warranty Claims (#53)
export const INITIAL_WARRANTY_CLAIMS: WarrantyClaim[] = [
  {
    id: "clm-1",
    claimNumber: "CLM-2026-001",
    customerId: "cust-1",
    customerName: "Eng. Samantha Perera",
    customerPhone: "077 345 6789",
    productId: "prod-2",
    productName: "Hikvision 2MP ColorVu Outdoor Bullet Camera",
    brand: "Hikvision",
    model: "DS-2CE10DF0T-FS",
    serialNumber: "HKV202688913",
    invoiceNumber: "INV-2026-0001",
    purchaseDate: "2026-08-25",
    warrantyPeriod: "2 Years",
    warrantyEndDate: "2028-08-25",
    problemDescription: "White auxiliary LED light on the outdoor bullet camera stays on continuously after heavy rain.",
    claimDate: "2026-09-01",
    technicianName: "Kasun Jayawardena",
    status: "UNDER REVIEW",
    resolutionNotes: "Technician scheduled for on-site inspection & light sensor recalibration."
  }
];

// Initial Service History Records (#52)
export const INITIAL_SERVICE_RECORDS: ServiceRecord[] = [
  {
    id: "srv-rec-1",
    serviceCode: "SRV-2026-001",
    customerId: "cust-1",
    customerName: "Eng. Samantha Perera",
    customerPhone: "077 345 6789",
    siteAddress: "No. 42, Temple Road, Rajagiriya",
    date: "2026-08-25",
    technicianName: "Kasun Jayawardena",
    serviceType: "Configuration & Remote Setup",
    problem: "Initial setup of 4-Channel ColorVu DVR, mobile live view config on 3 iPhones and 1 iPad.",
    solution: "Configured Hik-Connect Cloud P2P, customized motion notification schedules, verified 1080P recording playback.",
    partsUsed: [],
    laborCharge: 2000,
    totalAmount: 2000,
    warrantyGiven: "6 Months Support",
    status: "COMPLETED",
    notes: "Client signed off with satisfactory review.",
    createdAt: "2026-08-25T16:00:00.000Z"
  },
  {
    id: "srv-rec-2",
    serviceCode: "SRV-2026-002",
    customerId: "cust-2",
    customerName: "Colombo Textile Mills",
    customerPhone: "011 257 3400",
    siteAddress: "No. 128, Galle Road, Colombo 03",
    date: "2026-08-18",
    technicianName: "Niroshan Perera",
    serviceType: "Maintenance & Cleaning",
    problem: "Quarterly CCTV system maintenance & optical dome lens dust cleaning.",
    solution: "Cleaned 8 dome camera domes with anti-static solution, checked 12V 10A power supply voltages, formatted HDD partitions.",
    partsUsed: [
      {
        productId: "prod-18",
        productName: "Heavy Duty Pure Copper BNC Male Connector",
        qty: 2,
        unitPrice: 180,
        amount: 360
      }
    ],
    laborCharge: 4500,
    totalAmount: 4860,
    warrantyGiven: "30 Days On Service",
    status: "COMPLETED",
    notes: "All 8 channels tested clear 1080P.",
    createdAt: "2026-08-18T14:30:00.000Z"
  }
];

// ==========================================
// LOCAL STORAGE MANAGEMENT UTILITY
// ==========================================

const STORAGE_KEYS = {
  SETTINGS: 'uth_company_settings',
  CUSTOMERS: 'uth_customers',
  PRODUCTS: 'uth_products',
  CAMERA_MODELS: 'uth_camera_models',
  INSTALLATION_SERVICES: 'uth_installation_services',
  SERVICES: 'uth_services_list',
  QUOTATIONS: 'uth_quotations',
  INVOICES: 'uth_invoices',
  PAYMENTS: 'uth_payments',
  USERS: 'uth_users',
  AUTH: 'uth_current_user',
  SITE_SURVEYS: 'uth_site_surveys',
  SUPPLIERS: 'uth_suppliers',
  PRICE_HISTORY: 'uth_price_history',
  STOCK_MOVEMENTS: 'uth_stock_movements',
  SERIAL_NUMBERS: 'uth_serial_numbers',
  CUSTOMER_SITES: 'uth_customer_sites',
  INSTALLED_EQUIPMENT: 'uth_installed_equipment',
  WARRANTY_CLAIMS: 'uth_warranty_claims',
  SERVICE_RECORDS: 'uth_service_records'
};

class DatabaseStore {
  private getItem<T>(key: string, defaultVal: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultVal;
    } catch (e) {
      console.error(`Error loading ${key} from storage:`, e);
      return defaultVal;
    }
  }

  private setItem<T>(key: string, val: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error(`Error saving ${key} to storage:`, e);
    }
  }

  // Company Settings
  getSettings(): CompanySettings {
    return this.getItem<CompanySettings>(STORAGE_KEYS.SETTINGS, INITIAL_COMPANY_SETTINGS);
  }

  saveSettings(settings: CompanySettings): CompanySettings {
    this.setItem(STORAGE_KEYS.SETTINGS, settings);
    return settings;
  }

  // Customers
  getCustomers(): Customer[] {
    return this.getItem<Customer[]>(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
  }

  saveCustomer(customer: Customer): Customer {
    const list = this.getCustomers();
    const idx = list.findIndex(c => c.id === customer.id);
    if (idx >= 0) {
      list[idx] = customer;
    } else {
      list.unshift(customer);
    }
    this.setItem(STORAGE_KEYS.CUSTOMERS, list);
    return customer;
  }

  deleteCustomer(id: string): void {
    const list = this.getCustomers().filter(c => c.id !== id);
    this.setItem(STORAGE_KEYS.CUSTOMERS, list);
  }

  // Products
  getProducts(): Product[] {
    return this.getItem<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  }

  saveProduct(product: Product): Product {
    const list = this.getProducts();
    const idx = list.findIndex(p => p.id === product.id);
    if (idx >= 0) {
      list[idx] = product;
    } else {
      list.unshift(product);
    }
    this.setItem(STORAGE_KEYS.PRODUCTS, list);
    return product;
  }

  deleteProduct(id: string): void {
    const list = this.getProducts().filter(p => p.id !== id);
    this.setItem(STORAGE_KEYS.PRODUCTS, list);
  }

  archiveProduct(id: string, isArchived: boolean = true): void {
    const list = this.getProducts();
    const item = list.find(p => p.id === id);
    if (item) {
      item.isArchived = isArchived;
      this.setItem(STORAGE_KEYS.PRODUCTS, list);
    }
  }

  updateProductPriceAndStock(id: string, purchasePrice: number, sellingPrice: number, stockQuantity: number): void {
    const list = this.getProducts();
    const item = list.find(p => p.id === id);
    if (item) {
      item.purchasePrice = purchasePrice;
      item.sellingPrice = sellingPrice;
      item.stockQuantity = stockQuantity;
      this.setItem(STORAGE_KEYS.PRODUCTS, list);
    }
  }

  adjustProductStock(productId: string, qtyDeducted: number): void {
    const list = this.getProducts();
    const item = list.find(p => p.id === productId);
    if (item) {
      item.stockQuantity = Math.max(0, item.stockQuantity - qtyDeducted);
      this.setItem(STORAGE_KEYS.PRODUCTS, list);
    }
  }

  // Camera Models
  getCameraModels(): CameraModel[] {
    return this.getItem<CameraModel[]>(STORAGE_KEYS.CAMERA_MODELS, INITIAL_CAMERA_MODELS);
  }

  saveCameraModel(model: CameraModel): CameraModel {
    const list = this.getCameraModels();
    const idx = list.findIndex(m => m.id === model.id);
    if (idx >= 0) {
      list[idx] = model;
    } else {
      list.push(model);
    }
    this.setItem(STORAGE_KEYS.CAMERA_MODELS, list);
    return model;
  }

  deleteCameraModel(id: string): void {
    const list = this.getCameraModels().filter(m => m.id !== id);
    this.setItem(STORAGE_KEYS.CAMERA_MODELS, list);
  }

  // Company Settings
  getCompanySettings(): CompanySettings {
    return this.getSettings();
  }

  saveCompanySettings(settings: CompanySettings): CompanySettings {
    return this.saveSettings(settings);
  }

  // Installation Services (Quotation/Invoice Installation items)
  getInstallationServices(): InstallationItem[] {
    return this.getItem<InstallationItem[]>(STORAGE_KEYS.INSTALLATION_SERVICES, INITIAL_INSTALLATION_SERVICES);
  }

  // Master Technical Services (Rate Cards)
  getServices(): MasterServiceRate[] {
    return this.getItem<MasterServiceRate[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  }

  saveService(service: MasterServiceRate): MasterServiceRate {
    const list = this.getServices();
    const idx = list.findIndex(s => s.id === service.id);
    if (idx >= 0) {
      list[idx] = service;
    } else {
      list.push(service);
    }
    this.setItem(STORAGE_KEYS.SERVICES, list);
    return service;
  }

  deleteService(id: string): void {
    const list = this.getServices().filter(s => s.id !== id);
    this.setItem(STORAGE_KEYS.SERVICES, list);
  }

  saveInstallationService(service: InstallationItem): InstallationItem {
    const list = this.getInstallationServices();
    const idx = list.findIndex(s => s.id === service.id);
    if (idx >= 0) {
      list[idx] = service;
    } else {
      list.push(service);
    }
    this.setItem(STORAGE_KEYS.INSTALLATION_SERVICES, list);
    return service;
  }

  deleteInstallationService(id: string): void {
    const list = this.getInstallationServices().filter(s => s.id !== id);
    this.setItem(STORAGE_KEYS.INSTALLATION_SERVICES, list);
  }

  // Quotations
  getQuotations(): Quotation[] {
    return this.getItem<Quotation[]>(STORAGE_KEYS.QUOTATIONS, INITIAL_QUOTATIONS);
  }

  getQuotationById(id: string): Quotation | undefined {
    return this.getQuotations().find(q => q.id === id || q.quotationNumber === id);
  }

  saveQuotation(quotation: Quotation): Quotation {
    const list = this.getQuotations();
    const idx = list.findIndex(q => q.id === quotation.id);
    if (idx >= 0) {
      list[idx] = { ...quotation, updatedAt: new Date().toISOString() };
    } else {
      list.unshift({ ...quotation, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    this.setItem(STORAGE_KEYS.QUOTATIONS, list);
    return quotation;
  }

  deleteQuotation(id: string): void {
    const list = this.getQuotations().filter(q => q.id !== id);
    this.setItem(STORAGE_KEYS.QUOTATIONS, list);
  }

  getNextQuotationNumber(): string {
    return this.generateNextQuotationNumber();
  }

  generateNextQuotationNumber(): string {
    const list = this.getQuotations();
    const settings = this.getSettings();
    const currentYear = new Date().getFullYear();
    const prefix = settings.quotationPrefix || `QT-${currentYear}-`;
    
    // Find highest existing sequence
    let maxNum = 0;
    list.forEach(q => {
      if (q.quotationNumber && q.quotationNumber.startsWith(prefix)) {
        const parts = q.quotationNumber.split('-');
        const num = parseInt(parts[parts.length - 1], 10);
        if (!isNaN(num) && num > maxNum) {
          maxNum = num;
        }
      }
    });

    const nextSeq = (maxNum + 1).toString().padStart(4, '0');
    return `${prefix}${nextSeq}`;
  }

  // Invoices
  getInvoices(): Invoice[] {
    return this.getItem<Invoice[]>(STORAGE_KEYS.INVOICES, INITIAL_INVOICES);
  }

  getInvoiceById(id: string): Invoice | undefined {
    return this.getInvoices().find(inv => inv.id === id || inv.invoiceNumber === id);
  }

  saveInvoice(invoice: Invoice): Invoice {
    const list = this.getInvoices();
    const idx = list.findIndex(i => i.id === invoice.id);
    if (idx >= 0) {
      list[idx] = { ...invoice, updatedAt: new Date().toISOString() };
    } else {
      list.unshift({ ...invoice, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    this.setItem(STORAGE_KEYS.INVOICES, list);
    return invoice;
  }

  deleteInvoice(id: string): void {
    const list = this.getInvoices().filter(i => i.id !== id);
    this.setItem(STORAGE_KEYS.INVOICES, list);
  }

  getNextInvoiceNumber(): string {
    return this.generateNextInvoiceNumber();
  }

  generateNextInvoiceNumber(): string {
    const list = this.getInvoices();
    const settings = this.getSettings();
    const currentYear = new Date().getFullYear();
    const prefix = settings.invoicePrefix || `INV-${currentYear}-`;
    
    let maxNum = 0;
    list.forEach(inv => {
      if (inv.invoiceNumber && inv.invoiceNumber.startsWith(prefix)) {
        const parts = inv.invoiceNumber.split('-');
        const num = parseInt(parts[parts.length - 1], 10);
        if (!isNaN(num) && num > maxNum) {
          maxNum = num;
        }
      }
    });

    const nextSeq = (maxNum + 1).toString().padStart(4, '0');
    return `${prefix}${nextSeq}`;
  }

  // Convert Quotation to Invoice
  convertQuotationToInvoice(quotationId: string, autoDeductStock: boolean = true): Invoice {
    const quotation = this.getQuotationById(quotationId);
    if (!quotation) throw new Error("Quotation not found");

    const newInvoiceNumber = this.generateNextInvoiceNumber();
    const today = new Date().toISOString().split('T')[0];
    const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const invoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: newInvoiceNumber,
      invoiceDate: today,
      dueDate: dueDate,
      quotationNumber: quotation.quotationNumber,
      quotationReference: quotation.quotationNumber,
      quotationId: quotation.id,
      customerId: quotation.customerId,
      customerName: quotation.customerName,
      customerCompany: quotation.customerCompany,
      customerNicBr: quotation.customerNicBr,
      customerPhone: quotation.customerPhone,
      customerWhatsapp: quotation.customerWhatsapp,
      customerEmail: quotation.customerEmail,
      customerAddress: quotation.customerAddress,
      siteAddress: quotation.siteAddress,
      items: quotation.items.map(qi => ({
        id: `inv-item-${Date.now()}-${qi.srNo}`,
        srNo: qi.srNo,
        description: qi.description,
        model: qi.model,
        unit: qi.unit,
        qty: qi.qty,
        rate: qi.rate,
        amount: qi.amount,
        warranty: qi.warranty
      })),
      installationItems: quotation.installationItems,
      itemTotal: quotation.itemTotal,
      installationTotal: quotation.installationTotal,
      installationCharges: quotation.installationTotal,
      transportCharges: quotation.transportCharges,
      otherCharges: quotation.otherCharges,
      subTotal: quotation.subTotal,
      subtotal: quotation.subTotal,
      discountAmount: quotation.discountAmount,
      discount: quotation.discountAmount,
      vatAmount: quotation.vatAmount,
      grandTotal: quotation.grandTotal,
      amountPaid: 0,
      balanceDue: quotation.grandTotal,
      paymentStatus: 'UNPAID',
      paymentTerms: quotation.paymentTerms,
      notes: [
        ...quotation.notes,
        "Goods received in good condition. Warranty void if seals are broken."
      ],
      warrantyDetails: quotation.warrantyDetails,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save invoice
    this.saveInvoice(invoice);

    // Update Quotation Status
    quotation.status = 'CONVERTED';
    quotation.convertedInvoiceId = invoice.id;
    this.saveQuotation(quotation);

    // Optionally deduct stock
    if (autoDeductStock) {
      quotation.items.forEach(item => {
        if (item.productId) {
          this.adjustProductStock(item.productId, item.qty);
        }
      });
    }

    return invoice;
  }

  // Payments
  getPayments(): PaymentRecord[] {
    return this.getItem<PaymentRecord[]>(STORAGE_KEYS.PAYMENTS, INITIAL_PAYMENTS);
  }

  recordPayment(record: Omit<PaymentRecord, 'id' | 'createdAt'>): PaymentRecord {
    const list = this.getPayments();
    const newRecord: PaymentRecord = {
      ...record,
      recordedBy: record.recordedBy || 'Admin Staff',
      id: `pay-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    list.unshift(newRecord);
    this.setItem(STORAGE_KEYS.PAYMENTS, list);

    // Update Invoice Paid Amount and Balance
    const invoice = this.getInvoiceById(record.invoiceId);
    if (invoice) {
      const allInvoicePayments = list.filter(p => p.invoiceId === record.invoiceId);
      const totalPaid = allInvoicePayments.reduce((sum, p) => sum + p.amount, 0);
      invoice.amountPaid = totalPaid;
      invoice.balanceDue = Math.max(0, invoice.grandTotal - totalPaid);
      if (invoice.balanceDue <= 0) {
        invoice.paymentStatus = 'PAID';
      } else if (totalPaid > 0) {
        invoice.paymentStatus = 'PARTIALLY PAID';
      } else {
        invoice.paymentStatus = 'UNPAID';
      }
      this.saveInvoice(invoice);
    }

    return newRecord;
  }

  deletePayment(id: string): void {
    const list = this.getPayments().filter(p => p.id !== id);
    this.setItem(STORAGE_KEYS.PAYMENTS, list);
  }

  // Users & Auth
  getUsers(): AppUser[] {
    return this.getItem<AppUser[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
  }

  saveUser(user: AppUser): AppUser {
    const list = this.getUsers();
    const idx = list.findIndex(u => u.id === user.id);
    if (idx >= 0) {
      list[idx] = user;
    } else {
      list.push(user);
    }
    this.setItem(STORAGE_KEYS.USERS, list);
    return user;
  }

  deleteUser(id: string): void {
    const list = this.getUsers().filter(u => u.id !== id);
    this.setItem(STORAGE_KEYS.USERS, list);
  }

  getCurrentUser(): AppUser | null {
    return this.getItem<AppUser | null>(STORAGE_KEYS.AUTH, INITIAL_USERS[0]);
  }

  setCurrentUser(user: AppUser | null): void {
    this.setItem(STORAGE_KEYS.AUTH, user);
  }

  logout(): void {
    this.setCurrentUser(null);
  }

  // ==========================================
  // SITE SURVEYS & SMART MATERIAL ESTIMATOR
  // ==========================================
  getSiteSurveys(): SiteSurvey[] {
    return this.getItem<SiteSurvey[]>(STORAGE_KEYS.SITE_SURVEYS, INITIAL_SITE_SURVEYS);
  }

  getSiteSurveyById(id: string): SiteSurvey | undefined {
    return this.getSiteSurveys().find(s => s.id === id || s.surveyNumber === id);
  }

  saveSiteSurvey(survey: SiteSurvey): SiteSurvey {
    const list = this.getSiteSurveys();
    const idx = list.findIndex(s => s.id === survey.id);
    if (idx >= 0) {
      list[idx] = { ...survey, updatedAt: new Date().toISOString() };
    } else {
      list.unshift({ ...survey, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    this.setItem(STORAGE_KEYS.SITE_SURVEYS, list);
    return survey;
  }

  deleteSiteSurvey(id: string): void {
    const list = this.getSiteSurveys().filter(s => s.id !== id);
    this.setItem(STORAGE_KEYS.SITE_SURVEYS, list);
  }

  generateNextSurveyNumber(): string {
    const list = this.getSiteSurveys();
    const currentYear = new Date().getFullYear();
    const prefix = `SURV-${currentYear}-`;
    
    let maxNum = 0;
    list.forEach(s => {
      if (s.surveyNumber && s.surveyNumber.startsWith(prefix)) {
        const parts = s.surveyNumber.split('-');
        const num = parseInt(parts[parts.length - 1], 10);
        if (!isNaN(num) && num > maxNum) {
          maxNum = num;
        }
      }
    });

    const nextSeq = (maxNum + 1).toString().padStart(4, '0');
    return `${prefix}${nextSeq}`;
  }

  // Generate Quotation from Site Survey with Auto-Material Calculation
  generateQuotationFromSurvey(surveyId: string): Quotation {
    const survey = this.getSiteSurveyById(surveyId);
    if (!survey) throw new Error("Survey not found");

    const settings = this.getSettings();
    const nextQtNum = this.generateNextQuotationNumber();
    const today = new Date().toISOString().split('T')[0];
    const validUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    // 1. Group Cameras by Model or add individually
    const items: any[] = [];
    let srNo = 1;

    // Camera items
    survey.cameraLocations.forEach((cam) => {
      let unitPrice = 7500;
      if (cam.resolution.includes('5MP')) unitPrice = 12500;
      else if (cam.resolution.includes('4MP')) unitPrice = 11500;
      else if (cam.resolution.includes('8MP')) unitPrice = 24500;
      else if (cam.cameraType.includes('PTZ')) unitPrice = 75000;
      else if (cam.cameraType.includes('WiFi')) unitPrice = 9500;

      items.push({
        id: `item-${Date.now()}-${srNo}`,
        srNo: srNo++,
        description: `Camera ${cam.cameraNo}: ${cam.locationName} - ${cam.cameraType} (${cam.resolution}, ${cam.indoorOutdoor})`,
        model: cam.model || 'Hikvision Surveillance Grade',
        unit: 'PCS' as UnitType,
        qty: 1,
        rate: unitPrice,
        amount: unitPrice,
        warranty: '2 Years Comprehensive Warranty'
      });
    });

    // 2. DVR / NVR item
    const camCount = survey.cameraCount;
    let dvrChannels = 4;
    let dvrPrice = 16500;
    let dvrName = 'Hikvision 4-Channel AcuSense Audio DVR (Supports up to 5MP)';
    let dvrModel = 'iDS-7204HQHI-M1/S';

    if (camCount > 8) {
      dvrChannels = 16;
      dvrPrice = 48500;
      dvrName = 'Hikvision 16-Channel 4K AcuSense NVR / DVR';
      dvrModel = 'iDS-7216HQHI-M1/S';
    } else if (camCount > 4) {
      dvrChannels = 8;
      dvrPrice = 24500;
      dvrName = 'Hikvision 8-Channel AcuSense Audio DVR (Supports up to 5MP)';
      dvrModel = 'iDS-7208HQHI-M1/S';
    }

    items.push({
      id: `item-${Date.now()}-${srNo}`,
      srNo: srNo++,
      description: dvrName,
      model: dvrModel,
      unit: 'PCS' as UnitType,
      qty: 1,
      rate: dvrPrice,
      amount: dvrPrice,
      warranty: '2 Years Comprehensive Warranty'
    });

    // 3. Hard Disk item
    let hddRate = 14500;
    let hddDesc = 'Seagate SkyHawk / WD Purple 1TB Surveillance Hard Disk (24/7 Continuous)';
    let hddModel = 'ST1000VX005 (1TB)';

    if (survey.suggestedHddCapacity.includes('2TB')) {
      hddRate = 22800;
      hddDesc = 'Western Digital Purple 2TB Surveillance Hard Drive (AllFrame AI, 24/7)';
      hddModel = 'WD23PURZ (2TB)';
    } else if (survey.suggestedHddCapacity.includes('4TB')) {
      hddRate = 38500;
      hddDesc = 'Western Digital Purple 4TB Surveillance Hard Drive (256MB Cache, 24/7)';
      hddModel = 'WD43PURZ (4TB)';
    }

    items.push({
      id: `item-${Date.now()}-${srNo}`,
      srNo: srNo++,
      description: hddDesc,
      model: hddModel,
      unit: 'PCS' as UnitType,
      qty: 1,
      rate: hddRate,
      amount: hddRate,
      warranty: '2 Years Surveillance Grade Warranty'
    });

    // 4. Power Supply
    let psRate = 5800;
    let psDesc = `12V 10A Centralized CCTV Power Supply Box with 9 Individual PTC Fuses`;
    let psModel = 'PSU-12V10A-9CH';

    if (survey.suggestedPowerSupply.includes('20A')) {
      psRate = 8500;
      psDesc = '12V 20A Heavy Duty Central CCTV Power Supply Box (18 Fused Channels)';
      psModel = 'PSU-12V20A-18CH';
    } else if (survey.suggestedPowerSupply.includes('5A')) {
      psRate = 4200;
      psDesc = '12V 5A Centralized CCTV Power Supply Box (4 Fused Channels)';
      psModel = 'PSU-12V5A-4CH';
    } else if (survey.suggestedPowerSupply.includes('PoE')) {
      psRate = 14500;
      psDesc = 'Hikvision 8-Port Gigabit PoE Switch (120W Power Budget, Long-Range)';
      psModel = 'DS-3E0109P-E/M';
    }

    items.push({
      id: `item-${Date.now()}-${srNo}`,
      srNo: srNo++,
      description: psDesc,
      model: psModel,
      unit: 'PCS' as UnitType,
      qty: 1,
      rate: psRate,
      amount: psRate,
      warranty: '1 Year Warranty'
    });

    // 5. Cables
    const cableMeters = survey.totalFinalCableMeters || 100;
    const isIP = survey.systemType === 'IP CCTV';
    const cableRate = isIP ? 120 : 140;
    const cableName = isIP ? 'D-Link / Hikvision Pure Solid Copper CAT6 UTP Network Cable' : 'High-Grade Pure Solid Copper RG59 Coaxial Video + 2-Core Power Cable';
    const cableModel = isIP ? 'CAT6-CU-100M' : 'RG59-CU-100M';

    items.push({
      id: `item-${Date.now()}-${srNo}`,
      srNo: srNo++,
      description: cableName,
      model: cableModel,
      unit: 'MTR' as UnitType,
      qty: cableMeters,
      rate: cableRate,
      amount: cableMeters * cableRate,
      warranty: 'Standard'
    });

    // 6. Connectors & Accessories Pack
    if (isIP) {
      items.push({
        id: `item-${Date.now()}-${srNo}`,
        srNo: srNo++,
        description: 'Gold-Plated RJ45 Modular Connectors with Rubber Protective Boots',
        model: 'RJ45-CAT6-GOLD',
        unit: 'NOS' as UnitType,
        qty: camCount * 2 + 2,
        rate: 80,
        amount: (camCount * 2 + 2) * 80,
        warranty: 'Standard'
      });
    } else {
      items.push({
        id: `item-${Date.now()}-${srNo}`,
        srNo: srNo++,
        description: 'High-Shield Pure Copper BNC Connectors & DC 12V Power Male Jacks',
        model: 'BNC-COPPER-SCREW / DC-MALE',
        unit: 'SET' as UnitType,
        qty: camCount,
        rate: 450,
        amount: camCount * 450,
        warranty: 'Standard'
      });
    }

    // 7. Casing / Conduit if surveyed
    if (survey.totalCasingMeters > 0) {
      items.push({
        id: `item-${Date.now()}-${srNo}`,
        srNo: srNo++,
        description: 'Heavy-Duty PVC Cable Casing Trunking (1x1/2 inch) with Screws & Clips',
        model: 'PVC-TRUNK-1X0.5',
        unit: 'MTR' as UnitType,
        qty: survey.totalCasingMeters,
        rate: 90,
        amount: survey.totalCasingMeters * 90,
        warranty: 'Standard'
      });
    }

    if (survey.totalConduitMeters > 0) {
      items.push({
        id: `item-${Date.now()}-${srNo}`,
        srNo: srNo++,
        description: '20mm Heavy Gauge PVC Electrical Conduit Pipes & Bends',
        model: 'PVC-PIPE-20MM',
        unit: 'MTR' as UnitType,
        qty: survey.totalConduitMeters,
        rate: 110,
        amount: survey.totalConduitMeters * 110,
        warranty: 'Standard'
      });
    }

    // Installation Services
    const installationItems: InstallationItem[] = [
      {
        id: `inst-${Date.now()}-1`,
        srNo: 1,
        serviceName: 'CCTV Camera Point Precision Mounting & Angle Calibration',
        description: 'Secure wall/ceiling mounting, cable termination, waterproof sealing & optimal viewing angle alignment.',
        unit: 'NOS',
        qty: camCount,
        rate: 1800,
        amount: camCount * 1800
      },
      {
        id: `inst-${Date.now()}-2`,
        srNo: 2,
        serviceName: 'DVR / NVR System Configuration & Hard Disk Recording Setup',
        description: 'HDD initialization, continuous / motion detection schedule, AI AcuSense event triggers & time sync.',
        unit: 'JOB',
        qty: 1,
        rate: 3500,
        amount: 3500
      },
      {
        id: `inst-${Date.now()}-3`,
        srNo: 3,
        serviceName: 'Remote Mobile Phone Live View Setup (iOS & Android)',
        description: 'Hik-Connect / DMSS Cloud P2P configuration on smartphones with motion alarm notifications.',
        unit: 'JOB',
        qty: 1,
        rate: 2000,
        amount: 2000
      }
    ];

    const itemTotal = items.reduce((sum, it) => sum + it.amount, 0);
    const installationTotal = installationItems.reduce((sum, it) => sum + it.amount, 0);
    const transportCharges = 1500;
    const subTotal = itemTotal + installationTotal + transportCharges;
    const discountAmount = 1500;
    const grandTotal = subTotal - discountAmount;

    const quotation: Quotation = {
      id: `qt-${Date.now()}`,
      quotationNumber: nextQtNum,
      date: today,
      validUntil: validUntil,
      customerId: survey.customerId,
      customerName: survey.customerName,
      customerPhone: survey.customerPhone,
      customerEmail: survey.customerEmail || '',
      customerAddress: survey.siteAddress,
      siteAddress: survey.siteAddress,
      items: items,
      installationItems: installationItems,
      itemTotal: itemTotal,
      installationTotal: installationTotal,
      installationCharges: installationTotal,
      transportCharges: transportCharges,
      otherCharges: 0,
      subTotal: subTotal,
      subtotal: subTotal,
      discountType: 'amount',
      discountValue: discountAmount,
      discountAmount: discountAmount,
      discount: discountAmount,
      vatEnabled: false,
      vatPercent: 0,
      vatAmount: 0,
      grandTotal: grandTotal,
      notes: [
        `Generated from Site Survey: ${survey.surveyNumber} conducted by ${survey.technicianName}.`,
        ...settings.defaultNotes
      ],
      warrantyDetails: {
        cameraWarranty: settings.defaultWarranty.camera,
        nvrWarranty: settings.defaultWarranty.nvr,
        hddWarranty: settings.defaultWarranty.hdd,
        installationWarranty: settings.defaultWarranty.installation
      },
      warrantyTerms: `Cameras: ${settings.defaultWarranty.camera}, NVR: ${settings.defaultWarranty.nvr}, HDD: ${settings.defaultWarranty.hdd}, Installation: ${settings.defaultWarranty.installation}`,
      paymentTerms: settings.defaultPaymentTerms,
      jobDuration: '1-2 Working Days upon confirmation',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save quotation
    this.saveQuotation(quotation);

    // Update survey status
    survey.status = 'Quoted';
    survey.convertedQuotationId = quotation.id;
    this.saveSiteSurvey(survey);

    return quotation;
  }

  // ==========================================
  // SUPPLIERS & PRICE HISTORY
  // ==========================================
  getSuppliers(): Supplier[] {
    return this.getItem<Supplier[]>(STORAGE_KEYS.SUPPLIERS, INITIAL_SUPPLIERS);
  }

  saveSupplier(supplier: Supplier): Supplier {
    const list = this.getSuppliers();
    const idx = list.findIndex(s => s.id === supplier.id);
    if (idx >= 0) {
      list[idx] = supplier;
    } else {
      list.push(supplier);
    }
    this.setItem(STORAGE_KEYS.SUPPLIERS, list);
    return supplier;
  }

  deleteSupplier(id: string): void {
    const list = this.getSuppliers().filter(s => s.id !== id);
    this.setItem(STORAGE_KEYS.SUPPLIERS, list);
  }

  getPriceHistory(): PriceHistoryRecord[] {
    return this.getItem<PriceHistoryRecord[]>(STORAGE_KEYS.PRICE_HISTORY, INITIAL_PRICE_HISTORY);
  }

  addPriceHistoryRecord(record: Omit<PriceHistoryRecord, 'id'>): PriceHistoryRecord {
    const list = this.getPriceHistory();
    const newRecord: PriceHistoryRecord = {
      ...record,
      id: `ph-${Date.now()}`
    };
    list.unshift(newRecord);
    this.setItem(STORAGE_KEYS.PRICE_HISTORY, list);
    return newRecord;
  }

  // ==========================================
  // STOCK MOVEMENTS (#47, #49)
  // ==========================================
  getStockMovements(): StockMovement[] {
    return this.getItem<StockMovement[]>(STORAGE_KEYS.STOCK_MOVEMENTS, INITIAL_STOCK_MOVEMENTS);
  }

  saveStockMovement(movement: StockMovement): StockMovement {
    const list = this.getStockMovements();
    const idx = list.findIndex(m => m.id === movement.id);
    if (idx >= 0) {
      list[idx] = movement;
    } else {
      list.unshift(movement);
    }
    this.setItem(STORAGE_KEYS.STOCK_MOVEMENTS, list);
    return movement;
  }

  recordStockMovement(
    productId: string, 
    type: 'STOCK_IN' | 'STOCK_OUT' | 'ADJUSTMENT' | 'TRANSFER', 
    quantity: number, 
    reason: string, 
    referenceNumber: string = '', 
    performedBy: string = 'Super Admin',
    notes: string = ''
  ): StockMovement | null {
    const products = this.getProducts();
    const prod = products.find(p => p.id === productId);
    if (!prod) return null;

    const previousStock = prod.stockQuantity || 0;
    let newStock = previousStock;

    if (type === 'STOCK_IN') {
      newStock = previousStock + Math.abs(quantity);
    } else if (type === 'STOCK_OUT') {
      newStock = Math.max(0, previousStock - Math.abs(quantity));
    } else if (type === 'ADJUSTMENT') {
      newStock = Math.max(0, previousStock + quantity); // quantity can be positive or negative
    }

    prod.stockQuantity = newStock;
    this.saveProduct(prod);

    const movement: StockMovement = {
      id: `sm-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      productId: prod.id,
      productName: prod.name,
      productCode: prod.code,
      type,
      quantity: Math.abs(quantity),
      previousStock,
      newStock,
      date: new Date().toISOString(),
      reason,
      referenceNumber,
      performedBy,
      notes
    };

    return this.saveStockMovement(movement);
  }

  // ==========================================
  // SERIAL NUMBERS (#50)
  // ==========================================
  getSerialNumbers(): SerialNumberRecord[] {
    return this.getItem<SerialNumberRecord[]>(STORAGE_KEYS.SERIAL_NUMBERS, INITIAL_SERIAL_NUMBERS);
  }

  saveSerialNumber(record: SerialNumberRecord): SerialNumberRecord {
    const list = this.getSerialNumbers();
    const idx = list.findIndex(s => s.id === record.id);
    if (idx >= 0) {
      list[idx] = record;
    } else {
      list.unshift(record);
    }
    this.setItem(STORAGE_KEYS.SERIAL_NUMBERS, list);
    return record;
  }

  deleteSerialNumber(id: string): void {
    const list = this.getSerialNumbers().filter(s => s.id !== id);
    this.setItem(STORAGE_KEYS.SERIAL_NUMBERS, list);
  }

  getSerialsByCustomer(customerId: string): SerialNumberRecord[] {
    return this.getSerialNumbers().filter(s => s.customerId === customerId);
  }

  // ==========================================
  // CUSTOMER SITES & INSTALLED EQUIPMENT (#28, #51)
  // ==========================================
  getCustomerSites(): CustomerSite[] {
    return this.getItem<CustomerSite[]>(STORAGE_KEYS.CUSTOMER_SITES, INITIAL_CUSTOMER_SITES);
  }

  saveCustomerSite(site: CustomerSite): CustomerSite {
    const list = this.getCustomerSites();
    const idx = list.findIndex(s => s.id === site.id);
    if (idx >= 0) {
      list[idx] = site;
    } else {
      list.push(site);
    }
    this.setItem(STORAGE_KEYS.CUSTOMER_SITES, list);
    return site;
  }

  deleteCustomerSite(id: string): void {
    const list = this.getCustomerSites().filter(s => s.id !== id);
    this.setItem(STORAGE_KEYS.CUSTOMER_SITES, list);
  }

  getSitesByCustomer(customerId: string): CustomerSite[] {
    return this.getCustomerSites().filter(s => s.customerId === customerId);
  }

  getInstalledEquipment(): InstalledEquipmentItem[] {
    return this.getItem<InstalledEquipmentItem[]>(STORAGE_KEYS.INSTALLED_EQUIPMENT, INITIAL_INSTALLED_EQUIPMENT);
  }

  saveInstalledEquipment(item: InstalledEquipmentItem): InstalledEquipmentItem {
    const list = this.getInstalledEquipment();
    const idx = list.findIndex(i => i.id === item.id);
    if (idx >= 0) {
      list[idx] = item;
    } else {
      list.unshift(item);
    }
    this.setItem(STORAGE_KEYS.INSTALLED_EQUIPMENT, list);
    return item;
  }

  deleteInstalledEquipment(id: string): void {
    const list = this.getInstalledEquipment().filter(i => i.id !== id);
    this.setItem(STORAGE_KEYS.INSTALLED_EQUIPMENT, list);
  }

  getInstalledByCustomer(customerId: string): InstalledEquipmentItem[] {
    return this.getInstalledEquipment().filter(i => i.customerId === customerId);
  }

  // ==========================================
  // WARRANTY CLAIMS (#53)
  // ==========================================
  getWarrantyClaims(): WarrantyClaim[] {
    return this.getItem<WarrantyClaim[]>(STORAGE_KEYS.WARRANTY_CLAIMS, INITIAL_WARRANTY_CLAIMS);
  }

  saveWarrantyClaim(claim: WarrantyClaim): WarrantyClaim {
    const list = this.getWarrantyClaims();
    const idx = list.findIndex(c => c.id === claim.id);
    if (idx >= 0) {
      list[idx] = claim;
    } else {
      list.unshift(claim);
    }
    this.setItem(STORAGE_KEYS.WARRANTY_CLAIMS, list);
    return claim;
  }

  deleteWarrantyClaim(id: string): void {
    const list = this.getWarrantyClaims().filter(c => c.id !== id);
    this.setItem(STORAGE_KEYS.WARRANTY_CLAIMS, list);
  }

  getClaimsByCustomer(customerId: string): WarrantyClaim[] {
    return this.getWarrantyClaims().filter(c => c.customerId === customerId);
  }

  // ==========================================
  // SERVICE RECORDS (#52)
  // ==========================================
  getServiceRecords(): ServiceRecord[] {
    return this.getItem<ServiceRecord[]>(STORAGE_KEYS.SERVICE_RECORDS, INITIAL_SERVICE_RECORDS);
  }

  saveServiceRecord(record: ServiceRecord): ServiceRecord {
    const list = this.getServiceRecords();
    const idx = list.findIndex(r => r.id === record.id);
    if (idx >= 0) {
      list[idx] = record;
    } else {
      list.unshift(record);
    }
    this.setItem(STORAGE_KEYS.SERVICE_RECORDS, list);
    return record;
  }

  deleteServiceRecord(id: string): void {
    const list = this.getServiceRecords().filter(r => r.id !== id);
    this.setItem(STORAGE_KEYS.SERVICE_RECORDS, list);
  }

  getServicesByCustomer(customerId: string): ServiceRecord[] {
    return this.getServiceRecords().filter(r => r.customerId === customerId);
  }

  // Reset to Factory Default Data
  resetAllData(): void {
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.CUSTOMERS);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CAMERA_MODELS);
    localStorage.removeItem(STORAGE_KEYS.INSTALLATION_SERVICES);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.QUOTATIONS);
    localStorage.removeItem(STORAGE_KEYS.INVOICES);
    localStorage.removeItem(STORAGE_KEYS.PAYMENTS);
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    localStorage.removeItem(STORAGE_KEYS.SITE_SURVEYS);
    localStorage.removeItem(STORAGE_KEYS.SUPPLIERS);
    localStorage.removeItem(STORAGE_KEYS.PRICE_HISTORY);
    localStorage.removeItem(STORAGE_KEYS.STOCK_MOVEMENTS);
    localStorage.removeItem(STORAGE_KEYS.SERIAL_NUMBERS);
    localStorage.removeItem(STORAGE_KEYS.CUSTOMER_SITES);
    localStorage.removeItem(STORAGE_KEYS.INSTALLED_EQUIPMENT);
    localStorage.removeItem(STORAGE_KEYS.WARRANTY_CLAIMS);
    localStorage.removeItem(STORAGE_KEYS.SERVICE_RECORDS);
  }
}

export const dbStore = new DatabaseStore();

// Formatter helper for Sri Lankan Rupees
export function formatLKR(amount: number | undefined | null): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return 'Rs. 0.00';
  }
  return 'Rs. ' + amount.toLocaleString('en-LK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Convert amount to words in Sri Lankan Rupees
export function amountToWords(amount: number): string {
  if (isNaN(amount) || amount === 0) return 'Rupees Zero Only';
  
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  function convertGroup(num: number): string {
    let groupStr = '';
    if (num >= 100) {
      groupStr += ones[Math.floor(num / 100)] + ' Hundred ';
      num %= 100;
    }
    if (num >= 20) {
      groupStr += tens[Math.floor(num / 10)] + ' ';
      num %= 10;
    }
    if (num > 0) {
      groupStr += ones[num] + ' ';
    }
    return groupStr.trim();
  }

  const intPart = Math.floor(amount);
  const centsPart = Math.round((amount - intPart) * 100);

  if (intPart === 0) {
    return centsPart > 0 ? `Cents ${convertGroup(centsPart)} Only` : 'Rupees Zero Only';
  }

  let words = '';
  const millions = Math.floor(intPart / 1000000);
  const thousands = Math.floor((intPart % 1000000) / 1000);
  const remainder = intPart % 1000;

  if (millions > 0) {
    words += convertGroup(millions) + ' Million ';
  }
  if (thousands > 0) {
    words += convertGroup(thousands) + ' Thousand ';
  }
  if (remainder > 0) {
    words += convertGroup(remainder) + ' ';
  }

  words = 'Sri Lankan Rupees ' + words.trim();
  if (centsPart > 0) {
    words += ` and Cents ${convertGroup(centsPart)}`;
  }
  return words + ' Only';
}

export const numberToWordsLKR = amountToWords;

