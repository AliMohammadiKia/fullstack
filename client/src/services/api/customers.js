import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

export const getAllCustomers = async () => {
  const customers = await (await axios.get("/")).data;
  return customers;
};

export const createCustomer = async (data) => {
  const user = await (await axios.post("/create", data)).data;
  return user;
};

export const deleteCustomer = async (id) => {
  const result = await (await axios.delete(`/${id}`)).data;
  return result;
};

export const editCustomer = async (id, newCustomer) => {
  const result = await (await axios.patch(`/${id}`, newCustomer)).data;
  return result;
};
