import { renderHook, act } from '@testing-library/react-hooks';
import { noOp } from '@common/constants/function';
import StorageApi from '@extension/browser/storageApi';
import { Storage } from '@extension/common/constants';
import { createListener } from '@extension/app/api/createListener';
import useOnlineStatus from './useOnlineStatus';

jest.mock('@extension/app/api/createListener');

jest.mock('@extension/browser/storageApi', () => ({
  get: jest.fn(),
}));

jest.mock('@extension/app/api', () => ({
  createListener: jest.fn(),
}));

const mockOnlineStatus = () => {
  let changeOnlineStatus: (changes: Record<string, any>) => void = noOp;
  (createListener as jest.Mock).mockImplementation((handler, _) => {
    changeOnlineStatus = handler;
  });

  return (newValue: boolean) => changeOnlineStatus({ [Storage.OnlineStatus]: { newValue } });
};

describe('useOnlineStatus', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('should set isOnline to null when online status is unknown', () => {
    (StorageApi.get as jest.Mock).mockImplementation(() => new Promise(noOp));
    const { result } = renderHook(() => useOnlineStatus());

    expect(result.current.isOnline).toBeNull();
  });

  it('should set isOnline based on response from StorageApi', async () => {
    (StorageApi.get as jest.Mock).mockResolvedValue({
      [Storage.OnlineStatus]: true,
    });

    const { result, waitForNextUpdate } = renderHook(() => useOnlineStatus());
    await waitForNextUpdate();

    expect(result.current.isOnline).toBe(true);
  });

  it('should update isOnline and isBackOnline on online status change', async () => {
    const changeOnlineStatus = mockOnlineStatus();
    const { result, waitForNextUpdate } = renderHook(() => useOnlineStatus());
    await waitForNextUpdate();

    act(() => changeOnlineStatus(false));

    expect(result.current.isOnline).toBe(false);
    expect(result.current.isBackOnline).toBe(false);

    act(() => changeOnlineStatus(true));

    expect(result.current.isOnline).toBe(true);
    expect(result.current.isBackOnline).toBe(true);

    act(() => void jest.advanceTimersByTime(3000));

    expect(result.current.isBackOnline).toBe(false);
  });
});
