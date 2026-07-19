const CACHE_VERSION = "embedvision-cache-v4";
const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/media/hero-poster.png",
  "/media/hero-cyberpunk-wallpaper-1080p.webm",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

function shouldCache(request) {
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return false;
  }

  return (
    url.pathname === "/" ||
    url.pathname.endsWith(".html") ||
    url.pathname.startsWith("/assets/") ||
    url.pathname.startsWith("/media/optimized/") ||
    url.pathname === "/media/hero-poster.png" ||
    url.pathname === "/media/hero-cyberpunk-wallpaper-1080p.webm"
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (!shouldCache(request) || request.headers.has("range")) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    }),
  );
});
