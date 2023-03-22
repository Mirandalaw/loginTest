const jwt = require('jsonwebtoken');
const { secretKey, options } = require('../config/jwtconfig');
module.exports = {
    createAccessToken: async () => {
        const result = jwt.sign()
        return result;
    }
}