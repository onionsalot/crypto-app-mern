import CoinListItem from '../CoinListItem/CoinListItem'


export default function CoinList({coins}) {
    console.log(coins)
    const coinItem = coins.map((coin) => (
        <CoinListItem coin={coin} />
      ));

	return (
		<main>
			<h1>CoinList</h1>
            {coinItem}
		</main>
	);
}