import React from 'react';
import ComponentDoc from './ComponentDoc';
import { Button } from 'mui-cascade';
import { ArrowRight, Download, Heart } from 'lucide-react';

const basicButtonCode = `import { Button } from 'mui-cascade';

function MyComponent() {
  return (
    <Button variant="contained">
      Click me
    </Button>
  );
}`;

const variantsButtonCode = `import { Button } from 'mui-cascade';

function ButtonVariants() {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant="contained">
        Contained
      </Button>
      <Button variant="outlined">
        Outlined
      </Button>
      <Button variant="text">
        Text
      </Button>
      <Button variant="elevated">
        Elevated
      </Button>
      <Button variant="tonal">
        Tonal
      </Button>
    </div>
  );
}`;

const sizesButtonCode = `import { Button } from 'mui-cascade';

function ButtonSizes() {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button size="small">
        Small
      </Button>
      <Button size="medium">
        Medium
      </Button>
      <Button size="large">
        Large
      </Button>
    </div>
  );
}`;

const iconsButtonCode = `import { Button } from 'mui-cascade';
import { ArrowRight, Download, Heart } from 'lucide-react';

function ButtonWithIcons() {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button leftIcon={<Heart />} variant="contained">
        Like
      </Button>
      <Button rightIcon={<ArrowRight />} variant="outlined">
        Next
      </Button>
      <Button leftIcon={<Download />} variant="tonal">
        Download
      </Button>
    </div>
  );
}`;

const loadingButtonCode = `import { Button } from 'mui-cascade';
import { useState } from 'react';

function LoadingButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Button loading={loading} onClick={handleClick}>
      {loading ? 'Loading...' : 'Click me'}
    </Button>
  );
}`;

const buttonProps = [
  {
    name: 'variant',
    type: '"contained" | "outlined" | "text" | "elevated" | "tonal"',
    description: 'The variant of the button',
    default: '"contained"',
  },
  {
    name: 'size',
    type: '"small" | "medium" | "large"',
    description: 'The size of the button',
    default: '"medium"',
  },
  {
    name: 'loading',
    type: 'boolean',
    description: 'Shows a loading spinner and disables the button',
    default: 'false',
  },
  {
    name: 'leftIcon',
    type: 'ReactNode',
    description: 'Icon to display on the left side of the button text',
    default: 'undefined',
  },
  {
    name: 'rightIcon',
    type: 'ReactNode',
    description: 'Icon to display on the right side of the button text',
    default: 'undefined',
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'If true, the button will be disabled',
    default: 'false',
  },
];

function ButtonPreview() {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant="contained">
        Primary
      </Button>
      <Button variant="outlined">
        Secondary
      </Button>
      <Button variant="tonal">
        Tonal
      </Button>
    </div>
  );
}

function ButtonVariantsPreview() {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
      <Button variant="elevated">Elevated</Button>
      <Button variant="tonal">Tonal</Button>
    </div>
  );
}

function ButtonSizesPreview() {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  );
}

function ButtonIconsPreview() {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button leftIcon={<Heart />} variant="contained">
        Like
      </Button>
      <Button rightIcon={<ArrowRight />} variant="outlined">
        Next
      </Button>
      <Button leftIcon={<Download />} variant="tonal">
        Download
      </Button>
    </div>
  );
}

function LoadingButton() {
  const [loading, setLoading] = React.useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Button loading={loading} onClick={handleClick}>
      {loading ? 'Loading...' : 'Click me'}
    </Button>
  );
}

export default function ButtonDoc() {
  const examples = [
    {
      title: 'Button Variants',
      description: 'Different visual styles for different use cases',
      component: <ButtonVariantsPreview />,
      code: variantsButtonCode,
    },
    {
      title: 'Button Sizes',
      description: 'Small, medium, and large size options',
      component: <ButtonSizesPreview />,
      code: sizesButtonCode,
    },
    {
      title: 'With Icons',
      description: 'Buttons can include icons on either side',
      component: <ButtonIconsPreview />,
      code: iconsButtonCode,
    },
    {
      title: 'Loading State',
      description: 'Buttons can show a loading state with spinner',
      component: <LoadingButton />,
      code: loadingButtonCode,
    },
  ];

  return (
    <ComponentDoc
      title="Button"
      description="Buttons are used to initialize an action. Button variants offer different visual styles for different situations."
      component={<ButtonPreview />}
      code={basicButtonCode}
      examples={examples}
      props={buttonProps}
    />
  );
}
