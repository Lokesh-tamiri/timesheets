import { Outlet, useNavigate } from "react-router-dom";
import { apiCall, authEndpoints, methods } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../slice/authSlice";
import LottieLoader from "react-lottie-loader";
import loader from '../assets/Sempione.json'
import { setLoading } from "../slice/loadingSlice";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
export default function ProtectedRoutes() {
    const loading = useSelector(state => state.loadingReducer.loading)
    const user = useSelector(state => state.authReducer.user)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setLoading(true))
        const token = localStorage.getItem("token")
        if (Object.keys(user).length == 0 && !token) {
            dispatch(setLoading(false))
            navigate("/login")
        }
        else if (Object.keys(user).length == 0 && token) {
            apiCall(authEndpoints.verify, methods.get, null, token).then(data => {
                dispatch(setUser(data.data));
                dispatch(setLoading(false));
            }).catch(err => {
                toast.error("Something went wrong!");
            })
        }
    }, [])

    if (loading) {
        return <LottieLoader animationData={loader} loop={true} style={{
            height: 300
        }} />
    }

    return (

        <Navbar>
            <div className="max-w-7xl mx-auto px-12">
                <Outlet />
            </div>
        </Navbar>
    )
}