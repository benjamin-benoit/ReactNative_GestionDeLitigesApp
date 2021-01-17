import { createContext } from 'react';
import { Dispute } from '../dto/dispute';

export type AppContextProps = {
    disputes: Dispute[],
    addDispute: any,
}

export const AppContext = createContext<Partial<AppContextProps>>({
    disputes: [],
    addDispute: (value: Dispute) => {
    },
});