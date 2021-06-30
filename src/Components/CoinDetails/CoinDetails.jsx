import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import parse from 'html-react-parser';


export default function CoinDetails({coin}) {
    const priceDetails = coin.market_data
    const image = coin.image.small
    return(
        <>
            <Row>
                <Col><img src={image} alt="coin" />{coin.name}</Col>
                <Col>
                    {priceDetails.current_price.usd} <br />
                    Last Hour: {priceDetails.price_change_percentage_1h_in_currency.usd} <br />
                    Last Day: {priceDetails.price_change_percentage_24h_in_currency.usd} 
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col>
                    Supply: <br />
                    Market Cap: {priceDetails.market_cap.usd}
                </Col>
                <Col>
                    Volume: {priceDetails.total_volume.usd}
                </Col>
                <Col>
                    24 Hour High: {priceDetails.high_24h.usd} <br />
                    24 Hour Low: {priceDetails.low_24h.usd} 
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