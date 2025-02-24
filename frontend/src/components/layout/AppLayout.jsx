import { Outlet, useNavigate } from "react-router-dom"
import { SideBar } from "../UI/SideBar"
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect } from "react";

export const AppLayout=()=>{

    const {authUser,logout}=useAuthStore();
    
    const navigate=useNavigate();
    useEffect(()=>{
        if(!authUser){
            navigate("/login");
        }
    },[authUser])

    return (
        <div className="flex">
            <SideBar/>
            <Outlet/>
        </div>
    )
}