const { describe, it, expect, beforeEach } = require('@jest/globals');
const {
  getAllCustomer,
  getCustomerById,
  addCustomer,
  addAllCustomer,
  updateCustomer,
  deleteCustomer
} = require('../controller/customerController');
const customerService = require('../service/customerService');

jest.mock('../service/customerService');

describe('Customer Controller', () => {
  let mockRequest;
  let mockResponse;
  let responseObject;

  beforeEach(() => {
    responseObject = {};
    
    mockRequest = {
      params: {},
      body: {}
    };
    
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
        return mockResponse;
      })
    };

    jest.clearAllMocks();
  });

  describe('getAllCustomer', () => {
    it('should fetch all customers with status 200', async () => {
      const mockCustomers = [
        { _id: '1', name: 'Alice Guo', email: 'alice@example.com' },
        { _id: '2', name: 'Risa Hontiveros', email: 'risa@example.com' }
      ];
      customerService.getAllCustomers.mockResolvedValue(mockCustomers);

      await getAllCustomer(mockRequest, mockResponse);

      expect(customerService.getAllCustomers).toHaveBeenCalledTimes(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCustomers);
    });
  });

  describe('getCustomerById', () => {
    it('should return a customer by id with status 200', async () => {
      const mockCustomer = { _id: '1', name: 'Alice Guo', email: 'alice@example.com' };
      const mockId = '1';
      mockRequest.params.id = mockId;
      customerService.getCustomerById.mockResolvedValue(mockCustomer);

      await getCustomerById(mockRequest, mockResponse);

      expect(customerService.getCustomerById).toHaveBeenCalledWith(mockId);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCustomer);
    });
  });

  describe('addCustomer', () => {
    it('should create a customer and return status 201', async () => {
      const mockCustomerData = { name: 'Alice Guo', email: 'alice@example.com' };
      const mockSavedCustomer = { _id: '1', ...mockCustomerData };
      mockRequest.body = mockCustomerData;
      customerService.addCustomer.mockResolvedValue(mockSavedCustomer);

      await addCustomer(mockRequest, mockResponse);

      expect(customerService.addCustomer).toHaveBeenCalledWith(mockCustomerData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Customer added successfully',
          customer: mockSavedCustomer
        })
      );
    });
  });

  describe('addAllCustomer', () => {
    it('should create multiple customers and return status 201', async () => {
      const mockCustomersArray = [
        { name: 'Alice Guo', email: 'alice@example.com' },
        { name: 'Risa Hontiveros', email: 'risa@example.com' }
      ];
      const mockSavedCustomers = [
        { _id: '1', name: 'Alice Guo', email: 'alice@example.com' },
        { _id: '2', name: 'Risa Hontiveros', email: 'risa@example.com' }
      ];
      mockRequest.body = mockCustomersArray;
      customerService.addAllCustomers.mockResolvedValue(mockSavedCustomers);

      await addAllCustomer(mockRequest, mockResponse);

      expect(customerService.addAllCustomers).toHaveBeenCalledWith(mockCustomersArray);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Customers added successfully!',
          customers: mockSavedCustomers
        })
      );
    });
  });

  describe('updateCustomer', () => {
    it('should edit a customer and return status 200', async () => {
      const mockId = '1';
      const mockUpdateData = { name: 'Alice Guo Updated' };
      const mockUpdatedCustomer = { _id: '1', name: 'Alice Guo Updated', email: 'alice@example.com' };
      mockRequest.params.id = mockId;
      mockRequest.body = mockUpdateData;
      customerService.updateCustomer.mockResolvedValue(mockUpdatedCustomer);

      await updateCustomer(mockRequest, mockResponse);

      expect(customerService.updateCustomer).toHaveBeenCalledWith(mockId, mockUpdateData);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Customer updated successfully',
          customer: mockUpdatedCustomer
        })
      );
    });
  });

  describe('deleteCustomer', () => {
    it('should remove a customer and return status 200', async () => {
      const mockId = '1';
      const mockDeletedCustomer = { _id: '1', name: 'Alice Guo', email: 'alice@example.com' };
      mockRequest.params.id = mockId;
      customerService.deleteCustomer.mockResolvedValue(mockDeletedCustomer);

      await deleteCustomer(mockRequest, mockResponse);

      expect(customerService.deleteCustomer).toHaveBeenCalledWith(mockId);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Customer deleted successfully'
        })
      );
    });
  });
});