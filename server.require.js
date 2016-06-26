var serverRequire = function(dirname){
    var appRootPath = __dirname + "\\";
    return require(appRootPath+dirname);
};
module.exports = serverRequire;