const jwt = require('jsonwebtoken');
require('dotenv').config();

var methods = {};

methods.authenticate = (req, res, next) => {
  jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.send({message: `Welcome to memo app!!! Please login with verified account.`});
    } else {
      req.user = decoded;
      next();
    }
  });
}

methods.authorize = (req, res, next) => {
  if (req.params.user_id == req.user._id) {
    next();
  } else {
    res.send({message: `User not authorized!!!`});
  }
}

module.exports = methods;
