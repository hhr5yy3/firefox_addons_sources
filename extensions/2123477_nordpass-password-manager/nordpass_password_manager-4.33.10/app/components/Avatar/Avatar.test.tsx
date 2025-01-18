import { Size } from '@common/constants/size';
import { createListener } from '@extension/app/api/createListener';
import { Avatar, IAvatarProps } from '@extension/app/components/Avatar/Avatar';
import { useExtensionFeature } from '@extension/app/utils/getIsFeatureEnabled';
import { act, fireEvent, render } from '@testing-library/react';
import { wrapWithProviders } from '@tests/utils';
import { Notification } from '@common/constants/notification';

jest.mock('@extension/app/api/createListener');
jest.mock('@extension/app/utils/getIsFeatureEnabled');

describe('<Avatar/>', () => {
  const avatarId = 'profile-avatar__image';
  const avatar = 'avatar';
  const listeners: Array<any> = [];

  const triggerNotification = (data: any) => listeners.forEach(({ handler }) => handler(data));

  (createListener as jest.Mock).mockImplementation((handler, type) => {
    listeners.push({ handler, type });
    return jest.fn();
  });

  const setup = (avatar: IAvatarProps['avatar']) => render(wrapWithProviders(<Avatar avatar={avatar} email="test@test.com" size={Size.Medium} />));

  it('should show image when avatar is present and feature toggle is on', async () => {
    (useExtensionFeature as jest.Mock).mockReturnValue(true);

    const { findByTestId } = setup(avatar);
    const avatarImg = await findByTestId(avatarId);

    expect(avatarImg).toBeVisible();
  });

  it('should show initials if avatar is not present', async () => {
    const { findByText } = setup(null);

    const initials = await findByText('te');
    expect(initials).toBeVisible();
  });

  it('should show initials if feature toggle is off', async () => {
    (useExtensionFeature as jest.Mock).mockReturnValue(false);
    const { findByText } = setup(avatar);

    const initials = await findByText('te');
    expect(initials).toBeVisible();
  });

  it('should show initials when image failed to load', async () => {
    (useExtensionFeature as jest.Mock).mockReturnValue(true);

    const { findByText, findByTestId } = setup(avatar);

    fireEvent.error(await findByTestId(avatarId));

    const initials = await findByText('te');
    expect(initials).toBeVisible();
  });

  it('should show image when user is back online', async () => {
    (useExtensionFeature as jest.Mock).mockReturnValue(true);

    const { findByText, findByTestId } = setup(avatar);

    fireEvent.error(await findByTestId(avatarId));

    const initials = await findByText('te');
    expect(initials).toBeVisible();

    act(() => triggerNotification({
      id: 0,
      type: Notification.OnlineStatusChange,
      status: true,
    }));

    const avatarImg = await findByTestId(avatarId);
    expect(avatarImg).toBeVisible();
  });
});
