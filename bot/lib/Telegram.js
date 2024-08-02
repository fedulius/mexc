class Telegram {
  static instance = null;

  constructor() {
    if (Telegram.instance) {
      return Telegram.instance;
    }
    return Telegram.instance = new (require('node-telegram-bot-api'))(token, {polling: true});
  }

}

module.exports = Telegram;