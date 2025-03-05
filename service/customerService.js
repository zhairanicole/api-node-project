const Customer = require("../model/customerModel");

const getAllCustomers = async () => {
    return await Customer.find();
};

const getCustomerById = async (id) => {
    return await Customer.findById(id);
};

const addCustomer = async (customerData) => {
    const newCustomer = new Customer(customerData);
    return await newCustomer.save();
};

const addAllCustomers = async (customersArray) => {
    return await Customer.insertMany(customersArray);
};

const updateCustomer = async (id, updateData) => {
    return await Customer.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCustomer = async (id) => {
    return await Customer.findByIdAndDelete(id);
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    addCustomer,
    addAllCustomers,
    updateCustomer,
    deleteCustomer
};
