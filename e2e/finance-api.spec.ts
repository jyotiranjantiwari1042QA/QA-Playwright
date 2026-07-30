import { test, expect, request as apiRequest } from '@playwright/test';

test.describe('Finance API sample tests', () => {
  test('GET /health returns status 200', async () => {
    const apiContext = await apiRequest.newContext();

    const response = await apiContext.get('https://jsonplaceholder.typicode.com/todos/1', {
      headers: {
        Accept: 'application/json',
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('id');

    await apiContext.dispose();
  });

  test('POST /posts creates a resource', async () => {
    const apiContext = await apiRequest.newContext();

    const response = await apiContext.post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        title: 'Finance sample',
        body: 'Sample API test case',
        userId: 1,
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.title).toBe('Finance sample');

    await apiContext.dispose();
  });
});
