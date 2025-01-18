import { useState, useEffect, FC } from 'react';
import { useIntl } from 'react-intl';
import { Link, Input, SVG } from '@nord/ui';

import { ROUTES } from '@extension/common/constants';
import { History } from 'history';
import cx from 'classnames';
import clearIcon from '@icons/16/clear.svg';
import searchIcon from '@icons/16/search.svg';
import debounce from '@common/utils/debounce';
import history from '@extension/app/utils/history';
import useSearchParam from '@extension/app/hooks/useSearchParam';

import './Search.scss';

const debouncedSearch = debounce((history: History, searchText: string) => {
  const encodedSearchText = encodeURIComponent(searchText);
  history.push({ pathname: ROUTES.VAULT, search: searchText ? `query=${encodedSearchText}` : '' });
}, 300);

const Search: FC = () => {
  const { formatMessage } = useIntl();
  const [query, setQuery] = useState('');
  const searchParam = useSearchParam('query') || '';
  useEffect(() => {
    setQuery(searchParam);
  }, [searchParam]);

  const onSearchVault = (value: string) => {
    setQuery(value);
    debouncedSearch(history, value);
  };

  return (
    <div className="header__search flex-1 pt-3">
      <Input
        className={cx('w-full font-medium pl-9 pr-4 border bg-primary-accent-16 border-primary-accent-8', query && 'typing pr-9 color-primary')}
        id="search"
        name="search"
        autoComplete="off"
        placeholder={formatMessage({ id: 'search' })}
        size="small"
        prefix={
          <SVG src={searchIcon} className="search-icon ml-3 mr-2 color-primary-accent-1" noLazy />
        }
        suffix={
          query && (
            <Link
              className="flex pl-2 pr-3"
              colorClassName="color-primary-accent-1 hover:color-primary-accent-13"
              onClick={() => onSearchVault('')}
            >
              <SVG src={clearIcon} noLazy />
            </Link>
          )
        }
        value={query}
        onChange={event => onSearchVault((event.target as HTMLInputElement).value)}
      />
    </div>
  );
};

export default Search;
