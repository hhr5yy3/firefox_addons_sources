import { FC, useEffect, useState } from 'react';
import { getOs } from '@common/services/getOs';
import { Browser } from '@common/constants';
import getBrowser from '@common/utils/getBrowser';

const os = getOs();
const browser = getBrowser();
const SHOW_COUNTER = os === 'Mac' && browser !== Browser.Firefox && browser !== Browser.Safari;

interface IMacRefreshCounterProps {
  isPopup: boolean;
}

const MacRefreshCounter: FC<IMacRefreshCounterProps> = ({ isPopup }) => {
  const [refreshCounter, setRefreshCounter] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout = null;
    if (isPopup && SHOW_COUNTER) {
      interval = setInterval(() => {
        setRefreshCounter(c => c + 1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPopup]);

  if (isPopup && SHOW_COUNTER) {
    return <div className="select-none absolute text-transparent -z-1">{refreshCounter}</div>;
  }

  return null;
};

export default MacRefreshCounter;
