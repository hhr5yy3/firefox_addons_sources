import { ItemType } from '@common/constants';
import { FeatureFlag } from '@common/constants/featureFlag';
import { ISharedUser, TFolderItem } from '@common/contracts/contracts';
import { AccessLevel, IItem } from '@common/interfaces/item';
import { api } from '@extension/app/api';
import { VaultContext } from '@extension/app/context';
import { IVaultContext } from '@extension/app/context/VaultContext';
import useSharedContacts from '@extension/app/hooks/useSharedContacts';
import StorageApi from '@extension/browser/storageApi';
import { Storage } from '@extension/common/constants';
import { screen } from '@testing-library/react';
import { wrapWithProviders } from '@tests/extension/utils';
import { renderWithInitEffects } from '@tests/utils/renderWithInitEffects';
import { CommonContextMenu } from './CommonContextMenu';

jest.mock('@extension/browser/browserApi');
jest.mock('@extension/app/hooks/useSharedContacts');
jest.spyOn(api.extension, 'getUserEmail').mockResolvedValue('user@test.com');

const setSharedContactsMock = (sharedUsers: Array<ISharedUser> = []) => {
  (useSharedContacts as jest.Mock).mockReturnValue({
    sharedGroups: [] as Array<IItem>,
    sharedUsers,
    isLoading: false,
    errorMessage: undefined,
  });
};

const folderUuid = '1';
const folder = { uuid: folderUuid, shared_folder: true, acl: AccessLevel.Owner } as TFolderItem;

const defaultVaultValue: Partial<IVaultContext> = {
  vaultFolders: [folder],
  vaultSharedFolders: [folder],
};

const storageGetSpy = jest.spyOn(StorageApi, 'get');

const setupTestSuite = (item: Partial<IItem> = {}, isEditHidden = false) => (
  renderWithInitEffects(wrapWithProviders(
    <VaultContext.Provider value={defaultVaultValue as IVaultContext}>
      <CommonContextMenu
        isEditHidden={isEditHidden}
        item={{ shared: true, uuid: '123', ...item } as IItem}
      />
    </VaultContext.Provider>,
  ))
);

