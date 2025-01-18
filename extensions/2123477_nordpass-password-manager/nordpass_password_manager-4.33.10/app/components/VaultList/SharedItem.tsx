import { FC, memo } from 'react';
import { Text } from '@nord/ui';
import { FormattedMessage } from 'react-intl';
import { IItem } from '@common/interfaces';
import { ItemType } from '@common/constants';
import ItemMenu from './ItemMenu/ItemMenu';
import { ItemIcons } from './ItemIcons';

interface ISharedItem {
  item: IItem;
  itemsCount?: number;
}

const SharedItem: FC<ISharedItem> = ({
  item, itemsCount = 0,
}) => (
  <>
    <div className="w-third flex flex-1 items-center relative">
      <ItemIcons item={item} />
      <span
        className="bg-red-light rounded-full absolute"
        style={{ width: 11, height: 11, top: -4, left: 26 }}
      />
      <div className="flex-1 min-w-0 px-4 overflow-hidden">
        <Text className="truncate color-primary" variant="body2">
          {
            item.type === ItemType.Unknown ?
              <FormattedMessage id="pendingItems" values={{ items: itemsCount }} /> :
              item.title
          }
        </Text>
        {item.type === ItemType.Unknown && (
          <Text className="truncate color-primary-accent-1" variant="caption">
            {item.uuid}
          </Text>
        )}
      </div>
    </div>
    <div className="vault-item-actions">
      <ItemMenu item={item} />
    </div>
  </>
);

export default memo(SharedItem);
