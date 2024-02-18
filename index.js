const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const authRouter = require("./router/authRouter");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);

// Routes
app.use(authRouter);


app.listen(PORT, () => {
  console.log("Running on PORT : ", PORT);
});
