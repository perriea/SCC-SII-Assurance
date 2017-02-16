// Zerodown time Cluster
var recluster = require('recluster');
var path      = require('path');

var cluster   = recluster(path.join(__dirname, 'server.js'));
cluster.run();

// if process is killed, reload the cluster
process.on('SIGUSR2', function() {
    console.log('Got SIGUSR2, reloading cluster...');
    cluster.reload();
});

console.log("Spawned cluster, PID", process.pid);