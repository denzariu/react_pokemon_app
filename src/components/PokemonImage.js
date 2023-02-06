import React from 'react'
//import logo from '../../public/logo192.png'

export default function PokemonImage({ pokemonName, pokemonImageUrl, loading }) {
  return (
    <div>
        {!loading && 
            <img
            src={pokemonImageUrl}
            className="illustration"
            alt="Illustration click to change Pokemon"
            width="400px"
            />
        }
        {loading &&
            <img
            src="/logo512.png"
            width="400px"
            />
        }
    </div>
  )
}
