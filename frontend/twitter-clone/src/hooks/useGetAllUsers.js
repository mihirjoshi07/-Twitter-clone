import {useState,useEffect} from "react"
import {toast} from "react-hot-toast"
const useGetAllUsers=()=>{
    const [allUsers,setAllUsers]=useState(null);

    useEffect(()=>{
        const getAllUsers=async()=>{
            try {
                const res=await fetch("http://localhost:4000/user/getOtherUsers",{
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
                setAllUsers(data);
            } catch (error) {
                toast.error(error.message)
            }
        }
        getAllUsers();
    },[])
    return {allUsers}
}

export default useGetAllUsers;