export interface ComponentDocEntry {
    component: React.ComponentType;
    path: string;
    name: string;
    newitem?: boolean;
    deprecated?: boolean;
    experimental?: boolean;
}

// Metadata only - no component imports
export const componentMetadata: Record<string, Omit<ComponentDocEntry, 'component'>> = {
    button: {
        path: '/components/button',
        name: 'Button',
    },
    card: {
        path: '/components/card',
        name: 'Card',
    },
    input: {
        path: '/components/input',
        name: 'Input',
        deprecated: true,
    },
    modal: {
        path: '/components/modal',
        name: 'Modal',
        newitem: true,
    },
    paymentForm: {
        path: '/experimental/payment-form',
        name: 'Payment Form',
        newitem: true,
        experimental: true,
    },
};
