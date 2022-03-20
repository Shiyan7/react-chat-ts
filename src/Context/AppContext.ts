import { createContext } from 'react';

interface IAppContext {
    auth: object;
    firestore: object;
}

export const AppContext = createContext<IAppContext | null>(null);