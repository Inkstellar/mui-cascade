import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
    ThemeProvider,
    CssBaseline,
    Container,
    Box,
    Typography,
    Stack,
    Divider,
    Paper,
    ToggleButton,
    ToggleButtonGroup,
    Alert,
} from '@mui/material';
import { Sun, Moon } from 'lucide-react';
import { createCustomTheme } from './src/theme/theme';
import Button from './src/components/Button/Button';
import { Card, CardHeader, CardContent, CardActions } from './src/components/Card/Card';
import { Input } from './src/components/Input/Input';
import { Modal } from './src/components/Modal/Modal';
import { PaymentForm, type PaymentData } from './src/components/PaymentForm/PaymentForm';

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [paymentResult, setPaymentResult] = useState<string>('');

    const theme = createCustomTheme(darkMode ? 'dark' : 'light');

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handlePayment = async (paymentData: PaymentData) => {
        console.log('Payment data:', paymentData);
        if (paymentData.method === 'card' && paymentData.cardData) {
            setPaymentResult(`Card payment: ${paymentData.cardData.cardType || 'Card'} ending in ${paymentData.cardData.cardNumber.slice(-4)} `);
        } else if (paymentData.method === 'upi' && paymentData.upiData) {
            setPaymentResult(`UPI payment to: ${paymentData.upiData.upiId} `);
        } else if (paymentData.method === 'netbanking' && paymentData.netbankingData) {
            setPaymentResult(`Net banking via: ${paymentData.netbankingData.bankName} `);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ minHeight: '100vh', backgroundColor: darkMode ? '#0a0a0a' : '#fafafa', py: 4 }}>
                <Container maxWidth="lg">
                    {/* Header */}
                    <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <Typography variant="h1" sx={{ fontSize: '3rem', mb: 1 }}>
                                mui-cascade
                            </Typography>
                            <Typography variant="body1" sx={{ color: darkMode ? '#a1a1aa' : '#52525b' }}>
                                Component Library Development Environment
                            </Typography>
                        </Box>
                        <ToggleButtonGroup
                            value={darkMode ? 'dark' : 'light'}
                            exclusive
                            onChange={toggleDarkMode}
                            aria-label="theme toggle"
                        >
                            <ToggleButton value="light" aria-label="light mode">
                                <Sun size={20} />
                            </ToggleButton>
                            <ToggleButton value="dark" aria-label="dark mode">
                                <Moon size={20} />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>

                    {/* Button Section */}
                    <Paper sx={{ p: 4, mb: 4 }}>
                        <Typography variant="h4" sx={{ mb: 3 }}>
                            Button Component
                        </Typography>
                        <Stack direction="row" spacing={2} flexWrap="wrap" gap={2}>
                            <Button variant="contained">Contained</Button>
                            <Button variant="outlined">Outlined</Button>
                            <Button variant="text">Text</Button>
                            <Button variant="contained" disabled>
                                Disabled
                            </Button>
                            <Button variant="contained" size="small">
                                Small
                            </Button>
                            <Button variant="contained" size="large">
                                Large
                            </Button>
                        </Stack>
                    </Paper>

                    {/* Card Section */}
                    <Paper sx={{ p: 4, mb: 4 }}>
                        <Typography variant="h4" sx={{ mb: 3 }}>
                            Card Component
                        </Typography>
                        <Stack direction="row" spacing={3} flexWrap="wrap">
                            <Card sx={{ maxWidth: 345 }}>
                                <CardHeader
                                    title="Card Title"
                                    subheader="Card Subheader"
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        This is a sample card component with header, content, and actions.
                                        It demonstrates the card structure and styling.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                    <Button size="small" variant="outlined">
                                        Share
                                    </Button>
                                </CardActions>
                            </Card>

                            <Card sx={{ maxWidth: 345 }}>
                                <CardContent>
                                    <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
                                        Simple Card
                                    </Typography>
                                    <Typography variant="body2">
                                        A simpler card without header or actions.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Paper>

                    {/* Input Section */}
                    <Paper sx={{ p: 4, mb: 4 }}>
                        <Typography variant="h4" sx={{ mb: 3 }}>
                            Input Component
                        </Typography>
                        <Stack spacing={3} maxWidth={400}>
                            <Input
                                size='small'
                                label="Standard Input"
                                placeholder="Enter text..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <Input
                                label="Disabled Input"
                                placeholder="Disabled"
                                disabled
                            />
                            <Input
                                label="Error Input"
                                placeholder="Error state"
                                error
                                helperText="This field has an error"
                            />
                            <Input
                                label="Required Input"
                                placeholder="Required field"
                                required
                            />
                        </Stack>
                    </Paper>

                    {/* Modal Section */}
                    <Paper sx={{ p: 4, mb: 4 }}>
                        <Typography variant="h4" sx={{ mb: 3 }}>
                            Modal Component
                        </Typography>
                        <Button variant="contained" onClick={() => setModalOpen(true)}>
                            Open Modal
                        </Button>
                        <Modal
                            open={modalOpen}
                            onClose={() => setModalOpen(false)}
                            title="Sample Modal"
                        >
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                This is a modal dialog component. It can contain any content you need.
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Click outside or press ESC to close.
                            </Typography>
                            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                <Button variant="outlined" onClick={() => setModalOpen(false)}>
                                    Cancel
                                </Button>
                                <Button variant="contained" onClick={() => setModalOpen(false)}>
                                    Confirm
                                </Button>
                            </Box>
                        </Modal>
                    </Paper>

                    {/* Payment Form Section */}
                    <Paper sx={{ p: 4, mb: 4 }}>
                        <Typography variant="h4" sx={{ mb: 3 }}>
                            Payment Form Component
                        </Typography>
                        <PaymentForm onSubmit={handlePayment} />
                        {paymentResult && (
                            <Alert severity="success" sx={{ mt: 3 }}>
                                {paymentResult}
                            </Alert>
                        )}
                    </Paper>

                    {/* Typography Section */}
                    <Paper sx={{ p: 4, mb: 4 }}>
                        <Typography variant="h4" sx={{ mb: 3 }}>
                            Typography System
                        </Typography>
                        <Stack spacing={2}>
                            <Typography variant="h1">Heading 1</Typography>
                            <Typography variant="h2">Heading 2</Typography>
                            <Typography variant="h3">Heading 3</Typography>
                            <Typography variant="h4">Heading 4</Typography>
                            <Typography variant="h5">Heading 5</Typography>
                            <Typography variant="h6">Heading 6</Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="body1">
                                Body 1: This is the primary body text style used throughout the application.
                            </Typography>
                            <Typography variant="body2">
                                Body 2: This is a smaller body text style for secondary content.
                            </Typography>
                            <Typography variant="button">Button Text</Typography>
                        </Stack>
                    </Paper>

                    {/* Footer */}
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                            mui-cascade Component Library • Built with Material-UI
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

// Mount the app
const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
