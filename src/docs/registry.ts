import ButtonDoc from './ButtonDoc';
import CardDoc from './CardDoc';
import InputDoc from './InputDoc';
import ModalDoc from './ModalDoc';
import PaymentFormDoc from './PaymentFormDoc';
import { componentMetadata, type ComponentDocEntry } from './registryMetadata';

// Merge metadata with actual component imports
export const componentDocsRegistry: Record<string, ComponentDocEntry> = {
    button: {
        ...componentMetadata.button,
        component: ButtonDoc,
    },
    card: {
        ...componentMetadata.card,
        component: CardDoc,
    },
    input: {
        ...componentMetadata.input,
        component: InputDoc,
    },
    modal: {
        ...componentMetadata.modal,
        component: ModalDoc,
    },
    paymentForm: {
        ...componentMetadata.paymentForm,
        component: PaymentFormDoc,
    },
};

export type { ComponentDocEntry };
