const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
    path: path.join(process.cwd(), ".env"),
});

module.exports = {
    env: {
        doc: "The App Environment.",
        format: ["production", "development", "test"],
        default: "development",
        env: "NODE_ENV",
    },
    serverPort: {
        doc: "The port for server to run on.",
        format: "port",
        default: "8000",
        env: "SERVER_PORT",
        arg: "port",
    },
    db: {
        host: {
            doc: 'Database host name/IP',
            format: '*',
            env: 'DB_HOST',
            default: '127.0.0.1'
        },
        name: {
            doc: 'Database name',
            format: String,
            env: 'DB_DATABASE',
            default: 'zn_pbx'
        },
        port: {
            doc: 'Database port',
            format: "port",
            env: 'DB_PORT',
            default: '8001'
        },
        user: {
            doc: 'Database user',
            format: String,
            env: 'DB_USER',
            default: 'root'
        },
        password: {
            doc: 'Database password',
            format: String,
            env: 'DB_PASSWORD',
            default: ''
        },
    },
    tunnel: {
        db: {
            sshHost: {
                doc: 'SSH host name/IP',
                format: '*',
                env: 'DB_SSH_HOST',
                default: '127.0.0.1'
            },
            sshPort: {
                doc: 'SSH port',
                format: "port",
                env: 'DB_SSH_PORT',
                default: '8001'
            },
            sshUser: {
                doc: 'Ssh user',
                format: String,
                env: 'DB_SSH_USER',
                default: 'root'
            },
            sshPassword: {
                doc: 'Ssh password',
                format: String,
                env: 'DB_SSH_PASSWORD',
                default: ''
            },
            dstHost: {
                doc: 'DST host name/IP',
                format: '*',
                env: 'DB_DST_HOST',
                default: '127.0.0.1'
            },
            dstPort: {
                doc: 'DST port',
                format: "port",
                env: 'DB_DST_PORT',
                default: '8001'
            },
            localHost: {
                doc: 'DB local host name/IP',
                format: '*',
                env: 'DB_LOCAL_HOST',
                default: '127.0.0.1'
            },
            localPort: {
                doc: 'DB local port',
                format: "port",
                env: 'DB_LOCAL_PORT',
                default: '8001'
            },
        },
        storage: {
            sshHost: {
                doc: 'SSH host name/IP',
                format: '*',
                env: 'STORAGE_SSH_HOST',
                default: '127.0.0.1'
            },
            sshPort: {
                doc: 'SSH port',
                format: "port",
                env: 'STORAGE_SSH_PORT',
                default: '8001'
            },
            sshUser: {
                doc: 'Ssh user',
                format: String,
                env: 'STORAGE_SSH_USER',
                default: 'root'
            },
            sshPassword: {
                doc: 'Ssh password',
                format: String,
                env: 'STORAGE_SSH_PASSWORD',
                default: ''
            },
            dstHost: {
                doc: 'DST host name/IP',
                format: '*',
                env: 'STORAGE_DST_HOST',
                default: '127.0.0.1'
            },
            dstPort: {
                doc: 'DST port',
                format: "port",
                env: 'STORAGE_DST_PORT',
                default: '8001'
            },
            localHost: {
                doc: 'DB local host name/IP',
                format: '*',
                env: 'STORAGE_LOCAL_HOST',
                default: '127.0.0.1'
            },
            localPort: {
                doc: 'DB local port',
                format: "port",
                env: 'STORAGE_LOCAL_PORT',
                default: '8001'
            },
        },
    }
};