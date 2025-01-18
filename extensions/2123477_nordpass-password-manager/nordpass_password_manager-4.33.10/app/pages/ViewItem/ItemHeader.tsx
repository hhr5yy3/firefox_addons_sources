import { FC, memo, useContext } from 'react';
import { Link, SVG } from '@nord/ui';
import arrowLeftIcon from '@icons/24/arrow-left.svg';
import * as shareIcon from '@icons/24/share.svg';
import * as editIcon from '@icons/24/edit.svg';
import { useIntl } from 'react-intl';
import ActionButton from '@common/components/ActionButton/ActionButton';
import { api } from '@extension/app/api';
import { AuthContext, VaultContext } from '@extension/app/context';
import { isLimitedAccess } from '@extension/app/utils/itemAccessUtils/itemAccessUtils';
import MoreItemViewActions from '@extension/app/pages/ViewItem/components/MoreItemViewActions/MoreItemViewActions';
import TrashItemActions from '@extension/app/components/VaultList/TrashItemActions';
import { IItem } from '@common/interfaces';
import { getCurrentSharedFolder } from '@common/utils/getCurrentSharedFolder';

interface IItemHeader {
  item: IItem;
  close: () => void;
  showMenu?: boolean;
  isTrash?: boolean;
}

const ItemHeader: FC<IItemHeader> = ({ item, close, showMenu = true, isTrash = false }) => {
  const { subscriptionData } = useContext(AuthContext);
  const { vaultSharedFolders } = useContext(VaultContext);
  const { formatMessage } = useIntl();

  const hasPremiumPrivileges = !!(subscriptionData?.isPremium || subscriptionData?.isBusiness);
  const isInSharedFolder = !!getCurrentSharedFolder(vaultSharedFolders, item.folder_id);

  return (
    <div className="py-10px px-4 flex justify-between">
      <Link onClick={close} className="flex items-center color-primary-accent-1 hover:color-primary-accent-13">
        <SVG src={arrowLeftIcon} noLazy />
      </Link>

      {showMenu && (
        isTrash ? <TrashItemActions item={item} shouldGoBack /> : (
          <div className="flex self-end">
            <ActionButton
              className="mr-2"
              tooltipText={isLimitedAccess(item.acl) ? formatMessage({ id: 'limitedRightsMessage' }) : formatMessage({ id: 'edit' })}
              tooltipId="edit"
              data-testid="edit"
              disabled={isLimitedAccess(item.acl)}
              svgIcon={editIcon}
              onClick={() => api.extension.openDesktopApp({ route: 'EDIT_ITEM', args: [item.uuid] })}
            />

            {hasPremiumPrivileges && !isInSharedFolder && (
              <ActionButton
                className="mr-2"
                tooltipText={isLimitedAccess(item.acl) ? formatMessage({ id: 'limitedRightsMessage' }) : formatMessage({ id: 'share' })}
                disabled={isLimitedAccess(item.acl)}
                tooltipId="share"
                data-testid="share"
                svgIcon={shareIcon}
                onClick={() => api.extension.openDesktopApp({ route: 'SHARE_ITEM', args: [item.uuid] })}
              />
            )}

            <MoreItemViewActions item={item} />
          </div>
        )
      )}

    </div>
  );
};

export default memo(ItemHeader);
