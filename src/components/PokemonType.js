import React from 'react'

export default function PokemonType({pokemonTypes}) {


  return (
    pokemonTypes && (pokemonTypes[0]).map(type => 
        { return <div className={type.type.name + '-type' + " type-screen"} key={type.slot+"-"+type.type.name}>
                    {type.type.name.toUpperCase()}
                </div>
        })
  )
}