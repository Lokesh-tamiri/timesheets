import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Root = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.authReducer.userInfo) || {};

  useEffect(() => {
    if (Object.entries(user).length > 0) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  });
};

export default Root;
