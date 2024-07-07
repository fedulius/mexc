const Mexc = require('./Mexc');
const cred = require('../config/mexcCredentianls');

class User {
  
  #meta = {
    id: 0,
    logging: false,
    mexcClient: null
  }
  
  constructor(userId) {
    this.#meta.id = userId;
  }
  
  setClient() {
    this.#meta.mexcClient = new Mexc(cred.apiKey, cred.apiSecret).getClient(this.#meta.id);
  }
  
  getClient() {
    return this.#meta.mexcClient;
  }
  
  setId(id) {
    this.#meta.id = id;
  }
  
  getId() {
    return this.#meta.id;
  }
  
  setLogged(logState = false) {
    this.#meta.logging = logState;
    return this.#meta.logging;
  }
  
    getLog() {
    return this.#meta.logging;
  }
  
  setState(controller, action, data = {}) {
    this.#meta.state = {
      controller,
      action,
      data
    };
  }
  
  getState() {
    return this.#meta.state;
  }
  
}

module.exports = User;