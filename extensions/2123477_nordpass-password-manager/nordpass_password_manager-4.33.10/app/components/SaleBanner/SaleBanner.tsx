import { Countdown } from '@common/components/Countdown/Countdown';
import { CURRENT_SALE_END_DATE } from '@common/constants';
import { CampaignUrl } from '@common/constants/campaignUrl';
import { CURRENT_SALE_DISCOUNT_PERCENTAGE } from '@common/constants/sale';
import { Size } from '@common/constants/size';
import { UserAction } from '@common/constants/userAction';
import { LogLevel } from '@common/services/loggingFactory/contracts';
import { api } from '@extension/app/api';
import { logMessage } from '@extension/common/utils/log/logMessage';
import { openInNewTab } from '@extension/common/utils/openInNewTab';
import cx from 'classnames';
import { useIntl } from 'react-intl';

import styles from './SaleBanner.module.scss';

const SaleBanner = () => {
  const { formatMessage } = useIntl();
  const handleClick = () => {
    api.user.getTrustedPassUrl(CampaignUrl.CurrentSaleExtension)
      .then(url => openInNewTab(url))
      .catch(error => logMessage(LogLevel.Error, 'PremiumSaleBannerExtension:NordCheckout', error));
    api.action.save(UserAction.PremiumSaleBannerExtension);
  };

  return (
    <a
      role="button"
      className={cx('block overflow-hidden rounded-2 w-343px', styles.banner)}
      onClick={handleClick}
      tabIndex={0}
    >
      <div className={cx('flex justify-center items-center transition-all duration-250 ease-in-out', styles.banner__header)}>
        <span className="text-micro font-bold">{formatMessage({ id: 'getPremiumOff' }, { percent: CURRENT_SALE_DISCOUNT_PERCENTAGE })}</span>
      </div>
      <div className={cx('flex justify-center items-center transition-all duration-250 ease-in-out', styles.banner__body)}>
        <Countdown endDateTime={CURRENT_SALE_END_DATE} size={Size.Medium} />
      </div>
    </a>
  );
};

export default SaleBanner;
