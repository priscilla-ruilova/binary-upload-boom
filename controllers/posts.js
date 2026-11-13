const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }).lean(); //go to post collections and find a document with logged in user property of id. Here you can find all the logged in user's posts. Only their posts.
      res.render("profile.ejs", { posts: posts, user: req.user }); 
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean(); //we'll find all posts and sort them by time they were created at in descending order; got to our db, find posts collection, sort ALL posts, pass it to the ejs 
      res.render("feed.ejs", { posts: posts }); //we'll pass it into the ejs and call it 'posts'
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    // console.log(req); //when we refresh, these console.logs help us see what the requests are. Refresh webpage and see results in terminal
    console.log(req.params);
    console.log(req.user);
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("post.ejs", { post: post, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id }); // before we destroy an image, we write this code to make sure the post even exsists in the first place!
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
