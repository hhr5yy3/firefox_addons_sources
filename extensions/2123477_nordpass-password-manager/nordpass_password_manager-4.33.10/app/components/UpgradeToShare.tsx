import { FC } from 'react';
import { Button, Image } from '@nord/ui';
import { FormattedMessage } from 'react-intl';
import { api } from '@extension/app/api';
import { openInNewTab } from '@extension/common/utils/openInNewTab';
import { logMessage } from '@extension/common/utils/log/logMessage';
import premiumIcon from '@icons/72/premium.svg';
import { LogLevel } from '@common/services/loggingFactory/contracts';
import { CampaignUrl } from '@common/constants/campaignUrl';

const UpgradeToShare: FC = () => {
  const handleClick = () => {
    api.user.getTrustedPassUrl(CampaignUrl.UpgradeButton)
      .then(url => openInNewTab(url))
      .catch(error => logMessage(LogLevel.Error, 'UpgradeToShare:NordCheckout', error));
  };

  return (
    <div className="p-9 pt-20 text-center text-grey-dark max-w-650">
      <div className="flex justify-center items-center mb-3">
        <Image src={premiumIcon} />
      </div>
      <span className="color-primary my-4 text-lead font-bold">
        <FormattedMessage id="upgradeToShareTitle" />
      </span>

      <span className="mb-4 px-2 -letter-spacing-014 color-primary-accent-1 text-small inline-block">
        <FormattedMessage id="upgradeToShareText" />
      </span>

      <Button
        color="teal"
        size="small"
        className="mb-2 rounded-full w-full"
        onClick={handleClick}
      >
        <FormattedMessage id="getPremium" />
      </Button>
    </div>
  );
};

export default UpgradeToShare;
