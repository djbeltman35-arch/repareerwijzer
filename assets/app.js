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
  if (q && res) {
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
      var tokens = words(text);
      if (!tokens.length) return [];
      var brandTok = tokens.filter(function (t) { return TYPE[t]; });
      var device = null;
      tokens.forEach(function (t) {
        if (!/[a-z]/.test(t) || !/[0-9]/.test(t) || t.length < 4) return;
        brandTok.forEach(function (b) { TYPE[b].forEach(function (p) { if (!device && t.indexOf(p[0]) === 0) device = p[1]; }); });
      });
      var data = window.SEARCH || [], hits = [];
      for (var i = 0; i < data.length; i++) {
        var d = data[i], hay = " " + words(d.k).join(" ") + " ", score = 0, matched = 0, codeHit = false;
        var parts = d.c ? d.c.split("/").map(norm) : [];
        for (var j = 0; j < tokens.length; j++) {
          var v = tokens[j];
          if (parts.indexOf(v) > -1) { score += 10; matched++; codeHit = true; }
          else if (/[0-9]/.test(v) && parts.some(function (p) { return p.indexOf(v) === 0; })) { score += 5; matched++; codeHit = true; }
          else if (hay.indexOf(" " + v + " ") > -1) { score += 3; matched++; }
          else if (v.length > 2 && hay.indexOf(v) > -1) { score += 1; matched++; }
        }
        if (device && d.a === device) score += 4;
        if (device && d.a && d.a !== device) score -= 4;
        var looksLikeCode = tokens.some(function (t) { return /[0-9]/.test(t) && t.length <= 5; });
        if (looksLikeCode && d.c && !codeHit) continue;
        if (matched && score > 0) hits.push([score, d]);
      }
      return hits.sort(function (a, b) { return b[0] - a[0]; });
    };
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
    $("cat").addEventListener("change", function () { var l = LIFE[$("cat").value]; $("life").value = l[0]; $("nieuw").value = l[1]; run2(); });
    ["age", "life", "nieuw", "rep"].forEach(function (i) { $(i).addEventListener("input", run2); });
    calc.addEventListener("submit", function (e) { e.preventDefault(); });
    var l0 = LIFE[$("cat").value]; $("life").value = l0[0]; $("nieuw").value = l0[1];
    run2();
  }
})();
