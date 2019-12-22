const generateSessionToken = require('./methods/generateSessionToken');
module.exports = [
  {
    method: 'POST',
    path: '/auth/session/token',
    config: {
      description: 'Allow user to generate a new session token',
      tags: ['api', 'auth', 'session', 'token'],
      pre: [
        generateSessionToken(),
      ],
      auth: false
    },
    handler: (request, h) => {
      if (request.pre.user === 'undefined') {
        return h.continue;
      }
      return request.pre.user;
    },
  }];
