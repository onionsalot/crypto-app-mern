import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
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
import ScrollToTop from '../../Components/ScrollToTop/ScrollToTop'
import AboutPage from '../AboutPage/AboutPage'

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
					<ScrollToTop />
					<Switch>
						<Route exact path="/">
							<Index setLoading={setLoading} user={user}/>
							{loading ? <Loading /> : null}
						</Route>
						<Route exact path='/details/:id'>
							<CoinDetailsPage setLoading={setLoading} user={user}/>
							{loading ? <Loading /> : null}
						</Route>
						<Route exact path='/about'>
							<AboutPage />
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
				// <AuthPage setUser={setUser} />
				<>
					<NavBar user={user} setUser={setUser} />
					<ScrollToTop />
					<Switch>
						<Route exact path="/">
							<Index setLoading={setLoading} user={user}/>
							{loading ? <Loading /> : null}
						</Route>
						<Route exact path='/details/:id'>
							<CoinDetailsPage setLoading={setLoading} user={user}/>
							{loading ? <Loading /> : null}
						</Route>
						<Route exact path='/about'>
							<AboutPage />
						</Route>
						{/* <Route exact path='/portfolio'>
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
						</Route> */}
						<Route exact path='/auth'>
							<AuthPage setUser={setUser} />
						</Route>
						<Redirect to='/auth' />
					</Switch>
				</>
			)}
		</main>
	);
}
