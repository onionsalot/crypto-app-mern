import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import parse from 'html-react-parser';
import star from "../../images/star.png"
import { Link } from "react-router-dom"
import './CoinDetails.css';

export default function CoinDetails({coin}) {
    const priceDetails = coin.market_data
    const image = coin.image.small
    const fav = `/portfolio/add/${coin.id}`
    return(
        <>
            <Row>
                <Col><img src={image} alt="coin" /><h2><Link to={fav}><img src={star} alt="fav" className="favicon"/></Link>{coin.name}<span className="smol">{coin.symbol}</span></h2></Col>
                <Col>
                    Current Price: <span className="b">${(priceDetails.current_price.usd).toLocaleString('en')}</span> <br />
                    Last Hour: <span className={priceDetails.price_change_percentage_1h_in_currency.usd > 0 ? "green b":"red b"}>                               {priceDetails.price_change_percentage_1h_in_currency.usd.toFixed(2)}
                    </span>&nbsp;%<br />
                    Last Day: <span className={priceDetails.price_change_percentage_24h_in_currency.usd > 0 ? "green b":"red b"}>{priceDetails.price_change_percentage_24h_in_currency.usd.toFixed(2)} 
                    </span>&nbsp;%
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col>
                    Circulating Supply: <span className="b">{(priceDetails.circulating_supply).toLocaleString('en')}</span><br />
                    Market Cap: <span className="b">{(priceDetails.market_cap.usd).toLocaleString('en')}</span>
                </Col>
                <Col>
                    Volume: <span className="b">{(priceDetails.total_volume.usd).toLocaleString('en')}</span>
                </Col>
                <Col>
                    24 Hour High: <span className="b">${(priceDetails.high_24h.usd).toLocaleString('en')}</span> <br />
                    24 Hour Low: <span className="b">${(priceDetails.low_24h.usd).toLocaleString('en')}</span>
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