import { useExtensionFeature } from '@extension/app/utils/getIsFeatureEnabled';
import { act, render, screen } from '@testing-library/react';
import history from '@extension/app/utils/history';
import { ROUTES } from '@extension/common/constants';
import { wrapWithIntl } from '@tests/extension/utils/wrapWithIntl';
import AccountSwitchButton from './AccountSwitchButton';

jest.mock('@extension/browser/browserApi');
jest.mock('@extension/app/utils/getIsFeatureEnabled');

jest.spyOn(history, 'push');

describe('AccountSwitchButton', () => {
  beforeEach(() => {
    (useExtensionFeature as jest.Mock).mockReturnValue(true);
  });

  it('should render email first two letters', async () => {
    await act(async () => void render(wrapWithIntl(<AccountSwitchButton email="test@mail.com" disabled={false} />)));
    expect(screen.getByText('te')).toBeVisible();
  });

  it('should history push on click', async () => {
    await act(async () => void render(wrapWithIntl(<AccountSwitchButton email="test@mail.com" disabled={false} />)));
    screen.getByText('te').click();
    expect(history.push).toHaveBeenCalledWith(ROUTES.MP_SWITCH_ACCOUNT);
  });
});
