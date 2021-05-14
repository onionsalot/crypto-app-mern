import '../CoinList/CoinList.css'

export default function CoinListItem({coin}) {
	return (
      <tr>
        <td className="coin-name">{coin.rank}  {'   '}  {coin.name}</td>
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