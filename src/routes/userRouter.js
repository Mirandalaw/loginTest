const { Router } = require('express');
const controller = require('../controllers/user.controller');
const userRouter = Router();
const { check } = require('express-validator')
const validationResult = require('../middlewares/validator');

userRouter.get('/', [
    check('user_email'),
    validationResult
]
    , controller.findById);
userRouter.post('/signup', [
    check('user_name').exists().isString(),
    check('user_email').exists().isString(),
    check('password').exists().isString().isLength({ min: 8 }),
    check('phone_number').exists().isString(),
    validationResult
], controller.createUser);
userRouter.get('/all', controller.findAll);
userRouter.delete('/', controller.delete);
module.exports = userRouter;