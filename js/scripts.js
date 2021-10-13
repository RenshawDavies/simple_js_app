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

//loop used to list all Pokemon and their heights on webpage
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height >= 0.7) {
    console.log(document.write(<ul> {
      <li>`${pokemonList[i].name} - Height: ${pokemonList[i].height} Wow, that's big!`</li>
    }
    </ul>));
  }
  else { 
    console.log(document.write(<ul> {
      <li>`${pokemonList[i].name} - Height: ${pokemonList[i].height}`
      </li>
      }
    </ul>));
  }
}