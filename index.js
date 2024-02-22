const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const authRouter = require("./router/authRouter");
const userRouter = require("./router/userRouter");

const app = express();
const PORT = process.env.PORT;

const connectDB = require("./db/mongoDB");
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use(authRouter);
app.use(userRouter);

app.listen(PORT, () => {
  console.log("Running on PORT : ", PORT);
});
