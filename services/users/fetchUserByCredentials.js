const Error400BadRequest = require('../../errors/codes/Error400BadRequest')

const fetchUserByCredentials = async (params, mongo, broker) => {
  const {
    username, password
  } = params;
  const { db} = mongo;

  if(!username || !password) throw new Error400BadRequest('Missing parameter');

    return await db
        .collection('users')
        .findOne({  username, password });
};
module.exports = fetchUserByCredentials;
