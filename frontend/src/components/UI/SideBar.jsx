import { NavLink, useNavigate } from "react-router-dom"
import { GoHomeFill } from "react-icons/go";
import { IoSearchSharp } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { MdOutlineMessage } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaRegSquarePlus } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect, useState } from "react";
import {CreateSection} from "./CreateSection.jsx"

export const SideBar=()=>{

    const {logout}=useAuthStore();
    const [showCreate,setShowCreate]=useState(false);

    const handleLogout=async()=>{
        await logout();
    }

    return (
        <>
        <aside className="h-screen bg-black text-white py-4">
            <div className=" px-12">
                <img src="./Logo-Instagram-1.png" alt="" className="invert w-[130px]"/>
            </div>
            <div className="px-4">
                <ul className="flex flex-col gap-4">
                    <li className="px-3 py-2 rounded-lg hover:bg-zinc-800">
                        <NavLink to="/" className="flex items-center gap-3">
                            <GoHomeFill className="text-2xl"/>
                            <p className="text-md font-normal">Home</p>
                        </NavLink>
                    </li>
                    <li className="px-3 py-2 rounded-lg hover:bg-zinc-800">
                        <NavLink to="/" className="flex items-center gap-3">
                            <IoSearchSharp className="text-2xl"/>
                            <p className="text-md font-normal">Search</p>
                        </NavLink>
                    </li>
                    <li className="px-3 py-2 rounded-lg hover:bg-zinc-800">
                        <NavLink to="/" className="flex items-center gap-3">
                            <MdOutlineExplore className="text-2xl"/>
                            <p className="text-md font-normal">Explore</p>
                        </NavLink>
                    </li>
                    <li className="px-3 py-2 rounded-lg hover:bg-zinc-800">
                        <NavLink to="/" className="flex items-center gap-3">
                            <BsFillCameraReelsFill className="text-2xl"/>
                            <p className="text-md font-normal">Reels</p>
                        </NavLink>
                    </li>
                    <li className="px-3 py-2 rounded-lg hover:bg-zinc-800">
                        <NavLink to="/" className="flex items-center gap-3">
                            <MdOutlineMessage className="text-2xl"/>
                            <p className="text-md font-normal">Messages</p>
                        </NavLink>
                    </li>
                    <li className="px-3 py-2 rounded-lg hover:bg-zinc-800">
                        <NavLink to="/" className="flex items-center gap-3">
                            <FaRegHeart className="text-2xl"/>
                            <p className="text-md font-normal">Notifications</p>
                        </NavLink>
                    </li>
                    <li className="px-3 py-2 rounded-lg hover:bg-zinc-800" onClick={()=> setShowCreate(true)}>
                        <NavLink className="flex items-center gap-3">
                            <FaRegSquarePlus className="text-2xl"/>
                            <p className="text-md font-normal">Create</p>
                        </NavLink>
                    </li>
                    <li className="px-3 py-2 rounded-lg hover:bg-zinc-800">
                        <NavLink to="/" className="flex items-center gap-3">
                            <CgProfile className="text-2xl"/>
                            <p className="text-md font-normal">Profile</p>
                        </NavLink>
                    </li>
                    <li className="px-3 py-2 rounded-lg hover:bg-zinc-800" onClick={handleLogout}>
                        <NavLink className="flex items-center gap-3">
                            <MdLogout className="text-2xl"/>
                            <p className="text-md font-normal" >Logout</p>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
        <CreateSection showCreate={showCreate} setShowCreate={setShowCreate}/>
        </>
    )
}