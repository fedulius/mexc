const {json} = require("node:stream/consumers");

class MexcApi {

  #client = null

  constructor(client) {
    this.#client = client;
  }

  /**
   * options:{symbol, symbols}
   * choose one parameter
   *
   * symbol :
   *      example "BNBBTC";
   *
   * symbols :
   *      array of symbol
   *      example ["BTCUSDT,BNBBTC"];
   *
   */
  getPairInfoList(symbols) {
    let object = {};

    if (Array.isArray(symbols)) {
      object = [];
    } else {
      object.symbol = symbols;
    }

    try {
      return {
        status: 'ok',
        statusCode: 500,
        res: this.#client.exchangeInfo(object)
      };
    } catch (e) {
      return {
        status: 'error',
        statusCode: e.statusCode,
        res: JSON.parse(e.body)
      };
    }
  }

  getCurrentPrice(symbol) {
    try {
      return {
        status: 'ok',
        statusCode: 500,
        res: this.#client.tickerPrice(symbol)
      }
    } catch (e) {
      return {
        status: 'error',
        statusCode: e.statusCode,
        res: JSON.parse(e.body)
      };
    }
  }

  getAverage24hPrice() {
    try {
      return {
        status: 'ok',
        statusCode: 500,
        res: this.#client.ticker24hr()
      }
    } catch (e) {
      return {
        status: 'error',
        statusCode: e.statusCode,
        res: JSON.parse(e.body)
      };
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
  getKlineInfoList(symbol, interval, options) {
    try {
      return {
        status: 'ok',
        statusCode: 500,
        res: this.#client.klines(symbol, interval, options)
      };
    } catch (e) {
      return {
        status: 'error',
        statusCode: e.statusCode,
        res: JSON.parse(e.body)
      };
    }
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

  /**
   * options:{ timeInForce, quantity, quoteOrderQty, price, newClientOrderId, stopPrice, icebergQty, newOrderRespType, recvWindow}
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
  openOrder(symbol, side, orderType, options) {
    try {
      return {
        status: 'ok',
        statusCode: 500,
        res: this.#client.newOrder(symbol, side, orderType, options)
      };
    } catch (e) {
      return {
        status: 'error',
        statusCode: e.statusCode,
        res: JSON.parse(e.body)
      };
    }
  }

  openTestOrder(symbol, side, orderType, options) {
    try {
      return {
        status: 'ok',
        statusCode: 500,
        res: this.#client.newOrderTest(symbol, side, orderType, options)
      };
    } catch (e) {
      return {
        status: 'error',
        statusCode: e.statusCode,
        res: JSON.parse(e.body)
      };
    }
  }

}

module.exports = MexcApi;