import { useState, useEffect } from "react";
import PortfolioListItem from "../PortfolioListItem/PortfolioListItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MyModal from '../../Components/MyModal/MyModal';
import * as portfoliosAPI from '../../utilities/portfolios-api'


export default function PortfolioList({ portfolios, isDefault, setIsDefault }) {
  const [displayedPortfolios, setDisplayedPortfolios] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    setDisplayedPortfolios(
      portfolios.map((portfolio, key) => {
        return (
          <Row key={key}>
            <PortfolioListItem portfolio={portfolio} handleChange={handleChange} isDefault={isDefault} handleDelete={handleDelete}/>
          </Row>
        );
      })
    );
  }, [portfolios, isDefault]);

  function handleChange(e) {
      console.log(e.target.value)
      setIsDefault(e.target.value);
    setModalShow(true)

  }

  async function handleSubmit(e) {
    console.log('bloop')
    e.preventDefault();
    const data= {
        isDefault: true,
    }

    const update = await portfoliosAPI.update(data, isDefault);
    console.log(update)
    // setPortfolios([...portfolios, portfolioList])
  }

  async function handleDelete(e) {
    console.log('bloop')
    e.preventDefault();
    const deletedPortfolio = await portfoliosAPI.deleteOne(e.target.id.value)
    }

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

      <MyModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="Change Default"
        handleSubmit={handleSubmit}
      />
    </>
  );
}
