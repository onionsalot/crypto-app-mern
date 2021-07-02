import { Link } from "react-router-dom"
import './AboutPage.css'

export default function AboutPage() {
    return (
        <>
      <div className="about-holder">
        <h3> About </h3>
        <dl>
          <dt>What is this?</dt>
              <dd>A coin viewer and portfolio tracker <br/><br/>
              A simple and easy to use version of CoinMarketCap or CoinGecko! Lightweight and straight to the point without much in the way of adverts or distractions. Users can sign up to create and store their favorite Cryptos into a portfolio system to better track and manage their coin collection. The name (BootstrapMarketCap) is a play on the fact that the site was made primarily using bootstrap to resemble CMC! <br/><span className='align-right'>(Plus it rhymes)</span></dd>
          <dt>Getting Started:</dt>
              <dd>Viewing the pages are free! But if you want access to the portfolio system, you need to log in. Searching will display the top 7 searches of the day as well as anything not in the top 250 you'd like to view.</dd>
          <dt>Tech Used:</dt>
              <dd>
                  NodeJs, Express, Token Auth, MongoDB, Javascript, React, Css, Bootstrap
                  <ul>
                      <li>APIs used: CoinGecko API </li>
                      <li>Notable libraries: React-responsive, html-react-parser, React-Select</li>
                  </ul>
              </dd>
          <dt>Credits:</dt>
              <dd>
                  <table className="about-table">
                      <tbody>
                        <tr>
                            <td>
                                <h5>Trong Nguyen</h5>
                                Github: <a href="https://github.com/onionsalot" target="new">Link</a><br/>
                                LinkedIn: <a href="https://www.linkedin.com/in/trong-nguyen1008/" target="new">Link</a><br/>
                                Twitter: <a href="https://twitter.com/onionsalot" target="new">Link</a>
                            </td>            
                        </tr>
                      </tbody>
                  </table>
  
              </dd>
        </dl>
      </div>
      </>
    );
}