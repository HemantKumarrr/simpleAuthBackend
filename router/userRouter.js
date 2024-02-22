const userController = require('../controller/userController');
const {requireAuth} = require('../middleware/authMiddleware');
const { Router } = require("express");
const userRouter = Router();

userRouter.get("/get-user/:id", requireAuth, userController.get_user);

module.exports = userRouter;