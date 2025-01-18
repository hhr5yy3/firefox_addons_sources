import { memo, FC } from 'react';
import { Link, Text, Image } from '@nord/ui';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';
import './OfflineModeIndicator.scss';
import { api } from '@extension/app/api';
import useOnlineStatus from '@extension/app/hooks/useOnlineStatus';
import offlineIcon from '@icons/16/offline.svg';
import onlineIcon from '@icons/16/online.svg';

interface IOfflineModeIndicatorProps {
  isBusiness: boolean;
}

const OfflineModeIndicator: FC<IOfflineModeIndicatorProps> = ({ isBusiness }) => {
  const { isOnline, isBackOnline } = useOnlineStatus();

  if (
    isOnline === null ||
    (isOnline && !isBackOnline) ||
    (!isOnline && isBusiness)
  ) {
    return null;
  }

  const modeIcon = isOnline ? (
    <Image
      src={onlineIcon}
      className="mr-2"
      data-testid="online-icon"
      noLazy
      responsive={false}
    />
  ) : (
    <Image
      src={offlineIcon}
      className="mr-2"
      data-testid="offline-icon"
      noLazy
      responsive={false}
    />
  );
  const modeText = isOnline ? <FormattedMessage id="youAreBackOnline" /> : <FormattedMessage id="youAreOffline" />;

  return (
    <div className={cx('mode-indicator text-white sticky py-3 alert-fade-in w-full flex items-center justify-center z-9999', isOnline ? 'mode-indicator--online' : 'bg-black')} data-testid="offline-indicator">
      {modeIcon}
      <Text variant="caption">
        {modeText}
      </Text>
      {!isOnline && (
        <Link
          className="text-micro underline ml-1"
          colorClassName="text-white hover:text-grey"
          data-testid="refresh-button"
          onClick={api.app.checkOnlineStatus}
        >
          <FormattedMessage id="refresh" />
        </Link>
      )}
    </div>
  );
};

export default memo(OfflineModeIndicator);
