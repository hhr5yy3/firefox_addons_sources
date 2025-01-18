import { useCallback, useContext } from 'react';
import { AuthContext, VaultContext } from '@extension/app/context';
import { api } from '@extension/app/api';
import { IItem } from '@common/interfaces';
import { ISharedUser, TFolderItem } from '@common/contracts/contracts';
import useQuery from '@common/hooks/useQuery/useQuery';
import { FeatureFlag } from '@common/constants/featureFlag';
import fetchAndMapItemShares from '@common/utils/vaultUtils/fetchAndMapItemShares/fetchAndMapItemShares';
import { useExtensionFeature } from '../utils/getIsFeatureEnabled';

const INITIAL_SHARED_CONTACTS = {
  sharedUsers: [] as Array<ISharedUser>,
  sharedGroups: [] as Array<IItem>,
};

const useSharedContacts = (item: IItem | TFolderItem) => {
  const { vaultGroups } = useContext(VaultContext);
  const { email: currentUserEmail } = useContext(AuthContext);
  const isSharedFoldersV2Enabled = useExtensionFeature(FeatureFlag.SharedFoldersV2);

  const getSharedUsers = useCallback(async () =>
    fetchAndMapItemShares({
      item,
      isSharedFoldersV2Enabled,
      vaultGroups,
      currentUserEmail,
      fetchShares: api.share.fetchShares,
    }),
  [item, isSharedFoldersV2Enabled, vaultGroups, currentUserEmail]);

  const { data, isLoading, errorMessage } = useQuery(getSharedUsers);

  const { sharedUsers, sharedGroups } = data || INITIAL_SHARED_CONTACTS;

  return {
    isLoading,
    errorMessage,
    sharedUsers,
    sharedGroups,
  };
};

export default useSharedContacts;
