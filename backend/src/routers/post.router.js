const express=require("express");
const protectRoute = require("../middleware/auth.middleware");
const { addNewPost, getAllPosts, getUserPosts, likeOrUnlikePost, addNewComment, getComments, deletePost, bookMarkPost } = require("../controllers/post.controller");
const router=express.Router();

router.post("/addPost",protectRoute,addNewPost)

router.get("/posts",protectRoute,getAllPosts)

router.get("/userPosts/:id",protectRoute,getUserPosts)

router.put("/likeOrUnlike/:id",protectRoute,likeOrUnlikePost)

router.post("/addComment/:postId",protectRoute,addNewComment)

router.get("/comments/:postId",protectRoute,getComments)

router.delete("/post/:postId",protectRoute,deletePost)

router.post("/bookMark/:postId",protectRoute,bookMarkPost)

module.exports=router