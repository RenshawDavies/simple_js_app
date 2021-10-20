// IIFE function to avoid accidentally accessing the global state
let pokemonRepository = (function () {

  //array of Pokemon names, height, color, and types
  let pokemonList = [
    { name: 'Bulbasaur', 
      height: 0.7, 
      color: 'green', 
      types: ['grass', 'poison']},
    { name: 'Charmander', 
      height: 0.6, 
      color: 'orange', 
      types: ['fire']},
    { name: 'Squirtle', 
      height: 0.5, 
      color: 'blue', 
      types: ['water']},
    { name: 'Pikachu', 
      height: 0.4, 
      color: 'yellow', 
      types: ['electric']},
    { name: 'Jigglypuff', 
      height: 0.5, 
      color: 'pink', 
      types: ['fairy', 'normal']},
    { name: 'Diglett', 
      height: 0.2, 
      color: 'brown', 
      types: ['ground']},
  ];

  // adds to pokedex
  function add(pokemon) {
    if (typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    }
  }
  
  // returns all values in the pokemon array
  function getAll() {
    return pokemonList;
  }
  
  // adds a new pokemon
  function addListItem(pokemon) {

    // creates <ul>
    let list = document.querySelector('.pokemon-list');

    // creates <li>
    let listItem = document.createElement('li');

    // creates <button>
    let button = document.createElement('button');
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    })

    // adds text to button
    console.log(button.innerText);
    button.innerText = pokemon.name;
    console.log(button.innerText);

    // adds class to button
    button.classList.add('pokemon-button');

    // establishes hierarchy of list elements
    listItem.appendChild(button);
    list.appendChild(listItem);  
  }

  function showDetails(pokemon) {
    console.log(pokemon)
  }

  // functions that can access the IIFE
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  };
}) ();

//loop used to list all Pokemon on webpage

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon)
})
  
