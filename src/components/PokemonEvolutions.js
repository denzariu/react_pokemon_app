import React from 'react'
import axios from 'axios'
import PokemonImage from './PokemonImage'
import { v4 } from 'uuid'

const evolutionTreeText = 
        <div className="evolutions-title inline-no-height two-px-up">
                Evolution Tree
        </div> 

const placeholderCurrentPokemons = [
    {
        index : 0,
        url : "placeholder",
        name : "No Data"
    },
    {
        index : 0,
        url : "placeholder",
        name : "No Data",
        num_evolutions : 1
    },
    {
        index : 0,
        url : "placeholder",
        name : "No Data",
        num_evolutions : 1
    },
]

export default function PokemonEvolutions({ pokemonId }) {

// This is for slicing the url to get Pokemon's IDs without an additional fetch
const charactersInLink = 42
const [evolutionChain, setEvolutionChain] = React.useState()
const [pokemonChain, setPokemonChain] = React.useState()
const [loading, setLoading] = React.useState()
const [currentPokemons, setCurrentPokemons] = React.useState([0,0,0])
const [currentPokemonsData, setCurrentPokemonsData] = React.useState(placeholderCurrentPokemons)

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
        })
    }
}, [pokemonId])

// Store pokemon evolution tree
React.useEffect(() => {

    if (evolutionChain) {
        setLoading(true)
        setCurrentPokemonsData(placeholderCurrentPokemons)
        let cancel
        axios.get(evolutionChain, {
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            
            let pokemonChain = res.data.chain
            let spriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" 

            /*
            The following code breaks the response into a easier-to-read tree structure.
            It attaches nodes bottom-up.

            O - nextEv: {
                            nextEv: {
                                    nextEv: null
                                    name: XX
                                    url:  YY
                                  }
                            name: XXX
                            url:  YYY
                        }
                        ----
                        ----

              - name:   XXXX
              - url:    YYYY
            */

            let root_tree = []
            let children = pokemonChain.evolves_to
            children.map(child => {
                    if (child) {
                        console.log(child)
                        let child_tree = []
                        let c_of_c = child.evolves_to
                        c_of_c.map(child_of_child => {
                            if (child_of_child)
                                child_tree.push({
                                    nextEv  : null, 
                                    name    : child_of_child.species.name.charAt(0).toUpperCase() + child_of_child.species.name.slice(1),
                                    url     : spriteUrl + child_of_child.species.url.slice(charactersInLink).slice(0, -1) + ".png"
                                })
                        })
                        root_tree.push({
                            nextEv  : child_tree, 
                            name    : child.species.name.charAt(0).toUpperCase() + child.species.name.slice(1),
                            url     : spriteUrl + child.species.url.slice(charactersInLink).slice(0, -1) + ".png"
                        })
                    }
            });

            let pokemonChainTemp = {
                nextEv  : root_tree, 
                name    : pokemonChain.species.name.charAt(0).toUpperCase() + pokemonChain.species.name.slice(1),
                url     : spriteUrl + pokemonChain.species.url.slice(charactersInLink).slice(0, -1) + ".png"
            }
            
            setPokemonChain(pokemonChainTemp)
            setCurrentPokemons([0,0,0])
            setLoading(false)
        })
    }
    
}, [evolutionChain])


React.useEffect(() => {

    // If input isn't ready yet, return placeholder data 
    if (!pokemonChain) {
        setCurrentPokemonsData(placeholderCurrentPokemons)
        return
    }

    // Shortcuts for easier-to-read code
    let secondPokemon = pokemonChain.nextEv[currentPokemons[1]] 
    let thirdPokemon  = secondPokemon && secondPokemon.nextEv ? secondPokemon.nextEv[currentPokemons[2]] : null
    let secondPokemon_noEv = pokemonChain.nextEv ? pokemonChain.nextEv.length : 0
    let thirdPokemon_noEv  = secondPokemon && secondPokemon.nextEv ? secondPokemon.nextEv.length : 0

    // Update data
    setCurrentPokemonsData([
        {
            index : currentPokemons[0],
            url   : pokemonChain ? pokemonChain.url : "placeholder",
            name  : pokemonChain ? pokemonChain.name : "No Data",
        },
        {
            index : currentPokemons[1],
            url   : (pokemonChain && secondPokemon) ? secondPokemon.url : "placeholder",
            name  : (pokemonChain && secondPokemon) ? secondPokemon.name : "No Data",
            num_evolutions : secondPokemon_noEv
        },
        {
            index : currentPokemons[2],
            url   : (pokemonChain && thirdPokemon) ? thirdPokemon.url : "placeholder",
            name  : (pokemonChain && thirdPokemon) ? thirdPokemon.name : "No Data",
            num_evolutions : thirdPokemon_noEv
        }
    ])

    console.log(currentPokemonsData)
    
}, [currentPokemons])

