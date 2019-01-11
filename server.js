require('dotenv').config();
const _           = require('lodash');
const path        = require('path');
const SotaCore    = require('sota-core');
const logger      = require('sota-core').getLogger('TradeCrawler');
const network = require('./config/network')
const configFetcher = require('./app/crawlers/configFetcher')
const timer = 5 * 60 * 1000

const app = SotaCore.createServer({
  rootDir: path.resolve('.'),
  useSocket: false,
});

const processTokens = (tokens) => ({
  tokensByAddress: _.keyBy(tokens, 'address'),
  tokensBySymbol: _.keyBy(tokens, 'symbol')
})

const intervalUpdateConfig = () => {
  setInterval(() => {
    configFetcher.fetchConfigTokens((err, tokens) => {
      // console.log("_____________ token fetched", tokens)
      if(err) {
        return logger.error(err);
      }
      const processedTokens = processTokens(tokens)
      // global.GLOBAL_TOKEN = {...network.tokens, ...processedTokens.tokensBySymbol}
      global.TOKENS_BY_ADDR=ret.config.tokensByAddress
    })  
  }, timer);
}

configFetcher.fetchConfigTokens((err, tokens) => {
  if(err) {
    return logger.error(err);
  }
  const processedTokens = processTokens(tokens)
  // global.GLOBAL_TOKEN = {...network.tokens, ...processedTokens.tokensBySymbol}
  global.TOKENS_BY_ADDR=ret.config.tokensByAddress
  
  intervalUpdateConfig()
  app.start();
})

module.exports = app;
module.exports.SotaCore = SotaCore;
