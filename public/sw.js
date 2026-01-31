const CACHE_NAME = "little-buddha-v1";
const PRECACHE = [
  "/",
  "/today",
  "/manifest.json",
  "/window.svg",
  "/next.svg",
  "/favicon.ico",
  // audio files are loaded lazily by the UI — don't precache missing files in dev
];

self.addEventListener("install", (event) => {
  // Robust precache: attempt to fetch-and-cache each resource but don't fail install if some are missing.
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await Promise.allSettled(
        PRECACHE.map(async (url) => {
          try {
            const res = await fetch(url, { cache: "no-store" });
            if (res.ok) {
              await cache.put(url, res.clone());
            }
          } catch (e) {
            // ignore individual failures to keep install resilient
          }
        })
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Prefer cache, then network. Keep simple and privacy minded.
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((res) => {
          // only cache GET same-origin requests
          if (
            event.request.method === "GET" &&
            new URL(event.request.url).origin === location.origin
          ) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return res;
        })
        .catch(() => caches.match("/"));
    })
  );
});
