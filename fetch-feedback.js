// Haalt bij de build de echte stemmen ("Heeft dit geholpen?" en "Met welke stap?") op uit GoatCounter.
// Werkt alleen als GOATCOUNTER_TOKEN is ingesteld (Netlify > Environment variables). Zonder token of bij een fout
// gaat de build gewoon door, zonder cijfers op de pagina's.
const fs = require("fs"), path = require("path");
const OUT = path.join(__dirname, "feedback.json");
const TOKEN = process.env.GOATCOUNTER_TOKEN, SITE = process.env.GOATCOUNTER_SITE || "https://foutcode.goatcounter.com";
const sleep = ms => new Promise(r => setTimeout(r, ms));
const api = async (p) => { const r = await fetch(SITE + "/api/v0" + p, { headers: { Authorization: "Bearer " + TOKEN, "Content-Type": "application/json" }, signal: AbortSignal.timeout(15000) }); if (!r.ok) throw new Error(p + " → HTTP " + r.status); return r.json(); };
(async () => {
  if (!TOKEN) { console.log("Feedback: geen GOATCOUNTER_TOKEN, overgeslagen."); return; }
  const t0 = Date.now(), events = [];
  let after = 0, more = true;
  while (more && Date.now() - t0 < 60000) {
    const d = await api(`/paths?limit=200${after ? "&after=" + after : ""}`); await sleep(260);
    for (const p of d.paths || []) { after = p.id; if (/^\/?(feedback-(ja|nee)|opgelost-stap-\d)\//.test(p.path)) events.push(p); }
    more = d.more && (d.paths || []).length > 0;
  }
  const out = {}, start = "2026-01-01T00:00:00Z", end = new Date(Math.ceil(Date.now() / 3600e3) * 3600e3).toISOString().replace(/\.\d+Z$/, "Z");
  for (const p of events.slice(0, 500)) {
    if (Date.now() - t0 > 150000) break;
    try {
      const d = await api(`/stats/hits?start=${start}&end=${end}&limit=1&include_paths=${p.id}`); await sleep(260);
      const n = (d.hits || []).reduce((a, h) => a + (h.count || 0), 0); if (!n) continue;
      const m = p.path.replace(/^\//, "").match(/^(feedback-(ja|nee)|opgelost-stap-(\d))\/(.+)$/);
      const page = m[4].replace(/^\//, "").replace(/\.html$/, "") || "index";
      const e = out[page] || (out[page] = { ja: 0, nee: 0, stap: {} });
      if (m[2]) e[m[2]] += n; else e.stap[m[3]] = (e.stap[m[3]] || 0) + n;
    } catch (err) { console.log("Feedback: " + err.message); }
  }
  fs.writeFileSync(OUT, JSON.stringify(out));
  console.log(`Feedback: ${Object.keys(out).length} pagina's met stemmen opgehaald.`);
})().catch(e => console.log("Feedback overgeslagen: " + e.message));
