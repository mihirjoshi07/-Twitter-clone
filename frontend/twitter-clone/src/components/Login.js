import React, { useState } from 'react'
import axios from 'axios';
import { USER_API } from '../utils/constant';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux"
import {getUser} from "../redux/userSlice"

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [name,setName]=useState("");
    const [username,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(isLogin){
            try {
                const res = await axios.post(`${USER_API}/login`, { email, password }, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });
    
                if (res.data.success) {
                    navigate("/");
                    toast.success(res.data.message, { duration: 4000 });
                    dispatch(getUser(res.data.user));
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    alert(error.response.data.message, { duration: 4000 }); // Use toast.error for errors
                } else {
                    alert("An error occurred, please try again", { duration: 4000 }); // Also use toast.error here
                }
            }
        }else{
            //signup
            try {
                const res=await axios.post(`${USER_API}/register`,{name,username,email,password},
                    {
                        headers:{
                            "Content-Type":"application/json"
                        },
                        withCredentials:true
                    });
               if(res.data.success){
                setIsLogin(true)
                toast.success(res.data.message,{duration:4000});
               }
            } catch (error) {
                alert(error.response.data.message,{duration:4000})
            }
        }
        
        
    }

    return (
        <div className=' h-screen flex items-center justify-center -mt-5 '>
            <div className='flex items-center justify-evenly w-[80%]'>
                <div>
                    <img className="ml-4" width={"300px"} src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png" alt="Twitter-logo" />
                </div>
                <div className=''>
                    <div className='my-5' >
                        <h1 className='font-bold text-6xl'>Happening Now</h1>
                    </div>
                    <h1 className='mt-4 mb-2 text-2xl font-bold ml-24'>{isLogin ? "Login" : "Register"}</h1>
                    <form className='flex flex-col w-[60%]' onSubmit={handleSubmit}>
                        {
                            !isLogin && (<>
                                <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Name' className='outline-blue-500 border border-gray-800 px-3 py-2 my-1 rounded-full font-semibold' />
                                <input type="text" value={username} onChange={(e)=>{setUserName(e.target.value)}} placeholder='UserName' className='outline-blue-500 border border-gray-800 px-3 py-2 my-1 rounded-full  font-semibold' />
                            </>)
                        }
                        <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' className='outline-blue-500 border border-gray-800 px-3 py-2 my-1 rounded-full  font-semibold' />
                        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' className='outline-blue-500 border border-gray-800 px-3 py-2 my-1 rounded-full font-semibold' />
                        <button className='bg-[#1D9BF0] border-none py-2 rounded-full text-lg font-bold text-white my-4'>{isLogin? "Sign In":"Sign Up"}</button>
                        <h1>{isLogin ? "Dont Have an Account  ":"Already Have an Account" } ? <span className=' bg-black text-white px-4 font-bold hover:text-black hover:bg-gray-200 p-2 rounded-full cursor-pointer ' onClick={()=>setIsLogin(!isLogin)}>{isLogin ? "Register":"Login"}</span></h1>
                    </form>
                </div>
            </div>
        </div>
    )
}
