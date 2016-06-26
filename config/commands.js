//process.platform return darwin || freebsd || linux || sunos || win32 (even on 64)
var osHelper = reqRoot('helpers/osHelper.js');
var createMemoryLoad = function(){
    var theThing = null;
    var replaceThing = function () {
        var originalThing = theThing;
        var unused = function () {
            if (originalThing)
                console.log("hi");
        };
        theThing = {
            longStr: new Array(10000000).join('*'),
            someMethod: function () {
                console.log(someMessage);
            }
        };
    };
    setInterval(replaceThing, 100);
};
//createMemoryLoad();

function toFixed(value, precision) {
    var precision = precision || 0,
        power = Math.pow(10, precision),
        absValue = Math.abs(Math.round(value * power)),
        result = (value < 0 ? '-' : '') + String(Math.floor(absValue / power));

    if (precision > 0) {
        var fraction = String(absValue % power),
            padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
        result += '.' + padding + fraction;
    }
    return result;
}
var Commands = {
    _cmdList: [],
    _monitorLaunched: false,
    _monit: null,
    monitor: function () {
        var isWin = /^win/.test(process.platform);
        if (isWin) {
            if (Commands._monitorLaunched) {
                return;
            } else {
                Commands._monitorLaunched = true;
                var displayMonitoring = function () {
                    var mem = (osHelper.getMemory().process.heapTotal / 2930609408)*100;
                    var v8 = osHelper.cpuLoad().percent
                    console.log('\033[2J');
                    console.log('--------------------------------');
                    console.log('| Server Time : ' + require('moment')().format('DD/MM/YYYY HH:MM:ss'));
                    console.log('| Server Started :'+require('moment')(server.info.started).format('DD/MM/YYYY HH:MM:ss')+'-'+((new Date().getTime() - server.info.started)/1000)+' s ago');
                    console.log('| Request Handlerd : '+ server.info.req || 0);
                    console.log('| Request Per Sec :'+server.info.req / ((new Date().getTime() - server.info.started)/1000));
                    console.log('| Process Id :',process.pid);
                    console.log('| Process Load :',v8.toPrecision(4)+'%');
                    console.log('| Process Mem V8:',mem.toPrecision(4));
                    console.log('--------------------------------');
                    console.log('Enter C to quit.')
                }
                displayMonitoring();

                Commands._monit = setInterval(displayMonitoring, 1000);
            }
        } else {
            console.log('> Supported on Windows for now');
        }
    },
    help: function () {
        console.log('\n')
        console.log('--------- Usage  -------');
        console.log('| - status : Get current server status');
        console.log('| - quit or q : Stop the server and send SIGINT');
        console.log('| - stop or s : Stop the server');
        console.log('| - start : Start the server');
        console.log('| - restart : Do a stop then a start');
    },
    start: function () {
        var servMng = reqRoot('server.manager.js');
        servMng.startServer();

    },
    stop: function (onSuccess, onFail) {
        var servMng = reqRoot('server.manager.js');
        servMng.stopServer();
    },
    restart: function () {
        Commands.stop();
        console.log('Restarting in 5 seconds');
        setTimeout(function () {
            console.log('4..');
        }, 1000)
        setTimeout(function () {
            console.log('3..');
        }, 2000)
        setTimeout(function () {
            console.log('2..');
        }, 3000)
        setTimeout(function () {
            console.log('1..');
        }, 4000)
        setTimeout(function () {
            Commands.start();
        }, 5000)

    },
    close: function () {
        var servMng = reqRoot('server.manager.js');
        servMng.closeServer();
        process.emit('SIGINT');
    },
    status: function () {
        console.log(">", global.server.status);
    },
    c: function () {
        if (Commands._monitorLaunched) {
            clearInterval(Commands._monit);
            Commands._monitorLaunched = false;
            console.log('> Monitoring exited...');
        } else {
            console.log('> Nothing to cancel');
        }
    },
    import: function () {
        for (var i = 0, n = Object.keys(Commands); i < n.length; i++) {
            var key = n[i];
            if (key == 'import' || new RegExp(/^_/).test(key))
                continue;
            Commands._cmdList.push(key);
        }

        var readline = require('readline');
        server.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });
        Commands.help();
        server.rl.on('line', function (line) {
            var cmd = line.trim();
            if (Commands._cmdList.indexOf(cmd) != -1 && Commands.hasOwnProperty(cmd)) {
                Commands[cmd]();

            } else {
                console.log('> Invalid command');
                Commands.help();
            }
            console.log('\n');

        })
    }
};

module.exports = Commands;