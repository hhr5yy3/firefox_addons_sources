import { FeatureFlag } from '@common/constants/featureFlag';
import { OrganizationInviteStatus, OrganizationInviteType } from '@common/constants/organization';
import { wrapWithProviders } from '@extension-tests/utils';
import { api } from '@extension/app/api';
import StorageApi from '@extension/browser/storageApi';
import { Storage } from '@extension/common/constants';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { renderWithInitEffects } from '@tests/utils/renderWithInitEffects';
import OrganizationBar from './OrganizationBar';

jest.mock('@extension/browser/browserApi');

jest.mock('@extension/app/context/OrganizationContext', () => ({
  useOrganizationContext: () => ({
    invitations: [{
      organization: 'Test Organization',
      organization_uuid: 'd4a0b97b-2fe9-461e-9d65-62d7d8f4a290',
      type: OrganizationInviteType.Request,
      OrganizationInviteStatus: OrganizationInviteStatus.Pending,
    }],
  }),
}));

const storageGetSpy = jest.spyOn(StorageApi, 'get');

describe('OrganizationBar', () => {
  beforeEach(jest.clearAllMocks);

  it('should redirect to desktop organization invite on button click', async () => {
    jest.spyOn(api.extension, 'openDesktopApp');
    storageGetSpy.mockResolvedValue({
      [Storage.showOrganizationBar]: true,
      [Storage.Features]: [],
    });

    render(wrapWithProviders(<OrganizationBar />));

    await waitFor(async () => {
      const button = await screen.findByText('Join Now');
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(api.extension.openDesktopApp).toHaveBeenCalledWith({
        route: 'ORGANIZATION_INVITE',
      });
    });
  });

  it('should not display organization bar if it was disabled via feature flag', async () => {
    storageGetSpy.mockResolvedValue({
      [Storage.showOrganizationBar]: true,
      [Storage.Features]: [FeatureFlag.B2CToB2BMigrationDisabled],
    });

    await renderWithInitEffects(wrapWithProviders(<OrganizationBar />));

    expect(screen.queryByText('Join the organization with current passwords or clear your vault.')).not.toBeInTheDocument();
  });
});
