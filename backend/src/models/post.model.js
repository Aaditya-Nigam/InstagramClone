const mongoose=require("mongoose")

const postSchema=new mongoose.Schema({
    caption: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps: true})

const Post=mongoose.model("Post",postSchema);
module.exports=Post