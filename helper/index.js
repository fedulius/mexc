module.exports = {
  mexcApi: (client) => new (require('./MexcApi'))(client)
}