import * as React from "react";
import { animated } from "react-spring";
import { useWiggle } from "../hooks/wiggle";
import PokemonImage from "../components/PokemonImage";
import Pokedex from "../components/Pokedex";
import { Link } from "wouter";
import axios from 'axios'


const noMaxPokemon = 898
const fileExtension = ".png"


export default function Home() {
  
  const [pokemonID, setPokemonID] = React.useState("1");
  const [style, trigger] = useWiggle({ x: 5, y: 5, scale: 1 });

  
  const [artwork, setArtwork] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [pokemonDetails, setPokemonDetails] = React.useState([ ])

  React.useEffect(() => {

}, [])
   
  React.useEffect(() => {
    setLoading(true)
    const newPokemon = "https://pokeapi.co/api/v2/pokemon/" + pokemonID

    let cancel
    axios.get(newPokemon, {
        cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
        
        var obj = {name: res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1).toLowerCase(),
                    height: res.data.height,
                    weight: res.data.weight,
                    types: [res.data.types]}
        
        artwork?
            obj = {...obj, url:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonID + fileExtension}
        :
            obj = {...obj, url:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokemonID + fileExtension}
        
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

  return (
    <>
      <div className="home-container">
        <Pokedex 
            pokemonDetails={pokemonDetails}
            loading={loading}
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
                        Artwork change
                </button> 
        </div>
      </div>
    </>
  );
}
