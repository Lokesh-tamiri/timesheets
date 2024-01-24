import React, { useCallback, useEffect, useState } from "react";
import Presentation from "./Presentation";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { apiCall, employeeEndpoints, methods } from "../../constants";
const Container = () => {
  const token = localStorage.getItem("token")
  const user = useSelector((state) => state.authReducer.user);
  const navigate = useNavigate();
  const INITIAL_VALUES = {
    employee_id: user.employee_id,
    project_id: "",
    module_worked: "",
    hours_spent: 0,
    task_completed: "",
    task_pending: "",
    date: new Date(),
  };
  const columnDefs = [
    {
      headerName: 'Employee ID',
      field: 'employee_id',
      sortable: true,
      filter: true,
      cellClass: 'ag-cell-center',
      width: 150,
    },
    {
      headerName: 'Project ID',
      field: 'project_id',
      sortable: true,
      filter: true,
      cellClass: 'ag-cell-center',
      width: 150,
    },
    {
      headerName: 'Module Worked',
      field: 'module_worked',
      sortable: true,
      filter: true,
      cellClass: 'ag-cell-center',
      width: 200,
    },
    {
      headerName: 'Hours Spent',
      field: 'hours_spent',
      sortable: true,
      filter: true,
      cellClass: 'ag-cell-center',
      width: 150,
    },
    {
      headerName: 'Task Completed',
      field: 'task_completed',
      sortable: true,
      filter: true,
      cellClass: 'ag-cell-center',
      width: 200,
    },
    {
      headerName: 'Task Pending',
      field: 'task_pending',
      sortable: true,
      filter: true,
      cellClass: 'ag-cell-center',
      width: 200,
    },
    {
      headerName: 'Date',
      field: 'date',
      sortable: true,
      filter: true,
      cellClass: 'ag-cell-center',
      width: 150,
      cellRenderer: 'dateCellRenderer', // You may need a custom date cell renderer
    },
    // Add more columns as needed
  ];
  const VALIDATION_SCHEMA = Yup.object().shape({
    employee_id: Yup.string(),
    project_id: Yup.string().required("Please Enter Project Id"),
    module_worked: Yup.string().required("Please Enter Module Worked"),
    hours_spent: Yup.number().required("Please Enter Hours Spent"),
    task_completed: Yup.string().required("Please Enter Task Completed"),
    task_pending: Yup.string().required("Please Enter Task Pending"),
    date: Yup.date(),
  });
  const [rowData,setRowData] = useState([])
  const fetchData = useCallback(()=>{
    apiCall(employeeEndpoints.getAllTimesheets,methods.get,null,token).then(data=>setRowData(data.data)).catch(err=>{
      // console.log("err")
      localStorage.clear();
      navigate("/login")
    })
  },[])

  useEffect(() => {
    if (user.user_type !== "Employee") {
      return navigate("/home");
    }
    fetchData();
  }, []);
  return (
    <Presentation
      INITIAL_VALUES={INITIAL_VALUES}
      VALIDATION_SCHEMA={VALIDATION_SCHEMA}
      rowData={rowData}
      columnDefs={columnDefs}
    />
  );
};

export default Container;
