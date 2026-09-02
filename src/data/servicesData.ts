import { ServiceItem, CctvProduct, RepairItem } from '../types';

export const PHONE_NUMBER = "072 740 2288";
export const PHONE_CLICKABLE = "tel:+94727402288";
export const WHATSAPP_NUMBER = "072 740 2288";
export const WHATSAPP_CLICKABLE = "https://wa.me/94727402288";
export const EMAIL_ADDRESS = "unitytechhub.lk@gmail.com";
export const OFFICE_ADDRESS = "No. 45/A, High Level Road, Colombo & Island-wide Mobile Service, Sri Lanka";
export const BUSINESS_HOURS = {
  regular: "Monday – Saturday: 8:00 AM – 7:00 PM",
  weekdays: "Monday – Saturday: 8:00 AM – 7:00 PM",
  sunday: "Sunday: 9:00 AM – 4:00 PM",
  emergency: "24/7 Emergency CCTV & Server Support Available"
};

export const SERVICE_LOCATIONS = [
  "Colombo & Greater Colombo",
  "Gampaha & Negombo",
  "Kandy & Central Province",
  "Kalutara & Panadura",
  "Galle & Southern Coast",
  "Kurunegala & North Western",
  "Ratnapura & Sabaragamuwa",
  "Islandwide Outstation Projects"
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "cctv-installation",
    title: "1. CCTV Installation",
    shortDesc: "Professional CCTV camera installation for homes, shops, offices and businesses.",
    fullDesc: "Complete end-to-end security camera system installation using premium Hikvision, Dahua, and Uniview high-definition cameras. We design strategic camera angles, concealed neat cabling, power backup, and full smartphone integration.",
    iconName: "ShieldCheck",
    category: "cctv",
    features: [
      "Custom site survey & angle planning",
      "Concealed trunking & weatherproof cabling",
      "High-definition 1080p, 5MP & 4K Ultra HD options",
      "Mobile phone live view app configuration"
    ],
    benefits: [
      "24/7 round-the-clock property security",
      "Deter burglaries and unauthorized entry",
      "High clarity evidence recording with audio support"
    ],
    imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
    popular: true
  },
  {
    id: "cctv-repair",
    title: "2. CCTV Repair",
    shortDesc: "Complete CCTV troubleshooting, camera repair, DVR/NVR issues, cable problems and system maintenance.",
    fullDesc: "Got blank screens, flickering footage, lost passwords, or DVR beeping errors? Our certified technicians rapidly diagnose hardware failures, power supply issues, video balun faults, and damaged cabling.",
    iconName: "Wrench",
    category: "cctv",
    features: [
      "DVR/NVR password resetting & firmware recovery",
      "Camera lens, sensor & infrared board repair",
      "Power supply unit & video balun replacement",
      "Coaxial and CAT6 cable fault detection"
    ],
    benefits: [
      "Restore offline security within hours",
      "Prevent costly full system replacements",
      "Genuine spare parts with warranty"
    ],
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    popular: true
  },
  {
    id: "cctv-maintenance",
    title: "3. CCTV Maintenance",
    shortDesc: "Regular CCTV system inspection, cleaning, testing and maintenance.",
    fullDesc: "Prevent system degradation and sudden outages. Scheduled preventive maintenance for residential properties, factories, warehouses, retail shops, and corporate offices across Sri Lanka.",
    iconName: "Settings2",
    category: "cctv",
    features: [
      "Lens cleaning, focusing & waterproof seal check",
      "Hard disk health check & bad sector scan",
      "Cable integrity & power surge protector test",
      "Full recording playback verification"
    ],
    benefits: [
      "Prolongs equipment lifespan by 2x-3x",
      "Ensures critical footage is never lost",
      "Prioritized on-demand technical support"
    ],
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "remote-cctv-monitoring",
    title: "4. Remote CCTV Monitoring",
    shortDesc: "Help customers access and monitor their CCTV cameras remotely using mobile phones and computers.",
    fullDesc: "Watch your home or workplace from anywhere in the world. We configure secure cloud P2P, dynamic DNS, static IP streaming, and multi-user access on iOS, Android, Windows, and Mac.",
    iconName: "Smartphone",
    category: "cctv",
    features: [
      "Hik-Connect, DMSS, XMeye, GuardingVision setup",
      "Push alerts for motion detection & human sensing",
      "Multi-device concurrent streaming (Family/Staff)",
      "Secure encrypted video stream setup"
    ],
    benefits: [
      "Peace of mind while traveling abroad or at work",
      "Instant real-time intruder push notifications",
      "Zero monthly recurring cloud subscription fees"
    ],
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    popular: true
  },
  {
    id: "computer-laptop-repair",
    title: "5. Computer & Laptop Repair",
    shortDesc: "Hardware and software troubleshooting, Windows installation, virus removal, upgrades and general repairs.",
    fullDesc: "Expert repair service for Asus, Dell, HP, Lenovo, Acer, Apple MacBook, and custom desktop gaming/office PCs. From broken hinges and display replacements to SSD speed upgrades.",
    iconName: "Laptop",
    category: "repair",
    features: [
      "Laptop display, keyboard & motherboard repair",
      "NVMe SSD upgrade & RAM memory expansion",
      "Thermal paste replacement & deep heat-sink cleaning",
      "Genuine Windows 10/11 installation & licensing"
    ],
    benefits: [
      "Make slow laptops run up to 10x faster",
      "Onsite diagnosis or quick pickup & delivery",
      "Strict confidentiality of your personal data"
    ],
    imageUrl: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80",
    popular: true
  },
  {
    id: "networking-solutions",
    title: "6. Networking Solutions",
    shortDesc: "LAN networking, Wi-Fi setup, routers, switches, structured cabling and office network installation.",
    fullDesc: "Seamless, ultra-fast, and secure networking for homes, offices, hotels, and warehouses. We design structured Cat6/Fiber cabling, seamless mesh Wi-Fi roaming, and business router configurations.",
    iconName: "Network",
    category: "networking",
    features: [
      "Structured Cat6 LAN cabling & patch panel punch down",
      "Long-range Wi-Fi Access Points (Ubiquiti / TP-Link)",
      "VLAN segmentation & guest Wi-Fi portal creation",
      "Server rack installation & neat cable management"
    ],
    benefits: [
      "Zero dead zones with unbroken Wi-Fi coverage",
      "High bandwidth for Zoom, POS systems & CCTV streams",
      "Enterprise-grade firewall & network security"
    ],
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dvr-nvr-setup",
    title: "7. DVR / NVR Setup",
    shortDesc: "Professional DVR/NVR installation, configuration, storage setup and camera management.",
    fullDesc: "Specialized recorder setup including 4/8/16/32/64 channel Hybrid DVRs and PoE NVRs with surveillance-grade Western Digital Purple or Seagate SkyHawk hard drives.",
    iconName: "HardDrive",
    category: "cctv",
    features: [
      "Surveillance HDD installation & RAID configuration",
      "H.265+ smart compression to double recording days",
      "Continuous, Motion-triggered & AI scheduled recording",
      "Automated cloud / NAS backup synchronization"
    ],
    benefits: [
      "Continuous 30-90 days recorded video retention",
      "Crystal clear timestamped legal proof",
      "Silent, cool, 24/7 uninterrupted operation"
    ],
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "it-support",
    title: "8. IT Support",
    shortDesc: "Reliable technical support for homes, offices and businesses.",
    fullDesc: "On-demand IT support and Annual Maintenance Contracts (AMC) for small businesses, retail shops, clinics, and offices in Sri Lanka. Remote assistance and urgent on-site visits.",
    iconName: "Headset",
    category: "it",
    features: [
      "Printer, scanner & POS peripheral setup",
      "Email client configuration (Outlook, Google Workspace)",
      "Software installation & troubleshooting",
      "Remote desktop quick troubleshooting support"
    ],
    benefits: [
      "Eliminate costly business operational downtime",
      "Dedicated IT technician on call via WhatsApp/Phone",
      "Affordable monthly or per-incident rates"
    ],
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "data-backup-recovery",
    title: "9. Data Backup & Recovery",
    shortDesc: "Data backup solutions and basic data recovery assistance.",
    fullDesc: "Protect your critical financial records, CCTV evidence, family photos, and business documents. Automated local and cloud backup systems plus recovery from formatted or corrupted drives.",
    iconName: "Database",
    category: "it",
    features: [
      "Automated daily backup to external drive / cloud",
      "Recovery from accidental deletion & formatted drives",
      "Corrupted partition and USB drive data retrieval",
      "System image cloning before OS upgrades"
    ],
    benefits: [
      "Guaranteed ransomware and virus protection",
      "Rapid disaster recovery in minutes",
      "Zero risk of permanent business data loss"
    ],
    imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "smart-security-solutions",
    title: "10. Smart Security Solutions",
    shortDesc: "Modern security technology solutions customized for customer requirements.",
    fullDesc: "Next-generation integrated security: smart video doorbells, biometric fingerprint/RFID attendance access control, perimeter intrusion beam sensors, and solar-powered standalone 4G cameras.",
    iconName: "Cpu",
    category: "cctv",
    features: [
      "Solar 4G wireless CCTV for remote agricultural lands",
      "Biometric fingerprint & facial recognition access control",
      "Smart video intercom doorbells with smartphone unlocking",
      "Intruder alarm siren integration with CCTV motion triggers"
    ],
    benefits: [
      "Complete perimeter protection without blind spots",
      "Operates seamlessly during power cuts & off-grid",
      "Smart home and office automation synergy"
    ],
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    popular: true
  }
];

