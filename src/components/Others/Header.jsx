import React, { useEffect, useState } from 'react';
import logo from '../../assets/image.png'; // Replace with your website logo

const Header = ({ changeUser, data }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format date as "1 September 2025"
  const formattedDate = currentTime.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedTime = currentTime.toLocaleTimeString();

  // Logout function
  const logoutUser = () => {
    localStorage.setItem('loggedInUser', '');
    changeUser('');
  };

  return (
    <header className="w-full bg-gray-900 text-white shadow-md flex items-center justify-between px-6 py-4">
      {/* Left - Logo + Greeting */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Website Logo" className="h-10 w-10 object-cover rounded-full" />
        <div>
          <span className="text-xl font-bold">WorkOra</span>
          <div className="text-sm">Hello, {data?.firstname || "Admin"} 👋</div>
        </div>
      </div>

      {/* Center - Date & Time */}
      <div className="text-sm text-gray-300 text-center">
        <div>{formattedDate}</div>
        <div>{formattedTime}</div>
      </div>

      {/* Right - Logout Button */}
      <button
        onClick={logoutUser}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
