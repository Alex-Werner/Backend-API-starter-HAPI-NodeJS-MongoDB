const config = require('./config');
const startServer = require('./utils/startServer');
const createCustomLogger = require('./utils/createCustomLogger');

const environment = process.env.CONTEXT || 'dev';
if(!process.env.NATS_URL){
  environment === 'prod'
      ? process.env.NATS_URL = 'nats://broker-nats:4222'
      : process.env.NATS_URL = 'nats://127.0.0.1:4222';
}
const logger = createCustomLogger();
startServer.call({logger}, config)
