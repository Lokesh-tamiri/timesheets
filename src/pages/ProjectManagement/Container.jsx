import React, { useCallback, useEffect, useState } from "react";
import Presentation from "./Presentation";
import { adminEndpoints, apiCall, methods } from "../../constants";
import { useNavigate } from "react-router-dom";

const Container = () => {
  const [rowData,setRowData] = useState([])
  const navigate = useNavigate();
  const columnDefs = [
    {
      headerName: "Project Description",
      field: "project_description",
      sortable: true,
      filter: true,
      cellClass: "ag-cell-center", // Add any additional styling classes as needed
      width: "100%", // Set the desired width for the column
      maxWidth:400,
      minWidth:200,
      cellRenderer: "agGroupCellRenderer", // You can customize the cell renderer if needed
    },
    {
      headerName: "Project ID",
      field: "project_id",
      sortable: true,
      filter: true,
      cellClass: "ag-cell-center",
      width: "100%", // Set the desired width for the column
      maxWidth:400,
      minWidth:200,
    },
    {
      headerName: "Project Name",
      field: "project_name",
      sortable: true,
      filter: true,
      cellClass: "ag-cell-center",
      width: "100%", // Set the desired width for the column
      maxWidth:400,
      minWidth:200,
    },
    // Add more columns as needed
  ];
  const token = localStorage.getItem("token");
  const fetchData = useCallback(() => {
    apiCall(adminEndpoints.createProject, methods.get, null, token)
      .then((data) => setRowData(data.data))
      .catch((err) => {
        localStorage.clear();
        navigate("/login")
      });
  }, []);
  useEffect(() => {
    fetchData();
  }, []);
  return <Presentation columnDefs={columnDefs} rowData={rowData} fetchData={fetchData}/>;
};

export default Container;
