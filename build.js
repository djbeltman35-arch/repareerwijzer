// Bouwt de statische site naar ./dist. Gebruik: SITE_URL=https://jouwdomein.nl node build.js
const fs = require("fs");
const path = require("path");
const { CATS, MODELS, SRC, COST } = require("./data.js");
const { KB } = require("./kb.js");

const SITE = (process.env.SITE_URL || "https://foutcodezoeker.nl").replace(/\/$/, "");
const OUT = path.join(__dirname, "dist");
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const slug = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const D = { 1: ["🟢 Zelf op te lossen", "d1"], 2: ["🟡 Voorzichtig zelf proberen", "d2"], 3: ["🔴 Bel een monteur", "d3"] };
const VERDICT = { 1: "Dit kun je zelf oplossen. Volg de stappen hieronder, één voor één.", 2: "Je kunt dit zelf proberen, maar wees voorzichtig. Haal eerst de stekker eruit of zet het apparaat uit. Twijfel je? Bel een monteur.", 3: "Complex of gevaarlijk: probeer dit niet zelf te repareren. Doe alleen de veilige controles hieronder en bel een monteur." };
const UNIT = { km: "km", uur: "printuren" };
const catOf = id => CATS.find(c => c.id === id);
const pages = [];

const codeUrl = (m, f) => `foutcode-${m.id}-${slug(f.code.split("/")[0])}.html`;
const lc1 = (t, m) => { const w = t.split(/[ :,]/)[0]; if (!/^[A-Z][a-zà-ÿ]*$/.test(w)) return t; if (m && `${m.brand} ${m.name} ${m.also || ""}`.split(/[^A-Za-zÀ-ÿ]+/).includes(w)) return t; return t[0].toLowerCase() + t.slice(1); };
const textUrl = (m, f) => `storing-${m.id}-${slug(f.t)}.html`;
const codeShort = f => f.code.split("/")[0].trim();
const fullName = m => m.brand === "Alle merken" ? m.name : `${m.brand} ${m.name}`;
function brandLinks(m) { return m.brand.split("/").map(b => b.trim()).filter(b => b !== "Alle merken" && b !== "E61-groep").map(b => `<a href="merk-${slug(b)}.html">Alle ${esc(b)}-storingen</a>`).join(" · "); }
const deviceName = m => { if (m.dev) return m.brand === "Alle merken" ? m.dev : `${m.brand} ${m.dev}`; const c = catOf(m.cat); return m.name.includes("(alle modellen)") ? `${m.brand} ${c.one}` : fullName(m); };

function intervalLabel(t, m) {
  if (t.n) return `Elke ${t.n} ${UNIT[m.unit]}`;
  if (!t.m) return t.w;
  const L = { 0.25: "Elke week", 0.5: "Elke 2 weken", 1: "Elke maand", 1.25: "Elke 4–6 weken", 2.5: "Elke 9–12 weken", 3.5: "Elke 3–4 maanden", 9: "Elke 6–12 maanden", 12: "Elk jaar" };
  return L[t.m] || (t.m > 12 ? `Elke ${t.m / 12} jaar` : `Elke ${t.m} maanden`);
}

const fold = (title, inner, open = false, n = 0) => `<section class="stack"><details class="fold"${open ? " open" : ""}><summary><h2>${title}</h2>${n ? `<span class="cnt">${n}</span>` : ""}</summary><div class="fold-body">${inner}</div></details></section>`;
const faqLd = qs => `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: qs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }).replace(/</g, "\\u003c")}</script>`;
const clip = (t, n = 158) => { t = String(t).replace(/\s+/g, " ").trim(); if (t.length <= n) return t; const c = t.slice(0, n); return c.slice(0, c.lastIndexOf(" ")).replace(/[,;:–-]+$/, "") + "…"; };
function layout({ file, title, desc, body, crumbs = [], extraHead = "", scripts = "" }) {
  const url = file === "index.html" ? `${SITE}/` : `${SITE}/${file.replace(/\.html$/, "")}`;
  const bc = crumbs.length ? `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ name: "Home", file: "index.html" }, ...crumbs].map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.file === "index.html" ? `${SITE}/` : `${SITE}/${c.file.replace(/\.html$/, "")}` })) })}</script>` : "";
  const backTo = crumbs.length > 1 ? crumbs[crumbs.length - 2].file : "index.html";
  const pageNav = file === "index.html" ? "" : `<div class="pagenav"><a class="back" href="${backTo}" data-back>← Terug</a><a class="home" href="index.html">⌂ Home</a></div>`;
  const crumbHtml = crumbs.length ? `<nav class="crumbs" aria-label="Kruimelpad"><a href="index.html">Home</a>${crumbs.map((c, i) => i === crumbs.length - 1 ? ` / <span>${esc(c.name)}</span>` : ` / <a href="${c.file}">${esc(c.name)}</a>`).join("")}</nav>` : "";
  const html = `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${file === "index.html" ? '<meta name="e0d5a73bd035a1c" content="277030417ea9ada19f69ae08c41fb74b" />' : ""}
<title>${esc(title)}</title>
<meta name="description" content="${esc(clip(desc))}">
<link rel="canonical" href="${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(clip(desc, 200))}">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="Foutcodezoeker">
<meta property="og:locale" content="nl_NL">
<meta property="og:image" content="${SITE}/icon-512.png">
<meta name="twitter:card" content="summary">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta name="theme-color" content="#1f252b">
<meta name="apple-mobile-web-app-title" content="Foutcodezoeker">
<meta name="mobile-web-app-capable" content="yes">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Overpass:wght@700;800&family=Source+Sans+3:wght@400;600;700&family=JetBrains+Mono:wght@500&display=swap">
<link rel="stylesheet" href="style.css">
${bc}${extraHead}
<script data-goatcounter="https://foutcode.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>
</head>
<body>
<header class="top"><div class="wrap">
  <a class="logo" href="index.html" aria-label="Foutcodezoeker, naar home"><svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="4" fill="#f2b705"/><path d="M21.5 6.5a5 5 0 0 0-6.2 6.4L7 21.2 10.8 25l8.3-8.3a5 5 0 0 0 6.4-6.2l-3 3-3.2-.8-.8-3.2z" fill="#1c2328"/></svg>Foutcodezoeker</a>
  <details class="menu"><summary aria-label="Menu openen"><span class="burger" aria-hidden="true"></span>Menu</summary><div class="menu-panel">
    <nav aria-label="Hoofdmenu"><a href="index.html">⌂ Home</a><a href="foutcodes.html">Foutcodes</a><a href="knipperende-lampjes.html">Lampjes</a><a href="merken.html">Merken</a><a href="eerste-hulp-bij-storingen.html">Eerste hulp</a><a href="kennisbank.html">Kennisbank</a><a href="repareren-of-vervangen.html">Repareren of vervangen?</a><a href="recht-op-reparatie.html">Recht op reparatie</a></nav>
    <p class="menu-h">Categorieën</p><nav class="menu-cats" aria-label="Categorieën">${CATS.map(c => `<a href="${c.id}.html">${c.name}</a>`).join("")}</nav>
  </div></details>
</div></header>
${pageNav ? `<div class="pagenav-bar"><div class="wrap">${pageNav}</div></div>` : ""}
<main class="wrap">
${crumbHtml}
${body}
</main>
<footer><div class="wrap">
  <details class="foot-fold"><summary>Alle categorieën (${CATS.length})</summary><nav class="foot-cats" aria-label="Categorieën">${CATS.map(c => `<a href="${c.id}.html">${c.name}</a>`).join("")}</nav></details>
  <span>Foutcodezoeker · Gemaakt door Erik · info@foutcodezoeker.nl</span>
  <span>Stroom eraf en kraan dicht voordat je iets losschroeft. Volg bij twijfel de handleiding van de fabrikant. Open nooit zelf een e-bike-accu.</span>
  <span>Algemene informatie, gebruik op eigen risico. Foutcodezoeker is niet aansprakelijk voor schade of letsel. <a href="disclaimer.html">Disclaimer</a></span>
</div></footer>
${/id="(q|pm)"/.test(body) ? '<script src="search.js" defer></script>\n' : ""}<script src="app.js" defer></script>
${scripts}
</body>
</html>`;
  fs.writeFileSync(path.join(OUT, file), html);
  pages.push(file);
}

const pill = d => `<span class="pill ${D[d][1]}">${D[d][0]}</span>`;
const srcList = m => m.src.length ? `<ul class="sources">${m.src.map(k => `<li><a href="${SRC[k][1]}" target="_blank" rel="noopener">${esc(SRC[k][0])}</a></li>`).join("")}</ul>` : `<p class="muted">Gebaseerd op kennis uit de gebruikersgemeenschap. Controleer met de handleiding van je eigen exemplaar.</p>`;
const modelCard = m => { const codes = m.faults.filter(f => f.code).length; return `<a class="model" href="${m.id}.html"><b>${esc(fullName(m))}</b><span class="eyebrow">${esc(catOf(m.cat).name)}</span><span class="meta">${esc(m.years)} · ${m.tasks.length} onderhoudstaken · ${m.faults.length} ${m.faults.length === 1 ? "storing" : "storingen"}${codes ? ` (${codes} foutcodes)` : ""}${m.also ? ` · ook: ${esc(m.also)}` : ""}</span></a>`; };
const allCodes = MODELS.flatMap(m => m.faults.filter(f => f.code).map(f => ({ m, f })));

