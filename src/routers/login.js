const express = require('express');
const router = express.Router();

const { con, db } = require('../database/database');

router.post('/', (req, res) => {
    db.checkExistingAccount(req.body.data, (err, results) => {
        if (err) 
            res.status(500).json({ error: 'Error retrieving data' });
        else 
            res.json(results);
    });
})

module.exports = { loginRoutes: router };