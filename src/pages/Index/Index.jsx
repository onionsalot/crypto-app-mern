import { useState, useEffect } from 'react';
import CoinList from '../../Components/CoinList/CoinList'
import Pagination from '../../Components/Pagination/Pagination'
import * as coinsAPI from '../../utilities/coins-api'



export default function Index( {setLoading} ) {
    const [coins, setCoins] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [coinsPerPage, setCoinsPerPage] = useState(50);

    useEffect(() => {
		async function getCoins() {
			setLoading(true);
			const coinList = await coinsAPI.getAll();
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

            <CoinList coins={currentCoins} />
		</main>
	);
}