// ───────── Home
const CAT_ICON = { koffiemachines: "☕", wasmachines: "🧺", vaatwassers: "🍽️", drogers: "🌀", "cv-ketels": "🔥", ventilatie: "💨", warmtepompen: "♨️", airco: "❄️", koelkasten: "🧊", ovens: "🍕", kookplaten: "🍳", stofzuigers: "🧹", "e-bikes": "🚲", "3d-printers": "🖨️", tuin: "🌱", audio: "🔊", "kleine-apparaten": "🔌", laadpalen: "⚡", printers: "🖨️", laptops: "💻", smartphones: "📱", televisies: "📺", internet: "📶", spelcomputers: "🎮", zonnepanelen: "☀️", "camper-caravan": "🚐", spa: "🛁", garagedeuren: "🚪", auto: "🚗", trapliften: "♿", scooters: "🛴", kachels: "🪵", waterontharders: "💧", boten: "⛵", meterkast: "🔋", vrachtwagens: "🚚", gereedschap: "🛠️", "slim-huis": "🏠", rookmelders: "🚨" };
const stats = { models: MODELS.length, codes: allCodes.length, faults: MODELS.reduce((n, m) => n + m.faults.length, 0) };
layout({
  file: "index.html",
  title: "Foutcodezoeker – foutcodes en storingen zelf oplossen, per merk en model",
  extraHead: `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": [{ "@type": "WebSite", "@id": `${SITE}/#website`, url: `${SITE}/`, name: "Foutcodezoeker", inLanguage: "nl-NL", potentialAction: { "@type": "SearchAction", target: `${SITE}/?q={search_term_string}`, "query-input": "required name=search_term_string" } }, { "@type": "Organization", "@id": `${SITE}/#org`, name: "Foutcodezoeker", url: `${SITE}/`, logo: `${SITE}/icon-512.png`, email: "info@foutcodezoeker.nl" }] })}</script>`,
  desc: `Foutcodes en onderhoud per merk en model: koffiemachines, wasmachines, vaatwassers, e-bikes, 3D-printers en meer. ${stats.codes} foutcodes uitgelegd in gewoon Nederlands.`,
  body: `
<section class="stack hero hero2">
  <span class="eyebrow">Gratis · zonder account</span>
  <div class="hero-grid">
    <h1>Wat betekent die foutcode?</h1>
    <svg class="hero-art" viewBox="0 0 240 220" role="img" aria-label="Wasmachine met foutcode E18 op het display en een vergrootglas">
      <rect x="34" y="14" width="150" height="190" rx="14" fill="#fff" stroke="#15191e" stroke-width="4"/>
      <rect x="34" y="14" width="150" height="44" rx="14" fill="#e9ecef" stroke="#15191e" stroke-width="4"/>
      <rect x="48" y="26" width="62" height="22" rx="4" fill="#15191e"/>
      <text x="79" y="43" text-anchor="middle" font-family="JetBrains Mono,monospace" font-weight="700" font-size="17" fill="#ff4d4d" class="blink">E18</text>
      <circle cx="132" cy="37" r="7" fill="#f6b800" stroke="#15191e" stroke-width="3"/>
      <circle cx="158" cy="37" r="7" fill="#fff" stroke="#15191e" stroke-width="3"/>
      <circle cx="109" cy="128" r="50" fill="#dfe7ee" stroke="#15191e" stroke-width="4"/>
      <circle cx="109" cy="128" r="36" fill="#9cc3e6" stroke="#15191e" stroke-width="3"/>
      <path d="M78 136c10-8 20 8 31 0s21-8 31 0v12a36 36 0 0 1-62 0z" fill="#5b9bd5"/>
      <circle cx="176" cy="150" r="34" fill="#f6b800" fill-opacity=".25" stroke="#15191e" stroke-width="7"/>
      <path d="M200 175l26 26" stroke="#15191e" stroke-width="12" stroke-linecap="round"/>
      <path d="M163 150l9 9 17-19" fill="none" stroke="#15191e" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <p class="lead">Typ merk en code. Je ziet meteen wat er mis is en wat je zelf kunt doen.</p>
  <div class="search"><input id="q" type="search" placeholder="Bijv. Bosch E18" aria-label="Zoek op merk, model of foutcode" autocomplete="off"></div>
  <div class="results" id="res" aria-live="polite"></div>
  <div class="chips"><span>Probeer:</span>${[["Bosch E18","Bosch E18"],["Samsung 4C","Samsung 4C"],["Intergas storing","Intergas"],["Vaatwasser stinkt","vaatwasser stinkt"]].map(([l, q]) => `<a href="?q=${encodeURIComponent(q)}" data-q="${esc(q)}">${l}</a>`).join("")}</div>
  <div class="installapp" id="installapp" hidden><strong>📱 Foutcodezoeker als app</strong><span id="installtxt">Zet Foutcodezoeker op je beginscherm: altijd binnen handbereik, ook in de schuur of kelder.</span><button type="button" id="installbtn" hidden>Installeer de app</button></div>
  <p class="herostats"><span><b>${stats.codes}</b> foutcodes</span><span><b>${stats.models}</b> apparaten</span></p>
</section>
<section class="stack">
  <h2>Kies je apparaat</h2>
  <div class="cat-grid">${(TOPC => TOPC.map(id => CATS.find(c => c.id === id)).concat(CATS.filter(c => !TOPC.includes(c.id))))(["wasmachines", "vaatwassers", "cv-ketels", "koffiemachines", "drogers", "koelkasten", "warmtepompen", "ovens", "stofzuigers", "e-bikes", "auto", "airco"]).map((c, i) => `<a class="cat${i >= 12 ? " more" : ""}" href="${c.id}.html"><span class="cat-ico" aria-hidden="true">${CAT_ICON[c.id] || "🔧"}</span><b>${c.name.split(":")[0]}</b></a>`).join("")}</div>
  <button type="button" class="showall" id="showcats">Alle ${CATS.length} soorten apparaten tonen</button>
</section>
<section class="stack">
  <details class="pickfold aidfold"><summary><span aria-hidden="true">🚑</span> Eerste hulp bij storingen</summary>
  <div class="steps4">
    <div><span aria-hidden="true">🛑</span><b>Veilig</b><small>Water: kraan dicht, stekker eruit. Gas: kraan dicht, ramen open, bel 0800-9009.</small></div>
    <div><span aria-hidden="true">📝</span><b>Noteer</b><small>De code en het typenummer van het typeplaatje.</small></div>
    <div><span aria-hidden="true">🔌</span><b>Herstart</b><small>Stekker een paar minuten eruit. Cv-ketel: hooguit één reset.</small></div>
    <div><span aria-hidden="true">🔎</span><b>Zoek op</b><small>Typ de code bovenaan deze pagina.</small></div>
  </div>
  <p class="muted"><a href="eerste-hulp-bij-storingen.html">Meer over eerste hulp</a> · <a href="knipperende-lampjes.html">Geen code maar een knipperend lampje?</a></p>
  </details>
</section>
<section class="stack">
  <details class="pickfold"><summary><span aria-hidden="true">🧭</span> Kies merk en apparaat</summary>
  <div class="picker" id="picker"><div class="picker-row"><label for="pm">Merk<select id="pm"><option value="">Kies je merk</option></select></label><label for="pa">Apparaat<select id="pa" disabled><option value="">Kies eerst een merk</option></select></label></div><div class="results" id="pres" aria-live="polite"></div></div>
  </details>
</section>
<section class="stack">
  <h2>Veelgezochte foutcodes</h2>
  <div class="results">${["intergas-hre", "vaillant-ecotec", "bosch-siemens-vaatwasser", "samsung-wasmachine", "lg-wasmachine", "aeg-wasmachine", "bosch-ebike", "shimano-steps", "miele-vaatwasser", "bosch-siemens-wasmachine", "remeha-calenta", "alfen-eve"].map(id => { const m = MODELS.find(x => x.id === id); const f = m.faults.find(x => x.code); return `<a href="${codeUrl(m, f)}"><span><span class="code">${esc(codeShort(f))}</span> ${esc(f.t)}</span><span>${esc(deviceName(m))}</span></a>`; }).join("")}</div>
  <p><a href="foutcodes.html">Alle ${stats.codes} foutcodes bekijken</a></p>
</section>
<section class="stack">
  <h2>Veelvoorkomende problemen</h2>
  <div class="probs">${CATS.map(c => { const ms = MODELS.filter(m => m.brand === "Alle merken" && m.cat === c.id); return ms.length ? `<div><h3>${esc(c.name)}</h3><ul>${ms.map(m => `<li><a href="${m.id}.html">${esc(m.name)}</a></li>`).join("")}</ul></div>` : ""; }).join("")}</div>
</section>
<section class="stack">
  <h2>Kennisbank</h2>
  <ul class="kb-list">${KB.slice(0, 6).map(a => `<li><a href="kennisbank-${a.id}.html">${esc(a.q)}</a></li>`).join("")}</ul>
  <p><a href="kennisbank.html">Alle artikelen in de kennisbank →</a></p>
</section>
<section class="stack">
  <h2>Populaire merken</h2>
  <div class="row">${["Bosch", "Samsung", "Miele", "AEG", "LG", "Siemens", "Philips", "Dyson", "Remeha", "Intergas", "Whirlpool", "Beko"].map(b => `<a href="merk-${slug(b)}.html">${b}</a>`).join("")}<a href="merken.html">Alle merken</a></div>
</section>
<section class="stack">
  <h2>Onderhoud bijhouden</h2>
  <p>Bij elk model staat een onderhoudsteller. Vul je kilometers of printuren in, of tik op Gedaan na een klus, en je ziet wat er nu aan de beurt is. Alles blijft op je eigen telefoon of computer.</p>
  <div class="models">${["la-marzocco-linea-mini", "bosch-ebike", "prusa-mk4", "husqvarna-automower"].map(id => modelCard(MODELS.find(m => m.id === id))).join("")}</div>
</section>`
});

