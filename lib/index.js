module.exports = {
  user: (userId) => new (require('./User'))(userId),
  userRegistry: new (require('./UserRegistry')),
  trade:(client, tradeSettings) => new(require('./Trade'))(client, tradeSettings)
}