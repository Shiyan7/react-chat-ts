import {FC} from 'react'
import { Navigate, Route, Routes} from 'react-router-dom';
import {privateRoutes, publicRoutes} from '../../router';
import {CHAT_ROUTE, LOGIN_ROUTE} from '../../utils/conts';
import {useAuthState} from 'react-firebase-hooks/auth'
import {useAuth} from '../../providers/useAuth';
import {Loader} from '../Loader/Loader';

export const AppRouter: FC = () => {

    const {ga} = useAuth()
    const [user, loading] = useAuthState(ga)

    return (

        loading ? <Loader/> :

            user ? (
                <Routes>
                    {privateRoutes.map(route =>
                        <Route
                            path={route.path}
                            element={<route.element />}
                            key={route.path}
                        />
                    )}
                    <Route path="*" element={<Navigate to={CHAT_ROUTE} replace />}/>
                </Routes>
            ) : (
                <Routes>
                    {publicRoutes.map(route =>
                        <Route
                            path={route.path}
                            element={<route.element />}
                            key={route.path}
                        />
                    )}

                    <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />}/>
                </Routes>
            )
    );
}
