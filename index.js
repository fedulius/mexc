const UserRegistry = new (require('./lib/UserRegistry'))();

(function check() {
  let user = UserRegistry.getUser(1);
  user.setClient();
  
  const client = user.getClient()
  
  // let singleRes = client.exchangeInfo(/*{symbols:"BTCUSDT,COLLEUSDT"}*/[]);
  // console.log(singleRes);

  const order = client.newOrderTest("BTCUSDT", "BUY", "MARKET", {
    timeInForce: "GTC",
    quantity: 91
    // quoteOrderQty: 5.1
  });
  
  console.log(order);
})();


// const singleRes = client.exchangeInfo(/*{symbols:"BTCUSDT,COLLEUSDT"}*/[]);
// console.log(singleRes);
//
// const singleResLength = singleRes.symbols.length;
//
// let confirmPairs = new Map();

// for (let i = 0; i < singleResLength; i++) {
//   let coin = singleRes.symbols[i];
//
//   if (coin.quoteAsset === 'USDT'
//     && !confirmPairs.has(coin.symbol)
//     && coin.status === 'ENABLED'
//     && coin.orderTypes.includes('LIMIT')
//     && coin.orderTypes.includes('MARKET')
//   ) {
//     confirmPairs.set(coin.symbol, coin);
//   }
// }
//
// let middleCoinsList = [];
// const avgPriceList = client.ticker24hr();
// const avgPriceListLength = avgPriceList.length;
//
// for (let i = 0; i < avgPriceListLength; i++) {
//   const coinInfo = avgPriceList[i];
//
//   if (!confirmPairs.has(coinInfo.symbol)) {
//     continue;
//   }
//
//   const volumeUsdt = parseFloat(coinInfo.lastPrice) * parseFloat(coinInfo.volume);
//
//   if (volumeUsdt < 50000 || volumeUsdt > 1000000) {
//     confirmPairs.delete(coinInfo.symbol);
//   }
// }


// const order = client.newOrderTest("BTCUSDT", "BUY", "MARKET", {
//   timeInForce: "GTC",
//   quantity: 91
//   // quoteOrderQty: 5.1
// });
//
// console.log(order);
//
// let open = client.openOrders("WEFIUSDT");
// console.log(open)

// const sell = client.newOrder("WEFIUSDT", "SELL", "LIMIT", {price: 0.66, quantity: 82.79});

// client.cancelOpenOrders("WEFIUSDT");

// console.log(confirmPairs.size);
//
// console.log(middleCoinsList.length, 'ЩИТКИ');
// console.log(singleRes.symbols.length);
