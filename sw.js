// Shekinah Admin service worker: makes the dashboard installable. Member data is never stored on the device.
const VERSION = "snl-admin-v1";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim())));
const OFFLINE = `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Offline</title>
<body style="font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:90vh;margin:0;background:#fff;color:#141414;text-align:center;padding:20px">
<div><h1 style="font-weight:600">You're offline</h1><p>The admin dashboard needs an internet connection.</p><button onclick="location.reload()" style="font:inherit;padding:10px 18px;border-radius:10px;border:0;background:#FFDF2C;font-weight:700">Try again</button></div></body>`;
self.addEventListener("fetch", (e) => {
  if (e.request.mode !== "navigate") return;
  e.respondWith(fetch(e.request).catch(() => new Response(OFFLINE, { headers: { "Content-Type": "text/html; charset=utf-8" } })));
});
