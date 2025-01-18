import { getIsAllItemsLinkActive } from '@common/utils/itemLinksActivity';
import { FC, useCallback, memo } from 'react';
import ReactList from 'react-list';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';
import { IItem } from '@common/interfaces';
import { IVaultSorting } from '@common/store/reducers/vaultReducer/vaultConstants';
import { FeatureFlag } from '@common/constants/featureFlag';
import { CURRENT_SALE_END_DATE, VaultType } from '@common/constants';
import StarRating from '@extension/app/components/StarRating/StarRating';
import SaleBanner from '@extension/app/components/SaleBanner/SaleBanner';
import PremiumBanner from '@extension/app/components/PremiumBanner/PremiumBanner';
import { useUserStatus } from '@extension/app/hooks/useUserStatus';
import { useExtensionFeature } from '@extension/app/utils/getIsFeatureEnabled';
import history from '@extension/app/utils/history';
import EmptyVault from './EmptyVault';
import SuggestedItems from './SuggestedItems/SuggestedItems';
import { SortingMenu } from './SortingMenu/SortingMenu';
import Item from './Item/Item';
import { getItemHeight } from './VaultListUtils';
import VaultItemContextProvider from './VaultItemContext';

import './index.scss';

const itemsRenderer = (items: Array<JSX.Element>, ref: string) => <ul ref={ref}>{items}</ul>;

interface IVaultListProps {
  items: Array<IItem>;
  query: string;
  vaultType: VaultType;
  sorting: IVaultSorting;
  isTrash?: boolean;
}

export interface IItemTypeProps<TItemType> {
  item: TItemType;
  isTrash: boolean;
}

const VaultList: FC<IVaultListProps> = ({ items, query, vaultType, sorting, isTrash = false }) => {
  const { type: sortingType } = sorting;
  // TODO: on return from item scrollTo that item
  const listItem = useCallback(
    index => (
      <VaultItemContextProvider key={items[index].uuid}>
        <Item
          items={items}
          index={index}
          itemsCount={items.length}
          query={query}
          sortingType={sortingType}
          isTrash={isTrash}
        />
      </VaultItemContextProvider>
    ),
    [isTrash, items, query, sortingType],
  );

  const { pathname, search } = history.location;
  const isInAllItems = getIsAllItemsLinkActive(pathname, search);
  const isSaleEnabled = useExtensionFeature(FeatureFlag.CyberSale2022Extension);
  const isSaleBannerVisible = isSaleEnabled && Date.now() <= CURRENT_SALE_END_DATE.getTime();
  const { isFreeUser } = useUserStatus();

  const itemSizeGetter = useCallback(
    index => getItemHeight(items, index, query ? undefined : sortingType),
    [items, query, sortingType],
  );

  return (
    <>
      <StarRating vaultItemsLength={items.length} />

      {(items.length > 0 && isFreeUser && isInAllItems) && (
        <div className="relative px-4 pb-4">
          { isSaleBannerVisible ? <SaleBanner /> : <PremiumBanner /> }
        </div>
      )}

      <div
        className={cx(
          'vault flex-1 relative bg-primary',
          !items.length && 'h-full flex justify-center',
        )}
      >
        {items.length ? (
          <>
            {!query && !isTrash && <SuggestedItems items={items} />}
            <div className="flex px-4">
              <span className="text-micro mr-1 truncate color-primary-accent-1">
                {query ? (
                  <span className="truncate">
                    <FormattedMessage id="searchResultsFor" />
                    <span className="color-primary ml-1">{`"${query}"`}</span>
                  </span>
                ) : (
                  <FormattedMessage id="sortBy" />
                )}
              </span>
              {!query && <SortingMenu sorting={sorting} />}
            </div>
            <div className="pb-16">
              <ReactList
                itemRenderer={listItem}
                itemsRenderer={itemsRenderer}
                itemSizeGetter={itemSizeGetter}
                length={items.length}
                type="variable"
                minSize={6}
              />
            </div>
          </>
        ) : (
          <EmptyVault type={vaultType} search={query} />
        )}
      </div>
    </>
  );
};

export default memo(VaultList);
