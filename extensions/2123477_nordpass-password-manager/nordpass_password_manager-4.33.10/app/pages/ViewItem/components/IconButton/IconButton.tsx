import { ReactNode, useState, FC } from 'react';
import { ButtonProps } from '@nord/ui/lib/Button/interface';
import { SVG } from '@nord/ui';
import { useHandleActionClick } from '@common/hooks/useHandleActionClick';
import Tooltip from '@common/components/Tooltip/Tooltip';

interface IActionButton extends Partial<ButtonProps> {
  icon: string;
  tooltipText?: ReactNode;
  tooltipId?: string;
  className?: string;
  callbackTooltipText?: ReactNode;
}

const IconButton: FC<IActionButton> = ({
  icon,
  tooltipText,
  tooltipId,
  className,
  callbackTooltipText,
  onClick,
}) => {
  const [tooltipTextValue, setTooltipTextValue] = useState(tooltipText);
  const handleActionClick = useHandleActionClick(onClick, tooltipText, setTooltipTextValue, callbackTooltipText);

  return (
    <>
      {tooltipId && (
        <Tooltip id={tooltipId} showOnHover>
          {tooltipTextValue}
        </Tooltip>
      )}
      <div className={className}>
        <button
          data-testid="icon-button"
          type="button"
          className="flex items-center icon-button"
          onClick={handleActionClick}
          {...{ [`data-tip-${tooltipId}`]: true }}
        >
          <SVG
            src={icon}
            noLazy
            width={24}
            height={24}
            data-testid="icon"
          />
        </button>
      </div>
    </>
  );
};

export default IconButton;
