const Hapi = require('@hapi/hapi');
// const HapiMoleculer = require('hapi-moleculer');
const routes = require('../routes');
const services = require('../services');

// const fs = require('fs');

async function startServer(config, broker) {
  const server = new Hapi.Server({
    port: process.env.API_PORT || config.server.port,
    host: process.env.API_HOST || config.server.host,
    // tls: {
    //     key: fs.readFileSync('/etc/letsencrypt/live/:application-name/privkey.pem'),
    //     cert: fs.readFileSync('/etc/letsencrypt/live/:application-name/fullchain.pem')
    // },
    debug: {log: '*', request: '*'},
    routes: {
      cors: {
        origin: ['*'],
        credentials: true,
        additionalHeaders: ['cache-control', 'x-requested-with']
      }
    }
  });
  // We require some services in the starting process (see validate that require userService)
  // Therefore we need that way up
  await server.register(services);

  // Register Moleculer as middleware
  // await server.register({
  //   plugin: HapiMoleculer,
  //   options: {
  //     broker,
  //   },
  // });

  // Handle our errors internal format {error: message, status: xxx} to a valid HTML error message
  // const preResponse = (request, h) => {
  //   const { response } = request;
  //   if (response.isBoom) {
  //     const reformated = { errors: {} };
  //     reformated.errors[response.output.statusCode] = [response.output.payload.message];
  //     return h.response(reformated).code(response.output.statusCode);
  //   }
  //   return h.continue;
  // };
  // server.ext('onPreResponse', preResponse);

  // Validate that the token is legit
  const validate = async function (decoded, request) {
    // const {id, remoteAddress} = request.info;
    const {_id, iat} = decoded;
    // const userAgent = request.headers['user-agent'];
    if (_id && iat) {
      return {isValid: true};
    }
    return {isValid: false};
  };
  const errorFunc = function (serverContext) {
    if (serverContext.message !== 'token is null') return serverContext;
    return {
      errorType: 'unauthorized',
      message: `Expected Bearer token to be provided (headers['Authorization']='Bearer <credentials>)'. See /auth/login.`
    };
  }

  await server.register({
    plugin: require('hapi-mongodb'),
    options: {
      url: 'mongodb://localhost:27017/starter',
      settings: {
        poolSize: 10
      },
      decorate: true
    }
  });
  await server.register(require('hapi-auth-jwt2'));
  server.auth.strategy('jwt', 'jwt',
      {
        //node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
        key: 'HereSomeSigningMessage',
        validate,// validate function defined above
        verifyOptions: {
          ignoreExpiration: true, // do not reject expired tokens
          algorithms: ['HS256'] // only allow HS256 algorithm
        },
        errorFunc
      });
  server.auth.default('jwt');


  // We log all request
  server.events.on('response', function (request) {
    const {auth, response} = request;
    const status = request.response.statusCode;
    const {isAuthenticated} = auth
    const {id, remoteAddress} = request.info;
    // const userAgent = request.headers['user-agent'];

    const authStatus = (isAuthenticated) ? `${auth.credentials.name}(${remoteAddress})` : `visitor(${remoteAddress})`;
    const pathStatus = `[${request.method.toUpperCase()}]${request.url.href}`;
    const logMsg = `[${status} - ${pathStatus} - ${authStatus} ]`;

    // we should use request.log or server.log
    console.log(logMsg)
  });


  // Registers our routes
  await server.register(routes);

  await server.start();

  server.log(`Server running at: ${server.info.uri}`);
  return server;
}

module.exports = startServer;
