import { Button, SVG } from '@nord/ui';
import { FormattedMessage } from 'react-intl';
import { LINKS } from '@extension/common/constants';
import helpIcon from '@icons/32/help.svg';
import { sendMessage } from '@extension/app/api';
import { ExtensionAction } from '@common/constants/action';
import { EmailLinks } from '@common/constants/email';
import { openInNewTab } from '@extension/common/utils/openInNewTab';

const SupportCard = () => (
  <div className="p-4 bg-white rounded shadow-1 flex">
    <SVG src={helpIcon} className="text-teal mr-4" noLazy />
    <div className="flex items-baseline w-full">
      <div className="flex-1 text-left mr-0 mb-2">
        <div className="text-base font-medium text-black my-1">
          <FormattedMessage id="needHelpQuestion" />
        </div>
        <div className="text-small text-grey-darker leading-loose">
          <FormattedMessage id="visitHelpCenter" />
        </div>
      </div>

      <div className="flex-1 text-right">
        <Button
          variant="outlined"
          size="small"
          className="mr-1"
          onClick={() => openInNewTab(LINKS.NORDPASS_HELP)}
        >
          <FormattedMessage id="helpCenter" />
        </Button>

        <Button
          variant="outlined"
          size="small"
          component="a"
          className="inline-block"
          onClick={() => sendMessage(
            ExtensionAction.OpenMailLink,
            { url: `${EmailLinks.Support}?Subject=Issue%20downloading%20desktop%20app` },
          )}
        >
          <FormattedMessage id="emailUs" />
        </Button>
      </div>
    </div>
  </div>
);

export default SupportCard;
