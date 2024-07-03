'use client';
import { FC } from 'react';
import HeaderBar from '@/components/header-bar/header-bar';
import { Box } from '@mui/material';

const InstrumentDetailPage: FC = (): JSX.Element => {
  return (
    <Box>
      <HeaderBar pageSelected="Instrument Details" />
    </Box>
  );
};

export default InstrumentDetailPage;
