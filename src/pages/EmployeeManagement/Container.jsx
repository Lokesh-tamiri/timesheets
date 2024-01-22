import { useNavigate } from 'react-router-dom';
import React, { useEffect } from "react";
import Presentation from "./Presentation";
import { useSelector } from "react-redux";

const Container = () => {
  const token = localStorage.getItem("token")
  const user = useSelector(state=>state.authReducer.user)
  const navigate = useNavigate()
  useEffect(()=>{
    if(user){
      if(user.user_type!="admin"){
        navigate("/home")
      }
    }
  },[])
  return <Presentation />;
};

export default Container;
