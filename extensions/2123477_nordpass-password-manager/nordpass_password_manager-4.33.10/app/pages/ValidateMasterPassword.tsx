import PasswordInput from '@common/components/PasswordInput/PasswordInput';
import { FeatureFlag } from '@common/constants/featureFlag';
import useAction from '@common/hooks/useAction/useAction';
import { AuthState } from '@common/store/reducers/authReducer/authConstants';
import { api } from '@extension/app/api';
import { logout } from '@extension/app/api/authApi';
import { AuthContext } from '@extension/app/context';
import { ExtensionContext } from '@extension/app/context/ExtensionContext';
import { useExtensionFeature } from '@extension/app/utils/getIsFeatureEnabled';
import { Button, Link, Loader, Text } from '@nord/ui';
import { memo, useContext, useLayoutEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { satisfies } from 'semver';
import { detect } from 'detect-browser';
import { sendMetric } from '@common/utils/sendMetric';
import { Metric, MetricType } from '@common/constants/metrics';
import AccountSwitchButton from './components/AccountSwitchButton/AccountSwitchButton';
import { closePopup } from '../utils/closePopup';

const browser = detect();
const isSupportedSafariVersion = !browser?.version || satisfies(browser.version, '>=15.6.0');
const isAutoFocusSupported =
  process.env.IS_AUTOFOCUS_FULLY_SUPPORTED || !process.env.SAFARI || isSupportedSafariVersion; // safari 15.5 has performance issues with autoFocus attribute

const ValidateMasterPassword = () => {
  const { formatMessage } = useIntl();
  const { isPopup } = useContext(ExtensionContext);
  const { authState, email } = useContext(AuthContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isSwitchAccountEnabled = useExtensionFeature(FeatureFlag.SwitchAccount);

  useLayoutEffect(() => () => {
    const passwordElement = document.getElementById('password');
    if (passwordElement) {
      (passwordElement as HTMLInputElement).value = '';
    }
  }, []);

  const { action: validate, isLoading, errorMessage } = useAction(api.masterPassword.validate, {
    onError: () => sendMetric(api, Metric.MasterPasswordValidate, MetricType.Error),
  });

  const onLogoutClick = () => {
    sendMetric(api, Metric.Logout, MetricType.Intent);
    logout();
    if (isPopup) {
      closePopup({ legacySafariPopupClose: api.extension.closePopup });
    } else {
      api.extension.closeTab();
    }
  };

  const onClickForgot = () => {
    api.extension.openDesktopApp({ route: 'MASTER_RECOVERY' });

    if (isPopup) {
      closePopup({ legacySafariPopupClose: api.extension.closePopup });
    } else {
      api.extension.closeTab();
    }
  };

  const handleSubmit = () => {
    sendMetric(api, Metric.MasterPasswordValidate, MetricType.Intent);
    const inputValue = (document.getElementById('password') as HTMLInputElement).value;
    setIsPasswordVisible(false);
    validate(email, inputValue);
  };

  if (!email && authState !== AuthState.MasterValidate) {
    return null;
  }

  return (
    <form className="flex flex-col h-full" autoComplete="off">
      <Text variant="h3" className="color-primary font-bold mb-4">
        <FormattedMessage id="enterMasterPassword" />
      </Text>

      <div className="mb-5 flex justify-center">
        {isSwitchAccountEnabled ? (
          <AccountSwitchButton email={email} disabled={isLoading} />
        ) : (
          <>
            <span className="color-primary truncate">{email}</span>
            <span className="mx-1 color-primary">·</span>
            <Link
              className="whitespace-no-wrap"
              colorClassName="text-teal hover:text-grey-dark"
              onClick={onLogoutClick}
            >
              <FormattedMessage id="logOut" />
            </Link>
          </>
        )}
      </div>

      <PasswordInput
        id="password"
        isPasswordVisible={isPasswordVisible}
        setIsPasswordVisible={setIsPasswordVisible}
        label={formatMessage({ id: 'masterPassword' })}
        autoFocus={isAutoFocusSupported}
        disabled={isLoading}
        error={errorMessage}
      />

      <Button
        type="submit"
        className="w-full text-base rounded-full mt-2"
        color="teal"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        <FormattedMessage id="unlockNordPass" />
        {isLoading && <Loader size="small" className="ml-2" />}
      </Button>

      <Text variant="body2" className="mt-auto">
        <Link onClick={onClickForgot} colorClassName="text-teal hover:text-grey-dark">
          <FormattedMessage id="forgotMasterPasswordQuestion" />
        </Link>
      </Text>
    </form>
  );
};

export default memo(ValidateMasterPassword);
