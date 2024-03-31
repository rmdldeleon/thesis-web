const { con } = require('./Connection')

// object of queries 
const db = {
    ...require('./AccountsQueries'),
    ...require('./DataStructuresQueries'),
    ...require('./ActionResultsQueries'),
    ...require('./ArchivedQueries'),
    ...require('./General')
};

module.exports = { con, db };