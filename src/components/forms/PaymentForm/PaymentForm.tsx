import React, { useState } from 'react';
import {
    Box,
    Tabs,
    Tab,
    TextField,
    MenuItem,
    Stack,
    Typography,
    FormControl,
    InputLabel,
    Select,
    FormHelperText,
    InputAdornment,
    Chip,
    Paper,
} from '@mui/material';
import { CreditCard, Smartphone, Building2 } from 'lucide-react';
import Button from '../../ui/Button/Button';
import { useTheme } from '@mui/material';

export interface PaymentFormProps {
    onSubmit?: (paymentData: PaymentData) => void | Promise<void>;
    loading?: boolean;
    defaultMethod?: 'card' | 'upi' | 'netbanking';
}

export interface PaymentData {
    method: 'card' | 'upi' | 'netbanking';
    cardData?: {
        cardNumber: string;
        cardholderName: string;
        expiryDate: string;
        cvv: string;
        cardType?: string;
    };
    upiData?: {
        upiId: string;
    };
    netbankingData?: {
        bankName: string;
    };
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`payment-tabpanel-${index}`}
            aria-labelledby={`payment-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
        </div>
    );
}

const INDIAN_BANKS = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Kotak Mahindra Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Canara Bank',
    'Union Bank of India',
    'IndusInd Bank',
    'Yes Bank',
    'IDFC First Bank',
];

const UPI_APPS = [
    { name: 'Google Pay', color: '#4285F4' },
    { name: 'Apple Pay', color: '#5F259F' },
    { name: 'CRED', color: '#00BAF2' },
    { name: 'Amazon Pay', color: '#FF9900' },
];

export function PaymentForm({
    onSubmit,
    loading = false,
    defaultMethod = 'card',
}: PaymentFormProps) {
    const [activeTab, setActiveTab] = useState(
        defaultMethod === 'card' ? 0 : defaultMethod === 'upi' ? 1 : 2
    );

    // Card form state
    const [cardNumber, setCardNumber] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardType, setCardType] = useState('');

    // UPI form state
    const [upiId, setUpiId] = useState('');

    // Net banking state
    const [selectedBank, setSelectedBank] = useState('');

    // Validation errors
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        setErrors({});
    };

    const theme = useTheme();

    // Card number formatting and validation
    const formatCardNumber = (value: string) => {
        const cleaned = value.replace(/\s/g, '');
        const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
        return formatted.substring(0, 19); // Max 16 digits + 3 spaces
    };

    const detectCardType = (number: string) => {
        const cleaned = number.replace(/\s/g, '');
        if (/^4/.test(cleaned)) return 'Visa';
        if (/^5[1-5]/.test(cleaned)) return 'Mastercard';
        if (/^3[47]/.test(cleaned)) return 'Amex';
        if (/^6(?:011|5)/.test(cleaned)) return 'Discover';
        if (/^35/.test(cleaned)) return 'JCB';
        return '';
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCardNumber(e.target.value);
        setCardNumber(formatted);
        setCardType(detectCardType(formatted));
        if (errors.cardNumber) {
            setErrors({ ...errors, cardNumber: '' });
        }
    };

    // Expiry date formatting
    const formatExpiryDate = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length >= 2) {
            return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
        }
        return cleaned;
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatExpiryDate(e.target.value);
        setExpiryDate(formatted);
        if (errors.expiryDate) {
            setErrors({ ...errors, expiryDate: '' });
        }
    };

    // CVV validation
    const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setCvv(value.substring(0, cardType === 'Amex' ? 4 : 3));
        if (errors.cvv) {
            setErrors({ ...errors, cvv: '' });
        }
    };

    // UPI validation
    const validateUpiId = (id: string) => {
        const upiRegex = /^[\w.-]+@[\w.-]+$/;
        return upiRegex.test(id);
    };

    const handleUpiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpiId(e.target.value);
        if (errors.upiId) {
            setErrors({ ...errors, upiId: '' });
        }
    };

    // Form validation
    const validateCardForm = () => {
        const newErrors: Record<string, string> = {};
        const cleanedCardNumber = cardNumber.replace(/\s/g, '');

        if (!cardNumber) {
            newErrors.cardNumber = 'Card number is required';
        } else if (cleanedCardNumber.length < 13 || cleanedCardNumber.length > 19) {
            newErrors.cardNumber = 'Invalid card number';
        }

        if (!cardholderName) {
            newErrors.cardholderName = 'Cardholder name is required';
        }

        if (!expiryDate) {
            newErrors.expiryDate = 'Expiry date is required';
        } else if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            newErrors.expiryDate = 'Invalid format (MM/YY)';
        }

        if (!cvv) {
            newErrors.cvv = 'CVV is required';
        } else if (cvv.length < 3) {
            newErrors.cvv = 'Invalid CVV';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateUpiForm = () => {
        const newErrors: Record<string, string> = {};

        if (!upiId) {
            newErrors.upiId = 'UPI ID is required';
        } else if (!validateUpiId(upiId)) {
            newErrors.upiId = 'Invalid UPI ID format (e.g., username@bank)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateNetbankingForm = () => {
        const newErrors: Record<string, string> = {};

        if (!selectedBank) {
            newErrors.selectedBank = 'Please select a bank';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let isValid = false;
        let paymentData: PaymentData | null = null;

        if (activeTab === 0) {
            // Card payment
            isValid = validateCardForm();
            if (isValid) {
                paymentData = {
                    method: 'card',
                    cardData: {
                        cardNumber: cardNumber.replace(/\s/g, ''),
                        cardholderName,
                        expiryDate,
                        cvv,
                        cardType,
                    },
                };
            }
        } else if (activeTab === 1) {
            // UPI payment
            isValid = validateUpiForm();
            if (isValid) {
                paymentData = {
                    method: 'upi',
                    upiData: { upiId },
                };
            }
        } else {
            // Net banking
            isValid = validateNetbankingForm();
            if (isValid) {
                paymentData = {
                    method: 'netbanking',
                    netbankingData: { bankName: selectedBank },
                };
            }
        }

        if (isValid && paymentData && onSubmit) {
            await onSubmit(paymentData);
        }
    };

    return (
        <Paper sx={{ width: '100%', maxWidth: 600, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTab} onChange={handleTabChange} aria-label="payment methods">
                    <Tab
                        icon={<CreditCard size={20} />}
                        label="Card"
                        iconPosition="start"
                        id="payment-tab-0"
                        aria-controls="payment-tabpanel-0"
                    />
                    <Tab
                        icon={<Smartphone size={20} />}
                        label="UPI"
                        iconPosition="start"
                        id="payment-tab-1"
                        aria-controls="payment-tabpanel-1"
                    />
                    <Tab
                        icon={<Building2 size={20} />}
                        label="Net Banking"
                        iconPosition="start"
                        id="payment-tab-2"
                        aria-controls="payment-tabpanel-2"
                    />
                </Tabs>
            </Box>

            <Box sx={{ p: 3 }}>
                <form onSubmit={handleSubmit}>
                    {/* Card Payment Tab */}
                    <TabPanel value={activeTab} index={0}>
                        <Stack spacing={3}>
                            <TextField
                                size='small'
                                fullWidth
                                label="Card Number"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                error={!!errors.cardNumber}
                                helperText={errors.cardNumber}
                                placeholder="1234 5678 9012 3456"
                                InputProps={{
                                    endAdornment: cardType && (
                                        <InputAdornment position="end">
                                            <Chip label={cardType} size="small" color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                fullWidth
                                size='small'
                                label="Cardholder Name"
                                value={cardholderName}
                                onChange={(e) => {
                                    setCardholderName(e.target.value);
                                    if (errors.cardholderName) {
                                        setErrors({ ...errors, cardholderName: '' });
                                    }
                                }}
                                error={!!errors.cardholderName}
                                helperText={errors.cardholderName}
                                placeholder="John Doe"
                            />

                            <Stack direction="row" spacing={2}>
                                <TextField
                                    size='small'
                                    label="Expiry Date"
                                    value={expiryDate}
                                    onChange={handleExpiryChange}
                                    error={!!errors.expiryDate}
                                    helperText={errors.expiryDate}
                                    placeholder="MM/YY"
                                    sx={{ flex: 1 }}
                                />

                                <TextField
                                    size='small'
                                    label="CVV"
                                    value={cvv}
                                    onChange={handleCvvChange}
                                    error={!!errors.cvv}
                                    helperText={errors.cvv}
                                    placeholder="123"
                                    type="password"
                                    sx={{ flex: 1 }}
                                />
                            </Stack>

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Pay Now'}
                            </Button>
                        </Stack>
                    </TabPanel>

                    {/* UPI Payment Tab */}
                    <TabPanel value={activeTab} index={1}>
                        <Stack spacing={3}>
                            <TextField
                                size='small'
                                fullWidth
                                label="UPI ID"
                                value={upiId}
                                onChange={handleUpiChange}
                                error={!!errors.upiId}
                                helperText={errors.upiId || 'Enter your UPI ID (e.g., username@applepay)'}
                                placeholder="username@applepay"
                            />

                            <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    Popular UPI Apps
                                </Typography>
                                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                                    {UPI_APPS.map((app) => (
                                        <Chip
                                            key={app.name}
                                            label={app.name}
                                            size="small"
                                            sx={{
                                                backgroundColor: `${app.color}15`,
                                                color: app.color,
                                                fontWeight: 500,
                                            }}
                                        />
                                    ))}
                                </Stack>
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Pay with UPI'}
                            </Button>
                        </Stack>
                    </TabPanel>

                    {/* Net Banking Tab */}
                    <TabPanel value={activeTab} index={2}>
                        <Stack spacing={3}>
                            <FormControl fullWidth error={!!errors.selectedBank}>
                                <InputLabel>Select Bank</InputLabel>
                                <Select
                                    size='small'
                                    value={selectedBank}
                                    label="Select Bank"
                                    onChange={(e) => {
                                        setSelectedBank(e.target.value);
                                        if (errors.selectedBank) {
                                            setErrors({ ...errors, selectedBank: '' });
                                        }
                                    }}
                                >
                                    {INDIAN_BANKS.map((bank) => (
                                        <MenuItem key={bank} value={bank}>
                                            {bank}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.selectedBank && (
                                    <FormHelperText>{errors.selectedBank}</FormHelperText>
                                )}
                            </FormControl>

                            <Typography variant="body2" color="text.secondary">
                                You will be redirected to your bank's secure login page
                            </Typography>

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Proceed to Bank'}
                            </Button>
                        </Stack>
                    </TabPanel>
                </form>
            </Box>
        </Paper>
    );
}
