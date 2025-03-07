const request = require('supertest');
const express = require('express');
const { describe, it, expect, beforeEach } = require('@jest/globals');
const customerRoutes = require('../routes/customerRoutes');
const customerController = require('../controller/customerController');

jest.mock('../controller/customerController');

describe('Customer Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/customers', customerRoutes);

    jest.clearAllMocks();

    customerController.getAllCustomer.mockImplementation((req, res) => {
      res.json([
        { _id: '1', name: 'Alice Guo', email: 'alice@example.com' },
        { _id: '2', name: 'Risa Hontiveros', email: 'risa@example.com' }
      ]);
    });

    customerController.getCustomerById.mockImplementation((req, res) => {
      res.json({ _id: req.params.id, name: 'Alice Guo', email: 'alice@example.com' });
    });

    customerController.addCustomer.mockImplementation((req, res) => {
      res.status(201).json({ message: 'Customer added successfully', customer: { _id: '1', ...req.body } });
    });

    customerController.addAllCustomer.mockImplementation((req, res) => {
      res.status(201).json({ 
        message: 'Customers added successfully!', 
        customers: req.body.map((c, i) => ({ 
          _id: String(i + 1), 
          ...c 
        }))
      });
    });

    customerController.updateCustomer.mockImplementation((req, res) => {
      res.json({ 
        message: 'Customer updated successfully', 
        customer: { _id: req.params.id, ...req.body } 
      });
    });

    customerController.deleteCustomer.mockImplementation((req, res) => {
      res.json({ message: 'Customer deleted successfully' });
    });
  });

  describe('GET /api/customers', () => {
    it('should fetch all customers', async () => {
      const response = await request(app).get('/api/customers');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(customerController.getAllCustomer).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/customers/:id', () => {
    it('should return a customer by id', async () => {
      const response = await request(app).get('/api/customers/1');
      
      expect(response.status).toBe(200);
      expect(response.body._id).toBe('1');
      expect(customerController.getCustomerById).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /api/customers', () => {
    it('should create a new customer', async () => {
      const customerData = { name: 'Alice Guo', email: 'alice@example.com' };
      const response = await request(app)
        .post('/api/customers')
        .send(customerData)
        .set('Content-Type', 'application/json');
      
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Customer added successfully');
      expect(response.body.customer).toHaveProperty('_id');
      expect(response.body.customer.name).toBe(customerData.name);
      expect(customerController.addCustomer).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /api/customers/list', () => {
    it('should create multiple customers', async () => {
      const customersData = [
        { name: 'Alice Guo', email: 'alice@example.com' },
        { name: 'Risa Hontiveros', email: 'risa@example.com' }
      ];
      const response = await request(app)
        .post('/api/customers/list')
        .send(customersData)
        .set('Content-Type', 'application/json');
      
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Customers added successfully!');
      expect(Array.isArray(response.body.customers)).toBe(true);
      expect(response.body.customers.length).toBe(customersData.length);
      expect(customerController.addAllCustomer).toHaveBeenCalledTimes(1);
    });
  });

  describe('PUT /api/customers/:id', () => {
    it('should edit a customer', async () => {
      const updateData = { name: 'Alice Guo Updated' };
      const response = await request(app)
        .put('/api/customers/1')
        .send(updateData)
        .set('Content-Type', 'application/json');
      
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Customer updated successfully');
      expect(response.body.customer._id).toBe('1');
      expect(response.body.customer.name).toBe(updateData.name);
      expect(customerController.updateCustomer).toHaveBeenCalledTimes(1);
    });
  });

  describe('DELETE /api/customers/:id', () => {
    it('should remove a customer', async () => {
      const response = await request(app).delete('/api/customers/1');
      
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Customer deleted successfully');
      expect(customerController.deleteCustomer).toHaveBeenCalledTimes(1);
    });
  });
});