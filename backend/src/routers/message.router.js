const express=require("express");
const protectRoute = require("../middleware/auth.middleware");
const { getUsers, getMessage, sendMessage } = require("../controllers/message.controller");
const router=express.Router();

router.get("/users",protectRoute,getUsers)

router.post("/message/:id",protectRoute,sendMessage)

router.get("/messages/:id",protectRoute,getMessage)

module.exports=router