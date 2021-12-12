// IIFE function to avoid accidentally accessing the global state
let pokemonRepository = (function () {

  // empty array of pokemon, obtained from pokemon api
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // returns all values in the pokemon array via forEach loop
  function getAll() {
    return pokemonList;
  }

  //ensures pokemon is an object
  function add(pokemon) {
    if (typeof pokemon === 'object') {
      return pokemonList.push(pokemon);
    } else {
      console.log('not a pokemon')
    };
  }

  // adds a new pokemon
  function addListItem(pokemon) {
  
    // creates <ul>
    let list = document.querySelector('.pokemon-list', '.list-group');
      
    // creates <li>
    let listItem = document.createElement('li');

    // creates <button>
    let button = document.createElement('button', 'btn', 'btn-primary');

    // adds class to list item
    listItem.classList.add('list-item', 'group-list-item');
  
    // adds class to button
    button.classList.add('pokemon-button', 'btn', 'btn-primary');

    // adds text to button
    button.innerText = pokemon.name;

    button.setAttribute("data-target", "#exampleModal");
    button.setAttribute("data-toggle", "modal");
    button.classList.add(pokemon.name);

    //establishes hierarchy of list elements
    listItem.appendChild(button);
    list.appendChild(listItem);

    // activates showDetails upon clicking button
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

  // obtains data from pokemon api
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  };

  // add details to array from api data
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.name = details.name;
      item.imgUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
    }).catch(function (e) {
      console.error(e);
    })
  };

  // outputs requested details from api for specific pokemon
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {  
      showModal(pokemon);
    }) 
  }; 

  // MODAL

  let modalContainer = document.querySelector('#exampleModal');

  // shows modal only if button is clicked
  function showModal(pokemon) {

    // clears all existing modal content
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    modalBody.empty();
    modalTitle.empty();

    // adds name as heading in modal
    let nameElement = $("<h1>" + "Hi, I\'m " + pokemon.name + "!" + "</h1>");

    // adds pokemon image to modal
    let imageElement = $("<img class='modal-image' style='width:30%'>");
    imageElement.attr("src", pokemon.imgUrl);

    // adds pokemon height to modal
    let heightElement = $("<p>" + "Height: " + pokemon.height + " m" + "</p>");

    // adds pokemon weight to modal
    let weightElement = $("<p>" + "Weight: " + pokemon.weight + " kg" + "</p>");

    // establishes hierachy of modal elements
    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);

    function hideModal() {
      modalContainer.classList.remove('is-visible');
    }

  // functions that can access the IIFE
  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal
  };
}) ();

// loop used to list all Pokemon on webpage

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon)
  });
});
