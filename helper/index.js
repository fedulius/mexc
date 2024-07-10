module.exports = {
  mexcApi: (client) => new (require('./MexcApi'))(client),
  klineWorker: new (require('./KlineWorker'))
}