import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import TextField from "../../components/Forms/TextField";
import { styles } from "../../styles";
import logo from '../../assets/logo.svg'
const Presentation = () => {
  const INITIAL_VALUES = {
    email: "",
    password: "",
  };
  const VALIDATION_SCHEMA = Yup.object().shape({
    email: Yup.string().email("Enter valid email").required("Enter password"),
    password: Yup.string().required("Enter password"),
  });
  return (
    <div className="grid grid-cols-2 justify-center items-center min-h-screen">
      <div className="bg-loginImg h-full bg-cover bg-center hidden lg:block"></div>
      <div className="max-w-md mx-auto w-full">
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={(values) => {
            console.log(values);
          }}
          // className="hidden"
        >
          <Form>
            <img src={logo} alt="logo" className="w-full max-w-[300px] mx-auto mb-5"/>
            <TextField name="email" label="Email" />
            <TextField name="password" label="Password" style={{marginTop:15}}/>
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
