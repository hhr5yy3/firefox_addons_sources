import { useContext, FC } from 'react';
import { SVG } from '@nord/ui';
import { FormattedMessage } from 'react-intl';
import addFolderIcon from '@icons/24/add-folder.svg';
import Tooltip from '@common/components/Tooltip/Tooltip';
import { VaultContext } from '@extension/app/context';
import { VaultLink } from '@extension/app/components';
import { api } from '@extension/app/api';
import { ItemType } from '@common/constants';
import { FolderLink } from './components/FolderLink';

interface IFolderLinksProps {
  onMenuClose: () => void;
}

export const FolderLinks: FC<IFolderLinksProps> = ({ onMenuClose }) => {
  const { vaultPersonalFolders, isLoading } = useContext(VaultContext);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div className="sidebar__group-label px-5 mt-3 text-grey-dark">
        <FormattedMessage id="folders" />
        {vaultPersonalFolders.length > 0 && (
          <>
            <Tooltip id="add-folder" showOnHover>
              <FormattedMessage id="addNewFolderTooltip" />
            </Tooltip>
            <VaultLink
              className="sidebar-folder block"
              data-tip-add-folder
              onClick={() => api.extension.openDesktopApp({
                route: 'ADD_ITEM',
                args: [ItemType.Folder],
              })}
            >
              <SVG className="icon-hover-white" src={addFolderIcon} />
            </VaultLink>
          </>
        )}
      </div>
      {vaultPersonalFolders.length ? (
        vaultPersonalFolders.map(folder => (
          <FolderLink
            key={folder.uuid}
            folder={folder}
            onMenuClose={onMenuClose}
          />
        ))
      ) : (
        <VaultLink
          className="pl-6 pr-5 sidebar-category"
          data-testid="add_to_folder"
          onClick={() => api.extension.openDesktopApp({
            route: 'ADD_ITEM',
            args: [ItemType.Folder],
          })}
        >
          <span className="truncate flex items-center">
            <SVG className="mr-3" src={addFolderIcon} />
            <FormattedMessage id="addNewFolder" />
          </span>
        </VaultLink>
      )}
    </>
  );
};
