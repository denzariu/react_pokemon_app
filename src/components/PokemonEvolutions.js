import React from 'react'
import axios from 'axios'
import PokemonImage from './PokemonImage'
import { v4 } from 'uuid'

export default function PokemonEvolutions({ pokemonId }) {

// This is for slicing the url to get Pokemon's IDs without an additional fetch
const charactersInLink = 42
const [evolutionId, setEvolutionId] = React.useState()
const [evolutionChain, setEvolutionChain] = React.useState()
const [pokemonChain, setPokemonChain] = React.useState()
const [loading, setLoading] = React.useState()

// Fetches the pokemon species with PokemonId, then identifies its evolution chain 
React.useEffect(() => {
    
    if (pokemonId) {
        let urlGet = "https://pokeapi.co/api/v2/pokemon-species/" + pokemonId
        let cancel
        axios.get(urlGet, {
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setEvolutionChain(res.data.evolution_chain.url)
            
            console.log(res.data.evolution_chain.url.slice(charactersInLink).slice(0, -1))
            setEvolutionId(res.data.evolution_chain.url.slice(charactersInLink).slice(0, -1))
        })
    }
}, [pokemonId])

React.useEffect(() => {

    if (evolutionChain) {
        setLoading(true)
        let cancel
        axios.get(evolutionChain, {
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            
            let i = 0
            let j = 0
            let pokemonChainTemp = []
            let pokemonEntry = res.data.chain
        
            let spriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" 
            
            // Find & store data of every pokemon in the evolution chain 
            while (pokemonEntry) {
                
                pokemonChainTemp.push({
                    evolutionOf : j,
                    index : i,
                    url : spriteUrl + pokemonEntry.species.url.slice(charactersInLink).slice(0, -1) + ".png",
                    name : pokemonEntry.species.name
                })
                if (evolutionId == "67") {
                    pokemonEntry = res.data.chain.evolves_to[i]
                    j = 1
                }
                else {
                    pokemonEntry = pokemonEntry.evolves_to[0]
                    j++
                }
                i++
            }
            while (i < 3) {
                pokemonChainTemp.push({
                    index : i,
                    url : "placeholder" + ".png",
                    name : "No Data"
                })
                i++
            }
        console.log(pokemonChainTemp)
        setPokemonChain(pokemonChainTemp)
        setLoading(false)
        })
    }
    
}, [evolutionChain])

  return (
        <div className="evolution-container"> {
            pokemonChain && (pokemonChain).map(pokemon => 
                <div key={ v4() }
                className="evolution-screen"> 
                        <PokemonImage key={ v4() }
                                pokemonImageUrl={pokemon.url}
                                pokemonName={pokemon.name}
                                loading={loading}
                                index={pokemon.index}
                        />
                </div>
            )}
        </div>
  )
}
