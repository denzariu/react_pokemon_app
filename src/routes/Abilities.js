import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Abilities() {

  
  const [abilityID, setAbilityID] = React.useState("1");
  const [loading, setLoading] = React.useState(true)
  const navigate = useNavigate();

  React.useEffect(() => {
    setLoading(true)
    const newPokemon = "https://pokeapi.co/api/v2/ability/" + abilityID

    let cancel
    axios.get(newPokemon, {
        cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
        
    })

      return () => cancel()
}, [pokemonID, artwork])

  return (
    <>
        <div className="blue-squares-container-ui">
            <button className="blue-square-ui" onClick={() => navigate('/')}>
                Pokedex
            </button>
        </div>
        <div id="abilities-container">
            <div className='abilities-background-ui'>
            </div>
            <div className='abilities-background-ui'>
            </div>
            <div className='abilities-background-ui'>
            </div>
        </div>
    </>
  )
}