export const CCTV_PRODUCTS: CctvProduct[] = [
  {
    id: "indoor-dome",
    name: "Indoor HD / ColorVu Dome Cameras",
    category: "indoor",
    specs: ["2MP / 5MP / 4K UHD", "Built-in Microphone for Audio", "Wide-Angle 2.8mm Lens", "Sleek Ceiling Mount"],
    bestFor: "Living rooms, office cabins, shop counters, classrooms, hotel lobbies",
    resolution: "1080p - 5MP Full HD",
    features: ["Discreet modern design", "Audio recording", "Infrared smart night vision", "Tamper detection"],
    imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "outdoor-bullet",
    name: "Outdoor Weatherproof Bullet Cameras",
    category: "outdoor",
    specs: ["IP67 Heavy-duty Metal Body", "30m - 80m Long Range IR", "Lightning & Surge Protected", "Sun & Rain Shield"],
    bestFor: "Building perimeters, gates, parking lots, warehouses, roads, gardens",
    resolution: "2MP / 5MP / 8MP 4K",
    features: ["Waterproof & dustproof", "Long distance zoom capability", "Anti-reflective glass", "Extreme weather durability"],
    imageUrl: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "night-vision",
    name: "ColorVu & EXIR 24/7 Full Color Night Cameras",
    category: "night_vision",
    specs: ["F1.0 Super Aperture Lens", "Warm Supplemental Light", "24/7 Vivid Color Recording in Pitch Dark", "Smart Human Detection"],
    bestFor: "Dark driveways, retail shop entrances, storage yards, front gates",
    resolution: "5MP Ultra Clarity Color",
    features: ["Color video even in total darkness", "Eliminates black-and-white grain", "Recognizes clothes color & car plates at night"],
    imageUrl: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ip-cameras",
    name: "Digital IP & PoE Smart Cameras",
    category: "ip_camera",
    specs: ["PoE Single Cable Data+Power", "AI Human & Vehicle Motion Filter", "H.265+ Compression", "MicroSD Slot on-camera"],
    bestFor: "Modern smart homes, corporate offices, banks, multi-story factories",
    resolution: "4K 8-Megapixel Studio Quality",
    features: ["True digital crystal clear signal", "No video degradation over distance", "Advanced AI object filtering", "Two-way audio talk"],
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "dvr-systems",
    name: "Smart Hybrid DVR Recorders (4 / 8 / 16 / 32 Ch)",
    category: "dvr_nvr",
    specs: ["Supports HD-TVI, AHD, CVI, CVBS & IP", "4K HDMI & VGA Video Outputs", "Smart Search Playback", "Surveillance HDD Support up to 10TB"],
    bestFor: "Upgrading existing CCTV coax wiring or budget-friendly new installs",
    resolution: "Supports up to 5MP/8MP Cameras",
    features: ["Instant mobile push alerts", "Simultaneous multi-screen display", "Easy USB footage backup", "Quiet low-heat cooling"],
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "nvr-systems",
    name: "Ultra HD Network Video Recorders (NVR with PoE)",
    category: "dvr_nvr",
    specs: ["Plug & Play PoE Network Ports", "Up to 12MP 4K Decoding", "Dual Gigabit LAN support", "Intelligent Analytics & Line Crossing"],
    bestFor: "Commercial business setups, hotels, luxury villas, factories",
    resolution: "Native 4K Ultra High Definition",
    features: ["Zero noise interference", "Power directly over Cat6 ethernet", "Centralized multi-branch monitoring", "Continuous redundancy backup"],
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80"
  }
];