// ───────── Categoriepagina's
for (const c of CATS) {
  const ms = MODELS.filter(m => m.cat === c.id).sort((a, b) => a.brand.localeCompare(b.brand));
  const codes = allCodes.filter(x => x.m.cat === c.id).sort((a, b) => a.m.brand.localeCompare(b.m.brand));
  layout({
    file: `${c.id}.html`,
    title: `${c.name}: foutcodes en onderhoud per merk | Foutcodezoeker`,
    desc: `${c.intro} ${ms.length} merken en modellen, ${codes.length} foutcodes.`,
    crumbs: [{ name: c.name, file: `${c.id}.html` }],
    body: `
<section class="stack"><span class="eyebrow">Categorie</span><h1>${c.name}</h1><p class="lead">${esc(c.intro)}</p></section>
${KB.some(a => a.cat === c.id) ? `<section class="stack"><h2>Uitleg in de kennisbank</h2><ul class="kb-list">${KB.filter(a => a.cat === c.id).map(a => `<li><a href="kennisbank-${a.id}.html">${esc(a.q)}</a></li>`).join("")}</ul></section>` : ""}
<section class="stack"><h2>Merken en modellen</h2><div class="models">${ms.map(modelCard).join("")}</div></section>
${codes.length ? fold("Alle foutcodes", `<div class="tbl"><table><thead><tr><th>Code</th><th>Betekenis</th><th>Merk</th></tr></thead><tbody>${codes.map(({ m, f }) => `<tr><td><a class="code" href="${codeUrl(m, f)}">${esc(f.code)}</a></td><td>${esc(f.t)}</td><td>${esc(m.brand)}</td></tr>`).join("")}</tbody></table></div>`, false, codes.length) : ""}`
  });
}

// ───────── Modelpagina's
const BLOCKS = [
  [["cv-ketels", "warmtepompen"], /waterdruk|druk te laag|bijvull|te weinig water/i, "cv-ketel-waterdruk.html", "Universeel stappenplan: cv-installatie bijvullen en ontluchten"],
  [["laadpalen"], /.*/, "laadpaal-resetten.html", "Universeel stappenplan: laadpaal veilig herstarten"],
  [["zonnepanelen"], /.*/, "omvormer-resetten.html", "Universeel stappenplan: omvormer veilig resetten"],
  [["wasmachines"], /afvoer|pompt|afgevoerd|pomp/i, "wasmachine-pompt-niet-af.html", "Universeel stappenplan: wasmachine pompt niet af (pompfilter schoonmaken)"],
  [["vaatwassers"], /afvoer|pompt|afgevoerd/i, "vaatwasser-pompt-niet-af.html", "Universeel stappenplan: vaatwasser pompt niet af"],
  [["vaatwassers"], /toevoer|geen water|watertoevoer|inlaat|aquastop|waterstop|lek/i, "vaatwasser-geen-water.html", "Universeel stappenplan: vaatwasser krijgt geen water of lekt"],
  [["drogers"], /droogt niet|condens|filter|warmtewisselaar/i, "droger-droogt-niet.html", "Universeel stappenplan: droger droogt niet goed"],
  [["internet", "spelcomputers", "televisies"], /verbinding|netwerk|internet|wifi|server/i, "internet-valt-weg.html", "Universeel stappenplan: internet valt weg of werkt niet"],
  [["printers"], /papier/i, "printer-papierstoring.html", "Universeel stappenplan: papierstoring oplossen"]
];
const blockLink = (m, f) => { const hit = BLOCKS.find(x => x[0].includes(m.cat) && x[1].test(f.t) && x[2] !== `${m.id}.html`); return hit ? `<p class="block-link">📘 <a href="${hit[2]}">${esc(hit[3])}</a> – werkt voor alle merken.</p>` : ""; };
const costHit = (m, f) => { const k = COST[m.cat]; return k ? k.items.find(i => i[2] && i[2].test(f.t)) : null; };
const modelCost = m => { const k = COST[m.cat]; const rows = k.items.map(i => `<tr><td>${esc(i[0])}</td><td class="nowrap">${esc(i[1])}</td></tr>`).join("") + (k.extra || []).map(i => `<tr><td>${esc(i[0])}</td><td>${esc(i[1])}</td></tr>`).join("");
  return `<section class="stack cost"><h2>💰 Wat kost een reparatie gemiddeld?</h2>${k.uur ? `<p><strong>Monteur:</strong> ${esc(k.uur)}.${k.gem ? ` Een reparatie kost gemiddeld ${esc(k.gem)}.` : ""}</p>` : ""}<div class="tbl"><table><thead><tr><th>Reparatie</th><th>Gemiddelde prijs</th></tr></thead><tbody>${rows}</tbody></table></div>${k.note ? `<p>${esc(k.note)}</p>` : ""}<p class="muted">Prijsindicaties uit kostengidsen; vraag altijd vooraf een prijsopgave. Bron: ${k.src.map(s => `<a href="${SRC[s][1]}" target="_blank" rel="noopener">${esc(SRC[s][0])}</a>`).join(", ")}.</p></section>`; };
