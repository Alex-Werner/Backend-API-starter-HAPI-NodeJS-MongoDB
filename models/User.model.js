var Database = reqRoot('databases/connector/database.js');

var User = {
    create: function (user) {
        return new Promise(function (resolve, reject) {
            Database
                .connect()
                .then(function (db) {
                    var _users = db.collection('users');
                    _users
                        .insert(user)
                        .then(function (result) {
                            return resolve(result);
                        })
                        .catch(function (e) {
                            console.error(e);
                            return reject(e);
                        });
                });
        });
    },
    search: function (query, fields, options) {
        if (!options) {
            options = {};
        }
        if (!fields) {
            fields = {};
        }
        return new Promise(function (resolve, reject) {
            Database
                .connect()
                .then(function (db) {
                    var _users = db.collection('users');
                    _users
                        .find(query, fields, options)
                        .then(function (result) {
                            return resolve(result);
                        })
                        .catch(function (e) {
                            console.error(e);
                            return reject(e);
                        });
                });
        });
    }
}
module.exports = User;