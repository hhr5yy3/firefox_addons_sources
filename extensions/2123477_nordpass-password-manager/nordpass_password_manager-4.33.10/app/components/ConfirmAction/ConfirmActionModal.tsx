import { useEffect, useRef, useState, ReactNode, FC, MouseEvent as ReactMouseEvent, KeyboardEvent as ReactKeyboardEvent } from 'react';
import Modal from 'react-modal';
import * as closeIcon from '@icons/close.svg';

import { Button, Loader } from '@nord/ui';
import { FormattedMessage } from 'react-intl';
import ActionButton from '@common/components/ActionButton/ActionButton';

interface IConfirmActionModal {
  header: ReactNode;
  content: ReactNode;
  action: () => Promise<void>;
  actionText: ReactNode;
  onClose: (event?: ReactMouseEvent<Element, MouseEvent> | ReactKeyboardEvent<Element>) => void;
}

const ConfirmActionModal: FC<IConfirmActionModal> = ({
  header,
  content,
  action,
  actionText,
  onClose,
}) => {
  const [isLoading, setLoading] = useState(false);

  const didCancel = useRef(false);

  useEffect(() => () => {
    didCancel.current = true;
  }, []);

  const doAction = async () => {
    setLoading(true);
    await action();
    if (didCancel.current) return;
    setLoading(false);
    onClose();
  };

  return (
    <Modal
      isOpen
      onRequestClose={onClose}
      shouldCloseOnEsc
      ariaHideApp={false}
      contentLabel="Confirmation modal"
      className="modal outline-none bg-primary rounded color-primary-accent-8 font-medium max-w-500 mx-4 p-6"
      overlayClassName="modal-overlay"
    >

      <div className="flex justify-between items-center mb-5">
        <h1 className="block color-primary font-bolder -letter-spacing-002 text-20px">
          {header}
        </h1>

        <ActionButton
          svgIcon={closeIcon}
          onClick={onClose}
        />
      </div>

      <span className="block text-small leading-normal">
        {content}
      </span>

      <div className="mt-6 text-right flex-col">
        <Button
          size="small"
          className="rounded-full text-red w-full mb-2"
          variant="outlined"
          onClick={doAction}
          data-testid="modal-confirm-action"
        >
          {actionText}
          {isLoading && <Loader size="small" className="ml-3" />}
        </Button>
        <Button
          size="small"
          className="rounded-full w-full"
          variant="outlined"
          onClick={onClose}
        >
          <FormattedMessage id="cancel" />
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmActionModal;
