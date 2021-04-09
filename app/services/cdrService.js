const fs = require("fs");
const {
    format,
    isMatch,
    parse
} = require("date-fns");

const fetch = require('node-fetch');
const {
    CDR,
    sequelize
} = require("../models");
const config = require("../config");

const authenticateSequelize = () => {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
};

const getCDRData = async (passedDate, callerId) => {
    if (!passedDate || !callerId) {
        throw new Error('Please pass both parameters (date & caller_id) in the url.');
    }

    const isPassedDateInCorrectFormat = isMatch(passedDate, 'yyyy-MM-dd');
    if (!isPassedDateInCorrectFormat) {
        throw new Error('Please pass date in the exact format (yyyy-MM-dd).');
    }

    const formattedDate = format(parse(passedDate, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd').toString();
    const cdrRows = await CDR.findAll({
        attributes: ["uniqueid", "src", "calldate", "dst", "duration", "disposition"],
        where: [sequelize.where(sequelize.fn('date', sequelize.col('calldate')), '=', formattedDate),
            {
                src: callerId
            },
        ]
    });

    if (!cdrRows || cdrRows.length === 0) {
        throw new Error('No records found with the given criteria. Please ensure the date is in the format (yyyy-MM-dd) and correct caller id (03xxxxxxxxx) is being entered.');
    }

    return cdrRows.map((row, index) => {
        row.calldate = format(row.calldate, 'yyyy-MM-dd hh:mm:ss').toString();
        row.extractedDate = format(row.calldate, 'yyyy-MM-dd').toString();
        row.formattedCallDate = format(row.calldate, 'yyyy-MM-dd hh:mm:ss').toString();
        row.recordingPath = "./recording?date=" +
            row.extractedDate + "&src=" +
            row.src + "&dst=" +
            row.dst;
        return row;
    });
};


const getRecordingData = async (date, src, dst, res) => {
    if (!date || !src || !dst) {
        throw new Error('Please pass all parameters (date, src, dst) in the url.');
    }

    date = parse(date, 'yyyy-MM-dd', new Date());
    const recordingUrl = "http://" + config.get('tunnel.storage.localHost') + ':' + config.get('tunnel.storage.localPort') + '/recordings/' +
        format(date, 'yyyy-MM-dd').toString() + "/" +
        src + "/" +
        dst + ".mp3";
    const recordingUrlFetch = await fetch(recordingUrl);

    await new Promise((resolve, reject) => {
        res.writeHead(200, {
            'Content-Type': 'audio/mpeg'
        });
        recordingUrlFetch.body.pipe(res);
        recordingUrlFetch.body.on("error", reject);
    });
};

module.exports = {
    authenticateSequelize,
    getCDRData,
    getRecordingData
};