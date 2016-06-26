var closeServer = function(){
    console.log('Gracefully closing the server');

    process.emit("SIGINT");
}
var Globals = {
    // require from root
    // use it like from everywhere in project : reqRoot('/models/myModel.js');
    // and keep require for node_modules
    closeServer:closeServer,
    server:{info:{}},
    reqRoot:require('../server.require.js'),
    tryAndCatch:function(fn){
        try{
            fn();
        }catch(e){
            console.log(e);
           closeServer();
        }

    },
    import:function(){
         for (var i = 0,n=Object.keys(Globals);i<n.length; i++){
             var key = n[i];
            if(key=='import')
                continue;
            if(!global.hasOwnProperty(key) && Globals.hasOwnProperty(key)){
                 global[key]=Globals[key];
                 console.info('Importing global.'+key);
            }else{
                 var alreadyExist = global.hasOwnProperty(key);
                 var doNotExist = Globals.hasOwnProperty(key);

                 console.error('Failed to import global.'+key);
            }

         }
     },

};
module.exports = Globals;