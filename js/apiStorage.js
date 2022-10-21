/**
 * Author : Loic MGN
 * Date : 21.10.2022
 * Description : This page manages the storage to the remote API storing the profiles and fetching a list of every profile
 */


/**
 * This function ask for every profiles stocked oon the API storage
 * @param apiUrl
 * @returns a promise containing the object of every profile from the API storage
 */
async function getProfilesFromAPI(apiUrl = "https://63446f8cdcae733e8fdf4f28.mockapi.io")
{
    let profileFromApi = await fetch(apiUrl).then(resource => resource.json())

    return profileFromApi;
}

/**
 * This one sends a new profile to the API storage
 * @param name
 * @param age
 * @param distance
 * @param description
 * @param image
 * @param liked
 * @param favorited
 * @param apiURL
 */
function sendProfileToAPI(name, age, distance, description, image, liked, favorited, apiURL ="https://63446f8cdcae733e8fdf4f28.mockapi.io")
{
    let profileToApi = new URLSearchParams({
        'name' : name,
        'age' : age,
        'distance' : distance,
        'description' : description,
        'image' : image,
        'liked' : liked,
        'favorited' : favorited
    });

    fetch(apiUrl, {method: "POST", body: profileToApi});
}