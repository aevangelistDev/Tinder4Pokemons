/**
 * Author : Loic MGN
 * Date : 21.10.2022
 * Description : This page manages the indexedDB, it uploads a new profile to the local storage or fetch a specific profile from it
 */


/**
 * Get a profile from the indexed db
 * @param id
 * @param name
 * @param age
 * @param distance
 * @param description
 * @param image
 * @param liked
 * @param favorited
 * @returns {Promise<unknown>}
 */
async function getProfile(id, name, age, distance, description, image, liked, favorited) {
    return new Promise((resolve, reject) => {
        let request = indexedDB.open("Tinder4PokemonsDB", 1);
        request.onupgradeneeded = () => {
            let db = request.result;
            const store = db.createObjectStore("ProfilesList", { keyPath: "id" });
            store.put({ id: id, name: name, age: age, distance: distance, description: description, image:image, liked: liked, favorited: favorited });
        };
        request.onsuccess = () => {
            let db = request.result;
            let tx = db.transaction("ProfilesList", "readwrite");
            let store = tx.objectStore("ProfilesList");
            let value = store.get(id);
            value.onsuccess = () => {
                if (value.result !== undefined) {
                    resolve(value.result);
                } else {
                    reject("impossible to find");
                }
            };
        };
    });
}

/**
 * Save a profile inside the indexed db
 * @param object
 * @param liked
 * @param favorited
 * @returns {Promise<unknown>}
 */
function saveProfile(object, liked, favorited) {
    return new Promise(function (resolve, reject) {
        if (object.id === undefined) reject(Error("object has no id."));
        let request = indexedDB.open("Tinder4PokemonsDB", 1);

        request.onerror = function (event) {
            reject(Error("IndexedDB database error"));
        };

        request.onupgradeneeded = function (event) {
            let db = request.result;
            let tx = db.transaction("ProfilesList", "readwrite");
            let store = tx.objectStore("ProfilesList");
            store.put({ id: object.id, name: object.name, age: object.age, distance: object.distance, description: object.description, image:object.image, liked: liked, favorited:favorited});
        };

        request.onsuccess = function (event) {
            let db = request.result;
            let tx = db.transaction("ProfilesList", "readwrite");
            let store = tx.objectStore("ProfilesList");
            let value = store.put(object);

            value.onerror = function (event) {
                reject(Error("Error text"));
            };

            value.onsuccess = function (event) {
                resolve("Data saved OK");
            };
        };
    });
}