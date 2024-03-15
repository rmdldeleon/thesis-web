const { con } = require('./Connection');

//functions for queries
const insertActionResults = (actionResults, callback) => {
    let ar = actionResults
    let JSONResults = actionResults.JSONResults
    let ActionDate = actionResults.ActionDate
    let ActionSet = actionResults.ActionSet
    
    const values = [ActionSet, ar.dsid, ar.dsname, ar.actiontype, ar.actioninput, ar.actioncount, ar.inputparameters, ar.speedms, ar.speednotation, ar.size, ar.sizepointers, 
    ar.pointersAdded, ar.sizeAdded, ar.space, ar.spacenotation, ar.spaceAdded, ar.threads, JSONResults, ActionDate]

    const query = `
        INSERT INTO actionresults (ActionNumber, ActionSet, DSID, DSName, ActionType, StartingIndex, EndIndex_Count, Direction, 
        SpeedMS, SpeedNotation, Size, SizePointers, PointersAdded, SizeAdded, SpaceOccupied, SpaceNotation, SpaceAdded, ThreadsUsed, JSONResults, ActionDate) 
        VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`    
    
    con.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

const updateCapacity = (actionResults, callback) => {
    const capacity = actionResults.capacity
    const dsid = actionResults.dsid

    const values = [capacity, dsid]

    const query = `UPDATE datastructures SET Capacity = ? WHERE dsid = ?`
    
    con.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

const getHistoryTableData = (AccountID, callback) => {
    const query = 
    `SELECT 
    ROW_NUMBER() OVER (ORDER BY datastructures.DSBatch DESC, actionresults.ActionSet DESC) AS RowNumber,
    datastructures.*, 
    actionresults.*
    FROM 
        datastructures
    LEFT JOIN 
        actionresults ON actionresults.DSID = datastructures.DSID
    WHERE 
        datastructures.AccountID = ?
    GROUP BY 
        datastructures.DSBatch, 
        actionresults.ActionDate
    ORDER BY 
        datastructures.DSBatch DESC, 
        actionresults.ActionSet DESC;`
    
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


module.exports = { insertActionResults, updateCapacity, getHistoryTableData };