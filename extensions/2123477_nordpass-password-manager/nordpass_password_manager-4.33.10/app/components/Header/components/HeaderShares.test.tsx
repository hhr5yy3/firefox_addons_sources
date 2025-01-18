import { VaultType } from '@common/constants';
import { IItem } from '@common/interfaces';
import { VaultContext } from '@extension/app/context';
import { IVaultContext } from '@extension/app/context/VaultContext';
import useSearchParam from '@extension/app/hooks/useSearchParam';
import { screen } from '@testing-library/react';
import { wrapWithProviders } from '@tests/extension/utils';
import { renderWithInitEffects } from '@tests/utils/renderWithInitEffects';
import HeaderShares from './HeaderShares';

jest.mock('@extension/browser/browserApi');
jest.mock('@extension/app/hooks/useSearchParam');
jest.mock('@extension/app/pages/ViewItem/components/SharedWith/SharedWith', () => ({
  __esModule: true,
  default: () => <div>Shared with</div>,
}));

describe('HeaderShares', () => {
  const folderUuid = '123';

  const defaultVaultValue: Partial<IVaultContext> = {
    vaultFolders: [{ uuid: folderUuid }] as Array<IItem>,
    error: null,
    isLoading: false,
  };

  const setup = () => renderWithInitEffects(wrapWithProviders(
    <VaultContext.Provider value={defaultVaultValue as IVaultContext}>
      <HeaderShares />
    </VaultContext.Provider>,
  ));

  beforeEach(jest.clearAllMocks);

  it('should show nothing if vault type is not shared folder', async () => {
    (useSearchParam as jest.Mock).mockReturnValue(VaultType.Folder);

    await setup();

    expect(screen.queryByText('Shared with')).toBeNull();
  });

  it('should show nothing if folder does not exist', async () => {
    (useSearchParam as jest.Mock)
      .mockReturnValueOnce(VaultType.SharedFolder)
      .mockReturnValueOnce('999');

    await setup();

    expect(screen.queryByText('Shared with')).toBeNull();
  });

  it('should show shared with if inside existing shared folder', async () => {
    (useSearchParam as jest.Mock)
      .mockReturnValueOnce(VaultType.SharedFolder)
      .mockReturnValueOnce(folderUuid);

    await setup();

    expect(screen.getByText('Shared with')).toBeVisible();
  });
});
