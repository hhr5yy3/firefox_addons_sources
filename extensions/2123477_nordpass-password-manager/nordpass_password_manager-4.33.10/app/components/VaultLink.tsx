import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom-v5-compat';
import { NavLinkProps, To } from 'react-router-dom-v5-compat/react-router-dom';

interface IVaultLink extends Omit<NavLinkProps, 'to'> {
  to?: To;
  path?: string;
  search?: string;
}

const VaultLink: FC<IVaultLink> = ({
  to,
  path,
  search = null,
  children,
  ...rest
}) => {
  const location = useLocation();
  return (
    <NavLink
      {...rest}
      to={to ?? {
        pathname: path || location.pathname,
        search: search || location.search,
      }}
    >
      {children}
    </NavLink>
  );
};

export default VaultLink;
