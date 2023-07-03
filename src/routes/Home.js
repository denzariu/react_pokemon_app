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
                    stats: res.data.stats
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
        
        <h1 className="text-ui">Pokedenz</h1>
        <Pokedex 
            pokemonDetails={pokemonDetails}
            loading={loading}
            artwork={artwork}
        />
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

        <div className="blue-squares-container-ui-smallres">
            {pokemonID > 1 &&
                <button className="blue-square-ui-smallres" onClick={handlePrevPokemon}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="svg-menu-box" viewBox="0 0 24 24" fill="none">
                        <path d="M15 8L9 12L15 16" className="svg-menu" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div className="menu-text">Previous</div>
                </button>
            }
            {pokemonID == 1 &&
                <button className="blue-square-ui-smallres" disabled>
                    <svg xmlns="http://www.w3.org/2000/svg" className="svg-menu-box" viewBox="0 0 24 24" fill="none" disabled>
                        <path d="M15 8L9 12L15 16" className="svg-menu-disabled" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            }
            {pokemonID < noMaxPokemon &&
                <button className="blue-square-ui-smallres" onClick={handleNextPokemon}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="svg-menu-box" viewBox="0 0 24 24" fill="none">
                        <path d="M9 8L15 12L9 16" className="svg-menu" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div className="menu-text">Next</div>
                </button>
            }
            {pokemonID == noMaxPokemon &&
                <button className="blue-square-ui-smallres" disabled>
                    <svg xmlns="http://www.w3.org/2000/svg" className="svg-menu-box" viewBox="0 0 24 24" fill="none" disabled>
                        <path d="M9 8L15 12L9 16" className="svg-menu-disabled" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            }
            <button className="blue-square-ui-smallres" onClick={handleRandomPokemon}>
                <svg xmlns="http://www.w3.org/2000/svg" className="svg-menu-box" viewBox="0 0 24 24" fill="none">
                    <path className="svg-menu" fill-rule="evenodd" clip-rule="evenodd" d="M14.6921 5H9.30807C8.15914 5.00635 7.0598 5.46885 6.25189 6.28576C5.44398 7.10268 4.99368 8.20708 5.00007 9.356V14.644C4.99368 15.7929 5.44398 16.8973 6.25189 17.7142C7.0598 18.5311 8.15914 18.9937 9.30807 19H14.6921C15.841 18.9937 16.9403 18.5311 17.7482 17.7142C18.5562 16.8973 19.0064 15.7929 19.0001 14.644V9.356C19.0064 8.20708 18.5562 7.10268 17.7482 6.28576C16.9403 5.46885 15.841 5.00635 14.6921 5Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path className="svg-menu" d="M9.00006 9.50001C8.86651 9.50001 8.74095 9.448 8.64652 9.35357C8.55207 9.25912 8.50006 9.13356 8.50006 9.00001C8.50006 8.90078 8.5292 8.80474 8.58432 8.72225C8.63947 8.63971 8.71705 8.57604 8.80871 8.53807C8.8697 8.51281 8.93408 8.5 9.00008 8.5C9.03275 8.5 9.06556 8.50324 9.09761 8.50961C9.19493 8.52897 9.28345 8.57629 9.35362 8.64645C9.42378 8.71662 9.4711 8.80515 9.49046 8.90247C9.50982 8.99978 9.49998 9.09967 9.462 9.19135C9.42403 9.28302 9.36036 9.3606 9.27785 9.41573C9.19533 9.47087 9.09929 9.50001 9.00006 9.50001Z" fill="#000000"/>
                    <path className="svg-menu" d="M9.00006 10C8.73485 10 8.48049 9.89465 8.29296 9.70711C8.10542 9.51958 8.00006 9.26522 8.00006 9.00001C8.00006 8.80222 8.05871 8.60888 8.1686 8.44444C8.27848 8.27999 8.43466 8.15181 8.61738 8.07613C8.80011 8.00044 9.00117 7.98063 9.19516 8.01922C9.38914 8.05781 9.56732 8.15305 9.70717 8.2929C9.84702 8.43275 9.94226 8.61093 9.98085 8.80492C10.0194 8.9989 9.99963 9.19996 9.92394 9.38269C9.84826 9.56541 9.72008 9.72159 9.55563 9.83147C9.39119 9.94136 9.19785 10 9.00006 10Z" fill="#000000"/>
                    <path className="svg-menu" d="M12.0001 12.5C11.9341 12.5 11.8697 12.4872 11.8087 12.4619C11.7171 12.424 11.6395 12.3603 11.5843 12.2778C11.5292 12.1953 11.5001 12.0992 11.5001 12C11.5001 11.8665 11.5521 11.7409 11.6465 11.6465C11.741 11.552 11.8665 11.5 12.0001 11.5C12.0993 11.5 12.1953 11.5291 12.2778 11.5843C12.3604 11.6394 12.424 11.717 12.462 11.8087C12.5 11.9003 12.5098 12.0002 12.4905 12.0975C12.4711 12.1949 12.4238 12.2834 12.3536 12.3536C12.2835 12.4237 12.1949 12.471 12.0976 12.4904C12.0656 12.4968 12.0328 12.5 12.0001 12.5Z" fill="#000000"/>
                    <path className="svg-menu" d="M12.0001 11C12.1979 11 12.3912 11.0587 12.5556 11.1685C12.7201 11.2784 12.8483 11.4346 12.9239 11.6173C12.9996 11.8001 13.0194 12.0011 12.9809 12.1951C12.9423 12.3891 12.847 12.5673 12.7072 12.7071C12.5673 12.847 12.3891 12.9422 12.1952 12.9808C12.0012 13.0194 11.8001 12.9996 11.6174 12.9239C11.4347 12.8482 11.2785 12.72 11.1686 12.5556C11.0587 12.3911 11.0001 12.1978 11.0001 12C11.0001 11.7348 11.1054 11.4804 11.293 11.2929C11.4805 11.1054 11.7349 11 12.0001 11Z" fill="#000000"/>
                    <path className="svg-menu" d="M15 8.49999C15.066 8.49999 15.1304 8.5128 15.1914 8.53806C15.2831 8.57603 15.3607 8.6397 15.4158 8.72221C15.4709 8.80473 15.5001 8.90077 15.5001 9C15.5001 9.13355 15.4481 9.25911 15.3536 9.35354C15.2592 9.44799 15.1336 9.5 15.0001 9.5C14.9008 9.5 14.8048 9.47086 14.7223 9.41574C14.6398 9.36059 14.5761 9.28301 14.5381 9.19135C14.5001 9.09966 14.4903 8.99977 14.5097 8.90247C14.529 8.80514 14.5763 8.71661 14.6465 8.64644C14.7167 8.57628 14.8052 8.52896 14.9025 8.5096C14.9346 8.50323 14.9674 8.49999 15 8.49999Z" fill="#000000"/>
                    <path className="svg-menu" d="M15.0001 10C14.8023 10 14.6089 9.94135 14.4445 9.83146C14.28 9.72158 14.1519 9.5654 14.0762 9.38268C14.0005 9.19995 13.9807 8.99889 14.0193 8.8049C14.0579 8.61092 14.1531 8.43274 14.293 8.29289C14.4328 8.15304 14.611 8.0578 14.805 8.01921C14.999 7.98062 15.2 8.00043 15.3827 8.07612C15.5655 8.1518 15.7216 8.27998 15.8315 8.44443C15.9414 8.60887 16.0001 8.80221 16.0001 9C16.0001 9.26521 15.8947 9.51957 15.7072 9.7071C15.5196 9.89464 15.2653 10 15.0001 10Z" fill="#000000"/>
                    <path className="svg-menu" d="M15.0001 14.5C15.1336 14.5 15.2592 14.552 15.3536 14.6464C15.4481 14.7409 15.5001 14.8664 15.5001 15C15.5001 15.0992 15.4709 15.1953 15.4158 15.2778C15.3607 15.3603 15.2831 15.424 15.1914 15.4619C15.1304 15.4872 15.066 15.5 15 15.5C14.9674 15.5 14.9346 15.4968 14.9025 15.4904C14.8052 15.471 14.7167 15.4237 14.6465 15.3536C14.5763 15.2834 14.529 15.1949 14.5097 15.0975C14.4903 15.0002 14.5001 14.9003 14.5381 14.8087C14.5761 14.717 14.6398 14.6394 14.7223 14.5843C14.8048 14.5291 14.9008 14.5 15.0001 14.5Z" fill="#000000"/>
                    <path className="svg-menu" d="M15.0001 14C15.2653 14 15.5196 14.1054 15.7072 14.2929C15.8947 14.4804 16.0001 14.7348 16.0001 15C16.0001 15.1978 15.9414 15.3911 15.8315 15.5556C15.7216 15.72 15.5655 15.8482 15.3827 15.9239C15.2 15.9996 14.999 16.0194 14.805 15.9808C14.611 15.9422 14.4328 15.847 14.293 15.7071C14.1531 15.5673 14.0579 15.3891 14.0193 15.1951C13.9807 15.0011 14.0005 14.8 14.0762 14.6173C14.1519 14.4346 14.28 14.2784 14.4445 14.1685C14.6089 14.0586 14.8023 14 15.0001 14Z" fill="#000000"/>
                    <path className="svg-menu" d="M9.00009 15.5C8.93408 15.5 8.8697 15.4872 8.80872 15.4619C8.71705 15.424 8.63947 15.3603 8.58434 15.2778C8.5292 15.1953 8.50006 15.0992 8.50006 15C8.50006 14.8665 8.55207 14.7409 8.6465 14.6465C8.74095 14.552 8.86651 14.5 9.00006 14.5C9.09929 14.5 9.19533 14.5291 9.27782 14.5843C9.36036 14.6394 9.42403 14.717 9.462 14.8087C9.49998 14.9003 9.50982 15.0002 9.49046 15.0975C9.4711 15.1949 9.42378 15.2834 9.35362 15.3536C9.28345 15.4237 9.19493 15.471 9.0976 15.4904C9.06556 15.4968 9.03275 15.5 9.00009 15.5Z" fill="#000000"/>
                    <path className="svg-menu" d="M9.00006 14C9.19785 14 9.39119 14.0587 9.55563 14.1685C9.72008 14.2784 9.84826 14.4346 9.92394 14.6173C9.99963 14.8001 10.0194 15.0011 9.98085 15.1951C9.94226 15.3891 9.84702 15.5673 9.70717 15.7071C9.56732 15.847 9.38914 15.9422 9.19516 15.9808C9.00117 16.0194 8.80011 15.9996 8.61738 15.9239C8.43466 15.8482 8.27848 15.72 8.1686 15.5556C8.05871 15.3911 8.00006 15.1978 8.00006 15C8.00006 14.7348 8.10542 14.4804 8.29296 14.2929C8.48049 14.1054 8.73485 14 9.00006 14Z" fill="#000000"/>
                </svg>
                <div className="menu-text">Random</div>
            </button>
            <button className="blue-square-ui-smallres" onClick={handleArtwork}>
                <svg xmlns="http://www.w3.org/2000/svg" className="svg-menu-box" viewBox="0 0 24 24" fill="none">
                    <path className="svg-menu" fill-rule="evenodd" clip-rule="evenodd" d="M11.9 19C15.6694 19 18.725 15.866 18.725 12C18.725 8.13401 15.6694 5 11.9 5C8.13067 5 5.07501 8.13401 5.07501 12C5.07501 15.866 8.13067 19 11.9 19Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path className="svg-menu" d="M5.5459 14.561C11.9 10.833 15.3125 13.167 18.254 14.561" stroke="#000000" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <div className="menu-text">Artwork</div>
            </button>
            <button className="blue-square-ui-smallres" onClick={handleRedirect}>
                <svg xmlns="http://www.w3.org/2000/svg" className="svg-menu-box" viewBox="0 0 24 24" fill="none">
                    <path className="svg-menu" fill-rule="evenodd" clip-rule="evenodd" d="M12.0986 19.001C8.69856 19.001 5.99856 16.729 6.00556 13.492C5.98675 13.1702 6.01573 12.8474 6.09156 12.534C6.22356 11.944 6.54156 10.79 6.79856 9.89004C6.94556 9.37404 7.90456 9.14504 8.44656 9.29004C9.18756 9.49004 9.63956 8.85904 9.79256 8.14404C9.95999 7.32193 10.2502 6.52972 10.6536 5.79404C11.6036 4.10104 13.2786 5.40904 14.4336 6.98104C14.9071 7.59132 15.4505 8.14408 16.0526 8.62804C18.4526 11.036 18.7756 15.268 16.2046 17.516C15.0632 18.4959 13.6027 19.0241 12.0986 19.001Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div className="menu-text">Abilities</div>
            </button>
        </div>
      </div>
    </>
  );
}
