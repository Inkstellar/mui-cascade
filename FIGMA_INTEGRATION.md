# Figma Integration in ComponentDoc

## Overview
Added Figma embed support to the `ComponentDoc` component. You can now include Figma designs/prototypes directly in the examples section.

## Usage

### Example with Figma Embed

```tsx
import { ComponentDoc } from './ComponentDoc';

export function MyComponentDoc() {
  const examples = [
    {
      title: 'Design in Figma',
      description: 'View the design specifications and interactive prototype',
      figmaUrl: 'https://www.figma.com/embed?embed_host=share&url=YOUR_FIGMA_URL',
    },
    {
      title: 'React Implementation',
      description: 'Live React component example',
      component: <MyComponent />,
      code: `<MyComponent />`,
    },
  ];

  return (
    <ComponentDoc
      title="My Component"
      description="Component description"
      component={<MyComponent />}
      code="..."
      examples={examples}
    />
  );
}
```

## Getting Figma Embed URL

1. Open your Figma file
2. Click "Share" button
3. Click "Get embed code"
4. Copy the URL from the `src` attribute of the iframe
5. Use that URL in the `figmaUrl` field

## Features

- **Figma embeds**: Full interactive Figma prototypes embedded in documentation
- **Mixed content**: Combine Figma designs with React component examples
- **Responsive**: Figma embeds are 100% width with 600px height
- **Optional fields**: `component`, `code`, and `figmaUrl` are all optional
- **Flexible**: Show only Figma, only React component, or both

## Example Structure

```typescript
examples?: {
  title: string;
  description: string;
  component?: React.ReactNode;  // Optional React component
  code?: string;                 // Optional code snippet
  figmaUrl?: string;             // Optional Figma embed URL
}[]
```
