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
        var startedRequest = 0, processTime =0;
        if(request && request.response && request.response.request && request.response.request.info){
            startedRequest=request.response.request.info.received || request.info.received;
            processTime = new Date().getTime()-startedRequest;
            request.response.source._s={time:processTime};

        }else{

             startedRequest = request.info.received;
            processTime = new Date().getTime()-startedRequest;
            request.response.output.payload._s={time:processTime};

        }
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