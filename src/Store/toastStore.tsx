import { create } from 'zustand';

export type ToastVariant =
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

interface ToastState {
  open: boolean;
  message: string;
  variant: ToastVariant;

  showMessage: (
    message: string,
    variant?: ToastVariant
  ) => void;

  hideMessage: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  open: false,
  message: '',
  variant: 'info',

  showMessage: (message, variant = 'info') => {
    set({
      open: true,
      message,
      variant,
    });

    setTimeout(() => {
      set({ open: false });
    }, 3000);
  },

  hideMessage: () => {
    set({ open: false });
  },
}));