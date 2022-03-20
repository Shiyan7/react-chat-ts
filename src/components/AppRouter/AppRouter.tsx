import { FC } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../../router';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../../utils/conts';

export const AppRouter: FC = () => {

  const auth = false;

  return (
    auth ? 
    
    (
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
