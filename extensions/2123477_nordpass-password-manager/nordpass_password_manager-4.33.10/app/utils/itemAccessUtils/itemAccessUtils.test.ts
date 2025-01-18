import { AccessLevel } from '@common/interfaces';
import { isFullAccess, isLimitedAccess } from '@extension/app/utils/itemAccessUtils/itemAccessUtils';

describe('itemAccessUtils', () => {
  it.each([
    [AccessLevel.ReadOnly, true],
    [AccessLevel.User, false],
    [AccessLevel.Owner, false],
    [undefined, false],
    [null, false],
    [0, false],
    [true, false],
    [false, false],
    [[], false],
    [{ }, false],
  ])('when %s is passed to isLimitedAccess %s should be returned', (givenValue: any, expectedResult: boolean) => {
    expect(isLimitedAccess(givenValue)).toBe(expectedResult);
  });

  it.each([
    [AccessLevel.ReadOnly, false],
    [AccessLevel.User, true],
    [AccessLevel.Owner, true],
    [undefined, true],
    [null, true],
    [0, true],
    [true, true],
    [false, true],
    [[], true],
    [{ }, true],
  ])('when %s is passed to isFullAccess %s should be returned', (givenValue: any, expectedResult: boolean) => {
    expect(isFullAccess(givenValue)).toBe(expectedResult);
  });
});
