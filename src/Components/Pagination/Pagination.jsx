import React from 'react'
import { Link } from 'react-router-dom'

export default function Pagination({ coinsPerPage, totalCoins, paginate }) {
    const pageNumbers= [];
    
    for(let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (

        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number}>
                        <Link to='/' onClick={() => paginate(number)}>{number}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )


}