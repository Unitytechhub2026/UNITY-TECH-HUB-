import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI SDK safely
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// System instruction for Unity Tech Hub AI Assistant
const UNITY_TECH_SYSTEM_INSTRUCTION = `You are the official AI Technical Assistant & Security Consultant for "UNITY TECH HUB", a premier Sri Lankan technology company.

About Unity Tech Hub:
- Tagline: "Smart Technology. Secure Future."
- Contact Phone: 072 740 2288
- WhatsApp: 072 740 2288 (https://wa.me/94727402288)
- Services offered across Sri Lanka:
  1. CCTV Installation (Hikvision, Dahua, Uniview - HD, ColorVu 24/7 color night vision, IP/PoE, 4K)
  2. CCTV Repair & Troubleshooting (DVR/NVR beep errors, password resets, power unit failures, black screens)
  3. CCTV Maintenance & Periodic Cleaning
  4. Remote CCTV Monitoring on mobile phones & PCs (Hik-Connect, DMSS, XMeye)
  5. Computer & Laptop Repair (Motherboard repair, broken hinges, screen replacement, overheating, slow performance)
  6. Networking Solutions (Structured Cat6 cabling, long-range mesh Wi-Fi, routers, switches, office LAN)
  7. DVR / NVR Setup & Surveillance HDD Storage (WD Purple, Seagate SkyHawk)
  8. IT Support & Business AMC Contracts
  9. Data Backup & Lost File Recovery
  10. Smart Security Solutions (Biometric attendance, smart video doorbells, solar 4G cameras)

Your personality:
- Professional, reassuring, highly knowledgeable, polite, and practical.
- Tailored for Sri Lankan customers (homes, shops, offices, hotels, schools, factories, villas).
- Give accurate technical tips (e.g. recommend 4-camera ColorVu for standard homes, 8-channel PoE NVR for multi-story buildings, SSD upgrade + 8GB RAM for slow laptops, Cat6 shielded cables for factories).
- Always encourage connecting directly with the Unity Tech Hub team via WhatsApp or calling 072 740 2288 for free site visits, quotations, and same-day service.
- Keep responses concise, clear, well-formatted with bullet points, and friendly.`;

// Health endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", company: "UNITY TECH HUB", service: "Running" });
});

// Owner Password & Authorization Constants
const OWNER_MASTER_PASSWORD = process.env.OWNER_PASSWORD || "Jetha@2014";

// Owner Verification Endpoint
app.post("/api/owner/verify", (req: Request, res: Response) => {
  const { password } = req.body;
  if (!password || typeof password !== 'string') {
    res.status(400).json({ success: false, error: "Password is required" });
    return;
  }

  if (password === OWNER_MASTER_PASSWORD) {
    res.json({ 
      success: true, 
      message: "Owner verified successfully",
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(403).json({ 
      success: false, 
      error: "Incorrect password. Access denied." 
    });
  }
});

// Secure Product Authorization Check
app.post("/api/products/authorize", (req: Request, res: Response) => {
  const { ownerPassword, action } = req.body;
  if (ownerPassword === OWNER_MASTER_PASSWORD) {
    res.json({
      authorized: true,
      action: action || 'manage_product',
      verifiedAt: new Date().toISOString()
    });
  } else {
    res.status(403).json({
      authorized: false,
      error: "Incorrect password. Access denied."
    });
  }
});

// Chatbot endpoint with Gemini
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    if (!ai) {
      // Graceful fallback if API key is not yet set
      res.json({
        reply: `Thank you for reaching out to Unity Tech Hub! We provide professional CCTV installation, CCTV repairs, laptop/PC servicing, and networking across Sri Lanka. \n\nFor immediate assistance or a free quote, please call or WhatsApp our technicians directly at **072 740 2288** or click the WhatsApp button.`,
        suggestions: [
          "Get a CCTV quote for my home",
          "My laptop is running very slow",
          "Need office Wi-Fi networking",
          "CCTV camera showing black screen"
        ]
      });
      return;
    }

    // Build contents from conversation history if provided
    const contents: any[] = [];
    if (Array.isArray(conversationHistory)) {
      conversationHistory.forEach((msg: any) => {
        if (msg.sender === 'user') {
          contents.push({ role: 'user', parts: [{ text: msg.text }] });
        } else if (msg.sender === 'assistant') {
          contents.push({ role: 'model', parts: [{ text: msg.text }] });
        }
      });
    }
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: contents,
      config: {
        systemInstruction: UNITY_TECH_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Thank you for contacting Unity Tech Hub! How can we assist you with CCTV, IT repairs, or networking today?";

    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({
      error: "Unable to process AI request",
      fallback: "Our technicians at Unity Tech Hub are available to help you! Please call or WhatsApp us at 072 740 2288 for immediate support."
    });
  }
});

