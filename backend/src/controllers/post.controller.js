const v2 = require("../lib/cloudinary");
const User = require("../models/auth.model");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

const addNewPost=async (req,res)=>{
    try {
        const userId=req.user._id;
        const {image,caption}=req.body;
        if(!image){
            res.status(500).json({message: "Image is missing!"});
            return ;
        }
        const updatedResponse=await v2.uploader.upload(image);
        const newPost=new Post({
            caption,
            image: updatedResponse.secure_url,
            userId
        })
        await newPost.populate({path: 'userId', select: '-password'});
        await newPost.save();
        await User.updateOne({_id: userId},{$push: {posts: newPost._id}});
        res.status(201).json(newPost);
    } catch (error) {
        console.log("error in add new post router: ",error.message)
        res.status(500).json({message: "Internal server error!"});
    }
}

const getAllPosts=async (req,res)=>{
    try {
        const posts=await Post.find().sort({createdAt: -1})
        .populate({
            path: 'userId', 
            select: 'userName , profilePic'
        })
        .populate({path: 'comments', sort: {createdAt: -1}, populate: {
            path: 'userId',
            select: 'userName, profilePic'
        }})
        res.status(201).json(posts);
    } catch (error) {
        console.log("error in get all posts router: ",error.message)
        res.status(500).json({message: "Internal server error!"})
    }
}

const getUserPosts=async(req,res)=>{
    try {
        const userId=req.params.id;
        const posts=await Post.find({userId}).sort({createdAt: -1})
        .populate({
            path: 'userId',
            select: 'userName, profilePic'
        })
        .populate({
            path: 'comments',
            sort: {createdAt: -1},
            populate: {
                path: 'userId',
                select: 'userName, profilePic'
            }
        })
        res.status(201).json(posts)
    } catch (error) {
        console.log("error in get user posts: ",error.message)
        res.status(500).json({message: "Internal serever error!"});
    }
}

const likeOrUnlikePost=async (req,res)=>{
    try {
        const postId=req.params.id
        const userId=req.user._id;
        const post=await Post.findById(postId)
        if(!post){
            res.status(404).son({message: "Post does not exists!"})
            return ;
        }
        if(post.likes.includes(userId)){
            await Post.updateOne({_id: postId}, {$pull: {likes: userId}});
            res.status(201).json({message: "Unliked successfully!"});
        }else{
            await Post.updateOne({_id: postId}, {$push: {likes: userId}});
            res.status(201).json({message: "Liked successfully!"});
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error!"});
        console.log("error in like or unlike router: ",error.message)
    }
}

const addNewComment=async (req,res)=>{
    try {
        const {postId}=req.params;
        const userId=req.user._id;
        const {text}=req.body;
        if(!text){
            res.status(500).json({message: "Text is missing!"});
            return ;
        }
        const post=await Post.findById(postId);
        if(!post){
            res.status(500).json({message: "Invalid post id!"});
            return ;
        }
        const newCommment=new Comment({
            text,
            postId,
            userId
        })
        await newCommment.populate({path: 'userId', select: 'userName, profilePic'})
        await newCommment.save();
        await Post.updateOne({_id: postId}, {$push: {comments: newCommment._id}});
        res.status(201).json(newCommment);
    } catch (error) {
        res.status(500).json({message: "Internal server error!"});
        console.log("error in add new comment controller: ",error.message);
    }
}

const getComments=async (req,res)=>{
    try {
        const {postId}=req.params
        const userId=req.user._id;
        const post=await Post.findById(postId);
        if(!post){
            res.status(500).json({message: "Invalid post id!"});
            return ;
        }
        const comments=await Comment.find({postId})
        res.status(201).json(comments)
    } catch (error) {
        res.status(500).json({message: "Internal server error!"})
        console.log("error in get comment controller: ",error.message)
    }
}

const deletePost=async (req,res)=>{
    try {
        const {postId}=req.params;
        const userId=req.user._id;
        await Post.findByIdAndDelete(postId);
        await Comment.deleteMany({postId});
        await User.updateOne({userId}, {$pull: {posts: postId}});
        res.status(201).json({message: "Post deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: "Internal server error!"})
        console.log("error in delete post controller: ",error.message)
    }
}

const bookMarkPost=async(req,res)=>{
    try {
        const {postId}=req.params;
        const userId=req.user._id;
        const post=await Post.findById(postId);
        if(!post){
            res.status(500).json({message: "Invalid post id!"});
            return ;
        }
        if(req.user.bookmarks.includes(postId)){
            await User.updateOne({_id: userId}, {$pull: {bookmarks: postId}})
            res.status(201).json({message: "Post added to Bookmarks"})
        }else{
            await User.updateOne({_id: userId}, {$push: {bookmarks: postId}})
            res.status(201).json({message: "Post removed from Bookmarks"})
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error!"})
        console.log("error in bookmark post controller: ",error.message)
    }
}

module.exports={
    addNewPost,
    getAllPosts,
    getUserPosts,
    likeOrUnlikePost,
    addNewComment,
    getComments,
    deletePost,
    bookMarkPost
}