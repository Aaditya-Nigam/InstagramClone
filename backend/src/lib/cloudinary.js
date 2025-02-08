const cloudinary=require("cloudinary")
const v2=cloudinary.v2;
const dotenv=require("dotenv")
dotenv.config();

v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

module.exports=v2