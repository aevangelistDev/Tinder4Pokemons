/**
 * Author : Loic MGN
 * Date : 21.10.2022
 * Description : This pages contains multiple functions that I couldn't categorize elsewhere
 */


/**
 * Generate a random int between two given values
 * @param min
 * @param max
 * @returns {number}
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

/**
 * Check for the service worker registration, logs an error if failed
 */
function checkServiceWorker() {

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/serviceWorkerPWA.js').then(function (registration) {
                //Registration was successful
                console.log('ServiceWorker registration successful with scope', registration.scope);
            }, function (err) {
                //Registration failed
                console.log('ServiceWorker registration failed', err);
            });
        })
    }
}

/**
 * Initialize the application
 */
function initialize()
{
    checkServiceWorker();
}