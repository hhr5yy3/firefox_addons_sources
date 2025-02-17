import { FC, useCallback } from 'react';
import { Button, Image, Link, SVG } from '@nord/ui';
import { FormattedMessage, useIntl } from 'react-intl';
import { api } from '@extension/app/api';
import history from '@extension/app/utils/history';
import { declineShare } from '@extension/app/api/VaultApi';
import closeIcon from '@icons/close.svg';
import { IItem } from '@common/interfaces';
import { ICreditCardItem, IPasswordItem } from '@common/contracts/contracts';
import ErrorBlock from '@common/components/ErrorBlock/ErrorBlock';
import CreditCardIcon from '@common/components/CreditCardIcon/CreditCardIcon';
import PasswordIcon from '@common/components/PasswordIcon/PasswordIcon';
import FullscreenLoader from '@common/components/FullScreenLoader/FullscreenLoader';
import { logMessage } from '@extension/common/utils/log/logMessage';
import ConfirmAction from '@extension/app/components/ConfirmAction/ConfirmAction';
import useLoaderLogging from '@common/hooks/useLoaderLogging/useLoaderLogging';
import useAction from '@common/hooks/useAction/useAction';
import useQuery from '@common/hooks/useQuery/useQuery';
import secureNoteIcon from '@icons/48/secure-note.svg';
import personalInfoIcon from '@icons/48/personal-info-ext.svg';
import sharedFolderIcon from '@icons/shared-folder46x36.svg';
import { getIsCreditCard, getIsNote, getIsPassword, getIsPersonalInfo, getIsSharedFolder } from '@common/utils/itemTypeGuards';

export interface IPendingItem {
  pendingItem: IItem;
  onClose?: () => void;
}

const PendingItem: FC<IPendingItem> = ({ pendingItem, onClose }) => {
  const { formatMessage } = useIntl();
  const getSharer = useCallback(() => api.share.getSharer(pendingItem.uuid), [pendingItem.uuid]);

  const { data: sharerEmail, isLoading: isSharerLoading, errorMessage: sharerError } = useQuery(getSharer);
  const { isLoading: isAcceptLoading, errorMessage: acceptError, action: accept } = useAction(api.share.accept);

  useLoaderLogging(isSharerLoading, logMessage, 'PendingItem:isSharerLoading');
  useLoaderLogging(isAcceptLoading, logMessage, 'PendingItem:isAcceptLoading');

  if (!pendingItem) {
    return null;
  }

  if (isSharerLoading || isAcceptLoading) {
    return <FullscreenLoader />;
  }

  return (
    <div className="h-full flex flex-col justify-center page-slide-in">
      <Link onClick={() => history.goBack()} className="p-4 color-primary-accent-1 hover:color-primary-accent-13">
        <SVG
          src={closeIcon}
          noLazy
          width={24}
          height={24}
        />
      </Link>

      <div className="max-w-650 flex-1 overflow-y-auto mx-auto pb-8 px-8 flex flex-col justify-center">
        <div className="items-center mb-4 flex flex-col">
          {getIsPassword(pendingItem) && (
            <PasswordIcon
              logMessage={logMessage}
              title={pendingItem.title}
              url={(pendingItem as IPasswordItem).url}
              className="rounded-image-8px item-image-48px text-h6"
              uuid={pendingItem.uuid}
            />
          )}
          {getIsNote(pendingItem) && (
            <div className="item-image-48px flex items-center justify-center">
              <Image className="w-full" src={secureNoteIcon} alt={pendingItem.title} />
            </div>
          )}
          {getIsCreditCard(pendingItem) && (
            <CreditCardIcon
              className="rounded-image-8px item-image-48px"
              type={(pendingItem as ICreditCardItem).card_type}
            />
          )}
          {getIsPersonalInfo(pendingItem) && (
            <div className="item-image-48px flex items-center justify-center">
              <Image className="w-full" src={personalInfoIcon} alt={pendingItem.title} />
            </div>
          )}
          {getIsSharedFolder(pendingItem) && (
            <div className="item-image-48px flex items-center justify-center">
              <Image className="w-full" src={sharedFolderIcon} alt={pendingItem.title} />
            </div>
          )}
          <span className="break-word w-full text-center mt-2 color-primary text-lead font-bolder">
            {pendingItem.title}
          </span>
          <span className="color-primary-accent-1 mt-2 text-center text-micro">
            <FormattedMessage
              id="pendingItemsUserShareItemWithYou"
              values={{ sharerEmail: sharerEmail ?? formatMessage({ id: 'someone' }) }}
            />
          </span>
        </div>
        <ErrorBlock className="mb-2" error={sharerError || acceptError} />
        <div className="flex justify-center">
          <Button
            size="small"
            variant="outlined"
            className="rounded-full -letter-spacing-014px mr-3"
            onClick={() => accept([{ uuid: pendingItem.uuid, always: false }])}
          >
            <FormattedMessage id="accept" />
          </Button>
          <ConfirmAction
            button={({ onClick }) => (
              <Button
                size="small"
                variant="outlined"
                className="rounded-full -letter-spacing-014px text-red"
                data-testid="decline-button"
                onClick={onClick}
              >
                <FormattedMessage id="decline" />
              </Button>
            )}
            header={<FormattedMessage id="declineItemHeader" />}
            content={<FormattedMessage id="declineItemContent" />}
            action={async () => {
              declineShare(pendingItem.uuid);
              onClose?.();
            }}
            actionText={<FormattedMessage id="decline" />}
          />
        </div>
      </div>
    </div>
  );
};

export default PendingItem;
