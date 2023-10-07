
let pokemonList = document.getElementById('pokemonList')
let buttonLoad = document.getElementById('loadButton')

offset = 0
limit = 5
maxRecord = 15
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`


function convertPokemonsToHtml(pokemon){
  return `
  <li class="pokemon">
          <span class="number">${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>

          <div class="details">
            <ol class="types">
              ${pokemon.types.map((type) => `<li class="type ${type}"> ${type} </li>`).join('')}
            </ol>

            <img src="${pokemon.photo}"
            alt="${pokemon.name}">
          </div>

  </li> 
  `
}
function loadPokemons(offset, limit){
  pokeApi.getPokemons(offset, limit).then((pokemons) => {
    const newList = pokemons.map(convertPokemonsToHtml)
    const newHtml = newList.join('')
    pokemonList.innerHTML += newHtml
  })
}
loadPokemons(offset, limit)

buttonLoad.addEventListener('click', () => {
  offset += limit
  const qntPokemonsWithDisplay = offset - limit

  if(qntPokemonsWithDisplay >= maxRecord){
    const newLimit = maxRecord - offset
    loadPokemons(offset, newLimit)
    
    buttonLoad.parentElement.removeChild(buttonLoad)
  
  } else {
    loadPokemons(offset, limit)
  }
})
