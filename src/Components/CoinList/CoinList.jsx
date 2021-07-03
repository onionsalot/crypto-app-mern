import CoinListItem from "../CoinListItem/CoinListItem";
import { useMediaQuery } from "react-responsive";
import "./CoinList.css";
import { useRef } from "react";
import { useEffect } from "react";

export default function CoinList({ coins, portfolioCoins }) {
  const top = useRef(null);

  const scrollToTop = () => {
    top.current?.scrollIntoView({ behavior: "smooth" });
  };

  const coinItem = coins.map((coin, idx) => (
    <CoinListItem key={idx} coin={coin} portfolioCoins={portfolioCoins}/>
  ));

  useEffect(() => {
    scrollToTop();
  }, [coinItem]);

  const Large = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 700 });
    return isDesktop ? children : null;
  };

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 699 });
    return isMobile ? children : null;
  };
  
  return (
    <>
      <div className="table-container">
      <div ref={top} />
        <table>
          <thead>
            <tr>
              <Large>
                <th className="head-col">Name</th>
                <th>Ticker</th>
                <th>Price</th>
                <th>Market Cap</th>
                <th>1hr</th>
                <th>24hr</th>
                <th>7d</th>
                <th>14d</th>
              </Large>
              <Mobile>
                <th className="head-col">Name</th>
                <th>Price</th>
                <th>Market Cap</th>
                <th>1hr</th>
                <th>24hr</th>
                <th>7d</th>
                <th>14d</th>
              </Mobile>
            </tr>
          </thead>
          <tbody>
            {coinItem}
          </tbody>
        </table>
      </div>
    </>
  );
}
