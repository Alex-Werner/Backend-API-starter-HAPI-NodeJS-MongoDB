var User = reqRoot('models/User.model.js');

var UserCtrl = {
    register:function(username, password, email){
        return async(function(){
            if(!username || !password){
                return false;
            }
             var user = {
                 username:username,
                 password:password
             }
            var userExist = await(User.search(user));
            if(userExist.length){
                return -1;
            }
            var createUser = await(User.create(user));
             if(createUser.result.ok){
                 return 1;
             }
            return -2;
         })();

    }
};
module.exports = UserCtrl;