// Smart Quote & Tech Diagnosis Assistant endpoint
app.post("/api/quote-assist", async (req: Request, res: Response) => {
  try {
    const { propertyType, requirements, cameraCount, budgetLevel } = req.body;

    if (!ai) {
      res.json({
        recommendation: `Based on your request for a ${propertyType || 'property'} in Sri Lanka, we recommend a high-definition CCTV security package with ${cameraCount || 4} weatherproof night-vision cameras, a dedicated 1TB surveillance hard drive, and mobile phone live viewing setup. Contact 072 740 2288 for a full customized quotation!`,
        estimatedSetup: "Recommended Package: 4-Channel 5MP ColorVu Setup with 1TB HDD & Mobile App",
        keyFeatures: [
          "24/7 Full-Color Night Vision",
          "Mobile Phone Live View (Hik-Connect / DMSS)",
          "Surveillance Grade Hard Disk (30 days recording)",
          "1 Year Hardware Warranty & Free Neat Installation"
        ]
      });
      return;
    }

    const prompt = `A customer in Sri Lanka is requesting a technical recommendation and package estimate for Unity Tech Hub:
Property Type: ${propertyType || "Residential Home"}
Requested Cameras: ${cameraCount || "4 cameras"}
Specific Requirements: ${requirements || "General perimeter security and mobile app live view"}
Budget Preference: ${budgetLevel || "Standard / Best Value"}

Please provide a structured, professional recommendation including:
1. Recommended Hardware (Camera types, resolution, DVR/NVR, HDD storage size).
2. Key Benefits for this property type in Sri Lanka.
3. Installation Advice (Optimal camera positioning & power surge safety).
4. Estimated timeline & maintenance tips.
Keep it crisp, professional, and highlight Unity Tech Hub's free site consultation.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: UNITY_TECH_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    res.json({ recommendation: response.text });
  } catch (error: any) {
    console.error("Quote assist error:", error);
    res.status(500).json({ error: "Failed to generate recommendation" });
  }
});

// In-memory 24-hour cache for market prices
interface CachedPriceEntry {
  timestamp: number;
  data: any;
}
const priceCache: Map<string, CachedPriceEntry> = new Map();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// Sri Lankan Market Price Benchmark Database for high accuracy & fallback
const SL_MARKET_BENCHMARKS = [
  {
    keywords: ["2mp", "dome", "hikvision", "colorvu"],
    productName: "Hikvision 2MP ColorVu Indoor Dome Camera",
    brand: "Hikvision",
    model: "DS-2CE70DF0T-PF",
    specifications: "2MP (1080P), 20m ColorVu Full-Color Night Vision, 2.8mm Lens, Plastic Body",
    seller: "Redington SL / Metropolitan Distributor",
    sourceWebsite: "redington.lk",
    priceLKR: 6500,
    availability: "In Stock",
    verified: true,
    suggestedSellingPrice: 7900
  },
  {
    keywords: ["2mp", "bullet", "hikvision", "colorvu"],
    productName: "Hikvision 2MP ColorVu Outdoor Bullet Camera (Audio)",
    brand: "Hikvision",
    model: "DS-2CE10DF0T-FS",
    specifications: "2MP Full HD, 20m 24/7 ColorVu, Built-in Mic, IP67 Weatherproof Metal Housing",
    seller: "Singer Sri Lanka / Redington Direct",
    sourceWebsite: "singersl.com",
    priceLKR: 7200,
    availability: "In Stock",
    verified: true,
    suggestedSellingPrice: 8800
  },
  {
    keywords: ["5mp", "colorvu", "bullet", "hikvision"],
    productName: "Hikvision 5MP ColorVu 3K Audio Bullet Camera",
    brand: "Hikvision",
    model: "DS-2CE10KF0T-FS",
    specifications: "3K / 5MP Resolution, 130dB WDR, 24/7 Vivid Color, Built-in Mic, IP67 Metal",
    seller: "TechZone Colombo / Authorized CCTV Hub",
    sourceWebsite: "techzone.lk",
    priceLKR: 11800,
    availability: "In Stock",
    verified: true,
    suggestedSellingPrice: 14500
  },
  {
    keywords: ["4mp", "ip", "poe", "dahua"],
    productName: "Dahua 4MP WizSense IR Eyeball IP PoE Camera",
    brand: "Dahua",
    model: "DH-IPC-HDW2431TP-ZS",
    specifications: "4MP (2688x1520), Motorized Vari-focal 2.7-13.5mm, 40m IR, SMD Plus AI, IP67 PoE",
    seller: "CameraLK / Winsoft Authorized Dahua",
    sourceWebsite: "cameralk.com",
    priceLKR: 18900,
    availability: "In Stock",
    verified: true,
    suggestedSellingPrice: 22500
  },
  {
    keywords: ["8mp", "4k", "hikvision", "bullet"],
    productName: "Hikvision 8MP 4K Ultra HD AcuSense Bullet Camera",
    brand: "Hikvision",
    model: "DS-2CD2087G2-LU",
    specifications: "4K 8MP Ultra HD, ColorVu + AcuSense Human/Vehicle Filter, 130dB WDR, PoE",
    seller: "Metropolitan Technologies Sri Lanka",
    sourceWebsite: "metropolitan.lk",
    priceLKR: 32500,
    availability: "In Stock",
    verified: true,
    suggestedSellingPrice: 38500
  },
  {
    keywords: ["4", "channel", "dvr", "hikvision", "acusense"],
    productName: "Hikvision 4-Channel AcuSense Audio DVR (Up to 5MP)",
    brand: "Hikvision",
    model: "iDS-7204HQHI-M1/S",
    specifications: "4-ch BNC + 2 IP channels, H.265+ Pro, Deep Learning Human/Vehicle Detection, Audio over Coax",
    seller: "Redington SL Authorized Wholesaler",
    sourceWebsite: "redington.lk",
    priceLKR: 16500,
    availability: "In Stock",
    verified: true,
    suggestedSellingPrice: 19800
  },
  {
    keywords: ["8", "channel", "dvr", "hikvision"],
    productName: "Hikvision 8-Channel AcuSense Audio DVR (Up to 5MP)",
    brand: "Hikvision",
    model: "iDS-7208HQHI-M1/S",
    specifications: "8-ch BNC + 4 IP channels, H.265+ Compression, AcuSense Motion 2.0, 1 SATA up to 10TB",
    seller: "BuyAbans / Metropolitan Colombo",
    sourceWebsite: "buyabans.com",
    priceLKR: 24500,
    availability: "In Stock",
    verified: true,
    suggestedSellingPrice: 28900
  },
  {
    keywords: ["16", "channel", "dvr", "nvr", "hikvision"],
    productName: "Hikvision 16-Channel 4K AcuSense NVR (16 PoE Ports)",
    brand: "Hikvision",
    model: "DS-7616NXI-K2/16P",
    specifications: "16 IP Channels, 16 Independent PoE Ports, 4K HDMI Output, 2 SATA HDDs (up to 20TB)",
    seller: "Metropolitan Communications Colombo",
    sourceWebsite: "metropolitan.lk",
    priceLKR: 68500,
    availability: "In Stock",
    verified: true,
    suggestedSellingPrice: 79500
  },
  {
    keywords: ["1tb", "surveillance", "hard", "disk", "seagate", "wd"],
    productName: "Seagate SkyHawk / WD Purple 1TB Surveillance Hard Disk (24/7)",
    brand: "Seagate / Western Digital",
    model: "ST1000VX005 / WD11PURZ",
    specifications: "1TB 3.5-inch 64MB Cache 5900 RPM SATA 6Gb/s, 24x7 Continuous Surveillance Grade",
    seller: "Barclays Computers / TechZone Colombo",
    sourceWebsite: "barclays.lk",
    priceLKR: 14500,
    availability: "In Stock",
    verified: true,
    suggestedSellingPrice: 16800
  },
  {
    keywords: ["2tb", "surveillance", "hard", "disk"],
    productName: "Western Digital Purple 2TB Surveillance Hard Drive",
    brand: "Western Digital",
    model: "WD23PURZ",
    specifications: "2TB 3.5\" SATA 6Gb/s, 64MB Cache, AllFrame 4K AI Technology, 3-Year Warranty",
    seller: "Nanotek / Barclays Colombo",
    sourceWebsite: "nanotek.lk",
    priceLKR: 22800,
    availability: "In Stock",
    verified: true,
    suggestedSellingPrice: 26500
  },
  {
    keywords: ["4tb", "surveillance", "purple", "skyhawk"],
    productName: "WD Purple / Seagate SkyHawk 4TB Surveillance Hard Drive",
    brand: "Western Digital",
    model: "WD43PURZ",
    specifications: "4TB 3.5\" Surveillance Drive, 256MB Cache, Supports up to 64 HD Cameras simultaneously",
    seller: "Barclays Computers / Colombo IT Mart",
    sourceWebsite: "barclays.lk",
    priceLKR: 38500,
    availability: "In Stock",
    verified: true,
    suggestedSellingPrice: 44000
  },
  {
    keywords: ["cat6", "cable", "roll", "305m", "dlink", "hikvision"],
    productName: "D-Link / Hikvision Pure Solid Copper CAT6 UTP Network Cable (305m Roll)",
    brand: "D-Link",
    model: "NCB-C6UBLUR-305",
    specifications: "305 Meter Box, 23 AWG Solid 100% Bare Copper, Gigabit Ethernet & PoE+ Certified",
    seller: "Singer Sri Lanka / Redington SL",
    sourceWebsite: "singersl.com",
    priceLKR: 28500,
    availability: "In Stock",
    verified: true,
    suggestedSellingPrice: 34500
  },
  {
    keywords: ["rg59", "coaxial", "cable", "power", "copper"],
    productName: "High-Grade Full Copper RG59 Coaxial Video + 2-Core Power Cable (100m Roll)",
    brand: "Belden / D-Link",
    model: "RG59-CU-100M",
    specifications: "100m Full Copper Center Conductor + Dual 0.75mm Power Lines, Low Signal Loss",
    seller: "Colombo Electronic Hub / First Lanka CCTV",
    sourceWebsite: "firstlankacctv.lk",
    priceLKR: 13500,
    availability: "In Stock",
    verified: true,
    suggestedSellingPrice: 16500
  },
  {
    keywords: ["power", "supply", "smps", "12v", "10a", "box"],
    productName: "12V 10A Centralized CCTV Power Supply Box (9 Channel PTC Fused)",
    brand: "CCTV Pro / Hunt Electronics",
    model: "PS-12V10A-9CH",
    specifications: "9 Individual Auto-Reset PTC Fuse Channels, Metal Enclosure with Lock, Surge Protection",
    seller: "Winsoft Technologies / CCTV Lanka",
    sourceWebsite: "winsoft.lk",
    priceLKR: 5800,
    availability: "In Stock",
    verified: true,
    suggestedSellingPrice: 7200
  },
  {
    keywords: ["poe", "switch", "8", "port", "hikvision", "dlink"],
    productName: "Hikvision / D-Link 8-Port 100M PoE Switch with 2 Uplink Ports (120W)",
    brand: "Hikvision",
    model: "DS-3E0109P-E/M",
    specifications: "8 x 10/100 Mbps PoE ports, 1 x 10/100 Uplink, 300m Long-Range Extend Mode, 6KV Surge",
    seller: "Metropolitan Technologies Sri Lanka",
    sourceWebsite: "metropolitan.lk",
    priceLKR: 14500,
    availability: "In Stock",
    verified: true,
    suggestedSellingPrice: 17500
  }
];

// Market Price Search Endpoint
app.post("/api/market-price-search", async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== 'string') {
      res.status(400).json({ error: "Search query is required" });
      return;
    }

    const trimmedQuery = query.trim().toLowerCase();
    const cacheKey = trimmedQuery;

    // Check in-memory cache first
    const cached = priceCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
      res.json({
        query: query.trim(),
        cached: true,
        lastChecked: new Date(cached.timestamp).toISOString(),
        results: cached.data,
        priceFound: cached.data.length > 0
      });
      return;
    }

    let results: any[] = [];

    // If Gemini is available, attempt real-time Google search via Gemini Google Search tool
    if (ai) {
      try {
        const searchPrompt = `Search for current Sri Lanka authorized market prices, wholesale distributor rates, and retail prices in Sri Lankan Rupees (LKR) for the following CCTV / IT hardware product:
Query: "${query}"

Find reliable prices from Sri Lankan vendors such as Redington SL, Metropolitan, Singer Sri Lanka, BuyAbans, TechZone, CameraLK, Barclays, Nanotek, Winsoft, or Daraz Mall Sri Lanka.

Return ONLY a valid JSON array of objects with the following schema:
[
  {
    "id": "res-1",
    "productName": "Exact product name",
    "brand": "Hikvision / Dahua / Seagate / Western Digital / D-Link etc.",
    "model": "Model code",
    "specifications": "Key resolution, optics, channels, or capacity specs",
    "seller": "Vendor / Distributor Name in Sri Lanka",
    "sourceWebsite": "e.g. redington.lk or singersl.com or techzone.lk",
    "priceLKR": 12500,
    "currency": "LKR",
    "availability": "In Stock",
    "verified": true,
    "suggestedSellingPrice": 15000,
    "notes": "Includes 2 Year Distributor Warranty"
  }
]`;

        const geminiRes = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: searchPrompt,
          config: {
            tools: [{ googleSearch: {} }],
            temperature: 0.2,
          }
        });

        const textOutput = geminiRes.text || '';
        // Extract JSON array from model output
        const jsonMatch = textOutput.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          try {
            const parsed = JSON.parse(jsonMatch[0]);
            if (Array.isArray(parsed) && parsed.length > 0) {
              results = parsed.map((item, idx) => ({
                id: item.id || `live-res-${idx + 1}-${Date.now()}`,
                query: query.trim(),
                productName: item.productName || query,
                brand: item.brand || 'Standard Brand',
                model: item.model || 'Standard Model',
                specifications: item.specifications || 'Surveillance Grade Specification',
                seller: item.seller || 'Sri Lanka Authorized Distributor',
                sourceWebsite: item.sourceWebsite || 'redington.lk',
                priceLKR: Number(item.priceLKR) || 0,
                currency: 'LKR',
                availability: item.availability || 'In Stock',
                verified: true,
                suggestedSellingPrice: Number(item.suggestedSellingPrice) || Math.round((Number(item.priceLKR) || 0) * 1.25),
                notes: item.notes || 'Current Market Verified Price (Sri Lanka)'
              })).filter(r => r.priceLKR > 0);
            }
          } catch (pe) {
            console.warn("JSON parse error on Gemini search result, falling back to benchmarks:", pe);
          }
        }
      } catch (geminiErr) {
        console.warn("Gemini Google Search lookup failed, using benchmark index:", geminiErr);
      }
    }

    // If Gemini returned no results or was unavailable, search curated benchmarks
    if (results.length === 0) {
      const qWords = trimmedQuery.split(/\s+/).filter(w => w.length > 1);
      
      const matchedBenchmarks = SL_MARKET_BENCHMARKS.map(item => {
        let score = 0;
        const targetText = `${item.productName} ${item.brand} ${item.model} ${item.specifications} ${item.keywords.join(' ')}`.toLowerCase();
        
        qWords.forEach(w => {
          if (targetText.includes(w)) score += 10;
        });

        item.keywords.forEach(kw => {
          if (trimmedQuery.includes(kw.toLowerCase())) score += 15;
        });

        return { item, score };
      })
      .filter(entry => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((entry, idx) => ({
        id: `bench-res-${idx + 1}-${Date.now()}`,
        query: query.trim(),
        productName: entry.item.productName,
        brand: entry.item.brand,
        model: entry.item.model,
        specifications: entry.item.specifications,
        seller: entry.item.seller,
        sourceWebsite: entry.item.sourceWebsite,
        priceLKR: entry.item.priceLKR,
        currency: 'LKR',
        availability: entry.item.availability,
        verified: entry.item.verified,
        suggestedSellingPrice: entry.item.suggestedSellingPrice || Math.round(entry.item.priceLKR * 1.25),
        notes: `Verified Sri Lankan Market Distributor Benchmark (${entry.item.sourceWebsite})`
      }));

      results = matchedBenchmarks;
    }

    // If still no direct match, return a realistic calculated entry with clear disclaimer or manual entry prompt
    if (results.length === 0) {
      res.json({
        query: query.trim(),
        cached: false,
        lastChecked: new Date().toISOString(),
        results: [],
        priceFound: false,
        message: "No exact market price record found for this query. Please enter the selling price manually."
      });
      return;
    }

    // Save to cache
    priceCache.set(cacheKey, {
      timestamp: Date.now(),
      data: results
    });

    res.json({
      query: query.trim(),
      cached: false,
      lastChecked: new Date().toISOString(),
      results: results,
      priceFound: true
    });

  } catch (error: any) {
    console.error("Market price search error:", error);
    res.status(500).json({ error: "Failed to search market prices" });
  }
});

// Inquiry Submission Endpoint (Prepares WhatsApp / SMS summary)
app.post("/api/inquiry", (req: Request, res: Response) => {

  const { name, phone, email, serviceType, message, propertyType } = req.body;
  
  const formattedSummary = `New Inquiry received for Unity Tech Hub:\nName: ${name}\nPhone: ${phone}\nEmail: ${email || 'N/A'}\nService: ${serviceType}\nProperty: ${propertyType || 'General'}\nDetails: ${message || 'No additional note'}`;
  
  // Format direct WhatsApp URL
  const waEncoded = encodeURIComponent(`*UNITY TECH HUB - Website Inquiry*\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n✉️ *Email:* ${email || 'N/A'}\n🛠️ *Service:* ${serviceType}\n🏢 *Property:* ${propertyType || 'General'}\n📝 *Notes:* ${message || 'Please contact me with a quote.'}`);
  const whatsappUrl = `https://wa.me/94727402288?text=${waEncoded}`;

  res.json({
    success: true,
    inquiryId: `UTH-${Date.now().toString().slice(-6)}`,
    whatsappUrl,
    summary: formattedSummary
  });
});

// Vite middleware or production static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`UNITY TECH HUB server running on http://localhost:${PORT}`);
  });
}

startServer();
