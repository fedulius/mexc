class Screener {

  #coinMap = new Map();
  #mexcApi = null;
  #klineWorker = null;

  #searchSettings = {
    minVolume: 0,
    maxVolume: 0,
    orderTypes: ['LIMIT', 'MARKET']
  }

  constructor(searchSettings, mexcApi, klineWorker) {
    this.#searchSettings = searchSettings;
    this.#mexcApi = mexcApi;
    this.#klineWorker = klineWorker;
  }

  main() {
    const fullCoinList = this.#getFullCoinList();
    if (fullCoinList.status === 'error') {
      return fullCoinList.res
    }

    this.#sortValidCoin(fullCoinList.res);
    this.#priceScreener(this.#coinMap);
    return this.#coinMap;
  }

  #getFullCoinList() {  //Полный список пар
    return  this.#mexcApi.getPairInfoList([]);
  }

  #sortValidCoin(fullCoinList) {  //Оставить монеты подходящие под первичные параметры.
    const coinListLength = fullCoinList.symbols.length;

    for (let i = 0; i < coinListLength; i++) {
      const coin = fullCoinList.symbols[i];

      const includeCheck = this.#searchSettings.orderTypes.reduce((accumulator, current) => accumulator && coin.orderTypes.includes(current), true);

      if (coin.quoteAsset === 'USDT'
        && !this.#coinMap.has(coin.symbol)
        && coin.status === 'ENABLED'
        && includeCheck
        && coin.isSpotTradingAllowed
      ) {
        this.#coinMap.set(coin.symbol, coin);
      }
    }

    let avgPriceList = this.#mexcApi.getAverage24hPrice();
    avgPriceList = avgPriceList.status === 'ok' ? avgPriceList.res : avgPriceList;

    const avgPriceListLength = avgPriceList.length;

    for (let i = 0; i < avgPriceListLength; i++) {
      const coinInfo = avgPriceList[i];
      if (!this.#coinMap.has(coinInfo.symbol)) {
        continue;
      }

      const volumeUsdt = parseFloat(coinInfo.lastPrice) * parseFloat(coinInfo.volume);

      if (volumeUsdt < this.#searchSettings.minVolume || volumeUsdt > this.#searchSettings.maxVolume) {
        this.#coinMap.delete(coinInfo.symbol);
      }
    }

  }

  #priceScreener(coinMap, interval, limit) {

    if (coinMap.size === 0) {
      return;
    }

    coinMap.forEach(coin => {
      let klineCoinInfo = this.#mexcApi.getKlineInfoList(coin.symbol, '5m', {limit: 10});
      
      if (klineCoinInfo.status === 'error') {
        return;
      }
      
      const length = klineCoinInfo.res.length;
      let lowPriceList = [];
      let highPriceList = [];
      
      for (let i = 0; i < length; i++) {
        lowPriceList.push(klineCoinInfo.res[i][3]);
        highPriceList.push(klineCoinInfo.res[i][2]);
      }
      console.log(coin.symbol);
      console.log(this.#klineWorker.getAveragePriceList(lowPriceList, {pricesInRow: 3}));
    });
    

  }

}

module.exports = Screener;