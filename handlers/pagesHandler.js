var PagesHandler = {
    hello:{
        handler:function(request, reply){
                return reply({'message':'Hello W0rld!'});
        }
    }
}
module.exports = PagesHandler;