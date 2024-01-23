import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { apiCall, authEndpoints, methods } from "../constants";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/authSlice";
export default function ProtectedRoutes() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    apiCall(`${authEndpoints.verify}/`,methods.get,null,token).then((data) => {
      // console.log(data)
      dispatch(setUser(data.data))
    }).catch(err=>{
      navigate("/login")
    });
  }, []);
  return (
    <Navbar>
      <Outlet />
    </Navbar>
  );
}
