import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import { useState, useEffect } from 'react';


export default function PortfolioListItem({portfolio}) {
    const [total, setTotal] = useState([])
    const url= `/portfolio/${portfolio._id}`
    useEffect(() => {
        const sum = portfolio.coins.reduce(function(r,a) {
            return r + a.usd*a.quantity;
        }, 0)
        setTotal(sum)
    }, [portfolio])
    return(
        <>
            <Col><input type="radio" id="html" name="fav_language" value="HTML" checked={portfolio.isDefault? true:false}/></Col>
            <Col><Link to={{
            pathname: url,
            state: { portfolio },
          }}>{portfolio.name}</Link></Col>
            <Col>{total}</Col>
            <Col>DELETE BUTTON</Col>
        </>
    )
}