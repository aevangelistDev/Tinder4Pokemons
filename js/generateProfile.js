/**
 * Author : Loic MGN
 * Date : 21.10.2022
 * Description : This generates a profile from the datas that are retrieved from the pokeapi and the tomabanane website
 */

/**
 * Function that generates a profile from some random datas from 2 different APIs
 * @returns the main promise with all the information necessary for a profile
 */
async function generateProfile(){
    //API URLs
    let pokeDataUrl = "https://pokeapi.co/api/v2/pokemon/" + getRandomInt(0, 904);
    let pokeDescriptionUrl ="https://pokeapi.co/api/v2/characteristic/" + getRandomInt(0,29);
    let nameUrl = "https://tomatebanane.ch/api/pokename/random";

    //PokemonDataPromise gets a random age, distance and the specie plus the image of a random Pokemon
    let pokemonDataPromise = await fetch(pokeDataUrl)
        .then(response => response.json())
        .then(data => {
            let profile = {
                age: getRandomInt(2, 19),
                distance: getRandomInt(1, 50),
                specie : data.name,
                img: data.sprites.other['official-artwork'].front_default
            };
            return profile
        });
    let pokemonDescriptionPromise = await fetch(pokeDescriptionUrl)
    .then(response => response.json())
    .then(data => {
        return data.descriptions[3].description;
    });
    //NamePromise get a random pokemon name from Mr. Zanardi's server tomatebanane.ch
    let namePromise = await fetch(nameUrl)
    .then(response => response.json())
    .then(data => {
        return data[0].name;
    });
    //MainPromise combines the three promises done before to form a profile object that is returned
    let mainPromise = Promise.all([pokemonDataPromise, pokemonDescriptionPromise, namePromise]).then((data) => {
        let profile = data[0];
        profile.description = data[1];
        profile.name = data[2];
        return profile;
    });
    return mainPromise;
}