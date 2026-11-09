const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost); //we call it :id as a variable name because mongodb will automatically create a unique id that appears in the url after the '/'. We could call it anything but we are calling it id!

router.post("/createPost", upload.single("file"), postsController.createPost); //steps before we get to controller are 'middleware'; the upload middleware is requiring us to use multer. Multer takes the file, checks it, and uploads it.

router.put("/likePost/:id", postsController.likePost);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
