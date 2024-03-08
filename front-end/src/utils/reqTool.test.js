// mock the axios module
jest.mock('axios', () => {
  return {
    get: jest.fn(),
    post: jest.fn(),
  };
});

// Import axios to configure mock implementations
const axios = require('axios');
import { apiRequest } from './reqTool.js';

describe('apiRequest', () => {
  beforeEach(() => {
    // Clear mock implementations before each test
    axios.get.mockClear();
    axios.post.mockClear();
  });

  it('should handle a GET request successfully', async () => {
    const data = { message: 'Success' };
    // Configure the mock to resolve with specific data
    axios.get.mockResolvedValue({ data });

    await expect(apiRequest('GET', 'test', {})).resolves.toEqual(data);

    // check if axios.get was called correctly
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8081/api/test', {});
  });

  it('should handle a POST request successfully', async () => {
    const postData = { name: 'New Item' };
    const responseData = { message: 'Item created' };
    // Configure the mock to resolve with specific data
    axios.post.mockResolvedValue({ data: responseData });

    await expect(apiRequest('POST', 'test', postData)).resolves.toEqual(responseData);

    // check if axios.post was called correctly
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8081/api/test', postData);
  });

  it('should handle an error response', async () => {
    const errorMessage = 'Error occurred';
    // Configure the mock to reject with an error
    axios.get.mockRejectedValue(new Error(errorMessage));

    await expect(apiRequest('GET', 'error', {})).rejects.toThrow(errorMessage);

    // check if axios.get was called correctly
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8081/api/error', {});
  });
});