describe('extension CommonContextMenu', () => {
  describe('Move to Folder', () => {
    const menuItemText = 'Move to Folder';

    it('is hidden for item with no personal share', async () => {
      setSharedContactsMock();
      await setupTestSuite();

      expect(screen.queryByText(menuItemText)).not.toBeInTheDocument();
    });

    it('is visible when item has no shares', async () => {
      setSharedContactsMock();
      await setupTestSuite({ shared: false });

      expect(await screen.findByText(menuItemText)).toBeVisible();
    });

    it('is visible if current user has personal access to item', async () => {
      setSharedContactsMock([{ email: 'user@test.com' }] as Array<ISharedUser>);
      await setupTestSuite();

      expect(await screen.findByText(menuItemText)).toBeVisible();
    });
  });

  describe('Remove my access', () => {
    const menuItemText = 'Remove My Access';

    it('is hidden for item with no personal share', async () => {
      setSharedContactsMock([] as Array<ISharedUser>);
      await setupTestSuite();

      expect(screen.queryByText(menuItemText)).not.toBeInTheDocument();
    });

    it('is hidden for item owners', async () => {
      setSharedContactsMock([{ email: 'user@test.com' }] as Array<ISharedUser>);
      await setupTestSuite({ owner: true });

      expect(screen.queryByText(menuItemText)).not.toBeInTheDocument();
    });

    it('is visible if current user has personal access to item', async () => {
      setSharedContactsMock([{ email: 'user@test.com' }] as Array<ISharedUser>);
      await setupTestSuite();

      expect(await screen.findByText(menuItemText)).toBeVisible();
    });
  });

  describe('edit', () => {
    const menuItemText = 'Edit';

    it('should allow editing if user has full access to item', async () => {
      setSharedContactsMock([{ email: 'user@test.com' }] as Array<ISharedUser>);
      await setupTestSuite({ acl: AccessLevel.Owner });

      expect(await screen.findByText(menuItemText)).toBeVisible();
    });

    it('should not allow editing if user has limited access to item', async () => {
      setSharedContactsMock([{ email: 'user@test.com' }] as Array<ISharedUser>);
      await setupTestSuite({ acl: AccessLevel.ReadOnly });

      expect(screen.queryByText(menuItemText)).not.toBeInTheDocument();
    });

    it('should not allow editing even if user has full access to item when `isEditHidden` is passed', async () => {
      setSharedContactsMock([{ email: 'user@test.com' }] as Array<ISharedUser>);
      await setupTestSuite({ acl: AccessLevel.Owner }, true);

      expect(screen.queryByText(menuItemText)).not.toBeInTheDocument();
    });
  });

  describe('share', () => {
    const menuItemText = 'Share';

    it('should allow sharing if user has full access to item', async () => {
      setSharedContactsMock([{ email: 'user@test.com' }] as Array<ISharedUser>);
      await setupTestSuite({ acl: AccessLevel.Owner });

      expect(await screen.findByText(menuItemText)).toBeVisible();
    });

    it('should not allow sharing if user has limited access to item', async () => {
      setSharedContactsMock([{ email: 'user@test.com' }] as Array<ISharedUser>);
      await setupTestSuite({ acl: AccessLevel.ReadOnly });

      expect(screen.queryByText(menuItemText)).not.toBeInTheDocument();
    });

    it('is hidden for item that is in shared folder', async () => {
      setSharedContactsMock();
      await setupTestSuite({ folder_id: folderUuid, acl: AccessLevel.Owner });

      expect(screen.queryByText(menuItemText)).not.toBeInTheDocument();
    });
  });

  describe('Remove from folder', () => {
    const menuItemText = 'Remove from Folder';

    it('is hidden for item that is in shared folder', async () => {
      setSharedContactsMock([] as Array<ISharedUser>);
      await setupTestSuite({ folder_id: folderUuid, shared: false });

      expect(screen.queryByText(menuItemText)).not.toBeInTheDocument();
    });

    it('is hidden for item that is not in folder', async () => {
      setSharedContactsMock([] as Array<ISharedUser>);
      await setupTestSuite({ folder_id: undefined, shared: false });

      expect(screen.queryByText(menuItemText)).not.toBeInTheDocument();
    });

    it('should allow removing from folder when item is in personal folder', async () => {
      setSharedContactsMock([] as Array<ISharedUser>);
      await setupTestSuite({ folder_id: '123', shared: false });

      expect(screen.queryByText(menuItemText)).toBeVisible();
    });
  });

  describe('Move to Trash', () => {
    const menuItemText = 'Move to Trash';

    it('is hidden for item that is deleted', async () => {
      setSharedContactsMock([] as Array<ISharedUser>);
      await setupTestSuite({ shared: false, deleted_at: 'date time' });

      expect(screen.queryByText(menuItemText)).not.toBeInTheDocument();
    });

    it('is hidden for item that is in shared folder', async () => {
      setSharedContactsMock([] as Array<ISharedUser>);
      await setupTestSuite({ shared: false, folder_id: folderUuid });

      expect(screen.queryByText(menuItemText)).not.toBeInTheDocument();
    });

    it('is hidden for item that is shared', async () => {
      setSharedContactsMock([] as Array<ISharedUser>);
      await setupTestSuite({ shared: true });

      expect(screen.queryByText(menuItemText)).not.toBeInTheDocument();
    });

    it('should allow moving to trash when item is not shared & not deleted & not in shared folder ', async () => {
      setSharedContactsMock([] as Array<ISharedUser>);
      await setupTestSuite({ shared: false, deleted_at: undefined });

      expect(screen.queryByText(menuItemText)).toBeVisible();
    });
  });

  describe('Delete', () => {
    const menuItemText = 'Delete';

    it('is hidden for item that is not in shared folder', async () => {
      setSharedContactsMock([] as Array<ISharedUser>);
      await setupTestSuite({});

      expect(screen.queryByText(menuItemText)).not.toBeInTheDocument();
    });

    it('should allow deleting when item is in shared folder', async () => {
      setSharedContactsMock([] as Array<ISharedUser>);
      await setupTestSuite({ folder_id: folderUuid });

      expect(screen.queryByText(menuItemText)).toBeVisible();
    });
  });

  describe('Password Item History', () => {
    storageGetSpy.mockResolvedValue({
      [Storage.Features]: [FeatureFlag.PasswordItemHistory],
    });
    const menuItemText = 'Password History';

    it('should be visible for item owner if item type is password', async () => {
      await setupTestSuite({ owner: true, type: ItemType.Password });

      expect(screen.queryByText(menuItemText)).toBeVisible();
    });

    it('should be hidden if user is not item owner', async () => {
      await setupTestSuite({ type: ItemType.Password });

      expect(screen.queryByText(menuItemText)).not.toBeInTheDocument();
    });
  });
});
