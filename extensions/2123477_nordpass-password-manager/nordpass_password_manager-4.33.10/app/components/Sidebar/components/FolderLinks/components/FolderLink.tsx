import { FC, useCallback } from 'react';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';
import { SVG } from '@nord/ui';
import { ROUTES } from '@extension/common/constants';
import editIcon from '@icons/24/edit.svg';
import trashBlackIcon from '@icons/24/trash-black.svg';
import folderIcon from '@icons/24/folder.svg';
import { api } from '@extension/app/api';
import { DeleteFolderModal, VaultLink } from '@extension/app/components';
import Tooltip from '@common/components/Tooltip/Tooltip';
import { TFolderItem } from '@common/contracts/contracts';
import { useLocation } from 'react-router-dom-v5-compat';
import NavLink from '@common/components/NavLink/NavLink';

interface IFolderLinkProps {
  folder: TFolderItem;
  onMenuClose: () => void;
}

export const FolderLink: FC<IFolderLinkProps> = ({ folder, onMenuClose }) => {
  const location = useLocation();
  const isActive = useCallback(() => location.search.includes(folder.uuid), [location, folder.uuid]);
  const EditButton = useCallback(() => (
    <VaultLink
      onClick={() => api.extension.openDesktopApp({
        route: 'EDIT_FOLDER',
        args: [folder.uuid],
      })}
      {...{ [`data-tip-rename-folder-${folder.uuid.toLowerCase()}`]: true }}
    >
      <SVG className="icon-hover-white" src={editIcon} />
    </VaultLink>
  ), [folder]);

  const DeleteButton = useCallback(({ onClick }) => (
    <VaultLink
      onClick={onClick}
      {...{ [`data-tip-delete-folder-${folder.uuid.toLowerCase()}`]: true }}
    >
      <SVG className="icon-hover-white" src={trashBlackIcon} />
    </VaultLink>
  ), [folder]);

  return (
    <div
      className={cx(
        'sidebar-category pl-6 pr-5 relative',
        isActive() && 'active',
      )}
    >
      <SVG className="mr-3" src={folderIcon} />
      <span className="truncate flex-1">{folder.title}</span>
      <div className="folder-actions grid grid-flow-col gap-2 pl-3 z-1">
        <Tooltip showOnHover id={`rename-folder-${folder.uuid}`} className="pb-1">
          <FormattedMessage id="rename" />
        </Tooltip>
        <EditButton />
        <Tooltip showOnHover id={`delete-folder-${folder.uuid}`} className="pb-1">
          <FormattedMessage id="delete" />
        </Tooltip>
        <DeleteFolderModal
          folderId={folder.uuid}
          button={DeleteButton}
        />
      </div>
      <NavLink
        to={ROUTES.VIEW_FOLDER(folder.uuid)}
        onClick={onMenuClose}
        isActive={isActive()}
        className="absolute inset-0 z-0"
      />
    </div>
  );
};
