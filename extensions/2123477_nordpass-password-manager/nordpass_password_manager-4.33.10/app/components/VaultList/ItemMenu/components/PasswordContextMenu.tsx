import { FC, memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { isFullAccess } from '@extension/app/utils/itemAccessUtils/itemAccessUtils';
import { IPasswordItem } from '@common/contracts/contracts';
import MenuItem from '@common/components/Menu/MenuItem';
import { copySecret, permittedCopyWithFeedback } from '@extension/app/components/VaultList/VaultListUtils';
import useDebouncedCopyActionLogger from '@common/hooks/useDebouncedCopyActionLogger/useDebouncedCopyActionLogger';
import { api } from '@extension/app/api';
import { CommonContextMenu } from './CommonContextMenu';

interface IPasswordItemContextMenu {
  item: IPasswordItem;
}

const PasswordContextMenu: FC<IPasswordItemContextMenu> = ({ item }) => {
  const isCopyPasswordEnabled = item.secret !== '0' && isFullAccess(item.acl);
  const logCopyAction = useDebouncedCopyActionLogger(api.action, item.uuid, true);

  const copyPassword = () => {
    logCopyAction();
    copySecret(item.uuid, <FormattedMessage id="passwordCopied" />);
  };

  const config = [
    {
      isActive: !!item.username,
      component: () => (
        <MenuItem
          key="copy-username"
          onClick={() => {
            permittedCopyWithFeedback(item.username as string, <FormattedMessage id="emailOrUserNameCopied" />);
            logCopyAction();
          }}
        >
          <FormattedMessage id="copyEmailUsername" />
        </MenuItem>
      ),
    },
    {
      isActive: isCopyPasswordEnabled,
      component: () => (
        <MenuItem
          key="coppy-password"
          onClick={copyPassword}
        >
          <FormattedMessage id="copyPassword" />
        </MenuItem>
      ),
    },
    {
      isActive: !!item.note,
      component: () => (
        <MenuItem
          key="copy-note"
          onClick={() => {
            logCopyAction();
            permittedCopyWithFeedback(item.note as string, <FormattedMessage id="noteCopied" />);
          }}
        >
          <FormattedMessage id="copyNote" />
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

export default memo(PasswordContextMenu);
