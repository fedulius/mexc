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
        avgPriceList.push((priceSum / count).toFixed(6));
        count = 0;
        priceSum = 0;
      }
    }
    
    return avgPriceList;
  }
  
  
  calculatePercentDiffer(priceList) {
  
  }
}

module.exports = KlineWorker;