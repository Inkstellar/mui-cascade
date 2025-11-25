# Quick Start: LiveCodes Integration

## Install LiveCodes

```bash
cd mui-cascade
yarn add livecodes
```

## What's Been Added

### 1. LiveCodePlayground Component
Located at: `src/docs/ComponentDoc/LiveCodePlayground.tsx`

A fully-featured live code playground that:
- Executes React/TypeScript code in real-time
- Supports all Material-UI components
- Includes fullscreen mode
- Shows console output and compiled code
- Auto-imports common dependencies

### 2. Enhanced ExamplesSection
Updated: `src/docs/ComponentDoc/ExamplesSection.tsx`

Now includes a view toggle with three modes:
- **Preview** - Static rendered component
- **Code** - Syntax-highlighted code viewer  
- **Live** - Interactive playground (when `enableLiveCode: true`)

### 3. Example Implementation
Updated: `src/docs/ButtonDoc.tsx`

The Button documentation now shows how to enable live code:

```tsx
const examples = [
  {
    title: 'Button Variants',
    description: 'Try editing the code!',
    component: <ButtonVariantsPreview />,
    code: variantsButtonCode,
    enableLiveCode: true, // 👈 Add this flag
  },
];
```

## How to Use

### In Any Component Doc

1. Add `enableLiveCode: true` to examples:

```tsx
<ComponentDoc
  examples={[
    {
      title: "My Example",
      description: "Interactive example",
      component: <MyComponent />,
      code: myComponentCode,
      enableLiveCode: true, // Enable playground
    }
  ]}
/>
```

2. Users will see a toggle button to switch between Preview/Code/Live views

3. In Live mode, they can:
   - Edit code directly in the playground
   - Click "Run" to execute changes
   - Use fullscreen mode for better editing
   - See console output and errors

## Code Requirements

For LiveCodes to work properly, your code should:

```tsx
// ✅ Good - Will work
import { Button } from '@mui/material';

export default function App() {
  return <Button>Click me</Button>;
}

// ❌ Bad - Missing default export
import { Button } from '@mui/material';

function MyButton() {
  return <Button>Click me</Button>;
}
```

## Key Features

- **Zero Setup** - Users can experiment without cloning repos
- **Instant Feedback** - See changes immediately
- **Full Material-UI** - All MUI components available
- **TypeScript Support** - Full TypeScript transpilation
- **Security** - Runs in sandboxed iframe
- **Responsive** - Works on mobile and desktop

## Next Steps

1. Install the package: `yarn add livecodes`
2. Add `enableLiveCode: true` to your examples
3. Test in your browser
4. Share interactive documentation with users!

## Troubleshooting

If you see TypeScript errors, make sure livecodes is installed:
```bash
cd mui-cascade
yarn add livecodes
```

## Full Documentation

See `LIVECODES_INTEGRATION.md` for complete details.
