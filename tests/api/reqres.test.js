const axios = require('axios');

describe('Reqres REST API Tests', () => {
  const API_URL = 'https://reqres.in/api';

  test('GET /users/2 - Returns 200 and valid schema', async () => {
    const response = await axios.get(`${API_URL}/users/2`);
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
    expect(response.data.data.id).toBe(2);
    expect(response.data.data.email).toBe('janet.weaver@reqres.in');
    expect(typeof response.data.data.first_name).toBe('string');
  });

  test('POST /users - Creates user and returns 201', async () => {
    const payload = {
      name: 'Anshu Yadav',
      job: 'QA Engineer'
    };

    const response = await axios.post(`${API_URL}/users`, payload);
    
    expect(response.status).toBe(201);
    expect(response.data.name).toBe('Anshu Yadav');
    expect(response.data.job).toBe('QA Engineer');
    expect(response.data).toHaveProperty('id');
    expect(response.data).toHaveProperty('createdAt');
  });

  test('POST /register - Missing password returns 400', async () => {
    const payload = {
      email: 'sydney@fife'
    };

    try {
      await axios.post(`${API_URL}/register`, payload);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('error');
      expect(error.response.data.error).toBe('Missing password');
    }
  });

  test('GET /users/23 - Returns 404 for non-existent user', async () => {
    try {
      await axios.get(`${API_URL}/users/23`);
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data).toEqual({});
    }
  });
});