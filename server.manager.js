var hasSet = false;
module.exports = {
    setConnection: function () {
        var Server = global.server.Server;
        var options = global.server.options;
        Server.connection(options);
        hasSet = true;
    },
    startServer: function () {
        console.log('Starting...');
        var Server = global.server.Server;
        if (!hasSet)
            this.setConnection();
        global.server.Server.start(function (e) {
            if (e) {
                global.server.status = 'Server failed to start.' + e + ' - ErrCode:' + e.code + "- ErrNo:" + e.errno;
            } else {
                global.server.info.started = new Date().getTime();
                global.server.status = 'Server running on ' + ((global.server.options.hasOwnProperty('tls')) ? ("https://") : ("http://")) + global.server.options.host + ':' + global.server.options.port + "...";
            }
            console.log(global.server.status);
        });
    },
    stopServer: function (Server) {
        global.server.status = 'Server stopped...';
        var Server = global.server.Server;
        Server.stop();
        console.log(global.server.status);
    },
    closeServer: function () {

        process.emit('SIGINT');
    }
}