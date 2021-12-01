// IIFE function to avoid accidentally accessing the global state
let pokemonRepository = (function () {
  let modalContainer = document.querySelector('#modal-container');
  let dialogPromiseReject; // This can be set later, by showDialog

  // empty array of pokemon, obtained from pokemon api
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //ensures pokemon is an object
  function add(pokemon) {
    if (typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    } else {
      document.write('not a pokemon')
    };
  }

  // obtains data from pokemon api to add names to array
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
  };

  // outputs requested details from api for specific pokemon
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon) // this?
      let modalTitle = document.querySelector('.modal-title');
      modalTitle.innerText = pokemon.name;

      let height = document.querySelector('.pokemon-height');
      height.innerText = 'Height: ${pokemon.height}';

      let img = document.querySelector('.pokemon-img');
      img.setAttribute('src', pokemon.imgURL);

      let typesArr = []
      let pokemonTypes = document.querySelector('.pokemon-types')
      pokemon.types.forEach(item => {
        let types = item.type.name
        typesArr.push(types)
      })

      let string = typesArr.join(' & ')
      pokemonTypes.innerText = 'Type(s): ${string}';
    })
  };
  
  // adds a new pokemon
  function addListItem(pokemon) {
  
    // creates <ul>
    let list = document.querySelector('.pokemon-list');
      
    // creates <li>
    let listItem = document.createElement('li');

    // adds class to list item
    listItem.classList.add('list-item');
  
    // creates <button>
    let button = document.createElement('button');

    // adds class to button
    button.classList.add('pokemon-button');

    // adds text to button
    button.innerText = pokemon.name;

    //establishes hierarchy of list elements
    listItem.appendChild(button);
    list.appendChild(listItem);

    // activates showDetails upon clicking button
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
    
    // ATTRIBUTES?

  }

  // returns all values in the pokemon array
  function getAll() {
    return pokemonList;
  }

  MODAL

  // shows modal only if button is clicked
  function showModal(title, text) {

    // clears all existing modal content
    modalContainer.innerHTML = '';

    // adds modal
    let modal = document.createElement('div');
    modal.classList.add('modal');

    // closes modal with close button
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');

    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }

// DIALOG
  function showDialog(title, text) {
    showModal(title, text);

    // Add a confirm and cancel button to the modal
    let modal = modalContainer.querySelector('.modal');

    let confirmButton = document.createElement('button');
    confirmButton.classList.add('modal-confirm');
    confirmButton.innerText = 'Confirm';

    let cancelButton = document.createElement('button');
    cancelButton.classList.add('modal-cancel');
    cancelButton.innerText = 'Cancel';

    modal.appendChild(confirmButton);
    modal.appendChild(cancelButton);

    // Focus the confirmButton so user can simply press Enter
    confirmButton.focus();
  
    // Return a promise that resolves when confirmed, else rejects
    return new Promise((resolve, reject) => {
      cancelButton.addEventListener('click', hideModal);
      confirmButton.addEventListener('click', () => {
        dialogPromiseReject = null; // Reset this
        hideModal();
        resolve();
      });

      // This can be used to reject from other functions
      dialogPromiseReject = reject;
    });
  }
  
  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
  });

  document.querySelector('#show-dialog').addEventListener('click', () => {
    showDialog('Confirm action', 'Are you sure you want to do this?').then(function () {
      alert('confirmed!');
    }, () => {
      alert('not confirmed');
    });
  });
  
  // close modal with esc key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  // close modal by clicking outside it
  modalContainer.addEventListener('click', (e) => {

    // targets only area OUTSIDE the modal
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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

// loop used to list all Pokemon on webpage

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon)
  });
});

