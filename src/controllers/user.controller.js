const userService = require('../services/user.service.js');

module.exports = {
    findAll: async (req, res) => {
        try {
            const user = await userService.findAll();
            if (user.length == 0) return res.status(404).send({ statusCode: 404, msg: "User is not found" });
            return res.status(200).send({ data: user, statusCode: 200, msg: "find all users" });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ statusCode: 400, msg: "failed find all users" });
        }
    },
    findById: async (req, res) => {
        try {
            const user = await userService.findOne(req.query);
            if (user.length == 0) return res.status(404).send({ statusCode: 404, msg: "User is not found" });
            return res.status(200).send({ data: user, statusCode: 200, msg: "find an user" });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ statusCode: 400, msg: "failed find an user" });
        }
    },
    createUser: async (req, res) => {
        try {
            const user = await userService.create(req);
            return res.status(200).send({ data: user, statusCode: 200, msg: "create an user" });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ statusCode: 400, msg: "failed create an user" });
        }
    },
}