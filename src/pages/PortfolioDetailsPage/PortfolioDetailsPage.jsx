import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as portfoliosAPI from "../../utilities/portfolios-api";
import { useLocation } from "react-router";
import PortfolioDetailsItem from "../../Components/PortfolioDetailsItem/PortfolioDetailsItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

export default function PortfolioDetailsPage() {
  const [error, setError] = useState("");
  // const {id} = useParams();
  const [coins, setCoins] = useState([]);
  const {
    state: { portfolio },
  } = useLocation();

  // useEffect(() => {
  //     async function getPortfolio() {
  //         setError("")
  //         const portfolio = await portfoliosAPI.getOne(id)
  //         setMyPortfolio(portfolio)
  //         setError(portfolio.error)
  //         setCoins(portfolio.coins.length ? (
  //             portfolio.coins.map((coin) => <li>{coin}</li>)
  //         ) : (null))
  //     }
  //     getPortfolio();
  // }, [id])
  useEffect(() => {
      console.log(portfolio)
    setCoins(
      portfolio.coins.length
        ? portfolio.coins.map((coin, idx) => 
          <PortfolioDetailsItem key={idx} coin={coin} portfolio={portfolio}/>)
        : null
    );

  }, [portfolio]);
  return (
    <>
      <h2>{error}</h2>
      <h1>{portfolio.name}</h1>
      <Container>
        <Row>
          <Col>Name</Col>
          <Col>Price</Col>
          <Col>Quantity</Col>
          <Col>Total</Col>
        </Row>
        {coins}

      </Container>

    </>
  );
}