const costBlock = (m, f) => {
  const k = COST[m.cat];
  const verdict = f.d === 1 ? "Meestal los je dit zelf op met de stappen hierboven. Lukt het niet, dan helpt een monteur." : f.d === 2 ? "Werken de stappen hierboven niet, dan is een monteur waarschijnlijk nodig." : "Dit is meestal werk voor een monteur of installateur.";
  if (!k) return `<section class="stack cost"><h2>🔧 Moet er een monteur komen?</h2><p>${verdict}</p></section>`;
  const txt = f.t;
  const hit = k.items.find(i => i[2] && i[2].test(txt));
  const rows = k.items.map(i => `<tr${i === hit ? ' class="hit"' : ""}><td>${esc(i[0])}</td><td class="nowrap">${esc(i[1])}</td></tr>`).join("") + (k.extra || []).map(i => `<tr><td>${esc(i[0])}</td><td>${esc(i[1])}</td></tr>`).join("");
  return `<section class="stack cost"><h2>💰 Wat kost een reparatie gemiddeld?</h2>
<p>${verdict}</p>
${hit ? `<p class="cost-hit"><strong>Mogelijk onderdeel:</strong> ${esc(hit[0].toLowerCase())}. Dit kost gemiddeld <strong>${esc(hit[1])}</strong>.</p>` : ""}
${k.uur ? `<p><strong>Monteur:</strong> ${esc(k.uur)}.${k.gem ? ` Een reparatie kost gemiddeld ${esc(k.gem)}.` : ""}</p>` : ""}
<div class="tbl"><table><thead><tr><th>Reparatie</th><th>Gemiddelde prijs</th></tr></thead><tbody>${rows}</tbody></table></div>
${k.note ? `<p>${esc(k.note)}</p>` : ""}
<p><strong>Bespaartip:</strong> vraag vooraf een prijsopgave en vergelijk een onafhankelijke monteur met de servicedienst van het merk. Is je apparaat jonger dan 2 jaar? Dan valt de reparatie vaak nog onder de wettelijke garantie: meld het eerst bij de winkel.</p>
<p class="muted">Prijsindicaties uit kostengidsen; de echte prijs hangt af van merk, onderdeel en regio. Vraag altijd vooraf een prijsopgave. Bron: ${k.src.map(s => `<a href="${SRC[s][1]}" target="_blank" rel="noopener">${esc(SRC[s][0])}</a>`).join(", ")}.</p>
</section>`;
};
for (const m of MODELS) {
  const c = catOf(m.cat);
  const tasksJson = JSON.stringify({ id: m.id, unit: m.unit, unitLabel: UNIT[m.unit] || null, tasks: m.tasks.map(t => ({ ...t, label: intervalLabel(t, m) })) }).replace(/</g, "\\u003c");
  const codes = m.faults.filter(f => f.code), plain = m.faults.filter(f => !f.code);
  layout({
    file: `${m.id}.html`,
    title: m.brand === "Alle merken" ? `${m.name}: oorzaken en oplossingen | Foutcodezoeker` : `${fullName(m)}: storingen, foutcodes en onderhoud | Foutcodezoeker`,
    desc: `${m.intro.split(". ")[0]}. ${codes.length ? `${codes.length} foutcodes uitgelegd` : `${m.faults.length} ${m.faults.length === 1 ? "storing" : "storingen"} uitgelegd`}, met onderhoudsschema${m.parts.length ? " en onderdelen" : ""}.`,
    crumbs: [{ name: c.name, file: `${c.id}.html` }, { name: fullName(m), file: `${m.id}.html` }],
    extraHead: `<script id="tasks-data" type="application/json">${tasksJson}</script>`,
    body: `
<section class="stack">
  <span class="eyebrow">${esc(m.brand)} · ${esc(c.name)}</span>
  <h1>${esc(fullName(m))}</h1>
  <p class="lead">${esc(m.intro)}</p>
  ${brandLinks(m) ? `<p class="row">${brandLinks(m)}</p>` : ""}
  <dl class="facts"><div><dt>Bouwjaren</dt><dd>${esc(m.years)}</dd></div><div><dt>Onderhoud</dt><dd>${m.tasks.length} taken</dd></div><div><dt>Storingen</dt><dd>${m.faults.length} beschreven</dd></div>${m.also ? `<div class="wide"><dt>Geldt ook voor</dt><dd>${esc(m.also)}</dd></div>` : ""}</dl>
</section>
${codes.length ? fold("Foutcodes", `<div class="results">${codes.map(f => `<a href="${codeUrl(m, f)}"><span><span class="code">${esc(f.code)}</span> ${esc(f.t)}</span><span>${D[f.d][0]}</span></a>`).join("")}</div>`, true, codes.length) : ""}
${plain.length ? `<section class="stack"><h2>${codes.length ? "Andere storingen" : "Storingen"}</h2>
${m.cat === "e-bikes" ? warnEbike() : m.cat === "cv-ketels" ? warnGas() : ""}
${plain.map(f => { const h = costHit(m, f); return `<article class="fault" id="${slug(f.t)}"><div class="fault-head"><h3><a href="${textUrl(m, f)}">${esc(f.t)}</a></h3></div><div class="verdict v${f.d}"><strong>${D[f.d][0]}</strong><span>${VERDICT[f.d]}</span></div><h4>❓ Wat is er aan de hand?</h4><p>${esc(f.cause)}</p><h4>💡 Wat kun je nu zelf doen?</h4><ol>${f.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>${h ? `<p class="cost-hit">💰 <strong>Lukt het niet?</strong> Mogelijk onderdeel: ${esc(h[0].toLowerCase())}, gemiddeld <strong>${esc(h[1])}</strong>.</p>` : ""}${blockLink(m, f)}</article>`; }).join("")}</section>` : ""}
${COST[m.cat] ? modelCost(m) : ""}
${adBlock(m)}
<section class="stack"><details class="fold"><summary><h2>Onderhoudsteller</h2>${m.tasks.length ? `<span class="cnt">${m.tasks.length}</span>` : ""}</summary><div class="fold-body">
  <div class="counter" id="counter">
    ${m.unit ? `<div class="counter-top"><label for="cnt">Huidige stand (${UNIT[m.unit]})<input id="cnt" type="number" min="0" inputmode="numeric"></label><p class="muted">Vul je stand in en tik op Gedaan na elke klus. Alles blijft op dit apparaat.</p></div>` : `<p class="muted">Tik op Gedaan na een klus; de datum blijft bewaard op dit apparaat.</p>`}
    <div class="tasks" id="tasks">${m.tasks.map(t => `<div class="task"><span class="dot" aria-hidden="true"></span><div class="what"><b>${esc(t.t)}</b><small>${esc(intervalLabel(t, m))}${t.s ? " · " + esc(t.s) : ""}${t.v ? " · vuistregel" : ""}</small></div></div>`).join("")}</div>
  </div>
</div></details></section>
${m.weak.length ? fold("Bekende zwakke plekken", `<ul class="weak">${m.weak.map(w => `<li>${esc(w)}</li>`).join("")}</ul>`, false, m.weak.length) : ""}
${m.parts.length ? fold("Onderdelen en middelen", `<div class="tbl"><table><thead><tr><th>Onderdeel</th><th>Specificatie</th></tr></thead><tbody>${m.parts.map(p => `<tr><td class="strong">${esc(p[0])}</td><td>${esc(p[1])}</td></tr>`).join("")}</tbody></table></div>`, false, m.parts.length) : ""}
${KB.some(a => a.cat === m.cat) ? fold("Uitleg in de kennisbank", `<ul class="kb-list">${KB.filter(a => a.cat === m.cat).map(a => `<li><a href="kennisbank-${a.id}.html">${esc(a.q)}</a></li>`).join("")}</ul>`, false, KB.filter(a => a.cat === m.cat).length) : ""}
<section class="stack"><h2>Bronnen</h2>${srcList(m)}<p class="muted">Taken met "vuistregel" zijn richtlijnen, geen fabrieksvoorschrift.</p></section>`
  });
}


// ───────── Advertentie (affiliate) bij laad-gerelateerde pagina's
function isEvCharge(m) { return m.cat === "laadpalen" || (m.cat === "auto" && /laad|laden/.test(m.id)); }
function AFF(si, li) { return `https://lt45.net/c/?si=${si}&amp;li=${li}&amp;wi=446984&amp;ws=`; }
function ADS() { return {
  laadkabel: [AFF(12933, 1570912), "🔌 Laadkabel voor uw elektrische auto", "Kabel kapot of een extra nodig? Bekijk laadkabels bij onze partner."],
  acculader: [AFF(12933, 1570313), "🔋 Acculader of starthulp", "Accu leeg of zwak? Bekijk acculaders en jumpstarters bij Acculaders.nl."],
  autoverkopen: [AFF(10614, 1468698), "🚗 Reparatie te duur? Verkoop je auto", "Vraag gratis een bod aan bij AutoVendi, ook voor auto's met schade of motorproblemen."],
  ebike: [AFF(12168, 1536530), "🚲 E-bike-onderdelen en accessoires", "Display, accu-lader of banden nodig? Bekijk het aanbod bij Fietsparadijs."],
  fietstas: [AFF(12934, 1570314), "🎒 Fietstassen", "Nieuwe tas voor je (e-)bike? Bekijk fietstassen bij Fietstas.com."],
  gereedschap: [AFF(13231, 1580636), "🔧 Gereedschap en accu's", "Nieuw gereedschap of een vervangende accu? Bekijk het aanbod bij Gereedschapspecialist."],
  refurbished: ["https://ds1.nl/c/?si=9711&amp;li=1434953&amp;wi=446984&amp;ws=", "♻️ Toch vervangen? Kies refurbished", "Gecontroleerde refurbished telefoons, laptops en tablets met garantie bij Remarkt."]
}; }
function adsFor(m) {
  if (isEvCharge(m)) return ["laadkabel"];
  switch (m.cat) {
    case "auto": return ["acculader", "autoverkopen"];
    case "camper-caravan": case "boten": return ["acculader"];
    case "e-bikes": return ["ebike", "fietstas"];
    case "gereedschap": case "tuin": return ["gereedschap"];
    case "laptops": case "smartphones": case "spelcomputers": return ["refurbished"];
    default: return [];
  }
}
function adBlock(m) { return adsFor(m).map(k => { const [u, t, d] = ADS()[k]; return `<aside class="ad"><span class="ad-label">Advertentie</span><a href="${u}" rel="sponsored noopener" target="_blank">${t}</a><small>${d}</small></aside>`; }).join(""); }
function warnGas() { return `<div class="safety"><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 1 21h22z" fill="var(--accent)"/><path d="M12 9v5m0 3v.5" stroke="var(--accent-ink)" stroke-width="2.4" stroke-linecap="round"/></svg><p>Zelf mag je bijvullen en één keer resetten. Al het andere werk aan een gasketel laat je over aan een erkend installateur. Ruik je gas? Ramen open, gaskraan dicht en bel 0800-9009.</p></div>`; }
function warnEbike() { return `<div class="safety"><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 1 21h22z" fill="var(--accent)"/><path d="M12 9v5m0 3v.5" stroke="var(--accent-ink)" stroke-width="2.4" stroke-linecap="round"/></svg><p>Open nooit zelf een e-bike-accu. Bij een beschadigde, warme of opgezwollen accu: niet laden en naar een specialist.</p></div>`; }

// ───────── Foutcodepagina's
for (const { m, f } of allCodes) {
  const c = catOf(m.cat);
  const others = m.faults.filter(x => x.code && x !== f);
  const dev = deviceName(m);
  layout({
    file: codeUrl(m, f),
    title: (() => { const br = m.brand.split("/").map(x => x.trim()); const d = br.length > 1 ? dev.replace(m.brand, br[0]) : dev; return `${d} foutcode ${codeShort(f)} – ${lc1(f.t, m)}: oorzaak + oplossing${br.length > 1 ? ` (ook ${br.slice(1).join(", ")})` : ""}`; })(),
    desc: `Foutcode ${f.code} op je ${dev}: ${f.t.toLowerCase()}. ${f.cause} Zo los je het op: ${f.steps[0]}`,
    extraHead: faqLd([[`Wat betekent foutcode ${f.code} op een ${dev}?`, `${f.t}. ${f.cause}`], [`Wat kun je zelf doen bij foutcode ${f.code}?`, f.steps.join(" ")], [`Moet er een monteur komen bij foutcode ${f.code}?`, `${D[f.d][0].replace(/^\S+\s/, "")}: ${VERDICT[f.d]}`]]),
    crumbs: [{ name: c.name, file: `${c.id}.html` }, { name: fullName(m), file: `${m.id}.html` }, { name: `Foutcode ${codeShort(f)}`, file: codeUrl(m, f) }],
    body: `
<section class="stack">
  <span class="eyebrow">${esc(dev)} · foutcode</span>
  <h1><span class="code big">${esc(f.code)}</span> ${esc(f.t)}</h1>
</section>
<div class="verdict v${f.d}"><strong>${D[f.d][0]}</strong><span>${VERDICT[f.d]}</span></div>
${m.cat === "e-bikes" ? warnEbike() : m.cat === "cv-ketels" ? warnGas() : ""}
<article class="fault">
  <h2>❓ Wat is er aan de hand?</h2>
  <p><strong>${esc(f.t)}.</strong>${f.cause === f.t + "." ? "" : " " + esc(f.cause)}</p>
  <h2>💡 Wat kun je nu zelf doen?</h2>
  <ol>${f.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
  ${blockLink(m, f)}
</article>
${costBlock(m, f)}
${adBlock(m)}
<section class="stack">
  <h2>📞 Wanneer bel je een specialist?</h2>
  <p>${["cv-ketels", "warmtepompen", "airco", "ventilatie", "laadpalen"].includes(m.cat) ? "Komt de code na deze stappen terug, bel dan je installateur of de servicedienst van de fabrikant. Huur je? Meld het bij je verhuurder." : `Komt de code na deze stappen terug, laat het apparaat dan nakijken. Een <a href="https://www.repaircafe.org/bezoeken/" target="_blank" rel="noopener">Repair Café</a> in de buurt helpt gratis. Twijfel je of repareren nog loont, gebruik dan de <a href="repareren-of-vervangen.html">rekenhulp repareren of vervangen</a>.`}</p>
</section>
${others.length ? fold(`Andere foutcodes van ${esc(dev)}`, `<div class="results">${others.map(x => `<a href="${codeUrl(m, x)}"><span><span class="code">${esc(x.code)}</span> ${esc(x.t)}</span><span>${D[x.d][0]}</span></a>`).join("")}</div>`, false, others.length) : ""}
<section class="stack"><p class="row"><a href="${m.id}.html">Alles over ${esc(fullName(m))}: onderhoud en storingen</a>${brandLinks(m) ? " · " + brandLinks(m) : ""}</p><h2>Bron</h2>${srcList(m)}</section>`
  });
}

