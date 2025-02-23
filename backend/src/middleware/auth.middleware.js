const jwt=require("jsonwebtoken");
const User = require("../models/auth.model");

const protectRoute=async (req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        if(!token){
            res.status(400).json({message: "Token missing-User unauthenticated!"})
            return ;
        }
        const verify=await jwt.verify(token,process.env.JWT);
        if(!verify){
            res.status(404).json({message: "Invalid token-User unauthenticated!"});
            return ;
        }
        const user=await User.findById(verify.userId).select("-password")
        if(!user){
            res.status(404).json({message: "Invalid token-User unauthenticated!"})
            return ;
        }
        req.user=user;
        next();
    } catch (error) {
        res.status(404).json({message: "Internal server error!"})
        console.log("error in protect route: ",error.message);
    }
}

module.exports=protectRoute