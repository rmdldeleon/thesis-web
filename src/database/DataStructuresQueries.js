const { con } = require('./Connection');

const getLastActionAndDataStructure = async (userDetails, callback) => {    
    const AccountID = userDetails.AccountID

    const query =
    `SELECT ds.*, ar.*
    FROM (
        SELECT ds.DSID as DSID_CLSC, ds.DSName as DSName_CLSC, ds.*
        FROM accounts a
        JOIN datastructures ds ON a.AccountID = ds.AccountID
        WHERE a.AccountID = ? 
          AND ds.DSBatch = a.LastUsedDSBatch
    ) ds
    LEFT JOIN (
        SELECT *
        FROM actionresults ar_inner
        WHERE ar_inner.ActionNumber = (
            SELECT MAX(ActionNumber)
            FROM actionresults
            WHERE DSID = ar_inner.DSID
        )
    ) ar ON ds.DSID = ar.DSID;`

    const values = [AccountID]

    con.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

const initializeDS = ({accountID, batch, treeliststr, linkedliststr, dynamicarraystr}, callback) => {
    const values = [
        accountID, batch, 
        accountID, batch, 
        accountID, batch,]

    const query = 
    "INSERT INTO `datastructures` (`DSID`, `AccountID`, `DSBatch`, `DSName`, `Threaded`, `Frequency`, `Capacity`, `Type`, `UserAddedPivot`, `DateCreated`) \
    VALUES (NULL, ?, ?, 'Tree List', '0', '100', NULL, 'CUSTOM LIST', '0', current_timestamp()), \
    (NULL, ?, ?, 'Doubly Linked List', '0', NULL, NULL, 'TRADITIONAL LIST', '0', current_timestamp()), \
    (NULL, ?, ?, 'Dynamic Array', '0', NULL, 100, 'TRADITIONAL ARRAY', '0', current_timestamp());"

    con.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

const updateJSONData = ({DSID, JSONData}, callback) => {
    const values = [JSONData, DSID]

    const query = 
    `UPDATE datastructures SET JSONData = ? WHERE DSID = ?`

    con.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

const getHighestBatch = (AccountID, callback) => {
    // this function is for getting the highest batch of an account

    const query = 
    `SELECT MAX(DSBatch) as DSBatch
    FROM datastructures
    WHERE AccountID = ?`

    const values = [AccountID]

    con.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

module.exports = { getLastActionAndDataStructure, initializeDS, updateJSONData, getHighestBatch };