import { useExtensionFeature } from '@extension/app/utils/getIsFeatureEnabled';
import { render, waitFor } from '@testing-library/react';
import { IItem } from '@common/interfaces';
import SharedWith, { ISharedUser } from '@extension/app/pages/ViewItem/components/SharedWith/SharedWith';
import { wrapWithProviders } from '@extension-tests/utils';
import useIsItemInSharedFolder from './useIsItemInSharedFolder';

let sharedUsers: Array<ISharedUser> = [];
let sharedGroups: Array<IItem> = [];

jest.mock('@extension/browser/browserApi');

jest.mock('@extension/app/hooks/useSharedContacts', () => jest.fn(() => ({
  sharedUsers,
  sharedGroups,
})));

jest.mock('@common/components/Avatar/PlusAvatar', () => ({
  __esModule: true,
  default: () => <div data-testid="avatar-plus-icon" />,
}));

jest.mock('@extension/app/utils/getIsFeatureEnabled');
jest.mock('./useIsItemInSharedFolder');

const setup = () => {
  const item = {
    uuid: '1234',
  } as IItem;

  return render(wrapWithProviders(<SharedWith item={item} />));
};

describe('SharedWith component', () => {
  beforeEach(() => {
    (useExtensionFeature as jest.Mock).mockReturnValue(true);
  });

  it('should render nothing when users not provided', async () => {
    sharedUsers = [];
    sharedGroups = [];
    const { container } = setup();

    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });

  it('should show user icons with two first letters of user email and group icons with first letter of title', async () => {
    sharedUsers = [
      { email: 'first@test.test', avatar: null, owner: false },
      { email: 'second@test.test', avatar: null, owner: false },
    ];
    sharedGroups = [
      { title: 'Power Rangers' },
    ] as Array<IItem>;
    const { findByText } = setup();

    expect(await findByText('fi')).toBeTruthy();
    expect(await findByText('se')).toBeTruthy();
    expect(await findByText('P')).toBeTruthy();
  });

  it('should show plus icon if limit of avatars is exceeded', async () => {
    sharedUsers = [
      { email: 'first@test.test', avatar: null, owner: false },
      { email: 'second@test.test', avatar: null, owner: false },
      { email: 'third@test.test', avatar: null, owner: false },
      { email: 'fourth@test.test', avatar: null, owner: false },
      { email: 'fifth@test.test', avatar: null, owner: false },
    ];
    const { findByTestId } = setup();

    expect(await findByTestId('avatar-plus-icon')).toBeTruthy();
  });

  it('should render nothing when item is in shared folder', async () => {
    sharedUsers = [{ email: 'first@test.test', avatar: null, owner: false }];
    sharedGroups = [];

    (useIsItemInSharedFolder as jest.Mock).mockResolvedValue(true);

    const { container } = setup();

    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });
});
