module.exports = {
  userRegistry: new (require('./UserRegistry')),
  trade:(user) => new(require('./Trade'))(user)
}