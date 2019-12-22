const winston = require('winston');

module.exports = function createCustomLogger(bindings) {
  return winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
    transports: [
      new winston.transports.Console(),
    ]
  });
}
