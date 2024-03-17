const express = require('express');
const router = express.Router();

const { con, db } = require('../database/database');

router.post('/getHistoryTableData', (req, res) => {
    db.getHistoryTableData(req.body.AccountID, (err, results) => {
        if (err) 
            res.status(500).json({ error: 'Error retrieving data' });
        else 
            res.json(results);
    });
})

router.post('/archiveDS', (req, res) => {
    db.archiveDS(req.body.data, req.body.AccountID, (err, results) => {
        if (err) 
            res.status(500).json({ error: 'Error retrieving data' });
        else 
            res.json(results);
    });
})

router.post('/archiveAS', (req, res) => {
    db.archiveAS(req.body.data, req.body.AccountID, (err, results) => {
        if (err) 
            res.status(500).json({ error: 'Error retrieving data' });
        else 
            res.json(results);
    });
})

router.post('/deleteDSFromBatch', (req, res) => {
    db.deleteDSFromBatch(req.body.data, req.body.AccountID, (err, results) => {
        if (err) 
            res.status(500).json({ error: 'Error retrieving data' });
        else 
            res.json(results);
    });
})

router.post('/deleteASFromBatchSet', (req, res) => {
    db.deleteASFromBatchSet(req.body.data, req.body.AccountID, (err, results) => {
        if (err) 
            res.status(500).json({ error: 'Error retrieving data' });
        else 
            res.json(results);
    });
})

module.exports = { historyRoutes: router };