(function () {
  "use strict";
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var norm = function (s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, ""); };
  var store = {
    get: function (k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };

  // Zoeken
  var q = document.getElementById("q"), res = document.getElementById("res");
  {
    // Typenummer → apparaat, op basis van het begin van het typenummer per merk
    var TYPE = {
      bosch: [["wa", "wasmachine"], ["wt", "droger"], ["wq", "droger"], ["sm", "vaatwasser"], ["sb", "vaatwasser"], ["sp", "vaatwasser"], ["sr", "vaatwasser"], ["hb", "oven"], ["hr", "oven"], ["pi", "kookplaat"], ["pu", "kookplaat"], ["pv", "kookplaat"], ["px", "kookplaat"]],
      siemens: [["wm", "wasmachine"], ["wu", "wasmachine"], ["wg", "wasmachine"], ["wn", "wasmachine"], ["wt", "droger"], ["wq", "droger"], ["sn", "vaatwasser"], ["sr", "vaatwasser"], ["sx", "vaatwasser"], ["hb", "oven"], ["hm", "oven"], ["ex", "kookplaat"], ["eh", "kookplaat"], ["eu", "kookplaat"]],
      samsung: [["ww", "wasmachine"], ["wf", "wasmachine"], ["wd", "wasmachine"], ["dv", "droger"], ["dw", "vaatwasser"], ["nv", "oven"], ["nq", "oven"], ["ms", "oven"], ["mg", "oven"], ["mc", "oven"], ["rb", "koelkast"], ["rs", "koelkast"], ["rf", "koelkast"], ["rr", "koelkast"], ["rz", "koelkast"]],
      miele: [["g", "vaatwasser"], ["t", "droger"], ["w", "wasmachine"], ["h", "oven"]],
      aeg: [["l", "wasmachine"], ["t", "droger"], ["f", "vaatwasser"], ["b", "oven"]]
    };
    var words = function (s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").split(/[^a-z0-9]+/).filter(Boolean); };
    var search = function (text) {
      var tokens = words(String(text).replace(/\b([a-z]{1,2})[.\-](?=\d)/gi, "$1").replace(/(\d)\.(?=\d)/g, "$1").replace(/([a-z0-9])-(?=\d)/gi, "$1").replace(/\b([a-z])-([a-z]\d)/gi, "$1$2"));
      if (!tokens.length) return [];
      var brandTok = tokens.filter(function (t) { return TYPE[t]; });
      var device = null;
      tokens.forEach(function (t) {
        if (!/[a-z]/.test(t) || !/[0-9]/.test(t) || t.length < 4) return;
        brandTok.forEach(function (b) { TYPE[b].forEach(function (p) { if (!device && t.indexOf(p[0]) === 0) device = p[1]; }); });
      });
      var data = window.SEARCH || [], hits = [];
      if (!window.__DEV) { window.__DEV = {}; data.forEach(function (d) { if (d.a) { var w = words(d.a); if (w.length === 1 && w[0] !== "apparaat") window.__DEV[w[0]] = true; } }); }
      var devTok = null; tokens.forEach(function (t) { if (!devTok && window.__DEV[t]) devTok = t; });
      var pairs = []; for (var k = 0; k + 1 < tokens.length; k++) { pairs.push(tokens[k] + tokens[k + 1]); if (k + 2 < tokens.length) pairs.push(tokens[k] + tokens[k + 1] + tokens[k + 2]); }
      for (var i = 0; i < data.length; i++) {
        var d = data[i], hay = " " + words(d.k).join(" ") + " ", score = 0, matched = 0, codeHit = false;
        if (devTok && d.a && words(d.a).indexOf(devTok) < 0) continue;
        var parts = d.c ? d.c.split("/").map(norm) : [];
        for (var q2 = 0; q2 < pairs.length; q2++) if (parts.indexOf(pairs[q2]) > -1) { score += 12; matched++; codeHit = true; }
        for (var j = 0; j < tokens.length; j++) {
          var v = tokens[j];
          if (parts.indexOf(v) > -1) { score += 10; matched++; codeHit = true; }
          else if (/[0-9]/.test(v) && parts.some(function (p) { return p.indexOf(v) === 0; })) { score += 5; matched++; codeHit = true; }
          else if (hay.indexOf(" " + v + " ") > -1) { score += 3; matched++; }
          else if (v.length > 2 && hay.indexOf(v) > -1) { score += 1; matched++; }
        }
        if (d.b) { var bw = words(d.b.join(" ")); for (var z = 0; z < tokens.length; z++) if (bw.indexOf(tokens[z]) > -1) { score += 4; break; } }
        if (device && d.a === device) score += 4;
        if (device && d.a && d.a !== device) score -= 4;
        var looksLikeCode = tokens.some(function (t) { return /[0-9]/.test(t) && t.length <= 5; });
        if (looksLikeCode && d.c && !codeHit) continue;
        if (matched && score > 0) hits.push([score, d]);
      }
      return hits.sort(function (a, b) { return b[0] - a[0]; });
    };
    window.fczSearch = search;
  }
  if (q && res) {
    var run = function () {
      var hits = search(q.value);
      if (!q.value.trim()) { res.innerHTML = ""; return; }
      res.innerHTML = hits.length ? hits.slice(0, 15).map(function (h, i) {
        var d = h[1];
        return '<a href="' + d.u + '"' + (i === 0 ? ' class="best"' : "") + '><span>' + (d.c ? '<span class="code">' + esc(d.c) + "</span> " : "") + esc(d.t) + "</span><span>" + esc(d.s) + "</span></a>";
      }).join("") : '<p class="muted" style="padding:10px 2px">Niets gevonden voor "' + esc(q.value) + '". Probeer alleen het merk en de code, bijvoorbeeld "Bosch E24".</p>';
    };
    q.addEventListener("input", run);
    q.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      var hits = search(q.value);
      if (hits.length) { e.preventDefault(); location.href = hits[0][1].u; }
    });
    if (q.form) q.form.addEventListener("submit", function (e) { e.preventDefault(); });
    try { var pq = new URLSearchParams(location.search).get("q"); if (pq) { q.value = pq; run(); } } catch (e) {}
  }

  // Keuzehulp: merk → apparaat → foutcodes
  var pm = document.getElementById("pm"), pa = document.getElementById("pa"), pres = document.getElementById("pres");
  if (pm && pa && pres) {
    var codes = (window.SEARCH || []).filter(function (d) { return d.c && d.b; });
    var brands = {};
    codes.forEach(function (d) { d.b.forEach(function (b) { brands[b] = true; }); });
    Object.keys(brands).sort(function (a, b) { return a.localeCompare(b, "nl"); }).forEach(function (b) {
      var o = document.createElement("option"); o.value = b; o.textContent = b; pm.appendChild(o);
    });
    var show = function () {
      var b = pm.value, a = pa.value;
      if (!b) { pres.innerHTML = ""; return; }
      var list = codes.filter(function (d) { return d.b.indexOf(b) > -1 && (!a || d.a === a); });
      pres.innerHTML = list.map(function (d) {
        return '<a href="' + d.u + '"><span><span class="code">' + esc(d.c) + "</span> " + esc(d.t) + "</span><span>" + esc(d.a) + "</span></a>";
      }).join("") || '<p class="muted" style="padding:10px 2px">Geen foutcodes gevonden.</p>';
    };
    pm.addEventListener("change", function () {
      var types = {};
      codes.forEach(function (d) { if (d.b.indexOf(pm.value) > -1) types[d.a] = true; });
      var keys = Object.keys(types).sort();
      pa.innerHTML = '<option value="">' + (pm.value ? (keys.length > 1 ? "Alle apparaten" : keys[0] || "") : "Kies eerst een merk") + "</option>" +
        (keys.length > 1 ? keys.map(function (k) { return '<option value="' + esc(k) + '">' + esc(k.charAt(0).toUpperCase() + k.slice(1)) + "</option>"; }).join("") : "");
      pa.disabled = !pm.value || keys.length < 2;
      show();
    });
    pa.addEventListener("change", show);
  }

  // Onderhoudsteller
  var tdEl = document.getElementById("tasks-data"), box = document.getElementById("tasks");
  if (tdEl && box) {
    var cfg = JSON.parse(tdEl.textContent), key = "rw-" + cfg.id;
    var st = store.get(key) || { count: 0, n: {}, d: {} };
    st.n = st.n || {}; st.d = st.d || {};
    var status = function (t) {
      if (t.n && cfg.unit) {
        var used = (st.count || 0) - (st.n[t.t] || 0), left = t.n - used;
        return { cls: left <= 0 ? "due" : left <= t.n * 0.2 ? "soon" : "fine", txt: left <= 0 ? "Nu doen" : "Nog " + left + " " + cfg.unitLabel };
      }
      if (t.m) {
        var last = st.d[t.t];
        if (!last) return { cls: "", txt: "Nog niet bijgehouden" };
        var days = Math.round(t.m * 30.4 - (Date.now() - last) / 864e5);
        return { cls: days <= 0 ? "due" : days <= t.m * 6 ? "soon" : "fine", txt: days <= 0 ? "Nu doen" : "Nog " + days + " dagen" };
      }
      return { cls: "", txt: "" };
    };
    var render = function () {
      box.innerHTML = cfg.tasks.map(function (t, i) {
        var s = status(t);
        return '<div class="task"><span class="dot ' + s.cls + '" aria-hidden="true"></span><div class="what"><b>' + esc(t.t) + "</b><small>" + esc(t.label) + (t.s ? " · " + esc(t.s) : "") + (t.v ? " · vuistregel" : "") + "</small>" + (s.txt ? '<small class="st">' + esc(s.txt) + "</small>" : "") + "</div>" + (t.w ? "" : '<button class="btn" type="button" data-i="' + i + '">Gedaan</button>') + "</div>";
      }).join("");
    };
    box.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-i]"); if (!b) return;
      var t = cfg.tasks[+b.dataset.i];
      if (t.n) st.n[t.t] = st.count || 0; else st.d[t.t] = Date.now();
      store.set(key, st); render();
      b = box.querySelector('button[data-i="' + b.dataset.i + '"]'); if (b) b.focus();
    });
    var cnt = document.getElementById("cnt");
    if (cnt) { cnt.value = st.count || ""; cnt.placeholder = "0"; cnt.addEventListener("input", function () { st.count = Math.max(0, +cnt.value || 0); store.set(key, st); render(); }); }
    render();
  }

  // Rekenhulp
  var calc = document.getElementById("calc");
  if (calc) {
    var LIFE = JSON.parse(document.getElementById("life-data").textContent);
    var $ = function (id) { return document.getElementById(id); };
    var out = $("out");
    var run2 = function () {
      var age = +$("age").value || 0, life = Math.max(1, +$("life").value || 1), nieuw = +$("nieuw").value || 0, rep = +$("rep").value || 0;
      var left = Math.max(0, life - age), rest = Math.round(nieuw * left / life);
      var ok = rep < rest, close = !ok && rep < rest * 1.2, col = ok ? "--ok" : close ? "--warn" : "--bad";
      var pct = rest ? Math.min(100, Math.round(rep / rest * 100)) : 100;
      out.innerHTML = '<span class="eyebrow">Advies</span><strong style="color:var(' + col + ')">' + (ok ? "Repareren" : close ? "Twijfelgeval" : "Vervangen") + "</strong>" +
        "<p>Restwaarde ongeveer <b>€" + rest + "</b> (nog " + left + " van " + life + " jaar). Reparatie kost <b>€" + rep + "</b>, dat is " + (rest ? pct + "%" : "meer dan 100%") + " van de restwaarde.</p>" +
        '<div class="meter" role="img" aria-label="Reparatiekosten als deel van de restwaarde: ' + pct + '%"><i style="width:' + pct + "%;background:var(" + col + ')"></i></div>' +
        (ok ? "<p>Doe je het zelf, dan betaal je vaak alleen het onderdeel.</p>" : close ? "<p>Vraag een tweede offerte of probeer een Repair Café voordat je beslist.</p>" : "<p>Kijk eerst of de storing een eenvoudige oorzaak heeft, zoals een vol filter.</p>");
    };
    $("cat").addEventListener("change", function () { var l = LIFE[$("cat").value] || [8, 500]; $("life").value = l[0]; $("nieuw").value = l[1]; run2(); });
    ["age", "life", "nieuw", "rep"].forEach(function (i) { $(i).addEventListener("input", run2); });
    calc.addEventListener("submit", function (e) { e.preventDefault(); });
    var l0 = LIFE[$("cat").value] || [8, 500]; $("life").value = l0[0]; $("nieuw").value = l0[1];
    run2();
  }
})();

