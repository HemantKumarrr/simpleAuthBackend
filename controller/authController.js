const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Validation Error Handling
const handleError = (err) => {
  const error = { email: "", password: "" };

  // Unique Email Validation
  if (err.code === 11000) {
    return (error["email"] = "email already register");
  }

  // name, email, password validation
  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }

  return error;
};

// JWT generate
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: maxAge });
};

module.exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let data = await User.create({ name, email, password });
    const token = createToken(data._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true });
    res.send({ uid: data._id, name: data.name, email: data.email });
  } catch (err) {
    const error = handleError(err);
    res.status(400).json(error);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let data = await User.login(email, password);
    const token = createToken(data._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true });
    res.send({ uid: data._id, name: data.name, email: data.email });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1, httpOnly: true });
    res.send("logout");
  } catch (err) {
    res.send(err);
  }
};
