const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/create-account', userController.createUser);
router.post('/sign-in', userController.signIn);
module.exports = router;