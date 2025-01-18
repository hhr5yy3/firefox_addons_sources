import { FC, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Image } from '@nord/ui';
import { useAppTheme } from '@extension/app/hooks/useAppTheme';
import BrowserApi from '@extension/browser/browserApi';
import { ExtensionAction } from '@common/constants/action';
import { SECOND } from '@common/constants/time';
import likeDarkIcon from '@icons/40/like-dark.svg';
import likeLightIcon from '@icons/40/like-light.svg';

const closeReportProblemDialog = () => BrowserApi.sendMessage({ type: ExtensionAction.CloseReportProblemDialog });

const Success: FC = () => {
  const { formatMessage } = useIntl();
  const { isDarkTheme } = useAppTheme();

  useEffect(() => {
    setTimeout(closeReportProblemDialog, 3 * SECOND);
  }, []);

  return (
    <div role="presentation" className="flex p-6 bg-primary color-primary-accent-6" onClick={closeReportProblemDialog}>
      <div className="mr-3 flex">
        <span className="rounded-full item-image-32px flex items-center justify-center">
          <Image src={isDarkTheme ? likeDarkIcon : likeLightIcon} noLazy />
        </span>
      </div>
      <div className="w-full text-small">
        <p className="font-bold">{formatMessage({ id: 'thankYouForReportingAProblem' })}</p>
        <p>{formatMessage({ id: 'itWasSentToNordPassDevelopmentTeam' })}</p>
      </div>
    </div>
  );
};

export default Success;
