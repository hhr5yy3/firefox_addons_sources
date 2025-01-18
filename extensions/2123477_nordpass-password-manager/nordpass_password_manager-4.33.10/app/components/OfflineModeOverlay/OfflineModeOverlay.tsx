import { memo, FC, useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, SVG } from '@nord/ui';
import connectionIcon from '@icons/64/connection.svg';
import { logout } from '@extension/app/api/authApi';
import { AuthContext } from '@extension/app/context';
import { getIsFeatureEnabled } from '@extension/app/utils/getIsFeatureEnabled';
import { FeatureFlag } from '@common/constants/featureFlag';
import BrowserApi from '@extension/browser/browserApi';
import { ExtensionAction } from '@common/constants/action';
import { api } from '@extension/app/api';
import { Metric, MetricType } from '@common/constants/metrics';
import { sendMetric } from '@common/utils/sendMetric';

const OfflineModeOverlay: FC = () => {
  const { email } = useContext(AuthContext);

  const handleLogout = async () => {
    sendMetric(api, Metric.Logout, MetricType.Intent);
    const isSwitchAccountEnabled = await getIsFeatureEnabled(FeatureFlag.SwitchAccount);
    if (isSwitchAccountEnabled) {
      BrowserApi.sendMessage({ type: ExtensionAction.ExtensionLogoutAll });
    } else {
      logout();
    }
  };

  return (
    <div className="flex flex-1 justify-center items-center flex-col text-center px-4 color-primary">
      <div className="flex justify-center flex-col items-center flex-1">
        <SVG
          src={connectionIcon}
          width={64}
          height={64}
          className="mb-4"
        />
        <p className="text-h2 font-bold mb-1"><FormattedMessage id="offlineScreenYouAreOffline" /></p>
        <p><FormattedMessage id="offlineScreenYouAreOfflineDescription" /></p>
      </div>
      <div className="my-8 flex justify-center items-center flex-col text-base">
        <p className="break-word truncate-2-lines"><FormattedMessage id="loggedInWith" />{` ${email}`}</p>
        <Link className="text-teal hover:color-teal" onClick={handleLogout}>
          <FormattedMessage id="logOut" />
        </Link>
      </div>
    </div>
  );
};

export default memo(OfflineModeOverlay);
