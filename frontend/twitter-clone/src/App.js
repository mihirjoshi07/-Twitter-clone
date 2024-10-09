import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LeftSideBar from './components/LeftSideBar';
import Feed from './components/Feed';
import RightSideBar from './components/RightSideBar';
import Profile from './components/Profile';
import Explore from './components/Explore';
import Notifications from './components/Notifications';
import Bookmarks from './components/Bookmarks';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';
import UserProfile from './components/UserProfile';

function App() {
  // Hook to get the current location
  const location = useLocation();

  // Define routes that should have no sidebars
  const noSidebarRoutes = ['/login'];

  // Check if the current path is in the noSidebarRoutes array
  const shouldShowSidebars = !noSidebarRoutes.includes(location.pathname);

  return (
    <>
      <div className="flex justify-between w-[80%] mx-auto mt-5">
        {shouldShowSidebars && <LeftSideBar />}
        <div className={shouldShowSidebars ? "ml-[28%] w-[50%]" : "w-full"}>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/userProfile" element={<UserProfile />} />
          </Routes>
        </div>
        {shouldShowSidebars && <RightSideBar />}
      </div>
      <Toaster />
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;
