import { useState, useEffect } from 'react'
import PortfolioListItem from '../PortfolioListItem/PortfolioListItem'


export default function PortfolioList({ portfolios }) {
    const [displayedPortfolios, setDisplayedPortfolios] = useState([])
    useEffect(() => {
        setDisplayedPortfolios(portfolios.map((portfolio) => {
            return <PortfolioListItem portfolio={portfolio} />
        }))
    }, [portfolios])

    return(
        <>
            {displayedPortfolios}
        </>
    )
}