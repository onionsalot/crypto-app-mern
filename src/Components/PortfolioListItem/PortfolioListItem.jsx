import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'

export default function PortfolioListItem({portfolio, handleChange, isDefault, deleteButton}) {
    const [total, setTotal] = useState([])
    const url= `/portfolio/${portfolio._id}`
    useEffect(() => {
        const sum = portfolio.coins.reduce(function(r,a) {
            return r + a.usd*a.quantity;
        }, 0)
        setTotal(sum)
    }, [portfolio])
    return(
        <tr>
            <td className='align-R'><input type="radio" onChange={handleChange} name="isDefault" value={portfolio._id} checked={portfolio._id === isDefault? true:false}/></td>
            <td className='align-L'><Link to={url}><h4>{portfolio.name}</h4></Link></td>
            {/* <td><Link to={{
            pathname: url,
            state: { portfolio },
          }}>{portfolio.name}</Link></td> */}
            <td>${total.toLocaleString('en')}</td>
            <td>
                <input hidden name="id" value={portfolio._id} readOnly/>
                <Button onClick={()=> deleteButton( portfolio._id)} type="submit">x</Button>
            </td>
        </tr>
    )
}