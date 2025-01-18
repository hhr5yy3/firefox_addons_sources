import { render } from '@testing-library/react';
import { wrapWithProviders } from '@tests/extension/utils';
import StorageApi from '@extension/browser/storageApi';
import { AppTheme } from '@common/constants/appTheme';
import { Storage } from '@extension/common/constants';
import Profile from './Profile';

jest.mock('@extension/browser/browserApi');
jest.mock('@extension/browser/storageApi');

const setup = () => render(wrapWithProviders(<Profile />));
const email = 'test@test.com';

jest.mock('~/api/ExtensionAPI', () => jest.fn().mockReturnValue({ getUserEmail: () => email }));

describe('Profile', () => {
  beforeAll(() => {
    (StorageApi.get as jest.Mock).mockResolvedValue({ [Storage.AppTheme]: AppTheme.Light });
  });

  it('should display current users email', async () => {
    const { findByText } = setup();

    expect(await findByText(email)).toBeVisible();
  });

  it('should display current users plan', async () => {
    const { findByText } = setup();

    expect(await findByText('Free Plan')).toBeVisible();
  });

  it('should display lock button', async () => {
    const { findByText } = setup();

    expect(await findByText('Lock App')).toBeVisible();
  });

  it('should display logout button', async () => {
    const { findByText } = setup();

    expect(await findByText('Log out')).toBeVisible();
  });
});
