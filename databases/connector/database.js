var DatabaseType = "MongoDB";

var Driver = reqRoot('databases/'+DatabaseType+'/driver.js');
var Client = Driver.client;
var Db = Driver.Db;

//Put here your own database
//var MongoClient = reqRoot('databases/MongoDB/MongoClient.js');
//And change MongoClient to what you are using
//var DatabaseClient = MongoClient;

var Database = function(settings){
    this._dbSettings = settings;
    this._dbHost = settings.host || "localhost";
    this._dbPort = settings.port || 27017;
    this._dbName = settings.name   || "local";
    this._dbPath = 'mongodb://'+this._dbHost+':'+this._dbPort+"/"+this._dbName;
    this._db = null;
    this._collections = {};
};
Database.prototype.connect = function(){
    var self = this;
    return new Promise(function(resolve, reject){
        if(self._db!==null){
            return resolve(self._db);
        }else{
            Driver.client.connect(self._dbPath,function(err,db){
                if(err)
                    return reject(err)
                self._db = new Db(db);
                return resolve(self._db);
            });
        }
    });
};
Database.prototype.disconnect = function(){
    var self = this;
    return new Promise(function(resolve, reject){
       console.log(self);
       console.error('NOTIMPLEMENTED');
    });
};

Database.prototype.rawDriver = Driver;
module.exports = new Database({
    name:'starter',
    host:'localhost',
    port:27017
});