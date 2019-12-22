const Error400BadRequest = require('../../errors/codes/Error400BadRequest')
const DuplicateEntryError = require('../../errors/DuplicateEntryError')

const createUser = async (userPayload, mongo, broker) => {
  const {
    username, firstname, lastname, email, password
  } = userPayload;

  const {db} = mongo;

  if(!username || !firstname || !lastname || !email || !password) throw new Error400BadRequest('Missing parameter');
  // const data = await broker.call("dataproviders.assets.actions.createUser", {name password});

  const countUsername = await db.collection('users').count({  username: username });
  if(countUsername) throw new DuplicateEntryError('Username taken.');

  const countEmail = await db.collection('users').count({  email: email });
  if(countEmail) throw new DuplicateEntryError('Email already registered taken.');

  const insertedUser = await db.collection('users').insert({
    username,
    firstname,
    lastname,
    email,
    password
  });
  if(insertedUser.result.n===1) {
    const user = {
      _id: insertedUser.ops[0]._id,
      username,
      firstname,
      lastname,
      email,
    }
    return user;
  }else{
    throw new Error400BadRequest('Could not create user');
  }
};
module.exports = createUser;
