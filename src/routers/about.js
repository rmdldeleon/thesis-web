const express = require('express');
const router = express.Router();

const { con, db } = require('../database/database');

router.post('/sendFeedback', (req, res) => {
    // db.sendFeedback(req.body.data, (err, results) => {
    //     if (err) 
    //         res.status(500).json({ error: 'Error retrieving data' });
    //     else 
    //         res.json(results);
    // });
})

module.exports = { aboutRoutes: router };