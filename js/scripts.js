// IIFE function to avoid accidentally accessing the global state
let pokemonRepository = (function () {

  //empty array of pokemon, obtained from pokemon api
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

  // outputs requested details from pokemon api to console
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  // obtains data from pokemon api to add names to array for app
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
    })
  }

  // obtains data from pokemon api to add details to array for app
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // shows modal only if button is clicked
  function showModal(title, text) {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = '';
    
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  };

  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
  });

  // instructions to close modal on cue
  function hideModal() {
    let modalContainer = document.querySelector('modal-container');
    modalContainer.classList.remove('is-visible');
  }

  // closes modal with 'close' button
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  // closes modal with 'esc' key
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  // closes modal when user clicks outside of it
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  function showDialog(title, text) {
    showModal(title, text);

    // defines modalContainer
    let modalContainer = document.querySelector('#modal-container');

    // adds confirm and cancel button to modal
    let modal = modalContainer.querySelector('.modal');
    
    let confirmButton = document.createElement('button');
    confirmButton.classList.add('modal-confirm');
    confirmButton.innerText = 'Confirm';

    let cancelButton = document.createElement('button');
    cancelButton.classList.add('modal-cancel');
    cancelButton.innerText = 'Cancel';

    modal.appendChild(confirmButton);
    modal.appendChild(cancelButton);

    // focus the confirmButton so user can simply press 'Enter'
    confirmButton.focus();
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
    hideModal: hideModal,
    showDialog: showDialog
  };
}) ();

//loop used to list all Pokemon on webpage

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon)
  });
});
