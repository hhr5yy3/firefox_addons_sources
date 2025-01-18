import useSearchParam from '@extension/app/hooks/useSearchParam';
import { useContext, memo, FC } from 'react';
import { FormattedMessage } from 'react-intl';
import * as plusIcon from '@icons/24/plus.svg';
import { Button } from '@nord/ui';
import * as passwordsIcon from '@icons/24/passwords.svg';
import * as secureNotesIcon from '@icons/24/secure-notes.svg';
import * as creditCardIcon from '@icons/24/cc.svg';
import * as personalInfoIcon from '@icons/24/personal-info.svg';
import { ExtensionContext } from '@extension/app/context/ExtensionContext';
import SvgIcon from '@common/components/SvgIcon';
import { api } from '@extension/app/api';
import Menu from '@common/components/Menu/Menu';
import MenuItem from '@common/components/Menu/MenuItem';
import { ItemType } from '@common/constants';
import { useMenuState } from '@common/components/Menu/useMenuState';

import './AddMenu.scss';

const menuItems = [
  {
    type: ItemType.Password,
    title: <FormattedMessage id="password" />,
    icon: passwordsIcon,
  },
  {
    type: ItemType.Note,
    title: <FormattedMessage id="secureNote" />,
    icon: secureNotesIcon,
  },
  {
    type: ItemType.CreditCard,
    title: <FormattedMessage id="creditCard" />,
    icon: creditCardIcon,
  },
  {
    type: ItemType.PersonalInfo,
    title: <FormattedMessage id="personalInfo" />,
    icon: personalInfoIcon,
  },
];

interface IAddMenuProps {
  isButtonWithText?: boolean;
}

export const AddMenu: FC<IAddMenuProps> = memo(({ isButtonWithText }) => {
  const { domain } = useContext(ExtensionContext);
  const { isOpen, close, toggleOpen } = useMenuState();
  const folderId = useSearchParam('folder');
  const isFolderView = !!folderId;

  return (
    <Menu
      isOpen={isOpen}
      onClose={close}
      button={
        isButtonWithText ? (
          <Button
            size="small"
            variant="outlined"
            className="block rounded-full -letter-spacing-014px w-full"
            onClick={toggleOpen}
          >
            <FormattedMessage id="addItem" />
          </Button>
        ) : (
          <button
            type="button"
            className="add-item-button bg-primary-accent-17"
            onClick={toggleOpen}
          >
            <SvgIcon
              src={plusIcon}
              className="nordpass-svg color-primary-accent-12"
              width={24}
              height={24}
            />
          </button>
        )
      }
    >
      {menuItems.map(({ type, title, icon }) => (
        <MenuItem
          key={type}
          onClick={() => {
            api.extension.openDesktopApp({
              route: 'ADD_ITEM',
              args: isFolderView ? [type, `folder=${folderId}`] : [type],
              url: domain,
            });
          }}
        >
          <span className="flex flex-1 items-center">
            <SvgIcon
              src={icon}
              className="nordpass-svg mr-3 icon-primary"
              width={24}
              height={24}
            />
            {title}
          </span>
        </MenuItem>
      ))}
    </Menu>
  );
});
