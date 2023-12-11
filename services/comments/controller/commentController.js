const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

module.exports.createComment = async (req, res) => {
    try{
        // console.log(req.user);

        const {comment} = req.body;
        const {postId} = req.params;

        console.log(postId);
        const post = await Post.findById(postId);
        console.log(post);
        if(!post){
            return res.status(404).json({message: "Post does not exist"});
        }

        const newComment = await Comment.create({
            comment,
            user: req.user,
        });

        post.comments.push(newComment);

        await post.save();


        return res.status(201).json({message: "Comment posted successfully", newComment});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }
}

//delete comment
module.exports.deleteComment = async (req, res) => {
    try{
        const {commentId} = req.params;
        console.log(commentId);
        const comment = await Comment.findById(commentId);
        if(!comment){
            return res.status(404).json({message: "Comment does not exist"});
        }
        await Comment.findByIdAndDelete(commentId);
        return res.status(200).json({message: "Comment deleted successfully"});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }
}

//get all comments
module.exports.allComments = async (req, res) => {
    try{
        const comments = await Comment.find();
        if(comments.length === 0){
            return res.status(200).json({message: "No comments posted yet"});
        }
        return res.status(200).json(comments);
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }
}