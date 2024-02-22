const { Router } = require("express");
const authController = require("../controller/authController");
const {requireAuth} = require('../middleware/authMiddleware')

const authRouter = Router();

authRouter.get('/', authController.welcome )
authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);
authRouter.get("/logout", authController.logout);
authRouter.post("/change-password/:id", authController.change_password);
authRouter.get("/testme/:id", requireAuth, (req, res)=> { 
    res.send("test route works bro!")
})

module.exports = authRouter;
