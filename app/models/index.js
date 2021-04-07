const Sequelize = require('sequelize');
const config = require("../config");
const path = require("path");

const sequelize = new Sequelize(config.get('db.name'), config.get('db.user'), config.get('db.password'), {
    host: config.get('db.host'),
    port: config.get('db.port'),
    dialect: 'mysql',
    timezone: '+05:00',
});

// load models
var models = [
    'CDR',
];
models.forEach(function (model) {
    module.exports[model] = require(path.join(__dirname, model))(sequelize);
});


// export connection
module.exports.sequelize = sequelize;