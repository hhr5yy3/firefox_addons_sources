import { fireEvent } from '@testing-library/react';
import ViewPassword from '@extension/app/pages/ViewItem/ViewPassword/ViewPassword';
import { getSecret } from '@extension/app/api/VaultApi';
import { IPasswordItem } from '@common/contracts/contracts';
import { AccessLevel } from '@common/interfaces';
import { renderWithIntl } from '@tests/utils/wrapWithIntl';
import BrowserApi from '@extension/browser/browserApi';
import { ExtensionAction } from '@common/constants/action';

jest.mock('@extension/app/api/VaultApi');
jest.mock('@extension/browser/browserApi');
jest.mock('@extension/browser/storageApi', () => ({
  get: jest.fn().mockResolvedValue({}),
}));

describe('ViewPassword', () => {
  const setup = (item: Partial<IPasswordItem>) => renderWithIntl(
    <ViewPassword item={item as IPasswordItem} sharedWith={null} />,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not show password field when item does not have password', async () => {
    const { queryByText, queryByTestId } = setup({ secret: '0' });

    expect(queryByText('0')).not.toBeInTheDocument();
    expect(queryByText('Password')).not.toBeInTheDocument();
    expect(queryByTestId('show')).toBeNull();
    expect(queryByTestId('hide')).toBeNull();
  });

  it('should be able to show and hide password', async () => {
    (getSecret as jest.Mock).mockImplementation(() => 'abcd');

    const { queryByText, findByTestId } = setup({});
    expect(queryByText('a')).not.toBeInTheDocument();
    expect(queryByText('b')).not.toBeInTheDocument();
    expect(queryByText('c')).not.toBeInTheDocument();
    expect(queryByText('d')).not.toBeInTheDocument();

    fireEvent.click(await findByTestId('show'));

    expect(queryByText('a')).toBeInTheDocument();
    expect(queryByText('b')).toBeInTheDocument();
    expect(queryByText('c')).toBeInTheDocument();
    expect(queryByText('d')).toBeInTheDocument();

    fireEvent.click(await findByTestId('hide'));

    expect(queryByText('a')).not.toBeInTheDocument();
    expect(queryByText('b')).not.toBeInTheDocument();
    expect(queryByText('c')).not.toBeInTheDocument();
    expect(queryByText('d')).not.toBeInTheDocument();
  });

  it('should not be able to show password when item access is limited', async () => {
    const { findByTestId, queryByText } = setup({ secret: 'password123', acl: AccessLevel.ReadOnly });
    fireEvent.click(await findByTestId('show'));

    expect(queryByText('password123')).not.toBeInTheDocument();
    expect(queryByText('Hide')).not.toBeInTheDocument();
  });

  it('should be able to copy password when item access is not limited', async () => {
    const password = 'password123';
    (getSecret as jest.Mock).mockImplementation(() => password);

    const { findByTestId } = setup({ secret: password });

    fireEvent.click(await findByTestId('copy'));
    expect(BrowserApi.sendMessage).toBeCalledWith({ type: ExtensionAction.CopyToClipboard, clipboardValue: password });
  });

  it('should not be able to copy password when item access is limited', async () => {
    const password = 'password123';
    (getSecret as jest.Mock).mockImplementation(() => password);

    const { findByTestId } = setup({ secret: password, acl: AccessLevel.ReadOnly });

    fireEvent.click(await findByTestId('copy'));
    expect(BrowserApi.sendMessage).not.toBeCalledWith(
      { type: ExtensionAction.CopyToClipboard, clipboardValue: password },
    );
  });
});
