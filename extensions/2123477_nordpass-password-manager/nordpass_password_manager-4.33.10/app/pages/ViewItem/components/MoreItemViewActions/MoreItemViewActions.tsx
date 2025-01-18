import { FC } from 'react';
import { Button } from '@nord/ui';
import { IItem } from '@common/interfaces';

import * as moreIcon from '@icons/24/more.svg';
import { CommonContextMenu } from '@extension/app/components/VaultList/ItemMenu/components/CommonContextMenu';
import Menu from '@common/components/Menu/Menu';
import { useMenuState } from '@common/components/Menu/useMenuState';
import SvgIcon from '@common/components/SvgIcon';

interface IMoreItemViewActions {
  item: IItem;
}

const MoreItemViewActions: FC<IMoreItemViewActions> = ({ item }) => {
  const { isOpen, close, toggleOpen } = useMenuState();

  return (
    <Menu
      isOpen={isOpen}
      onClose={close}
      button={
        <Button
          className="square p-0 rounded-full inline-flex justify-center items-center bg-primary border-primary-accent-4 hover:border-primary-accent-4 color-primary-accent-6"
          size="small"
          variant="outlined"
          onClick={toggleOpen}
        >
          <SvgIcon
            src={moreIcon}
            width={24}
            height={24}
          />
        </Button>
      }
    >
      <CommonContextMenu
        item={item}
        isEditHidden
        isShareHidden
      />
    </Menu>
  );
};

export default MoreItemViewActions;
