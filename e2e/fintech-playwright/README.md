# fintech-playwright

POM-based Playwright + TypeScript QA automation suite for a fintech web application, built against [ParaBank](https://parabank.parasoft.com/parabank/index.htm) — Parasoft's free, publicly hosted demo banking app. It's a real live target with the feature set most fintech QA/SDET interviews probe: registration, auth, account overview, fund transfer, bill pay, transaction search, new-account opening, and a REST API layer.

## Features covered

| Feature | Spec file | Notes |
|---|---|---|
| Registration | `tests/registration.spec.ts` | new user, duplicate username, missing required field |
| Login / Auth | `tests/login.spec.ts` | valid/invalid creds, empty fields, unauthenticated redirect |
| Account Overview | `tests/dashboard.spec.ts` | account list, balance parsing, drill into activity |
| Open New Account | `tests/openAccount.spec.ts` | checking + savings, funded from an existing account |
| Fund Transfer | `tests/transfer.spec.ts` | happy path with before/after balance math, same-account edge case |
| Bill Pay | `tests/billpay.spec.ts` | payment + balance deduction, mismatched account-number validation |
| Find Transactions | `tests/findTransactions.spec.ts` | search by amount, no-results case |
| REST API | `tests/api.spec.ts` | login/customer/accounts endpoints, error status codes, latency/SLA assertion |

## Project structure

```
fintech-playwright/
├── pages/                  # Page Object Model — one class per screen
│   ├── BasePage.ts
│   ├── RegistrationPage.ts
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   ├── OpenAccountPage.ts
│   ├── TransferFundsPage.ts
│   ├── BillPayPage.ts
│   └── FindTransactionsPage.ts
├── fixtures/
│   ├── test-data.ts         # user/payee generators, unique per run
│   └── fixtures.ts          # custom `registeredUser` / `loggedInPage` fixtures
├── tests/                   # one spec file per feature + api.spec.ts
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── .github/workflows/playwright.yml
```

## Design choices

- **POM per screen**, with `expectX()` success/failure assertions living inside the page object so specs stay thin and readable.
- **Custom fixtures** (`registeredUser`, `loggedInPage`) eliminate the register → login boilerplate every test would otherwise repeat.
- **Unique test data per run** (timestamped usernames) so parallel workers and repeat runs never collide.
- **Order-independent tests** — each test that needs a second account opens its own rather than relying on shared fixture state.
- **API layer tested separately** from the UI suite via Playwright's `request` fixture, since that's the layer fintech QA roles weight heavily.

## Getting started

```bash
npm install
npx playwright install --with-deps
npx playwright test
```

Useful scripts:

```bash
npm run test:headed     # watch it run in a real browser window
npm run test:ui         # Playwright's interactive UI mode
npm run test:chromium   # chromium only, for a fast local loop
npm run test:api        # API-layer tests only
npm run typecheck       # tsc --noEmit
npm run report          # open the last HTML report
```

## Configuration

`playwright.config.ts` reads two env vars if you want to point this at a different environment:

- `BASE_URL` — defaults to `https://parabank.parasoft.com/parabank`
- `API_BASE_URL` — defaults to `https://parabank.parasoft.com/parabank/services/bank`

## CI

`.github/workflows/playwright.yml` runs on every push/PR to `main`: install → type-check → install browsers → run full suite across chromium/firefox/webkit → upload the HTML report as an artifact.
