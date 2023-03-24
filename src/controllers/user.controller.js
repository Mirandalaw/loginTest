const userService = require('../services/user.service.js');

module.exports = {
    findAll: async (req, res) => {
        try {
            const user = await userService.findAll();
            if (user.length == 0) return res.status(404).send({ statusCode: 404, msg: "User was not found" });
            return res.status(200).send({ data: { user }, statusCode: 200, msg: "find all users" });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ statusCode: 400, msg: "failed find all users" });
        }
    },
    findById: async (req, res) => {
        try {
            const user = await userService.findOne(req.query);
            if (user.length == 0) return res.status(404).send({ statusCode: 404, msg: "User was not found" });
            return res.status(200).send({ data: user, statusCode: 200, msg: "find an user" });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ statusCode: 400, msg: "failed find an user" });
        }
    },
    createUser: async (req, res) => {
        try {
            const user = await userService.create(req);
            const new_user = await userService.findOne(req);
            return res.status(200).send({ data: new_user, statusCode: 200, msg: "create an user" });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ statusCode: 400, msg: "failed create an user" });
        }
    },
    delete: async (req, res) => {
        try {
            const { user_email } = req.query;
            const user = await userService.deleteUser(user_email);
            return res.status(200).send({ data: user, statusCode: 200, msg: "success to delete an user" });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ statusCode: 400, msg: "failed to delete an user" });
        }
    }
}