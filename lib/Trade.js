const {log} = require("node:util");
const {resetWatchers} = require("nodemon/lib/monitor/watch");

class Trade {

  #user = null;
  #state = null;
  #client = null;
  #tradeSettings = {}
  
  tradeMap = new Map();
  
  constructor(user) {
    this.#user = user;
    this.#client = user.getClient();
    this.#tradeSettings = user.getTradeSettings();
    this.#state = user.getState();
  }
  
  hardTrade(symbol) {
    let klines = this.getKlineInfo(symbol, '15m', 3);
    let {lowPrice, highPrice} = this.calculateMiddleValue(klines);
    if (lowPrice === 0.0 || highPrice === 0.0) {
      return 0;
    }
    const {buyPrice, sellPrice} = this.getPriceEndpoint(lowPrice, highPrice);
    let currPrice = this.#client.tickerPrice(symbol);
    console.log(this.#state);

    if (this.#state === 'BUY') {
      if (parseFloat(currPrice.price) >= lowPrice && parseFloat(currPrice.price) <= buyPrice ) {
        console.log('ПОКУПАЕМ ПОКУПАЕМ ПОКУПАЕМ');
        let order = this.openOrder(symbol, 'BUY', 'MARKET', {
          quantity: 10
        });
        console.log(lowPrice, buyPrice);
        Object.keys(order).length === 0 ? this.#user.setState('SELL') : this.#user.setState('BUY');
        return;
      }
    } else if (this.#state === 'SELL') {
      if (parseFloat(currPrice.price) > sellPrice) {
        console.log("ААААААААА БЛЯТЬ ПРОДАЁМ");
        let order = this.openOrder(symbol, 'SELL', 'MARKET', {
          quantity: 10,
          price: 10
        });
        Object.keys(order).length === 0 ? this.#user.setState('BUY') : this.#user.setState('SELL');
      }
    }

    console.log(currPrice);
  }
  
  calculateMiddleValue(klinesList) {
    let lowPrice = 0.0;
    let highPrice = 0.0;
    
    const klinesListLength = klinesList.length;
    
    for(let i = 0; i < klinesListLength; i++) {
      let klineInfoList = klinesList[i];
      if (klineInfoList.length === 0) {
        console.error('Нет информации в одной или нескольких свечках. Необходимо перепроверить данные');
        return {lowPrice:0, highPrice:0};
      }
      
      lowPrice += parseFloat(klineInfoList[3]);
      highPrice += parseFloat(klineInfoList[2]);
    }
    
    lowPrice = lowPrice / klinesListLength;   //Делю сумму нижних значений на кол-во свечек в выобрке, чтобы узнать среднее нижнее значение
    highPrice = highPrice / klinesListLength; //Делю сумму верхних значений на кол-во свечек в выобрке, чтобы узнать среднее верхнее значение
    
    return {lowPrice, highPrice};
  }
  
  getPriceEndpoint(lowPrice, highPrice) {
    const differ = highPrice - lowPrice;
    const buyDiffer = differ * this.#tradeSettings.buyPercent;
    const sellDiffer = differ * this.#tradeSettings.sellPercent;
    
    return {
      buyPrice: (lowPrice + buyDiffer).toFixed(4),
      sellPrice: (lowPrice + sellDiffer).toFixed(4)
    }
    
  }
  
    /**
   * client.klines(symbol: string, interval: string, options: any = { limit: 500 })
     options:{ startTime, endTime, limit}
   * interval :
       m :minute;
       h :Hour;
       d :day;
       w :week;
       M :month
       example : "1m"
   
   * startTime :
       start at
     
   * endTime :
       end at
     
   * limit :
       Number of returned data
       Default 500;
       max 1000;
   */
  getKlineInfo(symbol, interval, limit) {
    return this.#client.klines(symbol, interval, {limit: limit});
   /* INDEX  VALUE
    *   0	   Open time
    *   1	   Open
    *   2	   High
    *   3    Low
    *   4	   Close
    *   5	   Volume
    *   6	   Close time
    *   7	   Quote asset volume
    * */
  }
  
  openOrder(symbol, side, orderType, options) {
    return this.#client.newOrderTest(symbol, side, orderType, options);
/** client.newOrderTest(symbol: string, side: string, orderType: string, options: any = {})
  * options:{ timeInForce, quantity, quoteOrderQty, price, newClientOrderId, stopPrice, icebergQty, newOrderRespType, recvWindow}
  *
  *
  * side:
  *      Order side
  *      ENUM:
  *        BUY
  *        SELL
  *
  * orderType:
  *      Order type
  *      ENUM:
  *        LIMIT
  *        MARKET
  *        STOP_LOSS
  *        STOP_LOSS_LIMIT
  *        TAKE_PROFIT
  *        TAKE_PROFIT_LIMIT
  *        LIMIT_MAKER
  *
  * timeInForce :
  *      How long an order will be active before expiration.
  *      GTC: Active unless the order is canceled
  *      IOC: Order will try to fill the order as much as it can before the order expires
  *      FOK: Active unless the full order cannot be filled upon execution.
  *
  * quantity :
  *      target quantity
  *
  * quoteOrderQty :
  *      Specify the total spent or received
  *
  * price :
  *      target price
  *
  * newClientOrderId :
  *      A unique id among open orders. Automatically generated if not sent
  *
  * stopPrice :
  *      sed with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders
  *
  * icebergQty :
  *      Used with LIMIT, STOP_LOSS_LIMIT, and TAKE_PROFIT_LIMIT to create an iceberg order
  *
  * newOrderRespType :
  *      Set the response JSON. ACK, RESULT, or FULL;
  *      MARKET and LIMIT order types default to FULL, all other orders default to ACK
  *
  * recvWindow :
  *      Delay accept time
  *      The value cannot be greater than 60000
  *      defaults: 5000
  *
  */
  }
}

module.exports = Trade;