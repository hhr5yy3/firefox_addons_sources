import { useContext, FC, ReactNode } from 'react';
import { Button, Image } from '@nord/ui';
import { FormattedMessage } from 'react-intl';
import { AuthContext } from '@extension/app/context';
import { UpgradeToShare } from '@extension/app/components';
import { api } from '@extension/app/api';
import useSearchParam from '@extension/app/hooks/useSearchParam';
import { AddMenu } from '@extension/app/components/AddMenu/AddMenu';
import cx from 'classnames';
import { VaultType } from '@common/constants';
import emptyStateLoginsIcon from '@icons/empty-state-logins.svg';
import emptyStateSecureNotesIcon from '@icons/empty-state-secure-notes.svg';
import emptyStateCreditCardsIcon from '@icons/empty-state-credit-cards.svg';
import emptyStatePersonalInfoIcon from '@icons/empty-state-personal-info.svg';
import emptyStateSharedItemsIcon from '@icons/empty-state-shared-items.svg';
import emptyStateTrashIcon from '@icons/empty-state-trash.svg';
import emptyStateHomeIcon from '@icons/empty-state-home.svg';

interface IEmptyVaultProps {
  search?: string;
  type: VaultType;
}

interface IError {
  icon?: string;
  message?: ReactNode;
  buttons?: ReactNode;
}

