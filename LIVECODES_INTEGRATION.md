# LiveCodes Integration

## Overview
LiveCodes has been integrated into the ComponentDoc system to provide interactive, live code playgrounds for component examples.

## Installation

To use the LiveCodes playground feature, install the package:

```bash
yarn add livecodes
# or
npm install livecodes
```

## Usage

### In Component Documentation

Add `enableLiveCode: true` to any example in your component documentation:

```tsx
import ComponentDoc from './docs/ComponentDoc';
import { Button } from './components/ui/Button';

const ButtonDoc = () => {
  return (
    <ComponentDoc
      title="Button"
      description="A customizable button component"
      component={<Button>Click me</Button>}
      code={buttonCode}
      examples={[
        {
          title: "Primary Button",
          description: "A filled button for primary actions",
          component: <Button variant="contained">Primary</Button>,
          code: `import { Button } from 'mui-cascade';

export default function App() {
  return (
    <Button variant="contained">
      Primary Button
    </Button>
  );
}`,
          enableLiveCode: true, // Enable live playground for this example
        },
      ]}
    />
  );
};
```

### View Modes

When `enableLiveCode: true` is set, users can toggle between three view modes:

1. **Preview** - See the rendered component (if `component` prop is provided)
2. **Code** - View the code with syntax highlighting and copy functionality
3. **Live** - Interactive playground where users can edit and run the code in real-time

### Features

The LiveCodePlayground component includes:

- **Real-time code execution** - Edit and run React/TypeScript code instantly
- **Full Material-UI support** - All MUI components available
- **mui-cascade components** - Access to your custom component library
- **Console output** - View console.log statements and errors
- **Fullscreen mode** - Expand playground to full screen
- **Compiled output** - See the transpiled JavaScript
- **Auto-imports** - React, MUI, and common libraries pre-configured

### Configuration

The LiveCodePlayground component accepts these props:

```tsx
interface LiveCodePlaygroundProps {
  code: string;                    // The code to display/run
  title?: string;                  // Title for the playground
  height?: number | string;        // Height of playground (default: 500)
  language?: 'jsx' | 'tsx' | 'javascript' | 'typescript'; // Language mode
  showControls?: boolean;          // Show run/fullscreen buttons (default: true)
  autoRun?: boolean;              // Auto-run on load (default: true)
}
```

### Direct Usage

You can also use the LiveCodePlayground component directly:

```tsx
import { LiveCodePlayground } from './docs/ComponentDoc/LiveCodePlayground';

function MyPage() {
  return (
    <LiveCodePlayground
      code={`
import { Button } from '@mui/material';

export default function App() {
  return <Button variant="contained">Hello World</Button>;
}
      `}
      title="Button Example"
      height={600}
      language="tsx"
      showControls={true}
      autoRun={false}
    />
  );
}
```

## Benefits

- **Interactive Learning** - Users can experiment with components directly in your docs
- **No Setup Required** - Users don't need to clone repos or set up dev environments
- **Instant Feedback** - See changes immediately without page reloads
- **Better Understanding** - Hands-on experimentation leads to faster learning
- **Production Ready** - All examples are runnable and tested

## Technical Details

LiveCodes uses:
- ESM module imports for dependencies
- In-browser TypeScript transpilation
- Sandboxed execution environment
- PostMessage communication for security
- CDN-hosted libraries (esm.sh) for fast loading

## Limitations

- Large libraries may take time to load initially
- Some Node.js-specific APIs are not available
- File system operations are not supported
- Network requests may be limited by CORS

## Troubleshooting

### TypeScript Errors

If you see TypeScript errors about missing 'livecodes' module, make sure to run:

```bash
cd mui-cascade
yarn add livecodes
```

### Playground Not Loading

Check the browser console for errors. Common issues:
- Ad blockers may interfere with CDN imports
- Network connectivity issues
- Browser compatibility (requires modern browsers with ES6+ support)

### Code Not Running

Ensure your code:
- Has a default export component named `App`
- Uses correct import paths
- Doesn't rely on Node.js-specific features

## Example Code Structure

```tsx
// ✅ Good - Will work in LiveCodes
import { Button } from '@mui/material';

export default function App() {
  const [count, setCount] = React.useState(0);
  
  return (
    <Button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </Button>
  );
}

// ❌ Bad - Won't work (no default export)
import { Button } from '@mui/material';

function MyButton() {
  return <Button>Click me</Button>;
}
```

## Resources

- [LiveCodes Documentation](https://livecodes.io/docs)
- [LiveCodes SDK](https://livecodes.io/docs/sdk)
- [LiveCodes Examples](https://livecodes.io/?new)
