const path = require('path');
module.exports = {
    MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://tkekdzhd:pwd@cluster0.usfrw.mongodb.net/test",
    ALLOW_CORS_URI: process.env.ALLOW_CORS_URI || 'http://localhost:4000',
    SERVER_PORT: process.env.SERVER_PORT || 4000



};
