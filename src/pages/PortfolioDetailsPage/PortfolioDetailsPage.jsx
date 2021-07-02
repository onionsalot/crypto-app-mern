import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as portfoliosAPI from "../../utilities/portfolios-api";
import PortfolioDetailsItem from "../../Components/PortfolioDetailsItem/PortfolioDetailsItem";
import Table from 'react-bootstrap/Table'


export default function PortfolioDetailsPage( {setLoading} ) {
  const [error, setError] = useState("");
  const {id} = useParams();
  const [coins, setCoins] = useState([]);
  // const {
  //   state: { portfolio },
  // } = useLocation();
  const [portfolio, setPortfolio] = useState({})

  useEffect(() => {
      async function getPortfolio() {
          setError("")
          setLoading(true)
          const currentPortfolio = await portfoliosAPI.getOne(id)
          setPortfolio(currentPortfolio)
          setError(currentPortfolio.error)
          setLoading(false)
      }
      getPortfolio();
  }, [id])

  useEffect(() => {
    async function setLayout() {
      if (portfolio.coins !== undefined) {
        console.log('blep')
        setCoins(
          portfolio.coins.length
            ? portfolio.coins.map((coin, idx) => 
              <PortfolioDetailsItem key={idx} coin={coin} portfolio={portfolio} setPortfolio={setPortfolio}/>)
            : null
        );
      }
    }
    setLayout()
  }, [portfolio])

  // useEffect(() => {
  //     console.log(currentPortfolio)
  //   setCoins(
  //     currentPortfolio.coins.length
  //       ? currentPortfolio.coins.map((coin, idx) => 
  //         <PortfolioDetailsItem key={idx} coin={coin} currentPortfolio={currentPortfolio} setCurrentPortfolio={setCurrentPortfolio}/>)
  //       : null
  //   );

  // }, [currentPortfolio]);

  return (
    <>
      <h4>{error}</h4>
      <h3>{portfolio.name}</h3>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {coins}
        </tbody>

      </Table>

    </>
  );
}
