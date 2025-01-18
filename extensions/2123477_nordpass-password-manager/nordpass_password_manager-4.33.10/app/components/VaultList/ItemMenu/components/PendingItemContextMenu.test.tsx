import { render, fireEvent } from '@testing-library/react';
import { wrapWithProviders } from '@extension-tests/utils';
import { sendMessage } from '@extension/app/api';
import { Action } from '@common/constants/action';
import { IItem } from '@common/interfaces';
import { ItemType, ShareStatus } from '@common/constants';
import PendingContextMenu from './PendingContextMenu';

jest.mock('@extension/browser/browserApi');

describe('PendingItemContextMenu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const pendingItem: IItem = {
    uuid: '123',
    last_used_at: '1234',
    owner: false,
    share_status: ShareStatus.Pending,
    shared: true,
    type: ItemType.Password,
    title: 'item',
  };

  it('should call accept when accepting share', async () => {
    const { findByText } = render(wrapWithProviders(<PendingContextMenu item={pendingItem} />));
    const acceptButton = await findByText('Accept');

    expect(acceptButton).toBeVisible();

    fireEvent.click(acceptButton);

    expect(sendMessage).toHaveBeenCalledWith(
      Action.ShareAccept,
      {
        items: [{
          uuid: pendingItem.uuid,
          always: false,
        }],
      },
    );
  });
});
