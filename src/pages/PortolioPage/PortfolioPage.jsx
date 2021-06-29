import './PortfolioPage.css';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PortfolioList from '../../Components/PortfolioList/PortfolioList'
import * as portfoliosAPI from '../../utilities/portfolios-api'
import { Button } from 'react-bootstrap'
import MyModal from '../../Components/MyModal/MyModal';


export default function PortfolioPage() {
    const [portfolios, setPortfolios]= useState([])
	  const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [isDefault, setIsDefault] = useState("");
    const [form, setForm] = useState({
        name: "",
      });

    useEffect(() => {
        async function getPortfolios() {
            setLoading(true);
            const portfolioList = await portfoliosAPI.getAll();
            console.log('PortfolioList is => ',portfolioList)
            setPortfolios(portfolioList)
            const defaultIndex = portfolioList.findIndex((e)=>e.isDefault ===true)
            if (defaultIndex !== -1) {
              setIsDefault(portfolioList[defaultIndex]._id)
            }
            console.log('defaultindex', defaultIndex)
            setLoading(false);
        }
        getPortfolios()
    },[])


    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value})
      }
    async function handleSubmit(e) {
        console.log('bloop')
        e.preventDefault();

        const portfolioList = await portfoliosAPI.create(form);
        setPortfolios([...portfolios, portfolioList])
      }

    return(
        <>
            <h1>Portfolio</h1>
            <nav>
            <Button variant="primary" onClick={() => setModalShow(true)}>+</Button>
            </nav>
            <PortfolioList portfolios={portfolios} isDefault={isDefault} setIsDefault={setIsDefault}/>


      <MyModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="Add Portfolio"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        form={form}
        setForm={setForm}
      />
        </>
    )
}