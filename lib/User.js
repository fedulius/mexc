const Mexc = require('./Mexc');
const cred = require('../config/mexcCredentianls');
const coinListUpdate = require('./coinListUpdate');

class User {
  
  #meta = {
    id: 0,
    logging: false,
    mexcClient: null,
    userState: 'BUY',                 //BUY(надо покупать) or SELL(надо продавать)
    searchIntervalId: 0,              //Идентификатор интервала по поиску пар
    tradeSettings: {                  //Надо продумать дэфолтные значения
      buyPercent: 0.1,                //процент, когда происходт покупка от нижнего края свечи
      sellPercent: 0.8,               //процент роста, когда происходит продажа
      emergencyExit: 0.0              //экстренный выход, в случаи падения цены
    },
    searchSettings: {
      minVolume: 50000,               // Минимальный объём торгов при поиске пар в USDT за сутки
      maxVolume: 1000000,             // Максимальный объём торгов при поиске пар в USDT за сутки
      orderTypes: ['LIMIT', 'MARKET'] // Возможный тип заявок у пары LIMIT,MARKET,LIMIT_MAKER,IMMEDIATE_OR_CANCEL,FILL_OR_KILL (Надо сделать инфо)
    }
  }
  
  constructor(userId) {
    this.#meta.id = userId;
  }

  setTradeSettings(buy, sell, emergencyExit) {
    this.#meta.tradeSettings = {
      buyPercent: buy,
      sellPercent: sell,
      emergencyExit: emergencyExit
    }
  }

  getTradeSettings() {
    return this.#meta.tradeSettings;
  }

  setSearchSettings(minVolume, maxVolume, orderTypes = ['LIMIT', 'MARKET']) {
    this.#meta.searchSettings = {
      minVolume: minVolume,
      maxVolume: maxVolume,
      orderTypes: orderTypes
    }
  }

  getSearchSettings() {
    return this.#meta.searchSettings;
  }
  
  setClient() {
    this.#meta.mexcClient = new Mexc(cred.apiKey, cred.apiSecret).getClient(this.#meta.id);
  }
  
  getClient() {
    return this.#meta.mexcClient;
  }
  
  setId(id) {
    this.#meta.id = id;
  }
  
  getId() {
    return this.#meta.id;
  }
  
  setLogged(logState = false) {
    this.#meta.logging = logState;
    return this.#meta.logging;
  }
  
    getLog() {
    return this.#meta.logging;
  }
  
  setState(state) {
    this.#meta.userState = state;
  }
  
  getState() {
    return this.#meta.userState;
  }

  setSearchInterval() {
    if (!this.#meta.mexcClient || this.#meta.searchIntervalId !== 0) {
      return;
    }

    /*new Promise((resolve) => {
      return*/this.#meta.searchIntervalId = setInterval((client,searchSettings) => {
        console.log('lol kek')
        const coinMap = new (require('./CoinListUpdate'))(client, searchSettings).main();
        console.log(coinMap.size);
      }, 1000, this.#meta.mexcClient, this.#meta.searchSettings);/*
    }).then((resolve) => this.#meta.searchIntervalId = resolve)*/

    console.log(this.#meta.searchIntervalId)
  }

  clearSearchInterval() {
    if (this.#meta.searchIntervalId === 0) {
      return;
    }

    clearInterval(this.#meta.searchIntervalId);
    this.#meta.searchIntervalId = 0;
  }
  
}

module.exports = User;