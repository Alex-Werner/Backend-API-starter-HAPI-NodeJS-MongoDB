const fetchUser = require('./methods/fetchUser');
const createUser = require('./methods/createUser');
module.exports = [
  {
    method: 'GET',
    path: '/users/{_id}',
    config: {
      auth: 'jwt',
      description: 'Return a single user.',
      tags: ['api', 'user'],
      pre: [
        fetchUser(),
      ],
    },
    handler: (request, h) => {
      if (request.pre.user === 'undefined') {
        return h.continue;
      }
      return request.pre.user;
    },
  },{
  method: 'POST',
  path: '/users',
  config: {
    description: 'Create a new user',
    tags: ['api', 'users'],
    auth: false,
    pre: [
      createUser(),
    ],
  },
  handler: (request, h) => {
    if (request.pre.user === 'undefined') {
      return h.continue;
    }
    return request.pre.user;
  },
}];
