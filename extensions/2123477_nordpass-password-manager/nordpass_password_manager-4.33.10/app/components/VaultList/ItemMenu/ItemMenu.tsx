import { FC, memo, useContext, useEffect } from 'react';
import { Button, SVG } from '@nord/ui';
import { getIsCreditCard, getIsNote, getIsPassword, getIsPersonalInfo } from '@common/utils/itemTypeGuards';
import moreIcon from '@icons/24/more.svg';
import { IItem } from '@common/interfaces';
import { ShareStatus } from '@common/constants';
import Menu from '@common/components/Menu/Menu';
import { useMenuState } from '@common/components/Menu/useMenuState';
import PasswordContextMenu from './components/PasswordContextMenu';
import CreditCardContextMenu from './components/CreditCardContextMenu';
import NoteContextMenu from './components/NoteContextMenu';
import PersonalInfoContextMenu from './components/PersonalInfoContextMenu';
import PendingContextMenu from './components/PendingContextMenu';
import { VaultItemContext } from '../VaultItemContext';

interface IItemMenuProps {
  item: IItem;
}

const ContextMenu: FC<IItemMenuProps> = ({ item }) => {
  if (item.share_status === ShareStatus.Pending) {
    return <PendingContextMenu item={item} />;
  }

  if (getIsPassword(item)) {
    return <PasswordContextMenu item={item} />;
  }
  if (getIsCreditCard(item)) {
    return <CreditCardContextMenu item={item} />;
  }
  if (getIsNote(item)) {
    return <NoteContextMenu item={item} />;
  }
  if (getIsPersonalInfo(item)) {
    return <PersonalInfoContextMenu item={item} />;
  }
  return null;
};

const ItemMenu: FC<IItemMenuProps> = ({ item }) => {
  const { setIsContextOpen } = useContext(VaultItemContext);
  const { isOpen, close, toggleOpen } = useMenuState();

  useEffect(() => setIsContextOpen(isOpen), [isOpen, setIsContextOpen]);

  return (
    <Menu
      isOpen={isOpen}
      onClose={close}
      button={
        <Button
          className="inline-flex square p-0 rounded-full justify-center items-center bg-primary border-primary-accent-4 hover:border-primary-accent-4"
          size="small"
          variant="outlined"
          onClick={toggleOpen}
        >
          <SVG src={moreIcon} className="color-primary-accent-6" noLazy />
        </Button>
      }
    >
      <ContextMenu item={item} />
    </Menu>
  );
};

export default memo(ItemMenu);
