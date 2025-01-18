import { FC, useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { SortingType, SortingDirection, VaultType } from '@common/constants';
import replaceSlashesWithDashes from '@common/utils/replaceSlashesWithDashes';
import VaultList from '@extension/app/components/VaultList/VaultList';
import useSearchParam from '@extension/app/hooks/useSearchParam';
import { PendingSharesContext, VaultContext } from '@extension/app/context';
import ViewItem from '@extension/app/pages/ViewItem/ViewItem';
import ViewPendingItem from '@extension/app/pages/ViewItem/ViewPendingItem';
import { getIsCreditCard, getIsPassword } from '@common/utils/itemTypeGuards';
import { getUpdatedItemList } from '@common/utils/getUpdatedItemList/getUpdatedItemList';
import { useSorting } from '@extension/app/hooks/useSorting';
import { IItem } from '@common/interfaces';
import FullscreenLoader from '@common/components/FullScreenLoader/FullscreenLoader';
import { logMessage } from '@extension/common/utils/log/logMessage';
import useLoaderLogging from '@common/hooks/useLoaderLogging/useLoaderLogging';
import { Route, Routes } from 'react-router-dom-v5-compat';

const searchVault = (vault: Array<IItem>, query: string) => {
  const escapedQ = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').trim();
  const q = new RegExp(escapedQ, 'i');
  return vault.filter(
    item => q.test(item.title) ||
      (getIsPassword(item) && q.test(item.username)) ||
      (getIsPassword(item) && q.test((item).url)) ||
      (getIsPassword(item) && q.test((item).note)) ||
      (getIsCreditCard(item) && q.test((item).cardholder_name)),
  );
};

const Vault: FC = () => {
  const pendingShares = useContext(PendingSharesContext);
  const { vaultItems, vaultFolders, error, isLoading } = useContext(VaultContext);

  const sorting = useSorting();
  const vaultType = useSearchParam('type') as VaultType;
  const folderId = useSearchParam('folder');
  const query = useSearchParam('query');

  useLoaderLogging(!sorting, logMessage, 'Vault:EmptySorting');
  useLoaderLogging(isLoading, logMessage, 'Vault:isLoading');

  const [items, setItems] = useState<Array<IItem>>([]);
  useEffect(() => {
    let filtered: Array<IItem>;
    if (query) {
      filtered = searchVault(vaultItems, query);
    } else if (vaultType) {
      if (folderId) {
        filtered = vaultItems.filter(i => i.folder_id === folderId);
      } else if (vaultType === VaultType.Shared) {
        filtered = vaultItems.filter(i => i.shared);
      } else if (vaultType === VaultType.Folder) {
        filtered = vaultFolders;
      } else {
        filtered = vaultItems.filter(i => i.type === vaultType as string);
      }
    } else {
      filtered = vaultItems.slice(0);
    }

    if (sorting && sorting.type === SortingType.Recent) {
      filtered.sort(
        (a, b) => (new Date(replaceSlashesWithDashes(b.last_used_at)).getTime()) -
          (new Date(replaceSlashesWithDashes(a.last_used_at)).getTime()),
      );
      if (sorting.direction === SortingDirection.Desc) {
        filtered.reverse();
      }
    } else if (sorting && sorting.type === SortingType.Alpha && sorting.direction === SortingDirection.Asc) {
      filtered.sort(({ title = '' }, b) => title.localeCompare(b.title || ''));
    } else if (sorting && sorting.type === SortingType.Alpha && sorting.direction === SortingDirection.Desc) {
      filtered.sort((a, { title = '' }) => title.localeCompare(a.title || ''));
    }

    if (vaultType === VaultType.Shared && pendingShares.length > 0) {
      filtered = getUpdatedItemList(pendingShares, filtered) as Array<IItem>;
    }

    setItems(prevItems => {
      if (JSON.stringify(prevItems) === JSON.stringify(filtered)) {
        return prevItems;
      }
      return filtered;
    });
  }, [vaultItems, vaultFolders, pendingShares, query, vaultType, folderId, sorting]);

  if (error) {
    return (
      <div className="h-full flex justify-center items-center text-center p-4 color-primary">
        <FormattedMessage id="undefinedError" />
      </div>
    );
  }

  if (isLoading || !sorting) {
    return <FullscreenLoader />;
  }

  return (
    <Routes>
      <Route
        index
        element={
          <VaultList
            items={items}
            vaultType={vaultType}
            query={query}
            sorting={sorting}
          />
        }
      />
      <Route path=":id" element={<ViewItem />} />
      <Route path="pending/:email" element={<ViewPendingItem />} />

    </Routes>
  );
};

export default Vault;
