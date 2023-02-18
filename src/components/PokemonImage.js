import React from 'react'
import { animated } from 'react-spring'
import { useWiggle } from "../hooks/wiggle"
import { v4 } from 'uuid'



export default function PokemonImage({ pokemonImageUrl, pokemonName, loading, animate }) {

  const [loadedImage, setLoadingImage] = React.useState(false)
  const [style, trigger] = useWiggle({ x: 1, y: 2, scale: 0.9 });

  React.useEffect(() => {
    setLoadingImage(false)
  }, [pokemonImageUrl])

  const handleLoadedImage = () => {
    setLoadingImage(true)
  }

  const image = <img src={pokemonImageUrl}
                    className="illustration"
                    alt={"Illustration of " + pokemonName} 
                    onLoad={handleLoadedImage}
                    key={ v4() }/>  

  const image_anim = <animated.div onMouseEnter={trigger} 
                    style={style} 
                    key={ v4() }>
                            {image}
                </animated.div>
    
    

  const placeholder = 
                <img src="/placeholder.png" 
                    className="illustration" 
                    key={ v4() }
                    alt="Illustration click to change Pokemon" 
                />

  return (
    <div key={ v4() }>
        {(loading && !loadedImage) &&
            placeholder
        }
        {
            animate? !loading && image_anim : !loading && image
        }
    </div>
  )
}
