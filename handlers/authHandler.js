var UserCtrl = reqRoot('controllers/User.controller.js');

const RESPONSE = {
    "success":true,
    "message":"Nothing happened"
};
var clone = function (_obj) {
    var obj = JSON.parse(JSON.stringify(_obj));
    return obj;
}

var AuthenticationHandler = {
    register:{
        /**
         *
         * @param request - An object where request.payload should contains : username,password,[email]
         * @param reply
         * @returns {*}
         */
        handler:function(request, reply){
            async(function(){

                var response = clone(RESPONSE);

            try{
                var pld = request.payload;
                if(!pld || !pld.username || !pld.password){
                    response.message = "Missing parameters";
                    response.success=false;
                }
                else{
                    var _username = pld.username;
                    var _password = pld.password;
                    var registerUser = await(UserCtrl.register(_username, _password));
                    switch(registerUser){
                        case 1:
                            response.message = "User registered!";
                            break;
                        case -1:
                            response.message = "User already exist!";
                            response.success=false;
                            break;
                        case -2:
                            response.message = "Error on registerationCtrl";
                            response.success=false;
                            break;
                        default:
                            response.message = "Error unknown";
                            break;
                    }
                }
            }catch(e){

                response.message= e.message;
                response.error={
                    stack: e.stack.split('\n').map(function(a){
                        return a;
                    }),
                    code: e.code,
                    errno: e.errno,
                    syscall: e.syscall
                };
                response.success=false;
            }
            return reply(response);

            })();

        }
    }
};
module.exports=AuthenticationHandler;