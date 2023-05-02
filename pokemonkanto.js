
// function created to fetch the pokemon API and use its data
function fetchKantoPokemon() {
   fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
   .then(response => response.json())
   .then(function (allpokemon) {

    allpokemon.results.forEach(function(pokemon){
      fetchPokemonData(pokemon);  
    })
 
   })
       
  
}

//function used to fetch pokemon's data by accessing their url
function fetchPokemonData(pokemon) {
    //creating a variable and setting it to the pokemon's url
    let url = pokemon.url;

    fetch(url)
    .then(response => response.json())
    .then(function(pokeData) {
       renderPokemon(pokeData)
      
})


}


//fuction using JavaScript to generate elements through data collected from the pokemon API
function renderPokemon(pokeData) {
let allPokemonContainers = document.getElementById('pokemon-container');
//new divs for each seperate pokemon is stored in this variable
let pokemonContainer = document.createElement('div')

createPokemonImage(pokeData.id, pokemonContainer);
let pokeName = document.createElement('h3');
pokeName.innerText = pokeData.name;
let pokeNumber = document.createElement('p')
pokeNumber.innerText = `#${pokeData.id}`
let pokeType = document.createElement('ul')

createTypes (pokeData.types, pokeType)

pokemonContainer.append(pokeName. pokeNumber, pokeType);

allPokemonContainers.appendChild(pokemonContainer);
}

function createTypes(types, ul) {
    types.forEach(function(type) {
        let typeList = document.createElement('li');
        typeList.innerText = type['type']['name'];
        ul.append(typeList);
    })
}

function createPokemonImage(pokeID, containerDiv) {
    let pokeImage = document.createElement('img')
    pokeImage.srcset = `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`
    containerDiv.append(pokeImage)
}


