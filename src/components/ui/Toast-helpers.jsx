import React from 'react';
import { toast } from 'sonner';
import { CheckCircle, AlertCircle, Info, X, Loader2 } from 'lucide-react';

export const showSuccessToast = (message, description) => {
  toast.success(message, {
    description,
    icon: <CheckCircle className="h-5 w-5 text-green-600" />,
    style: {
      background: 'var(--popover)',
      color: 'var(--popover-foreground)',
      border: '1px solid rgb(34, 197, 94)',
      borderLeft: '4px solid rgb(34, 197, 94)',
    },
  });
};

export const showErrorToast = (message, description) => {
  toast.error(message, {
    description,
    icon: <AlertCircle className="h-5 w-5 text-red-600" />,
    style: {
      background: 'var(--popover)',
      color: 'var(--popover-foreground)',
      border: '1px solid rgb(239, 68, 68)',
      borderLeft: '4px solid rgb(239, 68, 68)',
    },
  });
};

export const showInfoToast = (message, description) => {
  toast.info(message, {
    description,
    icon: <Info className="h-5 w-5 text-blue-600" />,
    style: {
      background: 'var(--popover)',
      color: 'var(--popover-foreground)',
      border: '1px solid rgb(59, 130, 246)',
      borderLeft: '4px solid rgb(59, 130, 246)',
    },
  });
};

export const showLoadingToast = (message, description) => {
  return toast.loading(message, {
    description,
    icon: <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />,
    style: {
      background: 'var(--popover)',
      color: 'var(--popover-foreground)',
      border: '1px solid var(--border)',
      borderLeft: '4px solid rgb(59, 130, 246)',
    },
  });
};

export const showConfirmDialog = (message, description, onConfirm, onCancel) => {
  toast(message, {
    description,
    action: {
      label: 'Confirm',
      onClick: () => {
        onConfirm();
        toast.dismiss();
      },
    },
    cancel: {
      label: 'Cancel',
      onClick: () => {
        if (onCancel) onCancel();
        toast.dismiss();
      },
    },
    duration: Infinity,
    style: {
      background: 'var(--popover)',
      color: 'var(--popover-foreground)',
      border: '1px solid rgb(251, 146, 60)',
      borderLeft: '4px solid rgb(251, 146, 60)',
    },
  });
};

export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};
