// Grafik SVG buatan tangan untuk Portal Statistik Indonesia.
//
// Tanpa library eksternal: setiap grafik dirangkai dari elemen SVG dengan
// JavaScript biasa. Semua fungsi mengembalikan string SVG yang bisa disisipkan
// ke halaman, lengkap dengan label nilai dan judul aksesibel.

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const fmt = (n, decimals = 1) =>
  Number(n).toLocaleString("id-ID", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

// Grafik garis dengan sumbu, grid, titik, dan label nilai.
export function lineChart({ labels, values, width = 640, height = 280, unit = "", color = "#0e7c7b", highlight = -1, title = "" }) {
  const padL = 52, padR = 14, padT = 18, padB = 30;
  const min = Math.min(...values), max = Math.max(...values);
  const lo = min - (max - min) * 0.15, hi = max + (max - min) * 0.15;
  const x = (i) => padL + (i * (width - padL - padR)) / (labels.length - 1);
  const y = (v) => padT + ((hi - v) * (height - padT - padB)) / (hi - lo);
  const grid = [0.25, 0.5, 0.75].map((f) => {
    const v = lo + (hi - lo) * f;
    return `<line x1="${padL}" y1="${y(v)}" x2="${width - padR}" y2="${y(v)}" stroke="#e3e8ec" stroke-width="1"/><text x="${padL - 6}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="#6b7a86">${fmt(v, 0)}${unit}</text>`;
  }).join("");
  const path = values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const area = `${path} L${x(values.length - 1).toFixed(1)},${height - padB} L${x(0).toFixed(1)},${height - padB} Z`;
  const dots = values.map((v, i) => {
    const hl = i === highlight;
    return `<circle cx="${x(i)}" cy="${y(v)}" r="${hl ? 6 : 3.5}" fill="${hl ? "#e8a33d" : color}" stroke="#fff" stroke-width="1.5"><title>${esc(labels[i])}: ${fmt(v)}${unit}</title></circle>`;
  }).join("");
  const xlabels = labels.map((l, i) => `<text x="${x(i)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="#6b7a86">${esc(l)}</text>`).join("");
  const vlabels = values.map((v, i) => {
    if (i % 2 !== 0 && i !== highlight) return "";
    const anchor = i === 0 ? "start" : i === values.length - 1 ? "end" : "middle";
    const lx = i === 0 ? x(i) + 2 : i === values.length - 1 ? x(i) - 2 : x(i);
    return `<text x="${lx}" y="${y(v) - 10}" text-anchor="${anchor}" font-size="11" font-weight="600" fill="#0f2a43">${fmt(v)}${unit}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(title)}" preserveAspectRatio="xMidYMid meet" style="width:100%;height:auto;display:block">${grid}<path d="${area}" fill="${color}" opacity="0.08"/><path d="${path}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}${vlabels}${xlabels}</svg>`;
}

// Grafik batang vertikal.
export function barChart({ labels, values, width = 640, height = 280, unit = "", color = "#0e7c7b", highlight = -1, title = "" }) {
  const padL = 52, padR = 10, padT = 24, padB = 30;
  const max = Math.max(...values, 0) * 1.12;
  const min = Math.min(...values, 0);
  const span = max - min;
  const bw = (width - padL - padR) / values.length;
  const y = (v) => padT + ((max - v) * (height - padT - padB)) / span;
  const bars = values.map((v, i) => {
    const bx = padL + i * bw + bw * 0.18, bwid = bw * 0.64;
    const hl = i === highlight;
    const top = y(Math.max(v, 0)), bottom = y(Math.min(v, 0));
    return `<rect x="${bx.toFixed(1)}" y="${top.toFixed(1)}" width="${bwid.toFixed(1)}" height="${Math.max(bottom - top, 1).toFixed(1)}" rx="3" fill="${hl ? "#e8a33d" : v < 0 ? "#c0392b" : color}"><title>${esc(labels[i])}: ${fmt(v)}${unit}</title></rect><text x="${(bx + bwid / 2).toFixed(1)}" y="${(top - 6).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="#0f2a43">${fmt(v)}${unit}</text><text x="${(bx + bwid / 2).toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="#6b7a86">${esc(labels[i])}</text>`;
  }).join("");
  const zero = `<line x1="${padL}" y1="${y(0)}" x2="${width - padR}" y2="${y(0)}" stroke="#94a3ad" stroke-width="1"/>`;
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(title)}" preserveAspectRatio="xMidYMid meet" style="width:100%;height:auto;display:block">${zero}${bars}</svg>`;
}

// Grafik batang horizontal dengan label nama di kiri.
export function hbarChart({ labels, values, width = 640, height = 300, unit = "", color = "#0e7c7b", title = "", decimals = 1 }) {
  const padL = 190, padR = 64, padT = 8, rowH = (height - padT - 8) / values.length;
  const max = Math.max(...values) * 1.08;
  const rows = values.map((v, i) => {
    const y = padT + i * rowH;
    const w = ((width - padL - padR) * v) / max;
    return `<text x="${padL - 8}" y="${y + rowH / 2 + 4}" text-anchor="end" font-size="12" fill="#0f2a43">${esc(labels[i])}</text><rect x="${padL}" y="${y + 5}" width="${Math.max(w, 2).toFixed(1)}" height="${(rowH - 10).toFixed(1)}" rx="3" fill="${color}"><title>${esc(labels[i])}: ${fmt(v, decimals)}${unit}</title></rect><text x="${padL + w + 6}" y="${y + rowH / 2 + 4}" font-size="12" font-weight="600" fill="#0f2a43">${fmt(v, decimals)}${unit}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(title)}" preserveAspectRatio="xMidYMid meet" style="width:100%;height:auto;display:block">${rows}</svg>`;
}

// Diagram donat dengan legenda.
export function donutChart({ labels, values, width = 300, height = 300, colors, title = "" }) {
  const cx = width / 2, cy = height / 2, r = Math.min(width, height) / 2 - 12, ir = r * 0.58;
  const total = values.reduce((a, b) => a + b, 0);
  let angle = -Math.PI / 2;
  const slices = values.map((v, i) => {
    const a0 = angle, a1 = angle + (v / total) * Math.PI * 2;
    angle = a1;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + ir * Math.cos(a1), yi1 = cy + ir * Math.sin(a1);
    const xi0 = cx + ir * Math.cos(a0), yi0 = cy + ir * Math.sin(a0);
    return `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${xi1.toFixed(1)},${yi1.toFixed(1)} A${ir},${ir} 0 ${large} 0 ${xi0.toFixed(1)},${yi0.toFixed(1)} Z" fill="${colors[i % colors.length]}"><title>${esc(labels[i])}: ${fmt(v)}%</title></path>`;
  }).join("");
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(title)}" preserveAspectRatio="xMidYMid meet" style="width:100%;max-width:${width}px;height:auto;display:block;margin:0 auto">${slices}<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="15" font-weight="700" fill="#0f2a43">100%</text><text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="#6b7a86">total PDB</text></svg>`;
}

// Piramida penduduk: batang laki-laki ke kiri, perempuan ke kanan.
export function pyramidChart({ groups, width = 640, height = 420, title = "" }) {
  const padT = 26, padB = 8, rowH = (height - padT - padB) / groups.length;
  const mid = width / 2;
  const max = 5;
  const rows = groups.map(([label, m, f], i) => {
    const y = padT + i * rowH;
    const mw = (m / max) * (mid - 46), fw = (f / max) * (mid - 46);
    return `<text x="${mid - 52}" y="${y + rowH / 2 + 4}" text-anchor="end" font-size="11" fill="#6b7a86">${esc(label)}</text><rect x="${(mid - 46 - mw).toFixed(1)}" y="${y + 2}" width="${mw.toFixed(1)}" height="${(rowH - 4).toFixed(1)}" rx="2" fill="#1f6f8b"><title>Laki-laki ${esc(label)}: ${fmt(m)}%</title></rect><rect x="${mid + 46}" y="${y + 2}" width="${fw.toFixed(1)}" height="${(rowH - 4).toFixed(1)}" rx="2" fill="#c97b4a"><title>Perempuan ${esc(label)}: ${fmt(f)}%</title></rect><text x="${(mid - 52 - mw).toFixed(1)}" y="${y + rowH / 2 + 4}" text-anchor="end" font-size="11" font-weight="600" fill="#0f2a43">${fmt(m)}%</text><text x="${(mid + 52 + fw).toFixed(1)}" y="${y + rowH / 2 + 4}" font-size="11" font-weight="600" fill="#0f2a43">${fmt(f)}%</text>`;
  }).join("");
  const head = `<text x="${mid - 46}" y="14" text-anchor="end" font-size="12" font-weight="700" fill="#1f6f8b">Laki-laki</text><text x="${mid + 46}" y="14" font-size="12" font-weight="700" fill="#c97b4a">Perempuan</text><line x1="${mid}" y1="${padT - 6}" x2="${mid}" y2="${height - padB}" stroke="#d5dde2" stroke-width="1"/>`;
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(title)}" preserveAspectRatio="xMidYMid meet" style="width:100%;height:auto;display:block">${head}${rows}</svg>`;
}

export const PALETTE = ["#0e7c7b", "#1f6f8b", "#e8a33d", "#c97b4a", "#5b8c5a", "#7a6aa8", "#b0566e", "#4a7a9e", "#8a9a5b", "#a86f3c"];
