import { create } from "zustand";
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast";

export const usePostStore=create((set)=>({
    isPosting: false,
    allHomeFeeds: [],
    isFetchingHomeFeeds: false,

    getAllPosts: async ()=>{
        set({isFetchingHomeFeeds: true})
        try {
            const res=await axiosInstance.get("/post/posts");
            set({allHomeFeeds: res.data})
        } catch (error) {
            console.log(error.response.data.message);
        }finally{
            set({isFetchingHomeFeeds: false})
        }
    },

    post: async(image,caption)=>{
        set({isPosting: true})
        try {
            const res=await axiosInstance.post("/post/addPost",{image,caption})
            toast.success("Successfully poasted!");
            return true;
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message)
            return false
        }finally{
            set({isPosting: false});
        }
    }

}))