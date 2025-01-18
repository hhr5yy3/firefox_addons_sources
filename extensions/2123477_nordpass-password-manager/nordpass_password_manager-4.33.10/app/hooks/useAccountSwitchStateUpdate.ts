import { showToast, ToastEventType } from '@common/components/ToastNotification/ToastNotificationUtils';
import { Notification } from '@common/constants/notification';
import { INotification } from '@common/interfaces';
import { LogLevel } from '@common/services/loggingFactory/contracts';
import { AuthState } from '@common/store/reducers/authReducer/authConstants';
import { isAccountSwitchingChangeMessage } from '@common/utils/notificationTypeGuards';
import { parseSubscriptionData } from '@common/utils/parseSubscriptionData/parseSubscriptionData';
import { api } from '@extension/app/api';
import { createListener } from '@extension/app/api/createListener';
import StorageApi from '@extension/browser/storageApi';
import { ListenerType, Storage } from '@extension/common/constants';
import { logMessage } from '@extension/common/utils/log/logMessage';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useIntl } from 'react-intl';

export const useAccountSwitchStateUpdate = (setIsAccountSwitching: Dispatch<SetStateAction<boolean>>) => {
  const { formatMessage } = useIntl();

  useEffect(() => {
    const handleIsSwitchingAccount = async (msg: INotification) => {
      if (msg.type === Notification.AccountChanged) {
        try {
          const services = await api.user.getServices();
          const parsedSubscriptionData = parseSubscriptionData(services);
          await StorageApi.set({ [Storage.SubscriptionData]: parsedSubscriptionData });
        } catch (error) {
          logMessage(LogLevel.Error, 'useAccountSwitchStateUpdate', error);
        }
      }

      if (isAccountSwitchingChangeMessage(msg)) {
        setIsAccountSwitching(msg.isSwitching);
      }
    };

    return createListener(handleIsSwitchingAccount, ListenerType.RuntimeMessage);
  }, [setIsAccountSwitching]);

  useEffect(() => {
    const handleIsSwitchingAccount = async (msg: INotification) => {
      if (msg.type === Notification.AccountChanged) {
        try {
          const { authState } = await StorageApi.get({ [Storage.AuthState]: AuthState.Unauthenticated });
          if (authState === AuthState.Authenticated) {
            const email = await api.extension.getUserEmail();
            showToast(ToastEventType.ActionFeedback, { bodyText: formatMessage({ id: 'switchedAccountTo' }, { email }) });
          }
        } catch (error) {
          logMessage(LogLevel.Error, 'useAccountSwitchStateUpdate', error);
        }
      }
    };

    return createListener(handleIsSwitchingAccount, ListenerType.RuntimeMessage);
  }, [formatMessage]);
};
