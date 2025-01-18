import {
  getIsAllItemsLinkActive,
  getIsSharedActive,
  getIsTrashActive,
  getIsItemLinkActive,
} from '@common/utils/itemLinksActivity';
import { FC, ReactNode, useContext } from 'react';
import { useLocation, Location } from 'react-router-dom-v5-compat';
import { SVG } from '@nord/ui';
import { FormattedMessage } from 'react-intl';
import { ROUTES } from '@extension/common/constants';
import allItemsIcon from '@icons/24/all-items.svg';
import passwordsIcon from '@icons/24/passwords.svg';
import secureNotesIcon from '@icons/24/secure-notes.svg';
import creditCardIcon from '@icons/24/cc.svg';
import personalInfoIcon from '@icons/24/personal-info.svg';
import sharedItemsIcon from '@icons/24/shared-items.svg';
import trashIcon from '@icons/24/trash.svg';
import { PendingSharesContext } from '@extension/app/context';
import { VaultType } from '@common/constants';
import NavLink from '@common/components/NavLink/NavLink';

interface ISidebarItem {
  icon: ReactNode;
  link: string;
  text: ReactNode;
  isActive: ({ location }: { location: Location }) => boolean;
  showPending?: boolean;
}

const sidebarItems: Array<ISidebarItem> = [
  {
    icon: <SVG className="mr-3" src={allItemsIcon} noLazy />,
    link: ROUTES.VAULT,
    text: <FormattedMessage id="allItems" />,
    isActive: ({ location }) => getIsAllItemsLinkActive(location.pathname, location.search),
  },
  {
    icon: <SVG className="mr-3" src={passwordsIcon} noLazy />,
    link: ROUTES.VAULT_TYPE(VaultType.Password),
    text: <FormattedMessage id="passwords" />,
    isActive: ({ location }) => getIsItemLinkActive(location.pathname, location.search, VaultType.Password),
  },
  {
    icon: <SVG className="mr-3" src={secureNotesIcon} noLazy />,
    link: ROUTES.VAULT_TYPE(VaultType.Note),
    text: <FormattedMessage id="secureNotes" />,
    isActive: ({ location }) => getIsItemLinkActive(location.pathname, location.search, VaultType.Note),
  },
  {
    icon: <SVG className="mr-3" src={creditCardIcon} noLazy />,
    link: ROUTES.VAULT_TYPE(VaultType.CreditCard),
    text: <FormattedMessage id="creditCards" />,
    isActive: ({ location }) => getIsItemLinkActive(location.pathname, location.search, VaultType.CreditCard),
  },
  {
    icon: <SVG className="mr-3" src={personalInfoIcon} noLazy />,
    link: ROUTES.VAULT_TYPE(VaultType.PersonalInfo),
    text: <FormattedMessage id="personalInfo" />,
    isActive: ({ location }) => getIsItemLinkActive(location.pathname, location.search, VaultType.PersonalInfo),
  },
  {
    icon: <SVG className="mr-3" src={sharedItemsIcon} noLazy />,
    link: ROUTES.VAULT_TYPE(VaultType.Shared),
    text: <FormattedMessage id="sharedItems" />,
    showPending: true,
    isActive: ({ location }) => getIsSharedActive(location.pathname, location.search),
  },
  {
    icon: <SVG className="mr-3" src={trashIcon} noLazy />,
    link: ROUTES.TRASH,
    text: <FormattedMessage id="trash" />,
    isActive: ({ location }) => getIsTrashActive(location.pathname),
  },
];

interface IItemLinksProps {
  onMenuClose: () => void;
}

export const ItemLinks: FC<IItemLinksProps> = ({ onMenuClose }) => {
  const allShares = useContext(PendingSharesContext);
  const location = useLocation();

  return (
    <>
      <div className="sidebar__group-label px-5 text-grey-dark">
        <FormattedMessage id="categories" />
      </div>
      {sidebarItems.map(({
        icon, link, isActive, text, showPending,
      }) => (
        <NavLink
          key={link}
          to={link}
          onClick={onMenuClose}
          className="pl-6 pr-5 sidebar-category"
          isActive={isActive({ location })}
        >
          <span className="truncate flex items-center">
            {icon}
            {text}
          </span>
          {showPending && allShares && allShares.length > 0 && (
            <span className="badge bg-red ml-2 text-white">{allShares.length}</span>
          )}
        </NavLink>
      ))}
    </>
  );
};
