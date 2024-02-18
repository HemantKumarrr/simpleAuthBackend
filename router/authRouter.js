const { Router } = require("express");
const authController = require("../controller/authController");

const authRouter = Router();

authRouter.get('/', authController.welcome )
authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);
authRouter.get("/logout", authController.logout);

module.exports = authRouter;
