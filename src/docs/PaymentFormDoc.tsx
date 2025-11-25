import React from 'react';
import ComponentDoc from './ComponentDoc/ComponentDoc';
import { PaymentForm, type PaymentData } from '../components/forms/PaymentForm/PaymentForm';
import { Box, Typography, Alert } from '@mui/material';

const basicPaymentFormCode = `import { PaymentForm } from 'mui-cascade';

function MyComponent() {
  const handlePayment = async (paymentData) => {
    console.log('Payment data:', paymentData);
    // Process payment here
  };

  return (
    <PaymentForm onSubmit={handlePayment} />
  );
}`;

const cardPaymentCode = `import { PaymentForm } from 'mui-cascade';

function CardPaymentExample() {
  const handlePayment = async (paymentData) => {
    if (paymentData.method === 'card') {
      const { cardNumber, cardholderName, expiryDate, cvv, cardType } = paymentData.cardData;
      // Process card payment
      console.log('Card Type:', cardType);
      console.log('Card Number:', cardNumber);
    }
  };

  return (
    <PaymentForm 
      defaultMethod="card"
      onSubmit={handlePayment}
    />
  );
}`;

const upiPaymentCode = `import { PaymentForm } from 'mui-cascade';

function UPIPaymentExample() {
  const handlePayment = async (paymentData) => {
    if (paymentData.method === 'upi') {
      const { upiId } = paymentData.upiData;
      // Process UPI payment
      console.log('UPI ID:', upiId);
    }
  };

  return (
    <PaymentForm 
      defaultMethod="upi"
      onSubmit={handlePayment}
    />
  );
}`;

const netbankingPaymentCode = `import { PaymentForm } from 'mui-cascade';

function NetBankingExample() {
  const handlePayment = async (paymentData) => {
    if (paymentData.method === 'netbanking') {
      const { bankName } = paymentData.netbankingData;
      // Redirect to bank's login page
      console.log('Selected Bank:', bankName);
    }
  };

  return (
    <PaymentForm 
      defaultMethod="netbanking"
      onSubmit={handlePayment}
    />
  );
}`;

const loadingStateCode = `import { PaymentForm } from 'mui-cascade';
import { useState } from 'react';

function LoadingPaymentForm() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async (paymentData) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Payment processed:', paymentData);
    setLoading(false);
  };

  return (
    <PaymentForm 
      onSubmit={handlePayment}
      loading={loading}
    />
  );
}`;

const paymentFormProps = [
    {
        name: 'onSubmit',
        type: '(paymentData: PaymentData) => void | Promise<void>',
        description: 'Callback function called when the form is submitted with valid data',
        default: 'undefined',
    },
    {
        name: 'loading',
        type: 'boolean',
        description: 'Shows loading state and disables the submit button',
        default: 'false',
    },
    {
        name: 'defaultMethod',
        type: '"card" | "upi" | "netbanking"',
        description: 'The default payment method tab to show',
        default: '"card"',
    },
];

function PaymentFormPreview() {
    const [result, setResult] = React.useState<string>('');

    const handlePayment = async (paymentData: PaymentData) => {
        setResult(`Payment method: ${paymentData.method}`);
        console.log('Payment data:', paymentData);
    };

    return (
        <Box>
            <PaymentForm onSubmit={handlePayment} />
            {result && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    {result}
                </Alert>
            )}
        </Box>
    );
}

function CardPaymentPreview() {
    const [result, setResult] = React.useState<string>('');

    const handlePayment = async (paymentData: PaymentData) => {
        if (paymentData.method === 'card' && paymentData.cardData) {
            setResult(`Card payment: ${paymentData.cardData.cardType || 'Unknown'} ending in ${paymentData.cardData.cardNumber.slice(-4)}`);
        }
    };

    return (
        <Box>
            <PaymentForm defaultMethod="card" onSubmit={handlePayment} />
            {result && (
                <Alert severity="info" sx={{ mt: 2 }}>
                    {result}
                </Alert>
            )}
        </Box>
    );
}

function UPIPaymentPreview() {
    const [result, setResult] = React.useState<string>('');

    const handlePayment = async (paymentData: PaymentData) => {
        if (paymentData.method === 'upi' && paymentData.upiData) {
            setResult(`UPI payment to: ${paymentData.upiData.upiId}`);
        }
    };

    return (
        <Box>
            <PaymentForm defaultMethod="upi" onSubmit={handlePayment} />
            {result && (
                <Alert severity="info" sx={{ mt: 2 }}>
                    {result}
                </Alert>
            )}
        </Box>
    );
}

function NetBankingPreview() {
    const [result, setResult] = React.useState<string>('');

    const handlePayment = async (paymentData: PaymentData) => {
        if (paymentData.method === 'netbanking' && paymentData.netbankingData) {
            setResult(`Redirecting to ${paymentData.netbankingData.bankName}...`);
        }
    };

    return (
        <Box>
            <PaymentForm defaultMethod="netbanking" onSubmit={handlePayment} />
            {result && (
                <Alert severity="info" sx={{ mt: 2 }}>
                    {result}
                </Alert>
            )}
        </Box>
    );
}

function LoadingPaymentPreview() {
    const [loading, setLoading] = React.useState(false);
    const [result, setResult] = React.useState<string>('');

    const handlePayment = async (paymentData: PaymentData) => {
        setLoading(true);
        setResult('');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setResult(`Payment processed successfully via ${paymentData.method}`);
        setLoading(false);
    };

    return (
        <Box>
            <PaymentForm onSubmit={handlePayment} loading={loading} />
            {result && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    {result}
                </Alert>
            )}
        </Box>
    );
}

export default function PaymentFormDoc() {
    const examples = [
        {
            title: 'Card Payment',
            description: 'Accept card payments with automatic card type detection and validation',
            component: <CardPaymentPreview />,
            code: cardPaymentCode,
        },
        {
            title: 'UPI Payment',
            description: 'Accept UPI payments with UPI ID validation',
            component: <UPIPaymentPreview />,
            code: upiPaymentCode,
        },
        {
            title: 'Net Banking',
            description: 'Allow users to select their bank for net banking payments',
            component: <NetBankingPreview />,
            code: netbankingPaymentCode,
        },
        {
            title: 'Loading State',
            description: 'Show loading state during payment processing',
            component: <LoadingPaymentPreview />,
            code: loadingStateCode,
        },
    ];

    return (
        <ComponentDoc
            title="Payment Form"
            description="A comprehensive payment form component supporting multiple payment methods including card payments, UPI, and net banking. Features automatic validation, card type detection, and a clean tabbed interface."
            component={<PaymentFormPreview />}
            code={basicPaymentFormCode}
            cliInstall="npx mui-cascade-add payment-form"
            examples={examples}
            props={paymentFormProps}
        />
    );
}
