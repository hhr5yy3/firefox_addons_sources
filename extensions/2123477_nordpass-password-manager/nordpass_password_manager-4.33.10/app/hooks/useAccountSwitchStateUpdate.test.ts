import { showToast, ToastEventType } from '@common/components/ToastNotification/ToastNotificationUtils';
import StorageApi from '@extension/browser/storageApi';
import { Notification } from '@common/constants/notification';
import { Storage } from '@extension/common/constants';
import { wrapWithProviders } from '@extension-tests/utils';
import { api } from '@extension/app/api';
import { createListener } from '@extension/app/api/createListener';
import { act, renderHook } from '@testing-library/react-hooks';
import { AuthState } from '@common/store/reducers/authReducer/authConstants';
import { useAccountSwitchStateUpdate } from './useAccountSwitchStateUpdate';

jest.mock('@extension/app/api/createListener');
jest.mock('@extension/browser/storageApi');
jest.mock('@common/components/ToastNotification/ToastNotificationUtils');

describe('useAccountSwitchStateUpdate', () => {
  jest.spyOn(api.extension, 'getUserEmail').mockResolvedValue('email@mail.com');

  let listeners: Array<{ handler: any; type: any }> = [];
  const triggerNotification = (data: any) => listeners.forEach(({ handler }) => handler(data));

  (createListener as jest.Mock).mockImplementation((handler, type) => {
    listeners.push({ handler, type });
    return jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    listeners = [];
  });

  const setup = () => renderHook(
    () => useAccountSwitchStateUpdate(jest.fn()),
    { wrapper: ({ children }) => wrapWithProviders(children) },
  );

  it('should call show account changed toast with user email', async () => {
    (StorageApi.get as jest.Mock).mockResolvedValue({
      [Storage.AuthState]: AuthState.Authenticated,
    });

    const { waitFor } = setup();
    expect(showToast).not.toHaveBeenCalled();

    act(() => triggerNotification({
      id: 0,
      type: Notification.AccountChanged,
    }));

    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith(
        ToastEventType.ActionFeedback,
        { bodyText: 'Switched account to email@mail.com' },
      );
    });
  });
});
