module.exports = {
  userRegistry: new (require('./UserRegistry')),
  trade:(user, helper) => new(require('./Trade'))(user, helper),
  screener: (searchSettings, helper, kline) => new (require('./Screener'))(searchSettings, helper, kline),
}