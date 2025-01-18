/* eslint-disable @typescript-eslint/naming-convention */

import { useHandleVaultChange } from '@extension/app/pages/ViewItem/hooks/useHandleVaultChange';
import { ReactNode, FC, useState, useMemo, useEffect, useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { getItemSecretChanges, getSecret } from '@extension/app/api/VaultApi';
import { createCopyAction, createShowHideAction } from '@extension/app/pages/ViewItem/utils/createAction';
import ViewField from '@extension/app/pages/ViewItem/components/ViewField/ViewField';
import ViewItemsHeader from '@extension/app/pages/ViewItem/components/ViewItemHeader/ViewItemHeader';
import { ICreditCardItem } from '@common/contracts/contracts';
import { isLimitedAccess } from '@extension/app/utils/itemAccessUtils/itemAccessUtils';
import { getIsFeatureEnabled } from '@extension/app/utils/getIsFeatureEnabled';
import { FeatureFlag } from '@common/constants/featureFlag';
import { useRefState } from '@common/hooks/useRefState';
import { formatCardNumber } from '@common/utils/creditCard/creditCard';
import ViewItemSelectableValue from './viewItemSelectableValue';

interface IViewCreditCard {
  item: ICreditCardItem;
  sharedWith: ReactNode;
}

const ViewCreditCard: FC<IViewCreditCard> = ({ item, sharedWith }) => {
  const [showCVC, setShowCVC] = useState(false);
  const [isPinCodeEnabled, setIsPinCodeEnabled] = useState(false);
  const [showPIN, setShowPIN] = useState(false);
  const { formatMessage } = useIntl();
  const [cvcValue, setCvcValue] = useRefState<string>();
  const [cardNumberValue, setCardNumberValue] = useRefState<string>();
  const [pinValue, setPinValue] = useRefState<string>();
  const isAccessLimited = isLimitedAccess(item.acl);

  const { uuid, cardholder_name, expiry_date, zip_code, note, folder_name } = item;

  const getCardDetails = useCallback(async () => {
    const { cvc, card_number, pin } = await getSecret(uuid);
    setCvcValue(cvc);
    setPinValue(pin);
    setCardNumberValue(card_number);
  }, [setCardNumberValue, setCvcValue, setPinValue, uuid]);

  useEffect(() => {
    getIsFeatureEnabled(FeatureFlag.CreditCardPin).then(setIsPinCodeEnabled);
  }, []);

  useEffect(() => {
    getCardDetails();
  }, [getCardDetails]);

  const onVaultChange = async () => {
    const { cvc, card_number, pin } = await getItemSecretChanges(uuid);
    setCvcValue(cvc);
    setPinValue(pin);
    setCardNumberValue(card_number);
  };

  useHandleVaultChange(item, uuid, onVaultChange);

  const cardholderActions = useMemo(() => [createCopyAction({
    actionId: 'copy-cardholder-name',
    value: cardholder_name,
    itemUuid: uuid,
    actionText: <FormattedMessage id="cardHolderNameCopied" />,
  })], [cardholder_name, uuid]);

  const cardNumberActions = useMemo(() => [createCopyAction({
    itemUuid: uuid,
    actionId: 'copy-card-number',
    value: cardNumberValue,
    actionText: <FormattedMessage id="cardNumberCopied" />,
  })], [cardNumberValue, uuid]);

  const cvcActions = useMemo(
    () => [
      createShowHideAction({
        actionId: `${showCVC ? 'hide' : 'show'}-cvc`,
        value: showCVC,
        onClick: () => setShowCVC(prev => !prev),
        isLimitedAccess: isAccessLimited,
        itemUuid: uuid,
      }),
      createCopyAction({
        actionId: 'copy-cvc',
        value: cvcValue,
        isLimitedAccess: isAccessLimited,
        itemUuid: uuid,
        actionText: <FormattedMessage id="cvvCopied" />,
      }),
    ],
    [cvcValue, showCVC, isAccessLimited, uuid],
  );

  const pinActions = useMemo(
    () => [createShowHideAction({
      actionId: `${showPIN ? 'hide' : 'show'}-pin`,
      value: showPIN,
      onClick: () => setShowPIN(prev => !prev),
      isLimitedAccess: isAccessLimited,
      itemUuid: uuid,
    })],
    [showPIN, isAccessLimited, uuid],
  );

  const expDateActions = useMemo(() => [createCopyAction({
    itemUuid: uuid,
    actionId: 'copy-exp-date',
    value: expiry_date,
    actionText: <FormattedMessage id="expirationDateCopied" />,
  })], [expiry_date, uuid]);

  const zipActions = useMemo(() => [createCopyAction({
    itemUuid: uuid,
    actionId: 'copy-zip',
    value: zip_code,
    actionText: <FormattedMessage id="zipCodeCopied" />,
  })], [uuid, zip_code]);

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
        {cardholder_name && (
          <ViewField
            label={formatMessage({ id: 'cardholderName' })}
            value={<ViewItemSelectableValue className="truncate" value={cardholder_name} />}
            actions={cardholderActions}
          />
        )}

        {cardNumberValue && (
          <ViewField
            label={formatMessage({ id: 'cardNumber' })}
            value={<ViewItemSelectableValue className="truncate" value={formatCardNumber(cardNumberValue)} />}
            actions={cardNumberActions}
          />
        )}

        {expiry_date && (
          <ViewField
            label={formatMessage({ id: 'expirationDate' })}
            value={<ViewItemSelectableValue className="truncate" value={expiry_date} />}
            actions={expDateActions}
          />
        )}

        {cvcValue && (
          <ViewField
            label={formatMessage({ id: 'securityCode' })}
            value={<ViewItemSelectableValue className="overflow-hidden break-word" value={showCVC ? cvcValue : '•••'} />}
            actions={cvcActions}
          />
        )}

        {isPinCodeEnabled && pinValue && (
          <ViewField
            label={formatMessage({ id: 'cardPin' })}
            value={<ViewItemSelectableValue className="overflow-hidden break-word" value={showPIN ? pinValue : '••••'} />}
            actions={pinActions}
          />
        )}

        {zip_code && (
          <ViewField
            label={formatMessage({ id: 'zipOrPostalCode' })}
            value={<ViewItemSelectableValue className="truncate" value={zip_code} />}
            actions={zipActions}
          />
        )}

        {folder_name && (
          <ViewField
            label={formatMessage({ id: 'folder' })}
            value={<ViewItemSelectableValue className="whitespace-pre-wrap break-word w-full" value={folder_name} />}
          />
        )}

        {note && (
          <ViewField
            label={formatMessage({ id: 'note' })}
            value={<ViewItemSelectableValue className="whitespace-pre-wrap break-word w-full" value={note} />}
            displayInvisibleAction
            actions={noteActions}
          />
        )}
      </div>
    </>
  );
};

export default ViewCreditCard;
