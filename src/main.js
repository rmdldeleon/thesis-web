// global requirements
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');


// local requirements
const { con, db } = require('./database/database');

const { loginRoutes } = require('./routers/login');
const { signupRoutes } = require('./routers/signup')
const { analyticsRoutes } = require('./routers/analytics')
const { historyRoutes } = require('./routers/history')


// global variables
const app = express()
const PORT = process.env.PORT || 3001;

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routers
app.use('/login', loginRoutes)
app.use('/signup', signupRoutes)
app.use('/analytics', analyticsRoutes)
app.use('/history', historyRoutes)

// listeners
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});