// Portal Statistik Indonesia — modul data tunggal.
//
// Satu-satunya sumber angka untuk seluruh halaman situs ini. Setiap halaman
// membaca dari modul ini, jadi angka yang sama tidak pernah ditulis dua kali
// dengan nilai berbeda. Semua angka adalah angka publik yang dirilis Badan
// Pusat Statistik (BPS) dalam publikasi 2019-2025, disajikan ulang dengan
// desain, teks, dan visual orisinal portal ini. Angka dibulatkan ke satu
// desimal dan selalu berlabel tahun; bila satu angka diragukan, portal ini
// memakai angka bulat berlabel tahun, bukan angka presisi palsu.
//
// Satuan: penduduk dalam juta jiwa; PDB nominal dalam triliun rupiah;
// PDB per kapita dalam dolar AS; inflasi, pengangguran, dan kemiskinan
// dalam persen.

export const META = {
  country: "Indonesia",
  siteName: "Portal Statistik Indonesia",
  tagline: "Angka resmi Indonesia, dibaca dalam satu tempat",
  updated: "26 November 2026",
  sourceNote:
    "Sumber data: Badan Pusat Statistik (BPS), publikasi 2019–2025. Angka disajikan ulang oleh portal ini.",
};

// Indikator headline tahun berjalan (2024, kecuali disebut lain).
export const HEADLINE = {
  population: { value: 283.5, unit: "juta jiwa", label: "Penduduk", year: 2024, change: 1.0, changeNote: "vs 2023" },
  gdp: { value: 22139, unit: "Rp triliun", label: "PDB nominal", year: 2024, change: 5.03, changeNote: "tumbuh riil, % yoy" },
  gdpPerCapita: { value: 4960, unit: "US$ / jiwa", label: "PDB per kapita", year: 2024, change: 1.8, changeNote: "vs 2023" },
  inflation: { value: 1.57, unit: "% yoy", label: "Inflasi (Des)", year: 2024, change: -1.04, changeNote: "poin vs Des 2023" },
  unemployment: { value: 4.91, unit: "%", label: "Pengangguran terbuka", year: 2024, change: -0.41, changeNote: "poin vs Agu 2023" },
  poverty: { value: 8.57, unit: "%", label: "Penduduk miskin", year: 2024, change: -0.79, changeNote: "poin vs Sep 2023" },
};

// Tren tahunan 2015-2024.
export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

export const POPULATION = [255.5, 258.7, 261.9, 265.0, 268.1, 270.2, 273.9, 277.7, 280.7, 283.5];

export const GDP_NOMINAL = [11531, 12407, 13588, 14839, 15834, 15444, 16977, 19588, 20892, 22139];

export const GDP_GROWTH = [4.88, 5.03, 5.07, 5.17, 5.02, -2.07, 3.7, 5.31, 5.05, 5.03];

// Inflasi Desember (yoy) 2019-2024.
export const INFLATION_ANNUAL_YEARS = [2019, 2020, 2021, 2022, 2023, 2024];
export const INFLATION_ANNUAL = [2.72, 1.68, 1.87, 5.51, 2.61, 1.57];

// Inflasi bulanan (yoy) Januari-Desember 2024.
export const INFLATION_MONTHLY_2024 = [2.57, 2.75, 3.05, 3.0, 2.84, 2.51, 2.13, 2.12, 1.84, 1.71, 1.55, 1.57];
export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

// Tingkat pengangguran terbuka (Agustus) dan TPAK (Agustus) 2019-2024.
export const LABOUR_YEARS = [2019, 2020, 2021, 2022, 2023, 2024];
export const UNEMPLOYMENT = [5.28, 7.07, 6.49, 5.86, 5.32, 4.91];
export const TPAK = [67.49, 67.77, 68.35, 68.63, 69.48, 70.63];

// Kemiskinan (September) 2019-2024.
export const POVERTY_YEARS = [2019, 2020, 2021, 2022, 2023, 2024];
export const POVERTY = [9.22, 10.19, 9.71, 9.57, 9.36, 8.57];

// Komposisi PDB menurut lapangan usaha, 2024 (%).
export const GDP_SECTORS = [
  ["Industri pengolahan", 18.7],
  ["Perdagangan", 13.0],
  ["Pertanian, kehutanan & perikanan", 12.5],
  ["Konstruksi", 10.0],
  ["Pertambangan & penggalian", 8.4],
  ["Transportasi & pergudangan", 5.5],
  ["Informasi & komunikasi", 4.1],
  ["Jasa keuangan & asuransi", 4.1],
  ["Akomodasi & makan minum", 2.6],
  ["Jasa lainnya", 21.1],
];

// Perdagangan luar negeri 2024 (miliar US$).
export const TRADE_2024 = { exports: 264.7, imports: 233.7, surplus: 31.0 };

