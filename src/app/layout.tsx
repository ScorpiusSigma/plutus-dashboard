import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import ThemeProviderWrapper from '@/context/theme-provider-context';

export const metadata: Metadata = {
  title: 'PLUTUS Dashboard',
  description: 'Quant Department',
};

const RootLayout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <html lang="en">
      <body>
        <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
