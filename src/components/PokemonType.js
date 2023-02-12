import React from 'react'

export default function PokemonType({pokemonTypes}) {


  return (
    pokemonTypes && (pokemonTypes[0]).map(type => 
        { return <div id={type.type.name + '-type'} className="type-screen" key={type.slot}>
                    {type.type.name.toUpperCase()}
                </div>
        })
  )
}