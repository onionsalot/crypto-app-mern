import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import AsyncSelect from "react-select/async";
import * as coinsAPI from "../../utilities/coins-api";
import "./NavBar.css"

export default function NavBar({ user, setUser }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  let history = useHistory();

  useEffect(() => {
    async function getCoins() {
      const searchList = await coinsAPI.getSearch();
      setOptions(searchList);
    }
    getCoins();
  }, []);
  function handleLogOut() {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }

  const filterColors = (inputValue) => {
    return options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const handleSelect = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 1000);
    });

  function handleChange(evt) {
	history.push(`/details/${evt.value}`);
	console.log('bloop', evt.value)
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      &nbsp; | &nbsp;
      <Link to="/portfolio">Portfolio</Link>
      &nbsp; | &nbsp;
      <span>{user.name}</span>
      &nbsp; | &nbsp;
      <Link to="" onClick={handleLogOut}>
        Log Out
      </Link>
      &nbsp; | &nbsp;
      <AsyncSelect
	  	className="select-bar"
        cacheOptions
        defaultOptions
        loadOptions={handleSelect}
        onChange={handleChange}
      />
    </nav>
  );
}
