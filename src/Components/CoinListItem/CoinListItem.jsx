import '../CoinList/CoinList.css'
import { Link } from "react-router-dom"
import { useMediaQuery } from "react-responsive";
import star from "../../images/star.png"

export default function CoinListItem({coin}) {
  const url = `details/${coin.id}/`
  const fav = `portfolio/add/${coin.id}`

  const Large = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 700 });
    return isDesktop ? children : null;
  };

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 699 })
    return isMobile ? children : null
  }


	return (
    <tr>
      <Large>
        <td className="coin-name head-col">
          <div className="coin-L"><Link to={fav}><img src={star} alt="fav" className="favicon"/></Link>{coin.rank}</div>
            
            <div className="coin-R"><Link to={url}><img src={coin.image} alt="coin" className="coinImage"/>{coin.name}</Link></div>
            
        </td>
        <td> {coin.ticker} </td>
      </Large>
      <Mobile>
        <td className="coin-name head-col mob-view">
          <div className="rank-icon"><Link to={fav}><img src={star} alt="fav" className="favicon"/></Link>{coin.rank}</div>
          <div className="coin-icon"><img src={coin.image} alt="coin" className="coinImage"/></div>  
          <div className="coin-R"><Link to={url}>{coin.name}</Link></div>
          <div className="ticker">&nbsp;{coin.ticker}&nbsp;</div>
            
        </td>
      </Mobile>
        <td> {coin.price.toLocaleString()} </td>
        <td> {coin.market_cap.toLocaleString()} </td>
        <td className={coin.price1h >= 0? "green": "red"}> {coin.price1h ? (coin.price1h.toFixed(2)): (null)} </td>
        <td className={coin.price24h >= 0? "green": "red"}> {coin.price24h ? (coin.price24h.toFixed(2)): (null)} </td>
        <td className={coin.price7d >= 0? "green": "red"}> {coin.price7d ? (coin.price7d.toFixed(2)): (null)} </td>
        <td className={coin.price14d >= 0? "green": "red"}> {coin.price14d ? (coin.price14d.toFixed(2)): (null)} </td>
      </tr>
	);
}