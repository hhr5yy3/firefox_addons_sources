import { useContext, useMemo } from 'react';
import { IItem } from '@common/interfaces';
import { VaultContext } from '@extension/app/context';
import isItemInSharedFolder from '@common/utils/isItemInSharedFolder/isItemInSharedFolder';

const useIsItemInSharedFolder = (item: IItem): boolean => {
  const { vaultSharedFolders } = useContext(VaultContext);

  return useMemo(
    () => isItemInSharedFolder(item, vaultSharedFolders),
    [item, vaultSharedFolders],
  );
};

export default useIsItemInSharedFolder;
