import { Link } from "react-router-dom";
import { useState } from "react";
import * as portfoliosAPI from "../../utilities/portfolios-api";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "./PortfolioDetailsItem.css"

export default function PortfolioDetailsItem({
  idx,
  coin,
  portfolio,
  setPortfolio,
  setModalShow,
  setDeleteCoin,
}) {
  const [form, setForm] = useState({
    id: portfolio._id,
    quantity: coin.quantity,
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleUpdate(e) {
    e.preventDefault();

    const updatedPortfolio = await portfoliosAPI.addCoin(form, coin.id);
    updatedPortfolio.addedQuantity.coins.forEach((e, idx) => {
      updatedPortfolio.addedQuantity.coins[idx].usd = portfolio.coins[idx].usd;
      updatedPortfolio.addedQuantity.coins[idx].usd_24h_change =
        portfolio.coins[idx].usd_24h_change;
    });
    setPortfolio(updatedPortfolio.addedQuantity);
  }

  return (
    <tr className="PortfolioDetailsItem">
      <th>
        <Link to={`/details/${coin.id}`}>{coin.id}</Link>
      </th>
      <th>{(coin.usd).toLocaleString('en')}</th>
      <th>
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
      </th>
      <th>{(Number(coin.usd) * Number(coin.quantity)).toLocaleString('en')}</th>
      <th><button onClick={()=> {
        setModalShow(true)
        setDeleteCoin({
          portfolioId: portfolio._id,
          coinId: coin.id,
        })
      }}>x</button></th>
    </tr>
  );
}
