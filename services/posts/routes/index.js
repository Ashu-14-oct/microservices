const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');
const verifytoken = require('../middleware/verifytoken');

router.post('/create-post', verifytoken.verify ,postController.createPost);
router.get('/my-posts', verifytoken.verify, postController.myPosts);
router.delete('/delete-post/:id', verifytoken.verify, postController.deletePost);
module.exports = router;