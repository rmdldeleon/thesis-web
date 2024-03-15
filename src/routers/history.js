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


// router.post('/', (req, res) => {
//     db.checkExistingEmail(req.body.data, (err, results) => {
//         if (err) 
//             res.status(500).json({ error: 'Error retrieving data' });
//         else 
//             res.json(results);
//     });
// })

// router.post('/createAccount', (req, res) => {
//     db.createAccount(req.body.data, (err, results) => {
//         if (err) 
//             res.status(500).json({ error: 'Error retrieving data' });
//         else 
//             res.json(results);
//     });
// })

module.exports = { historyRoutes: router };