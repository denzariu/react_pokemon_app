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
            </div>
            
        </>
    );
}

export default Ability;
