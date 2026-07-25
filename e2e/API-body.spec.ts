import { test, expect, request as apiRequest, APIRequestContext, APIResponse } from '@playwright/test';

test('get API - show status, headers, and body', async (): Promise<void> => {
  const context: APIRequestContext = await apiRequest.newContext({
    ignoreHTTPSErrors: true,
  });

  try {
    const response: APIResponse = await context.get('https://v20voiptools.3cx.us:8801/', {
      headers: {
        Accept: 'application/json',
      },
    });

    // 1. Status
    const status: number = response.status();
    const statusText: string = response.statusText();
    console.log('=== STATUS ===');
    console.log(status, statusText);

    // 2. Headers
    const headers: Record<string, string> = response.headers();
    console.log('=== HEADERS ===');
    console.log(headers);

    // 3. Body
    const body: string = await response.text();
    console.log('=== BODY ===');
    console.log(body);

    // 4. Assertion
    expect(status).toBe(200);
  } finally {
    await context.dispose();
  }
});