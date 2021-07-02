import React from "react";
import { Link } from "react-router-dom";
import "./Pagination.css";

export default function Pagination({
  coinsPerPage,
  totalCoins,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++) {
    pageNumbers.push(i);
  }

  function handleClick(e, number) {
    e.preventDefault();
    paginate(number);
  }

  return (
    <nav className="pagination">
      <ul>
        <li>
          {currentPage === 1 ? (
            <Link to="/" disabled>
              &laquo;&nbsp;&nbsp;
            </Link>
          ) : (
            <Link
              to="/"
              onClick={(e) => {
                const next = currentPage - 1;
                handleClick(e, next);
              }}
            >
              &laquo;&nbsp;&nbsp;
            </Link>
          )}
        </li>

        {pageNumbers.map((number) => (
          <li key={number}>
            <Link
              to="/"
              onClick={(e) => {
                handleClick(e, number);
              }}
              className={currentPage === number ? "current-page" : ""}
            >
              {number}
            </Link>
          </li>
        ))}

        <li>
          {currentPage >= pageNumbers.length ? (
            <Link to="/" disabled>
              &nbsp;&nbsp;&raquo;
            </Link>
          ) : (
            <Link
              to="/"
              onClick={(e) => {
                const next = currentPage + 1;
                handleClick(e, next);
              }}
            >
              &nbsp;&nbsp;&raquo;
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
