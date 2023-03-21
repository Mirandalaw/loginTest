const userModel = require('../models/userModel');
const { createSalt, createHashedPassword } = require('../utils/cryptoUtil');

module.exports = {
    findAll: async () => {
        try {
            const user = await userModel.findAll();
            return user[0];
        } catch (error) {
            throw new Error('Error while finding all users');
        }
    },
    findOne: async (query) => {
        try {
            const { user_email } = query;
            const user = await userModel.findOne(user_email);
            return user[0];
        } catch (error) {
            throw new Error('Error while finding an user');
        }
    },
    create: async (req) => {
        try {
            const { user_name, user_email, password } = req.body;
            const csalt = await createSalt();
            const { hashedPassword, salt } = await createHashedPassword(password, csalt);
            const user = await userModel.insertUser(salt, hashedPassword, user_name, user_email);
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Error while creating an user');
        }
    }
}