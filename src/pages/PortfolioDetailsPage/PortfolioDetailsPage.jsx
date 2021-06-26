import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import * as portfoliosAPI from '../../utilities/portfolios-api'

export default function PortfolioDetailsPage() {
    const [myPortfolio, setMyPortfolio] = useState({})
    const [error, setError] = useState("")
    const {id} = useParams();
    const [coins, setCoins] = useState([])
    useEffect(() => {
        async function getPortfolio() {
            setError("")
            const portfolio = await portfoliosAPI.getOne(id)
            setMyPortfolio(portfolio)
            setError(portfolio.error)
            setCoins(portfolio.coins.length ? (
                portfolio.coins.map((coin) => <li>{coin}</li>)
            ) : (null))
        }
        getPortfolio();
    }, [id])
    return(
        <>
            <h2>{error}</h2>
            <h1>{myPortfolio.name}</h1>
            <p>{myPortfolio._id}</p>
            {coins}
        </>
    )
}