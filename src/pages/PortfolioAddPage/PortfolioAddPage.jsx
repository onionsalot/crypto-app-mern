import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as portfoliosAPI from '../../utilities/portfolios-api'

export default function PortfolioAddPage() {
    const [portfolios, setPortfolios] = useState([])
    const { id } = useParams()
    const [form, setForm] = useState(
        {
            id: "",
            quantity: 0,
        }
    )

    useEffect(() =>{
        async function getPortfolios() {
			const portfolioList = await portfoliosAPI.getAll();
			console.log('PortfolioList is => ',portfolioList)
            const defaultPortfolio = portfolioList.filter((e)=>e.isDefault === true)
            setForm({...form, id: defaultPortfolio[0]._id})
			setPortfolios(portfolioList)
        }
        getPortfolios()
    }, [])

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value})
        console.log(form)
    }

    async function handleSubmit(e) {
        console.log('bloop')
        e.preventDefault();

        const portfolioList = await portfoliosAPI.addCoin(form, id);
        setPortfolios([...portfolios, portfolioList])
    }

    return(
        <>
        <h1>Add: {id}</h1>
        <p>Current Price: xxxx </p>

        <form autoComplete="off" onSubmit={handleSubmit}>
        <label for="id">Choose a portfolio:</label>
        <select name="id" onChange={handleChange}>
            {portfolios.map((e)=>{return <option value={e._id} selected={e.isDefault?"selected":""}>{e.name}</option>})}
        </select>

        <label>Amount Owned:</label>
        <input placeholder="0" type="number" onChange={handleChange} name="quantity"/>
        <button type="submit">Submit</button>
        </form>
        </>
    )
}