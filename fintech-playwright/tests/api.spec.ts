import { test, expect } from '@playwright/test';
import { API_BASE_URL } from '../playwright.config';

/**
 * API-level coverage against ParaBank's REST services layer.
 * Fintech QA roles weight this heavily: SLA/latency, auth error codes,
 * and response-shape validation independent of the UI.
 */
test.describe('REST API - Bank Services', () => {
  const validUsername = 'john';
  const validPassword = 'demo';

  test('login endpoint returns customer JSON for valid credentials', async ({ request }) => {
    const start = Date.now();
    const response = await request.get(`${API_BASE_URL}/login/${validUsername}/${validPassword}`, {
      headers: { Accept: 'application/json' },
    });
    const elapsedMs = Date.now() - start;

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('firstName');

    // SLA assertion: demo endpoint should respond well within 5s
    expect(elapsedMs).toBeLessThan(5000);
  });

  test('login endpoint returns an error status for invalid credentials', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/login/not_a_real_user/wrongpassword`, {
      headers: { Accept: 'application/json' },
    });

    // ParaBank's services layer returns a non-2xx / error payload for bad auth
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test('accounts endpoint returns a list of accounts for a valid customer id', async ({ request }) => {
    // customer id 12212 is a known seeded demo account on ParaBank's public instance
    const response = await request.get(`${API_BASE_URL}/customers/12212/accounts`, {
      headers: { Accept: 'application/json' },
    });

    expect(response.ok()).toBeTruthy();
    const accounts = await response.json();
    expect(Array.isArray(accounts)).toBeTruthy();
    if (accounts.length > 0) {
      expect(accounts[0]).toHaveProperty('id');
      expect(accounts[0]).toHaveProperty('balance');
      expect(accounts[0]).toHaveProperty('type');
    }
  });

  test('accounts endpoint returns 404/error for a non-existent customer id', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/customers/999999999/accounts`, {
      headers: { Accept: 'application/json' },
    });

    expect(response.status()).toBeGreaterThanOrEqual(400);
  });
});
