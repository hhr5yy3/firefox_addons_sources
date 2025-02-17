import { noOp } from '@common/constants/function';
import { FC, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Router } from 'react-router-dom';
import { CompatRouter, Route, Routes } from 'react-router-dom-v5-compat';

import { AppState, ListenerType, ROUTES, Storage } from '@extension/common/constants';
import { logMessage } from '@extension/common/utils/log/logMessage';
import BrowserApi from '@extension/browser/browserApi';
import StorageApi from '@extension/browser/storageApi';
import { api } from '@extension/app/api';
import { createListener } from '@extension/app/api/createListener';
import useIsSafariPopup from '@extension/app/hooks/useIsSafariPopup';
import { OrganizationContextProvider } from '@extension/app/context/OrganizationContext';
import { initAppLogger } from '@extension/app/utils/initAppLogger';
import { AuthState } from '@common/store/reducers/authReducer/authConstants';
import AppClosed from '@extension/app/components/AppClosed';
import AppOutdated from '@extension/app/components/AppOutdated';
import ApproveExtension from '@extension/app/components/ApproveExtension/ApproveExtension';
import FullscreenLoader from '@common/components/FullScreenLoader/FullscreenLoader';
import ToastContainer from '@common/components/ToastNotification/ToastContainer';
import { NO_WS_CONNECTION_ERROR_NAME } from '@common/constants';
import ContentError from '@common/utils/ContentError';
import useLoaderLogging from '@common/hooks/useLoaderLogging/useLoaderLogging';
import { parseSubscriptionData } from '@common/utils/parseSubscriptionData/parseSubscriptionData';
import { LogLevel } from '@common/services/loggingFactory/contracts';
import { ErrorScreen, MacRefreshCounter } from '@extension/app/components';
import ExtensionProvider from '@extension/app/context/ExtensionContext';
import { AuthProvider, IAuthContext } from '@extension/app/context/AuthContext';
import { useAppThemeChangeListener } from '@extension/app/hooks/useAppThemeChangeListener';
import { useAuthStateChangeListener } from '@extension/app/hooks/useAuthStateChangeListener';
import { useAccountSwitchStateUpdate } from '@extension/app/hooks/useAccountSwitchStateUpdate';
import history from '@extension/app/utils/history';
import ExtensionRoutes from '@extension/app/Routes/ExtensionRoutes';
import InstallApp from './components/InstallApp';
import { closePopup } from './utils/closePopup';

let hasWsFailed = false;
const hasInterProcessReduxStore = process.env.HAS_INTERPROCESS_REDUX_STORE;

const initApp = async (): Promise<IAuthContext | null> => {
  const isPopup = await BrowserApi.isPopupOpen();

  try {
    const state = await api.user.getAuthState().catch(async (error: ContentError) => {
      if (error.info?.name === NO_WS_CONNECTION_ERROR_NAME) {
        // on Safari extension, on reload (after 'Restart App' click or manual reload) extension looses ws connection
        hasWsFailed = true;
      }
    });

    if (state) {
      if (![AuthState.MasterValidate, AuthState.Authenticated].includes(state)) {
        // make sure desktop app is opened before closing extension popup
        await api.extension.openDesktopApp().catch(noOp);

        if (isPopup) {
          closePopup({ legacySafariPopupClose: api.extension.closePopup });
        } else {
          await api.extension.closeTab().catch(noOp);
        }
      }

      await StorageApi.set({ authState: state });

      if (state === AuthState.Authenticated) {
        const userServices = await api.user.getServices();
        await StorageApi.set({ [Storage.SubscriptionData]: parseSubscriptionData(userServices) });
      }
    }
  } catch (error) {
    logMessage(LogLevel.Error, 'App:', error);
    return null;
  }

  return StorageApi.get({
    authState: AuthState.Unauthenticated,
    email: '',
    appVersion: null,
    [Storage.SubscriptionData]: parseSubscriptionData(),
  });
};

let removeErrorListeners: () => void;

const Loader: FC<{ isLoading: boolean; isAppStateLoading: boolean; isAccountSwitching: boolean }> = ({
  isLoading,
  isAppStateLoading,
  isAccountSwitching,
}) => {
  useLoaderLogging(isLoading, logMessage, 'App:isLoading');
  useLoaderLogging(isAppStateLoading, logMessage, 'App:isAppStateLoading');
  useLoaderLogging(isAccountSwitching, logMessage, 'App:isAccountSwitching');

  return (
    <div className="h-screen bg-primary">
      <FullscreenLoader />
    </div>
  );
};

