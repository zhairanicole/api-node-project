const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - address
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated MongoDB id of the customer
 *         name:
 *           type: string
 *           description: The customer name
 *           required: true
 *         email:
 *           type: string
 *           description: The customer email (must be unique)
 *           required: true
 *         phone:
 *           type: string
 *           description: The customer phone number
 *           required: true
 *         address:
 *           type: string
 *           description: The customer address
 *           required: true
 *       example:
 *         _id: 60d21b4967d0d8992e610c85
 *         name: Alice Guo
 *         email: alice.guo@sample.com
 *         phone: 0912-345-6789
 *         address: 123 United Squaters Area
 */

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;
