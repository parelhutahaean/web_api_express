const express = require('express');
const router = express.Router();
const memoController = require('../controllers/memo');
const userController = require('../controllers/user');
const utils = require('../helpers/utils');

router.get('/', (req, res) => {
  res.send('Alive')
})

// NOTE: User
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/users', utils.authenticate, userController.getAll);
router.get('/users/:id', utils.authenticate, userController.getById);
router.put('/users/:id', utils.authenticate, utils.authorize, userController.update);
router.delete('/users/:id', utils.authenticate, utils.authorize, userController.delete);

// NOTE: Memo
router.post('/memos', utils.authenticate, memoController.create);
router.get('/memos', utils.authenticate, memoController.getAll);
router.get('/memos/:id', utils.authenticate, memoController.getById);
router.get('/memos/user/:user_id', utils.authenticate, utils.authorize, memoController.getByUserId);
router.put('/memos/:id', utils.authenticate, memoController.update);
router.delete('/memos/:id', utils.authenticate, memoController.delete);

module.exports = router
