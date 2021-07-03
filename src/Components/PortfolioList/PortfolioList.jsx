import { useState, useEffect } from "react";
import PortfolioListItem from "../PortfolioListItem/PortfolioListItem";
import Table from 'react-bootstrap/Table'
import MyModal from '../../Components/MyModal/MyModal';
import * as portfoliosAPI from '../../utilities/portfolios-api'
import MyToast from '../../Components/MyToast/MyToast';
import './PortfolioList.css';


export default function PortfolioList({ portfolios, isDefault, setIsDefault, setPortfolios }) {
  const [displayedPortfolios, setDisplayedPortfolios] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("")

  useEffect(() => {
    setDisplayedPortfolios(
      portfolios.map((portfolio, idx) => {
        return (
            <PortfolioListItem key={idx} portfolio={portfolio} handleChange={handleChange} isDefault={isDefault} deleteButton={deleteButton}/>
        );
      })
    );
  }, [portfolios, isDefault]);

  function handleChange(e) {
      setIsDefault(e.target.value);
      setModalShow(true)

  }

  async function handleSubmit(e) {
    e.preventDefault();
    setModalShow(false)
    const data= {
        isDefault: true,
    }

    const update = await portfoliosAPI.update(data, isDefault);
    if (update.success === true) {
      setMsg(<span className="toast-success">New DEFAULT portfolio set!</span>)
      setShow(true)
    } else {
      setMsg(<span className="toast-danger">ERROR setting default</span>)
      setShow(true)
    }
    // setPortfolios([...portfolios, portfolioList])
  }

  async function handleDelete(e) {
    e.preventDefault()
    setModalShowDelete(false)
    const deletedPortfolio = await portfoliosAPI.deleteOne(deleteId)
    if (deletedPortfolio.success === true) {
      setMsg(<span className="toast-success">Successfully REMOVED portfolio</span>)
      setShow(true)
    } else {
      setMsg(<span className="toast-danger">ERROR removing portfolio</span>)
      setShow(true)
    }
    setPortfolios(portfolios.filter(portfolio => portfolio._id !== deleteId))
  }

  function deleteButton(id) {
    setDeleteId(id)
    setModalShowDelete(true)
  }

  return (
    <>
      <Table striped bordered hover size="sm" className="PortfolioList">
        <thead>
          <tr>
            <th className='align-R'>Default</th>
            <th className='align-L'>Name</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedPortfolios}
        </tbody>

      </Table>

      <MyModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="Change Default"
        handleSubmit={handleSubmit}
      />

      <MyModal
        show={modalShowDelete}
        onHide={() => setModalShowDelete(false)}
        title="Delete Portfolio"
        handleSubmit={handleDelete}
      />

      <MyToast show={show} setShow={setShow} msg={msg}/>

    </>
  );
}
