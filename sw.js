/* Service worker: guarda la app para que funcione sin conexión */
const C = "vencimientos-v2",
  F = [
    "./",
    "index.html",
    "manifest.webmanifest",
    "assets/icon.svg",
    "css/variables.css",
    "css/base.css",
    "css/components.css",
    "css/modals.css",
    "css/print.css",
    "js/config.js",
    "js/state.js",
    "js/utils.js",
    "js/models.js",
    "js/scanner.js",
    "js/views/modal.js",
    "js/views/clientes.js",
    "js/views/home.js",
    "js/views/aviso.js",
    "js/views/form.js",
    "js/views/detalle.js",
    "js/views/reporte.js",
    "js/views/respaldo.js",
    "js/demo.js",
    "js/app.js",
  ];
self.addEventListener("install", (e) =>
  e.waitUntil(
    caches
      .open(C)
      .then((c) => c.addAll(F))
      .then(() => self.skipWaiting()),
  ),
);
self.addEventListener("activate", (e) =>
  e.waitUntil(
    caches
      .keys()
      .then((k) => Promise.all(k.filter((x) => x !== C).map((x) => caches.delete(x))))
      .then(() => self.clients.claim()),
  ),
);
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
