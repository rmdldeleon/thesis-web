const { con } = require('./Connection');
const { initializeDS } = require('./DataStructuresQueries')


//functions for queries
const checkExistingAccount = (userData, callback) => {
    const query = 
    `SELECT * 
    FROM accounts 
    WHERE Email = ? AND Password = ? AND Origin = ?`
    
    con.query(query, [userData.Email, userData.Password, userData.Origin], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

const checkExistingEmail = (userData, callback) => {
    const query = 
    `SELECT * 
    FROM accounts 
    WHERE Email = ? AND Origin = ?`
    
    con.query(query, [userData.Email, userData.Origin], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

const createAccount = async (userData, callback) => {
    try{
        const query = "INSERT INTO `accounts` (`Email`, `Password`, `isVerified`, `ExpirationDate`, `Firstname`, `Lastname`, `Origin`, `Role`, `AccountStatus`) VALUES (?, ?, '1', current_timestamp(), ?, ?, ?, ?, ?);"
        const values = [userData.Email, userData.Password, userData.Firstname, userData.Lastname, userData.Origin, userData.Role, userData.AccountStatus]
    
        let accountID

        const resultsAwait = await new Promise((resolve, reject) => {
            con.query(query, values, (err, results) => {
                if (err) {
                    console.error('Error creating account:', err);
                    callback(err, null);
                    reject(err);
                } else {
                    accountID = results.insertId
                    console.log("Account Created!")
                    resolve(results);
                }
            });
        });
        
        const batch = 1
        initializeDS({accountID, batch, treeliststr: userData.treeliststr, linkedliststr: userData.linkedliststr, dynamicarraystr: userData.dynamicarraystr, frequencyCapacity: 100}, (err, results) => {
            if (err) {
                console.error('Error initializing data structure:', err);
                callback(err, null);
            }else{
                console.log("Datastructures initialized!");
                callback(null, resultsAwait);
            }     
        });
    } catch (err) {
        console.log("error from create account queries", err)
    }
}

const updateLastUsedDSBatch = (data, callback) => {
    const query = 
    `UPDATE accounts SET LastUsedDSBatch = ? WHERE AccountID = ?`

    const values = [data.batch, data.accountID]
    
    con.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

const updateUserDetails = (data, callback) => {
    const query = `
    UPDATE accounts
    SET Email = ?, Password = ?, Firstname = ?, Lastname = ?
    WHERE AccountID = ?;`

    const values = [data.Email, data.Password, data.Firstname, data.Lastname, data.AccountID]

    con.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

module.exports = { checkExistingAccount, checkExistingEmail, createAccount, updateLastUsedDSBatch, updateUserDetails};