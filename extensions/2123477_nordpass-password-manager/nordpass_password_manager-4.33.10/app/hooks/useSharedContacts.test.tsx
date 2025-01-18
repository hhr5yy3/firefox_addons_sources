import { renderHook } from '@testing-library/react-hooks';
import { wrapWithProviders } from '@tests/extension/utils';
import { IItem } from '@common/interfaces';
import { ItemType, OWNERS_IDENTITY_ID } from '@common/constants';
import { sendMessage } from '@extension/app/api';
import { TFolderItem } from '@common/contracts/contracts';
import useSharedContacts from './useSharedContacts';
import { useExtensionFeature } from '../utils/getIsFeatureEnabled';

jest.mock('@extension/browser/browserApi');

jest.mock('@extension/app/utils/getIsFeatureEnabled');

const passwordItem = {
  uuid: '1234',
  shared: true,
  type: ItemType.Password,
} as IItem;

const setup = (item = passwordItem) => renderHook(
  () => useSharedContacts(item),
  { wrapper: ({ children }) => wrapWithProviders(children) },
);

describe('useSharedContacts', () => {
  beforeEach(() => (useExtensionFeature as jest.Mock).mockReturnValue(true));

  afterEach(jest.clearAllMocks);

  it('should return shared users', async () => {
    const firstSharedUser = { email: 'joe.doe@nordsec.com', owner: false };
    const secondSharedUser = { email: 'jane.doe@nordsec.com', owner: false };
    const group = { email: '', owner: false };

    (sendMessage as jest.Mock).mockResolvedValue({
      shares: [
        firstSharedUser,
        secondSharedUser,
        group,
      ],
    });

    const { result, waitForNextUpdate } = setup();
    await waitForNextUpdate();

    const { sharedUsers } = result.current;
    expect(sharedUsers).toContain(firstSharedUser);
    expect(sharedUsers).toContain(secondSharedUser);
    expect(sharedUsers).not.toContain(group);
  });

  it('should ignore owners item if item is not shared folder', async () => {
    const share = { email: '', identity_key_id: OWNERS_IDENTITY_ID };
    const folder = { uuid: '1234', shared: true, type: ItemType.Folder, shared_folder: false } as TFolderItem;

    (sendMessage as jest.Mock).mockResolvedValue({
      shares: [share],
    });

    const { result, waitForNextUpdate } = setup(folder);
    await waitForNextUpdate();

    const { sharedUsers } = result.current;
    expect(sharedUsers.length).toBe(0);
  });

  it('should update owners item if item is shared folder', async () => {
    const share = { identity_key_id: OWNERS_IDENTITY_ID };
    const sharedFolder = { uuid: '9876', shared: true, type: ItemType.Folder, shared_folder: true } as TFolderItem;

    (sendMessage as jest.Mock).mockResolvedValue({
      shares: [share],
    });

    const { result, waitForNextUpdate } = setup(sharedFolder);
    await waitForNextUpdate();

    const { sharedUsers } = result.current;
    expect(sharedUsers[0]).toStrictEqual({ ...share, is_owners: true });
  });
});
