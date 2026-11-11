/* Foutcodezoeker service worker: werkt ook zonder internet voor pagina's die je al hebt bekeken */
const V = "fcz-v6";
const CORE = ["/", "/style.css", "/app.js", "/eerste-hulp-bij-storingen.html", "/knipperende-lampjes.html", "/favicon.svg", "/icon-192.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  e.respondWith(fetch(r).then(res => { if (res.ok) { const copy = res.clone(); caches.open(V).then(c => c.put(r, copy)); } return res; })
    .catch(() => caches.match(r).then(m => m || (r.mode === "navigate" ? caches.match("/") : undefined))));
});
