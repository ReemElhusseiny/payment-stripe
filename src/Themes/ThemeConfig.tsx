/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createTheme } from '@mui/material/styles';

export const generateTheme = (customColors: {
  primary: string;
  secondary: string
}) => {
  return createTheme({
    // إضافة الألوان الخاصة بك كـ Custom Fields
    // @ts-ignore (لو بتستخدمي TypeScript عشان ما يعترضش على مسمياتك الخاصة)
    colors: {
      primary:  customColors.primary || localStorage.getItem('primary'),
      secondary: customColors.secondary || localStorage.getItem('secondary'),
      textWhite: '#ffffff',
      textDark: '#333333',
    },
  });
};