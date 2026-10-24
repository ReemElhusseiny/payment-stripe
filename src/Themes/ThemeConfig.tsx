/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createTheme } from '@mui/material/styles';

export const generateTheme = (customColors: {
  primary: string;
  secondary: string;
}) => {
  return createTheme({
    colors: {
      primary: customColors.primary || (localStorage.getItem('primary') ?? undefined),
      secondary: customColors.secondary || (localStorage.getItem('secondary') ?? undefined),
      textWhite: '#ffffff',
      textDark: '#333333',
    },
  });
};