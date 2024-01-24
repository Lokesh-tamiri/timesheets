import React, { useCallback, useState } from "react";
import { styles } from "../../../styles";
import { Box, Modal } from "@mui/material";
import TextField from "../../../components/Forms/TextField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { adminEndpoints, apiCall, methods } from "../../../constants";
import toast from "react-hot-toast";
const CreateProject = (props) => {
  const { fetchData } = props;
  const token = localStorage.getItem("token");
  // console.log("here");
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => setOpen(false));
  const handleOpen = useCallback(() => setOpen(true));
  const INITIAL_VALUES = {
    project_id: "",
    project_name: "",
    project_description: "",
  };
  const VALIDATION_SCHEMA = Yup.object().shape({
    project_id: Yup.string().required("Project Id is required"),
    project_name: Yup.string().required("Project Name is required"),
    project_description: Yup.string().required(
      "Project Description is required"
    ),
  });
  const handleSubmit = useCallback((values) => {
    apiCall(adminEndpoints.createProject, methods.post, values, token)
      .then((data) => {
        toast.success("Project added successfully!");
        setOpen(false);
        fetchData();
      })
      .catch((err) => toast.error("Error while creating project!"));
  }, []);
  return (
    <div>
      <button className={styles.primaryBtn} onClick={handleOpen}>
        Create Project
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.modalStyle}>
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={VALIDATION_SCHEMA}
            onSubmit={handleSubmit}
          >
            <Form className="flex flex-col gap-4 justify-center items-center">
              <TextField
                name="project_id"
                label="Project Id"
                className="w-full"
              />
              <TextField
                name="project_name"
                label="Project Name"
                className="w-full"
              />
              <TextField
                name="project_description"
                label="Project Description"
                className="w-full"
              />
              <button className={styles.primaryBtn} type="submit">
                Create Project
              </button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateProject;
