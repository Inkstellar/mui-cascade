import React, { useState } from 'react';
import { Check, Star, X } from 'lucide-react';
import Input from '../../ui/Input/Input';
import Card, { CardActions, CardContent } from '../../ui/Card/Card';
import Button from '../../ui/Button/Button';
import Modal from '../../ui/Modal/Modal';
import { Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: PricingFeature[];
  popular?: boolean;
  buttonText: string;
}

export const PricingCard: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const theme = useTheme()
  const pricingTiers: PricingTier[] = [
    {
      name: 'Starter',
      price: 29,
      description: 'Perfect for small projects and startups',
      features: [
        { name: '1,000 API calls/month', included: true },
        { name: 'Basic support', included: true },
        { name: '3 endpoints', included: true },
        { name: 'Custom domains', included: false },
        { name: 'Advanced analytics', included: false },
        { name: 'Priority support', included: false },
      ],
      buttonText: 'Get Started',
    },
    {
      name: 'Professional',
      price: 79,
      description: 'Ideal for growing businesses',
      features: [
        { name: '10,000 API calls/month', included: true },
        { name: 'Priority support', included: true },
        { name: '10 endpoints', included: true },
        { name: 'Custom domains', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'SLA guarantee', included: false },
      ],
      popular: true,
      buttonText: 'Start Free Trial',
    },
    {
      name: 'Enterprise',
      price: 199,
      description: 'For large scale applications',
      features: [
        { name: 'Unlimited API calls', included: true },
        { name: '24/7 dedicated support', included: true },
        { name: 'Unlimited endpoints', included: true },
        { name: 'Custom domains', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'SLA guarantee', included: true },
      ],
      buttonText: 'Contact Sales',
    },
  ];

  const handleTierSelect = (tierName: string) => {
    setSelectedTier(tierName);
    setEmailModalOpen(true);
  };

  const handleEmailSubmit = () => {
    // Handle email submission logic here
    console.log(`Selected tier: ${selectedTier}, Email: ${email}`);
    setEmailModalOpen(false);
    setEmail('');
    setSelectedTier(null);
  };

  return (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center', padding: '24px' }}>
      {pricingTiers.map((tier) => (
        <Card
          key={tier.name}
          sx={{
            width: 320,
            border: tier.popular ? '2px solid' : '1px solid',
            borderColor: tier.popular ? theme.palette.primary.main : theme.palette.divider,
            position: 'relative',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
            },
            overflow: 'visible',
          }}
        >
          {tier.popular && (
            <Chip label="Most Popular" color="primary" icon={<Star size={16} />} sx={{ position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)' }} />
          )}

          <CardContent sx={{ padding: '32px 24px 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '600' }}>
                {tier.name}
              </h3>
              <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>
                {tier.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '4px' }}>
                <span style={{ fontSize: '48px', fontWeight: 'bold', color: theme.palette.primary.main }}>
                  ${tier.price}
                </span>
                <span style={{ color: '#666', fontSize: '16px' }}>/month</span>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              {tier.features.map((feature, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 0',
                    borderBottom: index < tier.features.length - 1 ? '1px solid #f0f0f0' : 'none',
                  }}
                >
                  {feature.included ? (
                    <Check size={20} color="#4caf50" />
                  ) : (
                    <X size={20} color="#f44336" />
                  )}
                  <span
                    style={{
                      color: feature.included ? '#333' : '#999',
                      textDecoration: feature.included ? 'none' : 'line-through',
                    }}
                  >
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>

          <CardActions sx={{ padding: '16px 24px 24px', justifyContent: 'center' }}>
            <Button
              variant={tier.popular ? 'contained' : 'outlined'}
              onClick={() => handleTierSelect(tier.name)}
              sx={{
                width: '100%',
                fontWeight: 'bold',
              }}
            >
              {tier.buttonText}
            </Button>
          </CardActions>
        </Card>
      ))}

      <Modal
        open={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        title={`Get Started with ${selectedTier}`}
      >
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email to get started"
            fullWidth
          />
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <Button variant="text" onClick={() => setEmailModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleEmailSubmit} disabled={!email}>
              Continue
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};