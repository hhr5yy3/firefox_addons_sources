/* eslint-disable @typescript-eslint/naming-convention */

import { useHandleVaultChange } from '@extension/app/pages/ViewItem/hooks/useHandleVaultChange';
import { FC, ReactNode, useCallback, useEffect, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createCopyAction } from '@extension/app/pages/ViewItem/utils/createAction';
import ViewField from '@extension/app/pages/ViewItem/components/ViewField/ViewField';
import ViewItemsHeader from '@extension/app/pages/ViewItem/components/ViewItemHeader/ViewItemHeader';
import { getItemSecretChanges, getSecret } from '@extension/app/api/VaultApi';
import { INoteItem } from '@common/contracts/contracts';
import { useRefState } from '@common/hooks/useRefState';
import ViewItemSelectableValue from './viewItemSelectableValue';

interface IViewNote {
  item: INoteItem;
  sharedWith: ReactNode;
}

const ViewNote: FC<IViewNote> = ({ item, sharedWith }) => {
  const { formatMessage } = useIntl();
  const [note, setNote] = useRefState<string>();

  const { folder_name, uuid } = item;

  const noteActions = useMemo(() => [createCopyAction({
    itemUuid: uuid,
    actionId: 'copy-note',
    value: note,
    actionText: <FormattedMessage id="secureNoteCopied" />,
  })], [note, uuid]);

  const getNote = useCallback(async () => {
    setNote(await getSecret(uuid));
  }, [setNote, uuid]);

  useEffect(() => {
    getNote();
  }, [getNote]);

  const onVaultChange = async () => setNote(await getItemSecretChanges(uuid));
  useHandleVaultChange(item, uuid, onVaultChange);

  return (
    <>
      <ViewItemsHeader item={item} sharedWith={sharedWith} />

      <div className="px-4 pb-6">
        {note && (
          <ViewField
            label={formatMessage({ id: 'secureNote' })}
            value={<ViewItemSelectableValue className="whitespace-pre-wrap break-word w-full" value={note} />}
            displayInvisibleAction
            actions={noteActions}
          />
        )}

        {folder_name && (
          <ViewField
            label={formatMessage({ id: 'folder' })}
            value={<ViewItemSelectableValue className="whitespace-pre-wrap break-word w-full" value={folder_name} />}
          />
        )}
      </div>
    </>
  );
};

export default ViewNote;
