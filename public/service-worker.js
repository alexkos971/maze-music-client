const staticCacheName = 's-app-v1';
const assetUrls = [
    "%PUBLIC_URL%/index.html"
]

self.addEventListener("install", async (event) => {
    const cache = await caches.open(staticCacheName)
    await cache.addAll(assetUrls)
})

self.addEventListener("activate", () => {
    console.log('act')
})

self.addEventListener("fetch", (event) => {
    console.log(event.request.url);

    event.respondWith(cacheFisrt(event.request));
});

async function cacheFisrt (request) {
    const cached = await caches.match(request);
    return cached ?? await fetch(request) 
}