export const REPAIR_SERVICES_CATALOG: RepairItem[] = [
  {
    id: "rep-cctv",
    title: "CCTV & DVR/NVR Hardware Repair",
    category: "cctv",
    symptoms: ["No video signal / Black screen", "DVR beeping continuously", "HDD not detected / Not recording", "IR night vision not turning on", "Forgot DVR admin password"],
    turnaroundTime: "Same Day / 24 Hours",
    warranty: "3 - 6 Months Warranty",
    description: "Component-level repair of video mainboards, power supply modules, damaged camera ports, and firmware restoration.",
    iconName: "ShieldAlert"
  },
  {
    id: "rep-laptop",
    title: "Laptop & Notebook Repair",
    category: "computer",
    symptoms: ["Laptop not turning on", "Cracked display / Broken screen", "Keyboard keys not working", "Broken body hinges", "Battery not charging / Overheating"],
    turnaroundTime: "1 - 2 Days",
    warranty: "6 Months on Screen/Spares",
    description: "Precision micro-soldering, screen replacement, new original batteries, keyboard modules, and hinge rebuilding for all laptop brands.",
    iconName: "Laptop"
  },
  {
    id: "rep-desktop",
    title: "Desktop PC Troubleshooting & Repair",
    category: "computer",
    symptoms: ["Blue Screen of Death (BSOD)", "PC turns on but no display", "Auto shut down while working", "Power supply spark/failure", "Loud fan grinding noise"],
    turnaroundTime: "Same Day Diagnostic",
    warranty: "3 Months Warranty",
    description: "Motherboard repair, Power Supply Unit (SMPS) replacement, RAM testing, graphics card diagnostic, and thermal paste repasting.",
    iconName: "Monitor"
  },
  {
    id: "rep-ssd-upgrade",
    title: "SSD & RAM High-Speed Upgrade",
    category: "computer",
    symptoms: ["PC takes 5 minutes to boot up", "Applications freezing and lagging", "100% Disk usage in Task Manager", "Running out of storage space"],
    turnaroundTime: "2 - 4 Hours",
    warranty: "3 - 5 Years SSD Warranty",
    description: "Replace slow spinning HDDs with blazing fast M.2 NVMe SSDs. We clone your exact Windows, software, and files with zero data loss!",
    iconName: "Zap"
  },
  {
    id: "rep-windows-software",
    title: "Windows Installation & Software Setup",
    category: "software",
    symptoms: ["Windows boot loop / Startup repair failed", "Corrupted system files", "Need genuine Windows 10/11 upgrade", "MS Office / Adobe software setup"],
    turnaroundTime: "1 - 3 Hours",
    warranty: "Software Lifetime Activation",
    description: "Clean installation of genuine Windows OS, updated motherboard chipset drivers, essential productivity software, and system optimization.",
    iconName: "Layers"
  },
  {
    id: "rep-virus-malware",
    title: "Virus, Spyware & Malware Removal",
    category: "software",
    symptoms: ["Pop-up ads and browser hijackers", "Files encrypted / Ransomware scare", "Cryptominer slowing CPU", "Antivirus disabled by malware"],
    turnaroundTime: "2 - 4 Hours",
    warranty: "Full Clean Guarantee",
    description: "Deep boot-time scan, malware disinfection, browser cleanup, registry repair, and premium antivirus security installation.",
    iconName: "ShieldOff"
  },
  {
    id: "rep-printer",
    title: "Printer & Scanner Troubleshooting",
    category: "computer",
    symptoms: ["Printer offline / Paper jam errors", "Streaky or blank printouts", "Wi-Fi wireless printing not connecting", "Driver installation issues"],
    turnaroundTime: "Same Day",
    warranty: "1 Month Service Warranty",
    description: "Printer head cleaning, wireless network sharing configuration, roller servicing, and ink tank / toner cartridge troubleshooting.",
    iconName: "Printer"
  },
  {
    id: "rep-router-network",
    title: "Router & Wi-Fi Network Troubleshooting",
    category: "network",
    symptoms: ["Frequent Wi-Fi disconnections", "Slow internet speeds in certain rooms", "IP address conflict errors", "Cannot access router admin page"],
    turnaroundTime: "Onsite Immediate Visit",
    warranty: "1 Month Support",
    description: "Channel optimization, mesh repeater extension, router security hardening, DHCP scope configuration, and cabling recrimping.",
    iconName: "Wifi"
  }
];

