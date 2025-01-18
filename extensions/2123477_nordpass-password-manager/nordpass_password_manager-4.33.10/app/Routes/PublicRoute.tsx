import { memo, useContext, FC } from 'react';
import { Navigate, Outlet, useLocation, useMatch, RouteProps } from 'react-router-dom-v5-compat';
import { ROUTES } from '@extension/common/constants';
import { AuthContext } from '@extension/app/context';
import LayoutPublic from '@extension/app/layouts/LayoutPublic';
import { AuthState } from '@common/store/reducers/authReducer/authConstants';
import { getLastPage, setLastPage } from './lastPage';

interface IMemoPublicRoute extends RouteProps {
  authState: AuthState;
  simpleLayout: boolean;
}

const MemoPublicRoute: FC<IMemoPublicRoute> = memo(({ children, authState, simpleLayout }) => {
  const { pathname } = useLocation();
  const match = useMatch(pathname);

  if (authState === AuthState.Authenticated) {
    const page = getLastPage() || ROUTES.VAULT;
    setLastPage(null);

    return <Navigate to={page} replace />;
  }

  if (
    authState === AuthState.MasterValidate &&
    match?.pathname &&
    ![ROUTES.VALIDATE_MASTER, ROUTES.MP_SWITCH_ACCOUNT].includes(match.pathname)
  ) {
    return <Navigate to={ROUTES.VALIDATE_MASTER} replace />;
  }

  return <LayoutPublic simpleLayout={simpleLayout}>{children}</LayoutPublic>;
});

interface IPublicRoute extends RouteProps {
  simpleLayout?: boolean;
}

const PublicRoute: FC<IPublicRoute> = ({ simpleLayout = false }) => {
  const { authState } = useContext(AuthContext);

  return (
    <MemoPublicRoute authState={authState} simpleLayout={simpleLayout}>
      <Outlet />
    </MemoPublicRoute>
  );
};

export default PublicRoute;