// This handles the path from root to 3rd pokemon evolution in a binary way
function handleNextEvolution (j) {
    console.log(j);
    setCurrentPokemons(currentPokemons => currentPokemons.map((currentPokemon, i) => i === j ? currentPokemon + 1 : currentPokemon));
    console.log(currentPokemons)
};

function handlePrevEvolution (j) {
    console.log(j);
    setCurrentPokemons(currentPokemons => currentPokemons.map((currentPokemon, i) => i === j ? currentPokemon - 1 : currentPokemon));
    console.log(currentPokemons)
};

  return (
    <> 
        {
            evolutionTreeText
        }
        <div className="inline small-gap evolution-name-container">
            {    
                (pokemonChain && !loading) ?
                    <div key={v4()} className="evolution-name-screen">{currentPokemonsData[0].name}</div>
                    :
                    <div className="evolution-name-screen enter-container">No Data</div>
                
                
            }
            {
                (pokemonChain && !loading)  ? 
                    <div key={v4()} className="evolution-name-screen">{currentPokemonsData[1].name}</div>
                    :
                    <div className="evolution-name-screen enter-container">No Data</div>
            }
            {
                (pokemonChain && !loading)  ? 
                    <div key={v4()} className="evolution-name-screen">{currentPokemonsData[2].name}</div>
                    :
                    <div className="evolution-name-screen enter-container">No Data</div>
            }
            
        </div>
        
        <div className="evolution-container"> 
           <div key={ v4() } className="evolution-screen"> 
                <div className="inline-no-height">
                    { currentPokemons[0] > 0 && 
                        <div className="arrow arrow-up" type="button" onClick={() => {handlePrevEvolution(0)}}></div>
                    }
                </div> 
                                
                <PokemonImage key={ v4() }
                            pokemonImageUrl={currentPokemonsData[0].url}
                            pokemonName={currentPokemonsData[0].name}
                            loading={loading}
                            index={currentPokemonsData[0].index}
                />
        
            </div>
            <div key={ v4() } className="evolution-screen"> 
                <div className="inline-no-height">
                    { currentPokemons[1] > 0 && 
                        <div className="arrow arrow-up" type="button" onClick={() => {handlePrevEvolution(1)}}></div>
                    }
                </div> 
                            
                <PokemonImage key={ v4() }
                            pokemonImageUrl={currentPokemonsData[1].url}
                            pokemonName={currentPokemonsData[1].name}
                            loading={loading}
                            index={currentPokemonsData[1].index}
                />
                    
                <div className="inline-no-height">
                    { currentPokemonsData[1].num_evolutions - 1 > currentPokemons[1] &&
                        <div className="arrow arrow-down" type="button" onClick={() => {handleNextEvolution(1)}}></div>
                    }
                </div>
            </div>
            <div key={ v4() } className="evolution-screen"> 
                <div className="inline-no-height">
                    { currentPokemons[2] > 0 && 
                        <div className="arrow arrow-up" type="button" onClick={() => {handlePrevEvolution(2)}}></div>
                    }
                </div> 
                            
                <PokemonImage key={ v4() }
                            pokemonImageUrl={currentPokemonsData[2].url}
                            pokemonName={currentPokemonsData[2].name}
                            loading={loading}
                            index={currentPokemonsData[2].index}
                />
                    
                <div className="inline-no-height">
                    { currentPokemonsData[2].num_evolutions - 1 > currentPokemons[2] && 
                        <div className="arrow arrow-down" type="button" onClick={() => {handleNextEvolution(2)}}></div>
                    }
                </div>
            </div>
        </div>
        
    </>
  )
}
