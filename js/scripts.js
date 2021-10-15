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
    function getAll() {
      return pokemonList;
    }
    return {
      add: add,
      getAll: getAll
    };
}) ();

//loop used to list all Pokemon and their heights on webpage
pokemonRepository.getAll().forEach(function(pokemon) {
  if (pokemon.height >= 0.7) {
  document.write(pokemon.name + '- Height: ' + pokemon.height + ' <--Wow, that\s big!' + '<br>')
  }
  else document.write(pokemon.name + '-Height: ' + pokemon.height + '<br>')
})
