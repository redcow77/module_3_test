import { api } from '@/lib/api';

global.fetch = jest.fn();

describe('ApiClient', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('GET requests', () => {
    test('makes successful GET request', async () => {
      const mockData = { id: 1, name: 'test' };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await api.get('/test');

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/v1/test',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      expect(result).toEqual(mockData);
    });

    test('handles GET request errors', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(api.get('/test')).rejects.toThrow('HTTP error! status: 404');
    });
  });

  describe('POST requests', () => {
    test('makes successful POST request with data', async () => {
      const mockData = { id: 1, name: 'test' };
      const postData = { name: 'test' };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await api.post('/test', postData);

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/v1/test',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(postData),
        })
      );
      expect(result).toEqual(mockData);
    });

    test('handles POST request errors', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
      });

      await expect(api.post('/test', {})).rejects.toThrow('HTTP error! status: 400');
    });
  });

  describe('PUT requests', () => {
    test('makes successful PUT request with data', async () => {
      const mockData = { id: 1, name: 'updated' };
      const putData = { name: 'updated' };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await api.put('/test/1', putData);

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/v1/test/1',
        expect.objectContaining({
          method: 'PUT',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(putData),
        })
      );
      expect(result).toEqual(mockData);
    });

    test('handles PUT request errors', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(api.put('/test/1', {})).rejects.toThrow('HTTP error! status: 404');
    });
  });

  describe('DELETE requests', () => {
    test('makes successful DELETE request', async () => {
      const mockData = { success: true };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await api.delete('/test/1');

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/v1/test/1',
        expect.objectContaining({
          method: 'DELETE',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      expect(result).toEqual(mockData);
    });

    test('handles DELETE request errors', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(api.delete('/test/1')).rejects.toThrow('HTTP error! status: 404');
    });
  });

  describe('Network errors', () => {
    test('handles network failures', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(api.get('/test')).rejects.toThrow('Network error');
    });
  });
});
