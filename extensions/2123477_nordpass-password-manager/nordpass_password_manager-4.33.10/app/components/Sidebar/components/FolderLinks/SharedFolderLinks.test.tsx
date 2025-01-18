import { IItem } from '@common/interfaces';
import { VaultContext } from '@extension/app/context';
import { IVaultContext } from '@extension/app/context/VaultContext';
import { screen } from '@testing-library/react';
import { wrapWithProviders } from '@tests/extension/utils';
import { renderWithInitEffects } from '@tests/utils/renderWithInitEffects';
import SharedFolderLinks from './SharedFolderLinks';

jest.mock('@extension/browser/browserApi');

jest.mock('./components/SharedFolderActions', () => ({
  __esModule: true,
  default: () => <span />,
}));

describe('SharedFolderLinks', () => {
  const defaultVault: Partial<IVaultContext> = {
    vaultItems: [],
  };

  const setup = (vaultSharedFolders: Array<IItem>, isLoading = false) => renderWithInitEffects(wrapWithProviders(
    <VaultContext.Provider value={{ ...defaultVault, vaultSharedFolders, isLoading } as IVaultContext}>
      <SharedFolderLinks onMenuClose={jest.fn} />
    </VaultContext.Provider>,
  ));

  it('should show nothing if loading', async () => {
    await setup([], true);
    expect(screen.queryByText('Shared folders')).toBeNull();
  });

  it('should show add new shared folder text when no folders are present', async () => {
    await setup([]);

    expect(screen.getByText('Add New Folder')).toBeVisible();
  });

  it('should not show add new shared folder text when folders are present', async () => {
    const title = 'Folder title';
    await setup([{ uuid: '123', title } as IItem]);

    expect(screen.queryByText('Add New Folder')).toBeNull();
    expect(screen.getByText(title)).toBeVisible();
  });
});
