import { PremiumUpgradeModalSourceType } from '@common/constants/premiumUpgradeModalSource';
import { FC, useCallback, useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Image from '@nord/ui/lib/Image';
import { deleteItem, trashItem } from '@extension/app/api/VaultApi';
import { api } from '@extension/app/api';
import AuthContext from '@extension/app/context/AuthContext';
import Tooltip from '@common/components/Tooltip/Tooltip';
import { FeatureFlag } from '@common/constants/featureFlag';
import { ItemType } from '@common/constants';
import { noOp } from '@common/constants/function';
import { IItem } from '@common/interfaces';
import { ItemActionModalType } from '@common/store/reducers/itemActionModalsReducer/itemActionModalsConstants';
import { VaultItemModalsContext } from '@extension/app/context/VaultItemModalsContext/VaultItemModalsContext';
import { VaultItemModalType } from '@extension/app/context/VaultItemModalsContext/VaultItemModalsContextContracts';
import MenuItem from '@common/components/Menu/MenuItem';
import { UserAction } from '@common/constants/userAction';
import { showFeedback } from '@extension/app/components/VaultList/VaultListUtils';
import { getSameItemsTranslation } from '@common/utils/getItemsTranslation';
import getFolderName from '@common/utils/getFolderName';
import { VaultContext } from '@extension/app/context';
import premiumCrownIcon from '@icons/16/premium-crown.svg';
import useSharedContacts from '@extension/app/hooks/useSharedContacts';
import doesSharesListContainPersonalShare from '@common/utils/doesSharesListContainPersonalShare/doesSharesListContainPersonalShare';
import CommonActionsContainer, { ICommonActionsConfig } from '@common/components/CommonActionsContainer/CommonActionsContainer';
import { useExtensionFeature } from '@extension/app/utils/getIsFeatureEnabled';
import { isFullAccess } from '@extension/app/utils/itemAccessUtils/itemAccessUtils';
import ConfirmAction from '@extension/app/components/ConfirmAction/ConfirmAction';
import { getCurrentSharedFolder } from '@common/utils/getCurrentSharedFolder';
import { getIsOwner } from '@common/utils/getIsOwner';

export interface ICommonContextMenu {
  item: IItem;
  isShareHidden?: boolean;
  isEditHidden?: boolean;
  additionalActionsConfig?: Array<ICommonActionsConfig>;
}

const DEFAULT_ADDITIONAL_ACTIONS: Array<ICommonActionsConfig> = [];

export const CommonContextMenu: FC<ICommonContextMenu> = ({
  item,
  isEditHidden = false,
  isShareHidden = false,
  additionalActionsConfig = DEFAULT_ADDITIONAL_ACTIONS,
}) => {
  const { formatMessage } = useIntl();
  const { vaultFolders, vaultSharedFolders } = useContext(VaultContext);
  const { subscriptionData, email } = useContext(AuthContext);
  const { setVaultItemModalData } = useContext(VaultItemModalsContext);
  const hasPremiumPrivileges = !!(subscriptionData?.isPremium || subscriptionData?.isBusiness);
  const { sharedUsers, isLoading } = useSharedContacts(item);
  const hasPersonalShare = doesSharesListContainPersonalShare(sharedUsers, email);

  const isPasswordItemHistoryEnabled = useExtensionFeature(FeatureFlag.PasswordItemHistory);

  const handlePasswordItemHistoryClick = () => {
    api.action.save(UserAction.PasswordHistoryTap).catch(noOp);
    api.extension.openDesktopApp({ route: 'PASSWORD_HISTORY_ITEM', args: [item.uuid] });
  };

  const removeFromFolder = useCallback(() => api.item.removeFromFolder([item]).then(() => {
    showFeedback(
      <FormattedMessage
        id="itemRemovedFromFolder"
        values={{
          item: getSameItemsTranslation(1, item, formatMessage),
          itemsCount: 1,
          folderName: getFolderName(vaultFolders, item.folder_id),
        }}
      />,
    );
  }), [formatMessage, item, vaultFolders]);

  if (isLoading) {
    return null;
  }

  const sharedFolder = getCurrentSharedFolder(vaultSharedFolders, item.folder_id);
  const isSharedFolderOwner = getIsOwner(sharedFolder);
  const hasFullAccess = isFullAccess(sharedFolder?.acl || item.acl);
  const isMovingToFolderEnabled = sharedFolder ? isSharedFolderOwner : hasPersonalShare || !item.shared;

  const config = [
    additionalActionsConfig,
    [
      {
        isActive: isMovingToFolderEnabled,
        component: () => (
          <MenuItem
            key="move-to-folder"
            onClick={() => {
              api.extension.openDesktopApp({
                modal: {
                  itemId: item.uuid,
                  modalType: ItemActionModalType.MoveToFolder,
                },
              });
            }}
          >
            <FormattedMessage id="moveToFolder" />
          </MenuItem>
        ),
      },
      {
        isActive: !!item.folder_id && !!isMovingToFolderEnabled && !sharedFolder,
        component: () => (
          <MenuItem key="remove-from-folder" onClick={removeFromFolder}>
            <FormattedMessage id="removeFromFolder" />
          </MenuItem>
        ),
      },
    ],
    [

      {
        isActive: hasPersonalShare && item.shared && !item.owner,
        component: () => (
          <MenuItem
            key="remove-my-access"
            colorClassName="text-red hover:bg-primary-accent-3"
            onClick={
              () => setVaultItemModalData({ type: VaultItemModalType.RemoveAccessToSharedItem, itemId: item.uuid })
            }
          >
            <FormattedMessage id="removeMyAccess" />
          </MenuItem>
        ),
      },
      {
        isActive: !isEditHidden && hasFullAccess,
        component: () => (
          <MenuItem key="edit" onClick={() => api.extension.openDesktopApp({ route: 'EDIT_ITEM', args: [item.uuid] })}>
            <FormattedMessage id="edit" />
          </MenuItem>
        ),
      },
      {
        isActive: !isShareHidden && hasFullAccess && !sharedFolder,
        component: () => (
          <MenuItem
            key="premium"
            className="flex items-center"
            onClick={() => {
              api.extension.openDesktopApp(
                hasPremiumPrivileges ? { route: 'SHARE_ITEM', args: [item.uuid] } : { premiumUpgradeModalSource: PremiumUpgradeModalSourceType.Share },
              );
            }}
          >
            <FormattedMessage id="share" />
            {!hasPremiumPrivileges && (
              <>
                <Tooltip id="premium" showOnHover>
                  <FormattedMessage id="premium" />
                </Tooltip>
                <Image
                  src={premiumCrownIcon}
                  className="ml-2"
                  noLazy
                  responsive={false}
                  data-tip-premium
                />
              </>
            )}
          </MenuItem>
        ),
      },
      {
        isActive: isPasswordItemHistoryEnabled && item.owner && !item.deleted_at && item.type === ItemType.Password,
        component: () => (
          <MenuItem
            key="password-history"
            data-testid="password_history"
            onClick={handlePasswordItemHistoryClick}
          >
            <FormattedMessage id="passwordHistory" />
          </MenuItem>
        ),
      },
      {
        isActive: !item.shared && !item.deleted_at && !sharedFolder,
        component: () => (
          <MenuItem
            key="move-to-trash"
            onClick={() => trashItem(item.uuid).then(() => api.extension.closeAutofill())}
          >
            <FormattedMessage id="moveToTrash" />
          </MenuItem>
        ),
      },
      {
        isActive: item.shared && item.owner && !sharedFolder,
        component: () => (
          <MenuItem
            key="move-to-trash"
            colorClassName="text-red hover:bg-primary-accent-3"
            onClick={() => setVaultItemModalData({ type: VaultItemModalType.MoveToTrash, itemId: item.uuid })}
          >
            <FormattedMessage id="moveToTrash" />
          </MenuItem>
        ),
      },
      {
        isActive: isSharedFolderOwner,
        component: () => (
          <MenuItem
            key="delete"
            data-testid="delete"
          >
            <ConfirmAction
              button={({ onClick }) => (
                <span
                  role="button"
                  tabIndex={0}
                  onClick={e => {
                    e.stopPropagation();
                    onClick();
                  }}
                >
                  <FormattedMessage id="delete" />
                </span>
              )}
              header={formatMessage({ id: 'deleteItemModalHeader' })}
              content={formatMessage({ id: 'deleteItemModalContent' })}
              action={async () => {
                await deleteItem(item.uuid);
              }}
              actionText={formatMessage({ id: 'delete' })}
            />
          </MenuItem>
        ),
      },
    ],
  ];

  return (
    <CommonActionsContainer
      config={config}
      noActionsMessage={formatMessage({ id: 'noAvailableActions' })}
    />
  );
};
