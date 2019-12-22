const JWT = require('jsonwebtoken');
const MissingPostPayloadPropertyError = require('../../../errors/MissingPostPayloadPropertyError.js');
const handleErrorResponse = require('../../../utils/handleErrorResponse');

const generateSessionToken = () => ({
  method: async (request, h) => {
    const { broker, payload, server, mongo } = request;
    const {username, password} = payload;

    if(!username) return handleErrorResponse(h, new MissingPostPayloadPropertyError('login', 'email or username'))

    //FIXME : An hash that will be calculated on client side and compared server side (would allow http support).
    if(!password) return handleErrorResponse(h, new MissingPostPayloadPropertyError('password', 'string'))

    const usersService = server.methods.services.users;
    try{
      const user = await usersService.fetchUserByCredentials({username, password}, mongo,  broker);
      if(!user._id){
        return { error : 'Invalid credentials'};
      }
      let token = request.headers.authorization;

      request.auth = {
        credentials:user
      }

      // if we don't have a JWT we might not have any session
      // TODO : Check that we do not have any session. A simple counter would suffice, or putting sessions ID to DB
      // if(!token) {
        token = JWT.sign({_id: user._id, username: user.username, timestamp:+new Date()}, 'HereSomeSigningMessage');
      // }
      return {token, username:user.username, _id:user._id};
    }catch (e) {
      return handleErrorResponse(h, e);
    }
  },
  assign: 'user',
});
module.exports = generateSessionToken;
