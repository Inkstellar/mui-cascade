import { ButtonDoc } from './ButtonDoc';
import { CardDoc } from './CardDoc';
import { InputDoc } from './InputDoc';
import { ModalDoc } from './ModalDoc';

export interface ComponentDocEntry {
    component: React.ComponentType;
    path: string;
    name: string;
}

export const componentDocsRegistry: Record<string, ComponentDocEntry> = {
    button: {
        component: ButtonDoc,
        path: '/components/button',
        name: 'Button',
    },
    card: {
        component: CardDoc,
        path: '/components/card',
        name: 'Card',
    },
    input: {
        component: InputDoc,
        path: '/components/input',
        name: 'Input',
    },
    modal: {
        component: ModalDoc,
        path: '/components/modal',
        name: 'Modal',
    },
};
