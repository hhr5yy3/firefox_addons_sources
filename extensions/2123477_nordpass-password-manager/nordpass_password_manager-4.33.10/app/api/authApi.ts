import { noOp } from '@common/constants/function';
import { api } from './index';

export const logout = () => {
  api.user.logout().catch(noOp);
};

export const lock = () => {
  api.user.lock().catch(noOp);
};

export const lockApp = () => {
  api.account.accountLockAll().catch(noOp);
};
