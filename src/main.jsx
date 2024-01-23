import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./pages/ErrorPage";
import { Provider } from "react-redux";
import { store } from "./store";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Home from './pages/Home'
import ProtectedRoutes from "./routes/ProtectedRoutes";
import EmployeeManagement from "./pages/EmployeeManagement";
import TimeSheetManagement from './pages/TimesheetManagement'
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    element: <ProtectedRoutes />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/employee-management",
        element: <EmployeeManagement />,
      },
      {
        path: "/timesheet-management",
        element: <TimeSheetManagement />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
