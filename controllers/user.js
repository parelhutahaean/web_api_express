const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

var methods = {};

methods.register = (req, res) => {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, parseInt(process.env.SALT_ROUNDS));
  }
  User.create(req.body)
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    res.send(err);
  })
}

methods.login = (req, res) => {
  User.findOne({
    username: req.body.username
  })
  .then(result => {
    if (bcrypt.compareSync(req.body.password, result.password)) {
      let data = Object.assign({}, result.toJSON())
      delete data.password;
      var token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '3h' });
      res.send({token});
    } else {
      res.send({message: `Password not matched`});
    }
  })
  .catch(err => {
    res.send({message: `Username not valid`});
  })
}

methods.getAll = (req, res) => {
  User.find()
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    res.send(err);
  })
}

methods.getById = (req, res) => {
  User.findById(req.params.id)
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    res.send(err);
  })
}

methods.update = (req, res) => {
  User.findById(req.params.id)
  .then(result => {
    result.username = req.body.username || result.username;
    result.email = req.body.email || result.email;
    result.password = req.body.password ? bcrypt.hashSync(req.body.password, parseInt(process.env.SALT_ROUNDS)) : result.password;
    console.log('++++++++++++++++++++++++++');
    result.save()
    .then(updated => {
      res.send(updated);
    })
    .catch(err => {
      res.send(err);
    })
  })
}

methods.delete = (req, res) => {
  User.findById(req.params.id)
  .then(result => {
    result.remove()
    .then(deleted => {
      res.send({message: `User ${result.id} has been deleted`});
    })
    .catch(err => {
      res.send(err);
    })
  })
  .catch(err => {
    res.send(err);
  })
}

module.exports = methods;
