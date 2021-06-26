import '../CoinList/CoinList.css'
import { Link } from "react-router-dom"
import star from "../../images/star.png"

export default function CoinListItem({coin}) {
  const url = `details/${coin.id}/`
	return (
    <tr>
        <td className="coin-name">{coin.rank}<img src={star} alt="fav" className="favicon"/>  {'   '} <Link to={url}>{coin.name}</Link></td>
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