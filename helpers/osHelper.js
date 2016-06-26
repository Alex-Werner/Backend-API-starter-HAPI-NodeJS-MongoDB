var os = require('os');

//Require the server network interface to be named "eth0"
//Already by default on linux, but w$ need to be renamed.
var getServerIP = function(){
    console.log('*****');
    var ip = '0.0.0.0';
    var nI = os.networkInterfaces();
    for(var i=0; i<Object.keys(nI).length; i++){
        var interface = nI[Object.keys(nI)[i]];
        for(var i=0; i<Object.keys(interface).length;i++){
            var iter = interface[i];
            if(iter.family =='IPv4'){
                ip = iter.address;
            }
        }
    }
    var serverIP = ip
    return serverIP;
};

var getMemory = function(){

    return {free:os.freemem(), total:os.totalmem(), process:process.memoryUsage()};
};
var cpuAvg = function(){
    var totalIdle=0;
    var totalTick=0;
    var cpus = os.cpus();

    // console.log(cpus);

    for(var cpuIndex in cpus){
        var cpu = cpus[cpuIndex];
        for(var type in cpu.times){
            totalTick+=cpu.times[type];
        }
        totalIdle += cpu.times.idle;

    }
    var idle = totalIdle / cpus.length;
    var total = totalTick / cpus.length;
    return {"idle":idle, "total":total};
};

var cpuLoadInit = function(){
    var start = cpuAvg();
    return function(){
        var end = cpuAvg();
        var diff = {};
        diff.idle = end.idle - start.idle;
        diff.total = end.total - start.total;
        diff.percent = (1 - diff.idle / diff.total)*100;
        return diff;
    }
};
var cpuLoad = cpuLoadInit();
module.exports = {
    getServerIP:getServerIP,
    getMemory:getMemory,
    cpuAverage:cpuAvg,
    cpuLoad: cpuLoad

};
