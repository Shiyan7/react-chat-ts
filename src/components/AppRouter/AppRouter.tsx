import { FC } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../../router';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../../utils/conts';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useAuth } from '../../providers/useAuth';
import { Loader } from '../Loader/Loader';

export const AppRouter: FC = () => {

  const { ga } = useAuth()
  const [ user, loading ] = useAuthState(ga)

  return (

    loading ? <Loader /> :
    
    user ? (
      <Switch>
        {privateRoutes.map(route =>
          <Route
            path={route.path}
            component={route.component}
            key={route.path}
          />
        )}
        <Redirect to={CHAT_ROUTE} />
      </Switch>
    ) : (
      <Switch>
        {publicRoutes.map(route =>
          <Route
            path={route.path}
            component={route.component}
            key={route.path}
          />
        )}

        <Redirect to={LOGIN_ROUTE} />
      </Switch>
    )
  );
}
