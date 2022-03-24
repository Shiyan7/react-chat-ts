import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { createContext, useState, FC, useEffect, useMemo } from "react";
import { IAuthUser, TypeSetState } from "../types/types";

interface IContext {
    user: IAuthUser | null
    ga: Auth
    db: Firestore
    setUser: TypeSetState<IAuthUser | null>
}

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider: FC = ({children}) => {
    const [user, setUser] = useState<IAuthUser | null>(null)

    const ga = getAuth()
    const db = getFirestore()

    useEffect(() => {

        const unListen = onAuthStateChanged(ga, authUser => {
            setUser(
                authUser
                    ? {
                        _id: authUser.uid,
                        avatar: authUser.photoURL,
                        name: authUser.displayName,
                    }
                    : null
            )
        })
        
        
        return () => {
            unListen()
        }
        // eslint-disable-next-line
    }, [])

    const values = useMemo(
        () => ({
            user,
            setUser,
            ga,
            db,
        }),
        [user, ga, db]
    )

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}