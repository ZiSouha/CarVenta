const CACHE_NAME = 'carventa-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/favicon.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Skip custom schemes like chrome-extension://
    if (!url.protocol.startsWith('http')) {
        return;
    }

    // Skip Socket.io and other API requests from cache logic
    if (url.pathname.includes('socket.io') || url.pathname.startsWith('/api')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request).catch(err => {
                    // Start robust error handling for fetch failures
                    console.log("Fetch failed for:", event.request.url);
                    // Optionally return a fallback or simply let it fail if it's an API call
                });
            })
    );
});