for (const m of MODELS) for (const f of m.faults.filter(x => !x.code)) {
  const c = catOf(m.cat);
  const dev = deviceName(m);
  const am = m.brand === "Alle merken";
  const others = m.faults.filter(x => !x.code && x !== f);
  layout({
    file: textUrl(m, f),
    title: am ? `${f.t}${f.t.toLowerCase().includes(c.one.toLowerCase()) ? "" : ` (${c.one})`}: oorzaak + oplossing, alle merken` : `${dev}: ${lc1(f.t, m)} (oorzaak + oplossing)`,
    desc: `${am ? "" : dev + ": "}${lc1(f.t, m)}. ${f.cause} Zo los je het op: ${f.steps[0]}`,
    extraHead: faqLd([[`${f.t}${am ? "" : ` (${dev})`}: wat is er aan de hand?`, f.cause], [`${f.t}: wat kun je zelf doen?`, f.steps.join(" ")], [`Moet er een monteur komen?`, `${D[f.d][0].replace(/^\S+\s/, "")}: ${VERDICT[f.d]}`]]),
    crumbs: [{ name: c.name, file: `${c.id}.html` }, { name: fullName(m), file: `${m.id}.html` }, { name: f.t, file: textUrl(m, f) }],
    body: `
<section class="stack">
  <span class="eyebrow">${esc(am ? c.name : dev)} · storing</span>
  <h1>${esc(f.t)}</h1>
</section>
<div class="verdict v${f.d}"><strong>${D[f.d][0]}</strong><span>${VERDICT[f.d]}</span></div>
${m.cat === "e-bikes" ? warnEbike() : m.cat === "cv-ketels" ? warnGas() : ""}
<article class="fault">
  <h2>❓ Wat is er aan de hand?</h2>
  <p>${esc(f.cause)}</p>
  <h2>💡 Wat kun je nu zelf doen?</h2>
  <ol>${f.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
  ${blockLink(m, f)}
</article>
${costBlock(m, f)}
${adBlock(m)}
<section class="stack">
  <h2>📞 Wanneer bel je een specialist?</h2>
  <p>${["cv-ketels", "warmtepompen", "airco", "ventilatie", "laadpalen"].includes(m.cat) ? "Bel je installateur of de servicedienst van de fabrikant. Huur je? Meld het bij je verhuurder." : `Laat het apparaat nakijken. Een <a href="https://www.repaircafe.org/bezoeken/" target="_blank" rel="noopener">Repair Café</a> in de buurt helpt gratis. Twijfel je of repareren nog loont, gebruik dan de <a href="repareren-of-vervangen.html">rekenhulp repareren of vervangen</a>.`}</p>
</section>
${others.length ? fold(`Andere storingen: ${esc(fullName(m))}`, `<div class="results">${others.map(x => `<a href="${textUrl(m, x)}"><span>${esc(x.t)}</span><span>${D[x.d][0]}</span></a>`).join("")}</div>`, false, others.length) : ""}
<section class="stack"><p class="row"><a href="${m.id}.html">Alles over ${esc(fullName(m))}</a>${brandLinks(m) ? " · " + brandLinks(m) : ""}</p><h2>Bron</h2>${srcList(m)}</section>`
  });
}

// ───────── Merkpagina's
const SKIP = new Set(["Alle merken", "E61-groep"]);
const brandsOf = m => m.brand.split("/").map(b => b.trim()).filter(b => !SKIP.has(b));
const BRANDS = {};
for (const m of MODELS) for (const b of brandsOf(m)) (BRANDS[b] = BRANDS[b] || []).push(m);
const brandUrl = b => `merk-${slug(b)}.html`;
const brandNames = Object.keys(BRANDS).sort((a, b) => a.localeCompare(b, "nl"));
for (const b of brandNames) {
  const ms = BRANDS[b].sort((x, y) => CATS.findIndex(c => c.id === x.cat) - CATS.findIndex(c => c.id === y.cat));
  const codes = ms.flatMap(m => m.faults.filter(f => f.code).map(f => ({ m, f })));
  const cats = [...new Set(ms.map(m => catOf(m.cat).one))];
  layout({
    file: brandUrl(b),
    title: `${b} storingen en foutcodes: ${cats.slice(0, 3).join(", ")} | Foutcodezoeker`,
    desc: `Alle ${b}-storingen op een rij: ${codes.length ? codes.length + " foutcodes" : ms.reduce((n, m) => n + m.faults.length, 0) + " storingen"} voor ${cats.join(", ")}. Met oplossing en onderhoudsschema.`,
    crumbs: [{ name: "Merken", file: "merken.html" }, { name: b, file: brandUrl(b) }],
    body: `
<section class="stack"><span class="eyebrow">Merk</span><h1>${esc(b)} storingen en foutcodes</h1><p class="lead">Alle apparaten van ${esc(b)} op Foutcodezoeker: ${cats.join(", ")}. Kies je apparaat of zoek direct je foutcode.</p></section>
<section class="stack"><h2>Apparaten</h2><div class="models">${ms.map(modelCard).join("")}</div></section>
${codes.length ? fold(`Alle ${esc(b)}-foutcodes`, `<div class="tbl"><table><thead><tr><th>Code</th><th>Betekenis</th><th>Apparaat</th></tr></thead><tbody>${codes.map(({ m, f }) => `<tr><td><a class="code" href="${codeUrl(m, f)}">${esc(f.code)}</a></td><td>${esc(f.t)}</td><td>${esc(catOf(m.cat).one)}</td></tr>`).join("")}</tbody></table></div>`, false, codes.length) : ""}
${(() => { const tx = ms.flatMap(m => m.faults.filter(f => !f.code).map(f => ({ m, f }))); return tx.length ? fold(`${esc(b)}-storingen zonder foutcode`, `<div class="results">${tx.map(({ m, f }) => `<a href="${textUrl(m, f)}"><span>${esc(f.t)}</span><span>${esc(catOf(m.cat).one)} · ${D[f.d][0]}</span></a>`).join("")}</div>`, false, tx.length) : ""; })()}`
  });
}
layout({
  file: "merken.html",
  title: `Alle merken: storingen en foutcodes van ${brandNames.length} merken | Foutcodezoeker`,
  desc: `Storingen, foutcodes en onderhoud van ${brandNames.length} merken, van AEG en Bosch tot Samsung, Miele, Dyson en Remeha.`,
  crumbs: [{ name: "Merken", file: "merken.html" }],
  body: `
<section class="stack"><span class="eyebrow">Overzicht</span><h1>Alle merken</h1><p class="lead">Kies het merk van je apparaat.</p></section>
<div class="grid">${brandNames.map(b => `<a class="tile" href="${brandUrl(b)}"><b>${esc(b)}</b><small>${BRANDS[b].length} ${BRANDS[b].length === 1 ? "apparaat" : "apparaten"} · ${BRANDS[b].reduce((n, m) => n + m.faults.length, 0)} storingen</small></a>`).join("")}</div>`
});

