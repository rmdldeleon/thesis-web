const { con } = require('./Connection');

//functions for queries
const insertActionResults = (actionResults, callback) => {
    let ar = actionResults
    let JSONResults = actionResults.JSONResults

    const values = [ar.dsid, ar.dsname, ar.actiontype, ar.actioninput, ar.actioncount, ar.inputparameters, ar.speedms, ar.speednotation, ar.size, ar.sizepointers, 
    ar.pointersAdded, ar.sizeAdded, ar.space, ar.spacenotation, ar.spaceAdded, ar.threads, JSONResults]

    const query = `
        INSERT INTO actionresults (ActionNumber, DSID, DSName, ActionType, StartingIndex, EndIndex_Count, Direction, 
        SpeedMS, SpeedNotation, Size, SizePointers, PointersAdded, SizeAdded, SpaceOccupied, SpaceNotation, SpaceAdded, ThreadsUsed, JSONResults) 
        VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`    
    
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


module.exports = { insertActionResults, updateCapacity };