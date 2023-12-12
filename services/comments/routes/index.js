const express = require('express');
const router = express.Router();
const verifytoken = require('../middleware/verifytoken');
const commentController = require("../controller/commentController");

router.put('/post-comment/:postId', verifytoken.verify, commentController.createComment);
router.delete('/delete-comment/:commentId', verifytoken.verify, commentController.deleteComment);
router.get('/all-comments', verifytoken.verify, commentController.allComments);
module.exports = router;