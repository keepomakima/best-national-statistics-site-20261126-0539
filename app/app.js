// Portal Statistik Indonesia — logika halaman.
//
// Semua halaman membaca angka dari data.js (satu sumber kebenaran). Skrip ini
// menggambar grafik SVG, mengisi pemilih tahun, menghidupkan sortir/filter/
// pencarian tabel, dan menghidupkan peta provinsi. Bila JavaScript mati, isi
// pokok halaman (angka headline, tabel, rilis) tetap terbaca karena sudah
// ditulis di HTML; grafik dan kontrol interaktif adalah lapisannya.

import * as D from "./data.js";
import { lineChart, barChart, hbarChart, donutChart, pyramidChart, PALETTE } from "./charts.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const fmtID = (n, d = 1) => Number(n).toLocaleString("id-ID", { minimumFractionDigits: d, maximumFractionDigits: d });
const fmtInt = (n) => Number(n).toLocaleString("id-ID");

function mount(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

// ---------- Beranda ----------
function initHome() {
  mount("chart-gdp", lineChart({
    labels: D.YEARS.map(String), values: D.GDP_NOMINAL, unit: "",
    title: "PDB nominal Indonesia 2015–2024 (Rp triliun)", highlight: 9,
  }));
  mount("chart-pyramid", pyramidChart({ groups: D.AGE_GROUPS, title: "Piramida penduduk Indonesia 2024" }));
  mount("chart-sectors", donutChart({
    labels: D.GDP_SECTORS.map((s) => s[0]), values: D.GDP_SECTORS.map((s) => s[1]),
    colors: PALETTE, title: "Komposisi PDB menurut lapangan usaha 2024",
  }));
  mount("sector-legend", `<ul class="legend-list">${D.GDP_SECTORS.map(
    ([name, v], i) => `<li><i style="background:${PALETTE[i % PALETTE.length]}"></i>${name} — <b>${fmtID(v)}%</b></li>`,
  ).join("")}</ul>`);
}

// ---------- Penduduk ----------
function initPopulation() {
  const sel = $("#year-select");
  if (!sel) return;
  D.YEARS.forEach((y) => {
    const o = document.createElement("option");
    o.value = y; o.textContent = y;
    if (y === 2024) o.selected = true;
    sel.appendChild(o);
  });
  const render = () => {
    const year = Number(sel.value);
    const i = D.YEARS.indexOf(year);
    const pop = D.POPULATION[i];
    const prev = i > 0 ? D.POPULATION[i - 1] : null;
    const growth = prev ? ((pop - prev) / prev) * 100 : null;
    $("#pop-value").innerHTML = `${fmtID(pop)} <small>juta jiwa</small>`;
    $("#pop-growth").textContent = growth === null ? "—" : `+${fmtID(growth, 2)}% vs ${year - 1}`;
    $("#pop-year-label").textContent = `Tahun ${year}`;
    mount("chart-pop-trend", lineChart({
      labels: D.YEARS.map(String), values: D.POPULATION, unit: "",
      title: "Jumlah penduduk Indonesia 2015–2024 (juta jiwa)", highlight: i,
    }));
  };
  sel.addEventListener("change", render);
  render();
  mount("chart-pyramid", pyramidChart({ groups: D.AGE_GROUPS, title: "Piramida penduduk Indonesia 2024" }));
}

// ---------- Ekonomi ----------
function initEconomy() {
  const sel = $("#year-select");
  if (!sel) return;
  D.YEARS.forEach((y) => {
    const o = document.createElement("option");
    o.value = y; o.textContent = y;
    if (y === 2024) o.selected = true;
    sel.appendChild(o);
  });
  const render = () => {
    const year = Number(sel.value);
    const i = D.YEARS.indexOf(year);
    $("#gdp-value").innerHTML = `Rp${fmtInt(D.GDP_NOMINAL[i])} <small>triliun</small>`;
    $("#gdp-growth").textContent = `${fmtID(D.GDP_GROWTH[i], 2)}% yoy (riil)`;
    $("#gdp-year-label").textContent = `Tahun ${year}`;
    mount("chart-gdp-trend", lineChart({
      labels: D.YEARS.map(String), values: D.GDP_NOMINAL, unit: "",
      title: "PDB nominal Indonesia 2015–2024 (Rp triliun)", highlight: i,
    }));
    mount("chart-gdp-growth", barChart({
      labels: D.YEARS.map(String), values: D.GDP_GROWTH, unit: "%",
      title: "Pertumbuhan ekonomi riil 2015–2024 (%)", highlight: i,
    }));
  };
  sel.addEventListener("change", render);
  render();
  mount("chart-sectors", donutChart({
    labels: D.GDP_SECTORS.map((s) => s[0]), values: D.GDP_SECTORS.map((s) => s[1]),
    colors: PALETTE, title: "Komposisi PDB menurut lapangan usaha 2024",
  }));
  mount("sector-legend", `<ul class="legend-list">${D.GDP_SECTORS.map(
    ([name, v], i) => `<li><i style="background:${PALETTE[i % PALETTE.length]}"></i>${name} — <b>${fmtID(v)}%</b></li>`,
  ).join("")}</ul>`);
}

// ---------- Harga & Inflasi ----------
function initPrices() {
  const sel = $("#year-select");
  D.INFLATION_ANNUAL_YEARS.forEach((y) => {
    const o = document.createElement("option");
    o.value = y; o.textContent = y;
    if (y === 2024) o.selected = true;
    sel.appendChild(o);
  });
  const renderAnnual = () => {
    const year = Number(sel.value);
    const i = D.INFLATION_ANNUAL_YEARS.indexOf(year);
    $("#infl-value").innerHTML = `${fmtID(D.INFLATION_ANNUAL[i], 2)}<small>% yoy</small>`;
    $("#infl-year-label").textContent = `Inflasi Desember ${year} (yoy)`;
    mount("chart-infl-annual", lineChart({
      labels: D.INFLATION_ANNUAL_YEARS.map(String), values: D.INFLATION_ANNUAL, unit: "%",
      title: "Inflasi Desember (yoy) 2019–2024", highlight: i, color: "#b0566e",
    }));
  };
  sel.addEventListener("change", renderAnnual);
  renderAnnual();
  mount("chart-infl-monthly", barChart({
    labels: D.MONTHS, values: D.INFLATION_MONTHLY_2024, unit: "%",
    title: "Inflasi bulanan (yoy) Januari–Desember 2024", color: "#b0566e",
  }));
  mount("chart-cpi-groups", hbarChart({
    labels: D.CPI_GROUPS.map((g) => g[0]), values: D.CPI_GROUPS.map((g) => g[1]),
    unit: "%", color: "#b0566e", title: "Inflasi per kelompok pengeluaran, Desember 2024 (yoy)", decimals: 2, height: 330,
  }));
}

// ---------- Ketenagakerjaan ----------
function initLabour() {
  const sel = $("#year-select");
  D.LABOUR_YEARS.forEach((y) => {
    const o = document.createElement("option");
    o.value = y; o.textContent = y;
    if (y === 2024) o.selected = true;
    sel.appendChild(o);
  });
  const render = () => {
    const year = Number(sel.value);
    const i = D.LABOUR_YEARS.indexOf(year);
    $("#tpt-value").innerHTML = `${fmtID(D.UNEMPLOYMENT[i], 2)}<small>%</small>`;
    $("#tpak-value").innerHTML = `${fmtID(D.TPAK[i], 2)}<small>%</small>`;
    $("#labour-year-label").textContent = `Agustus ${year}`;
    mount("chart-tpt", lineChart({
      labels: D.LABOUR_YEARS.map(String), values: D.UNEMPLOYMENT, unit: "%",
      title: "Tingkat pengangguran terbuka (Agustus) 2019–2024", highlight: i, color: "#7a6aa8",
    }));
    mount("chart-tpak", lineChart({
      labels: D.LABOUR_YEARS.map(String), values: D.TPAK, unit: "%",
      title: "Tingkat partisipasi angkatan kerja (Agustus) 2019–2024", highlight: i, color: "#5b8c5a",
    }));
  };
  sel.addEventListener("change", render);
  render();
  mount("chart-emp-sectors", hbarChart({
    labels: D.EMPLOYMENT_SECTORS.map((s) => s[0]), values: D.EMPLOYMENT_SECTORS.map((s) => s[1]),
    unit: "%", color: "#7a6aa8", title: "Penduduk bekerja menurut lapangan usaha, Agustus 2024", height: 260,
  }));
}

// ---------- Wilayah ----------
function colorFor(pop) {
  if (pop >= 40) return "#0a5e5d";
  if (pop >= 15) return "#0e7c7b";
  if (pop >= 9) return "#3a9a98";
  if (pop >= 5) return "#7cc4c2";
  if (pop >= 2) return "#b5dcd9";
  return "#dceeed";
}

function initRegions() {
  const svg = $("#map");
  if (svg) {
    svg.innerHTML = D.MAP_PROVINCES.map((p) => {
      const top = D.TOP_PROVINCES.find((t) => t.name === p.name);
      const density = top ? top.density : null;
      return `<polygon class="province" data-id="${p.id}" points="${p.points}" fill="${colorFor(p.pop)}"><title>${p.name} — ${fmtID(p.pop)} juta jiwa</title></polygon>`;
    }).join("") + `<text x="30" y="20" font-size="13" font-weight="700" fill="#0f2a43">Peta skematik Indonesia</text><text x="30" y="36" font-size="11" fill="#6b7a86">Warna = jumlah penduduk 2024 (makin gelap makin padat). Klik provinsi untuk detail.</text>`;
    $$(".province", svg).forEach((el) => el.addEventListener("click", () => selectProvince(el.dataset.id)));
  }
  const tbody = $("#province-rows");
  const renderRows = (rows) => {
    tbody.innerHTML = rows.map((p, i) => `<tr><td class="rank">${i + 1}</td><td><a href="#" data-prov="${p.name}" class="prov-link">${p.name}</a></td><td class="num">${fmtID(p.pop)}</td><td class="num">${fmtInt(p.density)}</td><td>${p.capital}</td></tr>`).join("");
    $$(".prov-link", tbody).forEach((a) => a.addEventListener("click", (e) => {
      e.preventDefault();
      const prov = D.MAP_PROVINCES.find((m) => m.name === a.dataset.prov);
      if (prov) selectProvince(prov.id);
    }));
  };
  let rows = [...D.TOP_PROVINCES];
  renderRows(rows);
  let currentKey = "pop", currentDir = "desc";
  $$("[data-sort]").forEach((btn) => btn.addEventListener("click", () => {
    const key = btn.dataset.sort;
    let dir;
    if (key === currentKey) dir = currentDir === "asc" ? "desc" : "asc";
    else dir = key === "name" ? "asc" : "desc"; // kunci numerik: klik pertama = terbesar dulu
    currentKey = key; currentDir = dir;
    $$("[data-sort]").forEach((b) => { b.dataset.dir = ""; b.setAttribute("aria-pressed", "false"); });
    btn.dataset.dir = dir;
    btn.setAttribute("aria-pressed", "true");
    const asc = dir === "asc";
    rows = [...D.TOP_PROVINCES].sort((a, b) => {
      if (key === "name") return asc ? a.name.localeCompare(b.name, "id") : b.name.localeCompare(a.name, "id");
      return asc ? a[key] - b[key] : b[key] - a[key];
    });
    renderRows(rows);
  }));
  mount("chart-top-prov", hbarChart({
    labels: D.TOP_PROVINCES.map((p) => p.name), values: D.TOP_PROVINCES.map((p) => p.pop),
    unit: " jt", color: "#0e7c7b", title: "Sepuluh provinsi terpadat 2024 (juta jiwa)", height: 320,
  }));
  selectProvince("jabar");
}

function selectProvince(id) {
  const p = D.MAP_PROVINCES.find((m) => m.id === id);
  if (!p) return;
  $$(".province").forEach((el) => el.classList.toggle("selected", el.dataset.id === id));
  const top = D.TOP_PROVINCES.find((t) => t.name === p.name);
  const density = top ? `${fmtInt(top.density)} jiwa/km²` : "di luar 10 besar";
  const rank = top ? `Peringkat ${D.TOP_PROVINCES.indexOf(top) + 1} dari 10 provinsi terpadat` : "Di luar 10 provinsi terpadat";
  mount("province-detail", `<h3>${p.name}</h3><dl><dt>Penduduk 2024</dt><dd>${fmtID(p.pop)} juta jiwa (perkiraan)</dd><dt>Kepadatan</dt><dd>${density}</dd><dt>Ibu kota</dt><dd>${p.capital}</dd><dt>Catatan</dt><dd>${rank}</dd></dl>`);
}

// ---------- Tabel Data ----------
function initDataTable() {
  const tbody = $("#data-rows");
  const search = $("#table-search");
  const cat = $("#table-category");
  let sortKey = "year", sortDir = 1;
  const render = () => {
    const q = (search.value || "").trim().toLowerCase();
    let rows = D.INDICATOR_TABLE.filter((r) => !q || String(r.year).includes(q));
    rows = [...rows].sort((a, b) => (a[sortKey] - b[sortKey]) * sortDir);
    tbody.innerHTML = rows.map((r) => `<tr><td class="rank">${r.year}</td><td class="num">${fmtID(r.population)}</td><td class="num">${fmtInt(r.gdp)}</td><td class="num">${r.growth === null ? "—" : fmtID(r.growth, 2) + "%"}</td><td class="num">${r.inflation === null ? "—" : fmtID(r.inflation, 2) + "%"}</td><td class="num">${r.unemployment === null ? "—" : fmtID(r.unemployment, 2) + "%"}</td><td class="num">${r.poverty === null ? "—" : fmtID(r.poverty, 2) + "%"}</td></tr>`).join("");
    $("#row-count").textContent = `${rows.length} baris ditampilkan dari ${D.INDICATOR_TABLE.length} tahun.`;
  };
  $$("th.sortable").forEach((th) => th.addEventListener("click", () => {
    const key = th.dataset.key;
    if (sortKey === key) sortDir *= -1;
    else { sortKey = key; sortDir = 1; }
    $$("th.sortable").forEach((t) => t.classList.remove("sorted-asc", "sorted-desc"));
    th.classList.add(sortDir === 1 ? "sorted-asc" : "sorted-desc");
    render();
  }));
  search.addEventListener("input", render);
  cat.addEventListener("change", () => {
    const v = cat.value;
    $$("#prov-table tbody tr").forEach((tr) => {
      tr.style.display = v === "all" || tr.dataset.cat === v ? "" : "none";
    });
  });
  render();
  // Tabel provinsi di halaman yang sama: bisa dicari juga.
  const provSearch = $("#prov-search");
  if (provSearch) provSearch.addEventListener("input", () => {
    const q = provSearch.value.trim().toLowerCase();
    $$("#prov-table tbody tr").forEach((tr) => {
      tr.style.display = tr.textContent.toLowerCase().includes(q) ? "" : "none";
    });
  });
}

// ---------- Boot ----------
const page = document.body.dataset.page;
if (page === "home") initHome();
else if (page === "population") initPopulation();
else if (page === "economy") initEconomy();
else if (page === "prices") initPrices();
else if (page === "labour") initLabour();
else if (page === "regions") initRegions();
else if (page === "data") initDataTable();

window.__shotReady = true;
