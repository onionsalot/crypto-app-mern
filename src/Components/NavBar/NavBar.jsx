import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import AsyncSelect from "react-select/async";
import * as coinsAPI from "../../utilities/coins-api";
import "./NavBar.css";

export default function NavBar({ user, setUser }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [defaultOptions, setDefaultOptions] = useState([]);
  const [options, setOptions] = useState([]);
  let history = useHistory();

  useEffect(() => {
    async function getCoins() {
      const defaultList = await coinsAPI.getDefault();
      setDefaultOptions(defaultList);
      console.log(defaultList);
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
  }

  const Large = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 580 });
    return isDesktop ? children : null;
  };

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 579 })
    return isMobile ? children : null
  }

  return (
    <div className="NavBar">
      <Large>
        <div className="top-title">
          <h2>©&nbsp;BootstrapMarketCap</h2>
          <div>
            <span>Logged in as: {user.name} </span>
            <span className="logout">
              <Link to="" onClick={handleLogOut}>
                (Log Out)
              </Link>
            </span>
          </div>
        </div>
        <nav>
          <div className="nav-L">
            <Link to="/">Home</Link>
            &nbsp; | &nbsp;
            <Link to="/portfolio">Portfolio</Link>
            &nbsp; | &nbsp;
            <Link to="/portfolio">About</Link>
          </div>
          <div className="nav-R">
            <AsyncSelect
              className="select-bar"
              cacheOptions
              defaultOptions={defaultOptions}
              loadOptions={handleSelect}
              onChange={handleChange}
            />
          </div>
        </nav>
      </Large>


      <Mobile>
        <div className="top-title">
          <h2>©&nbsp;BootstrapMarketCap</h2>
        </div>
        <nav>
          <div >
            <Link to="/">Home</Link>
            &nbsp; | &nbsp;
            <Link to="/portfolio">Portfolio</Link>
            &nbsp; | &nbsp;
            <Link to="/portfolio">About</Link>
            &nbsp; | &nbsp;
            {user.name} <Link to="" onClick={handleLogOut}>
                (Log Out)
              </Link>
          </div>
          <div >
            <AsyncSelect
              className="select-bar"
              cacheOptions
              defaultOptions={defaultOptions}
              loadOptions={handleSelect}
              onChange={handleChange}
            />
          </div>
        </nav>
      </Mobile>
    </div>
  );
}
