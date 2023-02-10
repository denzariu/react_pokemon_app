import React from 'react'
import { animated } from 'react-spring'
import { useWiggle } from "../hooks/wiggle";



export default function PokemonImage({ pokemonImageUrl, pokemonName, loading }) {

  const [loadedImage, setLoadImage] = React.useState(false)
  const [style, trigger] = useWiggle({ x: 2, y: -2, scale: 0.9 });

  React.useEffect(() => {
    setLoadImage(false)
  }, [pokemonImageUrl])

  const handleLoadedImage = () => {
    setLoadImage(true)
  }

  

  const image = <animated.div onMouseEnter={trigger} style={style}>
                 <img src={pokemonImageUrl} className="illustration"
                    alt={"Illustration of " + pokemonName} 
                    onLoad={handleLoadedImage} />
                </animated.div>

  const placeholder = <img src="/logo512.png" className="illustration"
    alt="Illustration click to change Pokemon" 
    />

  return (
    <>
        {(loading && !loadedImage) &&
            placeholder
        }
        {!loading &&
            image
        }
    </>
  )
}
