import React from 'react';
import axios from 'axios'



const Ability = ({ url }) => {

   
    
    const [abilityInfo, setAbilityInfo] = React.useState()
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {

        if (!url) return;

        //setLoading(true)
    
        let cancel
        axios.get(url, {
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            //setLoading(false)
            
           setAbilityInfo(res.data.name)
            console.log({name:res.data.name})
        })
    
        return () => cancel()
        
    }, [url])

    return (
        <>
            { abilityInfo &&
            <div className='abilities-background-ui'>
                {
                    abilityInfo ? abilityInfo : "None"
                }
            </div>
            }
        </>
    );
}

export default Ability;
