const { Router } = require('express');
const authRouter = Router();
const controller = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth');
authRouter.post('/login', controller.login);

module.exports = authRouter;