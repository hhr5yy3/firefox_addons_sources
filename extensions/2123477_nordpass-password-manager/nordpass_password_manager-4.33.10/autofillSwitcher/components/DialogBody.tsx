import { FC, useEffect } from 'react';
import { Image } from '@nord/ui';
import { useIntl } from 'react-intl';
import { useAppTheme } from '@extension/app/hooks/useAppTheme';
import BrowserApi from '@extension/browser/browserApi';
import { ExtensionAction } from '@common/constants/action';
import { SECOND } from '@common/constants/time';
import disabledLightIcon from '@icons/40/disabled-light.svg';
import disabledDarkIcon from '@icons/40/disabled-dark.svg';
import enabledLightIcon from '@icons/40/enabled-light.svg';
import enabledDarkIcon from '@icons/40/enabled-dark.svg';
import { SwitcherType } from '@extension/content/autofillSwitcher/Dialog';

const closeAutofillSwitcherDialog = () => BrowserApi.sendMessage({ type: ExtensionAction.CloseAutofillSwitcherDialog });

const getIcon = (isDarkTheme: boolean, isEnabled: boolean) => {
  if (isEnabled) {
    return isDarkTheme ? enabledDarkIcon : enabledLightIcon;
  }

  return isDarkTheme ? disabledDarkIcon : disabledLightIcon;
};

const DialogBody: FC = () => {
  const { formatMessage } = useIntl();
  const { isDarkTheme } = useAppTheme();
  const searchParams = new URLSearchParams(window.location.search);
  const isAutofillEnabled = searchParams.get('type') === SwitcherType.Enable;

  useEffect(() => {
    setTimeout(closeAutofillSwitcherDialog, 3 * SECOND);
  }, []);

  return (
    <div role="presentation" className="flex p-6 bg-primary color-primary-accent-6" onClick={closeAutofillSwitcherDialog}>
      <div className="mr-3 flex">
        <span className="rounded-full item-image-32px flex items-center justify-center">
          <Image src={getIcon(isDarkTheme, isAutofillEnabled)} noLazy />
        </span>
      </div>
      <div className="w-full text-small">
        <p className="font-bold">
          {isAutofillEnabled ?
            formatMessage({ id: 'autofillIsTurnedBackOn' }) :
            formatMessage({ id: 'weWontAutofillOnThisPage' })
          }
        </p>
        <p>
          {isAutofillEnabled ?
            formatMessage({ id: 'weWillNowAutofillYourDetailsOnThisPage' }) :
            formatMessage({ id: 'youCanTurnItBackOnAtAnyTime' })
          }
        </p>
      </div>
    </div>
  );
};

export default DialogBody;
