import { ItemType } from '@common/constants';
import VaultLink from '@extension/app/components/VaultLink';
import { VaultContext } from '@extension/app/context';
import { SVG } from '@nord/ui';
import addFolderIcon from '@icons/add-shared-folder.svg';
import Tooltip from '@common/components/Tooltip/Tooltip';
import { FC, useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { api } from '@extension/app/api';
import { SharedFolderLink } from './components/SharedFolderLink';

interface ISharedFolderLinks {
  onMenuClose: () => void;
}

const SharedFolderLinks: FC<ISharedFolderLinks> = ({ onMenuClose }) => {
  const { vaultSharedFolders, isLoading } = useContext(VaultContext);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div className="sidebar__group-label px-5 mt-3 mb-1 text-grey-dark">
        <span>
          <FormattedMessage id="sharedFolders" />
          <span className="border rounded-full px-2 py-1 ml-2 border-grey-dark text-nano">
            <FormattedMessage id="beta" />
          </span>
        </span>
        {vaultSharedFolders.length > 0 && (
          <>
            <Tooltip id="add-shared-folder" showOnHover>
              <FormattedMessage id="addNewSharedFolder" />
            </Tooltip>
            <VaultLink
              className="sidebar-folder block"
              data-tip-add-shared-folder
              onClick={() => api.extension.openDesktopApp({
                route: 'ADD_ITEM',
                args: [ItemType.SharedFolder],
              })}
            >
              <SVG
                width={24}
                height={24}
                className="icon-hover-white"
                src={addFolderIcon}
              />
            </VaultLink>
          </>
        )}
      </div>
      {vaultSharedFolders.length ? (
        vaultSharedFolders.map(folder => (
          <SharedFolderLink
            key={folder.uuid}
            folder={folder}
            onMenuClose={onMenuClose}
          />
        ))
      ) : (
        <VaultLink
          className="pl-6 pr-5 sidebar-category"
          data-testid="add-shared-folder"
          onClick={() => api.extension.openDesktopApp({
            route: 'ADD_ITEM',
            args: [ItemType.SharedFolder],
          })}
        >
          <span className="truncate flex items-center">
            <SVG
              width={24}
              height={24}
              className="mr-3"
              src={addFolderIcon}
            />
            <FormattedMessage id="addNewSharedFolder" />
          </span>
        </VaultLink>
      )}
    </>
  );
};

export default SharedFolderLinks;
