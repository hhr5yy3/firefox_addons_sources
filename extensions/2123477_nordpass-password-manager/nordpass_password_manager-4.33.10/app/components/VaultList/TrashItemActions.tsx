import { FC } from 'react';
import recoverIcon from '@icons/24/trash-recover.svg';
import trashIcon from '@icons/24/trash-black.svg';
import { useIntl } from 'react-intl';
import ActionButton from '@common/components/ActionButton/ActionButton';
import { deleteItem, restoreItem } from '@extension/app/api/VaultApi';
import ConfirmAction from '@extension/app/components/ConfirmAction/ConfirmAction';
import history from '@extension/app/utils/history';
import { IItem } from '@common/interfaces';

interface ITrashItemActions {
  item: IItem;
  shouldGoBack?: boolean;
}

const TrashItemActions: FC<ITrashItemActions> = ({ item, shouldGoBack = false }) => {
  const { formatMessage } = useIntl();

  const goBack = () => {
    if (shouldGoBack) {
      history.goBack();
    }
  };

  return (
    <div className="flex">
      <ActionButton
        className="mr-2"
        tooltipText={formatMessage({ id: 'restore' })}
        tooltipId={`restore-${item.uuid}`}
        svgIcon={recoverIcon}
        onClick={async () => {
          await restoreItem(item.uuid);
          goBack();
        }}
      />
      <ConfirmAction
        button={props => (
          <ActionButton
            svgIcon={trashIcon}
            tooltipText={formatMessage({ id: 'delete' })}
            tooltipId={`delete-${item.uuid}`}
            className="icon-fill-red"
            {...props}
          />
        )}
        header={formatMessage({ id: 'deleteItemModalHeader' })}
        content={formatMessage({ id: 'deleteItemModalContent' })}
        action={async () => {
          await deleteItem(item.uuid);
        }}
        actionText={formatMessage({ id: 'delete' })}
      />
    </div>
  );
};

export default TrashItemActions;
