module.exports = {
  userRegistry: new (require('./UserRegistry')),
  trade:(user) => new(require('./Trade'))(user),
  screener: (searchSettings, helper, kline) => new (require('./Screener'))(searchSettings, helper, kline),
}