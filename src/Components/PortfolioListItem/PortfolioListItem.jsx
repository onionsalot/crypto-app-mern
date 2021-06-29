import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import { useState, useEffect } from 'react';


export default function PortfolioListItem({portfolio, handleChange, isDefault}) {
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
            <Col><input type="radio" onChange={handleChange} name="isDefault" value={portfolio._id} checked={portfolio._id === isDefault? true:false}/></Col>
            <Col><Link to={{
            pathname: url,
            state: { portfolio },
          }}>{portfolio.name}</Link></Col>
            <Col>{total}</Col>
            <Col>DELETE BUTTON</Col>
        </>
    )
}