const { getCDRData, getRecordingData } = require('../services/cdrService');

const getCDREntries = async (req, res) => {
    try {
        const cdrRowsUpdated = await getCDRData(req.query.date, req.query.caller_id);
        res.render("index", {
            title: "PBX Portal",
            cdrRows: cdrRowsUpdated
        });
    } catch (error) {
        res.send({ error: error.message });
    }
};

const getRecording = async (req, res) => {
    try {
        getRecordingData(req.query.date, req.query.src, req.query.userfield, res);
    } catch (error) {
        res.send({ error: error.message });
    }
};

module.exports = {
    getCDREntries,
    getRecording
};