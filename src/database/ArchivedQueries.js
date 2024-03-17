const { con } = require('./Connection');

const archiveDS = (data, AccountID, callback) => {
    const DSBatch = data.batch   

    const query = `
    INSERT INTO archivedds 
    SELECT NULL, datastructures.* 
    FROM datastructures
    WHERE AccountID = ? AND DSBatch > ?`

    const values = [AccountID, DSBatch]
    
    con.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

const archiveAS = (data, AccountID, callback) => {
    const DSBatch = data.batch   
    const ActionSet = data.actionnumber

    const query = 
    `INSERT INTO archivedas
    SELECT * 
    FROM actionresults
    WHERE AccountID = ? AND DSBatch > ? OR (DSBatch = ? AND ActionSet > ?);`

    const values = [AccountID, DSBatch, DSBatch, ActionSet]
    
    con.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}


module.exports = { archiveDS, archiveAS };
