const express = require('express');
const router = express.Router();

const { con, db } = require('../database/database');

router.post('/getAllAccounts', (req, res) => {
    db.getAllAccounts( (err, results) => {
        if (err) 
            res.status(500).json({ error: 'Error retrieving data' });
        else 
            res.json(results);
    });
})

router.post('/disableAccount', (req, res) => {
    db.disableAccount(req.body.data, (err, results) => {
        if (err) 
            res.status(500).json({ error: 'Error retrieving data' });
        else 
            res.json(results);
    });
})

router.post('/enableAccount', (req, res) => {
    db.enableAccount(req.body.data, (err, results) => {
        if (err) 
            res.status(500).json({ error: 'Error retrieving data' });
        else 
            res.json(results);
    });
})

module.exports = { adminRoutes: router };