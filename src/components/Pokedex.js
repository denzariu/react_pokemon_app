import React from 'react'
import PokemonEvolutions from './PokemonEvolutions'
import PokemonImage from './PokemonImage'
import PokemonType from './PokemonType'
import { v4 } from 'uuid'



export default function Pokedex({ pokemonDetails, loading, artwork }) {

    const [shiny, setShiny] = React.useState(false)
    
    const handleShinyChange = () => {
        const newShiny = !shiny
        setShiny(newShiny)
    }
  return (
    <div id="pokedex-container">
    <div id="pokedex">
      <div id="left-panel">
        <div className="left-top-container">
          <svg height="100" width="225" className="left-svg">
            <polyline
              points="0,75 70,75 90,38 224,38"
              style = {{fill: "none", stroke: "#000000", strokeWidth: 3}}
            />
          </svg>
          <div className="lights-container prevent-select">
            <div className="big-light-boarder">
              <div className="big-light blue">
                <div className="big-dot light-blue"></div>
              </div>
            </div>
            <div className="small-lights-container">
              <div className="small-light red">
                <div className="dot light-red"></div>
              </div>
              <div className="small-light yellow">
                <div className="dot light-yellow"></div>
              </div>
              <div className="small-light green">
                <div className="dot light-green"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="screen-container prevent-select">
          <div className="screen">
            <div className="top-screen-lights">
              <div className="mini-light red"></div>
              <div className="mini-light red"></div>
            </div>
            <div id="main-screen" className={ pokemonDetails.types?.[0]?.[0].type.name + "-type-screen"}>
                <PokemonImage
                    pokemonImageUrl={shiny ? pokemonDetails.url_shiny : artwork ? pokemonDetails.url_artwork : pokemonDetails.url}
                    pokemonName={pokemonDetails.name}
                    loading={loading}
                    animate={true}
                />
            </div>
            {/* <div id="main-screen"></div> */}
            <div className="bottom-screen-lights prevent-select">
              <div className={"small-light red " + (shiny ? "shiny" : "")} onClick={handleShinyChange}>
                {!shiny && <div className="dot light-red"></div>}
              </div>
              
          <div id="id-screen">{pokemonDetails.id}</div>
              <div className="burger prevent-select">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="buttons-container">
          <div className="upper-buttons-container prevent-select">
            <div className="big-button"></div>
            <div className="long-buttons-container">
              <div className="long-button red"></div>
              <div className="long-button light-blue"></div>
            </div>
          </div>
          <div className="nav-buttons-container">
            <div className="dots-container prevent-select">
              <div>.</div>
              <div>.</div>
              <div>.</div>
            </div>
            <div className="">
              <span id="name-screen">{pokemonDetails.name}</span>
            </div>
            <div className="right-nav-container prevent-select">
              <div className="nav-button">
                <div className="nav-center-circle"></div>
                <div className="nav-button-vertical"></div>
                <div className="nav-button-horizontal">
                  <div className="border-top"></div>
                  <div className="border-bottom"></div>
                </div>
              </div>
              <div className="bottom-right-nav-container">
                <div className="small-light red">
                  <div className="dot light-red"></div>
                </div>
                <div className="dots-container">
                  <div className="black-dot">.</div>
                  <div className="black-dot">.</div>
                  <div className="black-dot">.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="right-panel">
        <div className="empty-container">
          <svg height="100%" width="100%">
            <polyline
              points="0,0 0,40 138,40 158,75 250,75 250,0 0,0"
              style = {{fill: "#f2f2f2", stroke: "none", strokeWidth: 3}}
            />
            <polyline
              points="0,40 138,40 158,75 250,75"
              style = {{fill: "none", stroke: "#000000", strokeWidth: 3}}
            />
          </svg>
        </div>
        <div className="top-screen-container">
          <div id="about-screen" className="right-panel-screen">
            {pokemonDetails.stats && (pokemonDetails.stats.map(stat =>  
                <div key={v4()}>
                    {stat.stat.name.toUpperCase() + " " + ".".repeat(18 - stat.stat.name.length) + (stat.base_stat > 99? "." : ". ")  +  stat.base_stat}
                </div>
            ))}
          </div>
        </div>
        <div className="square-buttons-container prevent-select">
            <div className="small-reds-container">
              <div className="small-light red">
                <div className="dot light-red"></div>
              </div>
              <div className="small-light red">
                <div className="dot light-red"></div>
              </div>
            </div>
          <div className="blue-squares-container">
            <div className="blue-square"></div>
            <div className="blue-square"></div>
            <div className="blue-square"></div>
            <div className="blue-square"></div>
            <div className="blue-square"></div>
            <div className="blue-square"></div>
            <div className="blue-square"></div>
            <div className="blue-square"></div>
            <div className="blue-square"></div>
            <div className="blue-square"></div>
          </div>
        </div>
        <div className="center-buttons-container prevent-select">
          <div className="center-left-container">
            
            <div className="white-squares-container prevent-select">
              <div className="white-square"></div>
              <div className="white-square"></div>
            </div>
            
          </div>
          <div className="center-right-container prevent-select">
            <div className="thin-buttons-container">
              <div className="thin-button"></div>
              <div className="thin-button"></div>
            </div>
            <div className="yellow-button yellow">
              <div className="big-dot light-yellow"></div>
            </div>
          </div>
        </div>
        <div className="bottom-screens-container margin-bottom-small prevent-select">
            <div className="bottom-screens-container-column">
                <PokemonType pokemonTypes={pokemonDetails.types}/>
            </div>
            <div className="evolution-container-container">
                <PokemonEvolutions
                    pokemonId={pokemonDetails.id}
                />
            </div>
        </div>
        
      </div>
    </div>
    </div>
  )
}
