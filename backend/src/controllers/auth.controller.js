const bcrypt=require("bcrypt")
const User=require("../models/auth.model");
const generateToken = require("../lib/auth");
const v2 = require("../lib/cloudinary");

const authSignUp=async (req,res)=>{
    try {
        const {fullName,email,password,userName}=req.body;
        if(!fullName || !email || !password || !userName){
            res.status(500).json({message: "Feilds are missing!"});
            return ;
        }
        let user=await User.findOne({email});
        if(user){
            res.status(500).json({message: "Email already used!"})
            return ;
        }
        user=await User.findOne({userName})
        if(user){
            res.status(500).json({message: "Username already taken!"})
            return ;
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new User({
            fullName,
            email,
            password: hashedPassword,
            userName
        })
        if(!newUser){
            res.status(400).json({message: "Internal server error!"});
            return ;
        }
        generateToken(newUser._id,res);
        await newUser.save()
        res.status(201).json({
            fullName: newUser.fullName,
            email: newUser.email,
            userName: newUser.userName,
            posts: newUser.posts,
            followers: newUser.followers,
            following: newUser.following,
            _id: newUser._id,
            profilePic: newUser.profilePic,
            bookmarks: newUser.bookmarks,
            bio: newUser.bio
        })
    } catch (error) {
        console.log("error in signup controller: ",error.message)
        res.status(404).json({message: "Internal server error!"});
    }
}

const authLogin=async (req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            res.status(500).json({message: "Fields are missing!"})
            return ;
        }
        const user=await User.findOne({email})
        if(!user){
            res.status(500).json({message: "Invalid credentials!!"});
            return ;
        }
        const checkPassword=await bcrypt.compare(password,user.password);
        if(!checkPassword){
            res.status(500).json({message: "Invalid credentials!"});
            return ;
        }
        generateToken(user._id,res);
        res.status(201).json({
            fullName: user.fullName,
            email: user.email,
            userName: user.userName,
            posts: user.posts,
            followers: user.followers,
            following: user.following,
            _id: user._id,
            profilePic: user.profilePic,
            bookmarks: user.bookmarks,
            bio: user.bio
        })
    } catch (error) {
        console.log("error in login controller: ",error.message)
        res.status(500).json({message: error.message});
    }
}

const authLogout=async(req,res)=>{
    try {
        res.cookie("jwt","",{
            maxAge: 0
        })
        res.status(201).json({message: "User logged out successfully!"});
    } catch (error) {
        console.log("error in logou controller: ",error.message)
        res.status(500).json({message: "Internal server error!"});
    }
}

const authCheck=async (req,res)=>{
    try {
        res.status(201).json(req.user)
    } catch ({error}) {
        res.status(404).json({message: "Internal server error"})
        console.log("error in check controller: ",error.message);
    }
}

const authUpdateProfile=async (req,res)=>{
    try {
        const {profilePic,bio}=req.body;
        let image;
        if(profilePic){
            const updatedResponse=await v2.uploader.upload(profilePic)
            image=updatedResponse.secure_url;
        }
        const user=await User.findByIdAndUpdate(req.user._id,{profilePic: image,bio},{new:true});
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({message: "Internal server error!"});
        console.log("error in update profile controller: ",error.message);
    }
}

const authFollowOrUnfollow=async (req,res)=>{
    try{
        const userId=req.user._id;
        const friendId=req.params.id;
        const user=await User.findById(userId);
        const friend=await User.findById(friendId);
        if(!user || !friend){
            res.status(500).json({message: "Invalid user!"})
            return ;
        }
        if(req.user.following.includes(friendId)){
            await Promise.all([
                User.updateOne({_id: userId},{$pull: {following: friendId}}),
                User.updateOne({_id: friendId},{$pull: {followers: userId}})
            ])
            res.status(201).json({message: "Unfollowed successfully!"});
        }else{
            await Promise.all([
                User.updateOne({_id: userId},{$push: {following: friendId}}),
                User.updateOne({_id: friendId},{$push: {followers: userId}})
            ])
            res.status(201).json({message: "Followed successfully!"});
        }
    }catch(error){
        res.status(500).json({message: "Internal server error!"})
        console.log("error in follow unfollow controller: ",error.message);
    }
}

const authGetProfile=async (req,res)=>{
    try {
        const id=req.params.id;
        const getUser=await User.findById(id).select("-password");
        if(!getUser){
            res.status(404).json({message: "Inavlid userId-User not found!"})
            return ;
        }
        res.status(201).json(getUser);
    } catch (error) {
        res.status(500).json({message: "Inetrnal server error!"})
        console.log("error in get profile controller: ",error.message)
    }
}


module.exports={
    authSignUp,
    authLogin,
    authLogout,
    authCheck,
    authUpdateProfile,
    authFollowOrUnfollow,
    authGetProfile
}