export const Popup: FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [isAccountSwitching, setIsAccountSwitching] = useState(false);
  const [appState, setAppState] = useState(AppState.Loading);
  const [initialAuthContextState, setInitialAuthContextState] = useState<IAuthContext>();
  const [isPopup, setIsPopup] = useState(false);
  const isSafariPopup = useIsSafariPopup();
  const isAppStateLoading = appState === AppState.Loading;

  const onAppStateReady = async () => {
    if (removeErrorListeners) {
      removeErrorListeners();
    }
    removeErrorListeners = initAppLogger();

    const state = await initApp();

    if (state) {
      setInitialAuthContextState(state);
    }
  };

  useAppThemeChangeListener();

  useEffect(() => {
    (async () => {
      setIsPopup(await BrowserApi.isPopupOpen());

      const result = await StorageApi.get({ [Storage.AppState]: AppState.Loading });
      setAppState(result[Storage.AppState]);

      if (result[Storage.AppState] === AppState.Ready) {
        await onAppStateReady();
      }

      if (hasWsFailed && !hasInterProcessReduxStore) {
        await api.extension.openWS();
      }

      if (result[Storage.AppState] !== AppState.Loading) {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if ((isSafariPopup || isPopup) && !hasInterProcessReduxStore) {
      api.extension.openWS().catch(error => logMessage(LogLevel.Error, 'openws:', error));
      api.extension.closeAutofill();
    }
  }, [isSafariPopup, isPopup]);

  useEffect(() => {
    const checkApp = async (changes: Record<string, any>) => {
      const appStateChanges = changes[Storage.AppState];

      if (appStateChanges) {
        if (appStateChanges.newValue === AppState.Ready) {
          setLoading(true);
          await onAppStateReady();
          setLoading(false);
        } else if (
          appStateChanges.newValue === AppState.Loading &&
          appStateChanges.oldValue !== AppState.Crashed
        ) {
          return; // ignore reloads when not crashed
        }

        if (appStateChanges.newValue !== AppState.Loading) {
          setLoading(false);
        }
        setAppState(appStateChanges.newValue);
      }
    };
    return createListener(checkApp, ListenerType.StorageChange);
  }, []);

  useAccountSwitchStateUpdate(setIsAccountSwitching);
  const authState = useAuthStateChangeListener(isPopup);

  const toggleToastVisibility = (isVisible: boolean) => StorageApi.set({ [Storage.IsToastVisible]: isVisible });

  if (isLoading || isAppStateLoading || isAccountSwitching) {
    return (
      <Router history={history}>
        <CompatRouter>
          <Loader isLoading={isLoading} isAppStateLoading={isAppStateLoading} isAccountSwitching={isAccountSwitching} />
        </CompatRouter>
      </Router>
    );
  }

  return (
    <>
      <MacRefreshCounter isPopup={isPopup} />
      <ExtensionProvider isPopup={isPopup || isSafariPopup}>
        <Router history={history}>
          <CompatRouter>
            <Routes>
              <Route path={ROUTES.DOWNLOAD_APP} element={<InstallApp />} />
              <Route
                path="/*"
                element={
                  <>
                    {appState === AppState.Crashed && <ErrorScreen />}
                    {appState === AppState.NeedApprove && <ApproveExtension />}
                    {appState === AppState.Closed && <AppClosed />}
                    {appState === AppState.NotCompatible && <AppOutdated />}
                    {appState === AppState.FailedApprove && (
                      <ErrorScreen
                        title={<FormattedMessage id="authenticityErrorTitle" />}
                        description={<FormattedMessage id="authenticityErrorDescription" />}
                        button={<FormattedMessage id="authenticityErrorButton" />}
                      />
                    )}
                    {appState === AppState.Ready && (
                      <AuthProvider initialState={initialAuthContextState} authState={authState}>
                        <OrganizationContextProvider>
                          <ExtensionRoutes />
                          <ToastContainer isExtension onToastVisibilityToggle={toggleToastVisibility} />
                        </OrganizationContextProvider>
                      </AuthProvider>
                    )}
                  </>
                }
              />
            </Routes>
          </CompatRouter>
        </Router>
      </ExtensionProvider>
    </>
  );
};
