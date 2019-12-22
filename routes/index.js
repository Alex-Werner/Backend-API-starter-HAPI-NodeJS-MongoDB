const root = require('./root');
const status = require('./status');
const users = require('./users');
const auth = require('./auth');

const register = async (server, options) => {
  /**
   * Endpoint : /
   * Redirects to /status
   */
  server.route(root);
  server.log('registered : / -> /status');


  /**
   * Endpoint : /status
   */
  server.route(status);
  server.log('registered : /status');


  /**
   * Endpoint : [GET] /users/{_id}
   * Endpoint : [POST] /users
   */
  server.route(users);
  server.log('registered : [GET] /users/_id');
  server.log('registered : [POST] /users');

  /**
   * Endpoint : [POST] /auth/session/token
   */
  server.route(auth);
  server.log('registered : [POST]/auth/session/token');

};

const plugin = {
  register,
  pkg: {
    name: 'routes',
    version: '1.0.0',
  },
};
module.exports = plugin;
