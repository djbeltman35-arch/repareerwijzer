# Repareerwijzer

Statische site met foutcodes, storingen en onderhoud per merk en model.

- Inhoud staat in `data.js`. Voeg een model of foutcode toe en de pagina's worden automatisch gemaakt.
- Bouwen: `node build.js` (geen packages nodig). Uitvoer in `dist/`.
- Netlify: koppel de GitHub-repo; `netlify.toml` regelt build en publish-map.
- Eigen domein? Pas `SITE_URL` aan in `netlify.toml` (voor sitemap en canonical links).
- Na livegang: dien `sitemap.xml` in bij Google Search Console.
