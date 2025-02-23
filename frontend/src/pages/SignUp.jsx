import { useEffect, useState } from "react"
import {NavLink, useNavigate} from "react-router-dom"
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useAuthStore } from "../store/useAuthStore";
import toast, { Toaster } from "react-hot-toast";

export const SignUp=()=>{

    const {authUser,isSigningIn,signup}=useAuthStore()
    const [showPassword,setShowPassword]=useState(false);
    const [formData,setFormData]=useState({
        fullName: "",
        userName: "",
        email: "",
        password: ""
    })
    const navigate=useNavigate()
    useEffect(()=>{
        setInterval(()=>{
            if(authUser){
                navigate("/");
            }
        },1000)
    },[authUser])

    const formValidation=()=>{
        if(formData.email.trim()==""){
            console.log("empty email")
            toast.error("Email must be provided!");
            return false;
        }
        if(formData.password.length<6){
            console.log("empty pass")
            toast.error("Password must be 6 words!");
            return false;
        }
        if(formData.fullName.trim()==""){
            console.log("empty fn")
            toast.error("Full name must be provided!");
            return false;
        }
        if(formData.userName.trim()==""){
            console.log("empty un")
            toast.error("User name must be provided!");
            return false;
        }
        return true;
    }

    const handleFormSubmit=async(e)=>{
        e.preventDefault();
        const success=formValidation()
        if(success===true){
            console.log("hoi")
            await signup(formData);
            setFormData({
                fullName: "",
                userName: "",
                email:"",
                password: ""
            });
        }
    }

    return (
        <main className="w-screen min-h-screen bg-black flex items-center justify-center text-white">
            <div>
                <div className="px-16 pt-2 pb-8 border-1 rounded flex flex-col items-center border-[rgb(85,85,85)] gap-2">  
                    <img src="./Logo-Instagram-1.png" alt="Instagram" className="invert w-[200px]" />
                    <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
                        <input type="text" name="fullName" id="fullName" placeholder="Full name" className="border-1 w-[350px] bg-[rgb(18,18,18)] border-[rgb(85,85,85)] px-2 py-2 rounded-lg outline-none" value={formData.fullName} onChange={(e)=> setFormData({...formData,[e.target.name]: e.target.value})}/>
                        <input type="text" name="userName" id="userName" placeholder="User name" className="border-1 w-[350px] bg-[rgb(18,18,18)] border-[rgb(85,85,85)] px-2 py-2 rounded-lg outline-none" value={formData.userName} onChange={(e)=> setFormData({...formData,[e.target.name]: e.target.value})}/>
                        <input type="text" name="email" id="email" placeholder="Email address" className="border-1 w-[350px] bg-[rgb(18,18,18)] border-[rgb(85,85,85)] px-2 py-2 rounded-lg outline-none" value={formData.email} onChange={(e)=> setFormData({...formData,[e.target.name]: e.target.value})}/>
                        <div className="border-1 w-[350px] bg-[rgb(18,18,18)] border-[rgb(85,85,85)] px-2 py-2 rounded-lg flex items-center mb-[10px]">
                            <input type={showPassword?"text":"password"} name="password" id="password" placeholder="Password" className="w-full outline-none"  value={formData.password} onChange={(e)=> setFormData({...formData,[e.target.name]: e.target.value})}/>
                            {
                                showPassword? <IoMdEyeOff className="text-lg" onClick={()=> setShowPassword(!showPassword)}/>:<IoMdEye className="text-lg" onClick={()=> setShowPassword(!showPassword)}/>
                            }
                        </div>
                        <button type="submit" className="bg-sky-500 rounded-lg py-1 text-lg cursor-pointer hover:bg-sky-600" disabled={isSigningIn}>Sign up</button>
                    </form>
                    <p>Already have an account? <NavLink to="/login" className="text-sky-700 hover:underline hover:text-sky-500">Log in</NavLink></p>
                </div>
                <div>

                </div>
            </div>
            <Toaster/>
        </main>
    )
}