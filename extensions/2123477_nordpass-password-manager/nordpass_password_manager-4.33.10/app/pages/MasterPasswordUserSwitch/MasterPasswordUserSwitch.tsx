import { Link } from 'react-router-dom-v5-compat';
import { Avatar } from '@extension/app/components/Avatar/Avatar';
import Back from '@common/components/Back';
import { Loader } from '@common/components/Loader/Loader';
import { ExtensionAction } from '@common/constants/action';
import { noOp } from '@common/constants/function';
import { Size } from '@common/constants/size';
import useAction from '@common/hooks/useAction/useAction';
import useQuery from '@common/hooks/useQuery/useQuery';
import { api } from '@extension/app/api';
import { AuthContext } from '@extension/app/context';
import { useAvatar } from '@extension/app/hooks/useAvatar';
import BrowserApi from '@extension/browser/browserApi';
import { ROUTES } from '@extension/common/constants';
import { Button } from '@nord/ui';
import { memo, useContext, useEffect, useMemo, useState, FC } from 'react';
import { FormattedMessage } from 'react-intl';
import Tooltip from '@common/components/Tooltip/Tooltip';
import { sendMetric } from '@common/utils/sendMetric';
import { Metric, MetricType } from '@common/constants/metrics';
import AccountSwitch from '../Profile/components/AccountSwitch/AccountSwitch';

const UserSwitch: FC = () => {
  const { email } = useContext(AuthContext);
  const [uuid, setUUID] = useState<string>();
  const avatar = useAvatar();

  const {
    data: userAccounts = [],
    refetch: refetchAccount,
    errorMessage,
    isLoading,
  } = useQuery(api.account.getAccountList);

  const otherAccounts = useMemo(
    () => userAccounts.filter(acc => acc.email !== email),
    [userAccounts, email],
  );

  useEffect(() => {
    setUUID(userAccounts.find(acc => acc.email === email)?.uuid);
  }, [userAccounts, email]);

  const handleLogout = async () => {
    sendMetric(api, Metric.Logout, MetricType.Intent);
    if (!uuid) {
      return;
    }

    try {
      const { uuid } = await BrowserApi.sendMessage({ type: ExtensionAction.ExtensionGetNextAccountUUID });
      await api.account.accountSwitch(uuid);
    } catch { /* intentional ignore */ } finally {
      await api.account.accountLogout(uuid, userAccounts.length < 2).catch(noOp);
      refetchAccount();
    }
  };

  const handleRemove = async () => {
    sendMetric(api, Metric.Logout, MetricType.Intent);
    if (!uuid) {
      return;
    }

    try {
      await api.account.accountLogout(uuid, true);
      refetchAccount();
    } catch { /* ignore error */ } finally {
      refetchAccount();
    }
  };

  const { isLoading: isLoggingOut, action: logoutCurrent } = useAction(handleLogout);
  const { isLoading: isRemovingCurrent, action: removeCurrent } = useAction(handleRemove);

  return (
    <div className="flex flex-1 flex-col mt-14 overflow-y-hidden">
      <Back component={Link} to={ROUTES.VALIDATE_MASTER} />
      <div className="px-8">
        <Avatar
          avatar={avatar}
          email={email}
          size={Size.ExtraLarge}
          className="inline-block"
        />

        <Tooltip id="email" showOnHover>
          {email}
        </Tooltip>
        <p data-tip-email className="mt-3 color-primary truncate">{email}</p>

        <span className="pt-4 pb-6">
          <Button
            variant="outlined"
            className="w-full mt-3 text-small rounded-full border-primary-accent-13"
            disabled={isRemovingCurrent}
            onClick={removeCurrent}
          >
            <FormattedMessage id="remove" />
          </Button>

          <Button
            variant="outlined"
            className="w-full mt-3 text-small rounded-full border-primary-accent-13"
            disabled={isLoggingOut}
            onClick={logoutCurrent}
          >
            <span className="text-red"><FormattedMessage id="logOut" /></span>

          </Button>
        </span>
      </div>

      <div className="border-t border-primary-accent-1 divider mt-6 mb-4" />

      {isLoading ?
        (<div className="flex justify-center"><Loader size={Size.Large} /></div>) :
        (<AccountSwitch accounts={otherAccounts} refetch={refetchAccount} error={errorMessage} />)
      }

    </div>
  );
};

export default memo(UserSwitch);
