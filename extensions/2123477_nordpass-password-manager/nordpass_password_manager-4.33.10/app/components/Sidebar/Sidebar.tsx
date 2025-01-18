import useOnlineStatus from '@extension/app/hooks/useOnlineStatus';
import { FC, memo, useEffect, useState } from 'react';
import cx from 'classnames';
import { Link, SVG } from '@nord/ui';
import arrowLeftIcon from '@icons/24/arrow-left.svg';
import { ForceCrashButton } from '@common/components/ForceCrashButton/ForceCrashButton';
import { FeatureFlag } from '@common/constants/featureFlag';
import { getIsFeatureEnabled } from '@extension/app/utils/getIsFeatureEnabled';
import useIsSharedFoldersEnabled from '@extension/app/hooks/useIsSharedFoldersEnabled';
import { ItemLinks } from './components/ItemLinks';
import { FolderLinks } from './components/FolderLinks/FolderLinks';
import SharedFolderLinks from './components/FolderLinks/SharedFolderLinks';

import './Sidebar.scss';

interface ISidebarProps {
  isMenuOpen: boolean;
  onMenuClose: () => void;
}

export const Sidebar: FC<ISidebarProps> = ({ isMenuOpen, onMenuClose }) => {
  const [isCrashButtonEnabled, setIsCrashButtonEnabled] = useState(false);
  const isSharedFoldersEnabled = useIsSharedFoldersEnabled();
  const { isOnline, isBackOnline } = useOnlineStatus();

  useEffect(() => {
    getIsFeatureEnabled(FeatureFlag.ForceCrashButton).then(setIsCrashButtonEnabled);
  }, []);

  return (
    <aside
      className={cx(
        'sidebar bg-grey-darkest text-white',
        isMenuOpen && 'sidebar--open',
        (!isOnline || isBackOnline) && 'mt-36px',
      )}
    >
      <Link
        onClick={onMenuClose}
        className="sidebar-category px-4 mt-4 mb-1 flex-shrink-0"
      >
        <SVG src={arrowLeftIcon} noLazy />
        {isCrashButtonEnabled && <ForceCrashButton />}
      </Link>

      <div className="overflow-y-auto">
        <ItemLinks onMenuClose={onMenuClose} />
        {isSharedFoldersEnabled && <SharedFolderLinks onMenuClose={onMenuClose} />}
        <FolderLinks onMenuClose={onMenuClose} />
      </div>
    </aside>
  );
};

export default memo(Sidebar);
