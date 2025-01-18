import { FC, memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { duplicatePersonalInfo } from '@extension/app/api/VaultApi';
import { IPersonalInfoItem } from '@common/contracts/contracts';
import MenuItem from '@common/components/Menu/MenuItem';
import { CommonContextMenu } from './CommonContextMenu';

interface IPersonalInfoItemContextMenu {
  item: IPersonalInfoItem;
}

const PersonalInfoContextMenu: FC<IPersonalInfoItemContextMenu> = ({ item }) => {
  const config = [
    {
      isActive: true,
      component: () => (
        <MenuItem key="duplicate" onClick={() => duplicatePersonalInfo(item)}>
          <FormattedMessage id="duplicate" />
        </MenuItem>
      ),
    },
  ];

  return (
    <CommonContextMenu
      item={item}
      additionalActionsConfig={config}
    />
  );
};

export default memo(PersonalInfoContextMenu);
