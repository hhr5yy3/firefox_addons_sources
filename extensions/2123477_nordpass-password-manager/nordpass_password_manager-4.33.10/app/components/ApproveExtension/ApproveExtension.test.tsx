import { act, render } from '@testing-library/react';
import { createListener } from '@extension/app/api/createListener';
import { ListenerType, Storage } from '@extension/common/constants';
import StorageApi from '@extension/browser/storageApi';
import { wrapWithProviders } from '@extension-tests/utils';
import ApproveExtension from '@extension/app/components/ApproveExtension/ApproveExtension';

jest.mock('@extension/app/api/createListener');
jest.mock('@extension/browser/storageApi');

describe('ApproveExtension', () => {
  let listeners: Array<any> = [];
  const triggerNotification = (data: any) => listeners.forEach(({ handler }) => handler(data));

  (createListener as jest.Mock).mockImplementation((handler, type) => {
    listeners.push({ handler, type });
    return jest.fn();
  });

  const setup = () => render(wrapWithProviders(<ApproveExtension />));

  beforeEach(() => {
    listeners = [];
  });

  describe('handleApproveCodeChange', () => {
    it('should update approve code on storage value change', async () => {
      (StorageApi.get as jest.Mock).mockResolvedValue({
        [Storage.ApproveCode]: '1234',
      });

      const { findByTestId } = setup();
      const approveCode = await findByTestId('approve-code');

      expect(approveCode.textContent).toStrictEqual('1234');

      act(() => triggerNotification({
        id: 1,
        type: ListenerType.StorageChange,
        approveCode: {
          newValue: '5678',
        },
      }));

      expect(approveCode.textContent).toStrictEqual('5678');
    });
  });
});
