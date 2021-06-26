import { Link } from 'react-router-dom'

export default function PortfolioListItem({portfolio}) {
    const url= `/portfolio/${portfolio._id}`
    return(
        <>
            <Link to={url}>{portfolio.name}</Link>
        </>
    )
}