import axios from "axios";

const baseUrl = "http://34.227.225.181:8080/api/v1";

export const apiCall = async (url, method, data = null, token = null) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const config = {
      method,
      url,
      headers,
    };
    if (data) {
      config.data = data;
    }
    const response = await axios(config);
    if (response.status >= 400) {
      return { data: response.data, status: response.status };
    }
    return response.data;
  } catch (err) {
    throw Error(err.response.data.message);
  }
};

export const methods= {
  get:"GET",
  post:"POST",
  del:"DELETE",
  put:"PUT"
}

export const authEndpoints = {
  login:`${baseUrl}/employee/login`,
  verify:`${baseUrl}/employee/get_current_user_from_token`
}

export const adminEndpoints = {
  getAllUsers :`${baseUrl}/employee/get_all`,
  createUser:`${baseUrl}/employee/add`,
  createProject:`${baseUrl}/project`,
  getAllProjects:`${baseUrl}/project`,
  deleteUser:`${baseUrl}/employee/delete`
}

export const employeeEndpoints = {
  getAllEmployees:`${baseUrl}/employee/all`,
  getAllTimesheets:`${baseUrl}/timesheet/employee_timesheets/`
}