const usersService = require('./users');

const register = async (server, options) => {
  const services = [].concat(
      usersService,
  );
  server.method(services);
};

const plugin = {
  register,
  pkg: {
    name: 'services',
    version: '1.0.0',
  },
};

module.exports = plugin;
