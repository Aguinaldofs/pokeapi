var changebutton = false;

const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;
const generatePokemonPromises = () =>
  Array(150)
    .fill()
    .map((_, index) =>
      fetch(getPokemonUrl(index + 1)).then((response) => response.json())
    );

const generateHTML = (pokemons) => {
  return pokemons.reduce(
    (accumulator, { name, id, types, height, abilities, stats, weight }) => {
      const elementTypes = types.map((typeInfo) => typeInfo.type.name);
      const showTypes = types.map((typeInfo) => typeInfo.type.name).join("  ");
      const elementAbilities = abilities
        .map((abilitieInfo) => abilitieInfo.ability.name)
        .join(" | ");
      const pokemonId = ("000" + id).substr(-3);

      accumulator += `
    <li onclick="expandPokemonInfo(this)" class="card ${elementTypes[0]}">
      <img class="pokeball-background" alt="pokeball-background" src="./svg/Pokeball.svg"/>
      <img class="card-image alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"</img>
        <h2 class="card-title">${name}</h2>
        <h6 id="description-pokemon"></h6>
        <h4 class="pokemon-id" id="${elementTypes[0]}"">#${id}</h4>
        <div id="extraInfo" style="display:none" class="card-subtitle">
        <h3 class"type-poke">${showTypes}</h3>
        <div class="pokemon-info-grid">
        <div class="grid-info-size">
        <h5><img src="./svg/Height.svg" />${weight / 10}kg</h5>
        <h6>Height</h6>
        </div>
        <div class="grid-info-size">
        <h5><img src="./svg/Weight.svg" />${height / 10} m</h5>
        <h6>Weight</h6>
        </div>
        <div class="grid-info-size">
        <h5>${elementAbilities}</h5>
        <h6>Moves</h6>
        </div>
        </div>
        <button id="leftNavigator" onclick="leftNavigator(${id})"><</button>
        <button class="card-back-initial" onclick="history.go(0);">Voltar</button>
        <button id="rightNavigator" class="right-selector" onclick="rightNavigator(${id})">></button>
        <div class="pokemon-stats-progress">
        <label for="hp">HP ${stats[0].base_stat}</label>
        <progress id="hp" value="${stats[0].base_stat}" max="100"></progress>
        </div>
        <div class="pokemon-stats-progress">
        <label for="atk">ATK ${stats[1].base_stat}</label>
        <progress id="atk" value="${stats[1].base_stat}" max="100"></progress>
        </div>
        <div class="pokemon-stats-progress">
        <label for="def">DEF ${stats[2].base_stat}</label>
        <progress id="def" value="${stats[2].base_stat}" max="100"></progress>
        </div>
        <div class="pokemon-stats-progress">
        <label for="satk">SATK ${stats[3].base_stat}</label>
        <progress id="satk" value="${stats[3].base_stat}" max="100"></progress>
        </div>
        <div class="pokemon-stats-progress">
        <label for="sdef">SDEF ${stats[4].base_stat}</label>
        <progress id="sdef" value="${stats[4].base_stat}" max="100"></progress>
        </div>
        <div class="pokemon-stats-progress">
        <label for="spd">SPD ${stats[5].base_stat}</label>
        <progress id="spd" value="${stats[5].base_stat}" max="100"></progress>
        </div>
        </div>
      </li>
    `;
      return accumulator;
    },
    ""
  );
};

const insertPokemonsIntoPage = (pokemons) => {
  const ul = document.querySelector('[data-js="pokedex"]');
  ul.innerHTML = pokemons;
};

function getPokemonDescription(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then((response) => response.json())
    .then((pokemon) => {
      console.log(pokemon);
      const description = pokemon.flavor_text_entries.find(
        (flavor) => flavor.version.name === "firered"
      ).flavor_text;
      document.getElementById("description-pokemon").innerHTML = description;
    });
}

function search_pokemon() {
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  let x = document.getElementsByTagName("li");

  for (i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      x[i].style.display = "none";
    } else {
      x[i].style.display = "list-item";
    }
  }
}

function enableStylesheet(node) {
  node.rel = "stylesheet";
}

function expandPokemonInfo(name) {
  let pokemonName = name.querySelector(".card-title").innerHTML;
  let pokemonType = name.querySelector(".pokemon-id").id;

  let x = document.getElementsByTagName("li");

  for (i = 0; i < x.length; i++) {
    if (x[i].querySelector(".card-title").innerHTML != pokemonName) {
      x[i].style.display = "none";
    } else {
      x[i].style.display = "block";
      changeCSS("selected.css", 0);
      x[i].onclick = null;
      x[i].getElementsByTagName("div")[0].style.display = "block";
      document.getElementById("main-header").style.display = "none";
      document.body.className = pokemonType;
    }
  }
}

function changeCSS(cssFile, cssLinkIndex) {
  var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

  var newlink = document.createElement("link");
  newlink.setAttribute("rel", "stylesheet");
  newlink.setAttribute("type", "text/css");
  newlink.setAttribute("href", cssFile);

  document
    .getElementsByTagName("head")
    .item(cssLinkIndex)
    .replaceChild(newlink, oldlink);
}

function rightNavigator(id) {
  if (id == 150) {
    id = 0;
  }
  let x = document.getElementsByTagName("li");
  let nextId = id + 1;
  for (i = 0; i < x.length; i++) {
    if (x[i].querySelector(".pokemon-id").innerHTML != "#" + nextId) {
      x[i].style.display = "none";
    } else {
      x[i].style.display = "list-item";
      x[i].getElementsByTagName("div")[0].style.display = "block";
      document.getElementById("main-header").style.display = "none";
      pokemonType = x[i].querySelector(".pokemon-id").id;
      console.log(pokemonType);
      document.body.className = pokemonType;
    }
  }
}
/* loading animation while doing something */
function loading() {
  document.getElementById("loading").style.display = "block";
  setTimeout(function () {
    document.getElementById("loading").style.display = "none";
  }, 1000);
}

function leftNavigator(id) {
  if (id == 1) {
    id = 151;
  }
  let x = document.getElementsByTagName("li");
  let nextId = id - 1;
  for (i = 0; i < x.length; i++) {
    if (x[i].querySelector(".pokemon-id").innerHTML != "#" + nextId) {
      x[i].style.display = "none";
    } else {
      x[i].style.display = "list-item";
      x[i].getElementsByTagName("div")[0].style.display = "block";
      document.getElementById("main-header").style.display = "none";
      document.body.className = pokemonType;
    }
  }
}

sortByName = () => {
  if (changebutton == true) {
    changebutton = false;
    let list, i, switching, b, shouldSwitch;
    list = document.querySelector('[data-js="pokedex"]');
    switching = true;
    while (switching) {
      switching = false;
      b = list.getElementsByTagName("li");
      for (i = 0; i < b.length - 1; i++) {
        shouldSwitch = false;
        if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
      }
    }
  } else {
    /*back order pokemon by id*/
    changebutton = true;
    let list, i, switching, b, shouldSwitch;
    list = document.querySelector('[data-js="pokedex"]');
    switching = true;
    while (switching) {
      switching = false;
      b = list.getElementsByTagName("li");
      for (i = 0; i < b.length - 1; i++) {
        shouldSwitch = false;
        if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
      }
    }
  }
};

const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises).then(generateHTML).then(insertPokemonsIntoPage);
