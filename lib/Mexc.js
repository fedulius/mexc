const MexcHead = require('../dist/js/package')

class Mexc {
  
  static instance = null;
  
  #clientMap = new Map();
  
  #key = null;
  #secret = null;
  
  constructor(key, secret) {

    if (!Mexc.instance) {
      this.#key = key;
      this.#secret = secret;
      Mexc.instance = this;
    }
    return Mexc.instance;
  }
  
  getClient(userId) {
    const clientMap = this.#clientMap;
    
    if (!clientMap.has(userId)) {
      
      clientMap.set(userId, {
        client: new MexcHead.Spot(this.#key, this.#secret)
      })
    }
    
    return clientMap.get(userId).client;
  }
  
  
  #deleteClient(userId) {
    this.#clientMap.delete(userId)
  }
  
}

module.exports = Mexc;