import { ReactNode, memo, FC } from 'react';
import cx from 'classnames';
import { getIsCreditCard, getIsNote, getIsPassword, getIsPersonalInfo } from '@common/utils/itemTypeGuards';
import { Image } from '@nord/ui';
import { IItem } from '@common/interfaces';
import CreditCardIcon from '@common/components/CreditCardIcon/CreditCardIcon';
import PasswordIcon from '@common/components/PasswordIcon/PasswordIcon';
import { logMessage } from '@extension/common/utils/log/logMessage';
import secureNoteIcon from '@icons/secure-note.svg';
import personalInfoIcon from '@icons/personal-info.svg';

export interface IViewItemsHeader {
  item: IItem;
  sharedWith: ReactNode;
}

interface IItemTypeIcon {
  item: IItem;
}

const ItemTypeIcon: FC<IItemTypeIcon> = ({ item }) => {
  const iconClassName = 'item-image-48px my-2';

  if (getIsPassword(item)) {
    return (
      <PasswordIcon
        logMessage={logMessage}
        title={item.title}
        url={item.url}
        className={cx('text-24px rounded-image-16px item-image-32px', iconClassName)}
        uuid={item.uuid}
      />
    );
  }
  if (getIsNote(item)) {
    return (
      <Image
        className={cx('rounded-2', iconClassName)}
        src={secureNoteIcon}
        alt={item.title}
      />
    );
  }
  if (getIsCreditCard(item)) {
    return (
      <CreditCardIcon
        className={cx(item.card_type && 'rounded-image-16px', iconClassName)}
        type={item.card_type}
      />
    );
  }
  if (getIsPersonalInfo(item)) {
    return (
      <Image
        className={cx('rounded-image-16px', iconClassName)}
        src={personalInfoIcon}
        alt={item.title}
      />
    );
  }

  return null;
};

const ViewItemsHeader: FC<IViewItemsHeader> = ({ item, sharedWith }) => (
  <div className="items-center px-2 pb-4 flex flex-col">
    <ItemTypeIcon item={item} />
    <div className="text-22px line-h-32px text-center w-full font-bolder px-4 break-word color-primary">
      {item.title}
    </div>
    {sharedWith}
  </div>
);

export default memo(ViewItemsHeader);
