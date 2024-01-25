import React, { useCallback, useState } from "react";
import { styles } from "../../../styles";
import { Box, Modal } from "@mui/material";
import { Form, Formik } from "formik";
import TextField from "../../../components/Forms/TextField";
import * as Yup from "yup";
import Select from "../../../components/Forms/Select";
import { adminEndpoints, apiCall, methods } from "../../../constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const CreateEmployee = (props) => {
  const { fetchData } = props;
  const token = localStorage.getItem("token");

  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const navigate = useNavigate();
  const VALIDATION_SCHEMA = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    employee_id: Yup.string().required("Employee ID is required"),
    designation: Yup.string().required("Designation is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    user_type: Yup.string().required("User Type is required"),
    employment_type: Yup.string().required("Employment Type is required"),
  });
  const INITIAL_VALUES = {
    first_name: "",
    last_name: "",
    employee_id: "",
    designation: "",
    email: "",
    password: "",
    user_type: "",
    employment_type: "",
    is_first_time_user: true,
    is_active: true,
  };
  return (
    <div>
      <button className={styles.primaryBtn} onClick={handleOpen}>
        Create Employee
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.modalStyle}>
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={VALIDATION_SCHEMA}
            onSubmit={(values) => {
              apiCall(adminEndpoints.createUser, methods.post, values, token)
                .then(async () => {
                  setOpen(false);
                  await fetchData();
                  toast.success("Successfully added!");
                })
                .catch((err) => {
                  localStorage.clear();
                  toast.error(err.message);
                  navigate("/login");
                });
            }}
          >
            <Form
              style={{
                display: "flex",
                gap: 15,
                flexDirection: "column",
                maxHeight: 400,
                overflowY: "scroll",
                // padding:5
              }}
              className="px-5 py-8"
            >
              <TextField name="first_name" label="First Name" />
              <TextField name="last_name" label="Last Name" />
              <TextField name="employee_id" label="Employee ID" />
              <TextField name="designation" label="Designation" />
              <TextField name="email" label="Email" />
              <TextField name="password" label="Password" />
              {/* <TextField name="user_type" label="User Type"/> */}
              <Select
                name="user_type"
                label="User Type"
                options={[
                  {
                    label: "Admin",
                    value: "admin",
                  },
                  {
                    label: "Employee",
                    value: "Employee",
                  },
                ]}
              />
              <Select
                name="employment_type"
                label="Employment Type"
                options={[
                  {
                    label: "Full time",
                    value: "Full time",
                  },
                  {
                    label: "Intern",
                    value: "Intern",
                  },
                  {
                    label: "Part time",
                    value: "Part time",
                  },
                  {
                    label: "Consultant",
                    value: "Consultant",
                  },
                ]}
              />
              {/* <TextField name="employment_type" label="Employment Type" /> */}
              <button className={`${styles.primaryBtn} mx-auto`} type="submit">
                Create Employee
              </button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateEmployee;
