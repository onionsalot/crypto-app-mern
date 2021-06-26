// import './App.css';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as coinsAPI from '../../utilities/coins-api'

export default function CoinDetailsPage() {
    const [coin, setCoin] = useState([])
    const { id } = useParams()
    const [loading, setLoading] = useState(true)

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

    return(
        <h1>{coin.name}</h1>
    )
}