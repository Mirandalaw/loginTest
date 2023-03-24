const userService = require("../services/user.service");
const authService = require('../services/auth.service');
const jwt = require('../utils/jwtUtil');
module.exports = {
    login: async (req, res) => {
        try {
            const user = await userService.findOne(req);
            const accessToken = await authService.login(user, req.body);
            if (accessToken) return res.status(200).send({ token: accessToken, statusCode: 200, msg: "success login" });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ statusCode: 500, msg: error.message });
        }
    }
}