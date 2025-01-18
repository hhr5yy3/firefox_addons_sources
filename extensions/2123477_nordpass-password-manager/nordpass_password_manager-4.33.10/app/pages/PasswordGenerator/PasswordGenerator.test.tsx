import { render } from '@testing-library/react';
import { wrapWithProviders } from '@extension-tests/utils';

import PasswordGenerator from './PasswordGenerator';

const randomPassword = 'a'.repeat(60);

jest.mock('@extension/browser/browserApi');
jest.mock('@extension/browser/storageApi');
jest.mock('@nordpass/password-generator', () => ({ generatePassword: () => randomPassword, estimateStrength: () => 1 }));
jest.mock('@extension/app/context/PasswordPolicyContext', () => ({ usePasswordPolicy: () => ({ isLoading: false, isEnabled: false }) }));

describe('PasswordGenerator', () => {
  it('should show generated password', async () => {
    const { findByTestId } = render(wrapWithProviders(<PasswordGenerator />));
    const generatedPasswordElement = await findByTestId('generatedPassword');
    expect(generatedPasswordElement.textContent).toBe(randomPassword);
  });
});
