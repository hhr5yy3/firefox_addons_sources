import { createMemoryHistory } from 'history';
import { act, render } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom-v5-compat';
import { wrapWithProviders } from '@extension-tests/utils';
import { items } from '@extension-tests/data/vault';
import {
  ROUTES,
  Storage,
} from '@extension/common/constants';
import { SortingType, SortingDirection, VaultType } from '@common/constants';
import StorageApi from '@extension/browser/storageApi';
import { sendMessage } from '@extension/app/api';
import { createListener } from '@extension/app/api/createListener';
import { Action } from '@common/constants/action';
import { Notification } from '@common/constants/notification';
import { INoteItem, IPasswordItem } from '@common/contracts/contracts';
import Vault from './Vault';

jest.mock('@extension/app/api/createListener');
jest.mock('@extension/browser/storageApi');
jest.mock('@extension/browser/browserApi');

async function renderList(route = ROUTES.VAULT) {
  (sendMessage as jest.Mock).mockImplementation(async type => {
    if (type === Action.ItemSearch) return Promise.resolve({ items });
    return Promise.resolve({ items: [] });
  });
  const history = createMemoryHistory({ initialEntries: [route] });
  const result = render(wrapWithProviders(
    <Routes>
      <Route path="/vault/*" element={<Vault />} />
    </Routes>,
    { history },
  ));
  await result.findByRole('list');
  return result;
}

let listeners: Array<Record<string, any>> = [];
const triggerNotification = (data: any) => listeners.forEach(({ handler }) => handler(data));
(createListener as jest.Mock).mockImplementation((handler, type) => {
  listeners.push({ handler, type });
  return jest.fn();
});

describe('Vault', () => {
  beforeEach(() => {
    jest.resetModules();
    (StorageApi.get as jest.Mock).mockResolvedValue({
      [Storage.VaultSorting]: { type: SortingType.Recent, direction: SortingDirection.Asc },
    });
    listeners = [];
  });

  it('should render error', async () => {
    (sendMessage as jest.Mock).mockRejectedValue(Error('test'));
    const { findByText } = render(wrapWithProviders(<Vault />));

    const errorText = 'An undefined error occurred. If it persists, please contact support.';
    const errorTextNode = await findByText(errorText);

    expect(errorTextNode).toBeTruthy();
  });

  it('should render empty vault list', async () => {
    (sendMessage as jest.Mock).mockResolvedValue({ items: [] });
    const { findByText } = render(wrapWithProviders(<Vault />));

    const header = await findByText('Let’s get started');

    expect(header).toBeTruthy();
  });

  it('should render vault list', async () => {
    const { queryAllByRole } = await renderList();

    const listItems = queryAllByRole('listitem');
    expect(listItems).toHaveLength(3);
    listItems.forEach((item, index) => {
      expect(item.textContent).toContain(items[index].title);
    });
    const passwordItem = (items[0] as IPasswordItem);
    const noteItem = (items[1] as INoteItem);
    expect(listItems[0].textContent).toContain(passwordItem.username);
    expect(listItems[1].textContent).not.toContain(noteItem.secret);
  });

  describe('filtered list', () => {
    it('should render passwords list', async () => {
      const { queryAllByRole } = await renderList(ROUTES.VAULT_TYPE(VaultType.Password));

      const listItems = queryAllByRole('listitem');
      expect(listItems).toHaveLength(1);
      expect(listItems[0].textContent).toContain(items[0].title);
    });

    it('should render notes list', async () => {
      const { queryAllByRole } = await renderList(ROUTES.VAULT_TYPE(VaultType.Note));

      const listItems = queryAllByRole('listitem');
      expect(listItems).toHaveLength(1);
      expect(listItems[0].textContent).toContain(items[1].title);
    });

    it('should render cards list', async () => {
      const { queryAllByRole } = await renderList(ROUTES.VAULT_TYPE(VaultType.CreditCard));

      const listItems = queryAllByRole('listitem');
      expect(listItems).toHaveLength(1);
      expect(listItems[0].textContent).toContain(items[2].title);
    });

    it('should render shared list', async () => {
      const { queryAllByRole } = await renderList(ROUTES.VAULT_TYPE(VaultType.Shared));

      const listItems = queryAllByRole('listitem');
      expect(listItems).toHaveLength(1);
      expect(listItems[0].textContent).toContain(items[0].title);
    });

    it('should render folder items', async () => {
      const { queryAllByRole } = await renderList(ROUTES.VIEW_FOLDER(items[3].uuid));

      const listItems = queryAllByRole('listitem');
      expect(listItems).toHaveLength(1);
      expect(listItems[0].textContent).toContain(items[0].title);
    });

    it('should render search list', async () => {
      const { queryAllByRole } = await renderList(`${ROUTES.VAULT}?query=note`);

      const listItems = queryAllByRole('listitem');
      expect(listItems).toHaveLength(2);
      expect(listItems[0].textContent).toContain(items[0].title);
      expect(listItems[1].textContent).toContain(items[1].title);
    });
  });

  it('should sort list by name A-Z', async () => {
    StorageApi.get = jest.fn().mockResolvedValue({
      [Storage.VaultSorting]: { type: SortingType.Alpha, direction: SortingDirection.Asc },
    });
    const { queryAllByRole } = await renderList();

    const listItems = queryAllByRole('listitem');
    expect(listItems[0].textContent).toContain(items[2].title);
    expect(listItems[1].textContent).toContain(items[1].title);
    expect(listItems[2].textContent).toContain(items[0].title);
  });

  it('should sort list by name Z-A', async () => {
    StorageApi.get = jest
      .fn()
      .mockResolvedValue({ [Storage.VaultSorting]: { type: 'alpha', direction: 'desc' } });
    const { queryAllByRole } = await renderList();

    const listItems = queryAllByRole('listitem');
    expect(listItems[0].textContent).toContain(items[0].title);
    expect(listItems[1].textContent).toContain(items[1].title);
    expect(listItems[2].textContent).toContain(items[2].title);
  });

  it('should update list after receiving vault/change', async () => {
    const { queryAllByRole } = await renderList();

    act(() => triggerNotification({
      id: 0,
      type: Notification.VaultChange,
      deleted_items: [],
      items: [{ ...items[0], title: 'changed-title' }],
    }));

    const listItems = queryAllByRole('listitem');
    expect(listItems[0].textContent).not.toContain(items[0].title);
    expect(listItems[0].textContent).toContain('changed-title');
    expect(listItems[1].textContent).toContain(items[1].title);
    expect(listItems[2].textContent).toContain(items[2].title);
  });

  it('should remove item from list after receiving vault/change', async () => {
    const { queryAllByRole } = await renderList();

    act(() => triggerNotification({
      id: 0,
      type: Notification.VaultChange,
      deleted_items: [{ uuid: items[1].uuid, type: items[1].type }],
      items: [],
    }));

    const listItems = queryAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    expect(listItems[0].textContent).toContain(items[0].title);
    expect(listItems[1].textContent).toContain(items[2].title);
  });
});
