import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'


export default function PortfolioListItem({portfolio}) {
    const url= `/portfolio/${portfolio._id}`
    return(
        <>
            <Col>{portfolio.isDefault? "true":"false"}</Col>
            <Col><Link to={url}>{portfolio.name}</Link></Col>
            <Col>TOTAL</Col>
            <Col>DELETE BUTTON</Col>
        </>
    )
}