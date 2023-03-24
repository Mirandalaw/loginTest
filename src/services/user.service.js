const userModel = require('../models/userModel');
const { createSalt, createHashedPassword } = require('../utils/cryptoUtil');
const { createUUID } = require('../utils/uuidUtil');

module.exports = {
    findAll: async () => {
        try {
            const user = await userModel.findAll();
            return user;
        } catch (error) {
            throw new Error('Error while finding all users');
        }
    },
    findOne: async (req) => {
        try {
            const { user_email } = req.body || req.query;
            const user = await userModel.findOne(user_email);
            return user[0];
        } catch (error) {
            throw new Error('Error while finding an user');
        }
    },
    create: async (req) => {
        try {
            const { user_name, user_email, password, phone_number } = req.body;
            const csalt = await createSalt();
            const user_uuid = createUUID();
            const { hashedPassword, salt } = await createHashedPassword(password, csalt);
            const user = await userModel.insertUser(user_uuid, salt, hashedPassword, user_name, user_email, phone_number);
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Error while creating an user');
        }
    },
    deleteUser: async (user_email) => {
        try {
            const user = await userModel.deleteUser(user_email);
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Error while deleting an user');
        }
    }
}