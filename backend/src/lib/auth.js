const jwt=require("jsonwebtoken")

const generateToken=(userId,res)=>{
    try{
        const token=jwt.sign({userId},process.env.JWT,{
            expiresIn: '7d'
        });
        res.cookie("jwt",token,{
            maxAge: 7*24*60*60*1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development"
        })
        return token;
    }catch(err){
        console.log("error in generateToken: ",err.message)
    }
}

module.exports=generateToken