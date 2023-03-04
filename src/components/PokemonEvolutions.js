import React from 'react'
import axios from 'axios'
import PokemonImage from './PokemonImage'
import { v4 } from 'uuid'

const evolutionTreeText = 
        <div className="evolutions-title inline">
                Evolution Tree
        </div> 

export default function PokemonEvolutions({ pokemonId }) {

// This is for slicing the url to get Pokemon's IDs without an additional fetch
const charactersInLink = 42
const [evolutionId, setEvolutionId] = React.useState()
const [evolutionChain, setEvolutionChain] = React.useState()
const [pokemonChain, setPokemonChain] = React.useState()
const [loading, setLoading] = React.useState()
const [currentPokemons, setCurrentPokemons] = React.useState([0,0,0])

// Fetches the pokemon species with PokemonId, then identifies its evolution chain 
React.useEffect(() => {
    
    if (pokemonId) {
        let urlGet = "https://pokeapi.co/api/v2/pokemon-species/" + pokemonId
        let cancel
        axios.get(urlGet, {
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setEvolutionChain(res.data.evolution_chain.url)
            setCurrentPokemons([0,0,0])
            console.log(res.data.evolution_chain.url.slice(charactersInLink).slice(0, -1))
            setEvolutionId(res.data.evolution_chain.url.slice(charactersInLink).slice(0, -1))
        })
    }
}, [pokemonId])


// TODO: detect pokemon with more than 1 evolution path (if evolution.length > 1 => eevee route)
React.useEffect(() => {

    if (evolutionChain) {
        setLoading(true)
        let cancel
        axios.get(evolutionChain, {
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            
            let i = 0
            let j = 0
            let pokemonChainTemp = [[],[],[]]
            let pokemonEntry = res.data.chain
        
            let spriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" 
            
            // Find & store data of every pokemon in the evolution chain 
            while (pokemonEntry) {
                
                pokemonChainTemp[j].push({
                    index : i,
                    url : spriteUrl + pokemonEntry.species.url.slice(charactersInLink).slice(0, -1) + ".png",
                    name : pokemonEntry.species.name.charAt(0).toUpperCase() + pokemonEntry.species.name.slice(1)
                })
                if (evolutionId == "67") {
                    j == 0 ? i = 0 : i++
                    pokemonEntry = res.data.chain.evolves_to[i]
                    j = 1
                }
                else {
                    pokemonEntry = pokemonEntry.evolves_to[0]
                    j++
                    i = 0
                }
            }
            
            if (evolutionId == "67") j++
            
            while (j < 3) {
                pokemonChainTemp[j].push({
                    index : 0,
                    url : "placeholder",
                    name : "No Data"
                })
                j++
            }
        console.log(pokemonChainTemp)
        setPokemonChain(pokemonChainTemp)
        setLoading(false)
        })
    }
    
}, [evolutionChain])

const handleNextEvolution = () => {
    const newCurrentPokemons = [currentPokemons[0], currentPokemons[1]+1, currentPokemons[2]]
    console.log(newCurrentPokemons)
    setCurrentPokemons(newCurrentPokemons)
  };

  const handlePrevEvolution = () => {
    const newCurrentPokemons = [currentPokemons[0], currentPokemons[1]-1, currentPokemons[2]]
    console.log(newCurrentPokemons)
    setCurrentPokemons(newCurrentPokemons)
  };

  return (
    <>
        

        {
            <div className="inline small-gap evolution-name-container">
            {    
                pokemonChain ? pokemonChain && pokemonChain.map((noEvolution, j) => noEvolution.map(pokemon =>
                    currentPokemons[j] == pokemon.index && 
                    <div key={v4()} className="evolution-name-screen">{pokemon.name}</div>))
                    :
                    <div className="evolution-name-screen enter-container">No Data</div>
            }
            </div>
        }
        
        <div className="evolution-container"> {
            pokemonChain && pokemonChain.map((noEvolution, j) => noEvolution.map(pokemon => 
                
                currentPokemons[j] == pokemon.index && 
                
                <div key={ v4() } className="evolution-screen"> 
                        {
                            (pokemonChain && currentPokemons[j] > 0 && 
                            <div className="arrow arrow-up" onClick={handlePrevEvolution}></div>) 
                                
                        }
                        <PokemonImage key={ v4() }
                                pokemonImageUrl={pokemon.url}
                                pokemonName={pokemon.name}
                                loading={loading}
                                index={pokemon.index}
                        />
                        {
                            (pokemonChain && pokemonChain[j].length - 1 > currentPokemons[j] && 
                            <div className="arrow arrow-down" onClick={handleNextEvolution}></div>)
                        }
                
                </div>
               
                
                
                
            ))}
        </div>
        
        {/* <div className="inline">
            
            {pokemonChain && pokemonChain[1].length - 1 > currentPokemons[1] && 
                <div className="arrow arrow-down" onClick={handleNextEvolution}></div>
            }
            { {!(pokemonChain && pokemonChain[1].length - 1 > currentPokemons[1]) && 
                <div className="placeholder-arrow"></div>
            }
        </div> */}
    </>
  )
}
