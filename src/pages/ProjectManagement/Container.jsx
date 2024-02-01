import React, { useCallback, useEffect, useState } from "react";
import Presentation from "./Presentation";
import { adminEndpoints, apiCall, methods } from "../../constants";
import { useNavigate } from "react-router-dom";
import { styles } from "../../styles";
import toast from "react-hot-toast";

const Container = () => {
  const token = localStorage.getItem("token");

  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();
  const fetchData = useCallback(() => {
    apiCall(adminEndpoints.createProject, methods.get, null, token)
      .then((data) => setRowData(data.data))
      .catch((err) => {
        localStorage.clear();
        navigate("/login");
      });
  }, []);
  const handleDelete = (data)=>{
    console.log(data)
    apiCall(`${adminEndpoints.deleteProject}/?project_id=${data.project_id}`,methods.del,null,token).then(data=>{
      toast.dismiss();
      toast.success("Project Deleted Successfully!")
      fetchData();
    }).catch(err=>console.log(err));
  }
  const columnDefs = [
    {
      headerName: "Project Description",
      field: "project_description",
      sortable: true,
      filter: true,
      cellClass: "ag-cell-center", // Add any additional styling classes as needed
      width: "100%", // Set the desired width for the column
      maxWidth: 400,
      minWidth: 500,
      cellRenderer: "agGroupCellRenderer", // You can customize the cell renderer if needed
    },
    // {
    //   headerName: "Project ID",
    //   field: "project_id",
    //   sortable: true,
    //   filter: true,
    //   cellClass: "ag-cell-center",
    //   width: "100%", // Set the desired width for the column
    //   maxWidth:400,
    //   minWidth:200,
    // },
    {
      headerName: "Project Name",
      field: "project_name",
      sortable: true,
      filter: true,
      cellClass: "ag-cell-center",
      width: "100%", // Set the desired width for the column
      maxWidth: 400,
      minWidth: 200,
    },
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
          <button
            className={
              " bg-red-600 px-12 max-h-10 flex justify-center items-center mt-[2px] text-white font-semibold  rounded-full hover:bg-red-500"
            }
            onClick={()=>handleDelete(params.data)}
          >
            Delete
          </button>
        );
      },
    },
    // Add more columns as needed
  ];

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Presentation
      columnDefs={columnDefs}
      rowData={rowData}
      fetchData={fetchData}
    />
  );
};

export default Container;
