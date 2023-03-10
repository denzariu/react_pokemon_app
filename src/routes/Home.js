import React from "react";
import Pokedex from "../components/Pokedex";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const noMaxPokemon = 1008
const fileExtension = ".png"


export default function Home() {
  
  const navigate = useNavigate();
  const [pokemonID, setPokemonID] = React.useState("1");

  
  const [artwork, setArtwork] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [pokemonDetails, setPokemonDetails] = React.useState([ ])

  React.useEffect(() => {
    let local_pokemonID = localStorage.getItem("id")
    if (local_pokemonID) setPokemonID(local_pokemonID)
}, [])
   
  React.useEffect(() => {
    setLoading(true)
    
    const newPokemon = "https://pokeapi.co/api/v2/pokemon/" + pokemonID
    localStorage.setItem("id", pokemonID)

    let cancel
    axios.get(newPokemon, {
        cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
        
        var obj = {
                    id: res.data.id,
                    name: res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1).toLowerCase(),
                    height: res.data.height,
                    weight: res.data.weight,
                    types: [res.data.types],
                    stats: res.data.stats,
                }
        
        obj = {...obj, url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonID + fileExtension,
                       url_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/" + pokemonID + fileExtension,
                       url_artwork:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokemonID + fileExtension
        }
        
        setPokemonDetails(obj)
        setLoading(false)
    })

      return () => cancel()
}, [pokemonID, artwork])

  const handleArtwork = () => {
    const newArtwork = !artwork
    setArtwork(newArtwork)
  }

  const handlePrevPokemon = () => {
    console.log(pokemonID)
    const newPokemonID = (Number(pokemonID) - 1).toString()
    setPokemonID(newPokemonID)
  };

  const handleNextPokemon = () => {
    console.log(pokemonID)
    const newPokemonID = (Number(pokemonID) + 1).toString()
    setPokemonID(newPokemonID)
  };

  const handleRandomPokemon = () => {
    console.log(pokemonID)
    // Get a random Pokemon in range [1, noMaxPokemon]
    const newPokemonID = ( Math.floor((Math.random() * (noMaxPokemon - 1))) + 1).toString()
    setPokemonID(newPokemonID)
  };

  const handleRedirect = () => {
    navigate('/abilities')
  };

  return (
    <>
      <div className="home-container">
        
      <h1 className="text-ui"> </h1>
        <Pokedex 
            pokemonDetails={pokemonDetails}
            loading={loading}
            artwork={artwork}
        />
        <h1 className="text-ui"> </h1>
        <div className="blue-squares-container-ui">
                {pokemonID > 1 &&
                    <button className="blue-square-ui" onClick={handlePrevPokemon}>
                        Previous Pokemon
                    </button>
                }
                {pokemonID < noMaxPokemon &&
                    <button className="blue-square-ui" onClick={handleNextPokemon}>
                        Next Pokemon
                    </button>
                }
                <button className="blue-square-ui" onClick={handleRandomPokemon}>
                        Random Pokemon
                </button>

                <button className="blue-square-ui" onClick={handleArtwork}>
                        Artwork Change
                </button>
                <button className="blue-square-ui flex-max" onClick={handleRedirect}>
                        Browse Abilities
                </button>
        </div>
        
      </div>
    </>
  );
}