const EmptyVault: FC<IEmptyVaultProps> = ({ search, type }) => {
  const { subscriptionData } = useContext(AuthContext);
  const isFolderView = !!useSearchParam('folder');

  const primaryTextClassNames = 'text-lead color-primary font-bold mb-1 -letter-spacing-006';
  const secondaryTextClassNames = 'text-small color-primary-accent-1 mb-4 mx-2 -letter-spacing-014';
  const buttonClassNames = 'block rounded-full -letter-spacing-014px w-full';

  if (search) {
    return (
      <div className="p-2 text-center color-primary-accent-1">
        <FormattedMessage id="noResultsFoundFor" />
        <div className="break-all color-primary">
          &quot;
          {search}
          &quot;
        </div>
      </div>
    );
  }

  const error: IError = {};
  if (type === VaultType.Password) {
    error.icon = emptyStateLoginsIcon;
    error.message = (
      <>
        <span className={primaryTextClassNames}>
          <FormattedMessage id="emptyVaultPasswordPrimaryText" />
        </span>
        <div className={secondaryTextClassNames}>
          <FormattedMessage id="emptyVaultPasswordSecondaryText" />
        </div>
      </>
    );
    error.buttons = (
      <div className="flex flex-col justify-center">
        <Button
          size="small"
          color="teal"
          className={cx(buttonClassNames, 'mb-3')}
          onClick={() => api.extension.openDesktopApp({
            route: 'ADD_ITEM',
            args: [type],
          })}
        >
          <FormattedMessage id="addPassword" />
        </Button>

        <Button
          size="small"
          color="teal"
          className={buttonClassNames}
          onClick={() => api.extension.openDesktopApp({
            route: 'IMPORT',
          })}
        >
          <FormattedMessage id="importPasswords" />
        </Button>
      </div>
    );
  } else if (type === VaultType.Note) {
    error.icon = emptyStateSecureNotesIcon;
    error.message = (
      <>
        <span className={primaryTextClassNames}>
          <FormattedMessage id="emptyVaultNotesPrimaryText" />
        </span>
        <div className={secondaryTextClassNames}>
          <FormattedMessage id="emptyVaultNotesSecondaryText" />
        </div>
      </>
    );
    error.buttons = (
      <Button
        size="small"
        color="teal"
        className={buttonClassNames}
        onClick={() => api.extension.openDesktopApp({
          route: 'ADD_ITEM',
          args: [type],
        })}
      >
        <FormattedMessage id="addSecureNotes" />
      </Button>
    );
  } else if (type === VaultType.CreditCard) {
    error.icon = emptyStateCreditCardsIcon;
    error.message = (
      <>
        <span className={primaryTextClassNames}>
          <FormattedMessage id="emptyVaultCCPrimaryText" />
        </span>
        <div className={secondaryTextClassNames}>
          <FormattedMessage id="emptyVaultCCSecondaryText" />
        </div>
      </>
    );
    error.buttons = (
      <Button
        size="small"
        color="teal"
        className={buttonClassNames}
        onClick={() => api.extension.openDesktopApp({
          route: 'ADD_ITEM',
          args: [type],
        })}
      >
        <FormattedMessage id="addCreditCard" />
      </Button>
    );
  } else if (type === VaultType.PersonalInfo) {
    error.icon = emptyStatePersonalInfoIcon;
    error.message = (
      <>
        <span className={primaryTextClassNames}>
          <FormattedMessage id="emptyVaultPersonalPrimaryText" />
        </span>
        <div className={secondaryTextClassNames}>
          <FormattedMessage id="emptyVaultPersonalSecondaryText" />
        </div>
      </>
    );
    error.buttons = (
      <Button
        size="small"
        color="teal"
        className={buttonClassNames}
        onClick={() => api.extension.openDesktopApp({
          route: 'ADD_ITEM',
          args: [type],
        })}
      >
        <FormattedMessage id="addPersonalInfo" />
      </Button>
    );
  } else if (type === VaultType.Shared) {
    if (subscriptionData?.isPremium) {
      error.icon = emptyStateSharedItemsIcon;
      error.message = (
        <>
          <span className={primaryTextClassNames}>
            <FormattedMessage id="emptyVaultSharedPrimaryText" />
          </span>
          <div className={secondaryTextClassNames}>
            <FormattedMessage id="emptyVaultSharedSecondaryText" />
          </div>
        </>
      );
    } else {
      return <UpgradeToShare />;
    }
  } else if (type === VaultType.Trash) {
    error.icon = emptyStateTrashIcon;
    error.message = (
      <>
        <span className={primaryTextClassNames}>
          <FormattedMessage id="emptyTrashPrimaryText" />
        </span>
        <div className={secondaryTextClassNames}>
          <FormattedMessage id="emptyTrashSecondaryText" />
        </div>
      </>
    );
  } else if (type === VaultType.Folder) {
    error.message = (
      <>
        <span className={primaryTextClassNames}>
          <FormattedMessage id="emptyFolderPrimaryText" />
        </span>
        <div className={secondaryTextClassNames}>
          <FormattedMessage id="emptyFolderSecondaryText" />
        </div>
      </>
    );
  } else {
    error.icon = emptyStateHomeIcon;
    error.message = (
      <>
        <span className={primaryTextClassNames}>
          <FormattedMessage id="emptyVaultPrimaryText" />
        </span>
        <div className={secondaryTextClassNames}>
          <FormattedMessage id="emptyVaultSecondaryText" />
        </div>
      </>
    );
    error.buttons = (
      <div className="flex flex-col justify-center">
        <AddMenu isButtonWithText />
        <Button
          size="small"
          variant="outlined"
          className={cx('mt-3', buttonClassNames)}
          onClick={() => {
            api.extension.openDesktopApp({
              route: 'IMPORT',
            });
          }}
        >
          <FormattedMessage id="importItems" />
        </Button>
      </div>
    );
  }

  return (
    <div className="px-8 pt-14 items-center text-center flex flex-col">
      {error.icon && (
        <div className={cx('flex justify-center', [VaultType.Shared, VaultType.Trash].includes(type) && 'mt-13')}>
          <Image
            src={error.icon}
            className="h-88px"
            alt="error"
            noLazy
          />
        </div>
      )}
      <div className={cx('mt-3 mb-1', type === VaultType.Folder && isFolderView && 'mt-24')}>{error.message}</div>
      <div className="w-full">{error.buttons}</div>
    </div>
  );
};

export default EmptyVault;
