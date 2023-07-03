import React from 'react'
import axios from 'axios'
import {useParams} from "react-router-dom";
import { useNavigate } from 'react-router-dom';



const Ability = () => {

    const navigate = useNavigate();
    const {ability_name} = useParams();
    /* Too many requests */

    // React.useEffect(() => {
    //     console.log("1")
    //     if (!url) return;

    //     console.log("2")
    //     //setLoading(true)
    
    //     let cancel
    //     axios.get(url, {
    //         cancelToken: new axios.CancelToken(c => cancel = c)
    //     }).then(res => {
    //         //setLoading(false)
            
    //        //setAbilityInfo(res.data.name)
    //         //console.log(res.data.name)
    //     }).catch((error) => {
    //         console.log("error")
    //     })
    
    //     return () => cancel()
        
    // }, [url])

    return (
        <>
            <div className='ability-ui'>
                {
                    ability_name ? ability_name.replace("-", " ").replace(/\b\w/g, x => x.toUpperCase()) : "None"
                }
            </div>
            <div className="home-container">
                <div className="blue-squares-container-ui">
                    <button className="blue-square-ui" onClick={() => navigate('/abilities')}>
                        Abilities
                    </button>
                </div>
                <div className="blue-squares-container-ui-smallres">
                    <button className="blue-square-ui-smallres" onClick={() => navigate('/')}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="svg-menu-box" viewBox="0 0 24 24" fill="none">
                            <path className="svg-menu" fill-rule="evenodd" clip-rule="evenodd" d="M12.0986 19.001C8.69856 19.001 5.99856 16.729 6.00556 13.492C5.98675 13.1702 6.01573 12.8474 6.09156 12.534C6.22356 11.944 6.54156 10.79 6.79856 9.89004C6.94556 9.37404 7.90456 9.14504 8.44656 9.29004C9.18756 9.49004 9.63956 8.85904 9.79256 8.14404C9.95999 7.32193 10.2502 6.52972 10.6536 5.79404C11.6036 4.10104 13.2786 5.40904 14.4336 6.98104C14.9071 7.59132 15.4505 8.14408 16.0526 8.62804C18.4526 11.036 18.7756 15.268 16.2046 17.516C15.0632 18.4959 13.6027 19.0241 12.0986 19.001Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            
        </>
    );
}

export default Ability;
