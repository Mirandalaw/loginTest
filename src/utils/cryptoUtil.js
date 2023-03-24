const crypto = require('crypto');
const util = require('util');

const randomBytesPromise = util.promisify(crypto.randomBytes);
const pdkdf2Promise = util.promisify(crypto.pbkdf2);

module.exports = {
    createSalt: async () => {
        const buf = await randomBytesPromise(64);
        return buf.toString("base64");
    },
    createHashedPassword: async (password, csalt) => {
        const salt = csalt;
        const key = await pdkdf2Promise(password, salt, Number(process.env.KEY_STRETCHING), 64, "sha512");
        const hashedPassword = key.toString("base64");
        return { hashedPassword, salt };
    },
    verifyPassword: async (password, userSalt, userPassword) => {
        const key = await pdkdf2Promise(password, userSalt, Number(process.env.KEY_STRETCHING), 64, "sha512");
        const hashedPassword = key.toString('base64');
        if (hashedPassword === userPassword) return true;
        return false;
    }
}

