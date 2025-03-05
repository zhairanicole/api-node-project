const express = require("express");
const { getAllCustomer, getCustomerById, addCustomer, addAllCustomer, updateCustomer, deleteCustomer } = require("../controller/customerController");

const router = express.Router();

router.get("/", getAllCustomer);
router.get("/:id", getCustomerById);
router.post("/", addCustomer);
router.post("/list", addAllCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;