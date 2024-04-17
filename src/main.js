const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const { con, db } = require('./database/database');

const { loginRoutes } = require('./routers/login');
const { signupRoutes } = require('./routers/signup');
const { analyticsRoutes } = require('./routers/analytics');
const { historyRoutes } = require('./routers/history');
const { settingsRoutes } = require('./routers/settings');
const { adminRoutes } = require('./routers/admin');
const { aboutRoutes } = require('./routers/about');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/history', historyRoutes);
app.use('/settings', settingsRoutes);
app.use('/admin', adminRoutes);
app.use('/about', aboutRoutes);

// Load SSL certificate and key
const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/custom-list.online/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/custom-list.online/fullchain.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/custom-list.online/chain.pem') // Include chain certificate if available
};

// Create HTTPS server
const httpsServer = https.createServer(options, app);

// Start HTTPS server
httpsServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
