import { useState } from "react";
import { apiCall, authEndpoints, methods } from "../../constants";
import Presentation from "./Presentation";
import { useDispatch } from "react-redux";
import { setUser } from "../../slice/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Container = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = (values) => {
        apiCall(authEndpoints.login, methods.post, {
          email: values.username,
          password: values.password,
        })
          .then(async (data) => {
            toast.success("Login Successful!")
            localStorage.setItem("token", data.data.token);
            dispatch(setUser(data.data));
            navigate("/home")
          })
          .catch((err) => {
            toast.err("Something went wrong!")
          });
      };
      return(
        <Presentation handleLogin={handleLogin}/>
      )
}


export default Container