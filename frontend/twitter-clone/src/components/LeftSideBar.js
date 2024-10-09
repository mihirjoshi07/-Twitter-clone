import { Link } from 'react-router-dom';
import { CiHome } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {getUser,getOtherUsers,getMyProfile,getUserProfile} from "../redux/userSlice";


export default function LeftSideBar() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const logoutHandler=async()=>{
    try {
        const res=await fetch("http://localhost:4000/user/logout",{credentials:"include"});
        const data=await res.json();
        navigate("/login")
        toast.success(data.message);
        dispatch(getUser(null))
        dispatch(getOtherUsers(null))
        dispatch(getMyProfile(null))
        dispatch(getUserProfile(null))

    } catch (error) {
      toast.error(error);
    }
  }
  return (
    <div className="w-[20%] fixed h-full">
      <div>
        <div>
          <img className="ml-4" width={"24px"} src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png" alt="Twitter-logo" />
        </div> 
        <div className="my-4">
          <Link to="/" className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer">
            <CiHome size="24px" />
            <h1 className="font-bold text-lg ml-2">Home</h1>
          </Link>

          <Link to="/explore" className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer">
            <IoIosSearch size="24px" />
            <h1 className="font-bold text-lg ml-2">Explore</h1>
          </Link>

          <Link to="/notifications" className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer">
            <IoIosNotificationsOutline size="24px" />
            <h1 className="font-bold text-lg ml-2">Notifications</h1>
          </Link>

          <Link to="/profile" className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer">
            <CiUser size="24px" />
            <h1 className="font-bold text-lg ml-2">Profile</h1>
          </Link>

          <Link to="/bookmarks" className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer">
            <CiBookmark size="24px" />
            <h1 className="font-bold text-lg ml-2">Bookmarks</h1>
          </Link>

          <Link to="/logout" onClick={()=>{logoutHandler()}} className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer">
            <AiOutlineLogout size="24px" />
            <h1 className="font-bold text-lg ml-2">Logout</h1>
          </Link>

          <button className="px-4 py-2 border-none text-md bg-[#1D9BF0] w-full rounded-full text-white font-bold">Post</button>
        </div>
      </div>
    </div>
  );
}
