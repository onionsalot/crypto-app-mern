import CoinListItem from "../CoinListItem/CoinListItem";
import Table from "react-bootstrap/Table";
import './CoinList.css';

export default function CoinList({ coins, loading }) {
  console.log(coins);
  const coinItem = coins.map((coin) => <CoinListItem coin={coin} />);
  if (loading === true) {
    return <div>Loading ...</div>
  }
  return (
    <>
<div class="table-container">
  <table >
    <thead>
      <tr>
        <th>Name</th>
        <th>Ticker</th>
        <th>Price</th>
        <th>Market Cap</th>
        <th>1hr</th>
        <th>24hr</th>
        <th>7d</th>
        <th>14d</th>
        <th>Chart</th>
      </tr>
    </thead>
    <tbody>

        {coinItem}





    </tbody>

  </table>
</div>
    </>
  );
}
