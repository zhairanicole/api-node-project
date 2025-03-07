const customerService = require('../service/customerService');
const Customer = require('../model/customerModel');
const { describe, it, beforeEach, expect } = require('@jest/globals');

jest.mock('../model/customerModel');

describe('Customer Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCustomers', () => {
    it('should fetch all customers', async () => {
      const mockCustomers = [
        { _id: '1', name: 'Alice Guo', email: 'alice@example.com' },
        { _id: '2', name: 'Risa Hontiveros', email: 'risa@example.com' }
      ];
      Customer.find.mockResolvedValue(mockCustomers);

      const result = await customerService.getAllCustomers();

      expect(Customer.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCustomers);
    });
  });

  describe('getCustomerById', () => {
    it('should return a customer by id', async () => {
      const mockCustomer = { _id: '1', name: 'Alice Guo', email: 'alice@example.com' };
      const mockId = '1';
      Customer.findById.mockResolvedValue(mockCustomer);

      const result = await customerService.getCustomerById(mockId);

      expect(Customer.findById).toHaveBeenCalledWith(mockId);
      expect(result).toEqual(mockCustomer);
    });
  });

  describe('addCustomer', () => {
    it('should create a new customer', async () => {
      const mockCustomerData = { name: 'Alice Guo', email: 'alice@example.com' };
      const mockSavedCustomer = { _id: '1', ...mockCustomerData };
      
      const mockSave = jest.fn().mockResolvedValue(mockSavedCustomer);
      Customer.mockImplementation(() => ({
        save: mockSave
      }));

      const result = await customerService.addCustomer(mockCustomerData);

      expect(Customer).toHaveBeenCalledWith(mockCustomerData);
      expect(mockSave).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockSavedCustomer);
    });
  });

  describe('addAllCustomers', () => {
    it('should create multiple customers', async () => {
      const mockCustomersArray = [
        { name: 'Alice Guo', email: 'alice@example.com' },
        { name: 'Risa Hontiveros', email: 'risa@example.com' }
      ];
      const mockSavedCustomers = [
        { _id: '1', name: 'Alice Guo', email: 'alice@example.com' },
        { _id: '2', name: 'Risa Hontiveros', email: 'risa@example.com' }
      ];
      Customer.insertMany.mockResolvedValue(mockSavedCustomers);

      const result = await customerService.addAllCustomers(mockCustomersArray);

      expect(Customer.insertMany).toHaveBeenCalledWith(mockCustomersArray);
      expect(result).toEqual(mockSavedCustomers);
    });
  });

  describe('updateCustomer', () => {
    it('should edit a customer', async () => {
      const mockId = '1';
      const mockUpdateData = { name: 'Alice Guo Updated' };
      const mockUpdatedCustomer = { _id: '1', name: 'Alice Guo Updated', email: 'alice@example.com' };
      Customer.findByIdAndUpdate.mockResolvedValue(mockUpdatedCustomer);

      const result = await customerService.updateCustomer(mockId, mockUpdateData);

      expect(Customer.findByIdAndUpdate).toHaveBeenCalledWith(mockId, mockUpdateData, { new: true });
      expect(result).toEqual(mockUpdatedCustomer);
    });
  });

  describe('deleteCustomer', () => {
    it('should remove a customer', async () => {
      const mockId = '1';
      const mockDeletedCustomer = { _id: '1', name: 'Alice Guo', email: 'alice@example.com' };
      Customer.findByIdAndDelete.mockResolvedValue(mockDeletedCustomer);

      const result = await customerService.deleteCustomer(mockId);

      expect(Customer.findByIdAndDelete).toHaveBeenCalledWith(mockId);
      expect(result).toEqual(mockDeletedCustomer);
    });
  });
});