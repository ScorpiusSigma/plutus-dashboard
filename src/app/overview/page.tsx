'use client';
import { FC } from 'react';
import HeaderBar from '@/components/headerBar/HeaderBar';
import LayoutPaper from '@/components/layouts/LayoutPaper';
import { Box } from '@mui/material';
import FilterBar from './FilterBar';

const OverviewPage: FC = (): JSX.Element => {
  return (
    <Box>
      <HeaderBar pageSelected="Overview" />
      <LayoutPaper>
        <FilterBar />
      </LayoutPaper>
    </Box>
  );
};

export default OverviewPage;
