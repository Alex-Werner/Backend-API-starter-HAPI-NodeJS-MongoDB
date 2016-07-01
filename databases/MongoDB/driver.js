var MongoDB = require('mongodb');
var Db = reqRoot('databases/MongoDB/db.js');

var Driver = {
    rawDriver:MongoDB,
    client:MongoDB.MongoClient,
    Db:Db
};

module.exports = Driver;