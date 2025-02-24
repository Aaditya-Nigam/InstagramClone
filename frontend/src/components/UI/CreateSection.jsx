import { useState } from "react"
import { IoImagesOutline } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast"
import { usePostStore } from "../../store/usePostStore";

export const CreateSection=({showCreate,setShowCreate})=>{

    const [image,setImage]=useState(null)
    const [caption,setCaption]=useState("")

    const {isPosting,post}=usePostStore();

    const handleImage=(e)=>{
        try {
            const file=e.target.files[0];
            if(!file){
                return;
            }
            const reader=new FileReader();
            reader.readAsDataURL(file)
            reader.onload=async ()=>{
                const base64Image=reader.result;
                setImage(base64Image)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleFormSubmit=async (e)=>{
        e.preventDefault();
        try {
            if(!image){
                return toast.error("Select an image!!")
            }
            const result=await post(image,caption);
            if(result){
                closeCreate();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const closeCreate=async()=>{
        setShowCreate(false)
        setCaption("")
        setImage(null)
    }

    return (
        <div className={`w-screen h-screen bg-black/70 flex items-center justify-center absolute ${!showCreate?"hidden":''}`} onClick={closeCreate}>
            <div className="min-h-[500px] w-[400px] bg-black/80 rounded-xl p-4" onClick={(e)=> e.stopPropagation()}>
                <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
                    <label htmlFor="image" className="w-350px h-[300px] border-2 rounded-xl border-zinc-600 bg-white/5 flex items-center justify-center text-zinc-500">
                        {
                            image? 
                            <div className="w-full h-full flex justify-center items-center p-2">
                                <img src={image} alt="" className="h-full"/>
                            </div>:
                            <>
                                <label htmlFor="image" className="flex items-center gap-2 hover:underline cursor-pointer">Select image<IoImagesOutline /></label>
                                <input type="file" name="image" id="image" className="hidden" onChange={handleImage}/>
                            </>
                        }
                    </label>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="caption" className="text-white">Caption</label>
                        <textarea rows="5"  name="caption" id="caption" placeholder="Caption..." className="border border-zinc-500 px-2 text-white py-1 text-sm" value={caption} onChange={(e)=>setCaption(e.target.value)}/>
                    </div>
                    <div>
                        <input type="submit" value="Post" className="bg-sky-400 w-full py-1 text-lg text-white font-bold rounded" disabled={isPosting}/>
                    </div>
                </form>
            </div>
            <Toaster/>
        </div>
    )
}