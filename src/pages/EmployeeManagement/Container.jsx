import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import Presentation from "./Presentation";
import { useSelector } from "react-redux";
import { adminEndpoints, apiCall, methods } from "../../constants";
import toast from "react-hot-toast";
import { styles } from "../../styles";
import { Stack } from "@mui/material";
import AssignProject from "./components/AssignProject";

const Container = () => {
  const [projects, setProjects] = useState([]);
  const fetchData = useCallback(() => {
    apiCall(adminEndpoints.getAllUsers, methods.get, null, token)
      .then((data) => setRowData(data.data))
      .catch((err) => {
        toast.error("Session Expired!");
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, []);
  const fetchProjects = useCallback(() => {
    apiCall(adminEndpoints.getAllProjects, methods.get, null, token).then(
      (data) => {
        setProjects(data.data);
      }
    );
  }, []);
  const token = localStorage.getItem("token");

  const columnDefs = [
    { headerName: "First Name", field: "first_name" },
    { headerName: "Last Name", field: "last_name" },
    { headerName: "Employee ID", field: "employee_id" },
    { headerName: "Designation", field: "designation" },
    { headerName: "Email", field: "email" },
    { headerName: "User Type", field: "user_type" },
    { headerName: "Employment Type", field: "employment_type" },
    // {
    //   headerName: "First Time User",
    //   field: "is_first_time_user",
    //   cellRenderer: "agAnimateShowChangeCellRenderer",
    // },
    // {
    //   headerName: "Active",
    //   field: "is_active",
    //   cellRenderer: "agAnimateShowChangeCellRenderer",
    // },
    {
      headerName: "Actions",
      cellClass: "ag-cell-center",
      width: "100%", // Set the desired width for the column
      // maxWidth:400,
      minWidth: 550,
      resizable: true,
      // field: "",
      cellRenderer: (params) => {
        return (
          <Stack gap={3} direction="row" sx={{ minWidth: 500 }}>
            {params.user_type !== "admin" && (
              <AssignProject projects={projects} data={params.data} fetchData={fetchData} />
            )}
            <button
              className="bg-red-700 text-white font-semibold text-md hover:bg-red-600 w-full rounded-full h-9 flex items-center justify-center mt-1"
              onClick={() => {
                apiCall(
                  `${adminEndpoints.deleteUser}/?email_id=${params.data.email}`,
                  methods.del,
                  null,
                  token
                )
                  .then((data) => {
                    toast.success("Successfully Deleted Employee!");
                    fetchData();
                  })
                  .catch((err) => {
                    alert("Error while deleting employee");
                  });
              }}
            >
              Delete
            </button>
            <button
              className="bg-blue-700 text-white font-semibold text-md hover:bg-blue-600 w-full rounded-full h-9 flex items-center justify-center mt-1"
              onClick={() => {
                apiCall(
                  `${adminEndpoints.deleteUser}/?email_id=${params.data.email}`,
                  methods.del,
                  null,
                  token
                )
                  .then((data) => {
                    toast.success("Successfully Deleted Employee!");
                    fetchData();
                  })
                  .catch((err) => {
                    alert("Error while deleting employee");
                  });
              }}
            >
              Update
            </button>
          </Stack>
        );
      },
    },
  ];
  const defaultColDef = {
    sortable: true,
    filter: true,
    // floatingFilter: true,
  };
  const [rowData, setRowData] = useState([]);
  const finalRowData = rowData.filter((item) => item.employee_id !== "1");
  useEffect(() => {
    fetchData();
    fetchProjects();
  }, []);
  const user = useSelector((state) => state.authReducer.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      if (user.user_type != "admin") {
        navigate("/home");
      }
    }
  }, []);
  return (
    <Presentation
      columnDefs={columnDefs}
      rowData={finalRowData}
      defaultColDef={defaultColDef}
      fetchData={fetchData}
      projects={projects}
    />
  );
};

export default Container;
