export interface UserData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  ssn: string;
  username: string;
  password: string;
}

/** Timestamp-based suffix keeps usernames unique across parallel workers/runs. */
function uniqueSuffix(): string {
  return `${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

export function generateUser(overrides: Partial<UserData> = {}): UserData {
  const suffix = uniqueSuffix();
  return {
    firstName: 'Jane',
    lastName: 'Doe',
    address: '123 Main St',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62704',
    phone: '555-0100',
    ssn: '123-45-6789',
    username: `qa_user_${suffix}`,
    password: 'P@ssw0rd123',
    ...overrides,
  };
}

export const payeeData = {
  name: 'City Electric Co',
  address: '99 Utility Rd',
  city: 'Metropolis',
  state: 'IL',
  zipCode: '62701',
  phone: '555-0199',
  accountNumber: '11223344',
  verifyAccountNumber: '11223344',
};

export const payeeMismatchedData = {
  ...payeeData,
  verifyAccountNumber: '99999999',
};

/** A known existing ParaBank demo account/user combo, for negative auth tests only. */
export const invalidCredentials = {
  username: 'not_a_real_user',
  password: 'wrongpassword',
};