(function () {
  if ("serviceWorker" in navigator) window.addEventListener("load", function () { navigator.serviceWorker.register("/sw.js").catch(function () {}); });
  var box = document.getElementById("installapp"); if (!box) return;
  var btn = document.getElementById("installbtn"), txt = document.getElementById("installtxt"), ev = null;
  var standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
  if (standalone) return;
  window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); ev = e; box.hidden = false; btn.hidden = false; });
  btn && btn.addEventListener("click", function () { if (!ev) return; ev.prompt(); ev.userChoice.finally(function () { box.hidden = true; ev = null; }); });
  if (/iphone|ipad|ipod/i.test(navigator.userAgent)) { box.hidden = false; txt.textContent = "Zet Foutcodezoeker op je beginscherm: tik in Safari op de deelknop en kies Zet op beginscherm."; }
})();
/* Terug-knop: ga terug in de geschiedenis als je van deze site komt, anders naar de bovenliggende pagina */
(function () {
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-back]");
    if (!a) return;
    var ref = document.referrer;
    try { if (ref && new URL(ref).host === location.host && history.length > 1) { e.preventDefault(); history.back(); } } catch (x) {}
  });
  /* Menu sluiten bij klik erbuiten of Escape */
  var menu = document.querySelector("details.menu");
  if (menu) {
    document.addEventListener("click", function (e) { if (menu.open && !menu.contains(e.target)) menu.open = false; });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") menu.open = false; });
  }
  /* Open een uitklapblok als de link ernaartoe verwijst */
  if (location.hash) { var t = document.querySelector(location.hash.replace(/[^#\w-]/g, "")); var d = t && t.closest && t.closest("details"); if (d) d.open = true; }
})();
/* Zoekassistent (chat): zoekt in Foutcodezoeker en toont het antwoord van de best passende pagina. Geen AI, niets wordt verstuurd. */
(function () {
  "use strict";
  var el = function (tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  var loading = null;
  var ensureIndex = function () {
    if (window.SEARCH) return Promise.resolve();
    if (!loading) loading = new Promise(function (ok, fail) { var s = document.createElement("script"); s.src = "search.js"; s.onload = ok; s.onerror = fail; document.head.appendChild(s); });
    return loading;
  };
  var fab = el("button", "chat-fab"); fab.type = "button"; fab.setAttribute("aria-haspopup", "dialog"); fab.setAttribute("aria-expanded", "false");
  fab.appendChild(el("span", "chat-fab-ico", "💬")); fab.appendChild(el("span", "chat-fab-txt", "Stel je vraag"));
  var panel = null, log, input;
  var add = function (who, node) { var b = el("div", "chat-msg " + who); if (typeof node === "string") b.textContent = node; else b.appendChild(node); log.appendChild(b); log.scrollTop = log.scrollHeight; return b; };
  var link = function (href, text) { var a = el("a", null, text); a.href = href; return a; };
  var SAFE = /(gaslucht|ruik.*gas|gas.*ruik|gaslek|koolmonoxide|\bco[- ]?(alarm|melder)\b|brand\b|rookontwikkeling)/i;
  var answer = function (q) {
    var wait = add("bot", "Even zoeken…");
    ensureIndex().then(function () {
      var STOP = /\b(mijn|m'n|ik|heb|hebben|een|de|het|die|dat|wat|is|er|aan|de|hand|geeft|geef|staat|toont|zie|melding|foutmelding|foutcode|code|fout|storing|probleem|met|op|van|bij|in|en|hoe|los|lossen|oplossen|doe|moet|kan|ik|wil|help|hulp|graag|gaat|niet|meer|nou|nu|weer|steeds|elke|keer|waarom|doet)\b/gi;
      var qq = q.replace(STOP, " ").trim() || q;
      var hits = (window.fczSearch ? window.fczSearch(qq) : []).slice(0, 6).map(function (h) { return h[1]; });
      if (SAFE.test(q)) {
        var w = el("div", "chat-warn"); w.textContent = "Ruik je gas? Gaskraan dicht, ramen open, geen schakelaars of vuur en bel 0800-9009. Bij brand of een koolmonoxide-alarm: direct naar buiten en bel 112.";
        log.insertBefore(el("div", "chat-msg bot").appendChild(w).parentNode, wait);
      }
      if (!hits.length) {
        wait.textContent = "";
        wait.appendChild(el("p", null, "Daar vond ik niets over. Probeer het merk, het soort apparaat en de foutcode of het lampje, bijvoorbeeld “Bosch wasmachine E18” of “Truma lampje knippert”."));
        var p = el("p"); p.appendChild(document.createTextNode("Of bekijk ")); p.appendChild(link("eerste-hulp-bij-storingen.html", "eerste hulp bij storingen")); p.appendChild(document.createTextNode(".")); wait.appendChild(p);
        return;
      }
      var top = hits[0], rest = hits.slice(1, 4);
      var others = function (box) {
        if (!rest.length) return;
        box.appendChild(el("p", "chat-sub", "Bedoel je misschien:"));
        var ul = el("ul", "chat-list"); rest.forEach(function (d) { var li = el("li"); li.appendChild(link(d.u, (d.c ? d.c + " – " : "") + d.t)); li.appendChild(el("small", null, " · " + d.s)); ul.appendChild(li); }); box.appendChild(ul);
      };
      if (SAFE.test(q) || !/^(foutcode|storing|kennisbank)-/.test(top.u)) {
        wait.textContent = "";
        wait.appendChild(el("p", null, "Dit vond ik op Foutcodezoeker:"));
        var ul = el("ul", "chat-list"); hits.slice(0, 5).forEach(function (d) { var li = el("li"); li.appendChild(link(d.u, (d.c ? d.c + " – " : "") + d.t)); li.appendChild(el("small", null, " · " + d.s)); ul.appendChild(li); }); wait.appendChild(ul);
        return;
      }
      fetch(top.u, { credentials: "same-origin" }).then(function (r) { return r.text(); }).then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        var art = doc.querySelector("article.fault"), v = doc.querySelector(".verdict strong");
        var kb = /^kennisbank-/.test(top.u), cause = kb ? doc.querySelector(".lead") : art && art.querySelector("p"), steps = art && !kb ? Array.prototype.slice.call(art.querySelectorAll("ol li"), 0, 5) : [];
        var src = doc.querySelector("ul.sources a");
        wait.textContent = "";
        wait.appendChild(el("p", "chat-title", (top.c ? top.c + " – " : "") + top.t + " (" + top.s + ")"));
        if (v) wait.appendChild(el("p", "chat-verdict", v.textContent));
        if (cause) wait.appendChild(el("p", null, cause.textContent));
        if (steps.length) { wait.appendChild(el("p", "chat-sub", "Wat kun je zelf doen?")); var ol = el("ol"); steps.forEach(function (s) { ol.appendChild(el("li", null, s.textContent)); }); wait.appendChild(ol); }
        var more = el("p"); more.appendChild(link(top.u, "Lees de hele uitleg →")); wait.appendChild(more);
        if (src) wait.appendChild(el("p", "chat-src", "Bron: " + src.textContent));
        others(wait);
      }).catch(function () { wait.textContent = ""; var p = el("p"); p.appendChild(document.createTextNode("Ik vond: ")); p.appendChild(link(top.u, top.t)); wait.appendChild(p); others(wait); });
    }).catch(function () { wait.textContent = "Het zoeken lukt nu niet. Controleer je internetverbinding en probeer het opnieuw."; });
  };
  var build = function () {
    panel = el("div", "chat-panel"); panel.setAttribute("role", "dialog"); panel.setAttribute("aria-label", "Zoekassistent");
    var head = el("div", "chat-head"); head.appendChild(el("strong", null, "Zoekassistent"));
    var x = el("button", "chat-x", "×"); x.type = "button"; x.setAttribute("aria-label", "Sluiten"); x.addEventListener("click", function () { toggle(false); }); head.appendChild(x);
    log = el("div", "chat-log"); log.setAttribute("aria-live", "polite");
    var form = el("form", "chat-form"); input = el("input"); input.type = "text"; input.placeholder = "Bijv. Bosch wasmachine E18"; input.setAttribute("aria-label", "Je vraag"); input.autocomplete = "off";
    var send = el("button", null, "Vraag"); send.type = "submit"; form.appendChild(input); form.appendChild(send);
    form.addEventListener("submit", function (e) { e.preventDefault(); var v = input.value.trim(); if (!v) return; add("me", v); input.value = ""; answer(v); });
    panel.appendChild(head); panel.appendChild(log); panel.appendChild(form);
    panel.appendChild(el("p", "chat-note", "Ik zoek alleen in de gebronde pagina's van Foutcodezoeker. Niets wordt opgeslagen of verstuurd."));
    document.body.appendChild(panel);
    add("bot", "Hoi! Wat is er aan de hand? Typ het merk, het apparaat en de foutcode of wat je ziet, bijvoorbeeld “Bosch wasmachine E18” of “rookmelder piept elke minuut”.");
    ensureIndex().catch(function () {});
  };
  var toggle = function (open) {
    if (open && !panel) build();
    if (!panel) return;
    panel.classList.toggle("open", open); fab.setAttribute("aria-expanded", String(open)); fab.classList.toggle("hide", open);
    if (open) setTimeout(function () { input.focus(); }, 50); else fab.focus();
  };
  fab.addEventListener("click", function () { toggle(true); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && panel && panel.classList.contains("open")) toggle(false); });
  document.body.appendChild(fab);

  // Home: snelzoek-chips en "alle apparaten"
  (function () {
    var qi = document.getElementById("q");
    document.querySelectorAll(".chips a[data-q]").forEach(function (a) {
      a.addEventListener("click", function (e) { if (!qi) return; e.preventDefault(); qi.value = a.getAttribute("data-q"); qi.dispatchEvent(new Event("input")); qi.focus(); });
    });
    var sb = document.getElementById("showcats"), g = document.querySelector(".cat-grid");
    if (sb && g) sb.addEventListener("click", function () { var o = g.classList.toggle("open"); sb.textContent = o ? "Minder tonen" : sb.getAttribute("data-t"); });
    if (sb) sb.setAttribute("data-t", sb.textContent);
  })();
})();
