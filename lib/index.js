module.exports = {
  user: (userId) => new (require('./User'))(userId),
  userRegistry: new (require('./UserRegistry')),
}