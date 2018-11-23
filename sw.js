self.addEventListener("install", ()=> null);

const currentId = 'LeoApp'	+ '-' + 2.5;

const urls = [				
    '/',
    '/criar',
    '/bebida',
    '/fruta',
    '/pronto',
    '/taca',
    '/static/js/bundle.js',
    '/favicon.ico',
    '/meu.css',
    '/jquery-1.11.1.min.js',
    '/jquery.mobile-1.4.4.min.js',
    '/manifest.json',
    '/static/js/1.3e1dd758.chunk.js',
    '/static/js/main.4a033f8a.chunk.js',
    '/static/js/runtime~main.229c360f.js',
    '/img/absolute_vodla.jpg',
    '/img/cachaca_velho.jpg',
    '/img/sakeik_sake.jpg',
    '/img/smirnoff_vodka.jpg',
    '/img/direita.jpg',
    '/img/esquerda.jpg',
    '/img/abacaxi.jpg',
    '/img/kiwi.jpg',
    '/img/limao.jpg',
    '/img/maracuja.jpg',
    '/img/morango.jpg',
    '/img/taca1.jpg',
    '/img/taca2.jpg',
    '/img/taca3.jpg'
];

function activateServiceWorker() {
    caches.open(currentId)
        .then(cache	=>	{
            cache.addAll(urls)
    })
}

self.addEventListener("activate", activateServiceWorker);

async function fetchApplication(req){
    const cache = await caches.open(currentId)
    try {
        const res = await fetch(req)
        await cache.put(req, res.clone())
        return res
    } catch(err) {
        return await caches.match(req) || await cache.match(req)
    }
}

self.addEventListener("fetch",	async event => {
    event.respondWith(fetchApplication(event.request).then(e=> e))
});