const userController = require("../controller/userController");
const { requireAuth } = require("../middleware/authMiddleware");
const { Router } = require("express");
const userRouter = Router();

userRouter.delete("/profile/:id", requireAuth, userController.delete_user);

module.exports = userRouter;
