import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as portfoliosAPI from "../../utilities/portfolios-api";
import { useLocation } from "react-router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

export default function PortfolioDetailsItem({
  idx,
  coin,
  portfolio,
  setPortfolio,
}) {
  const [form, setForm] = useState({
    id: portfolio._id,
    quantity: coin.quantity,
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleUpdate(e) {
    console.log("bloop");
    e.preventDefault();

    const updatedPortfolio = await portfoliosAPI.addCoin(form, coin.id);
    console.log(portfolio);
    console.log(updatedPortfolio);
    updatedPortfolio.coins.forEach((e, idx) => {
      updatedPortfolio.coins[idx].usd = portfolio.coins[idx].usd;
      updatedPortfolio.coins[idx].usd_24h_change =
        portfolio.coins[idx].usd_24h_change;
    });
    setPortfolio(updatedPortfolio);
  }

  return (
    <Row key={idx}>
      <Col>
        <Link to={`/details/${coin.id}`}>{coin.id}</Link>
      </Col>
      <Col>{coin.usd}</Col>
      <Col>
        <DropdownButton id="dropdown-basic-button" title={coin.quantity}>
          <Dropdown.Header>
            <form autoComplete="off" onSubmit={handleUpdate}>
              <input
                type="number"
                name="quantity"
                placeholder="0"
                step="0.0001"
                min="0"
                value={form.quantity}
                onChange={handleChange}
              />
              <button type="submit">Update</button>
            </form>
          </Dropdown.Header>
        </DropdownButton>
      </Col>
      <Col>{Number(coin.usd) * Number(coin.quantity)}</Col>
    </Row>
  );
}
