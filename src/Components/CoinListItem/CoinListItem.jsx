import '../CoinList/CoinList.css'
import { Link } from "react-router-dom"

export default function CoinListItem({coin}) {
  const url = `details/${coin.id}/`
	return (
    <tr>
        <Link to={url}>
        <td className="coin-name">{coin.rank}  {'   '} {coin.id} {coin.name}</td>
    </Link>
        <td> {coin.ticker} </td>
        <td> {coin.price.toLocaleString()} </td>
        <td> {coin.market_cap.toLocaleString()} </td>
        <td> {coin.price1h.toFixed(2)} </td>
        <td> {coin.price24h.toFixed(2)} </td>
        <td> {coin.price7d.toFixed(2)} </td>
        <td> {coin.price14d.toFixed(2)} </td>
      </tr>
	);
}