
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
//new divs for each seperate pokemon is stored in this variable
let pokemonCard = document.createElement('div')
pokemonCardsArray.push(pokemonCard)
console.log(pokemonCardsArray)
pokemonCard.className = 'pokemon-card'

let pokeType = document.createElement('ul')
let pokeNumber = document.createElement('p')
let pokeName = document.createElement('h4');
let modal = document.getElementById("myModal");


//using functions to change the first letter of the pokemons name to uppercase and add it to the 'sliced' version of the same pokemon name
pokeName.innerText = pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1);

pokeNumber.innerText = `#${pokeData.id}`

createPokemonImage(pokeData.id, pokemonCard);
createTypes(pokeData.types, pokeType)

pokemonCard.append(pokeName, pokeNumber, pokeType);

allPokemonContainers.appendChild(pokemonCard);



//for loop to iterate through every pokemon and create modals whenever the pokemon card is clicked
for (var i = 0; i < pokemonCardsArray.length; i++) {
    pokemonCardsArray[i].addEventListener('click', function onclick() {
        console.log ("hello")
        pokemonModal()
        modal.style.display = "block";
    })
}
  // When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }

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


// Get the modal
function pokemonModal(pokemon) {
    

    var span = document.getElementsByClassName("close")[0];


    // When the user clicks on the button, open the modal

  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  

  
  }
}










fetchKantoPokemon()
