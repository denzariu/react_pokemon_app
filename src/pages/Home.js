import * as React from "react";
import { animated } from "react-spring";
import { useWiggle } from "../hooks/wiggle";
import PokemonImage from "../components/PokemonImage";
import { Link } from "wouter";
import axios from 'axios'

// Our language strings for the header
const strings = [
  "Hello React",
  "Salut React",
  "Hola React",
  "안녕 React",
  "Hej React"
];

const fileExtension = ".png"

// Utility function to choose a random value from the language array
function randomLanguage() {
  return strings[Math.floor(Math.random() * strings.length)];
}



export default function Home() {
  
  const [pokemonID, setPokemonID] = React.useState("1");
  const [hello, setHello] = React.useState(strings[0]);
  const [style, trigger] = useWiggle({ x: 5, y: 5, scale: 1 });

  
  const [loading, setLoading] = React.useState(true)
  const [pokemonName, setPokemonName] = React.useState("Bulbasaur")
  const [pokemonImageUrl, setPokemonImageUrl] = React.useState([])

  React.useEffect(() => {
    setPokemonImageUrl("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonID + fileExtension)
  }, [])
   
  React.useEffect(() => {
    setLoading(true)
    let newPokemon = "https://pokeapi.co/api/v2/pokemon/" + pokemonID

    let cancel
    axios.get(newPokemon, {
        cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
        setLoading(false)
        setPokemonName(res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1).toLowerCase())
        setPokemonImageUrl("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonID + fileExtension)
      })

      return () => cancel()
}, [pokemonID])

  // When the user clicks we change the header language
  const handleChangePokemon = () => {
    console.log(pokemonID)
    // Choose a new Hello from our languages
    const newHello = randomLanguage();
    const newPokemonID = (Number(pokemonID) + 1).toString()

    // Call the function to set the state string in our component
    setPokemonID(newPokemonID)
  };

  

  return (
    <>
      <h1 className="title">You've been attacked by {pokemonName}!</h1>
      {/* When the user hovers over the image we apply the wiggle style to it */}
      <animated.div onMouseEnter={trigger} style={style}>
        <PokemonImage
            pokemonImageUrl={pokemonImageUrl}
            pokemonName={pokemonName}
            loading={loading}
        />
        {/* <img
          src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonID + fileExtension}
          className="illustration"
          onClick={handleChangePokemon}
          alt="Illustration click to change Pokemon"
          width="400px"
        /> */}
      </animated.div>
      <div className="navigation">
        <button className="btn--click-me" onClick={handleChangePokemon}>
            Click me!
        </button>
        
      </div>
      
    </>
  );
}
