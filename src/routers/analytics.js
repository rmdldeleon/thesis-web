const express = require('express');
const router = express.Router();

const { con, db } = require('../database/database');

router.post('/', (req, res) => {
    db.getLastActionAndDataStructure(req.body.userDetails, (err, results) => {
        if (err) 
            res.status(500).json({ error: 'Error retrieving data' });
        else 
            res.json(results);
    });
})

router.post('/add/updateJSONData', (req, res) => {
    let { JSONData, DSID } = req.body

    db.updateJSONData({DSID, JSONData}, (err, results) => {
        if (err) 
            res.status(500).json({ error: 'Error retrieving data' });
        else 
            res.json(results);
    });
})

router.post('/add/insertActionResults', (req, res) => {

    db.insertActionResults(req.body.actionResults, (err, results) => {
        if (err) 
            res.status(500).json({ error: 'Error retrieving data' });
        else 
            res.json(results);
    });
})

router.post('/add/updateCapacity', (req, res) => {
    db.updateCapacity(req.body.DSData, (err, results) => {
        if (err) 
            res.status(500).json({ error: 'Error retrieving data' });
        else 
            res.json(results);
    });
})

router.post('/reset/initializeDS', (req, res) => {

    db.initializeDS(req.body.data, (err, results) => {
        if (err) 
            res.status(500).json({ error: 'Error retrieving data' });
        else 
            res.json(results);
    });
})

router.post('/reset/getHighestBatch', (req, res) => {
    db.getHighestBatch(req.body.accountID, (err, results) => {
        if (err) 
            res.status(500).json({ error: 'Error retrieving data' });
        else 
            res.json(results);
    });
})

router.post('/reset/updateLastUsedDSBatch', (req, res) => {

    db.updateLastUsedDSBatch(req.body.data, (err, results) => {
        if (err) 
            res.status(500).json({ error: 'Error retrieving data' });
        else 
            res.json(results);
    });
})


module.exports = { analyticsRoutes: router };