const Customer = require("../domain/customerModel");

// @desc    Get all customers
// @route   GET /api/customers
const getAllCustomer = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);    
    } catch (error) {
        res.status(500).json({ message: "Error fetching customers", error });
    }
};

// @desc    Get a single customer by ID
// @route   Get /api/customers/:id
const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).json({ message: "Customer not found" });
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: "Error fetching customer", error });
    }
};

//@desc     Add a new customer
//@route    POST /api/customers
const addCustomer = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const newCustomer = new Customer({ name, email, phone });
        await newCustomer.save();
        res.status(201).json({ message: "Customer added successfully", customer: newCustomer });
    } catch (error) {
        res.status(500).json({ message: "Error adding customer", error });
    }
};

// @desc    Update customer details
// @route   PUT /api/customers/:id
const updateCustomer = async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCustomer) return res.status(404).json({ message: "Customer not found" });
        res.json({ message: "Customer updated successfully", customer: updateCustomer });
    } catch (error) {
        res.status(500).json({ message: "Error updating customer", error });
    }
};

// @desc    Delete a customer
// @route   DELETE /api/customers/:id
const deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) return res.status(404).json({ message: "Customer not found" });
        res.json({ message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting customer", error });
    }
};

module.exports = { getAllCustomer, getCustomerById, addCustomer, updateCustomer, deleteCustomer };