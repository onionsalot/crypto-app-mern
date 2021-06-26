import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import Async, { makeAsyncSelect } from 'react-select/async';
import AsyncSelect from 'react-select/async';
import * as coinsAPI from '../../utilities/coins-api'

export default function NavBar({ user, setUser }) {
	const [selectedOption, setSelectedOption] = useState(null)
	const [options, setOptions] = useState([])

	useEffect(() => {
		async function getCoins() {
			const searchList = await coinsAPI.getSearch();
			setOptions(searchList)
		}
		getCoins();
	}, []);
	function handleLogOut() {
		// Delegate to the users-service
		userService.logOut();
		// Update state will also cause a re-render
		setUser(null);
	}
	// const options = [
	// 	{ value: 'chocolate', label: 'Chocolate' },
	// 	{ value: 'strawberry', label: 'Strawberry' },
	// 	{ value: 'vanilla', label: 'Vanilla' },
	//   ];
	const filterColors = (inputValue) => {
		return options.filter(i =>
		  i.label.toLowerCase().includes(inputValue.toLowerCase())
		);
	  };

	const handleSelect = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

	  function handleChange(evt) {
		setSelectedOption({...selectedOption, [evt.target.name]: evt.target.value })
	  };

	return (
		<nav>
			<Link to='/'>Home</Link>
			&nbsp; | &nbsp;
			<Link to='/portfolio'>Portfolio</Link>
			&nbsp; | &nbsp;
			<span>{user.name}</span>
			&nbsp; | &nbsp;
			<Link to='' onClick={handleLogOut}>
				Log Out
			</Link>
			&nbsp; | &nbsp;

			<AsyncSelect cacheOptions defaultOptions loadOptions={handleSelect} />
		</nav>
	);
}
