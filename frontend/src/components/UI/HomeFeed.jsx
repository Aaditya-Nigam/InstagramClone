import { useEffect } from "react"
import { usePostStore } from "../../store/usePostStore"

export const HomeFeed=()=>{

    const {allHomeFeeds,getAllPosts,isFetchingHomeFeeds}=usePostStore()

    useEffect(()=>{
        getAllPosts();
    },[])

    return (
        <div>
            {
                allHomeFeeds.map((feed,index)=>{
                    return <h1>hjhj</h1>
                })
            }
        </div>
    )
}