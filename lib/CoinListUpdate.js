class CoinListUpdate {

  #client = null;
  #coinMap = new Map();

  #searchSettings = {
    minVolume: 0,
    maxVolume: 0,
    orderTypes: ['LIMIT', 'MARKET']
  }

  constructor(client, searchSettings) {
    this.#client = client;
    this.#searchSettings = searchSettings;
  }

  main() {
    const fullCoinList = this.#getFullCoinList();
    this.#sortValidCoin(fullCoinList);
    return this.#coinMap;
  }

  #getFullCoinList() {
    return this.#client.exchangeInfo([]);
  }

  #sortValidCoin(fullCoinList) {
    const coinListLength = fullCoinList.symbols.length;

    for (let i = 0; i < coinListLength; i++) {
      const coin = fullCoinList.symbols[i];

      const includeCheck = this.#searchSettings.orderTypes.reduce((accumulator, current) => accumulator && coin.orderTypes.includes(current), true);

      if (coin.quoteAsset === 'USDT'
        && !this.#coinMap.has(coin.symbol)
        && coin.status === 'ENABLED'
        && includeCheck
      ) {
        this.#coinMap.set(coin.symbol, coin);
      }
    }

    const avgPriceList = this.#client.ticker24hr();
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

}

module.exports = CoinListUpdate;