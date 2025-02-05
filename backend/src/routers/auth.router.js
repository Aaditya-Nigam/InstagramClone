const express=require("express");
const router=express.Router()

router.post("/signUp",(req,res)=>{
    res.status(202).json({message: "login"});
})

router.post("/login",(req,res)=>{
    res.status(202).json({message: "login"});
})

router.post("/logout",(req,res)=>{
    res.status(202).json({message: "login"});
})

router.get("/check",(req,res)=>{
    res.status(202).json({message: "login"});
})


module.exports=router