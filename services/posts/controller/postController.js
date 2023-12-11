const Post = require("../model/postSchema");
const User = require("../model/userSchema");
//create post
module.exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      photo: req.body.photo,
      user: req.user._id,
    });

    req.user.posts.push(post);
    await req.user.save();

    const postId = post._id;
    const getPost = await Post.findById(postId).populate("user", "_id name");

    return res
      .status(201)
      .json({ message: "Posted successfully!", Details: getPost });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//my posts
module.exports.myPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = user.posts;
    const allUserPosts = await Promise.all(
      posts.map(async (post) => {
        const allpost = await Post.findById(post._id);
        return allpost;
      })
    );
    const filteredPosts = allUserPosts.filter((post) => post !== null);
    return res.status(200).json({ filteredPosts });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//delete post
module.exports.deletePost = async (req, res) => {
  try{
    const {id} = req.params;
    console.log("Post ID to delete:", id);
    const post = await Post.findByIdAndDelete(id);

    return res.status(200).json({message: "Post deleted successfully", post});
  }catch(err){
    console.log(err);
    return res.status(500).json({message: "Internal server error"});
  }
}

