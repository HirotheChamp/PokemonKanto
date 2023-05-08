
// function created to fetch the pokemon API and use its data
async function fetchKantoPokemon() {
   await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
   .then(response => response.json())
   .then ( allpokemon => {

    return Promise.all(allpokemon.results.map( pokemon => {
      fetchPokemonData(pokemon);  
     
    }))
  
   })
      //allows for the pokemon to be displayed in order according to pokedex number 
  
}

//function used to fetch pokemon's data by accessing their url
async function fetchPokemonData(pokemon) {
    //creating a variable and setting it to the pokemon's url
    let url = pokemon.url;

    await fetch(url)
    .then(response => response.json())
    .then(pokeData => {
      renderPokemon(pokeData)
      
})


}


//fuction using JavaScript to generate elements through data collected from the pokemon API
async function renderPokemon(pokeData) {
let allPokemonContainers = document.getElementById('pokemon-container');
let pokemonCardsArray = []


let pokeType = document.createElement('ul')
let pokeNumber = document.createElement('p')
let pokeName = document.createElement('h4');
let modal = document.createElement("div");
let modalContent = document.createElement("div")
let span = document.createElement("span")
//new divs for each seperate pokemon is stored in this variable
let pokemonCard = document.createElement('div')
let pokeNumber2 = pokeNumber.cloneNode(true)
modal.className = 'pokemon-modal'
pokemonCard.className = 'pokemon-card'
modalContent.className = 'modal-content'
span.className = 'close'

//using functions to change the first letter of the pokemons name to uppercase and add it to the 'sliced' version of the same pokemon name
pokeName.innerText = pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1);
span.innerText = "X"
pokeNumber.innerText = `#${pokeData.id}`

createPokemonImage(pokeData.id, pokemonCard);
createPokemonImage(pokeData.id, modalContent);
createPokemonDescription(pokeData.flavor_text, modalContent);
createTypes(pokeData.types, pokeType)



pokemonCard.append(pokeName, pokeNumber, pokeType, modal);
modal.append(
  // span,
   modalContent )
modalContent.appendChild(pokeName.cloneNode(true))

pokemonCardsArray.push(pokemonCard)
console.log(pokemonCardsArray)


allPokemonContainers.appendChild(pokemonCard);



//for loop to iterate through every pokemon and create modals whenever the pokemon card is clicked
for (var i = 0; i < pokemonCardsArray.length; i++) {
    pokemonCardsArray[i].addEventListener('click', function() {
        console.log (pokeData.id)
    
        modal.style.display = "block";
//         let span = document.getElementsByClassName("close")[0];
// span.onclick = function() {
//   modal.style.display = "none";
// }
  // When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }

}
        
    })
   
}



function createTypes(types, ul) {
    types.forEach(function(type) {
        let typeList = document.createElement('li');
        
        typeList.innerText = type['type']['name'].toUpperCase();
        typeList.className = `${type['type']['name']}`
        ul.append(typeList);
    })
}

function createPokemonImage(pokeID, containerDiv) {
    let pokeImgContainer = document.createElement('div')
    let pokeImage = document.createElement('img')
 pokeImage.className = 'image'

   
    pokeImage.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png`
    containerDiv.append(pokeImage)
    containerDiv.append(pokeImgContainer);

}


function createPokemonDescription(pokeID, containerDiv) {
  let pokeDescContainer = document.createElement('div')
  let pokeDescription = document.createElement('p')
pokeDescription.className = 'pokemon-description'


// pokeDescription.innerText = pokeID['flavor_text']

 
  // pokeDescription.srcset = `https://pokeapi.co/api/v2/pokemon/${pokeID}`
  containerDiv.append(pokeDescription)
  containerDiv.append(pokeDescContainer);

}



}










fetchKantoPokemon()
