import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function App() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(null);
  const [toggle,setToggle]=useState(false);

  const handleDelete = async(id) => {
    try {
      const res = await fetch(`http://localhost:4000/user/deleteNotification/${id}`,{method:"PUT",credentials:"include"});
      const data=await res.json();
      if(data.success)
        toast.success(data.message);
        setToggle(!toggle)
    } catch (error) {
        toast.error("Failed to delete Notification..");
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("http://localhost:4000/user/getNotifications", { credentials: "include" });
        const data = await res.json();
        if (data.success) setNotifications(data.notifications);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchNotifications();
  }, [toggle]);

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="relative flex w-100 flex-col rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className='flex items-center justify-between border-b border-gray-200'>
        <div className="hover:cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3">
          <h1 className='font-semibold text-gray-600 text-lg'>Notifications</h1>
        </div>
      </div>
      <nav className="flex min-w-[240px] flex-col gap-1 p-1.5">
        {
          notifications?.length > 0 ? (
            notifications.map((item) => (
              <div key={item._id} className="flex w-full items-center justify-between p-3 hover:bg-slate-100" onClick={handleClick}>
                <div className="flex items-center">
                  <img
                    alt="profile"
                    src={`http://localhost:4000/uploads/${item.profilePic}`}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h6 className="text-slate-800 font-medium">{item.name}</h6>
                    <p className="text-slate-500 text-sm">{item.notificationText}</p>
                  </div>
                </div>

                {/* Delete Button with hover effect */}
                <div
                  onClick={(e) => { e.stopPropagation(); handleDelete(item._id); }}
                  className="p-2 rounded-full hover:bg-red-100 cursor-pointer"
                >
                  <svg className="w-6 h-6 text-red-500 hover:text-red-700 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            ))
          ) : (
            <h1 className='font-semibold text-gray-600 text-lg'>No Notifications</h1>
          )
        }
      </nav>
    </div>
  );
}
