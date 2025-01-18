import { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { VaultType } from '@common/constants';

interface IHeaderTextProps {
  vaultType: string;
  folderTitle: string | undefined;
}

export const HeaderText: FC<IHeaderTextProps> = ({ vaultType, folderTitle },
) => {
  if (folderTitle) {
    return <span>{folderTitle}</span>;
  }

  switch (vaultType) {
    case VaultType.Password:
      return <FormattedMessage id="passwords" />;
    case VaultType.Note:
      return <FormattedMessage id="secureNotes" />;
    case VaultType.CreditCard:
      return <FormattedMessage id="creditCards" />;
    case VaultType.PersonalInfo:
      return <FormattedMessage id="personalInfo" />;
    case VaultType.Shared:
      return <FormattedMessage id="sharedItems" />;
    case VaultType.Trash:
      return <FormattedMessage id="trash" />;
    default:
      return <span>NordPass</span>;
  }
};
