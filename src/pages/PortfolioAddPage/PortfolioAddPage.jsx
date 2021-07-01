import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as portfoliosAPI from '../../utilities/portfolios-api'
import './PortfolioAddPage.css'

export default function PortfolioAddPage( {setLoading} ) {
    const [portfolios, setPortfolios] = useState([])
    const { id } = useParams() // coin ID
    const [form, setForm] = useState(
        {
            id: null, // portfolio ID
            quantity: 0,
        }
    )

    useEffect(() =>{
        async function getPortfolios() {
            setLoading(true)
			const portfolioList = await portfoliosAPI.getAll();
			console.log('PortfolioList is => ',portfolioList)
            if (portfolioList.length > 0) {
                const defaultPortfolio = portfolioList.filter((e)=>e.isDefault === true)
                setForm({...form, id: defaultPortfolio[0]._id})
                setPortfolios(portfolioList)
            }
            setLoading(false)
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
        // setPortfolios([...portfolios, portfolioList])
        console.log(portfolioList)

    }

    return(
        <div className="PortfolioAddPage">
            <h1>Add: {id}</h1>
            <br />
            <br />
            <form autoComplete="off" onSubmit={handleSubmit}>
            <label >Choose a portfolio:</label>
            <select name="id" onChange={handleChange}>
                {portfolios.length !== 0 ? (portfolios.map((e, idx)=>{return <option key={idx} value={e._id} selected={e.isDefault?"selected":""}>{e.name}</option>})):(<option value={null} selected >NO PORTFOLIO MADE (Visit myPortfolios)</option>)}
            </select>

            <label>Amount Owned:</label>
            <input placeholder="0" step="0.0001" min="0" type="number" onChange={handleChange} name="quantity"/>
            <button type="submit" disabled={form.id === null? true:false}>Submit</button>
            </form>
        </div>
    )
}