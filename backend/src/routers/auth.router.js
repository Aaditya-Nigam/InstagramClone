const express=require("express");
const { authSignUp, authLogin, authLogout, authCheck, authUpdateProfile, authFollowOrUnfollow, authGetProfile } = require("../controllers/auth.controller");
const protectRoute = require("../middleware/auth.middleware");
const router=express.Router()

router.post("/signUp",authSignUp);

router.post("/login",authLogin)

router.post("/logout",authLogout)

router.get("/check",protectRoute,authCheck)

router.put("/updateProfile",protectRoute,authUpdateProfile)

router.put("/folowOrUnfollow/:id",protectRoute,authFollowOrUnfollow)

router.get("/profile/:id",protectRoute,authGetProfile)


module.exports=router