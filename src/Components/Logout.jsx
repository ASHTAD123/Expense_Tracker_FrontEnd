import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();

  let isAuthenticated = localStorage.setItem("isAuthenticated", "false");
  console.log("isAuthenticated inside logout : " +isAuthenticated);


  useEffect(() => {
    navigate("/login");
  }, []);

  return <div>You have been Logged out...</div>;
};

export default Logout;
