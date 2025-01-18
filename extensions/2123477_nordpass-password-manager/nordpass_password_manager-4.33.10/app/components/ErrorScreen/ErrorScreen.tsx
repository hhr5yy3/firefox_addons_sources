import { ExtensionAction } from '@common/constants/action';
import { EmailLinks } from '@common/constants/email';
import { sendMessage } from '@extension/app/api';

import LogoIconByTheme, { IconType } from '@extension/app/components/LogoIconByTheme';
import BrowserApi from '@extension/browser/browserApi';
import { closePopup } from '@extension/app/utils/closePopup';
import { Button, Link, Text } from '@nord/ui';
import { FC, ReactNode, Suspense, lazy } from 'react';

const DownloadLogsButton = lazy(() => process.env.ERROR_LOGGING_SOURCE && import('@common/components/DownloadLogsButton'));

interface IErrorScreen {
  title?: ReactNode;
  description?: ReactNode;
  button?: ReactNode;
}

const defaultDescription = (
  <>
    Please restart the app. If problem persists, please contact
    <Link
      colorClassName="text-teal hover:color-teal ml-1"
      onClick={() => sendMessage(ExtensionAction.OpenMailLink, { url: EmailLinks.Support })}
    >
      Support.
    </Link>
  </>
);

const ErrorScreen: FC<IErrorScreen> = ({ title, description, button }) => (
  <div className="flex flex-col justify-center items-center h-screen bg-primary">
    <div
      className="is-popup flex flex-col h-screen text-center text-grey-darkest leading-normal text-small font-medium overflow-y-auto relative"
    >
      <div className="mb-4 mt-20">
        <LogoIconByTheme type={IconType.Warning} />
      </div>
      <div className="flex-1 p-8 w-full max-w-500 mx-auto flex flex-col">
        <Text variant="h3" className="color-primary font-bold mb-4">
          {title ?? 'Something went wrong'}
        </Text>
        <Text variant="body2" className="mb-12 color-primary">
          {description ?? defaultDescription}
        </Text>
        <Button
          className="w-full font-bold text-base rounded-full"
          color="teal"
          onClick={() => {
            window.location.assign('#');
            BrowserApi.reload();
          }}
        >
          {button ?? 'Restart App'}
        </Button>
        {process.env.ERROR_LOGGING_SOURCE && (
          <Suspense fallback={null}>
            <DownloadLogsButton
              className="mt-2 font-bold text-base"
              onClick={async () => {
                await BrowserApi.sendMessage({ type: ExtensionAction.DownloadLogs });
                closePopup();
              }}
            />
          </Suspense>
        )}
      </div>
    </div>
  </div>
);

export default ErrorScreen;
