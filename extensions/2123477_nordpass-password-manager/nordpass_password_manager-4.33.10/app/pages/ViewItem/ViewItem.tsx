import { useContext, useMemo, FC, ReactNode, useEffect } from 'react';
import { useMatch, useParams } from 'react-router-dom-v5-compat';
import { ROUTES } from '@extension/common/constants';
import history from '@extension/app/utils/history';
import { VaultContext, PendingSharesContext } from '@extension/app/context';
import { getIsCreditCard, getIsNote, getIsPassword, getIsPersonalInfo } from '@common/utils/itemTypeGuards';
import SharedWith from '@extension/app/pages/ViewItem/components/SharedWith/SharedWith';
import useVaultItem from '@extension/app/hooks/useVaultItem';
import { IItem } from '@common/interfaces';
import { Platform, ShareStatus } from '@common/constants';
import { ItemAccessAction } from '@common/constants/userAction';
import { api } from '@extension/app/api';
import { noOp } from '@common/constants/function';
import ItemHeader from './ItemHeader';
import PendingItem from './PendingItem';
import ViewPassword from './ViewPassword/ViewPassword';
import ViewNote from './ViewNote';
import ViewCreditCard from './ViewCreditCard';
import ViewPersonalInfo from './ViewPersonalInfo';

interface IItemTypeView {
  item: IItem;
  sharedWith: ReactNode;
}

const ItemTypeView: FC<IItemTypeView> = ({ item, sharedWith }) => {
  const { vaultFolders } = useContext(VaultContext);
  const itemWithFolder = useMemo(() => {
    if (!item.folder_id) return item;
    const folder = vaultFolders.find(folderItem => folderItem.uuid === item.folder_id);
    return { ...item, folder_name: folder?.title };
  }, [item, vaultFolders]);
  if (getIsPassword(itemWithFolder)) {
    return <ViewPassword item={itemWithFolder} sharedWith={sharedWith} />;
  }
  if (getIsNote(itemWithFolder)) {
    return <ViewNote item={itemWithFolder} sharedWith={sharedWith} />;
  }
  if (getIsCreditCard(itemWithFolder)) {
    return <ViewCreditCard item={itemWithFolder} sharedWith={sharedWith} />;
  }
  if (getIsPersonalInfo(itemWithFolder)) {
    return <ViewPersonalInfo item={itemWithFolder} sharedWith={sharedWith} />;
  }

  return null;
};

interface IViewItem {
  selectedUid?: string;
  closeViewItems?: () => void;
}

const ViewItem: FC<IViewItem> = ({ selectedUid, closeViewItems }) => {
  const params = useParams<{ id: string }>();
  const id = selectedUid || params.id;
  const { vaultItems } = useContext(VaultContext);
  const allShares = useContext(PendingSharesContext);

  // useVaultItem does not listen for vault changes, only fetches item data at the moment it was called on.
  // It is needed in cases like trash, where vault data is not available. For all other cases,
  // reactive item data from vaultContext should be used.
  const frozenItemData = useVaultItem(id);
  const isTrashItem = !!useMatch(ROUTES.VIEW_TRASH_ITEM(id));
  const item = useMemo(() => (
    (vaultItems || []).find(i => i.uuid === id) ||
    (allShares || []).find(i => i.uuid === id) ||
    frozenItemData
  ), [allShares, frozenItemData, id, vaultItems]);

  // share status is not included in useEffect because it will be undefined when item is first created
  const isShareStatusNotPending = item?.share_status !== ShareStatus.Pending;

  useEffect(() => {
    if (item?.uuid && isShareStatusNotPending) {
      api.action.saveItemAction(ItemAccessAction.ItemViewed, [item.uuid], Platform.Extension).catch(noOp);
    }
  }, [isShareStatusNotPending, item?.uuid]);

  const close = () => {
    if (closeViewItems) {
      closeViewItems();
    } else {
      history.goBack();
    }
  };

  if (!item) {
    return null;
  }

  if (item.shared && item.share_status === ShareStatus.Pending) {
    return <PendingItem pendingItem={item} onClose={close} />;
  }

  return (
    <div className="h-full flex flex-col page-slide-in bg-primary overflow-y-auto">
      <div className="flex-1 overflow-y-auto">
        <ItemHeader item={item} close={close} isTrash={isTrashItem} />
        <ItemTypeView
          item={item}
          sharedWith={<SharedWith item={item} />}
        />
      </div>
    </div>
  );
};

export default ViewItem;
