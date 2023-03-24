const { secretKey } = require('../config/jwtconfig');
const jwt = require('../utils/jwtUtil');
const redis = require('../utils/redisUtil');
const authService = require('../services/auth.service');

const ACCESSTOKEN_INVALID = -4;
const REFRESHTOKEN_INVALID = -5;
const ACCESSTOKEN_EXPIRED = -6;
const REFRESHTOKEN_EXPIRED = -7;

const authMiddleware = {
    checkToken: async (req, res, next) => {
        const { accessToken, result } = await authService.verifyToken(req);
        if (result === ACCESSTOKEN_INVALID) {
            return res.status(403).send({ statusCode: 403 });
        }
        else if (result === REFRESHTOKEN_INVALID) {
            return res.status(401).send({ statusCode: 401, msg: '재로그인 해주세요' });
        }
        else if (result === ACCESSTOKEN_EXPIRED) {
            res.header('AccessToken', "Bearer " + accessToken);
            return next();
        }
        else if (result === REFRESHTOKEN_EXPIRED) {
            return res.status(401).send({ statusCode: 401, msg: '재로그인 해주세요' });
        }
        res.header('AccessToken', "Bearer " + accessToken);

        return next();
    }
}
module.exports = authMiddleware;