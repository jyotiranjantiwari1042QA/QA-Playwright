import { test, expect, request as apiRequest } from '@playwright/test';

test('POST URL and expect HTTP 200', async () => {
  const context = await apiRequest.newContext({
    ignoreHTTPSErrors: true,
  });

  const response = await context.get('https://v20voiptools.3cx.us:8801/', {
    headers: {
      Accept: 'application/json',
    },
  });

  console.log('Status:', response.status());
  expect(response.status()).toBe(200);

  await context.dispose();
});
