import { FormattedMessage } from 'react-intl';
import { OpenDirection } from '@common/components/Tooltip/constants/openDirection';

export const getCopyActionTooltipProps = (tooltipId: string) => ({
  tooltipId,
  tooltipDuration: 800,
  tooltipText: <FormattedMessage id="copied" />,
  tooltipDirection: OpenDirection.Top,
});
