import { api } from '@extension/app/api';
import Button from '@nord/ui/lib/Button';
import Link from '@nord/ui/lib/Link';
import { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import LogoIconByTheme from '../LogoIconByTheme';

const OrganizationInviteScreen = () => {
  const handleDownloadAppClick = () => {
    api.extension.openInstallPage();
  };

  const handleOpenNordpassClick = () => {
    api.extension.openDesktopApp({ route: 'ORGANIZATION_INVITE' });
  };

  return (
    <div className="flex flex-1 justify-center items-center flex-col text-center px-4 color-primary pb-4">
      <div className="mt-20">
        <LogoIconByTheme />
      </div>
      <p className="mt-20"><FormattedMessage id="organizationInviteScreenNotification" /></p>
      <Button
        color="teal"
        size="small"
        className="mt-6 rounded-full w-full"
        onClick={handleOpenNordpassClick}
      >
        <FormattedMessage id="openNordPass" />
      </Button>
      <p className="mt-auto mb-6">
        <FormattedMessage id="dontHaveAppQuestion" />
        <Link
          className="text-teal ml-1"
          onClick={handleDownloadAppClick}
        >
          <FormattedMessage id="download" />
        </Link>
      </p>
    </div>
  );
};

export default memo(OrganizationInviteScreen);
