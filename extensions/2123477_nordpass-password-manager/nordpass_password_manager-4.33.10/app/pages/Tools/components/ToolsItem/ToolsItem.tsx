import { FC, HTMLAttributes } from 'react';
import { Image, Link, SVG } from '@nord/ui';
import { LinkProps } from '@nord/ui/lib/Link/interface';
import chevronIcon from '@icons/24/chevron-right.svg';
import './ToolsItem.scss';

export interface IToolsListItemProps extends Pick<HTMLAttributes<HTMLDivElement>, 'className'>, LinkProps {
  title: string;
  description?: string;
  iconPath: string;
}

const ToolsItem: FC<IToolsListItemProps> = ({
  title,
  description,
  iconPath,
  ...linkProps
}) => (
  <Link
    className="tools-item flex items-center justify-between px-2 py-3 transition-colors duration-250 ease-out hover:bg-primary-accent-1"
    colorClassName="text-grey-darkest"
    {...linkProps}
  >
    <Image
      className="mr-4 item-image-32px"
      width={34}
      height={34}
      src={iconPath}
      noLazy
      responsive={false}
    />

    <div className="flex-col w-full leading-none">
      <div className="flex items-center color-primary tools-item__title">
        <span>{title}</span>
      </div>

      <span className="text-grey-dark text-micro tools-item__description color-primary-accent-1">
        {description}
      </span>
    </div>

    <SVG
      width={24}
      height={24}
      src={chevronIcon}
      className="ml-2 color-primary-accent-1"
      noLazy
    />

  </Link>
);

export default ToolsItem;
