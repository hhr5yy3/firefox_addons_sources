import { FC, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from '@nord/ui';
import cx from 'classnames';
import { openInNewTab } from '@extension/common/utils/openInNewTab';
import { LINKS, Storage } from '@extension/common/constants';
import * as ClearIcon from '@icons/clear.svg';
import SvgIcon from '@common/components/SvgIcon';
import StorageApi from '@extension/browser/storageApi';
import { useAuthContext } from '@extension/app/context/AuthContext';
import { getTimeDiff, parseDate } from '@common/utils/date';
import { Browser } from '@common/constants';
import useQuery from '@common/hooks/useQuery/useQuery';
import { api } from '@extension/app/api';
import getBrowser from '@common/utils/getBrowser';

import styles from './StarRating.module.scss';

export const GOOD_RATING = 4;
export const MAX_RATING = 5;
export const MIN_REGISTRATION_DAYS_DIFF = 3;
export const MIN_VAULT_ITEMS = 5;

const getRegistrationDiff = (registrationDate?: string) => {
  if (!registrationDate) {
    return -1;
  }
  return getTimeDiff(parseDate(registrationDate), new Date()).days;
};

interface IStarRating {
  vaultItemsLength: number;
}

const StarRating: FC<IStarRating> = ({ vaultItemsLength }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number>();
  const { data: userUuid } = useQuery(api.extension.getUserUuid);
  const { subscriptionData } = useAuthContext();
  const registrationDiff = useMemo(() => getRegistrationDiff(subscriptionData.registrationDate), [subscriptionData]);
  const isShownStorageKey = `${Storage.IsExtensionRatingShown}-${userUuid}` as unknown as Storage;
  const browser = getBrowser();
  const isChrome = browser === Browser.Chrome;
  const isFirefox = browser === Browser.Firefox;

  const handleClick = () => {
    if (isChrome) {
      openInNewTab(LINKS.CHROME_STORE);
    } else if (isFirefox) {
      openInNewTab(LINKS.FIREFOX_ADDONS_PAGE);
    }
  };

  useEffect(() => {
    (async () => {
      if (
        userUuid &&
        registrationDiff >= MIN_REGISTRATION_DAYS_DIFF &&
        vaultItemsLength >= MIN_VAULT_ITEMS &&
        (isChrome || isFirefox)
      ) {
        const { [isShownStorageKey]: isShown } = await StorageApi.get({ [isShownStorageKey]: false });
        setIsVisible(!isShown);

        if (!isShown) {
          await StorageApi.set({ [isShownStorageKey]: true });
        }
      }
    })();
  }, [
    isShownStorageKey,
    registrationDiff,
    subscriptionData?.registrationDate,
    userUuid,
    vaultItemsLength,
    isChrome,
    isFirefox,
  ]);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {selectedRating && (
        <div className="relative">
          <div
            role="presentation"
            className="absolute right-0 top-0 mr-7 mt-3 cursor-pointer"
            onClick={() => setIsVisible(false)}
            data-testid="clear-icon"
          >
            <SvgIcon
              src={ClearIcon}
              width={16}
              height={16}
              className={styles['clear-icon']}
            />
          </div>
        </div>
      )}

      <div
        className="p-4 bg-primary-accent-18 text-center m-4 mt-0 rounded-2 flex justify-center align-center flex-col w-343px"
      >

        {!selectedRating && (
          <div className="py-2">
            <div className="color-primary-accent-3 font-bolder">
              <FormattedMessage id="rateNordPass" />
            </div>

            <div className="flex flex-row-reverse justify-center mt-2">
              {Array.from({ length: MAX_RATING }, (_, i) => i + 1).reverse().map(rating => (
                <div
                  role="presentation"
                  key={rating}
                  data-testid="star-icon"
                  className={cx('cursor-pointer', styles['star-icon'])}
                  onClick={() => setSelectedRating(rating)}
                />
              ))}
            </div>
          </div>
        )}

        {selectedRating && selectedRating < GOOD_RATING && (
          <div className="color-primary-accent-3 font-bolder py-2 whitespace-pre-line">
            <FormattedMessage id="yourFeedbackHelps" />
          </div>
        )}

        {selectedRating && selectedRating >= GOOD_RATING && (
          <>
            <div className={cx('color-primary-accent-3 font-bolder px-6', isFirefox && 'max-w-200 self-center')}>
              {isChrome && <FormattedMessage id="rateOnChromeStore" />}
              {isFirefox && <FormattedMessage id="rateOnFirefox" />}
            </div>
            <div className="color-primary-accent-1 font-medium text-micro">
              <FormattedMessage id="rateNordPassSubtitle" />
            </div>

            <Button className="rounded-full mt-3 bg-grey-black border-grey-black" onClick={handleClick}>
              {isChrome && <FormattedMessage id="goToChromeStore" />}
              {isFirefox && <FormattedMessage id="goToFirefox" />}
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default StarRating;
