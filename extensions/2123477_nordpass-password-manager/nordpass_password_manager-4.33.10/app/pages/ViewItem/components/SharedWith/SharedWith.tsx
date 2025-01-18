import GroupAvatar from '@common/components/Avatar/GroupAvatar';
import OwnersAvatar from '@common/components/Avatar/OwnersAvatar';
import PlusAvatar from '@common/components/Avatar/PlusAvatar';
import { Size } from '@common/constants/size';
import { IItem } from '@common/interfaces';
import { api } from '@extension/app/api';
import { Avatar } from '@extension/app/components/Avatar/Avatar';
import useSharedContacts from '@extension/app/hooks/useSharedContacts';
import chevronRight from '@icons/24/chevron-right.svg';
import { Link, SVG } from '@nord/ui';
import { FC, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import useIsItemInSharedFolder from './useIsItemInSharedFolder';

import './SharedWith.scss';

const MAX_CONTACT_ICONS_TO_SHOW = 4;
const DEFAULT_AVATAR_PROPS = {
  className: 'mr-2 email-icon',
  size: Size.Small,
};

export interface ISharedUser {
  avatar: string | null;
  email: string;
  owner: boolean;
  is_owners?: boolean;
}

export interface ISharedWithProps {
  item: IItem;
}

const SharedWith: FC<ISharedWithProps> = ({ item }) => {
  const { sharedUsers, sharedGroups } = useSharedContacts(item);
  const sharedContacts = useMemo(() => ([...sharedUsers, ...sharedGroups]), [sharedUsers, sharedGroups]);
  const contactIcons = useMemo(
    () => sharedContacts
      .slice(0, MAX_CONTACT_ICONS_TO_SHOW)
      .map((sharedContact, index) => {
        if (index < sharedUsers.length) {
          const user = sharedContact as ISharedUser;

          if (user.is_owners) {
            return <OwnersAvatar key={index} {...DEFAULT_AVATAR_PROPS} />;
          }

          return (
            <Avatar
              key={index}
              avatar={user.avatar}
              email={user.email}
              {...DEFAULT_AVATAR_PROPS}
            />
          );
        }

        const group = sharedContact as IItem;

        return (
          <GroupAvatar
            key={group.title}
            title={group.title}
            uuid={group.uuid}
            {...DEFAULT_AVATAR_PROPS}
          />
        );
      }).reverse(),
    [sharedContacts, sharedUsers],
  );

  const isInSharedFolder = useIsItemInSharedFolder(item);

  if (isInSharedFolder || !sharedContacts.length) {
    return null;
  }

  return (
    <>
      <span className="text-micro text-grey-dark my-2 color-primary-accent-1">
        <FormattedMessage id="sharedWith" />
      </span>
      <Link
        className="shared-with flex flex-row-reverse text-nano mb-2"
        colorClassName="text-white"
        onClick={() => api.extension.openDesktopApp({
          route: 'SHARE_ITEM',
          args: [item.uuid],
        })}
      >

        <span className="shared-with__icon border border-primary-accent-4 hover:border-primary-accent-4 rounded-full color-primary-accent-6 flex items-center justify-center item-image-24px transition-colors duration-250 ease-out">
          <SVG src={chevronRight} noLazy />
        </span>
        {sharedContacts.length > MAX_CONTACT_ICONS_TO_SHOW && (
          <PlusAvatar size={Size.Small} className="email-icon mr-2" />
        )}
        {contactIcons}
      </Link>
    </>
  );
};

export default SharedWith;
