const poke_container = document.getElementById('poke_container');
const pokeCache = {};
const pokemons_number = 151;
const colors = {
	fire: '#E97171',
	grass: '#83B582',
	electric: '#FAF0AF',
	water: '#70ADB5',
	ground: '#DEB881',
	rock: '#d5d5d4',
	fairy: '#ffcbcb',
	poison: '#C3AED6',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#a37eba',
	flying: '#F5F5F5',
	fighting: '#edcfa9',
	normal: '#FFFFFF'
}

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemons_number; i++) {
		await getPokemon(i);
	}
}

let pokemonNames = [];
const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
  pokemon = await res.json();
  displayPokemonCard(pokemon);
  pokemonNames.push(pokemon.species.name);
}  

const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredPokemon = pokemonNames.filter(name => {
    return (name.toLowerCase().includes(searchString));
  });
  console.log(filteredPokemon);
  displayPokemonCard(filteredPokemon);
});
  
const selectPokemon = async (id) => {
  if(!pokeCache[id]) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    pokemon = await res.json();
    pokeCache[id] = pokemon;
    displayPopup(pokemon);
  }

  else{
    displayPopup(pokeCache[id]);
  }
}

const displayPopup = (pokemon) => {
  const type = pokemon.types.map((type) => type.type.name).join(', ');
  const height = pokemon.height / 10;
  const weight = pokemon.weight / 10;

  const htmlString = `
      <div class="popup"> 
        <button id="closeButton" onclick="closePopup()">Close</button> 
        <img class="img-container" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name}"/> 
        <p class="title">#${pokemon.id.toString().padStart(3, '0')} ${pokemon.species.name}</p>
        <p class="info">Type: ${type} | Height: ${height}m | Weight: ${weight}kg</p>
      </div>
  </div>`;
  poke_container.innerHTML = htmlString + poke_container.innerHTML;
};

const closePopup = () => {
  const popup = document.querySelector('.popup');
  popup.parentElement.removeChild(popup);
};

function displayPokemonCard() {
	const pokemonEl = document.createElement('div');
  pokemonEl.classList.add('pokemon');
  pokemonEl.setAttribute("id", pokemon.species.name);
  pokemonEl.style.display = "block"

  const name = pokemon.species.name[0]+ pokemon.species.name.slice(1);
  
  const poke_types = pokemon.types.map(el => el.type.name);
  const type = main_types.find(type => poke_types.indexOf(type) > -1);
  const color = colors[type];
  pokemonEl.style.backgroundColor = color;

	const pokeInnerHTML = `
        <div class="img-container" onclick="selectPokemon(${pokemon.id})">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name}"/>
        </div>
        <div class="info" onclick="selectPokemon(${pokemon.id})">
             <span class="card-number">#${pokemon.id.toString().padStart(3, '0')}</span>
        </div>
        <h3 class="card-title" onclick="selectPokemon(${pokemon.id})">${name}</h3>
    `;

  pokemonEl.innerHTML = pokeInnerHTML;
  poke_container.appendChild(pokemonEl);
}

fetchPokemons();