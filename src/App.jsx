import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import Register from "./components/Auth/Register";
import { AuthContext } from "./context/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [User, setUser] = useState(null);
  const [UserLoggedInData, setUserLoggedInData] = useState(null);
  const [isRegister, setIsRegister] = useState(false);

  const AuthData = useContext(AuthContext);

  // Check if a user is already logged in (from localStorage)
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setUser(userData.role);
      setUserLoggedInData(userData.data || null);
    }
  }, []);

  const handleLogin = (email, password) => {
    if (email === "admin@me" && password === "123") {
      // Hardcoded admin login
      setUser("admin");
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ role: "admin" })
      );
      return;
    }

    // Employee login using Firebase data
    if (AuthData && AuthData.employee) {
      const emp = AuthData.employee.find(
        (e) => e.email === email && e.password === password
      );

      if (emp) {
        setUser("employee");
        setUserLoggedInData(emp);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ role: "employee", data: emp })
        );
        return;
      }
    }

    alert("Invalid credentials");
  };

  return (
    <>
      <ToastContainer />
      {!User && !isRegister && (
        <Login
          handleLogin={handleLogin}
          switchToRegister={() => setIsRegister(true)}
        />
      )}

      {!User && isRegister && (
        <Register onRegister={() => setIsRegister(false)} />
      )}

      {User === "admin" && (
        <AdminDashboard changeUser={setUser} data={UserLoggedInData} />
      )}

      {User === "employee" && (
        <EmployeeDashboard changeUser={setUser} data={UserLoggedInData} />
      )}
    </>
  );
};

export default App;
