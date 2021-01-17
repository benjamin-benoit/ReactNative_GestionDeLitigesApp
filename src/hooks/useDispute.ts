import { useState } from 'react';
import { Dispute } from '../dto/dispute';

export default (initialValue: Dispute[]) => {
    const [disputes, setDisputes] = useState(initialValue);

    return {
        disputes,
        addDispute: (dispute: Dispute) => {
            setDisputes([...disputes, dispute])
        }
    };
};