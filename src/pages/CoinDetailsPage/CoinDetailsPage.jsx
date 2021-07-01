import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as coinsAPI from '../../utilities/coins-api'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CoinDetails from '../../Components/CoinDetails/CoinDetails';

export default function CoinDetailsPage( {setLoading} ) {
    const [coin, setCoin] = useState([])
    const { id } = useParams()
    const [showDetails, setShowDetails] = useState()

    useEffect(() => {
        async function getCoin() {
			setLoading(true);
			const details = await coinsAPI.getOne(id);
			console.log('coinList is => ',details)
			setCoin(details)
			setLoading(false);
		}
		getCoin();
	}, [id]);

    useEffect(() => {
        if (coin.id !== undefined) {
            setShowDetails(<CoinDetails coin={coin} />)
        }
    }, [coin])

    return(
        <>
            <h1>Coin Details</h1>
            {showDetails}
        </>
    )
}