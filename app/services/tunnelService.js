
const tunnel = require('tunnel-ssh');
const config = require("../config");
const { authenticateSequelize } = require('./cdrService');

// tunnel config
const dbTunnelConfig = {
    host: config.get('tunnel.db.sshHost'),
    port: config.get('tunnel.db.sshPort'),
    username: config.get('tunnel.db.sshUser'),
    password: config.get('tunnel.db.sshPassword'),
    dstHost: config.get('tunnel.db.dstHost'),
    dstPort: config.get('tunnel.db.dstPort'),
    localHost: config.get('tunnel.db.localHost'),
    localPort: config.get('tunnel.db.localPort'),
    keepAlive: true
};

const fsTunnelConfig = {
    host: config.get('tunnel.storage.sshHost'),
    port: config.get('tunnel.storage.sshPort'),
    username: config.get('tunnel.storage.sshUser'),
    password: config.get('tunnel.storage.sshPassword'),
    dstHost: config.get('tunnel.storage.dstHost'),
    dstPort: config.get('tunnel.storage.dstPort'),
    localHost: config.get('tunnel.storage.localHost'),
    localPort: config.get('tunnel.storage.localPort'),
    keepAlive: true
};

/* 
For keeping the tunnel open through node server.
This creates problems so independently opening the tunnel through separate ssh processes.
*/

const initiateTunnel = () => {
    tunnel(dbTunnelConfig, function (error, server) {
        //....
        if (error) {
            console.error(error);
        } else {
            authenticateSequelize();
        }
    });

    tunnel(fsTunnelConfig, function (error, server) {
        //....
        if (error) {
            console.error(error);
        } 
    });
};

module.exports = {
    initiateTunnel
};