import React from 'react'
import { animated } from 'react-spring'
import { useWiggle } from "../hooks/wiggle"
import { v4 } from 'uuid'


export default function PokemonImage({ pokemonImageUrl, pokemonName, loading, animate }) {

  const [loadedImage, setLoadedImage] = React.useState(false)
  const [invalidImage, setInvalidImage] = React.useState(false)
  const [style, trigger] = useWiggle({ x: 1, y: 2, scale: 0.9 })

  React.useEffect(() => {
    setInvalidImage(false)
    setLoadedImage(false)

  }, [pokemonImageUrl])

  const handleLoadedImage = () => {
    setLoadedImage(true)
  }

  const handleErrorImage = (e) => {
    setInvalidImage(true)
    setLoadedImage(false)
  }

  const image = <img src={pokemonImageUrl}
                    className="illustration"
                    alt={"Illustration of " + pokemonName} 
                    onLoad={handleLoadedImage}
                    onError={handleErrorImage}
                    key={ v4() }/>

  const image_anim = <animated.div onMouseEnter={trigger} 
                        style={style} 
                        key={ v4() }>
                                {image}
                    </animated.div>
    
  const placeholderRotate = 
                <img src="https://denzariu.github.io/react_pokemon_app/placeholder.png" 
                    className="illustration rotating"
                    key={ v4() }
                    alt="Illustration placeholder"
                />

  const placeholderImg = 
                <img src="https://denzariu.github.io/react_pokemon_app/placeholder.png" 
                    className="illustration" 
                    key={ v4() }
                    alt="Illustration placeholder" 
                />

  return (
    <>
        {
            ((loading && !loadedImage) &&
            placeholderRotate)

        || 

            (
              invalidImage? placeholderImg : 
                (
                  animate? !loading && image_anim : !loading && 
                  pokemonImageUrl == "placeholder" ? placeholderImg : image
                )
            )
        }
    </>
  )
}
