import { create } from "zustand"
import { axiosInstance } from "../lib/axios"

import toast, {} from "react-hot-toast"

export const useAuthStore=create((set)=> ({
    authUser: null,
    isLoggingIn: false,
    isSigningIn: false,
    isCheckingAuth: false,

    checkAuth: async ()=>{
        set({isCheckingAuth: true})
        try {
            const res=await axiosInstance.get("/auth/check")
            set({authUser: res.data})
        } catch (error) {
            set({authUser: null})
            console.log("error: ",error.response.data.message);
        }finally{
            set({isCheckingAuth: false});
        }
    },

    signup: async(formData)=>{
        set({isSigningIn: true});
        try {
            const res=await axiosInstance.post("/auth/signUp",formData);
            set({authUser: res.data});
            toast.success("Successfully Signed Up!")
        } catch (error) {
            set({authUser: null});
            console.log("error in signup: ",error.response.data.message);
            toast.error(error.response.data.message)
        }finally{
            set({isSigningIn: false})
        }
    },

    login: async(formData)=>{
        set({isLoggingIn: true});
        try {
            const res=await axiosInstance.post("/auth/login",formData);
            set({authUser: res.data})
            toast.success("Successfully logged In!")
        } catch (error) {
            set({authUser: null});
            console.log("error in login: ",error.response.data.message)
            toast.error(error.response.data.message)
        }finally{
            set({isLoggingIn: false})
        }
    },

    logout: async()=>{
        try {
            const res=await axiosInstance.post("/auth/logout");
            set({authUser: null});
        } catch (error) {
            console.log("error in logout: ",error.messgae)
        }
    }

}))