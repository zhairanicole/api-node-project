const express = require("express");
const { getAllCustomer, getCustomerById, addCustomer, updateCustomer, deleteCustomer } = require("../controllers/customerController");

const router = express.Router();

router.get("/", getAllCustomer);
router.get("/:id", getCustomerById);
router.post("/", addCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;