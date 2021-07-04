import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import parse from 'html-react-parser';
import star from "../../images/star.png"
import star_light from "../../images/star_light.png"
import { Link } from "react-router-dom"
import { useEffect } from 'react';
import { useState } from 'react';
import './CoinDetails.css';

export default function CoinDetails({coin, portfolioCoins}) {
    const priceDetails = coin.market_data
    const image = coin.image.small
    const fav = `/portfolio/add/${coin.id}`  
    const [isFav, setIsFav] = useState(false)

    useEffect(() =>{
      if (portfolioCoins.length) {
        const favCheck = portfolioCoins.includes(coin.id)
        setIsFav(favCheck)
      }
    },[portfolioCoins, coin])
    
    return(
        <>
            <Row>
                <Col><img src={image} alt="coin" /><h2><Link to={fav}>{isFav? <img src={star_light} alt="fav" className="favicon"/>:<img src={star} alt="fav" className="favicon"/>}</Link>{coin.name}<span className="smol">{coin.symbol}</span></h2></Col>
                <Col>
                    Current Price: <span className="b"><h5>${priceDetails.current_price.usd < 1 ? priceDetails.current_price.usd : priceDetails.current_price.usd.toLocaleString('en', { minimumFractionDigits: 2 })}</h5></span> <br />
                    Last Hour: <span className={priceDetails.price_change_percentage_1h_in_currency.usd > 0 ? "green b":"red b"}>{priceDetails.price_change_percentage_1h_in_currency.usd ? (priceDetails.price_change_percentage_1h_in_currency.usd.toFixed(2)):(null)}
                    </span>&nbsp;%<br />
                    Last Day: <span className={priceDetails.price_change_percentage_24h_in_currency.usd > 0 ? "green b":"red b"}>{priceDetails.price_change_percentage_24h_in_currency.usd ? (priceDetails.price_change_percentage_24h_in_currency.usd.toFixed(2)):(null)}
                    </span>&nbsp;%
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col>
                    Circulating Supply: 
                        <span className="b">
                        {priceDetails.circulating_supply ? ((priceDetails.circulating_supply).toLocaleString('en')):(null)}</span><br />
                    Market Cap: 
                        <span className="b">
                        {priceDetails.market_cap.usd ? ((priceDetails.market_cap.usd).toLocaleString('en')):(null)}</span>
                </Col>
                <Col>
                    Volume: 
                        <span className="b">
                        {priceDetails.total_volume.usd ? ((priceDetails.total_volume.usd).toLocaleString('en')):(null)}</span>
                </Col>
                <Col>
                    24 Hour High: 
                        <span className="b">
                        ${priceDetails.high_24h.usd ? ((priceDetails.high_24h.usd).toLocaleString('en')):(null)}</span> <br />
                    24 Hour Low: 
                        <span className="b">
                        ${priceDetails.low_24h.usd ? ((priceDetails.low_24h.usd).toLocaleString('en')):(null)}</span> <br />
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col>
                    {parse(coin.description.en)}
                </Col>
            </Row>

        </>
    )
}