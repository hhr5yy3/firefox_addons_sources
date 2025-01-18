/* eslint-disable @typescript-eslint/naming-convention */
import { useHandleVaultChange } from '@extension/app/pages/ViewItem/hooks/useHandleVaultChange';
import { ReactNode, FC, useState, useMemo, useEffect, useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import PasswordStrengthMeter from '@common/components/PasswordStrengthMeter/PasswordStrengthMeter';
import { isLimitedAccess } from '@extension/app/utils/itemAccessUtils/itemAccessUtils';
import ViewField, { IAction } from '@extension/app/pages/ViewItem/components/ViewField/ViewField';
import {
  createCopyAction,
  createLaunchAction,
  createShowHideAction,
} from '@extension/app/pages/ViewItem/utils/createAction';
import { ActionType } from '@extension/app/pages/ViewItem/constants/constants/ActionType';
import { usePasswordPolicy } from '@extension/app/context/PasswordPolicyContext';
import validURL from '@extension/app/utils/validUrl/validUrl';
import { getStylizedPassword } from '@common/utils/getStylizedPassword';
import { getItemSecretChanges, getSecret } from '@extension/app/api/VaultApi';
import ViewItemsHeader from '@extension/app/pages/ViewItem/components/ViewItemHeader/ViewItemHeader';
import { IPasswordItem } from '@common/contracts/contracts';
import { UserAction } from '@common/constants/userAction';
import { useRefState } from '@common/hooks/useRefState';
import ViewItemSelectableValues from '../viewItemSelectableValue';

interface IViewPassword {
  item: IPasswordItem;
  sharedWith: ReactNode;
}

const ViewPassword: FC<IViewPassword> = ({ item, sharedWith }) => {
  const { formatMessage } = useIntl();
  const [showPassword, setShowPassword] = useState(false);
  const { checkWithPolicy } = usePasswordPolicy();
  const [password, setPassword] = useRefState<string>();

  const { uuid, username, url, note, folder_name, acl } = item;

  const getPassword = useCallback(async () => {
    setPassword(await getSecret(uuid));
  }, [setPassword, uuid]);

  useEffect(() => {
    getPassword();
  }, [getPassword]);

  const onVaultChange = async () => setPassword(await getItemSecretChanges(uuid));
  useHandleVaultChange(item, uuid, onVaultChange);

  const usernameActions = useMemo<Array<IAction>>(
    () => [
      createCopyAction({
        itemUuid: uuid,
        actionId: 'copy-username',
        value: username,
        actionText: <FormattedMessage id="emailOrUserNameCopied" />,
      }),
    ],
    [username, uuid],
  );

  const passwordActions = useMemo<Array<IAction>>(
    () => [
      createShowHideAction({
        itemUuid: uuid,
        actionId: `${showPassword ? ActionType.Hide : ActionType.Show}-pass`,
        value: showPassword,
        onClick: async () => setShowPassword(prev => !prev),
        isLimitedAccess: isLimitedAccess(acl),
      }),
      createCopyAction({
        itemUuid: uuid,
        actionId: 'copy-pass',
        value: password,
        isLimitedAccess: isLimitedAccess(acl),
        trackingAction: { action: UserAction.ExtTapCopyPasswordFromItem, firstSession: false },
        actionText: <FormattedMessage id="passwordCopied" />,
      }),
    ],
    [showPassword, acl, password, uuid],
  );

  const urlActions = useMemo<Array<IAction>>(() => [
    validURL(url) && createLaunchAction({ actionId: 'launch-url', url }),
  ].filter(Boolean) as Array<IAction>, [url]);

  const noteActions = useMemo(() => [createCopyAction({
    itemUuid: uuid,
    actionId: 'copy-note',
    value: note,
    actionText: <FormattedMessage id="noteCopied" />,
  })], [note, uuid]);

  return (
    <>
      <ViewItemsHeader item={item} sharedWith={sharedWith} />

      <div className="px-4 pb-6">
        {username && (
          <ViewField
            label={formatMessage({ id: 'emailOrUsername' })}
            value={<ViewItemSelectableValues className="truncate" value={username} />}
            actions={usernameActions}
          />
        )}

        {password && (
          <>
            <ViewField
              noMarginBottom
              label={formatMessage({ id: 'password' })}
              value={
                <ViewItemSelectableValues
                  className="overflow-hidden break-word"
                  data-testid="passwordValue"
                  value={showPassword ? getStylizedPassword(password) : '•••••••••••••••••'}
                />
              }
              actions={passwordActions}
            />

            <ViewField label={formatMessage({ id: 'passwordSecurity' })} isPasswordSecurityField>
              <PasswordStrengthMeter secret={password} checkWithPolicy={checkWithPolicy} />
            </ViewField>
          </>
        )}

        {url && (
          <ViewField
            label={formatMessage({ id: 'websiteUrl' })}
            value={<ViewItemSelectableValues className="truncate" value={url} />}
            actions={urlActions}
          />
        )}

        {folder_name && (
          <ViewField
            label={formatMessage({ id: 'folder' })}
            value={<ViewItemSelectableValues className="whitespace-pre-wrap break-word w-full" value={folder_name} />}
          />
        )}

        {note && (
          <ViewField
            label={formatMessage({ id: 'note' })}
            value={<ViewItemSelectableValues className="whitespace-pre-wrap break-word w-full" value={note} />}
            displayInvisibleAction
            actions={noteActions}
          />
        )}
      </div>
    </>
  );
};

export default ViewPassword;
