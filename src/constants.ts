import axios from "axios";

const endPoint = "https://sempione.growglobal.io/api";
export const methods = {
  post: "POST",
  get: "GET",
  put: "PUT",
  delete: "DELETE",
};

export const notifications = {
  createNotifications:`${endPoint}/announcement`,
  getNotifications:`${endPoint}/announcement`
}

export const authEndpoints = {
  login: `${endPoint}/login`,
  verify: `${endPoint}/user`,
  register:`${endPoint}/register`,
  changePassword:`${endPoint}/changepw`,
  forgotPassword:`${endPoint}/forgot-password`
};

export const orderEndpoints= {
  getOrdersByStatus:`${endPoint}/getAllOrdersByType`,
  buyItem:`${endPoint}/buy`,
  getAllOrders:`${endPoint}/orders`,
  getAllOrdersAdmin:`${endPoint}/getAllOrders`,
  cancelOrder: `${endPoint}/cancel`,
  orderStatusChangePacked:`${endPoint}/ordersSuccess`,
  orderStatusChangeServed:`${endPoint}/ordersServed`

}

export const itemEndPoints={
  getItems: `${endPoint}/items`,
  createItems: `${endPoint}/items`,
  deleteItems: `${endPoint}/items`,
  uploadImg: `${endPoint}/upload`,
}
export const userEndPoints={
  getUsers: `${endPoint}/users`,
  createItems: `${endPoint}/items`,
  deleteItems: `${endPoint}/items`,
  inactiveUser: `${endPoint}/users`,
  deleteUser: `${endPoint}/deleteuser`,
  removeBalance:`${endPoint}/removebalance`
}

export const menuEndPoints = {
  getMenuItems: `${endPoint}/todaymenu`,
  createMenuItem: `${endPoint}/todaymenu`,
  deleteMenuItem: `${endPoint}/todaymenu`
}

export const miscellenous = {
  buy:`${endPoint}/buyChampagne/`
}
export const fasciaManagement = {
    getAmount:`${endPoint}/getCronJobAmount`,
    updateAmount:`${endPoint}/changeCronJobAmount`,

}


export const apiCall = async (
  url: string,
  method: string,
  data: any = null,
  token: any = null
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const config: any = {
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
  } catch (err: any) {
    throw Error(err.response.data.message);
  }
};