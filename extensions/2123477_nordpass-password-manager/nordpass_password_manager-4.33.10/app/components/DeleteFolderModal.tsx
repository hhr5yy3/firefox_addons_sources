import { deleteFolder } from '@extension/app/api/VaultApi';
import { useContext, useState, useMemo, FC, useCallback } from 'react';
import Modal from 'react-modal';
import { Button, Checkbox } from '@nord/ui';
import { ButtonProps } from '@nord/ui/lib/Button/interface';
import { FormattedMessage } from 'react-intl';
import closeIcon from '@icons/close.svg';
import { api } from '@extension/app/api';
import { VaultContext } from '@extension/app/context';
import { IItem } from '@common/interfaces';
import ActionButton from '@common/components/ActionButton/ActionButton';
import ErrorBlock from '@common/components/ErrorBlock/ErrorBlock';
import useAction from '@common/hooks/useAction/useAction';
import { Loader } from '@common/components/Loader/Loader';
import { Size } from '@common/constants/size';

export interface IDeleteFolderModalProps {
  button: FC<Omit<ButtonProps, 'children'>>;
  folderId: string;
}

const DeleteFolderModal: FC<IDeleteFolderModalProps> = ({ button: DeleteButton, folderId }) => {
  const [isOpen, setOpen] = useState(false);
  const [shouldDeleteItems, setShouldDeleteItems] = useState(false);

  const { vaultItems } = useContext(VaultContext);
  const folderItems: Array<IItem> = useMemo(
    () => vaultItems.filter(item => item.folder_id === folderId),
    [vaultItems, folderId],
  );

  const handleDeleteFolder = useCallback(async () => {
    if (shouldDeleteItems) {
      const items = folderItems.filter(({ shared }) => shared);
      if (items.length) {
        await api.share.removeShares(items);
      }
    }

    await deleteFolder(folderId, shouldDeleteItems);
  }, [shouldDeleteItems, folderId, folderItems]);

  const {
    isLoading,
    errorMessage,
    action,
  } = useAction(handleDeleteFolder, { onSuccess: () => setOpen(false) });

  const handleDeleteButtonClick = () => folderItems.length > 0 ? setOpen(true) : action();

  return (
    <>
      <DeleteButton onClick={handleDeleteButtonClick} />
      {isOpen && (
        <Modal
          isOpen
          onRequestClose={() => setOpen(false)}
          shouldCloseOnEsc
          ariaHideApp={false}
          shouldCloseOnOverlayClick
          contentLabel="Confirmation modal"
          className="modal outline-none bg-primary rounded font-medium p-6 max-w-350"
          overlayClassName="modal-overlay"
        >
          <div className="relative">
            <div className="flex justify-between items-center mb-5">
              <h1 className="block color-primary font-bolder -letter-spacing-002 text-20px">
                <FormattedMessage id="deleteFolderQuestion" />
              </h1>

              <ActionButton svgIcon={closeIcon} onClick={() => setOpen(false)} />
            </div>

            {folderItems.length > 0 && (
              <>
                <span className="block color-primary text-small leading-tight">
                  <FormattedMessage id="deleteFolderText" />
                </span>
                <Checkbox
                  color="teal"
                  className="my-4 items-center"
                  onChange={() => setShouldDeleteItems(!shouldDeleteItems)}
                  label={
                    <span className="block -ml-1 color-primary text-small leading-tight">
                      <FormattedMessage id="moveItemsFromFolderToTrash" />
                    </span>
                  }
                />
              </>
            )}
            <ErrorBlock className="mt-2" error={errorMessage} />
            <div className="mt-6 text-right">
              <Button
                size="small"
                variant="outlined"
                disabled={isLoading}
                className="text-red rounded-full"
                onClick={action}
              >
                <FormattedMessage id="delete" />
                {isLoading && <Loader size={Size.Small} className="ml-2" />}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default DeleteFolderModal;
