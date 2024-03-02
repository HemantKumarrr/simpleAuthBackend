const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const authRouter = require("./router/authRouter");
const userRouter = require("./router/userRouter");

const app = express();
const PORT = process.env.PORT || 8080;

const connectDB = require("./db/mongoDB");
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://simple-auth-frontend-one.vercel.app",
    credentials: true,
  })
);

// Routes
app.get('/', (req,res)=> res.send("Welcome to Auth app"))
app.use(authRouter);
app.use(userRouter);

app.listen(PORT, () => {
  console.log("Running on PORT : ", PORT);
});
