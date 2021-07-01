import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner'

export default function Loading() {
    const [waiting, setWaiting] = useState("")
    var delayInMilliseconds = 5000; //1 second

    useEffect(() => {
        let isMounted = true;               // note mutable flag
        setTimeout(function() {
            if (isMounted) setWaiting(<p>Hmm this seems to be taking longer than average. Please reload page!</p>)
        }, delayInMilliseconds);
        return () => { isMounted = false }; // use cleanup to toggle value, if unmounted
      }, []);

    return(
        <>
            <br/>
            <br/>
            <br/>
            <br/>
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>

            <p>Loading...</p>
            {waiting}
        </>
    )
}