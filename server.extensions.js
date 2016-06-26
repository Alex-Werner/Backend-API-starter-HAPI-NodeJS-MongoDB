var onRequest = function (request, reply) {
    reply.continue();
};
var onPreAuth = function (request, reply) {
    reply.continue();
};
var onPostAuth = function (request, reply) {
    reply.continue();
};
var onPreHandler = function (request, reply) {
    reply.continue();
};
var onPostHandler = function (request, reply) {
    reply.continue();
};
var onPreResponse = function(request, reply){
    try{
        var processTime = new Date().getTime()-request.response.request.info.received;
        request.response.source._s={time:processTime};
        server.info.req = (!server.info.req) ? 1: server.info.req+1;
        //reply.time = 0;
        //do stuff
    }catch(e){
        console.log(e.stack);
    }finally{
        return reply.continue();
    }
};

module.exports = {
    onRequest: onRequest,
    onPreAuth: onPreAuth,
    onPostAuth: onPostAuth,
    onPreHandler: onPreHandler,
    onPostHandler: onPostHandler,
    onPreResponse: onPreResponse,
};