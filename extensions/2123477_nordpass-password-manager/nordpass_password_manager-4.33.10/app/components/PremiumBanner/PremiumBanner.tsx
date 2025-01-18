import { CampaignUrl } from '@common/constants/campaignUrl';
import { UserAction } from '@common/constants/userAction';
import { LogLevel } from '@common/services/loggingFactory/contracts';
import { api } from '@extension/app/api';
import { logMessage } from '@extension/common/utils/log/logMessage';
import { openInNewTab } from '@extension/common/utils/openInNewTab';
import cx from 'classnames';
import { useIntl } from 'react-intl';
import SvgIcon from '@common/components/SvgIcon';
import * as CrownIcon from '@icons/48/crown-white.svg';

const PremiumBanner = () => {
  const { formatMessage } = useIntl();
  const handleClick = () => {
    api.user.getTrustedPassUrl(CampaignUrl.CurrentSaleExtension)
      .then(url => openInNewTab(url))
      .catch(error => logMessage(LogLevel.Error, 'PremiumBannerExtension:NordCheckout', error));
    api.action.save(UserAction.PremiumBannerExtension);
  };

  return (
    <a
      role="button"
      className={cx('block overflow-hidden rounded-2 w-343px bg-gradient--velvet')}
      onClick={handleClick}
      tabIndex={0}
    >
      <div className="flex justify-center items-center mt-4 mb-6px">
        <span className="font-bold color-white text-base mr-1">{formatMessage({ id: 'premiumBannerTitle' })}</span>
        <SvgIcon
          className="nordpass-svg color-white"
          src={CrownIcon}
          width={24}
          height={24}
        />
        <span className="font-bold color-white text-base ml-1">{formatMessage({ id: 'premium' })}</span>
      </div>
      <div className="flex justify-center items-center mb-4">
        <span className="color-white text-micro">{formatMessage({ id: 'premiumBannerSubtitle' })}</span>
      </div>
    </a>
  );
};

export default PremiumBanner;
