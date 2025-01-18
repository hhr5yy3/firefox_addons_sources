import { useEffect, useState } from 'react';
import { FeatureFlag } from '@common/constants/featureFlag';
import { getIsFeatureEnabled } from '@extension/app/utils/getIsFeatureEnabled';
import { OrganizationTier } from '@common/constants/organization';
import { useOrganizationContext } from '../context/OrganizationContext';

const useIsSharedFoldersEnabled = () => {
  const { organizationData } = useOrganizationContext();
  const [isSharedFoldersEnabled, setIsSharedFoldersEnabled] = useState(false);

  useEffect(() => {
    getIsFeatureEnabled(FeatureFlag.SharedFolders)
      .then(isEnabledForUser => setIsSharedFoldersEnabled(isEnabled => isEnabled || isEnabledForUser));

    getIsFeatureEnabled(FeatureFlag.OrganizationSharedFolders)
      .then(isEnabledForOrganization => setIsSharedFoldersEnabled(isEnabled => isEnabled || isEnabledForOrganization));
  }, []);

  return organizationData?.organization?.tier === OrganizationTier.Enterprise && isSharedFoldersEnabled;
};

export default useIsSharedFoldersEnabled;
