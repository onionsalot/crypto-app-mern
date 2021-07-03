import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as coinsAPI from '../../utilities/coins-api'
import * as portfolioAPI from '../../utilities/portfolios-api'
import CoinDetails from '../../Components/CoinDetails/CoinDetails';

export default function CoinDetailsPage( {setLoading, user} ) {
    const [coin, setCoin] = useState([])
    const { id } = useParams()
    const [showDetails, setShowDetails] = useState()
	const [portfolioCoins, setPortfolioCoins] = useState([])

    useEffect(() => {
        async function getCoin() {
			setLoading(true);
			const details = await coinsAPI.getOne(id);
            if (user) {
				const portfolios = await portfolioAPI.getFavs();
				console.log(portfolios)
				setPortfolioCoins(portfolios.uniqueArray)
			}
			setCoin(details)
			setLoading(false);
		}
		getCoin();
	}, [id]);

    useEffect(() => {
        if (coin.id !== undefined) {
            setShowDetails(<CoinDetails coin={coin} portfolioCoins={portfolioCoins}/>)
        }
    }, [coin])

    return(
        <>
            <h3>Coin Details</h3>
            {showDetails}
        </>
    )
}