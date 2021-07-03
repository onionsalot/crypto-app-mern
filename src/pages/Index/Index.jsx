import { useState, useEffect } from 'react';
import CoinList from '../../Components/CoinList/CoinList'
import Pagination from '../../Components/Pagination/Pagination'
import * as coinsAPI from '../../utilities/coins-api'
import * as portfolioAPI from '../../utilities/portfolios-api'



export default function Index( {setLoading, user} ) {
    const [coins, setCoins] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [coinsPerPage, setCoinsPerPage] = useState(50);
	const [portfolioCoins, setPortfolioCoins] = useState([])

    useEffect(() => {
		async function getCoins() {
			setLoading(true);
			const coinList = await coinsAPI.getAll();
			if (user) {
				const portfolios = await portfolioAPI.getFavs();
				if (portfolios.success) {
					setPortfolioCoins(portfolios.uniqueArray)
				}
			}
			setCoins(coinList)
			setLoading(false);
		}
		getCoins();
	}, []);

	// Get current coins
	const indexOfLastCoin = currentPage * coinsPerPage;
	const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
	const currentCoins = coins.slice(indexOfFirstCoin, indexOfLastCoin)

	function paginate(pageNumber) {
		setCurrentPage(pageNumber)
	}
	
	return (
		<main>
				<Pagination coinsPerPage={coinsPerPage} totalCoins={coins.length} paginate={paginate} currentPage={currentPage}/>

            <CoinList coins={currentCoins} portfolioCoins={portfolioCoins} />
		</main>
	);
}