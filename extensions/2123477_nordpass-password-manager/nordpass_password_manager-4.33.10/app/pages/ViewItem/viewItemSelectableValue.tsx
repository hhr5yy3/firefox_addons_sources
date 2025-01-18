import { FC } from 'react';
import cx from 'classnames';

interface IViewItemSelectableValue {
  value: string | JSX.Element;
  className: string;
}

const viewItemSelectableValue: FC<IViewItemSelectableValue> = ({ value, className }, rest) => (
  <span className={cx(className, 'selectable')} {...rest}>
    {value}
  </span>
);

export default viewItemSelectableValue;
