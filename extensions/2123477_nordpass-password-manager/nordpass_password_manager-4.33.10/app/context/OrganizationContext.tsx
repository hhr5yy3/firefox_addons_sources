import { createContext, FC, useContext, useEffect, useMemo, useState } from 'react';

import StorageApi from '@extension/browser/storageApi';
import { ListenerType, Storage } from '@extension/common/constants';
import { api } from '@extension/app/api';
import { createListener } from '@extension/app/api/createListener';
import { noOp } from '@common/constants/function';
import { Notification } from '@common/constants/notification';
import { AuthState } from '@common/store/reducers/authReducer/authConstants';
import { logMessage } from '@extension/common/utils/log/logMessage';
import { LogLevel } from '@common/services/loggingFactory/contracts';
import { useAuthContext } from './AuthContext';

export interface INotification extends Record<string, any> {
  type: string;
}

interface IInvitation {
  organization: string;
  organization_uuid: string;
  type: string;
  status: string;
}

interface IOrganizationContext {
  setShowInvitation: (value: boolean) => void;
  showInvitation: boolean;
  organizationData: IOrganization;
  invitations: Array<IInvitation>;
  isReady: boolean;
}

const OrganizationContext = createContext<IOrganizationContext>({
  setShowInvitation: noOp,
  showInvitation: true,
  organizationData: null,
  invitations: null,
  isReady: false,
});

export const OrganizationContextProvider: FC = ({ children }) => {
  const { authState } = useAuthContext();
  const [organizationData, setOrganizationData] = useState(null);
  const [invitations, setInvitations] = useState(null);
  const [showInvitation, setShowInvitation] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (authState !== AuthState.Authenticated) {
      return noOp;
    }

    (async () => {
      try {
        const organization = await api.organization.fetchOrganization();
        setOrganizationData(organization);

        const invites = await api.organization.getInvites();
        setInvitations(invites);
      } catch (error) {
        logMessage(LogLevel.Error, 'OrganizationContext:getInvitations', error);
      }

      setIsReady(true);
    })();

    function handleChange(msg: INotification) {
      if (msg.type === Notification.OrganizationInfoChanged) {
        StorageApi.set({ [Storage.showOrganizationBar]: true });
        setOrganizationData(msg);
        return;
      }

      if (msg.type === Notification.OrganizationInvitesChanged) {
        StorageApi.set({ [Storage.showOrganizationBar]: true });
        setInvitations(msg.organization_invites);
      }
    }
    return createListener(handleChange, ListenerType.RuntimeMessage);
  }, [authState]);

  const value = useMemo(() => ({
    setShowInvitation,
    organizationData,
    showInvitation,
    invitations,
    isReady,
  }), [organizationData, showInvitation, invitations, isReady]);

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganizationContext = () => useContext(OrganizationContext);
