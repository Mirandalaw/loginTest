const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const redis = require('../utils/redisUtil');
const { options, secretKey } = require('../config/jwtconfig');

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {

    //access 토큰 생성
    /**
     * 
     * @param {string} user_uuid 
     * @returns {string} accessToken
     */
    createAccessToken: async (user_uuid) => {
        const payload = {
            uuid: user_uuid,
        };
        const result = jwt.sign(payload, secretKey, options);
        return result;
    },

    //refresh 토큰 생성
    /**
     * 
     * @returns {string} refreshToken
     */
    createRefreshToken: async () => {
        const result =
            jwt.sign({}, secretKey, {
                algorithm: 'HS256',
                expiresIn: '10m',
            })

        return result;
    },
    /**
     * 
     * @param {string} token accessToken || refreshToken
     * @returns jwt.payload
     */
    verify: async (token) => {
        let decoded;
        try {
            decoded = jwt.verify(token, secretKey);
            return decoded;
        } catch (error) {
            if (error.message === 'jwt expired') {
                console.log('AccessToken is expired');
                return TOKEN_EXPIRED;
            } else if (error.message === 'invalid token') {
                console.log('AccessToken is invalid');
                return TOKEN_INVALID;
            } else {
                console.log('AccessToken is invalid');
                return TOKEN_INVALID;
            }
            return decoded;
        }
    },
    /**
     * 
     * @param {string} token refreshToken
     * @param {string} uuid user_uuid
     * @returns false || true || TOKEN_EXPIRED || TOKEN_INVALID
     */
    refreshVerify: async (token, uuid) => {
        try {
            const existing_refreshToken = await redis.get(uuid);
            if (existing_refreshToken === token) {
                try {
                    jwt.verify(token, secretKey);
                    return true;
                } catch (error) {
                    console.log(error);
                    if (error.message === 'jwt must be provided') {
                        console.log('RefreshToken is expired');
                        return TOKEN_EXPIRED;
                    } else if (error.message === 'invalid token') {
                        console.log('RefreshToken is invalid');
                        return TOKEN_INVALID;
                    } else {
                        console.log('RefreshToken is invalid');
                        return TOKEN_INVALID;
                    }
                }
            }
        } catch (error) {
            console.log(error);
            throw new Error('while verifying a refreshToken');
        }
    }
}
