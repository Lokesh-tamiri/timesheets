import React, { useEffect } from "react";
import Presentation from "./Presentation";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Container = () => {
    const user = useSelector(state=>state.authReducer.user)
    const navigate = useNavigate();
  useEffect(() => {
    if(user.user_type!=="Employee")
    {
        navigate("/home")
    }
  }, []);
  return <Presentation />;
};

export default Container;
