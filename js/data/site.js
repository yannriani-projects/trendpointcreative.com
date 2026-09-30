// ---------------------------------------------------------------------------
// SITE.JS — identitas inti, navigasi, kontak + dua blok konten statis
// Ubah apa saja di sini untuk memperbarui teks di seluruh situs.
// ---------------------------------------------------------------------------

export const SITE = {
  name: "Trendpoint Creative",
  shortName: "Trendpoint",
  tagline: "Temukan Titikmu. Berkarya dengan Tujuan.",
  altLine: "Kami menemukan ide di balik brand kamu.",

  nav: [
    { label: "Beranda", href: "#home" },
    { label: "Yang Kami Kerjakan", href: "#what-we-do" },
    { label: "Portofolio", href: "#playground" },
    { label: "Layanan", href: "#services" },
    { label: "Mulai Sekarang", href: "#start", cta: true },
  ],

  // Ganti dengan handle/nomor/alamat asli studio kapan pun sudah siap.
  social: {
    instagram: "https://instagram.com/trendpoint.creative",
    tiktok: "https://tiktok.com/@trendpoint.creative",
    whatsapp: "https://wa.me/6281234567890",
    email: "hello@trendpointcreative.com",
  },

  footerNote: "Dibuat dengan ide, rasa ingin tahu, dan sedikit kekacauan.",
  year: 2026,
};

// "DARI IDE JADI SESUATU YANG NYATA" — alur kerja kreatif
export const PROCESS = [
  { number: "01", title: "Ngobrol Dulu", text: "Ceritakan apa yang mau kamu bangun." },
  { number: "02", title: "Kenali Brand", text: "Kami pahami brand, audiens, produk, dan tujuanmu." },
  { number: "03", title: "Temukan Titiknya", text: "Kami cari sudut pandang kreatifnya." },
  { number: "04", title: "Eksekusi", text: "Ide diubah jadi konten, visual, atau produk digital." },
  { number: "05", title: "Serah Terima", text: "Kamu menerima aset kreatif yang siap pakai." },
  { number: "06", title: "Evaluasi & Ulangi", text: "Kami belajar, perbaiki, dan berkarya lagi." },
];

// "KENAPA TRENDPOINT?" — empat poin positioning
export const WHY = [
  {
    title: "Peka Tren",
    text: "Kami memperhatikan tren digital tanpa asal ikut-ikutan.",
  },
  {
    title: "Ide Dulu, Bukan Template",
    text: "Kami mulai dari ide, bukan sekadar template.",
  },
  {
    title: "Kecil & Personal",
    text: "Kami masih berkembang, jadi kami bisa membangun hubungan yang lebih dekat dengan brand yang kami ajak kerja sama — cocok untuk UMKM yang ingin didengar, bukan cuma jadi nomor antrean.",
  },
  {
    title: "Kami Juga Berkarya Sendiri",
    text: "Kami nggak cuma membuat untuk klien. Kami juga membangun brand sendiri lewat Corvaapparel dan produk digital Dompet Gen Z.",
  },
];
