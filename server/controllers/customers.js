import customersModel from "../model/customers.js";

export const getAllCustomers = async (request, response) => {
  try {
    const customers = await customersModel.find({});
    response.status(200).send(customers);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
};

export const getCustomerById = async (request, response) => {
  try {
    const { id } = request.query;
    const user = await customersModel.find({ _id: id });
    response.status(200).send(user);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
};

export const createCustomer = async (request, response) => {
  try {
    const result = await customersModel.create(request.body);
    // const result = new customersModel(request.body).save();
    return response.status(201).send(result);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
};

export const updateCustomer = async (request, response) => {
  try {
    const { id } = request.params;
    const newCustomer = request.body;
    const result = await customersModel.findByIdAndUpdate(id, newCustomer, {
      new: true,
    });
    response.status(200).send(result);
  } catch (error) {
    console.log(error.code);
    response.status(500).send({ message: error.message });
  }
};

export const deleteCustomer = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await customersModel.findByIdAndDelete(id);
    response.status(200).send({ message: "user deleted successfully", result });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
};
