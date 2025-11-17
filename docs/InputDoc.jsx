import React from 'react';
import ComponentDoc from './ComponentDoc';
import Input from '@/components/Input/Input';
import { Search, Mail } from 'lucide-react';

const basicInputCode = `import { Input } from '@shadcn-mui/components';

function MyInput() {
  return (
    <Input 
      label="Email"
      placeholder="Enter your email"
      type="email"
    />
  );
}`;

const variantsInputCode = `import { Input } from '@shadcn-mui/components';

function InputVariants() {
  return (
    <div style={{ display: 'grid', gap: '16px', maxWidth: '400px' }}>
      <Input 
        label="Outlined Input"
        placeholder="Default variant"
        variant="outlined"
      />
      <Input 
        label="Filled Input"
        placeholder="Filled variant"
        variant="filled"
      />
      <Input 
        label="Standard Input"
        placeholder="Standard variant"
        variant="standard"
      />
    </div>
  );
}`;

const statesInputCode = `import { Input } from '@shadcn-mui/components';

function InputStates() {
  return (
    <div style={{ display: 'grid', gap: '16px', maxWidth: '400px' }}>
      <Input 
        label="Default"
        placeholder="Normal state"
      />
      <Input 
        label="Error State"
        placeholder="Error message"
        error
        helperText="Please enter a valid value"
      />
      <Input 
        label="Disabled"
        placeholder="Disabled input"
        disabled
      />
    </div>
  );
}`;

const iconsInputCode = `import { Input } from '@shadcn-mui/components';
import { Search, Mail } from 'lucide-react';

function InputWithIcons() {
  return (
    <div style={{ display: 'grid', gap: '16px', maxWidth: '400px' }}>
      <Input 
        label="Search"
        placeholder="Search..."
        startAdornment={<Search />}
      />
      <Input 
        label="Email"
        placeholder="your@email.com"
        startAdornment={<Mail />}
        type="email"
      />
    </div>
  );
}`;

const inputProps = [
  {
    name: 'label',
    type: 'string',
    description: 'The label for the input field',
    default: 'undefined',
  },
  {
    name: 'variant',
    type: '"outlined" | "filled" | "standard"',
    description: 'The variant of the input',
    default: '"outlined"',
  },
  {
    name: 'type',
    type: '"text" | "password" | "email" | "number"',
    description: 'The type of the input',
    default: '"text"',
  },
  {
    name: 'error',
    type: 'boolean',
    description: 'If true, shows error styling',
    default: 'false',
  },
  {
    name: 'helperText',
    type: 'string',
    description: 'Helper text displayed below the input',
    default: 'undefined',
  },
  {
    name: 'startAdornment',
    type: 'ReactNode',
    description: 'Icon or element to display at the start',
    default: 'undefined',
  },
  {
    name: 'endAdornment',
    type: 'ReactNode',
    description: 'Icon or element to display at the end',
    default: 'undefined',
  },
  {
    name: 'multiline',
    type: 'boolean',
    description: 'If true, renders a multiline textarea',
    default: 'false',
  },
];

function InputPreview() {
  return (
    <div style={{ maxWidth: '400px' }}>
      <Input 
        label="Username"
        placeholder="Enter your username"
      />
    </div>
  );
}

function InputStatesPreview() {
  return (
    <div style={{ display: 'grid', gap: '16px', maxWidth: '400px' }}>
      <Input 
        label="Default"
        placeholder="Normal state"
        variant="outlined"
      />
      <Input 
        label="Error State"
        placeholder="Error message"
        error
        helperText="Please enter a valid value"
        variant="outlined"
      />
      <Input 
        label="Disabled"
        placeholder="Disabled input"
        disabled
        variant="outlined"
      />
    </div>
  );
}

function InputWithIconsPreview() {
  return (
    <div style={{ display: 'grid', gap: '16px', maxWidth: '400px' }}>
      <Input 
        label="Search"
        placeholder="Search..."
        startAdornment={<Search />}
        variant="outlined"
      />
      <Input 
        label="Email"
        placeholder="your@email.com"
        startAdornment={<Mail />}
        type="email"
        variant="outlined"
      />
    </div>
  );
}

export default function InputDoc() {
  const examples = [
    {
      title: 'Input Variants',
      description: 'Different visual styles for input fields',
      component: <div style={{ maxWidth: '400px' }}>
        <Input label="Outlined" placeholder="Default" variant="outlined" />
        <div style={{ height: '16px' }} />
        <Input label="Filled" placeholder="Filled" variant="filled" />
        <div style={{ height: '16px' }} />
        <Input label="Standard" placeholder="Standard" variant="standard" />
      </div>,
      code: variantsInputCode,
    },
    {
      title: 'Input States',
      description: 'Normal, error, and disabled states',
      component: <InputStatesPreview />,
      code: statesInputCode,
    },
    {
      title: 'With Icons',
      description: 'Input fields with start and end adornments',
      component: <InputWithIconsPreview />,
      code: iconsInputCode,
    },
  ];

  return (
    <ComponentDoc
      title="Input"
      description="Text fields let users enter and edit text. They typically appear in forms and dialogs."
      component={<InputPreview />}
      code={basicInputCode}
      examples={examples}
      props={inputProps}
    />
  );
}