// ───────── Overzicht alle foutcodes
layout({
  file: "foutcodes.html",
  title: `Alle foutcodes per merk: ${allCodes.length} codes uitgelegd | Foutcodezoeker`,
  desc: `Overzicht van ${allCodes.length} foutcodes van wasmachines, vaatwassers, drogers en e-bikes, per merk. Met betekenis en oplossing.`,
  crumbs: [{ name: "Foutcodes", file: "foutcodes.html" }],
  body: `
<section class="stack"><span class="eyebrow">Overzicht</span><h1>Alle foutcodes</h1><p class="lead">Zoek je code op in de tabel, of gebruik het zoekveld. Elke code heeft een eigen pagina met oplossing.</p>
<div class="search"><input id="q" type="search" placeholder="Bijv. Bosch WAT28400 E18" aria-label="Zoek een foutcode" autocomplete="off"></div><div class="results" id="res" aria-live="polite"></div><div class="searchtip"><p><strong>Zo vind je direct de oplossing:</strong> typ het merk, het typenummer en de foutcode, bijvoorbeeld <span class="mono">Bosch WAT28400 E18</span>, en druk op Enter. Alleen merk en code werkt ook, zoals <span class="mono">Samsung 4C</span>. Een klacht kan ook: <span class="mono">vaatwasser stinkt</span>.</p><p class="muted">Het typenummer staat op het typeplaatje: meestal in de deuropening, aan de zijkant van de deur of achter het klepje onderaan.</p></div></section>
<p class="muted">Of klap hieronder een categorie open.</p>
${CATS.map(c => { const ms = MODELS.filter(m => m.cat === c.id && m.faults.some(f => f.code)).sort((a, b) => a.brand.localeCompare(b.brand)); if (!ms.length) return ""; const n = ms.reduce((k, m) => k + m.faults.filter(f => f.code).length, 0); return fold(esc(c.name), ms.map(m => `<h3>${esc(deviceName(m))}</h3><div class="tbl"><table><thead><tr><th>Code</th><th>Betekenis</th><th>Zelf doen?</th></tr></thead><tbody>${m.faults.filter(f => f.code).map(f => `<tr><td><a class="code" href="${codeUrl(m, f)}">${esc(f.code)}</a></td><td>${esc(f.t)}</td><td>${pill(f.d)}</td></tr>`).join("")}</tbody></table></div>`).join(""), false, n); }).join("")}`
});

// ───────── Repareren of vervangen
const LIFE = { koffiemachines: [8, 500], wasmachines: [12, 600], vaatwassers: [12, 550], drogers: [12, 700], "cv-ketels": [15, 2000], "kleine-apparaten": [6, 100], ventilatie: [15, 1500], warmtepompen: [15, 8000], airco: [12, 1500], koelkasten: [12, 700], ovens: [12, 600], kookplaten: [12, 600], stofzuigers: [7, 400], "e-bikes": [8, 2800], "3d-printers": [6, 700], tuin: [10, 1500], audio: [30, 800], laadpalen: [10, 1200], printers: [5, 200], laptops: [5, 900], smartphones: [4, 600], televisies: [8, 700], internet: [5, 150], spelcomputers: [7, 500], zonnepanelen: [12, 1200], "camper-caravan": [12, 1500], spa: [4, 500], garagedeuren: [15, 600], auto: [12, 15000], trapliften: [15, 5000], scooters: [8, 3000], kachels: [15, 3000], waterontharders: [12, 1500], boten: [10, 1500] };
layout({
  file: "repareren-of-vervangen.html",
  title: "Repareren of vervangen? Rekenhulp | Foutcodezoeker",
  desc: "Bereken in een paar seconden of repareren nog loont, op basis van leeftijd, levensduur, nieuwprijs en reparatiekosten.",
  crumbs: [{ name: "Repareren of vervangen?", file: "repareren-of-vervangen.html" }],
  extraHead: `<script id="life-data" type="application/json">${JSON.stringify(LIFE)}</script>`,
  body: `
<section class="stack"><span class="eyebrow">Rekenhulp</span><h1>Repareren of vervangen?</h1><p class="lead">Vergelijk de reparatiekosten met de waarde die je apparaat nog heeft. De standaardwaarden zijn vuistregels; vul je eigen bedragen in.</p></section>
<form class="form" id="calc" novalidate>
  <label for="cat">Soort apparaat<select id="cat">${CATS.filter(c => LIFE[c.id]).map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select></label>
  <label for="age">Leeftijd (jaar)<input id="age" type="number" min="0" max="60" value="5" inputmode="numeric"></label>
  <label for="life">Verwachte levensduur (jaar)<input id="life" type="number" min="1" max="60" value="8" inputmode="numeric"></label>
  <label for="nieuw">Prijs nieuw vergelijkbaar (€)<input id="nieuw" type="number" min="0" value="500" inputmode="numeric"></label>
  <label for="rep">Reparatiekosten (€)<input id="rep" type="number" min="0" value="120" inputmode="numeric"></label>
</form>
<div class="verdict" id="out"></div>
<p class="muted">Rekenregel: restwaarde = nieuwprijs × resterende levensduur ÷ totale levensduur. Is de reparatie goedkoper dan die restwaarde, dan loont repareren. Repareren bespaart bovendien de grondstoffen van een nieuw apparaat.</p>`
});

// ───────── Recht op reparatie
layout({
  file: "recht-op-reparatie.html",
  title: "Recht op reparatie: waarom zelf repareren loont, en wat de wet regelt | Foutcodezoeker",
  desc: "De Europese reparatierichtlijn moest op 31 juli 2026 in de wet staan. Nederland is nog niet klaar. Wat betekent dat voor jou?",
  crumbs: [{ name: "Recht op reparatie", file: "recht-op-reparatie.html" }],
  body: `
<section class="stack"><span class="eyebrow">Right to Repair</span><h1>Je recht op reparatie</h1><p class="lead">Sinds 31 juli 2026 moeten alle EU-landen de Europese reparatierichtlijn (EU) 2024/1799 in hun eigen wet hebben opgenomen. Nederland is daar nog niet klaar mee.</p></section>
<section class="stack"><h2>Waarom repareren zo belangrijk is</h2>
<div class="facts-grid">
<div class="fact"><b>62 miljoen ton</b><span>elektronisch afval wereldwijd in 2022. Slechts 22% werd officieel gerecycled, en voor ongeveer 62 miljard dollar aan grondstoffen zoals goud, koper en zilver ging verloren.</span></div>
<div class="fact"><b>25 kilo</b><span>elektronisch afval per Nederlander per jaar, samen ongeveer 450 miljoen kilo.</span></div>
<div class="fact"><b>72%</b><span>van de reparaties in Repair Cafés slaagt. In 2024 waren er wereldwijd naar schatting ruim een miljoen reparatiepogingen, goed voor zo'n 744.000 kilo minder afval.</span></div>
<div class="fact"><b>3.446</b><span>Repair Cafés in meer dan 50 landen (eind 2024), waar vrijwilligers gratis helpen repareren.</span></div>
</div>
<p>Elk apparaat dat langer meegaat, hoeft niet opnieuw gemaakt, vervoerd en verpakt te worden. Dat scheelt grondstoffen, energie en CO₂. En het scheelt geld: een nieuwe pomp of deurrubber kost vaak een fractie van een nieuw apparaat. Op elke storingspagina van Foutcodezoeker zie je wat je zelf kunt doen en wat een reparatie gemiddeld kost. Twijfel je? Gebruik de <a href="repareren-of-vervangen.html">rekenhulp repareren of vervangen</a>.</p>
<p class="muted">Bronnen: Global E-waste Monitor 2024 (VN), via <a href="https://fortune.com/2024/04/08/world-generated-62-million-tonnes-electronic-waste-year-un-agencies-warn-tech-environment/" target="_blank" rel="noopener">Fortune</a>; <a href="https://www.rijksoverheid.nl/actueel/nieuws/2025/03/20/nationaal-reparateursregister-officieel-van-start" target="_blank" rel="noopener">Rijksoverheid</a>; <a href="https://www.repaircafe.org/wp-content/uploads/2025/05/RC_jaarverslag_2024_web.pdf" target="_blank" rel="noopener">Repair Café jaarverslag 2024</a> (schattingen).</p></section>
<section class="stack"><h2>Zelf repareren of laten repareren</h2><div class="tbl"><table><tbody>
<tr><td class="strong">Zelf doen</td><td>Zoek je code op en volg het stappenplan. Bij 🟢 kun je het veilig zelf proberen.</td></tr>
<tr><td class="strong">Gratis hulp</td><td>Ga met je apparaat naar een <a href="https://www.repaircafe.org/bezoeken/" target="_blank" rel="noopener">Repair Café</a> in de buurt.</td></tr>
<tr><td class="strong">Vakman</td><td>Zoek een erkende reparateur in het <a href="https://www.rijksoverheid.nl/actueel/nieuws/2025/03/20/nationaal-reparateursregister-officieel-van-start" target="_blank" rel="noopener">Nationaal Reparateursregister</a>: sinds maart 2025 het register van erkende reparatiebedrijven voor onder meer wasmachines, koelkasten, schermen en vaatwassers.</td></tr>
<tr><td class="strong">Garantie</td><td>Jonger dan twee jaar of korter dan je redelijkerwijs mag verwachten? Meld het eerst bij de winkel.</td></tr>
</tbody></table></div></section>
<section class="stack"><h2>Stand van zaken</h2>
<div class="status"><div><span>Duitsland, Italië</span><span class="pill d1">Omgezet</span></div><div><span>Nederland, Frankrijk, Spanje, Polen, Portugal</span><span class="pill d3">Nog niet volledig</span></div></div>
<p>Op 25 september 2026 stuurde de Europese Commissie aan 18 landen, waaronder Nederland, een formele ingebrekestelling omdat de omzetting niet compleet was. Situatie op 22 oktober 2026.</p></section>
<section class="stack"><h2>Wat de richtlijn regelt</h2><div class="tbl"><table><thead><tr><th>Onderwerp</th><th>Uitleg</th></tr></thead><tbody>
<tr><td class="strong">Reparatieplicht</td><td>Ook na de garantie moet de fabrikant producten met Europese reparatie-eisen repareren, tegen een redelijke prijs.</td></tr>
<tr><td class="strong">Welke producten</td><td>Alleen productgroepen met Europese eisen voor repareerbaarheid, zoals wasmachines, vaatwassers en smartphones. Sinds 31 juli 2026 ook lokale ruimteverwarmers.</td></tr>
<tr><td class="strong">E-bike-accu's</td><td>Vanaf 18 februari 2027 vallen accu's van e-bikes en scooters onder de regels.</td></tr>
<tr><td class="strong">Reparatie binnen de garantie</td><td>Kies je voor reparatie, dan wordt de garantie voor producten gekocht vanaf 31 juli 2026 met een jaar verlengd.</td></tr>
<tr><td class="strong">Onderdelen</td><td>Fabrikanten moeten bepaalde onderdelen binnen 15 werkdagen kunnen leveren.</td></tr>
<tr><td class="strong">Geen gratis reparatie</td><td>De richtlijn geeft geen algemeen recht op gratis reparatie van elk product.</td></tr>
</tbody></table></div></section>
<section class="stack"><h2>Al geldend in Nederland</h2><p>In Nederland geldt geen vaste garantietermijn: een product moet zo lang meegaan als je redelijkerwijs mag verwachten. Meld een gebrek eerst bij de winkel, niet bij de fabrikant.</p>
<p class="muted">Dit is algemene informatie, geen juridisch advies. Kijk voor je eigen situatie bij ConsuWijzer of het Juridisch Loket.</p>
<div class="row"><a href="https://www.consuwijzer.nl" target="_blank" rel="noopener">ConsuWijzer</a><a href="https://repair.eu" target="_blank" rel="noopener">Right to Repair Europe</a><a href="https://eur-lex.europa.eu/eli/dir/2024/1799/oj" target="_blank" rel="noopener">Richtlijn 2024/1799</a></div></section>`
});