export const WHY_CHOOSE_ITEMS = [
  {
    title: "Professional Technicians",
    desc: "Qualified, field-experienced security and IT hardware technicians with strict attention to neatness and precision.",
    icon: "UserCheck"
  },
  {
    title: "Quality Technology Products",
    desc: "We only supply 100% genuine Hikvision, Dahua, WD Purple, Kingston, and TP-Link equipment with manufacturer warranty.",
    icon: "Shield"
  },
  {
    title: "Fast Service & Quick Response",
    desc: "Rapid on-site emergency dispatch and prompt turnaround times for repairs and installations across Sri Lanka.",
    icon: "Zap"
  },
  {
    title: "Affordable Solutions",
    desc: "Transparent, honest pricing tailored for residential budgets, retail shops, and commercial business projects.",
    icon: "Tag"
  },
  {
    title: "Customized Security Solutions",
    desc: "Every property is unique. We calculate optimal focal lenses, coverage angles, and storage retention for your exact needs.",
    icon: "Sliders"
  },
  {
    title: "Reliable Installation",
    desc: "Neat casing, concealed conduit pipes, waterproof junction boxes, and safe power surge protection on every installation.",
    icon: "CheckCircle2"
  },
  {
    title: "Maintenance & Repairs",
    desc: "Comprehensive repair lab and scheduled maintenance check-ups to keep your security systems and computers running 24/7.",
    icon: "Wrench"
  },
  {
    title: "Dedicated Customer Support",
    desc: "Friendly, multilingual after-sales technical support via direct phone call and WhatsApp for seamless peace of mind.",
    icon: "Headset"
  }
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Contact Us",
    desc: "Reach out via Phone, WhatsApp, or our online form with your CCTV, IT repair, or networking requirements."
  },
  {
    step: "02",
    title: "Free Consultation",
    desc: "Our tech experts review your property layout or device issue, providing honest recommendations and a clear transparent quote."
  },
  {
    step: "03",
    title: "Professional Installation / Repair",
    desc: "Certified technicians perform tidy, high-standard installation or precision component repair using genuine parts."
  },
  {
    step: "04",
    title: "After-Sales Support",
    desc: "We train you on mobile monitoring apps, hand over warranty certificates, and provide ongoing reliable technical assistance."
  }
];

