/** Gives access to :
/* - reqRoot, require like but take path as : "models/user.js" instead "../../models/user.js"
 */
require('./config/globals.js').import();
require('./config/commands.js').import();

/* Node modules */
var moment = require('moment');//Parse, validate, manipulate, and display dates in javascript.
var Promise = require('bluebird');
var Hapi = require('hapi');
/* HapiJS plugins */
//var Boom = require('boom');//HTTP-friendly error objects
//var Joi = require('joi');//Object schema validation
//var Lout = require('lout');//API documentation generator
//var Inert = require('inert');//Static file and directory handlers for hapi.js
//var Vision = require('vision');//Templates rendering support for hapi.js
var HapiAuthCookie = require('hapi-auth-cookie');//Cookie authentication plugin
//var Bell = require('bell');//Third-party login plugin for hapi

/* Internal Modules */
var servExt = reqRoot('server.extensions.js');
var servMng = reqRoot('server.manager.js');
var osHelper = reqRoot('helpers/osHelper.js');
var Routes = reqRoot('server.routes.js');

var servEnv = 'local';
/* TODO : Move this to multi-database handler's folder */
var Database = {
    closeConnection:function(){
        console.info('Database disconnected by application call.');
    }
}


/* Server */
var Server = new Hapi.Server();
global.server.Server =Server;
var ServerIP = osHelper.getServerIP() || '0.0.0.0';
var ServerPort = (servEnv=='local')? '8000' : '80';
var ServerTLS = {
    isActive:false,
    cert:"",
    key:""
};

var options = {
     host:ServerIP,
     port:ServerPort,/* set 80 for http, 443 for https */
     routes:{
         cors:true//allow to be joined from other domain
     }
}
if(ServerTLS.isActive){
     ServerPort = (servEnv=='local')? '443' : '443';
     options.tls = {cert:ServerTLS.cert, key:ServerTLS.key}
}
global.server.options = options;

servMng.startServer(Server);

Server.register([HapiAuthCookie],function(e){
    if(e){
        console.error('hapi-auth-cookie error'); throw e;
    }
    Server.auth.strategy('session', 'cookie', {
       password: 'YouWantToHaveAReallyLongKey-ObviouslyYouNeedToChangeThisOne',
       cookie: 'session',
       redirectTo: false,
       isSecure: ServerTLS.isActive,
       ttl: 365 * 30 * 7 * 24 * 60 * 60 * 1000
       // ttl:30*24*60*60*1000,//30 d
       // keepAlive:true //automatically sets the session cookie after validation to extend the current session for a new ttl duration. Changes validity time from session to ttl in Browser
   });
})
Server.route(Routes.endpoints);

/**
 * When a request is received. onRequest runs.
 */
Server.ext('onRequest', servExt.onRequest);
/**
 * After the request has gone through the router, it needs to be authenticated. OnPreAuth runs before authentication, and onPostAuth runs after.
 */
Server.ext('onPreAuth', servExt.onPreAuth);
/**
 * After the request has gone through the router, it needs to be authenticated. OnPostAuth runs after authentication.
 */
Server.ext('onPostAuth', servExt.onPostAuth);
/**
 * Validation is handled next. OnPreHandler runs, then, the route itself.
 */
Server.ext('onPreHandler', servExt.onPreHandler);
/**
 * OnPostHandler runs after the handler. So Controllers (and eventually model and db access) has been done.
 */
Server.ext('onPostHandler', servExt.onPostHandler);
/**
 * Then, the response payload is validated on pre-response runs, and the response is sent to the client.
 */
Server.ext('onPreResponse', servExt.onPreResponse);


process.on('SIGINT',function(){
console.log('This process is pid ' + process.pid);
    servMng.stopServer();
    server.rl.close();
    process.exit(1);
});