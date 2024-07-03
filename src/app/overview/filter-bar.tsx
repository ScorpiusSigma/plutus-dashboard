'use client';
import ButtonAction from '@/components/buttons/button-action';
import HeaderBar from '@/components/header-bar/header-bar';
import MultipleSelectPlaceholder from '@/components/inputs/input-select-dropdown';
import InputText from '@/components/inputs/input-text';
import LayoutBoxVis from '@/components/layouts/layout-box-vis';
import LayoutPaper from '@/components/layouts/layout-paper';
import { DATA_POLLING_RATES } from '@/constants/filter-constants';
import { Box, Grid, Typography } from '@mui/material';

const FilterBar = (): JSX.Element => {
  return (
    <Box sx={{ width: 'fit', pt: 2, mx: 4 }}>
      <LayoutBoxVis>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Grid container spacing={4} alignItems="center">
              <Grid item>
                <Typography>Filter:</Typography>
              </Grid>
              <Grid item>
                <InputText placeholder="Input Instrument" />
              </Grid>
              <Grid item>
                <ButtonAction>Apply Filter</ButtonAction>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={4} alignItems="center">
              <Grid item>
                <Typography>Setting:</Typography>
              </Grid>
              <Grid item>
                <MultipleSelectPlaceholder options={DATA_POLLING_RATES} label="Data Polling Rate" valuePrefix=" / s" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </LayoutBoxVis>
    </Box>
  );
};

export default FilterBar;
