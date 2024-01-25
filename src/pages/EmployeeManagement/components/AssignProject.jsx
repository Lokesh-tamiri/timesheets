import React, { useCallback, useEffect, useState } from "react";
import { styles } from "../../../styles";
import { Box, Modal } from "@mui/material";
import Multiselect from "multiselect-react-dropdown";
import {
  adminEndpoints,
  apiCall,
  authEndpoints,
  methods,
} from "../../../constants";
import toast from "react-hot-toast";
const AssignProject = (props) => {
  const token = localStorage.getItem("token");

  const { projects, data } = props;
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [assignedProjects, setAssignedProjects] = useState([]);

  const projectData = projects.map((project) => {
    return {
      name: project.project_name,
      id: project.project_id,
    };
  });
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const fetchAssignedProjects = useCallback(() => {
    apiCall(
      `${adminEndpoints.getAssignedProjectsById}/?employee_id=${data.employee_id}`,
      methods.get,
      null,
      token
    ).then((data) => {
      const arr = data.data;
      if(arr.length>0){
        console.log(arr)
      }
    });
  }, []);
  const handleSubmit = () => {
    const joinedProjects = selectedProjects
      .map((project) => project.id)
      .join(",");
    const submitData = {
      employee_id: data.employee_id,
      project_id: joinedProjects,
    };

    apiCall(adminEndpoints.assignProject, methods.post, submitData, token).then(
      (e) => {
        console.log(e);
        toast.success("Project Assigned Successfully");
        handleClose();
      }
    );
  };

  useEffect(() => {
    fetchAssignedProjects();
  }, []);
  return (
    <>
      <button
        className=" border-2 border-blue-700 text-blue-700 font-semibold text-md hover:bg-blue-100 w-full rounded-full h-9 flex items-center justify-center mt-1"
        onClick={handleOpen}
      >
        Assign Projects
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.modalStyle}>
          <Multiselect
            displayValue="name"
            onRemove={(e) => setSelectedProjects(e)}
            onSelect={(e) => setSelectedProjects(e)}
            // selectedValues={}
            options={projectData}
          />
          <div className="flex justify-center">
            <button className={`${styles.primaryBtn}`} onClick={handleSubmit}>
              Assign
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default AssignProject;
