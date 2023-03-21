const { Router } = require('express');
const controller = require('../controllers/user.controller');
const userRouter = Router();
const { check } = require('express-validator')
const validationResult = require('../middlewares/validator');

userRouter.get('/', controller.findById);
userRouter.post('/', [
    check('user_name').exists().isString(),
    check('user_email').exists().isString(),
    check('password').exists().isString().isLength({ min: 8 }),
    validationResult
], controller.createUser);
userRouter.get('/all', controller.findAll);
module.exports = userRouter;