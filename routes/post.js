const express = require("express");
const router = express.Router();

const checkMid = require("../middleware/check-auth");
const upload = require("../middleware/file");



const PostController=require('../Controllers/post');
router.post("", checkMid, upload, PostController.createPost);

router.get("",PostController.getPosts );

router.put("/:id", checkMid, upload,PostController.updatePost );

router.delete("/:id", checkMid,PostController.deletePost );

router.get("/:id", PostController.getPost);

module.exports = router;