// Piramida penduduk 2024: persen penduduk per kelompok umur, laki-laki / perempuan.
export const AGE_GROUPS = [
  ["0–4", 4.0, 3.9],
  ["5–9", 4.2, 4.1],
  ["10–14", 4.4, 4.2],
  ["15–19", 4.4, 4.2],
  ["20–24", 4.3, 4.1],
  ["25–29", 4.1, 3.9],
  ["30–34", 3.9, 3.8],
  ["35–39", 3.8, 3.6],
  ["40–44", 3.5, 3.4],
  ["45–49", 3.2, 3.0],
  ["50–54", 2.8, 2.6],
  ["55–59", 2.3, 2.4],
  ["60–64", 1.8, 2.0],
  ["65+", 3.4, 4.7],
];

// Sepuluh provinsi terpadat, perkiraan 2024 (juta jiwa), kepadatan (jiwa/km2), ibu kota.
export const TOP_PROVINCES = [
  { name: "Jawa Barat", pop: 50.4, density: 1360, capital: "Bandung" },
  { name: "Jawa Timur", pop: 41.8, density: 875, capital: "Surabaya" },
  { name: "Jawa Tengah", pop: 38.3, density: 1115, capital: "Semarang" },
  { name: "Sumatera Utara", pop: 15.6, density: 214, capital: "Medan" },
  { name: "Banten", pop: 12.4, density: 1285, capital: "Serang" },
  { name: "DKI Jakarta", pop: 10.6, density: 15900, capital: "Jakarta" },
  { name: "Sulawesi Selatan", pop: 9.5, density: 203, capital: "Makassar" },
  { name: "Lampung", pop: 9.3, density: 263, capital: "Bandar Lampung" },
  { name: "Sumatera Selatan", pop: 8.9, density: 97, capital: "Palembang" },
  { name: "Riau", pop: 6.9, density: 79, capital: "Pekanbaru" },
];

// Provinsi untuk peta skematik: nama, penduduk perkiraan 2024 (juta), ibu kota,
// dan poligon skematik di viewBox 1000x360. Bentuk pulau disederhanakan sendiri;
// ini peta sketsa, bukan salinan peta mana pun.
export const MAP_PROVINCES = [
  { id: "aceh", name: "Aceh", pop: 5.6, capital: "Banda Aceh", points: "119,45 81,65 98,98 136,79" },
  { id: "sumut", name: "Sumatera Utara", pop: 15.6, capital: "Medan", points: "136,79 98,98 116,132 153,113" },
  { id: "sumbar", name: "Sumatera Barat", pop: 5.9, capital: "Padang", points: "153,113 116,132 133,165 170,146" },
  { id: "riau", name: "Riau", pop: 6.9, capital: "Pekanbaru", points: "170,146 133,165 150,199 187,180" },
  { id: "jambi", name: "Jambi", pop: 3.7, capital: "Jambi", points: "187,180 150,199 167,232 204,213" },
  { id: "sumsel", name: "Sumatera Selatan", pop: 8.9, capital: "Palembang", points: "204,213 167,232 184,266 222,247" },
  { id: "bengkulu", name: "Bengkulu", pop: 2.1, capital: "Bengkulu", points: "116,136 167,234 156,240 106,141" },
  { id: "lampung", name: "Lampung", pop: 9.3, capital: "Bandar Lampung", points: "222,247 184,266 201,300 239,280" },
  { id: "babel", name: "Kep. Bangka Belitung", pop: 1.5, capital: "Pangkal Pinang", points: "270,200 290,195 295,215 275,220" },
  { id: "kepri", name: "Kep. Riau", pop: 2.3, capital: "Tanjung Pinang", points: "240,110 260,105 265,125 245,130" },
  { id: "banten", name: "Banten", pop: 12.4, capital: "Serang", points: "300,300 330,295 340,310 325,325 300,320" },
  { id: "jabar", name: "Jawa Barat", pop: 50.4, capital: "Bandung", points: "340,310 330,295 390,290 410,300 400,318 360,322 325,325" },
  { id: "dki", name: "DKI Jakarta", pop: 10.6, capital: "Jakarta", points: "355,292 368,288 372,296 360,300" },
  { id: "jateng", name: "Jawa Tengah", pop: 38.3, capital: "Semarang", points: "410,300 390,290 450,285 470,295 460,312 430,318 400,318" },
  { id: "diy", name: "DI Yogyakarta", pop: 3.8, capital: "Yogyakarta", points: "430,318 460,312 465,322 445,328 432,326" },
  { id: "jatim", name: "Jawa Timur", pop: 41.8, capital: "Surabaya", points: "470,295 450,285 510,280 540,290 530,308 495,312 460,312" },
  { id: "bali", name: "Bali", pop: 4.4, capital: "Denpasar", points: "545,318 570,315 575,325 550,330" },
  { id: "ntb", name: "Nusa Tenggara Barat", pop: 5.6, capital: "Mataram", points: "580,318 610,315 615,326 585,330" },
  { id: "ntt", name: "Nusa Tenggara Timur", pop: 5.7, capital: "Kupang", points: "620,318 660,315 680,325 640,332" },
  { id: "kalbar", name: "Kalimantan Barat", pop: 5.8, capital: "Pontianak", points: "380,110 420,95 455,110 450,150 415,165 385,150" },
  { id: "kalteng", name: "Kalimantan Tengah", pop: 2.8, capital: "Palangka Raya", points: "455,110 500,100 525,120 515,160 480,170 450,150" },
  { id: "kalsel", name: "Kalimantan Selatan", pop: 4.3, capital: "Banjarmasin", points: "480,170 515,160 530,185 515,205 485,200" },
  { id: "kaltim", name: "Kalimantan Timur", pop: 4.0, capital: "Samarinda", points: "525,120 560,110 575,135 560,170 530,185 515,160" },
  { id: "kaltara", name: "Kalimantan Utara", pop: 0.7, capital: "Tanjung Selor", points: "560,110 590,100 600,120 575,135" },
  { id: "sulut", name: "Sulawesi Utara", pop: 2.8, capital: "Manado", points: "660,95 695,85 710,100 690,115 665,110" },
  { id: "gorontalo", name: "Gorontalo", pop: 1.3, capital: "Gorontalo", points: "635,115 665,110 672,128 645,138 630,128" },
  { id: "sulteng", name: "Sulawesi Tengah", pop: 3.1, capital: "Palu", points: "630,128 645,138 650,165 635,190 615,180 612,150" },
  { id: "sulbar", name: "Sulawesi Barat", pop: 1.6, capital: "Mamuju", points: "615,180 635,190 630,215 612,208 608,192" },
  { id: "sulsel", name: "Sulawesi Selatan", pop: 9.5, capital: "Makassar", points: "635,190 650,165 665,180 655,210 640,228 625,218 630,215" },
  { id: "sultra", name: "Sulawesi Tenggara", pop: 2.8, capital: "Kendari", points: "665,180 690,172 700,192 680,210 655,210" },
  { id: "malut", name: "Maluku Utara", pop: 1.4, capital: "Sofifi", points: "735,120 755,115 762,132 745,140 733,132" },
  { id: "maluku", name: "Maluku", pop: 2.0, capital: "Ambon", points: "740,190 765,185 775,200 755,212 738,205" },
  { id: "papuabarat", name: "Papua Barat", pop: 1.2, capital: "Manokwari", points: "800,160 840,150 855,168 840,188 805,182" },
  { id: "papua", name: "Papua", pop: 1.1, capital: "Jayapura", points: "855,168 905,155 950,165 945,190 895,198 840,188" },
];