// ───────── Eerste hulp
layout({
  file: "eerste-hulp-bij-storingen.html",
  title: "Eerste hulp bij storingen: wat doe je als eerste? | Foutcodezoeker",
  desc: "Storing, lekkage of geen warm water? Zo pak je het rustig en veilig aan in vier stappen, voor elk apparaat.",
  crumbs: [{ name: "Eerste hulp bij storingen", file: "eerste-hulp-bij-storingen.html" }],
  body: `
<section class="stack"><span class="eyebrow">Rustig aan</span><h1>Eerste hulp bij storingen</h1><p class="lead">Een lekkende vaatwasser of een koude douche geeft stress. Met deze vier stappen weet je binnen een paar minuten waar je staat.</p></section>
<div class="verdict v3"><strong>🔴 Direct gevaar?</strong><span>Ruik je gas: gaskraan dicht, ramen open, geen vuur, geen schakelaars of stekkers, ga naar buiten en bel 0800-9009. Rook, brand of vonken: haal de stroom eraf als dat veilig kan en bel 112.</span></div>
<article class="fault"><h2>1. Veiligheid eerst</h2><ol><li>Lekt er water? Draai de kraan dicht en haal de stekker uit het stopcontact. Raak geen natte stekkers of stopcontacten aan; zet dan eerst de groep in de meterkast uit.</li><li>Ruik je iets branderigs of wordt het apparaat heet? Stekker eruit en niet meer gebruiken.</li><li>Bij een e-bike-, step- of scooteraccu die heet wordt, rookt of opzwelt: niet meer laden, buiten neerleggen als dat veilig kan.</li></ol>
<h2>2. Noteer de code en het typenummer</h2><ol><li>Schrijf de foutcode precies over, inclusief punten, streepjes en letters (bijvoorbeeld A.02.33 of E 112 H).</li><li>Geen code maar een knipperend lampje? Tel hoe vaak het knippert en welke kleur het heeft. Kijk op de pagina <a href="knipperende-lampjes.html">knipperende lampjes</a>.</li><li>Zoek het typeplaatje: meestal in de deuropening, aan de zijkant van de deur, achter het klepje onderaan of op de achterkant. Maak er een foto van.</li></ol>
<h2>3. Probeer een eenvoudige herstart</h2><ol><li>Zet het apparaat uit en haal de stekker er een paar minuten uit. Veel tijdelijke storingen zijn daarna weg.</li><li>Cv-ketel, warmtepomp of gashaard: gebruik de resetknop volgens de handleiding en reset hooguit één keer. Komt de storing terug, dan is resetten niet de oplossing.</li><li>Laadpaal, omvormer of thuisbatterij: volg het stappenplan van je apparaat, bijvoorbeeld <a href="omvormer-resetten.html">omvormer resetten</a> of <a href="laadpaal-resetten.html">laadpaal herstarten</a>.</li></ol>
<h2>4. Zoek je code op</h2><p>Typ merk, typenummer en code in de zoekbalk, bijvoorbeeld <span class="mono">Bosch wasmachine E18</span>. Elke pagina vertelt wat de code betekent, wat je zelf kunt doen en wanneer je een specialist belt.</p>
<div class="search"><input id="q" type="search" placeholder="Bijv. Bosch WAT28400 E18" aria-label="Zoek een foutcode" autocomplete="off"></div><div class="results" id="res" aria-live="polite"></div></article>
<section class="stack"><h2>Nog onder garantie?</h2><p>Is je apparaat jonger dan twee jaar, of mag je redelijkerwijs verwachten dat het nog werkt? Meld het dan eerst bij de winkel waar je het kocht, voordat je zelf iets openmaakt. Lees meer bij <a href="recht-op-reparatie.html">recht op reparatie</a>.</p></section>`
});

// ───────── Knipperende lampjes
{
  const re = /lampje|knipper|led\b|leds\b|symbool|icoon|display (toont|blijft)|piept|piepjes/i;
  const items = MODELS.flatMap(m => m.faults.filter(f => re.test(f.t) || (f.code && re.test(f.code))).map(f => ({ m, f })));
  const byCat = CATS.map(c => ({ c, list: items.filter(x => x.m.cat === c.id) })).filter(x => x.list.length);
  layout({
    file: "knipperende-lampjes.html",
    title: `Knipperend lampje of piepje? ${items.length} betekenissen per apparaat | Foutcodezoeker`,
    desc: "Geen foutcode maar een knipperend lampje, een symbool of een piepje? Zoek hier per apparaat wat het betekent en wat je zelf kunt doen.",
    crumbs: [{ name: "Knipperende lampjes", file: "knipperende-lampjes.html" }],
    body: `
<section class="stack"><span class="eyebrow">Lampjes, symbolen en piepjes</span><h1>Knipperend lampje of piepje?</h1><p class="lead">Veel apparaten tonen geen code, maar een knipperend lampje, een symbool of een reeks piepjes. Tel hoe vaak het knippert en kijk welke kleur het heeft. Zoek daarna hieronder je apparaat, of typ bijvoorbeeld <span class="mono">Sonos lampje oranje</span> in de zoekbalk.</p>
<div class="search"><input id="q" type="search" placeholder="Bijv. Otolift piept of Truma lampje" aria-label="Zoek een lampje of storing" autocomplete="off"></div><div class="results" id="res" aria-live="polite"></div></section>
${byCat.map(({ c, list }) => fold(esc(c.name), `<div class="results">${list.map(({ m, f }) => `<a href="${f.code ? codeUrl(m, f) : textUrl(m, f)}"><span>${f.code ? `<span class="code">${esc(f.code)}</span> ` : ""}${esc(f.t)}</span><span>${esc(fullName(m))} · ${D[f.d][0]}</span></a>`).join("")}</div>`, false, list.length)).join("")}`
  });
}

// ───────── Disclaimer
layout({
  file: "disclaimer.html",
  title: "Disclaimer | Foutcodezoeker",
  desc: "Foutcodezoeker geeft algemene informatie. Je repareert altijd op eigen risico.",
  crumbs: [{ name: "Disclaimer", file: "disclaimer.html" }],
  body: `
<section class="stack"><span class="eyebrow">Voorwaarden</span><h1>Disclaimer</h1><p class="lead">Alles op Foutcodezoeker is algemene informatie. Je gebruikt het op eigen risico.</p></section>
<section class="stack"><h2>Eigen risico</h2>
<p>De uitleg bij foutcodes, storingen en onderhoud is met zorg samengesteld uit openbare bronnen, zoals handleidingen en supportpagina's van fabrikanten. Toch kan informatie onvolledig, verouderd of voor jouw model niet van toepassing zijn. Codes kunnen per bouwjaar, typenummer en softwareversie verschillen.</p>
<p>Je voert een controle, reiniging of reparatie altijd zelf en op eigen risico uit. Foutcodezoeker en de maker zijn, voor zover de wet dat toestaat, niet aansprakelijk voor schade aan apparaten, woning of personen, voor letsel, voor verlies van garantie of voor andere gevolgen van het gebruik van deze site.</p></section>
<section class="stack"><h2>Veiligheid</h2>
<ul class="weak">
<li>Haal altijd de stekker uit het stopcontact of zet de groep uit voordat je iets openschroeft, en draai de waterkraan dicht.</li>
<li>Werk niet zelf aan gasleidingen, gasbranders of de binnenkant van een cv-ketel. Ruik je gas? Bel 0800-9009.</li>
<li>Open nooit zelf een accu van een e-bike, stofzuiger of ander apparaat.</li>
<li>Werk aan de elektrische aansluiting, krachtstroom of een koelcircuit hoort bij een erkend installateur.</li>
<li>Twijfel je? Volg de handleiding van de fabrikant of schakel een monteur in.</li>
</ul></section>
<section class="stack"><h2>Garantie</h2><p>Zelf repareren of openen kan de garantie van de fabrikant of verkoper laten vervallen. Valt je apparaat nog onder garantie, neem dan eerst contact op met de verkoper of fabrikant.</p></section>
<section class="stack"><h2>Merken en links</h2><p>Foutcodezoeker is onafhankelijk en niet verbonden aan de genoemde merken of fabrikanten. Merknamen zijn eigendom van hun eigenaren en worden alleen gebruikt om apparaten aan te duiden. Voor de inhoud van externe websites waarnaar we linken zijn we niet verantwoordelijk.</p></section>
<section class="stack"><h2>Fout gezien?</h2><p>Klopt er iets niet? Mail naar info@foutcodezoeker.nl, dan passen we het aan.</p></section>`
});

