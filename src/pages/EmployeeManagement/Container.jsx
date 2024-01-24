import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import Presentation from "./Presentation";
import { useSelector } from "react-redux";
import { adminEndpoints, apiCall, methods } from "../../constants";
import toast from "react-hot-toast";
import { styles } from "../../styles";
import { Stack } from "@mui/material";

const Container = () => {
  const fetchData = useCallback(() => {
    apiCall(adminEndpoints.getAllUsers, methods.get, null, token)
      .then((data) => setRowData(data.data))
      .catch((err) => {
        toast.error("Session Expired!");
        localStorage.removeItem("token");
        navigate("/login");
      });
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
      // field: "",
      cellRenderer: (params) => {
        return (
          <Stack gap={3} direction="row">
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

  useEffect(() => {
    fetchData();
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
      rowData={rowData}
      defaultColDef={defaultColDef}
      fetchData={fetchData}
    />
  );
};

export default Container;
