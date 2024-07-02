'use client';
import HeaderBar from '@/components/header-bar/header-bar';
import { Box } from '@mui/material';

const OverviewPage = (): JSX.Element => {
  return (
    <Box>
      <HeaderBar pageSelected="Overview" />
    </Box>
  );
};

export default OverviewPage;
