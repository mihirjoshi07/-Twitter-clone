import {useState,useEffect} from "react"
import {toast} from "react-hot-toast"
import { useSelector } from "react-redux";
const useGetUser=()=>{
    const {userProfile}=useSelector((state)=>state.user)
    const [userp,setUser]=useState(null);
    const {refreshToggle}=useSelector((state)=>state.user)
    useEffect(()=>{
        const getUser=async()=>{
            try {
                const res=await fetch(`http://localhost:4000/user/getUser/${userProfile}`,{
                    method:"GET",
                    credentials:"include",
                    headers:{
                        "Content-Type":"application/json"
                    }
                });
                const data=await res.json();
                if(data.error){
                    throw new Error(data.error);
                }
                setUser(data);
            } catch (error) {
                toast.error(error.message)
            }
        }
        getUser();
        
    },[userProfile,refreshToggle])
    return {userp}
}

export default useGetUser;