/**
 * Author : Loic MGN
 * Date : 21.10.2022
 * Description : This page tries to make the service worker works
 */


// Install the service worker to manage the cache
self.addEventListener('install', evt => {
    console.log('Install evt', evt);
    const cachePromise = caches.open('Tinder4PokemonCache').then(cache => {
        return cache.addAll([
            '/',
            '/index.html',
            '/js/apiStorage.js',
            '/js/functions.js',
            '/js/generateProfile.js',
            '/js/indexedDB.js',
            '/js/serviceWorkerPWA.js'
        ])
    });

    evt.waitUntil(cachePromise);
    });
// Fetch the cache with the cache only + network fallback method
self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(res =>{
            console.log(res);
            if(res){
                return res;
            }
            return fetch(evt.request).then(newResponse => {
                caches.open('Tinder4PokemonCache').then(cache => cache.put(evt.request, newResponse));
                return newResponse.clone();
            })
        })
    )
})