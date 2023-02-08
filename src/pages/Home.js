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

  
  const [loading, setLoading] = React.useState(true)
  const [pokemonName, setPokemonName] = React.useState("Bulbasaur")
  const [pokemonImageUrl, setPokemonImageUrl] = React.useState([])

  React.useEffect(() => {
    setPokemonImageUrl("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonID + fileExtension)
  }, [])
   
  React.useEffect(() => {
    setLoading(true)
    const newPokemon = "https://pokeapi.co/api/v2/pokemon/" + pokemonID

    let cancel
    axios.get(newPokemon, {
        cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
        setPokemonName(res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1).toLowerCase())
        setPokemonImageUrl("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonID + fileExtension)
        setLoading(false)
    })

      return () => cancel()
}, [pokemonID])

  const handlePrevPokemon = () => {
    console.log(pokemonID)
    const newPokemonID = (Number(pokemonID) - 1).toString()

    // Call the function to set the state string in our component
    setPokemonID(newPokemonID)
  };

  const handleNextPokemon = () => {
    console.log(pokemonID)
    const newPokemonID = (Number(pokemonID) + 1).toString()

    // Call the function to set the state string in our component
    setPokemonID(newPokemonID)
  };

  const handleRandomPokemon = () => {
    console.log(pokemonID)
    // Get a random Pokemon in range [1, noMaxPokemon]
    const newPokemonID = ( Math.floor((Math.random() * (noMaxPokemon - 1))) + 1).toString()

    // Call the function to set the state string in our component
    setPokemonID(newPokemonID)
  };

  return (
    <>
      <Pokedex
        pokemonName={pokemonName}
        pokemonImageUrl={pokemonImageUrl}
        loading={loading}
      />
      <h1 className="">You've been attacked by {pokemonName}!</h1>
      {/* When the user hovers over the image we apply the wiggle style to it */}
      {/* <animated.div onMouseEnter={trigger} style={style}>
        <PokemonImage
            pokemonImageUrl={pokemonImageUrl}
            loading={loading}
        />
      </animated.div> */}
      <div className="">
        {pokemonID > 1 &&
            <button className="" onClick={handlePrevPokemon}>
                Previous Pokemon
            </button>
        }
        {pokemonID < noMaxPokemon &&
            <button className="" onClick={handleNextPokemon}>
                Next Pokemon
            </button>
        }
        <button className="" onClick={handleRandomPokemon}>
                Random Pokemon
        </button>
      </div>
      
    </>
  );
}
