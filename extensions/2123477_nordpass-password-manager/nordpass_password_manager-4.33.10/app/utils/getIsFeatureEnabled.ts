import { FeatureFlag } from '@common/constants/featureFlag';
import isEqual from 'fast-deep-equal';
import { Storage, ListenerType } from '@extension/common/constants';
import StorageApi from '@extension/browser/storageApi';
import { createListener } from '@extension/app/api/createListener';
import { useEffect, useState } from 'react';

export const getIsFeatureEnabled = async (feature: FeatureFlag): Promise<boolean> => {
  const { features } = await StorageApi.get({ [Storage.Features]: [] });
  return features?.includes(feature) ?? false;
};

export const useExtensionFeature = (feature: FeatureFlag) => {
  const [features, setFeatures] = useState<Array<FeatureFlag>>([]);
  const [isEnabled, setEnabled] = useState(false);

  useEffect(() => {
    const checkStorageFeatures = async () => {
      const { features = [] } = await StorageApi.get<{ features: Array<FeatureFlag> }>({ [Storage.Features]: [] });
      setFeatures(prev => isEqual(features, prev) ? prev : features);
    };

    checkStorageFeatures();
    return createListener(checkStorageFeatures, ListenerType.StorageChange);
  });

  useEffect(() => {
    setEnabled(!!features?.includes(feature));
  }, [features, feature]);

  return isEnabled;
};