// ───────── 404
layout({ file: "404.html", title: "Pagina niet gevonden | Foutcodezoeker", desc: "Deze pagina bestaat niet.", body: `<section class="stack"><h1>Pagina niet gevonden</h1><p class="lead">Zoek je een foutcode? Typ hem hieronder.</p><div class="search"><input id="q" type="search" placeholder="Bijv. E24" aria-label="Zoek" autocomplete="off"></div><div class="results" id="res" aria-live="polite"></div><p><a href="index.html">Naar de homepage</a></p></section>` });

// ───────── Kennisbank
const kbCat = a => a.cat ? CATS.find(c => c.id === a.cat) : null;
for (const a of KB) {
  const file = `kennisbank-${a.id}.html`, url = `${SITE}/kennisbank-${a.id}`;
  const art = `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.desc, inLanguage: "nl-NL", mainEntityOfPage: url, author: { "@type": "Organization", name: "Foutcodezoeker", url: SITE + "/" }, publisher: { "@type": "Organization", name: "Foutcodezoeker", url: SITE + "/" }, citation: a.src.map(([n, u]) => ({ "@type": "CreativeWork", name: n, url: u })) }).replace(/</g, "\\u003c")}</script>`;
  const c = kbCat(a);
  layout({
    file, title: `${a.title} | Foutcodezoeker`, desc: a.desc,
    crumbs: [{ name: "Kennisbank", file: "kennisbank.html" }, { name: a.q, file }],
    extraHead: art + faqLd(a.faq),
    body: `
<section class="stack"><span class="eyebrow">Kennisbank${c ? " · " + esc(c.name) : ""}</span><h1>${esc(a.q)}</h1><p class="lead">${esc(a.lead)}</p></section>
${a.safety ? `<div class="verdict v3"><strong>🔴 Direct gevaar?</strong><span>${esc(a.safety)}</span></div>` : ""}
<article class="fault kb">${a.secs.map(([h, html]) => `<h2>${esc(h)}</h2>${html}`).join("\n")}</article>
<section class="stack"><h2>Veelgestelde vragen</h2>${a.faq.map(([q, an]) => `<h3>${esc(q)}</h3><p>${esc(an)}</p>`).join("")}</section>
<section class="stack"><h2>Lees ook</h2><ul class="kb-list">${a.rel.map(([u, t]) => `<li><a href="${u}">${esc(t)}</a></li>`).join("")}</ul></section>
<section class="stack"><h2>Bron</h2><ul class="sources">${a.src.map(([n, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${esc(n)}</a></li>`).join("")}</ul></section>`
  });
}
layout({
  file: "kennisbank.html",
  title: `Kennisbank: uitleg over storingen, onderhoud en veiligheid | Foutcodezoeker`,
  desc: `${KB.length} heldere uitlegartikelen met bronnen: cv-ketel druk, gaslucht, stroomstoring, rookmelders, koolmonoxide, omvormer, garantie en onderhoud van je apparaten.`,
  crumbs: [{ name: "Kennisbank", file: "kennisbank.html" }],
  body: `
<section class="stack"><span class="eyebrow">Uitleg</span><h1>Kennisbank</h1><p class="lead">Antwoord op veelgestelde vragen over storingen, onderhoud en veiligheid in huis. Elk artikel noemt zijn bronnen.</p></section>
${[...CATS.filter(c => KB.some(a => a.cat === c.id)), { id: null, name: "Algemeen" }].map(c => { const list = KB.filter(a => a.cat === c.id); return list.length ? `<section class="stack"><h2>${esc(c.name)}</h2><ul class="kb-cards">${list.map(a => `<li><a href="kennisbank-${a.id}.html"><strong>${esc(a.q)}</strong><span>${esc(a.desc)}</span></a></li>`).join("")}</ul></section>` : ""; }).join("\n")}`
});

// ───────── Zoekindex, sitemap, robots, favicon, assets
// Bereiken als "2002-4301 t/m 2002-4500" uitschrijven, zodat elke losse code vindbaar is
const rangeCodes = code => { const r = /^(\d{4})-(\d{4}) (?:t\/m|tot) \1-(\d{4})$/.exec(code); if (!r) return ""; const out = []; for (let i = +r[2]; i <= +r[3] && out.length < 1000; i++) out.push(`${r[1]}${String(i).padStart(4, "0")}`); return out.join(" "); };
const index = [
  ...MODELS.map(m => ({ t: fullName(m), s: catOf(m.cat).name, u: `${m.id}.html`, b: brandsOf(m), a: catOf(m.cat).one, k: `${m.brand} ${m.name} ${m.also || ""} ${catOf(m.cat).name}` })),
  ...allCodes.map(({ m, f }) => ({ c: f.code, t: f.t, s: deviceName(m), u: codeUrl(m, f), b: brandsOf(m), a: catOf(m.cat).one, k: `${f.code} ${rangeCodes(f.code)} ${f.t} ${m.brand} ${m.name} ${m.also || ""} ${catOf(m.cat).one} ${catOf(m.cat).name}` })),
  ...MODELS.flatMap(m => m.faults.filter(f => !f.code).map(f => ({ t: f.t, s: fullName(m), u: textUrl(m, f), b: brandsOf(m), a: catOf(m.cat).one, k: `${f.t} ${m.brand} ${m.name}` }))),
  ...CATS.map(c => ({ t: c.name, s: "Categorie", u: `${c.id}.html`, k: c.name })),
  ...KB.map(a => ({ t: a.q, s: "Kennisbank", u: `kennisbank-${a.id}.html`, k: `${a.q} ${a.title} ${a.desc} kennisbank uitleg` })),
  ...brandNames.map(b => ({ t: `${b} storingen en foutcodes`, s: "Merk", u: brandUrl(b), k: `${b} merk storing foutcode` }))
];
fs.writeFileSync(path.join(OUT, "search.js"), `window.SEARCH=${JSON.stringify(index)};`);
fs.writeFileSync(path.join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.filter(p => p !== "404.html").map(p => `  <url><loc>${p === "index.html" ? SITE + "/" : SITE + "/" + p.replace(/\.html$/, "")}</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>`).join("\n")}\n</urlset>\n`);
fs.writeFileSync(path.join(OUT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
fs.writeFileSync(path.join(OUT, "llms.txt"), `# Foutcodezoeker

> Foutcodezoeker (${SITE}) legt foutcodes, knipperende lampjes en storingen van apparaten uit in gewoon Nederlands, per merk en model. Elke pagina geeft de betekenis, wat je zelf kunt doen, wanneer je een specialist belt en (waar bekend) wat een reparatie gemiddeld kost. Alle informatie komt uit een genoemde bron, zoals de handleiding of supportpagina van de fabrikant; de bron staat onderaan elke pagina.

Taal: Nederlands. Contact: info@foutcodezoeker.nl. Gemaakt door Erik.

## Overzichten
- [Alle foutcodes](${SITE}/foutcodes): alle codes per categorie
- [Knipperende lampjes en piepjes](${SITE}/knipperende-lampjes)
- [Eerste hulp bij storingen](${SITE}/eerste-hulp-bij-storingen)
- [Kennisbank](${SITE}/kennisbank): uitlegartikelen met bronnen
${KB.map(a => `  - [${a.q}](${SITE}/kennisbank-${a.id})`).join("\n")}
- [Alle merken](${SITE}/merken)
- [Repareren of vervangen?](${SITE}/repareren-of-vervangen)
- [Recht op reparatie](${SITE}/recht-op-reparatie)

## Categorieën
${CATS.map(c => `- [${c.name}](${SITE}/${c.id}): ${c.intro}`).join("\n")}

## Opbouw van een foutcodepagina
Elke foutcode heeft een eigen pagina (${SITE}/foutcode-<model>-<code>) met: een inschatting (zelf op te lossen / voorzichtig zelf proberen / bel een monteur), wat er aan de hand is, stappen om het zelf op te lossen, wanneer je een specialist belt en de bron.
`);
fs.writeFileSync(path.join(OUT, "favicon.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#f2b705"/><path d="M21.5 6.5a5 5 0 0 0-6.2 6.4L7 21.2 10.8 25l8.3-8.3a5 5 0 0 0 6.4-6.2l-3 3-3.2-.8-.8-3.2z" fill="#1c2328"/></svg>`);
if (fs.existsSync(path.join(__dirname, "static"))) for (const f of fs.readdirSync(path.join(__dirname, "static"))) fs.copyFileSync(path.join(__dirname, "static", f), path.join(OUT, f));
for (const f of ["style.css", "app.js"]) fs.copyFileSync(path.join(__dirname, "assets", f), path.join(OUT, f));

console.log(`${pages.length} pagina's gebouwd (${allCodes.length} foutcodes, ${MODELS.length} modellen) voor ${SITE}`);
