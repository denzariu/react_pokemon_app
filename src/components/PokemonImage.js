import React from 'react'
//import logo from '../../public/logo192.png'





export default function PokemonImage({ pokemonImageUrl, loading }) {

  const [loadedImage, setLoadImage] = React.useState(false)

  React.useEffect(() => {
    setLoadImage(false)
  }, [pokemonImageUrl])

  const handleLoadedImage = () => {
    setLoadImage(true)
  }

  

  const image = <img src={pokemonImageUrl} className="illustration"
                    alt="Illustration click to change Pokemon" 
                    onLoad={handleLoadedImage} />

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
