import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import TextField from "../../components/Forms/TextField";
import { styles } from "../../styles";
import logo from "../../assets/logo.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Stack } from "@mui/material";
const Presentation = (props) => {
  const { handleLogin } = props;
  const INITIAL_VALUES = {
    email: "",
    password: "",
  };
  const [visibility, setVisibility] = useState(false);
  const VALIDATION_SCHEMA = Yup.object().shape({
    email: Yup.string().email("Enter valid email").required("Enter password"),
    password: Yup.string().required("Enter password"),
  });
  return (
    <div className="grid grid-cols-1 px-3 lg:px-0 lg:grid-cols-2 justify-center items-center min-h-screen">
      <div className="bg-loginImg h-full bg-cover bg-center hidden lg:block"></div>
      <div className="max-w-md mx-auto w-full">
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={(values) => {
            handleLogin(values);
          }}
          // className="hidden"
        >
          <Form>
            <img
              src={logo}
              alt="logo"
              className="w-full max-w-[300px] mx-auto mb-5"
            />
            <TextField name="email" label="Email" />
            <TextField
              name="password"
              label="Password"
              type={visibility?"text":"password"}
              style={{ marginTop: 15 }}
            />
            {visibility ? (
              <>
                <VisibilityIcon style={{
                  position:"absolute",
                  marginTop:30,
                  marginLeft:-40                  
                }}
                onClick={
                  ()=>{
                    setVisibility(!visibility)
                  }
                }
                />
              </>
            ) : (
              <>
                <VisibilityOffIcon style={{
                  position:"absolute",
                  marginTop:30,
                  marginLeft:-40
                }}
                onClick={
                  ()=>{
                    setVisibility(!visibility)
                  }
                }
                />
              </>
            )}
            <button className={styles.primaryBtn} type="submit">
              Sign In
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Presentation;
