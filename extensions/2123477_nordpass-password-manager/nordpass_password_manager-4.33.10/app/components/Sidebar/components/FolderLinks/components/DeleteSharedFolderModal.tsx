import { useState, FC, useCallback } from 'react';
import Modal from 'react-modal';
import { Button } from '@nord/ui';
import { ButtonProps } from '@nord/ui/lib/Button/interface';
import { FormattedMessage } from 'react-intl';
import closeIcon from '@icons/close.svg';
import { api } from '@extension/app/api';
import ActionButton from '@common/components/ActionButton/ActionButton';
import ErrorBlock from '@common/components/ErrorBlock/ErrorBlock';
import useAction from '@common/hooks/useAction/useAction';
import { Size } from '@common/constants/size';
import { Loader } from '@common/components/Loader/Loader';

export interface IDeleteSharedFolderModal {
  button: FC<Omit<ButtonProps, 'children'>>;
  folderId: string;
}

const DeleteSharedFolderModal: FC<IDeleteSharedFolderModal> = ({ button: DeleteButton, folderId }) => {
  const [isOpen, setOpen] = useState(false);

  const handleDeleteFolder = useCallback(
    () => api.item.delete([{ uuid: folderId }], true),
    [folderId],
  );

  const {
    isLoading,
    errorMessage,
    action: deleteFolder,
  } = useAction(handleDeleteFolder, { onSuccess: () => setOpen(false) });

  const handleDeleteButtonClick = () => setOpen(true);

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

            <p className="text-small leading-normal -letter-spacing-014-px">
              <FormattedMessage id="deleteSharedFolderModalDescription" />
            </p>
            <ErrorBlock className="mt-2" error={errorMessage} />
            <div className="mt-6 text-right">
              <Button
                size="small"
                variant="outlined"
                disabled={isLoading}
                className="text-red rounded-full"
                onClick={deleteFolder}
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

export default DeleteSharedFolderModal;
