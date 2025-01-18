import { OpenDirection } from '@common/components/Tooltip/constants/openDirection';
import Tooltip from '@common/components/Tooltip/Tooltip';
import { VaultType } from '@common/constants';
import { FeatureFlag } from '@common/constants/featureFlag';
import { Size } from '@common/constants/size';
import { TFolderItem } from '@common/contracts/contracts';
import useQuery from '@common/hooks/useQuery/useQuery';
import { api } from '@extension/app/api';
import { Avatar } from '@extension/app/components/Avatar/Avatar';
import { HeaderText } from '@extension/app/components/Header/components/HeaderText/HeaderText';
import { VaultContext } from '@extension/app/context';
import { useAvatar } from '@extension/app/hooks/useAvatar';
import useSearchParam from '@extension/app/hooks/useSearchParam';
import { closePopup } from '@extension/app/utils/closePopup';
import { getIsFeatureEnabled } from '@extension/app/utils/getIsFeatureEnabled';
import history from '@extension/app/utils/history';
import { ROUTES } from '@extension/common/constants';

import lockIcon from '@icons/24/lock-ext.svg';
import menuIcon from '@icons/24/menu.svg';
import openAppIcon from '@icons/open-app-icon.svg';
import settingsIcon from '@icons/24/settings-ext.svg';
import toolsIcon from '@icons/24/tools.svg';
import { Link, SVG } from '@nord/ui';
import { FC, useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useMatch } from 'react-router-dom-v5-compat';

interface IHeaderMenuProps {
  onMenuOpen: () => void;
}

const HeaderMenu: FC<IHeaderMenuProps> = ({ onMenuOpen }) => {
  const [isSwitchAccountEnabled, setIsSwitchAccountEnabled] = useState(false);
  const { data: email = '' } = useQuery(api.extension.getUserEmail);
  const vaultType = useSearchParam('type');
  const isTrash = !!useMatch(ROUTES.TRASH);
  const folderId = useSearchParam('folder');
  const { vaultFolders } = useContext(VaultContext);
  const folderTitle = vaultFolders.find((folder: TFolderItem) => folder.uuid === folderId)?.title;
  const avatar = useAvatar();

  const onClickOpenApp = () => {
    api.extension.openDesktopApp();
    closePopup({ legacySafariPopupClose: api.extension.closePopup });
  };

  const onClickSettings = () => {
    api.extension.openDesktopApp({ route: 'SETTINGS' });
    closePopup({ legacySafariPopupClose: api.extension.closePopup });
  };

  const onClickTools = () => {
    history.push(ROUTES.TOOLS);
  };

  const handleProfileIconClick = () => {
    history.push(ROUTES.PROFILE);
  };

  useEffect(() => {
    getIsFeatureEnabled(FeatureFlag.SwitchAccount).then(setIsSwitchAccountEnabled);
  }, []);

  return (
    <div className="header__menu w-full flex items-center">
      <Link
        onClick={onMenuOpen}
        className="inline-flex menu-button"
        colorClassName="color-primary-accent-1 hover:color-primary-accent-13"
      >
        <SVG src={menuIcon} noLazy />
      </Link>
      <h3 className="color-primary text-lead font-bolder truncate">
        <HeaderText vaultType={isTrash ? VaultType.Trash : vaultType} folderTitle={folderTitle} />
      </h3>
      <div className="flex ml-auto">
        {process.env.HAS_OPEN_APP_EXTENSION_LINK && (
          <>
            <Tooltip id="view-in-tab" showOnHover>
              <FormattedMessage id="viewInExtensionTab" />
            </Tooltip>
            <Link
              onClick={onClickOpenApp}
              className="inline-flex mr-2"
              colorClassName="color-primary-accent-1 hover:color-primary-accent-13"
              data-tip-view-in-tab
            >
              <SVG
                src={openAppIcon}
                width={24}
                height={24}
                noLazy
              />
            </Link>
          </>
        )}
        <Tooltip id="settings" showOnHover>
          <FormattedMessage id="settings" />
        </Tooltip>
        <Link
          onClick={onClickSettings}
          className="inline-flex mr-2"
          colorClassName="color-primary-accent-1 hover:color-primary-accent-13"
          data-tip-settings
        >
          <SVG src={settingsIcon} noLazy />
        </Link>
        <Tooltip id="tools" showOnHover>
          <FormattedMessage id="tools" />
        </Tooltip>
        <Link
          onClick={onClickTools}
          className="inline-flex"
          colorClassName="color-primary-accent-1 hover:color-primary-accent-13"
          data-tip-tools
        >
          <SVG src={toolsIcon} noLazy />
        </Link>
        {isSwitchAccountEnabled ? (
          <>
            <Tooltip id="profile" showOnHover direction={OpenDirection.BottomRight}>
              {email}
            </Tooltip>
            <button
              data-testid="header-menu-profile-icon"
              type="button"
              onClick={handleProfileIconClick}
              className="relative inline-flex ml-2 justify-center"
              data-tip-profile
            >
              <Avatar
                avatar={avatar}
                email={email}
                size={Size.Small}
                className="inline-block"
              />
            </button>
          </>
        ) : (
          <>
            <Tooltip id="lock" showOnHover>
              <FormattedMessage id="lock" />
            </Tooltip>

            <Link
              data-testid="header-menu-lock"
              onClick={api.user.lock}
              className="inline-flex ml-2"
              colorClassName="color-primary-accent-1 hover:color-primary-accent-13"
              data-tip-lock
            >
              <SVG src={lockIcon} noLazy />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderMenu;
