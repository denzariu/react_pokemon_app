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
        <h1 className="home-container text-ui">Pokedenz</h1>
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
        <div className='home-container'>
            <div className="blue-squares-container-ui">
                <button className="blue-square-ui">
                    Pokedex
                </button>
                
                <Pagination
                gotoNextPage={nextPageUrl ? gotoNextPage : null}
                gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
                />
            </div>
            <div className="blue-squares-container-ui-smallres">
                <Pagination
                gotoNextPage={nextPageUrl ? gotoNextPage : null}
                gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
                />
                <button className="blue-square-ui-smallres" onClick={() => navigate('/')}>
                    <svg className="svg-menu-box" xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 25 25" fill="white">
                        <path className="svg-home" d="M10.618 11.36C10.6329 10.3236 11.4826 9.49406 12.5191 9.50412C13.5556 9.51418 14.389 10.36 14.3838 11.3966C14.3785 12.4331 13.5366 13.2705 12.5 13.27C11.4538 13.2601 10.6125 12.4063 10.618 11.36V11.36Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path className="svg-home" d="M4.06304 8.83949C3.72639 9.08082 3.64911 9.54936 3.89044 9.88601C4.13177 10.2227 4.60031 10.2999 4.93696 10.0586L4.06304 8.83949ZM9.243 6.04905L9.67996 6.65861L9.68078 6.65802L9.243 6.04905ZM15.756 6.04905L15.3182 6.65802L15.3191 6.65865L15.756 6.04905ZM20.0631 10.0587C20.3998 10.2999 20.8683 10.2226 21.1096 9.88595C21.3509 9.54927 21.2736 9.08074 20.9369 8.83945L20.0631 10.0587ZM7.132 11.36C7.132 10.9458 6.79621 10.61 6.382 10.61C5.96779 10.61 5.632 10.9458 5.632 11.36H7.132ZM6.382 15.181L7.132 15.1866V15.181H6.382ZM7.47311 17.8713L8.00735 17.3449H8.00734L7.47311 17.8713ZM10.147 19.0021L10.1415 19.7521H10.147V19.0021ZM14.853 19.0021V19.7521L14.8585 19.752L14.853 19.0021ZM17.5269 17.8713L18.0611 18.3977L17.5269 17.8713ZM18.618 15.181H17.868L17.868 15.1866L18.618 15.181ZM19.368 11.36C19.368 10.9458 19.0322 10.61 18.618 10.61C18.2038 10.61 17.868 10.9458 17.868 11.36H19.368ZM4.93696 10.0586L9.67996 6.65861L8.80604 5.43949L4.06304 8.83949L4.93696 10.0586ZM9.68078 6.65802C11.3649 5.44733 13.6341 5.44733 15.3182 6.65802L16.1938 5.44008C13.9865 3.85331 11.0125 3.85331 8.80522 5.44008L9.68078 6.65802ZM15.3191 6.65865L20.0631 10.0587L20.9369 8.83945L16.1929 5.43945L15.3191 6.65865ZM5.632 11.36V15.181H7.132V11.36H5.632ZM5.63202 15.1755C5.62309 16.3804 6.09319 17.5395 6.93888 18.3977L8.00734 17.3449C7.44088 16.77 7.126 15.9937 7.13198 15.1866L5.63202 15.1755ZM6.93888 18.3977C7.78458 19.256 8.9366 19.7432 10.1415 19.752L10.1525 18.2521C9.34546 18.2461 8.57381 17.9198 8.00735 17.3449L6.93888 18.3977ZM10.147 19.7521H14.853V18.2521H10.147V19.7521ZM14.8585 19.752C16.0634 19.7432 17.2154 19.256 18.0611 18.3977L16.9927 17.3449C16.4262 17.9198 15.6545 18.2461 14.8475 18.2521L14.8585 19.752ZM18.0611 18.3977C18.9068 17.5395 19.3769 16.3804 19.368 15.1755L17.868 15.1866C17.874 15.9937 17.5591 16.77 16.9927 17.3449L18.0611 18.3977ZM19.368 15.181V11.36H17.868V15.181H19.368Z" fill="#000000"/>
                    </svg>
                    <div className="menu-text">Home</div>
                </button>
            </div>
        </div>

        
        
    </>
  )
}
