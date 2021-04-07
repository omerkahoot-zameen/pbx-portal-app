const express = require("express");
const { getCDREntries, getRecording } = require('../controllers/cdr');

/**
 * Routes Definitions
 */
module.exports = (app) => {
    const router = express.Router();
    router.get('/', getCDREntries);
    router.get('/recording', getRecording);
    return router;
};