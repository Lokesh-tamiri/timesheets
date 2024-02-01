import React, { useCallback, useEffect, useState } from "react";
import { styles } from "../../../styles";
import { Box, Grid, Modal, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextField from "../../../components/Forms/TextField";
import Select from "../../../components/Forms/Select";
import { apiCall, employeeEndpoints, methods } from "../../../constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FormikDatePicker from "../../../components/Forms/DatePicker";
import { useSelector } from "react-redux";
const CreateTimesheet = () => {
  const user = useSelector((state) => state.authReducer.user);
  const [open, setOpen] = useState(false);
  const [assignedProjects, setAssignedProjects] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const INITIAL_VALUES = {
    employee_id: user.employee_id,
    project_id: "",
    module_worked: "",
    hours_spent: "",
    task_completed: "",
    task_pending: "",
    date: null,
    project_description: "",
  };
  const handleAddTimesheet = (values) => {
    // console.log(values)
    apiCall(employeeEndpoints.createTimesheet, methods.post, values, token)
      .then((data) => console.log(data))
      .catch((err) => {
        localStorage.clear();
        toast.dismiss();
        toast.error("Session expired");
        navigate("/login");
      });
  };
  const VALIDATION_SCHEMA = Yup.object().shape({
    project_id: Yup.string().required("Project Id is required"),
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
    date: Yup.date().required("Please select date"),
    project_description: Yup.string().required("Please enter description"),
  });

  const fetchAssignedProjects = useCallback(() => {
    apiCall(employeeEndpoints.getAssignedProjects, methods.get, null, token)
      .then((data) => {
        toast.dismiss();
        const arr = data.data[0].split(",");
        // console.log(arr);
        const finArr = arr.map((each) => {
          return {
            label: each,
            value: each,
          };
        });
        setAssignedProjects(finArr);
      })
      .catch((err) => {
        localStorage.clear();
        toast.dismiss();
        toast.error("Session expired");
        navigate("/login");
      });
  }, []);

  useEffect(() => {
    fetchAssignedProjects();
  }, []);
  return (
    <div>
      <button className={styles.primaryBtn} onClick={handleOpen}>
        Create Timesheet
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...styles.modalStyle, py: 4 }}>
          <Formik
            onSubmit={handleAddTimesheet}
            initialValues={INITIAL_VALUES}
            validationSchema={VALIDATION_SCHEMA}
          >
            <Form className="flex flex-col gap-5 max-h-[500px] overflow-y-auto px-5 py-5">
              {/* <TextField name="project_id" label="Project Id"/> */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Select
                    name="project_id"
                    label="Project Id"
                    options={assignedProjects}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField name="module_worked" label="Module Worked" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField name="hours_spent" label="Hours Spent" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField name="task_completed" label="Task Completed" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField name="task_pending" label="Task Pending" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField name="project_description" label="Description" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormikDatePicker name="date" label="Date" />
                </Grid>
                <Grid item xs={12}>
                  <Stack direction={"row"} justifyContent={"center"}>
                    <button
                      className={`${styles.primaryBtn} mx-auto`}
                      type="submit"
                    >
                      Create Timesheet
                    </button>
                  </Stack>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateTimesheet;
