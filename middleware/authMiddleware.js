const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        res.status(400).json({ message: "token verification failed"})
      } else {
        next();
      }
    });
  } else {
    res.status(400).json({ message: "no token found"});
  }
};

module.exports = { requireAuth };