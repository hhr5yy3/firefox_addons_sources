import { TSendMessage } from '@common/contracts/contracts';
import ExtensionAPI from '~/api/ExtensionAPI';
import ItemAPI from '~/api/ItemAPI';
import OrganizationAPI from '~/api/OrganizationAPI';
import ShareAPI from '~/api/ShareAPI';
import UserAPI from '~/api/UserAPI';
import AccountAPI from '~/api/AccountAPI';
import ActionAPI from '~/api/ActionAPI';
import AppAPI from '~/api/AppAPI';
import PasswordAPI from '~/api/PasswordAPI';
import AutoLockAPI from '~/api/AutoLockAPI';

export const sendMessage = jest.fn(() => new Promise<undefined>(resolve => resolve(undefined))) as TSendMessage;
export const createListener = jest.fn(() => jest.fn());
export const logMessage = jest.fn();

export const api = {
  user: new UserAPI(sendMessage, logMessage),
  account: new AccountAPI(sendMessage, logMessage),
  organization: new OrganizationAPI(sendMessage, logMessage),
  share: new ShareAPI(sendMessage, logMessage),
  item: new ItemAPI(sendMessage, logMessage),
  extension: new ExtensionAPI(sendMessage, logMessage),
  action: new ActionAPI(sendMessage, logMessage),
  app: new AppAPI(sendMessage, logMessage),
  password: new PasswordAPI(sendMessage, logMessage),
  autoLock: new AutoLockAPI(sendMessage, logMessage),
};
