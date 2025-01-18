import Menu from '@common/components/Menu/Menu';
import MenuItem from '@common/components/Menu/MenuItem';
import { useMenuState } from '@common/components/Menu/useMenuState';
import SvgIcon from '@common/components/SvgIcon';
import { ROUTES } from '@common/constants';
import { ExtensionAction } from '@common/constants/action';

import { noOp } from '@common/constants/function';
import { Size } from '@common/constants/size';

import { IAccount } from '@common/interfaces/account';
import { AuthState } from '@common/store/reducers/authReducer/authConstants';
import { getLoginStateLabel } from '@common/utils/getLoginStateLabel';
import { api } from '@extension/app/api';
import { Avatar } from '@extension/app/components/Avatar/Avatar';
import history from '@extension/app/utils/history';
import BrowserApi from '@extension/browser/browserApi';

import * as moreIcon from '@icons/24/more.svg';
import { Button } from '@nord/ui';
import cx from 'classnames';
import { FC, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import Tooltip from '@common/components/Tooltip/Tooltip';
import { sendMetric } from '@common/utils/sendMetric';
import { Metric, MetricType } from '@common/constants/metrics';
import styles from './AccountButton.module.scss';

const menuItemProps = {
  className: 'w-full h-28px pl-3 text-left text-micro',
  colorClassName: 'color-red hover:bg-primary-accent-3',
};

interface IAccountButton extends IAccount {
  refetch: () => Promise<Array<IAccount> | undefined>;
  tooltipId: string;
}

const AccountButton: FC<IAccountButton> = ({
  email,
  avatar,
  uuid,
  state,
  provider,
  organization,
  refetch,
  tooltipId,
}) => {
  const { isOpen, close, toggleOpen } = useMenuState();

  const handleAccountClick = async () => {
    sendMetric(api, Metric.AccountSwitch, MetricType.Intent);
    await BrowserApi.sendMessage({ type: ExtensionAction.ExtensionSwitchAccount, uuid }).catch(noOp);
    history.push(ROUTES.VAULT);
  };

  const handleLogoutButtonClick = () => {
    sendMetric(api, Metric.Logout, MetricType.Intent);
    api.account.accountLogout(uuid).catch(noOp).finally(refetch);
  };

  const handleRemoveButtonClick = () => {
    sendMetric(api, Metric.Logout, MetricType.Intent);
    api.account.accountLogout(uuid, true).catch(noOp).finally(refetch);
  };

  const loginStateLabel = useMemo(
    () => getLoginStateLabel(state, provider, organization),
    [state, provider, organization],
  );

  return (
    <div
      tabIndex={0}
      role="button"
      data-testid="account-menu-button"
      className={cx(styles['account-button'], isOpen && 'bg-primary-accent-18', 'hover:bg-primary-accent-18 color-primary')}
    >
      <Avatar
        avatar={avatar}
        email={email}
        size={Size.Medium}
      />
      <button type="button" onClick={handleAccountClick} className="flex flex-1 flex-col overflow-hidden px-4">
        <div className="flex flex-1 flex-col text-left justify-center min-h-36px max-w-full overflow-hidden">
          <Tooltip id={tooltipId} showOnHover>
            {email}
          </Tooltip>
          <p {...{ [`data-tip-${tooltipId}`]: true }} className="text-micro truncate max-w-full font-medium truncate">{email}</p>
          <p className="text-grey-dark text-left text-nano truncate max-w-full">{loginStateLabel}</p>
        </div>
      </button>
      <Menu
        isOpen={isOpen}
        onClose={close}
        className={styles['account-button__menu']}
        button={
          <Button
            data-testid="account-options-button"
            className="inline-flex square p-0 rounded-full justify-center items-center bg-primary border-primary-accent-4 hover:border-primary-accent-4"
            size="small"
            variant="outlined"
            onClick={toggleOpen}
          >
            <SvgIcon
              src={moreIcon}
              className="nordpass-svg icon-color-primary"
              width={24}
              height={24}
            />
          </Button>
        }
      >
        <MenuItem
          {...menuItemProps}
          onClick={handleRemoveButtonClick}
        >
          <FormattedMessage id="remove" />
        </MenuItem>
        {state !== AuthState.Unauthenticated && (
          <MenuItem
            {...menuItemProps}
            onClick={handleLogoutButtonClick}
          >
            <FormattedMessage id="logOut" />
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default AccountButton;
