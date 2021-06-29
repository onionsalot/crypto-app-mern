import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as portfoliosAPI from "../../utilities/portfolios-api";
import { useLocation } from "react-router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

export default function PortfolioDetailsItem({ idx, coin, portfolio }) {
    const [form, setForm] = useState(
        {
            id: portfolio._id,
            quantity: coin.quantity,
        }
    )
    const [currentCoin, setCurrentCoin] = useState(coin)

  function handleChange(e) {
    setForm({...form, [e.target.name]: e.target.value});
  }

  async function handleUpdate(e) {
    console.log('bloop')
    e.preventDefault();

    const updatedCoin = await portfoliosAPI.addCoin(form, currentCoin.id);
    setCurrentCoin({...currentCoin, [currentCoin.quantity]: updatedCoin.quantity})
}

  return (
    <Row key={idx}>
      <Col>
        <Link to={`/details/${currentCoin.id}`}>{currentCoin.id}</Link>
      </Col>
      <Col>{currentCoin.usd}</Col>
      <Col>
        <DropdownButton id="dropdown-basic-button" title={currentCoin.quantity}>
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
      <Col>{Number(currentCoin.usd) * Number(currentCoin.quantity)}</Col>
    </Row>
  );
}
