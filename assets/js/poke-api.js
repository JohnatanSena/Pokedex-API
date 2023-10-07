 const pokeApi ={}

 function convertPokemonApiDetailToPokemon(pokeDetail){
  const pokemon = new Pokemon()
  pokemon.name = pokeDetail.name;
  pokemon.number = pokeDetail.order
  
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types

  pokemon.type = type
  pokemon.types = types
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
  console.log(types)
  return pokemon
 }

 pokeApi.getPokemonsDetail = (pokemon) => {
  return fetch(pokemon.url)
  .then((response) => response.json())
  .then(convertPokemonApiDetailToPokemon)
 }


 pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  
  return fetch(url)
  .then((response) => response.json())
  .then((jsonBody)=> jsonBody.results)
  .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
  .then((detailsRequest) => Promise.all(detailsRequest))
  .then((pokemonDetails) =>{

    return pokemonDetails

  })
}