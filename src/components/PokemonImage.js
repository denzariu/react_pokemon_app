import React from 'react'
import { animated } from 'react-spring'
import { useWiggle } from "../hooks/wiggle"
import { v4 } from 'uuid'



export default function PokemonImage({ pokemonImageUrl, pokemonName, loading }) {

  const [loadedImage, setLoadingImage] = React.useState(false)
  const [style, trigger] = useWiggle({ x: 2, y: -2, scale: 0.9 });

  React.useEffect(() => {
    setLoadingImage(false)
  }, [pokemonImageUrl])

  const handleLoadedImage = () => {
    setLoadingImage(true)
  }

  

  const image = <animated.div onMouseEnter={trigger} 
                    style={style} 
                    key={ v4() }>
                            <img src={pokemonImageUrl}
                                className="illustration"
                                alt={"Illustration of " + pokemonName} 
                                onLoad={handleLoadedImage}
                                key={ v4() }/>
                </animated.div>

  const placeholder = 
                <img src="/logo192.png" 
                    className="illustration" 
                    key={ v4() }
                    alt="Illustration click to change Pokemon" 
                />

  return (
    <div key={ v4() }>
        {(loading && !loadedImage) &&
            placeholder
        }
        {!loading &&
            image
        }
    </div>
  )
}
