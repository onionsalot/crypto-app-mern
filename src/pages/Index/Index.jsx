import { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import CoinList from '../../Components/CoinList/CoinList'
import * as coinsAPI from '../../utilities/coins-api'



export default function Index() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
		async function getCoins() {
			console.log('ello mate');
			const coinList = await coinsAPI.getAll();
			console.log('coinList is => ',coinList)
			setCoins(coinList)
		}
		getCoins();
	}, []);
	return (
		<main>
			<h1>Index</h1>
            <CoinList coins={coins}/>
		</main>
	);
}