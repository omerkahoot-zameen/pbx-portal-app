// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const config = require("./config");

/**
 * App Variables
 */
const app = express();
const port = config.get('serverPort');
const { initiateTunnel } = require('./services/tunnelService');
const routes = require("./routes/");

const auth = require("http-auth");
const authConnect = require("http-auth-connect");

const basic = auth.basic({
	realm: 'Login',
	file: path.join(__dirname, '../../') + "/htpasswd"
});

app.use(authConnect(basic));

/**
 *  App Configuration
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, '../', "public")));
app.use(routes(app));

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);

    initiateTunnel();
    //If outer tunnels are to be used then comment the above and uncomment following line, 
    //otherwise the tunnel service itself authenticates sequelize as well
    //authenticateSequelize(); 
});