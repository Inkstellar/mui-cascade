import React, { useState } from 'react';
import ComponentDoc from './ComponentDoc';
import Modal from '@/components/Modal/Modal';
import Button from '@/components/Button/Button';

const basicModalCode = `import { Modal, Button } from '@shadcn-mui/components';
import { useState } from 'react';

function MyModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Modal Title"
        description="This is a modal dialog"
      >
        <p>Modal content goes here...</p>
      </Modal>
    </>
  );
}`;

const sizesModalCode = `import { Modal, Button } from '@shadcn-mui/components';
import { useState } from 'react';

function ModalSizes() {
  const [openSmall, setOpenSmall] = useState(false);
  const [openLarge, setOpenLarge] = useState(false);

  return (
    <>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button onClick={() => setOpenSmall(true)}>
          Small Modal
        </Button>
        <Button onClick={() => setOpenLarge(true)}>
          Large Modal
        </Button>
      </div>
      
      <Modal
        open={openSmall}
        onClose={() => setOpenSmall(false)}
        title="Small Modal"
        maxWidth="xs"
      >
        <p>This is a small modal dialog.</p>
      </Modal>
      
      <Modal
        open={openLarge}
        onClose={() => setOpenLarge(false)}
        title="Large Modal"
        maxWidth="lg"
      >
        <div style={{ minHeight: '300px' }}>
          <p>This is a large modal with more content.</p>
        </div>
      </Modal>
    </>
  );
}`;

const withActionsModalCode = `import { Modal, Button } from '@shadcn-mui/components';
import { useState } from 'react';

function ModalWithActions() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Confirm Action
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm Deletion"
        description="Are you sure you want to delete this item?"
        footer={
          <>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={() => setOpen(false)}>
              Delete
            </Button>
          </>
        }
      >
        <p>This action cannot be undone.</p>
      </Modal>
    </>
  );
}`;

const modalProps = [
  {
    name: 'open',
    type: 'boolean',
    description: 'If true, the modal is open',
    default: 'false',
  },
  {
    name: 'onClose',
    type: '() => void',
    description: 'Callback fired when the modal is closed',
    default: 'undefined',
  },
  {
    name: 'title',
    type: 'string',
    description: 'The title of the modal',
    default: 'undefined',
  },
  {
    name: 'description',
    type: 'string',
    description: 'The description text below the title',
    default: 'undefined',
  },
  {
    name: 'maxWidth',
    type: '"xs" | "sm" | "md" | "lg" | "xl" | false',
    description: 'Maximum width of the modal',
    default: '"sm"',
  },
  {
    name: 'fullWidth',
    type: 'boolean',
    description: 'If true, the modal will take full width of maxWidth',
    default: 'true',
  },
  {
    name: 'showCloseButton',
    type: 'boolean',
    description: 'If true, shows a close button in the header',
    default: 'true',
  },
  {
    name: 'footer',
    type: 'ReactNode',
    description: 'Content to display in the modal footer',
    default: 'undefined',
  },
  {
    name: 'fullScreen',
    type: 'boolean',
    description: 'If true, the modal will be displayed fullscreen',
    default: 'false',
  },
];

function ModalPreview() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Welcome to Shadcn MUI"
        description="A modern component library"
      >
        <p>This is a demonstration of the Modal component. You can put any content here, including forms, images, or other components.</p>
      </Modal>
    </div>
  );
}

function ModalSizesPreview() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        Open Large Modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Large Modal Example"
        description="This modal uses the large size"
        maxWidth="lg"
      >
        <div style={{ minHeight: '200px' }}>
          <p>This is a large modal that provides more space for content. You can fit more complex layouts and multiple components in this space.</p>
          <p>The modal component supports multiple sizes:</p>
          <ul>
            <li>xs - 320px</li>
            <li>sm - 480px</li>
            <li>md - 640px</li>
            <li>lg - 800px</li>
            <li>xl - 960px</li>
          </ul>
        </div>
      </Modal>
    </div>
  );
}

export default function ModalDoc() {
  const examples = [
    {
      title: 'Modal Sizes',
      description: 'Different size options for modals',
      component: <ModalSizesPreview />,
      code: sizesModalCode,
    },
    {
      title: 'With Footer Actions',
      description: 'Modals can include action buttons',
      component: <div style={{ height: '60px' }}>Preview not available</div>,
      code: withActionsModalCode,
    },
  ];

  return (
    <ComponentDoc
      title="Modal"
      description="Modals are dialogs that temporarily overlay content on top of the main screen. They focus user attention and often require a response."
      component={<ModalPreview />}
      code={basicModalCode}
      examples={examples}
      props={modalProps}
    />
  );
}
