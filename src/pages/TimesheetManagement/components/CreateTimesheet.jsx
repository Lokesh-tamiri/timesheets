import React, { useCallback, useEffect, useState } from "react";
import { styles } from "../../../styles";
import { Box, Modal } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextField from "../../../components/Forms/TextField";
import Select from "../../../components/Forms/Select";
import { apiCall, employeeEndpoints, methods } from "../../../constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const CreateTimesheet = () => {
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const INITIAL_VALUES = {
    employee_id: "",
    project_id: "",
    module_worked: "",
    hours_spent: "",
    task_completed: "",
    task_pending: "",
    date: new Date(),
  };

  const VALIDATION_SCHEMA = Yup.object().shape({
    project_id: Yup.number("Please enter only numbers").required(
      "Project Id is required"
    ),
    module_worked: Yup.string().required("Module is required"),
    hours_spent: Yup.number("Please enter only numbers")
      .required("Hours Spent Id is required")
      .max(12, "Hours Spent should not be greater than 12"),
    task_completed: Yup.string()
      .required("Task Completed is required")
      .max(200, "Should not exceed more than 200 Characters"),
    task_pending: Yup.string()
      .required("Task pending is required")
      .max(200, "Should not exceed more than 200 Characters"),
    // date:Yup.date().required("Please select date")
  });

  const fetchAssignedProjects = useCallback(() => {
    apiCall(employeeEndpoints.getAssignedProjects, methods.get, null, token).then(data=>{
      toast.dismiss();
      console.log(data)
    }).catch(err=>{
      localStorage.clear();
      toast.dismiss();
      toast.error("Session expired");
      navigate("/login")
    })
  }, []);

  useEffect(()=>{
    fetchAssignedProjects();
  },[])
  return (
    <div>
      <button className={styles.primaryBtn} onClick={handleOpen}>
        Create Timesheet
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...styles.modalStyle, py: 4 }}>
          <Formik
            onSubmit={(values) => {
              console.log(values);
            }}
            initialValues={INITIAL_VALUES}
            validationSchema={VALIDATION_SCHEMA}
          >
            <Form className="flex flex-col gap-5 max-h-[500px] overflow-y-auto px-5 py-5">
              {/* <TextField name="project_id" label="Project Id"/> */}
              <Select name="project_id" label="Project Id" options={[]} />
              <TextField name="module_worked" label="Module Worked" />
              <TextField name="hours_spent" label="Hours Spent" />
              <TextField name="task_completed" label="Task Completed" />
              <TextField name="task_pending" label="Task Pending" />
              <button className={`${styles.primaryBtn} mx-auto`} type="submit">
                Create Timesheet
              </button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateTimesheet;
