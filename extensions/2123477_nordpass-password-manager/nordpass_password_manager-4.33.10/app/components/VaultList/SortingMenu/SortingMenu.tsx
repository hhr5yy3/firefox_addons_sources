import { FC, memo } from 'react';
import { Storage } from '@extension/common/constants';
import { SortingType, SortingDirection } from '@common/constants';
import { IVaultSorting } from '@common/store/reducers/vaultReducer/vaultConstants';
import StorageApi from '@extension/browser/storageApi';
import { useIntl } from 'react-intl';
import { Link, SVG, Text } from '@nord/ui';
import cx from 'classnames';
import tickIcon from '@icons/tick.svg';
import chevronDownIcon from '@icons/chevron-down.svg';
import Menu from '@common/components/Menu/Menu';
import MenuItem from '@common/components/Menu/MenuItem';
import { useMenuState } from '@common/components/Menu/useMenuState';

import './SortingMenu.scss';

interface ISortingMenu {
  sorting: IVaultSorting;
}

const setSorting = (type: SortingType, direction: SortingDirection) => {
  StorageApi.set({ [Storage.VaultSorting]: { type, direction } });
};

const TickIcon: FC<{ className: string }> = ({ className }) => (
  <SVG
    width={10}
    height={10}
    src={tickIcon}
    className={className}
  />
);

export const SortingMenu: FC<ISortingMenu> = memo(({ sorting }) => {
  const { formatMessage } = useIntl();
  const { isOpen, toggleOpen, close } = useMenuState();

  return (
    <Menu
      isOpen={isOpen}
      onClose={close}
      skidding={-44}
      isCloseOnItemClickDisabled
      button={
        <Link colorClassName="hover:text-black" className="formatted-link flex items-center" onClick={toggleOpen}>
          <Text variant="caption" className="font-medium inline-block color-primary">
            {sorting.type === SortingType.Recent ? formatMessage({ id: 'lastUsed' }) : formatMessage({ id: 'title' })}
          </Text>
          {(sorting.type === SortingType.Recent || sorting.type === SortingType.Alpha) && (
            <SVG
              src={chevronDownIcon}
              className={cx(
                'nordpass-svg inline-block relative color-primary',
                sorting.direction === SortingDirection.Desc && 'rotate-180',
              )}
            />
          )}
        </Link>
      }
    >
      <div className="sorting-column-menu">
        <Text className="font-medium uppercase py-1 px-3 text-grey" variant="overline">
          {formatMessage({ id: 'sortingOrder' })}
        </Text>

        <MenuItem onClick={() => setSorting(sorting.type, SortingDirection.Asc)}>
          <Text className="font-medium flex items-center" variant="caption">
            <TickIcon
              className={cx(
                'sorting-tick pointer-events-none',
                sorting.direction === SortingDirection.Asc ? 'opacity-100' : 'opacity-0',
              )}
            />
            {formatMessage({ id: 'ascending' })}
          </Text>
        </MenuItem>

        <MenuItem onClick={() => setSorting(sorting.type, SortingDirection.Desc)}>
          <Text className="font-medium flex items-center" variant="caption">
            <TickIcon
              className={cx(
                'sorting-tick pointer-events-none',
                sorting.direction === SortingDirection.Desc ? 'opacity-100' : 'opacity-0',
              )}
            />
            {formatMessage({ id: 'descending' })}
          </Text>
        </MenuItem>

        <div className="border-t border-primary-accent-1 divider" />

        <Text className="font-medium uppercase py-1 px-3 text-grey" variant="overline">
          {formatMessage({ id: 'sortBy' })}
        </Text>

        <MenuItem onClick={() => setSorting(SortingType.Alpha, sorting.direction)}>
          <Text className="font-medium flex items-center" variant="caption">
            <TickIcon
              className={cx(
                'sorting-tick pointer-events-none',
                sorting.type === SortingType.Alpha ? 'opacity-100' : 'opacity-0',
              )}
            />
            {formatMessage({ id: 'title' })}
          </Text>
        </MenuItem>

        <MenuItem onClick={() => setSorting(SortingType.Recent, sorting.direction)}>
          <Text className="font-medium flex items-center" variant="caption">
            <TickIcon
              className={cx(
                'sorting-tick pointer-events-none',
                sorting.type === SortingType.Recent ? 'opacity-100' : 'opacity-0',
              )}
            />
            {formatMessage({ id: 'lastUsed' })}
          </Text>
        </MenuItem>
      </div>
    </Menu>
  );
});
