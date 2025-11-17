import React from 'react';
import ComponentDoc from './ComponentDoc';
import Card, { CardHeader, CardContent, CardActions } from '@/components/Card/Card';
import Button from '@/components/Button/Button';
import { Card as MuiCard } from '@mui/material';
import { Heart, MessageCircle, Share } from 'lucide-react';

const basicCardCode = `import { Card, CardHeader, CardContent } from '@shadcn-mui/components';

function MyCard() {
  return (
    <Card>
      <CardHeader 
        title="Card Title"
        subtitle="Card subtitle"
      />
      <CardContent>
        This is the content area of the card.
        You can put any content here.
      </CardContent>
    </Card>
  );
}`;

const variantsCardCode = `import { Card } from '@shadcn-mui/components';

function CardVariants() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
      <Card variant="elevated">
        <CardContent>
          <h3>Elevated Card</h3>
          <p>Cards with shadows for depth</p>
        </CardContent>
      </Card>
      
      <Card variant="outlined">
        <CardContent>
          <h3>Outlined Card</h3>
          <p>Cards with borders</p>
        </CardContent>
      </Card>
      
      <Card variant="filled">
        <CardContent>
          <h3>Filled Card</h3>
          <p>Cards with background color</p>
        </CardContent>
      </Card>
    </div>
  );
}`;

const interactiveCardCode = `import { Card } from '@shadcn-mui/components';
import { useState } from 'react';

function InteractiveCard() {
  const [likes, setLikes] = useState(42);

  return (
    <Card 
      interactive 
      onClick={() => setLikes(likes + 1)}
    >
      <CardContent>
        <h3>Interactive Card</h3>
        <p>Click to like! Currently {likes} likes</p>
      </CardContent>
    </Card>
  );
}`;

const fullCardCode = `import { Card, CardHeader, CardContent, CardActions } from '@shadcn-mui/components';
import { Button } from '@shadcn-mui/components';
import { Heart, MessageCircle } from 'lucide-react';

function FullCardExample() {
  return (
    <Card variant="elevated">
      <CardHeader 
        title="Getting Started"
        subtitle="Learn how to use Shadcn MUI"
        avatar={<div style={{ width: 40, height: 40, backgroundColor: '#3b82f6', borderRadius: '50%' }} />}
      />
      <CardContent>
        This comprehensive guide will help you get started with Shadcn MUI 
        components. We'll cover installation, basic usage, and advanced patterns.
      </CardContent>
      <CardActions>
        <Button size="small" variant="text">
          <Heart style={{ marginRight: 8 }} />
          Like
        </Button>
        <Button size="small" variant="text">
          <MessageCircle style={{ marginRight: 8 }} />
          Comment
        </Button>
      </CardActions>
    </Card>
  );
}`;

const paddingCardCode = `import { Card } from '@shadcn-mui/components';

function PaddingCardExample() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
      <Card padding="none">
        <CardContent>
          <h3>No Padding</h3>
          <p>You control the padding</p>
        </CardContent>
      </Card>
      
      <Card padding="small">
        <CardContent>
          <h3>Small Padding</h3>
          <p>16px padding</p>
        </CardContent>
      </Card>
      
      <Card padding="medium">
        <CardContent>
          <h3>Medium Padding</h3>
          <p>24px padding</p>
        </CardContent>
      </Card>
      
      <Card padding="large">
        <CardContent>
          <h3>Large Padding</h3>
          <p>32px padding</p>
        </CardContent>
      </Card>
    </div>
  );
}`;

const cardProps = [
  {
    name: 'variant',
    type: '"elevated" | "outlined" | "filled"',
    description: 'The visual style variant of the card',
    default: '"elevated"',
  },
  {
    name: 'padding',
    type: '"none" | "small" | "medium" | "large"',
    description: 'The padding inside the card',
    default: '"medium"',
  },
  {
    name: 'interactive',
    type: 'boolean',
    description: 'If true, the card will have hover effects and click cursor',
    default: 'false',
  },
  {
    name: 'onClick',
    type: '() => void',
    description: 'Click handler for interactive cards',
    default: 'undefined',
  },
];

function CardPreview() {
  return (
    <div style={{ maxWidth: '400px' }}>
      <Card variant="elevated">
        <CardContent>
          <h3 style={{ margin: '0 0 8px 0' }}>Welcome to Shadcn MUI</h3>
          <p style={{ margin: 0, color: 'var(--muted-foreground)' }}>
            A collection of accessible components built with Material-UI
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function CardVariantsPreview() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      <Card variant="elevated" padding="small">
        <CardContent>
          <h4>Elevated</h4>
          <p style={{ fontSize: '0.875rem' }}>With shadow</p>
        </CardContent>
      </Card>
      <Card variant="outlined" padding="small">
        <CardContent>
          <h4>Outlined</h4>
          <p style={{ fontSize: '0.875rem' }}>With border</p>
        </CardContent>
      </Card>
      <Card variant="filled" padding="small">
        <CardContent>
          <h4>Filled</h4>
          <p style={{ fontSize: '0.875rem' }}>Background color</p>
        </CardContent>
      </Card>
    </div>
  );
}

function CardWithActionsPreview() {
  return (
    <div style={{ maxWidth: '400px' }}>
      <Card variant="elevated">
        <CardHeader 
          title="Documentation"
          subtitle="Learn more"
        />
        <CardContent>
          Comprehensive guides and API reference for all components.
        </CardContent>
        <CardActions>
          <Button size="small" variant="text">
            <Heart style={{ marginRight: 8 }} />
            Like
          </Button>
          <Button size="small" variant="text">
            <Share style={{ marginRight: 8 }} />
            Share
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default function CardDoc() {
  const examples = [
    {
      title: 'Card Variants',
      description: 'Different visual styles for different use cases',
      component: <CardVariantsPreview />,
      code: variantsCardCode,
    },
    {
      title: 'Complete Card',
      description: 'Card with header, content, and actions',
      component: <CardWithActionsPreview />,
      code: fullCardCode,
    },
    {
      title: 'Padding Options',
      description: 'Control the spacing inside cards',
      component: <div>Preview not available</div>,
      code: paddingCardCode,
    },
    {
      title: 'Interactive Cards',
      description: 'Cards with hover effects and click handlers',
      component: <div>Interactive preview not available</div>,
      code: interactiveCardCode,
    },
  ];

  return (
    <ComponentDoc
      title="Card"
      description="Cards are surfaces that display content and actions on a single topic. They should be easy to scan for relevant and actionable information."
      component={<CardPreview />}
      code={basicCardCode}
      examples={examples}
      props={cardProps}
    />
  );
}
