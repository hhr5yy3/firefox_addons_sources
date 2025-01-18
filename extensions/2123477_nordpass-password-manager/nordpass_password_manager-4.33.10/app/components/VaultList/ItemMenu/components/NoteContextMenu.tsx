import { FC, memo } from 'react';
import { api } from '@extension/app/api';
import { FormattedMessage } from 'react-intl';
import { INoteItem } from '@common/contracts/contracts';
import MenuItem from '@common/components/Menu/MenuItem';
import { copySecret } from '@extension/app/components/VaultList/VaultListUtils';
import useDebouncedCopyActionLogger from '@common/hooks/useDebouncedCopyActionLogger/useDebouncedCopyActionLogger';
import { CommonContextMenu } from './CommonContextMenu';

interface INoteItemContextMenu {
  item: INoteItem;
}

const NoteContextMenu: FC<INoteItemContextMenu> = ({ item }) => {
  const logCopyAction = useDebouncedCopyActionLogger(api.action, item.uuid, true);

  const copyNote = async () => {
    logCopyAction();
    copySecret(item.uuid, <FormattedMessage id="noteCopied" />);
  };

  const config = [
    {
      isActive: !!(item.secret && item.secret !== '0'),
      component: () => (
        <MenuItem key="copy-note" onClick={copyNote}>
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

export default memo(NoteContextMenu);
