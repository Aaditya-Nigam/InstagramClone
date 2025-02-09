const v2 = require("../lib/cloudinary");
const User = require("../models/auth.model");
const Message = require("../models/message.model");

const getUsers=async (req,res)=>{
    try {
        const userId=req.user._id;
        const users=await User.find({_id: {$ne: userId}}).select('-password');
        res.status(201).json(users)
    } catch (error) {
        res.status(500).json({message: "Internal server error!"});
        console.log("error in get users controller: ",error.message);
    }
}

const sendMessage=async (req,res)=>{
    try {
        const senderId=req.user._id
        const receiverId=req.params.id;
        const user=await User.findById(receiverId)
        if(!user){
            res.status(500).json({message: "User doenot exists!"});
            return ;
        }
        const {text,image}=req.body;
        if(!text && !image){
            res.status(500).json({message: "Fields are missing!"});
            return ;
        }
        if(image){
            const updatedResponse=await v2.uploader.upload(image);
            image=updatedResponse.secure_url;
        }
        const newMessage=new Message({
            text,
            image,
            senderId,
            receiverId
        })
        if(!newMessage){
            res.status(500).json({message: "Internal server error!"});
            return ;
        }
        await newMessage.save()
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({message: "Internal server error!"});
        console.log("error in send message controller: ",error.message)
    }
}

const getMessage=async (req,res)=>{
    try {
        const senderId=req.user._id;
        const receiverId=req.params.id;
        const user=await User.findById(receiverId)
        if(!user){
            res.status(500).json({message: "User doenot exists!"});
            return ;
        }
        const messages=await Message.find({
            $or: [
                {senderId: senderId, receiverId: receiverId},
                {senderId: receiverId, receiverId: senderId}
            ]
        })
        res.status(201).json(messages)
    } catch (error) {
        res.status(500).json({message: "Internal server error!"});
        console.log("error in get message controller: ",error.message)
    }
}

module.exports={
    getUsers,
    sendMessage,
    getMessage
}