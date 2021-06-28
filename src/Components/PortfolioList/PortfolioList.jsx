import { useState, useEffect } from "react";
import PortfolioListItem from "../PortfolioListItem/PortfolioListItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function PortfolioList({ portfolios }) {
  const [displayedPortfolios, setDisplayedPortfolios] = useState([]);
  useEffect(() => {
    setDisplayedPortfolios(
      portfolios.map((portfolio, key) => {
        return (
          <Row key={key}>
            <PortfolioListItem portfolio={portfolio} />
          </Row>
        );
      })
    );
  }, [portfolios]);

  return (
    <>
      <Container>
        <Row>
          <Col>Default</Col>
          <Col>Name</Col>
          <Col>Total</Col>
          <Col>Action</Col>
        </Row>
        {displayedPortfolios}
        <Row>
          <Col>SAVE</Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}
