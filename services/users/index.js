const fetchUserByCredentials = require('./fetchUserByCredentials');
const fetchUserById = require('./fetchUserById');
const create = require('./createUser');

module.exports = [
  {
    name: 'services.users.fetchUserByCredentials',
    method: fetchUserByCredentials,
  },
  {
    name: 'services.users.fetchUserById',
    method: fetchUserById,
  },
  {
    name: 'services.users.create',
    method: create,
  },
];
