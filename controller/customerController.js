const customerService = require("../service/customerService");

// @desc    Get all customers
// @route   GET /api/customers
const getAllCustomer = async (req, res) => {
    try {
        const customers = await customerService.getAllCustomers();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching customers", error });
    }
};

// @desc    Get a single customer by ID
// @route   GET /api/customers/:id
const getCustomerById = async (req, res) => {
    try {
        const customer = await customerService.getCustomerById(req.params.id);
        if (!customer) return res.status(404).json({ message: "Customer not found" });
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: "Error fetching customer", error });
    }
};

// @desc    Add a new customer
// @route   POST /api/customers
const addCustomer = async (req, res) => {
    try {
        const newCustomer = await customerService.addCustomer(req.body);
        res.status(201).json({ message: "Customer added successfully", customer: newCustomer });
    } catch (error) {
        res.status(500).json({ message: "Error adding customer", error });
    }
};

// @desc    Add multiple customers
// @route   POST /api/customers/list
const addAllCustomer = async (req, res) => {
    try {
        if (!Array.isArray(req.body)) {
            return res.status(400).json({ message: "Invalid input, expected an array of objects." });
        }

        const addedCustomers = await customerService.addAllCustomers(req.body);
        res.status(201).json({ message: "Customers added successfully!", customers: addedCustomers });
    } catch (error) {
        res.status(500).json({ message: "Error adding customers", error });
    }
};

// @desc    Update customer details
// @route   PUT /api/customers/:id
const updateCustomer = async (req, res) => {
    try {
        const updatedCustomer = await customerService.updateCustomer(req.params.id, req.body);
        if (!updatedCustomer) return res.status(404).json({ message: "Customer not found" });
        res.json({ message: "Customer updated successfully", customer: updatedCustomer });
    } catch (error) {
        res.status(500).json({ message: "Error updating customer", error });
    }
};

// @desc    Delete a customer
// @route   DELETE /api/customers/:id
const deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await customerService.deleteCustomer(req.params.id);
        if (!deletedCustomer) return res.status(404).json({ message: "Customer not found" });
        res.json({ message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting customer", error });
    }
};

module.exports = { 
    getAllCustomer, 
    getCustomerById, 
    addCustomer, 
    addAllCustomer, 
    updateCustomer, 
    deleteCustomer 
};
