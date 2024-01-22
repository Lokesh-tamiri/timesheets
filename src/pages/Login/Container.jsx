import React from "react";
import Presentation from "./Presentation";
import { apiCall, authEndpoints, methods } from "../../constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Container = () => {
  const navigate = useNavigate();
  const handleLogin = (data)=>{
    apiCall(authEndpoints.login,methods.post,data).then(data=>{
      toast.success("Login Successful!");
      console.log(data);
      localStorage.setItem("token",data.access_token);
      navigate("/home");
    })
  }
  return <Presentation handleLogin={handleLogin}/>;
};

export default Container;
