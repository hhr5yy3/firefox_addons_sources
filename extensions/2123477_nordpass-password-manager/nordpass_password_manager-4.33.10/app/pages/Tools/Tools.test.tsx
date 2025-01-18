import { getIsFeatureEnabled } from '@extension/app/utils/getIsFeatureEnabled';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { ROUTES } from '@extension/common/constants/routes';
import { IntlProvider } from 'react-intl';
import Tools from '@extension/app/pages/Tools/Tools';
import history from '@extension/app/utils/history';
import { sendMessage } from '@extension/app/api';
import AuthContext from '@extension/app/context/AuthContext';
import defaultLocale from '@extension/assets/lang/compiled/en.json';
import { Action } from '@common/constants/action';
import { RemoteURL } from '@common/constants/remoteURL';
import { openInNewTab } from '@extension/common/utils/openInNewTab';
import { AuthState } from '@common/store/reducers/authReducer/authConstants';
import StorageApi from '@extension/browser/storageApi';
import { Storage, AppState } from '@extension/common/constants';

jest.mock('@extension/browser/browserApi');
jest.mock('@common/services/getOs', () => ({ getOs: () => 'Mac' }));
jest.mock('@extension/common/utils/openInNewTab');
jest.mock('@extension/browser/storageApi');
jest.mock('@extension/app/utils/getIsFeatureEnabled');
jest.spyOn(history, 'push');

const nordVpn = 'NordVPN';
const nordLocker = 'NordLocker';
const setup = () => {
  (StorageApi.get as jest.Mock).mockResolvedValue({ [Storage.AppState]: AppState.Ready });

  return render(
    <AuthContext.Provider value={{
      subscriptionData: {
        isPremium: true,
        isBusiness: false,
        expirationDate: null,
        isTrial: false,
        isTrialAvailable: false,
        planName: null,
        registrationDate: '',
      },
      authState: AuthState.Authenticated,
      email: 'test@test.com',
    }}
    >
      <IntlProvider locale="en" defaultLocale="en" messages={defaultLocale}>
        <Tools />
      </IntlProvider>
    </AuthContext.Provider>,
  );
};

describe('<Tools />', () => {
  describe('when user is logged in', () => {
    it('should render 3 tools and 2 product links', async () => {
      (getIsFeatureEnabled as jest.Mock).mockResolvedValue(false);

      const { findByText } = setup();

      expect(await findByText('Password Generator')).toBeVisible();
      expect(await findByText('Password Health')).toBeVisible();
      expect(await findByText('Data Breach Scanner')).toBeVisible();

      expect(await findByText(nordVpn)).toBeVisible();
      expect(await findByText(nordLocker)).toBeVisible();
    });

    it('should render emergency access when toggle is enabled', async () => {
      (getIsFeatureEnabled as jest.Mock).mockResolvedValue(true);

      const { findByText } = setup();

      expect(await findByText('Emergency Access')).toBeVisible();
    });
  });

  it('should redirect to password generator', async () => {
    const { findByText } = setup();

    fireEvent.click(await findByText('Password Generator'));

    expect(history.push).toHaveBeenCalledWith(ROUTES.GENERATE_PASSWORD);
  });

  it('should open password health in desktop', async () => {
    const { findByText } = setup();

    fireEvent.click(await findByText('Password Health'));
    await waitFor(() => {
      expect(sendMessage).toBeCalledWith(Action.DesktopOpen, { route: 'PASSWORD_HEALTH' });
    });
  });

  it('should open breach scanner in desktop', async () => {
    const { findByText } = setup();

    fireEvent.click(await findByText('Data Breach Scanner'));

    await waitFor(() => {
      expect(sendMessage).toBeCalledWith(Action.DesktopOpen, { route: 'DATA_BREACH' });
    });
  });

  it('should open emergency access in desktop', async () => {
    (getIsFeatureEnabled as jest.Mock).mockResolvedValue(true);

    const { findByText } = setup();

    fireEvent.click(await findByText('Emergency Access'));

    await waitFor(() => {
      expect(sendMessage).toBeCalledWith(Action.DesktopOpen, { route: 'EMERGENCY_ACCESS' });
    });
  });

  it('should open new tab with Nord VPN link', async () => {
    const { findByText } = setup();

    fireEvent.click(await findByText(nordVpn));

    expect(openInNewTab).toBeCalledWith(RemoteURL.NordVPN);
  });

  it('should open new tab with Nord Locker link', async () => {
    const { findByText } = setup();

    fireEvent.click(await findByText(nordLocker));

    expect(openInNewTab).toBeCalledWith(RemoteURL.NordLocker);
  });
});
