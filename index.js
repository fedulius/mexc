const lib = require('./lib');
const scheduler = require('./scheduler');


(async function check() {
  let user = lib.userRegistry.getUser(1);

  user.setClient();
  // user.setSearchSettings(100000, 1000000);
  // user.setSearchInterval();
  
  
  setInterval(() => {
    lib.trade(user.getClient(), user.getTradeSettings()).hardTrade('DAVINCIUSDT');
  }, 3000);

  // setTimeout(() => {
  //   user.clearSearchInterval();
  // }, 6500);

  // const client = user.getClient();
  
  // let singleRes = client.exchangeInfo(/*{symbols:"BTCUSDT,COLLEUSDT"}*/[]);
  // console.log(singleRes);

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

55


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
