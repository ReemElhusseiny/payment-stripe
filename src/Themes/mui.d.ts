import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    colors: {
      primary: string;
      secondary: string;
      textWhite: string;
      textDark: string;
    };
  }

  interface ThemeOptions {
    colors?: {
      primary?: string;
      secondary?: string;
      textWhite?: string;
      textDark?: string;
    };
  }
}
export {};