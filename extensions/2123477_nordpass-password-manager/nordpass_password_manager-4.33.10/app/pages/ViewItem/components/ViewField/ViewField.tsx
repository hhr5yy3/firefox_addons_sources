import { ReactNode, useEffect, useRef, useState, FC } from 'react';
import cx from 'classnames';

import * as launchIcon from '@icons/24/launch.svg';
import * as copyIcon from '@icons/24/copy-ext.svg';
import * as showIcon from '@icons/24/show.svg';
import * as hideIcon from '@icons/24/hide.svg';

import './ViewField.scss';
import { ActionType } from '@extension/app/pages/ViewItem/constants/constants/ActionType';
import ActionButton from '@common/components/ActionButton/ActionButton';

export interface IAction extends Record<string, any> {
  action: ActionType;
  actionMessage: ReactNode;
  actionId: string;
  disabled?: boolean;
}

interface IViewField {
  label: string;
  value?: ReactNode;
  actions?: Array<IAction>;
  noMarginBottom?: boolean;
  displayInvisibleAction?: boolean;
  isAddressField?: boolean;
  isPasswordSecurityField?: boolean;
}

const SINGLE_ROW_HEIGHT = 59;

const ACTION_ICON = {
  [ActionType.Copy]: copyIcon,
  [ActionType.Show]: showIcon,
  [ActionType.Hide]: hideIcon,
  [ActionType.Launch]: launchIcon,
};

const ViewField: FC<IViewField> = ({
  label,
  value,
  actions,
  displayInvisibleAction,
  children,
  isAddressField,
  isPasswordSecurityField,
}) => {
  const [isMultiline, setIsMultiline] = useState(false);

  const ref = useRef<HTMLDivElement>();
  const multilineClassName = isMultiline ? 'self-start' : 'self-center';

  useEffect(() => {
    if (ref.current) {
      setIsMultiline(ref.current.offsetHeight > SINGLE_ROW_HEIGHT);
    }
  }, []);

  return (
    <div
      ref={ref}
      className={cx(
        'view-field flex px-3 border-t border-primary items-center duration-250 ease-out justify-between hover:bg-primary-accent-1',
        isAddressField && 'view-field--address',
        isPasswordSecurityField ? 'pt-10px pb-7px' : 'py-10px',
      )}
    >

      <div className="flex flex-col flex-1 min-w-0">
        <span
          className={cx(
            'view-field__label text-left text-grey-dark text-micro mb-2px color-primary-accent-1',
            isAddressField && 'view-field__label--address',
          )}
        >
          {label}
        </span>

        { value && (
          <div className="view-field__value w-full flex items-center color-primary">
            {value}
          </div>
        )}
        { children }
      </div>

      <div
        className={cx(
          'flex',
          displayInvisibleAction ? 'hover-invisible-action' : 'hover-actions',
          multilineClassName,
        )}
      >
        {actions?.map(({ action, actionMessage, actionId, ...rest }) => (
          <ActionButton
            className="ml-2"
            key={actionId}
            data-testid={action}
            tooltipText={actionMessage}
            tooltipId={actionId}
            svgIcon={ACTION_ICON[action]}
            {...rest}
          />
        ))}
      </div>

    </div>
  );
};

export default ViewField;
