import { AccessLevel } from '@common/interfaces';

export const isLimitedAccess = (acl?: AccessLevel) => acl === AccessLevel.ReadOnly;

export const isFullAccess = (acl?: AccessLevel) => acl ? !isLimitedAccess(acl) : true;
