const handleErrorResponse = require('../../../utils/handleErrorResponse');
const fetchUser = () => ({
  method: async (request, h) => {
    const { broker, params, server, mongo } = request;
    const usersService = server.methods.services.users;

    const {_id } = params;

    console.log(_id)
    if (!_id) return handleErrorResponse(h, 'Missing indicatorId');
    // TODO : Ensure against user injection security down here.

    try {
      const userData = await usersService.fetchUserById({_id}, mongo, broker);
      if(!userData) return handleErrorResponse(h, new Error('User not found'))
      return userData;
    } catch (e) {
      return handleErrorResponse(h, e);
    }
  },
  assign: 'user',
});
module.exports = fetchUser;
