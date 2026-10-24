/* eslint-disable react-refresh/only-export-components */
// src/context/ColorContext.tsx
import React, { createContext, useState, useMemo, type ReactNode } from 'react';
import { generateTheme } from '../Themes/ThemeConfig'; // تأكدي من صحة المسار لـ ThemeConfig
import { ThemeProvider } from '@mui/material/styles';

// 1. تعريف الـ Types الخاصة بالـ Context
 interface ColorContextType {
  userColors: {
    primary: string;
    secondary: string;
  };
  setUserColors: React.Dispatch<React.SetStateAction<{ primary: string; secondary: string }>>;
}

export const ColorContext = createContext<ColorContextType | null>(null);

export const ColorProvider = ({ children }: { children: ReactNode;}) => {
  const [userColors, setUserColors] = useState({
    primary: localStorage.getItem('primary') || '#425c5a',
    secondary: localStorage.getItem('secondary') || '#e2eceb',
  });

  const currentTheme = useMemo(() => generateTheme(userColors), [userColors]);

  return (
    <ColorContext.Provider value={{ userColors, setUserColors }}>
      <ThemeProvider theme={currentTheme}>
        <div className="w-full h-screen" style={{ background: currentTheme.colors.secondary }}>
          {children}
        </div>
      </ThemeProvider>
    </ColorContext.Provider>
  );
};