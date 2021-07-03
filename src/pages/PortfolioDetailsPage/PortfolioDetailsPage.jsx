import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as portfoliosAPI from "../../utilities/portfolios-api";
import PortfolioDetailsItem from "../../Components/PortfolioDetailsItem/PortfolioDetailsItem";
import Table from 'react-bootstrap/Table'
import MyModal from '../../Components/MyModal/MyModal';
import { useHistory } from 'react-router'

export default function PortfolioDetailsPage( {setLoading} ) {
  const [error, setError] = useState("");
  const {id} = useParams();
  const [coins, setCoins] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [deleteCoin, setDeleteCoin] = useState({
    portfolioId: "",
    coinId: "",
  })
  // const {
  //   state: { portfolio },
  // } = useLocation();
  const [portfolio, setPortfolio] = useState({})
  const history = useHistory()

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
        setCoins(
          portfolio.coins.length
            ? portfolio.coins.map((coin, idx) => 
              <PortfolioDetailsItem key={idx} coin={coin} portfolio={portfolio} setPortfolio={setPortfolio} setModalShow={setModalShow} setDeleteCoin={setDeleteCoin}/>)
            : null
        );
      }
    }
    setLayout()
  }, [portfolio])

  async function handleSubmit(e) {
      e.preventDefault();
      setModalShow(false)
      const deletedPortfolio = await portfoliosAPI.deleteCoin(deleteCoin)
      if (deletedPortfolio.success) {
        history.go(0)
      }
    }

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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {coins}
        </tbody>

      </Table>
      <MyModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="Delete Coin"
        handleSubmit={handleSubmit}
      />
    </>
  );
}
