const User = require('./User');

class UserRegistry {
  static instance = null;
  
  #userMap = new Map();
  
  constructor() {
    if (!UserRegistry.instance) {
      UserRegistry.instance = this;
    }
    return UserRegistry.instance;
  }
  
  getUser(userId) {
    const userMap = this.#userMap;
    
    if (!userMap.has(userId)) {
      userMap.set(userId, {
        instance: new User(userId)
      })
    }
    
    return userMap.get(userId).instance;
  }
  
  
  #clearUser(userId) {
    this.#userMap.delete(userId);
  }
}

module.exports = UserRegistry;