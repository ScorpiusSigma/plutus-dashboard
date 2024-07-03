'use client';
import HeaderBar from '@/components/header-bar/header-bar';
import LayoutBoxVis from '@/components/layouts/layout-box-vis';
import LayoutPaper from '@/components/layouts/layout-paper';
import { Box } from '@mui/material';
import FilterBar from './filter-bar';

const OverviewPage = (): JSX.Element => {
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
