const Sequelize = require('sequelize');

module.exports = (sequelize) => sequelize.define('CDR', {
    calldate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    clid: {
        type: Sequelize.STRING(80),
        allowNull: false,
    },
    src: {
        type: Sequelize.STRING(80),
        allowNull: false
    },
    dst: {
        type: Sequelize.STRING(80),
        allowNull: false
    },
    dcontext: {
        type: Sequelize.STRING(80),
        allowNull: false
    },
    channel: {
        type: Sequelize.STRING(80),
        allowNull: false
    },
    dstchannel: {
        type: Sequelize.STRING(80),
        allowNull: false
    },
    lastapp: {
        type: Sequelize.STRING(80),
        allowNull: false
    },
    lastdata: {
        type: Sequelize.STRING(80),
        allowNull: false
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    billsec: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    disposition: {
        type: Sequelize.STRING(45),
        allowNull: false
    },
    amaflags: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    accountcode: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    uniqueid: {
        type: Sequelize.STRING(32),
        allowNull: false
    },
    userfield: {
        type: Sequelize.STRING(255)
    }

}, {
    tableName: "cdr",
});