const Memo = require('../models/memo');

var methods = {};

methods.create = (req, res) => {
  req.body.user_id = req.user._id
  Memo.create(req.body)
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    res.send(err)
  })
}

methods.getAll = (req, res) => {
  Memo.find()
  .populate('user_id')
  .exec((err, result) => {
    if(err) res.send(err);
    res.send(result);
  })
}

methods.getById = (req, res) => {
  Memo.findById(req.params.id)
  .populate('user_id')
  .exec((err, result) => {
    if(err) res.send(err);
    res.send(result);
  })
}

methods.getByUserId = (req, res) => {
  Memo.find({
    user_id: req.params.user_id
  })
  .populate('user_id')
  .exec((err, result) => {
    if(err) res.send(err);
    res.send(result);
  })
}

methods.update = (req, res) => {
  console.log(req.body);
  Memo.findById(req.params.id)
  .populate('user_id')
  .exec((err, result) => {
    if(err) res.send(err);
    if (result.user_id._id == req.user._id) {
      result.memo = req.body.memo || result.memo;
      result.save()
      .then(updated => {
        res.send(updated);
      })
      .catch(err => {
        res.send(err);
      })
    } else {
      res.send({message: `User not authorized!!!`});
    }
  })
}

methods.delete = (req, res) => {
  Memo.findById(req.params.id)
  .populate('user_id')
  .exec((err, result) => {
    if(err) res.send(err);
    if (result.user_id._id == req.user._id) {
      result.remove()
      .then(deleted => {
        res.send({message: `Memo ${result._id} has been deleted`})
      })
      .catch(err => {
        res.send(err);
      })
    } else {
      res.send({message: `User not authorized!!!`});
    }
  })
}

module.exports = methods;
