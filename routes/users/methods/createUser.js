const handleErrorResponse = require('../../../utils/handleErrorResponse');
const MissingPostPayloadPropertyError = require('../../../errors/MissingPostPayloadPropertyError')
const Error400BadRequest = require('../../../errors/codes/Error400BadRequest')
const createUsers = () => ({
  method: async (request, h) => {
    const { broker, payload, server, mongo } = request;
    const {username, firstname, lastname, email, password} = payload;

    if(!username) return handleErrorResponse(h, new MissingPostPayloadPropertyError('username', 'string'))
    if(!firstname) return handleErrorResponse(h, new MissingPostPayloadPropertyError('firstname', 'string'))
    if(!lastname) return handleErrorResponse(h, new MissingPostPayloadPropertyError('lastname', 'string'))
    if(!email) return handleErrorResponse(h, new MissingPostPayloadPropertyError('email', 'string'))
    if(!password) return handleErrorResponse(h, new MissingPostPayloadPropertyError('password', 'string'))

    const userPayload = {
      username, firstname, lastname, email, password
    };

    const usersService = server.methods.services.users;

    try {
      const user = await usersService.create(userPayload, mongo, broker);
      return {user}
    } catch (e) {
      return handleErrorResponse(h, e);
    }
  },
  assign: 'user',
});
module.exports = createUsers;
