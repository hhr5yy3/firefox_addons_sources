import { useContext, FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { declineShare, trashSharedItem } from '@extension/app/api/VaultApi';
import ConfirmActionModal from '@extension/app/components/ConfirmAction/ConfirmActionModal';
import { VaultItemModalsContext } from '@extension/app/context/VaultItemModalsContext/VaultItemModalsContext';
import { VaultItemModalType } from '@extension/app/context/VaultItemModalsContext/VaultItemModalsContextContracts';

export const ItemActionModalsHandler: FC = () => {
  const { vaultItemModalData, setVaultItemModalData } = useContext(VaultItemModalsContext);

  const closeModal = () => setVaultItemModalData(null);

  switch (vaultItemModalData?.type) {
    case VaultItemModalType.DeclinePendingShare:
      return (
        <ConfirmActionModal
          onClose={closeModal}
          header={<FormattedMessage id="declineItem" />}
          content={<FormattedMessage id="declineItemDescription" />}
          action={() => declineShare(vaultItemModalData.itemId)}
          actionText={<FormattedMessage id="decline" />}
        />
      );
    case VaultItemModalType.RemoveAccessToSharedItem:
      return (
        <ConfirmActionModal
          onClose={closeModal}
          header={<FormattedMessage id="removeAccessHeader" />}
          content={<FormattedMessage id="removeAccessExplanation" />}
          action={() => declineShare(vaultItemModalData.itemId)}
          actionText={<FormattedMessage id="removeMyAccess" />}
        />
      );
    case VaultItemModalType.MoveToTrash:
      return (
        <ConfirmActionModal
          onClose={closeModal}
          content={<FormattedMessage id="moveSharedItemModalToDescription" />}
          action={() => trashSharedItem(vaultItemModalData.itemId)}
          header={<FormattedMessage id="moveSharedItemToTrashModalDescription" />}
          actionText={<FormattedMessage id="moveToTrash" />}
        />
      );
    default:
      return null;
  }
};
