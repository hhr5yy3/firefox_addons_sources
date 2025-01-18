import { memo, useContext, useEffect, useState } from 'react';
import { Text } from '@nord/ui';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom-v5-compat';
import { PendingSharesContext } from '@extension/app/context';
import ItemHeader from '@extension/app/pages/ViewItem/ItemHeader';
import history from '@extension/app/utils/history';

const ViewPendingItem = () => {
  const { email } = useParams<Record<'email', string>>();
  const pendingShares = useContext(PendingSharesContext);
  const [item, setItem] = useState(null);

  useEffect(() => {
    const decodedEmail = decodeURIComponent(email);
    setItem(pendingShares.find(shares => shares.uuid === decodedEmail));
  }, [pendingShares, email]);

  if (!item) {
    return null;
  }

  return (
    <div className="h-full flex flex-col justify-center page-slide-in pb-8">
      <ItemHeader item={item} close={() => history.goBack()} showMenu={false} />
      <div className="max-w-650px flex-1 overflow-y-auto mx-auto p-4 flex flex-col justify-center">
        <div className="items-center mb-4 flex flex-col">
          <Text variant="body1" className="break-word w-full text-center mt-3 color-primary">
            <FormattedMessage
              id="sharedItemsCountMessage"
              values={{ email: item.email, items: item.items }}
            />
          </Text>
          <Text variant="caption" className="text-center color-primary-accent-1 mt-3">
            <FormattedMessage
              id="pendingItemsMessageBeforeLogin"
              values={{ email: item.email, items: item.items }}
            />
          </Text>
        </div>
      </div>
    </div>
  );
};

export default memo(ViewPendingItem);
