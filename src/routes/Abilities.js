import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Pagination from "../components/Pagination";
import Ability from '../components/Ability';
import { v4 } from 'uuid'

export default function Abilities() {

  const [currentPageUrl, setCurrentPageUrl] = React.useState("https://pokeapi.co/api/v2/ability/")
  const [prevPageUrl, setPrevPageUrl] = React.useState()
  const [nextPageUrl, setNextPageUrl] = React.useState()

  const [abilities, setAbilities] = React.useState()
  const [loading, setLoading] = React.useState(true)
  const navigate = useNavigate();

  React.useEffect(() => {
    setLoading(true)

    let cancel
    axios.get(currentPageUrl, {
        cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
        setLoading(false)
        setPrevPageUrl(res.data.previous)
        setNextPageUrl(res.data.next)
        setAbilities(res.data.results.map( ability => [ability.url, ability.name] ))
        console.log(abilities)
    })

      return () => cancel()
}, [currentPageUrl])

function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
}

function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
}

function selectAbility(ability) {
    navigate('/abilities/' + ability)
}

/* TODO: segment in 50 abilities OR show them in small displays */

  return (
    <>

        <div id='abilities-container'>
            {
                abilities && abilities.map( ability => (
                    
                <button onClick={() => selectAbility(ability[1])} className='abilities-background-ui'>
                {
                    ability[1] ? ability[1].replace("-", " ").replace(/\b\w/g, x => x.toUpperCase()) : "None"
                }
                </button>
                ))
            }
        </div>
        
        <div className="blue-squares-container-ui">
            <button className="blue-square-ui" onClick={() => navigate('/')}>
                Pokedex
            </button>
            <Pagination
            gotoNextPage={nextPageUrl ? gotoNextPage : null}
            gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
            />
        </div>

        
        
    </>
  )
}
