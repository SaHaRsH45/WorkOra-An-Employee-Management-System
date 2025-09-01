import React, { useState } from 'react';
import logo from '../../assets/image.png'; 

const Login = ({ handleLogin, switchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const SubmitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950">
      {/* Left About Us Section */}
      <div className="w-1/2 flex flex-col justify-center items-start p-16 bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur-md text-white">
        {/* Logo */}
        <div className="w-32 h-32 mb-6 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-white/10">
          <img 
            src={logo} 
            alt="WorkOra Logo" 
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-4xl font-extrabold mb-4 tracking-wide">About WorkOra</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          WorkOra is an Employee Management System built to simplify task tracking, 
          performance monitoring, and employee coordination. Our goal is to make 
          workplace management smooth, efficient, and transparent.
        </p>
        <p className="text-gray-400 text-sm">
          Crafted with ❤️ by <span className="font-semibold text-red-400">Saharsh Kumar</span>
        </p>
      </div>

      {/* Right Login Form Section */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-96 p-12 bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-700">
          <h1 className="text-3xl font-bold text-white text-center mb-2 tracking-wide">WorkOra</h1>
          <p className="text-gray-400 text-sm text-center mb-8">Employee Management System</p>

          <form onSubmit={SubmitHandler} className="flex flex-col space-y-6">
            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-700/80 text-white border border-gray-600 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
              />
              <label
                className={`absolute left-4 transition-all duration-200
                  ${emailFocused || email ? '-top-2 text-white text-xs' : 'top-3 text-gray-400 text-sm'}`}
              >
                Enter Your Email
              </label>
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-700/80 text-white border border-gray-600 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
              />
              <label
                className={`absolute left-4 transition-all duration-200
                  ${passwordFocused || password ? '-top-2 text-white text-xs' : 'top-3 text-gray-400 text-sm'}`}
              >
                Enter Password
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-red-500 to-red-400 rounded-lg text-white font-semibold hover:scale-105 transform transition duration-300 shadow-lg"
            >
              Login
            </button>
          </form>

          {/* New Employee Register Link */}
          <p className="text-gray-400 text-sm mt-6 text-center">
            New Employee?{" "}
            <span 
              onClick={switchToRegister} 
              className="text-red-400 hover:underline font-semibold cursor-pointer"
            >
              Register Here
            </span>
          </p>

          <p className="text-gray-500 text-sm mt-4 text-center">
            &copy; {new Date().getFullYear()} WorkOra. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
