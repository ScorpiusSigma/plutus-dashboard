'use client';

import { ReactNode, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeContext, ThemeProvider as CustomThemeProvider } from './theme-context';

const ThemeProviderClient = ({ children }: { children: ReactNode }): JSX.Element => {
  const { mode } = useContext(ThemeContext);

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

const ThemeProviderWrapper = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <CustomThemeProvider>
      <ThemeProviderClient>{children}</ThemeProviderClient>
    </CustomThemeProvider>
  );
};

export default ThemeProviderWrapper;
