import { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import Index from '../Index/Index';
import NavBar from '../../Components/NavBar/NavBar';
import CoinDetailsPage from '../CoinDetailsPage/CoinDetailsPage'
import PortfolioPage from '../PortolioPage/PortfolioPage'
import './App.css';
import PortfolioDetailsPage from '../PortfolioDetailsPage/PortfolioDetailsPage';
import PortfolioAddPage from '../PortfolioAddPage/PortfolioAddPage';
import Loading from '../../Components/Loading/Loading'

export default function App() {
	const [user, setUser] = useState(getUser());
	// const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(false)

	// useEffect(() => {
	// 	history.push('/')
	// }, [history, user]);

	// useEffect(() => {
	// 	async function getCoins() {
	// 		console.log('ello mate');
	// 		const coinList = await coinsAPI.getAll();
	// 		console.log('coinList is => ',coinList)
	// 		setCoins(coinList)
	// 	}
	// 	getCoins();
	// }, []);

	return (
		<main className='App'>
			{user ? (
				<>
					<NavBar user={user} setUser={setUser} />
					<Switch>
						<Route exact path="/">
							<Index setLoading={setLoading}/>
							{loading ? <Loading /> : null}
						</Route>
						<Route exact path='/details/:id'>
							<CoinDetailsPage setLoading={setLoading}/>
							{loading ? <Loading /> : null}
						</Route>
						<Route exact path='/portfolio'>
							<PortfolioPage user={user} setLoading={setLoading}/>
							{loading ? <Loading /> : null}
						</Route>
						<Route exact path='/portfolio/:id'>
							<PortfolioDetailsPage user={user} setLoading={setLoading}/>
							{loading ? <Loading /> : null}
						</Route>
						<Route exact path='/portfolio/add/:id'>
							<PortfolioAddPage user={user} setLoading={setLoading}/>
							{loading ? <Loading /> : null}
						</Route>
						<Redirect to='/' />
					</Switch>
				</>
			) : (
				<AuthPage setUser={setUser} />
			)}
		</main>
	);
}
