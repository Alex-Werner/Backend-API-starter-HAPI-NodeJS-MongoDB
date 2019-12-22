const Error400BadRequest = require('../../errors/codes/Error400BadRequest')

const fetchUserById = async (params, mongo, broker) => {
  const {
    _id
  } = params;
  const {ObjectID, db} = mongo;

  if (!_id) throw new Error400BadRequest('Missing _id');

  const user = await db
      .collection('users')
      .findOne({_id: new ObjectID(_id)});

  return user;
};
module.exports = fetchUserById;
