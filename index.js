const lib = require('./lib');
const helper = require('./helper');


(async function check() {
  // console.log(new Date(1720697100000));
  let user = lib.userRegistry.getUser(1);
  user.setClient();

  const client = user.getClient();
  let screenerInstance = lib.screener(user.getSearchSettings(), helper.mexcApi(client), helper.klineWorker);
  screenerInstance.main();
  // console.log(helper.mexcApi(client).getCurrentPrice('WBRGEUSDT'));


  // user.setSearchSettings(100000, 1000000)
  // user.setSearchInterval();

  // setInterval(() => {
  //   lib.trade(user).hardTrade('WBRGEUSDT');
  // }, 2000);

  // setTimeout(() => {
  //   user.clearSearchInterval();
  // }, 6500);


  // let singleRes = client.exchangeInfo([]);
  // console.log(singleRes.symbols);

  // const order = client.newOrderTest("BTCUSDT", "BUY", "MARKET", {
  //   timeInForce: "GTC",
  //   quantity: 91
  //   // quoteOrderQty: 5.1
  // });
  //
  // console.log(order);
})();


// const singleRes = client.exchangeInfo(/*{symbols:"BTCUSDT,COLLEUSDT"}*/[]);
// console.log(singleRes);
//
// const singleResLength = singleRes.symbols.length;
//
// let confirmPairs = new Map();

// 55


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