export const CORE_VALUES = [
  {
    title: "Quality",
    desc: "Uncompromising standards in original hardware, cabling, and technical craftsmanship on every single project.",
    icon: "Award"
  },
  {
    title: "Reliability",
    desc: "Dependable security surveillance and IT infrastructure that operates 24/7 without unexpected downtime.",
    icon: "ShieldCheck"
  },
  {
    title: "Professionalism",
    desc: "Punctual arrivals, neat workmanship, clean concealed cabling, and transparent communication.",
    icon: "Briefcase"
  },
  {
    title: "Customer Satisfaction",
    desc: "Over 500+ happy homes and businesses protected. We take pride in building long-term trust.",
    icon: "Smile"
  },
  {
    title: "Technical Expertise",
    desc: "Certified specialists continuously trained on modern IP digital security, cloud streaming, and hardware engineering.",
    icon: "Cpu"
  }
];

export const TARGET_CUSTOMERS = [
  { name: "Homes & Villas", icon: "Home", desc: "Keep family safe with perimeter cameras, doorbell intercoms, and fast home Wi-Fi." },
  { name: "Retail Shops & Supermarkets", icon: "ShoppingBag", desc: "Monitor cash registers, stock aisles, customer footfall, and prevent shrinkage." },
  { name: "Offices & Corporate", icon: "Building2", desc: "Structured Cat6 LAN networks, biometric staff attendance, server racks, and PC maintenance." },
  { name: "Hotels & Restaurants", icon: "UtensilsCrossed", desc: "Guest public Wi-Fi mesh, reception security, parking coverage, and POS connectivity." },
  { name: "Schools & Educational", icon: "GraduationCap", desc: "Campus safety cameras, computer lab maintenance, and smart classroom network setup." },
  { name: "Factories & Warehouses", icon: "Factory", desc: "Long-range night vision, forklift zone surveillance, perimeter beams, and fiber networking." }
];

export const TESTIMONIALS = [
  {
    name: "Dr. Rohana Jayasuriya",
    role: "Homeowner, Colombo 07",
    text: "Unity Tech Hub installed an 8-camera Hikvision ColorVu system at my residence. The night vision is astonishingly bright and the mobile app setup on all family phones was quick. Highly recommended for their neat cabling work!",
    rating: 5,
    service: "8-Channel ColorVu CCTV"
  },
  {
    name: "Dilan Senanayake",
    role: "Managing Director, Apex Logistics, Kelaniya",
    text: "They wired our entire warehouse with structured Cat6 networking, PoE IP cameras, and Ubiquiti Wi-Fi. Our network downtime dropped to zero and we can inspect trucks loading live from the mobile app.",
    rating: 5,
    service: "Commercial CCTV & Fiber LAN"
  },
  {
    name: "Sanduni Wickramasinghe",
    role: "Store Manager, Fashion Boutique, Negombo",
    text: "When our billing PC crashed right before the weekend rush, Unity Tech Hub repaired the power unit and recovered all invoice data within 3 hours. True life savers!",
    rating: 5,
    service: "Emergency Computer Repair"
  }
];
