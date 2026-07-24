import { test, expect } from '@playwright/test';

test('Get Recordings - API', async ({ request }) => {
  const response = await request.get('https://v20voiptools.3cx.us:8801/', {
    headers: {
      Accept: 'application/json',
      // Authorization: `Bearer ${process.env.RM_TOKEN}`, // add if JWT-protected
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);

  expect(Array.isArray(body)).toBeTruthy();
});