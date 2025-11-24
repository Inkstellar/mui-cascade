import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogProps,
} from '@mui/material';
import { X } from 'lucide-react';

export interface ModalProps extends Omit<DialogProps, 'open'> {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  fullScreen?: boolean;
  fullWidth?: boolean;
  showCloseButton?: boolean;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  open = false,
  onClose,
  title,
  description,
  maxWidth = 'sm',
  fullScreen = false,
  fullWidth = true,
  showCloseButton = true,
  footer,
  children,
  sx,
  ...props
}) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullScreen={fullScreen}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          borderRadius: 1,
          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
          ...sx,
        },
      }}
      {...props}
    >
      {(title || showCloseButton) && (
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 24px 16px',
            '& .MuiDialogTitle-root': {
              padding: 0,
            },
          }}
        >
          <div>
            {title && (
              <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                {title}
              </div>
            )}
            {description && (
              <div style={{
                fontSize: '0.875rem',
                color: 'var(--muted-foreground)',
                marginTop: '4px'
              }}>
                {description}
              </div>
            )}
          </div>
          {showCloseButton && (
            <button
              onClick={handleClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                color: 'var(--muted-foreground)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={20} />
            </button>
          )}
        </DialogTitle>
      )}

      <DialogContent
        sx={{
          padding: title || showCloseButton ? '0 24px 24px' : '24px',
          '&:first-of-type': {
            paddingTop: title || showCloseButton ? '16px' : '24px',
          },
        }}
      >
        {children}
      </DialogContent>

      {footer && (
        <DialogActions
          sx={{
            padding: '16px 24px 24px',
            gap: '12px',
          }}
        >
          {footer}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;