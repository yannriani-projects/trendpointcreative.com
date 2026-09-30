// ---------------------------------------------------------------------------
// SERVICES.JS — lima hal yang Trendpoint kerjakan, kartu intro, dan kuis
//
// Catatan: "Media Sosial" sudah mencakup produksi konten (reels, foto,
// video, carousel) sampai posting — bukan cuma jadwal & caption.
// "Ide Kreatif" sudah mencakup strategi & struktur konten (content pillar,
// campaign planning, perencanaan bulanan) — bukan cuma hook/angle sesaat.
// ---------------------------------------------------------------------------

// "JADI, SEBENARNYA KAMI NGERJAIN APA?" — lima kartu intro interaktif
export const INTRO_CARDS = [
  {
    id: "social-media",
    icon: "social",
    title: "Media Sosial",
    text: "Dari rencana, produksi konten, sampai posting — kami pegang biar akunmu tetap aktif dan konsisten.",
  },
  {
    id: "creative-ideas",
    icon: "ideas",
    title: "Ide Kreatif",
    text: "Content pillar, strategi, campaign, hook, sampai angle — biar brand kamu nggak bingung lagi mau ngomong apa.",
  },
  {
    id: "photography",
    icon: "photography",
    title: "Foto Produk",
    text: "Visual produk yang bikin produkmu lebih mudah dilihat, dipahami, dan diingat.",
  },
  {
    id: "digital-products",
    icon: "digital",
    title: "Produk Digital",
    text: "Template, workbook, panduan, dan produk digital bermanfaat lainnya.",
  },
  {
    id: "company-profile",
    icon: "kompro",
    title: "Company Profile",
    text: "Company profile (kompro) yang rapi untuk presentasi bisnis atau kerja sama — bisa format PPT atau microsite (web statis).",
  },
];

// Rincian lengkap layanan — menjadi isi accordion "Layanan"
export const SERVICES = [
  {
    id: "social-media",
    number: "01",
    title: "Media Sosial",
    intro: "Untuk brand dan UMKM yang mau media sosialnya tetap aktif dan konsisten — dari rencana sampai konten siap posting.",
    items: [
      "Perencanaan & kalender konten",
      "Produksi konten: reels, video pendek, foto, carousel",
      "Penulisan caption",
      "Posting",
      "Manajemen media sosial harian",
      "Evaluasi konten",
    ],
  },
  {
    id: "creative-ideas",
    number: "02",
    title: "Ide Kreatif",
    intro: "Untuk brand yang bingung \u201cmau posting apa lagi ya?\u201d — kami bantu dari strategi sampai konsepnya.",
    items: [
      "Content pillar",
      "Perencanaan campaign & bulanan",
      "Arahan/struktur konten",
      "Ide konten & hook",
      "Angle kreatif",
      "Adaptasi tren",
    ],
  },
  {
    id: "product-photography",
    number: "03",
    title: "Foto Produk",
    intro: "Foto produk untuk Instagram, marketplace, website, katalog, dan campaign.",
    items: ["Instagram", "Marketplace", "Website", "Katalog", "Campaign"],
  },
  {
    id: "digital-products",
    number: "04",
    title: "Produk Digital",
    intro: "Kami juga mengembangkan produk digital seperti template dan sumber daya bisnis.",
    items: ["Template", "Workbook", "Checklist", "Panduan", "Sumber daya bisnis", "Tools untuk kreator"],
  },
  {
    id: "company-profile",
    number: "05",
    title: "Company Profile",
    intro: "Kami bantu bikin company profile yang profesional untuk presentasi bisnis, proposal, atau kerja sama — format menyesuaikan kebutuhanmu.",
    items: [
      "Format PPT (siap presentasi)",
      "Atau format microsite / web statis satu halaman",
      "Struktur & copywriting isi",
      "Profil produk/jasa",
      "Deck proposal kerja sama",
      "Revisi sesuai kebutuhan",
    ],
  },
];

// "BRAND KAMU SEKARANG BUTUH APA?" — opsi kuis + rekomendasinya
export const QUIZ = [
  {
    id: "social",
    prompt: "Aku butuh konten & media sosial dikelola",
    resultTitle: "Kamu mungkin butuh: Media Sosial",
    resultText: "Dari rencana, produksi reels/foto/video, sampai posting — biar akunmu tetap jalan tanpa ribet.",
    serviceId: "social-media",
  },
  {
    id: "ideas",
    prompt: "Aku butuh ide & strategi konten",
    resultTitle: "Kamu mungkin butuh: Ide Kreatif",
    resultText: "Content pillar, campaign, sampai arah konten bulanan — biar nggak bingung lagi mau posting apa.",
    serviceId: "creative-ideas",
  },
  {
    id: "visuals",
    prompt: "Aku butuh visual produk",
    resultTitle: "Kamu mungkin butuh: Foto Produk",
    resultText: "Yuk bikin produkmu terlihat sebagus aslinya, versi online.",
    serviceId: "product-photography",
  },
  {
    id: "digital",
    prompt: "Aku mau bikin produk digital",
    resultTitle: "Kamu mungkin butuh: Produk Digital",
    resultText: "Yuk ubah pengetahuanmu jadi template, panduan, atau tools yang benar-benar dipakai orang.",
    serviceId: "digital-products",
  },
  {
    id: "kompro",
    prompt: "Aku butuh company profile",
    resultTitle: "Kamu mungkin butuh: Company Profile",
    resultText: "Bisa format PPT atau microsite — yuk bikin bisnismu terlihat lebih profesional dan siap diajak kerja sama.",
    serviceId: "company-profile",
  },
];
