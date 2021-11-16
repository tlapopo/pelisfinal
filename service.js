const _CACHE_NAME = "cache";

self.addEventListener("install", (event) => {
    console.log("INSTALL");
    const _FILES = ["index.html","./assets/css/style.css", "./assets/js/app.js"];

    const _APP_SHELL = caches
    .open(_CACHE_NAME)
    .then((cache) => cache.addAll(_FILES));

    event.waitUntil(_APP_SHELL);
    self.skipWaiting();
})

self.addEventListener("activate", (event) => {
    console.log("ACTIVATE");

    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if(!_CACHE_NAME.includes(key)){
                    return caches.delete(key);
                }
            })
        ))
    );
});


//CACHE ONLY
/*self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request));
})*/

//Network Only

/*self.addEventListener('fetch', event => {
    event.respondWith(fetch(event.request));
});*/


//CACHE FIRST

/*self.addEventListener('fetch', (fetchEvent) => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then((res) => {
            return res || fetch(fetchEvent.request)
            .catch((error)=> console.log("Error al realizar la peticion"));
        })
    );
});*/


//NETWORK FIRTS

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).then(networkResponse => {
            return networkResponse || caches.match(event.request)
        })
    );
});

