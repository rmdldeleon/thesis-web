const express = require('express');
const router = express.Router();

const { con, db } = require('../database/database');

router.post('/updateUserDetails', (req, res) => {
    db.updateUserDetails(req.body.data, (err, results) => {
        if (err) 
            res.status(500).json({ error: 'Error retrieving data' });
        else 
            res.json(results);
    });
})

module.exports = { settingsRoutes: router };