import React from 'react';
import axios from 'axios'



const Ability = ({ url, name }) => {

   
    
    const [abilityInfo, setAbilityInfo] = React.useState()
    const [loading, setLoading] = React.useState(true)

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
            { name &&
            <div className='abilities-background-ui'>
                {
                    name ? name : "None"
                }
            </div>
            }
        </>
    );
}

export default Ability;
