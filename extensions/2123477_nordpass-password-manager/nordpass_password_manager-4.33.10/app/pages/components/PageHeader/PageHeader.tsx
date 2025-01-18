import { Link, SVG } from '@nord/ui';
import arrowLeftIcon from '@icons/24/arrow-left.svg';
import { FC, ReactElement } from 'react';
import history from '@extension/app/utils/history';

import './PageHeader.scss';

interface IPageHeaderProps {
  title?: ReactElement;
}

export const PageHeader: FC<IPageHeaderProps> = ({ title }) => (
  <div className="py-4 px-4 flex bg-primary">
    <Link onClick={() => history.goBack()} className="flex items-center">
      <SVG src={arrowLeftIcon} className="color-primary-accent-1 hover:color-primary-accent-13" noLazy />
    </Link>
    <h3 className="header__heading text-gray-darkest text-lead font-bolder line-h-24px truncate color-primary">
      {title}
    </h3>
  </div>
);
