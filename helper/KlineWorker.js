class KlineWorker {

  constructor() {
  }

  getPairAveragePrice() {
  }
  
  /**
   * @param priceList :
   *        array of prices
   *        example [0,1];
   * @param options :
   *        {pricesInRow}
   *        pricesInRow: количество свечей используемых в меньшей выборке
   *        priceList.length - 1  - средняя цена по массиву
   *
   * return - от текущей цены к истории
   */
  getAveragePriceList(priceList = [], options) {
    const priceListLength = priceList.length;
    let avgPriceList = [];
    
    let count = 0;
    let priceSum = 0;
    
    for (let i = priceListLength - 1; i >= 0; i--) {
      count++;
      priceSum += parseFloat(priceList[i]);
      
      if (count === options.pricesInRow || i === 0) {
        avgPriceList.push((priceSum / count));
        count = 0;
        priceSum = 0;
      }
    }
    return avgPriceList;
  }
  
  getRate(priceList) {
    let priceListLength = priceList.length;
    if (priceListLength <= 1) {
      return 0;
    }

    const closingPrice = priceList[priceList.length - 1];
    let hedgehogRate = 1;

    for (let i = priceListLength - 2; i >= 0; i--) {
      let percentDiffer = (closingPrice - priceList[i]) / closingPrice;
      percentDiffer = percentDiffer >= 0 ? percentDiffer : percentDiffer * -1;

      hedgehogRate -= percentDiffer;
    }
    return hedgehogRate;
  }

  getPercentDiffer(lowPriceList, highPriceList) {
    const lowAvgPrice = this.getAveragePriceList(lowPriceList, {pricesInRow: lowPriceList.length})[0];
    const highAvgPrice = this.getAveragePriceList(highPriceList, {pricesInRow: highPriceList.length})[0];

    return (highAvgPrice - lowAvgPrice) / highAvgPrice * 100;
  }
}

module.exports = KlineWorker;