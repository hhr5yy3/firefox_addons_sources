/* eslint-disable @typescript-eslint/naming-convention */

import { ReactNode, FC, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ViewField from '@extension/app/pages/ViewItem/components/ViewField/ViewField';
import { createCopyAction } from '@extension/app/pages/ViewItem/utils/createAction';
import ViewFieldValue from '@extension/app/pages/ViewItem/components/ViewFieldValue/ViewFieldValue';
import ViewItemsHeader from '@extension/app/pages/ViewItem/components/ViewItemHeader/ViewItemHeader';
import { isPersonalInfoAddressPresent } from '@common/utils/isPersonalInfoAddressPresent/isPersonalInfoAddressPresent';
import { IPersonalInfoItem } from '@common/contracts/contracts';
import ViewItemSelectableValue from './viewItemSelectableValue';

interface IViewPersonalInfo {
  item: IPersonalInfoItem;
  sharedWith: ReactNode;
}

const getFullAddress = (item: IPersonalInfoItem) => {
  const {
    address1, address2, city, state, zip_code, country,
  } = item;
  return [address1, address2, city, state, zip_code, country].join('\n');
};

const ViewPersonalInfo: FC<IViewPersonalInfo> = ({ item, sharedWith }) => {
  const { formatMessage } = useIntl();
  const {
    address1, address2, city, state, zip_code, country, name, email, phone_number, note, folder_name, uuid,
  } = item;

  const address1Actions = useMemo(() => [createCopyAction({
    itemUuid: uuid,
    actionId: 'copy-address1',
    value: address1,
    actionText: <FormattedMessage id="addressLine1Copied" />,
  })], [address1, uuid]);

  const address2Actions = useMemo(() => [createCopyAction({
    itemUuid: uuid,
    actionId: 'copy-address2',
    value: address2,
    actionText: <FormattedMessage id="addressLine2Copied" />,
  })], [address2, uuid]);

  const cityActions = useMemo(() => [createCopyAction({
    itemUuid: uuid,
    actionId: 'copy-city',
    value: city,
    actionText: <FormattedMessage id="cityCopied" />,
  })], [city, uuid]);

  const stateActions = useMemo(() => [createCopyAction({
    itemUuid: uuid,
    actionId: 'copy-state',
    value: state,
    actionText: <FormattedMessage id="stateCopied" />,
  })], [state, uuid]);

  const zipActions = useMemo(() => [createCopyAction({
    itemUuid: uuid,
    actionId: 'copy-zip',
    value: zip_code,
    actionText: <FormattedMessage id="zipCodeCopied" />,
  })], [zip_code, uuid]);

  const countryActions = useMemo(() => [createCopyAction({
    itemUuid: uuid,
    actionId: 'copy-country',
    value: country,
    actionText: <FormattedMessage id="countryCopied" />,
  })], [country, uuid]);

  const nameActions = useMemo(() => [createCopyAction({
    itemUuid: uuid,
    actionId: 'copy-name',
    value: name,
    actionText: <FormattedMessage id="fullNameCopied" />,
  })], [name, uuid]);

  const emailActions = useMemo(() => [createCopyAction({
    itemUuid: uuid,
    actionId: 'copy-email',
    value: email,
    actionText: <FormattedMessage id="emailCopied" />,
  })], [email, uuid]);

  const phoneActions = useMemo(() => [createCopyAction({
    itemUuid: uuid,
    actionId: 'copy-phone',
    value: phone_number,
    actionText: <FormattedMessage id="phoneCopied" />,
  })], [phone_number, uuid]);

  const fullAddressActions = useMemo(() => [createCopyAction({
    itemUuid: uuid,
    actionId: 'copy-full-address',
    value: getFullAddress(item),
    actionMessage: formatMessage({ id: 'copyFullAddress' }),
    actionText: <FormattedMessage id="addressCopied" />,
  })], [formatMessage, item, uuid]);

  const noteActions = useMemo(() => [createCopyAction({
    itemUuid: uuid,
    actionId: 'copy-note',
    value: note,
    actionText: <FormattedMessage id="noteCopied" />,
  })], [note, uuid]);

  const addressItems = (
    <div className="flex flex-col">
      {address1 && <ViewFieldValue value={address1} actions={address1Actions} />}
      {address2 && <ViewFieldValue value={address2} actions={address2Actions} />}
      {city && <ViewFieldValue value={city} actions={cityActions} />}
      {state && <ViewFieldValue value={state} actions={stateActions} />}
      {zip_code && <ViewFieldValue value={zip_code} actions={zipActions} />}
      {country && <ViewFieldValue value={country} actions={countryActions} />}
    </div>
  );

  const isAddressPresent = isPersonalInfoAddressPresent(item);

  return (
    <>
      <ViewItemsHeader
        item={item}
        sharedWith={sharedWith}
      />

      <div className="mx-auto px-4 pb-6">
        {name && (
          <ViewField
            label={formatMessage({ id: 'fullName' })}
            value={<ViewItemSelectableValue className="whitespace-pre-wrap break-word w-full" value={name} />}
            displayInvisibleAction
            actions={nameActions}
          />
        )}

        {email && (
          <ViewField
            label={formatMessage({ id: 'email' })}
            value={<ViewItemSelectableValue className="whitespace-pre-wrap break-word w-full" value={email} />}
            displayInvisibleAction
            actions={emailActions}
          />
        )}

        {phone_number && (
          <ViewField
            label={formatMessage({ id: 'phone' })}
            value={<ViewItemSelectableValue className="whitespace-pre-wrap break-word w-full" value={phone_number} />}
            displayInvisibleAction
            actions={phoneActions}
          />
        )}

        {isAddressPresent && (
          <ViewField
            label={formatMessage({ id: 'address' })}
            value={addressItems}
            displayInvisibleAction
            isAddressField
            actions={fullAddressActions}
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

export default ViewPersonalInfo;
