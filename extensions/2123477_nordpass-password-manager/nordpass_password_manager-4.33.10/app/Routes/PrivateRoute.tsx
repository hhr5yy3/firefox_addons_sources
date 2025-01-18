import { useContext, FC, useEffect, useMemo } from 'react';
import { Navigate, Outlet, RouteProps } from 'react-router-dom-v5-compat';

import { ROUTES } from '@extension/common/constants';
import { isSafari } from '@common/utils/isSafari';
import { AuthContext } from '@extension/app/context';
import LayoutPrivate from '@extension/app/layouts/LayoutPrivate';
import { api } from '@extension/app/api';
import { AuthState } from '@common/store/reducers/authReducer/authConstants';
import { ExtensionContext } from '@extension/app/context/ExtensionContext';
import { PasswordPolicyContextProvider } from '../context/PasswordPolicyContext';
import { setLastPage } from './lastPage';

interface IPrivateRouteProps extends RouteProps {
  hideHeader?: boolean;
}

const PrivateRoute: FC<IPrivateRouteProps> = ({
  hideHeader,
}) => {
  const { authState } = useContext(AuthContext);
  const { isPopup } = useContext(ExtensionContext);
  const isUnauthenticated = useMemo(() => authState !== AuthState.Authenticated, [authState]);
  const isPopupOrSafari = useMemo(() => isPopup || isSafari, [isPopup]);

  useEffect(() => {
    if (isUnauthenticated) {
      setLastPage(window.location.hash.substring(1));
    }
  }, [isUnauthenticated]);

  useEffect(() => {
    if (!isPopupOrSafari) {
      api.extension.openDesktopApp();
      api.extension.closeTab();
    }
  }, [isPopupOrSafari]);

  if (isUnauthenticated) {
    return <Navigate to={ROUTES.VALIDATE_MASTER} replace />;
  }

  if (!isPopupOrSafari) {
    return null;
  }

  return (
    <PasswordPolicyContextProvider>
      <LayoutPrivate hideHeader={hideHeader}>
        <Outlet />
      </LayoutPrivate>
    </PasswordPolicyContextProvider>
  );
};

export default PrivateRoute;
