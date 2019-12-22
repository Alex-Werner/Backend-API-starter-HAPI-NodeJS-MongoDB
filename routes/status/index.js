const packageVersion = require('../../package.json').version;

module.exports = {
  method: 'GET',
  path: '/status',
  config: {
    description: 'Status endpoint',
    notes: 'Return the current status of the API',
    tags: ['api', 'status'],
    auth:false
  },
  handler: (request, h) => {
    const delay = Date.now() - request.info.received;
    const serverTime = Date.now();
    return { version: packageVersion, delay: `${delay} ms`, serverTime };
  },
};