// Inflasi per kelompok pengeluaran, Desember 2024 (yoy, %).
export const CPI_GROUPS = [
  ["Makanan, minuman & tembakau", 2.04],
  ["Pakaian & alas kaki", 1.03],
  ["Perumahan, air, listrik & bahan bakar", 0.65],
  ["Perlengkapan rumah tangga", 1.02],
  ["Kesehatan", 1.69],
  ["Transportasi", 0.61],
  ["Informasi, komunikasi & jasa keuangan", 0.06],
  ["Rekreasi, olahraga & budaya", 0.92],
  ["Pendidikan", 1.78],
  ["Penyediaan makanan & minuman / restoran", 2.19],
  ["Perawatan pribadi & jasa lainnya", 5.76],
];

// Sebaran penduduk bekerja menurut lapangan usaha utama, Agustus 2024 (%).
export const EMPLOYMENT_SECTORS = [
  ["Pertanian, kehutanan & perikanan", 27.9],
  ["Perdagangan", 19.2],
  ["Industri pengolahan", 13.4],
  ["Konstruksi", 9.5],
  ["Jasa kemasyarakatan & pemerintahan", 16.5],
  ["Akomodasi & makan minum", 6.0],
  ["Transportasi & pergudangan", 4.9],
  ["Lapangan usaha lainnya", 2.6],
];

// Rilis statistik terbaru (judul, tanggal rilis, ringkasan).
export const RELEASES = [
  { date: "5 Feb 2025", title: "Pertumbuhan Ekonomi Indonesia 2024", summary: "Ekonomi tumbuh 5,03 persen sepanjang 2024; PDB nominal mencapai Rp22.139 triliun." },
  { date: "15 Jan 2025", title: "Profil Kemiskinan September 2024", summary: "Penduduk miskin turun menjadi 8,57 persen, terendah dalam satu dekade terakhir." },
  { date: "2 Jan 2025", title: "Inflasi Desember 2024", summary: "Inflasi Desember 2024 sebesar 1,57 persen (yoy), terendah sejak 2021." },
  { date: "5 Nov 2024", title: "Keadaan Ketenagakerjaan Agustus 2024", summary: "Tingkat pengangguran terbuka turun menjadi 4,91 persen; TPAK naik ke 70,63 persen." },
];

// Tabel indikator tahunan untuk halaman Tabel Data: [tahun, penduduk, PDB nominal, pertumbuhan, inflasi Des, TPT Agu, kemiskinan Sep].
export const INDICATOR_TABLE = YEARS.map((y, i) => ({
  year: y,
  population: POPULATION[i],
  gdp: GDP_NOMINAL[i],
  growth: GDP_GROWTH[i],
  inflation: i < 4 ? null : INFLATION_ANNUAL[i - 4],
  unemployment: i < 4 ? null : UNEMPLOYMENT[i - 4],
  poverty: i < 4 ? null : POVERTY[i - 4],
}));
