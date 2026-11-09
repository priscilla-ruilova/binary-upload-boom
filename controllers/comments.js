const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id, //we can use params since we already include the id in the url and store it here
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id); //here we redirect to the same post
    } catch (err) {
      console.log(err);
    }
  },
};
