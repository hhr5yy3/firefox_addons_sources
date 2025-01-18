import { TitlePicker } from '@common/components/TitlePicker/TitlePicker';
import { logMessage } from '@extension/common/utils/log/logMessage';
import { FC, memo } from 'react';
import { useIntl } from 'react-intl';
import { openInNewTab } from '@extension/common/utils/openInNewTab';
import * as launchIcon from '@icons/24/launch.svg';
import TrashItemActions from '@extension/app/components/VaultList/TrashItemActions';
import { IItemTypeProps } from '@extension/app/components/VaultList/VaultList';
import ActionButton from '@common/components/ActionButton/ActionButton';
import { IPasswordItem } from '@common/contracts/contracts';
import ItemMenu from './ItemMenu/ItemMenu';

const Password: FC<IItemTypeProps<IPasswordItem>> = ({ item, isTrash }) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <div className="w-third flex flex-1 items-center overflow-hidden">
        <TitlePicker item={item} shouldShowShareIndication logMessage={logMessage} />
      </div>
      <div className="vault-item-actions flex">
        {isTrash ? (
          <TrashItemActions item={item} />
        ) : (
          <>
            {item.url && (
              <ActionButton
                className="mr-2 inline-block"
                tooltipText={formatMessage({ id: 'launchWebsite' })}
                tooltipId={`launch-${item.uuid}`}
                svgIcon={launchIcon}
                onClick={() => openInNewTab(
                  item.url.startsWith('http') ? item.url : `https://${item.url}`,
                  true,
                )}
              />
            )}
            <ItemMenu item={item} />
          </>
        )}
      </div>
    </>
  );
};

export default memo(Password);
