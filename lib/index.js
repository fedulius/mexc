module.exports = {
  userRegistry: new (require('./UserRegistry')),
  trade:(user) => new(require('./Trade'))(user),
  screener: (searchSettings, mexcApi) => new (require('./Screener'))(searchSettings, mexcApi),
}